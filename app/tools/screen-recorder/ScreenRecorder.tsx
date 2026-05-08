"use client";
import { useState, useRef, useEffect, useCallback } from "react";

type RecordMode = "screen" | "window" | "tab";
type Quality = "720p" | "1080p" | "auto";
type AppState = "idle" | "selecting" | "recording" | "paused" | "stopped";

const QUALITY_MAP: Record<Quality, { width: number; height: number }> = {
  "720p":  { width: 1280, height: 720 },
  "1080p": { width: 1920, height: 1080 },
  "auto":  { width: 1920, height: 1080 },
};

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export default function ScreenRecorder() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [recordMode] = useState<RecordMode>("screen");
  const [quality, setQuality] = useState<Quality>("1080p");
  const [includeMic, setIncludeMic] = useState(false);
  const [includeSystem, setIncludeSystem] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [blobSize, setBlobSize] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const liveVideoRef = useRef<HTMLVideoElement>(null);
  const playbackVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getDisplayMedia) {
      setIsSupported(false);
    }
    return () => {
      stopTimer();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (playbackUrl) {
        URL.revokeObjectURL(playbackUrl);
      }
    };
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    startTimeRef.current = Date.now() - elapsed * 1000;
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 500);
  }, [elapsed, stopTimer]);

  const handleStart = useCallback(async () => {
    setError(null);
    setAppState("selecting");

    try {
      const dim = quality !== "auto" ? QUALITY_MAP[quality] : null;
      const videoConstraints: MediaTrackConstraints = dim
        ? { width: { ideal: dim.width }, height: { ideal: dim.height } }
        : {};

      const displayConstraints: DisplayMediaStreamOptions = {
        video: Object.keys(videoConstraints).length > 0 ? videoConstraints : true,
        audio: includeSystem,
      };

      const displayStream = await navigator.mediaDevices.getDisplayMedia(displayConstraints);

      let finalStream = displayStream;

      if (includeMic) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioContext = new AudioContext();
          const destination = audioContext.createMediaStreamDestination();

          if (displayStream.getAudioTracks().length > 0) {
            const systemSource = audioContext.createMediaStreamSource(displayStream);
            systemSource.connect(destination);
          }
          const micSource = audioContext.createMediaStreamSource(micStream);
          micSource.connect(destination);

          const tracks = [
            ...displayStream.getVideoTracks(),
            ...destination.stream.getAudioTracks(),
          ];
          finalStream = new MediaStream(tracks);
        } catch {
          finalStream = displayStream;
        }
      }

      streamRef.current = finalStream;

      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = finalStream;
        liveVideoRef.current.muted = true;
        await liveVideoRef.current.play().catch(() => {});
      }

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : "video/webm";

      const recorder = new MediaRecorder(finalStream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setBlobSize(blob.size);
        setPlaybackUrl(url);
        setDuration(elapsed);
        setAppState("stopped");
        stopTimer();

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
          streamRef.current = null;
        }
        if (liveVideoRef.current) {
          liveVideoRef.current.srcObject = null;
        }
      };

      finalStream.getVideoTracks()[0]?.addEventListener("ended", () => {
        if (mediaRecorderRef.current?.state !== "inactive") {
          mediaRecorderRef.current?.stop();
        }
      });

      recorder.start(1000);
      setElapsed(0);
      setAppState("recording");
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 500);

    } catch (err: unknown) {
      const e = err as DOMException;
      if (e?.name === "NotAllowedError" || e?.name === "AbortError") {
        setAppState("idle");
      } else {
        setError(`Could not start recording: ${e?.message ?? "Unknown error"}`);
        setAppState("idle");
      }
    }
  }, [quality, includeMic, includeSystem, elapsed, stopTimer]);

  const handleStop = useCallback(() => {
    stopTimer();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  }, [stopTimer]);

  const handlePauseResume = useCallback(() => {
    if (!mediaRecorderRef.current) return;
    if (appState === "recording") {
      mediaRecorderRef.current.pause();
      stopTimer();
      pausedAtRef.current = elapsed;
      setAppState("paused");
    } else if (appState === "paused") {
      mediaRecorderRef.current.resume();
      startTimeRef.current = Date.now() - pausedAtRef.current * 1000;
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 500);
      setAppState("recording");
    }
  }, [appState, elapsed, stopTimer]);

  const handleReset = useCallback(() => {
    stopTimer();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (playbackUrl) {
      URL.revokeObjectURL(playbackUrl);
    }
    chunksRef.current = [];
    setPlaybackUrl(null);
    setBlobSize(0);
    setDuration(0);
    setElapsed(0);
    setError(null);
    setAppState("idle");
  }, [stopTimer, playbackUrl]);

  const handleDownload = useCallback(() => {
    if (!playbackUrl) return;
    const a = document.createElement("a");
    a.href = playbackUrl;
    a.download = `screen-recording-${Date.now()}.webm`;
    a.click();
  }, [playbackUrl]);

  if (!isSupported) {
    return (
      <div className="rounded-[20px] p-8 text-center" style={{ background: "#141414", border: "1px solid rgba(239,68,68,0.2)" }}>
        <div style={{ fontSize: "40px", marginBottom: "16px" }}>🚫</div>
        <p className="font-semibold mb-2" style={{ fontSize: "16px", color: "#fafafa" }}>Screen recording not supported</p>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
          Your browser does not support the Screen Capture API.<br />
          Use Chrome 72+, Edge 79+, or Firefox 66+.
        </p>
      </div>
    );
  }

  if (appState === "idle") {
    return (
      <div className="space-y-3">
        <div className="rounded-[24px] flex flex-col items-center py-14 px-6" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div
            className="flex items-center justify-center rounded-full cursor-pointer transition-all"
            onClick={handleStart}
            style={{
              width: 96, height: 96,
              background: "#ef4444",
              boxShadow: "0 0 0 0 rgba(239,68,68,0.4), 0 8px 40px rgba(239,68,68,0.35)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 12px rgba(239,68,68,0.15), 0 8px 40px rgba(239,68,68,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(239,68,68,0.4), 0 8px 40px rgba(239,68,68,0.35)"; }}
          >
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#fff" }} />
          </div>
          <p className="mt-6 font-semibold" style={{ fontSize: "15px", color: "#fafafa" }}>Click to start recording</p>
          <p className="mt-1" style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Browser will ask you to choose a screen, window, or tab</p>
        </div>

        {error && (
          <div className="rounded-[14px] px-5 py-4" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
            <p style={{ fontSize: "13px", color: "#ef4444" }}>{error}</p>
          </div>
        )}

        <div className="rounded-[20px] p-5 space-y-5" style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Audio</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "System Audio", value: includeSystem, onChange: setIncludeSystem },
                { label: "Microphone",   value: includeMic,    onChange: setIncludeMic },
              ].map(({ label, value, onChange }) => (
                <label key={label} className="flex items-center justify-between cursor-pointer">
                  <span style={{ fontSize: "13px", color: value ? "#fafafa" : "rgba(255,255,255,0.45)" }}>{label}</span>
                  <div
                    onClick={() => onChange(v => !v)}
                    className="rounded-full transition-all"
                    style={{
                      width: 40, height: 22,
                      background: value ? "#ef4444" : "rgba(255,255,255,0.1)",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{
                      position: "absolute", top: 3, left: value ? 21 : 3,
                      width: 16, height: 16, borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.18s ease",
                    }} />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "16px" }}>
            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>Video Quality</p>
            <div className="flex gap-2">
              {(["720p", "1080p", "auto"] as Quality[]).map(q => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className="px-4 py-2 rounded-[10px] text-[12px] font-semibold transition-all"
                  style={{
                    background: quality === q ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)",
                    color: quality === q ? "#ef4444" : "rgba(255,255,255,0.4)",
                    border: `1px solid ${quality === q ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[14px] px-5 py-3.5 flex items-center gap-3"
          style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.12)" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
          <p style={{ fontSize: "11.5px", color: "rgba(34,197,94,0.8)", lineHeight: 1.6 }}>
            Ready to record — Works in Chrome 72+, Edge 79+, Firefox 66+. No extension needed.
          </p>
        </div>
      </div>
    );
  }

  if (appState === "recording" || appState === "paused" || appState === "selecting") {
    return (
      <div className="space-y-3">
        <div className="rounded-[24px] overflow-hidden" style={{ background: "#0a0a0a", border: "1px solid rgba(239,68,68,0.2)" }}>
          <div style={{ position: "relative", background: "#050505", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <video
              ref={liveVideoRef}
              autoPlay
              muted
              playsInline
              style={{
                width: "100%", height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
            {appState === "selecting" && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)" }}>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Waiting for screen selection…</p>
              </div>
            )}
            {appState === "paused" && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.55)" }}>
                <div className="rounded-[16px] px-6 py-4 text-center" style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="font-bold" style={{ fontSize: "15px", color: "#fafafa" }}>Paused</p>
                </div>
              </div>
            )}

            <div style={{ position: "absolute", top: 14, right: 14, display: "flex", alignItems: "center", gap: 8 }}>
              {(appState === "recording" || appState === "paused") && (
                <div
                  className="flex items-center gap-2 rounded-[10px] px-3 py-1.5"
                  style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: appState === "paused" ? "rgba(239,68,68,0.4)" : "#ef4444",
                    animation: appState === "recording" ? "pulse-rec 1.2s ease-in-out infinite" : "none",
                  }} />
                  <span className="font-bold tabular-nums" style={{ fontSize: "12px", color: "#fafafa", letterSpacing: "0.04em" }}>
                    {appState === "paused" ? "PAUSED" : "REC"} {formatTime(elapsed)}
                  </span>
                </div>
              )}
            </div>

            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
              background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
              pointerEvents: "none",
            }} />
          </div>

          <div className="flex items-center justify-center gap-3 p-4">
            {(appState === "recording" || appState === "paused") && (
              <>
                <button
                  onClick={handlePauseResume}
                  className="rounded-[12px] px-5 py-2.5 font-semibold transition-all"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "13px",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
                >
                  {appState === "paused" ? "▶ Resume" : "⏸ Pause"}
                </button>
                <button
                  onClick={handleStop}
                  className="rounded-[12px] px-6 py-2.5 font-semibold transition-all"
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    fontSize: "13px",
                    boxShadow: "0 4px 16px rgba(239,68,68,0.3)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  ⏹ Stop Recording
                </button>
              </>
            )}
          </div>
        </div>

        <style>{`
          @keyframes pulse-rec {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.25; }
          }
        `}</style>
      </div>
    );
  }

  if (appState === "stopped" && playbackUrl) {
    return (
      <div className="space-y-3">
        <div className="rounded-[24px] overflow-hidden" style={{ background: "#0a0a0a", border: "1px solid rgba(34,197,94,0.2)" }}>
          <div style={{ position: "relative", background: "#050505" }}>
            <video
              ref={playbackVideoRef}
              src={playbackUrl}
              controls
              playsInline
              style={{ width: "100%", display: "block", maxHeight: "480px", objectFit: "contain" }}
            />
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="rounded-[10px] px-3 py-2" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}>
                <p className="text-[9px] uppercase tracking-[0.12em] font-semibold mb-0.5" style={{ color: "rgba(34,197,94,0.6)" }}>Duration</p>
                <p className="font-bold tabular-nums" style={{ fontSize: "15px", color: "#22c55e" }}>{formatTime(duration)}</p>
              </div>
              <div className="rounded-[10px] px-3 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[9px] uppercase tracking-[0.12em] font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>File Size</p>
                <p className="font-bold tabular-nums" style={{ fontSize: "15px", color: "#fafafa" }}>{formatBytes(blobSize)}</p>
              </div>
              <div className="rounded-[10px] px-3 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-[9px] uppercase tracking-[0.12em] font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Format</p>
                <p className="font-bold" style={{ fontSize: "15px", color: "#fafafa" }}>WebM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 rounded-[12px] py-3 font-semibold transition-all"
                style={{ background: "#ef4444", color: "#fff", fontSize: "13px", border: "none", boxShadow: "0 4px 16px rgba(239,68,68,0.3)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
              >
                Download WebM
              </button>
              <button
                onClick={handleReset}
                className="rounded-[12px] px-5 py-3 font-semibold transition-all"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", fontSize: "13px", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
              >
                Record Again
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[14px] px-5 py-3.5 flex items-center gap-3"
          style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.12)" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
          <p style={{ fontSize: "11.5px", color: "rgba(34,197,94,0.8)", lineHeight: 1.6 }}>
            Recording saved in memory. Download before leaving the page — it will be lost on refresh.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
