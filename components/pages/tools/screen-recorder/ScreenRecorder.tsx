"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Circle,
  Download,
  MonitorOff,
  Pause,
  Play,
  RotateCcw,
  Square,
} from "lucide-react";

type Quality = "720p" | "1080p" | "auto";
type AppState = "idle" | "selecting" | "recording" | "paused" | "stopped";

const QUALITY_MAP: Record<Quality, { width: number; height: number }> = {
  "720p": { width: 1280, height: 720 },
  "1080p": { width: 1920, height: 1080 },
  auto: { width: 1920, height: 1080 },
};

const QUALITIES: Quality[] = ["720p", "1080p", "auto"];

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

const LABEL_CLASS =
  "text-label font-semibold uppercase tracking-[0.16em] text-black/40";

export default function ScreenRecorder() {
  const [appState, setAppState] = useState<AppState>("idle");
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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  /**
   * `onstop` fires from a closure captured when the recorder was created, so
   * reading `elapsed` there always returned the value at start (zero). These
   * refs give the callbacks and the unmount cleanup the current values.
   */
  const elapsedRef = useRef(0);
  const playbackUrlRef = useRef<string | null>(null);

  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const runTimer = useCallback((offsetSeconds: number) => {
    startTimeRef.current = Date.now() - offsetSeconds * 1000;
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 500);
  }, []);

  useEffect(() => {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getDisplayMedia
    ) {
      setIsSupported(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (playbackUrlRef.current) URL.revokeObjectURL(playbackUrlRef.current);
    };
  }, []);

  const handleStart = useCallback(async () => {
    setError(null);
    setAppState("selecting");

    try {
      const dim = quality !== "auto" ? QUALITY_MAP[quality] : null;
      const videoConstraints: MediaTrackConstraints = dim
        ? { width: { ideal: dim.width }, height: { ideal: dim.height } }
        : {};

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video:
          Object.keys(videoConstraints).length > 0 ? videoConstraints : true,
        audio: includeSystem,
      });

      let finalStream = displayStream;

      if (includeMic) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          const audioContext = new AudioContext();
          const destination = audioContext.createMediaStreamDestination();

          if (displayStream.getAudioTracks().length > 0) {
            audioContext
              .createMediaStreamSource(displayStream)
              .connect(destination);
          }
          audioContext.createMediaStreamSource(micStream).connect(destination);

          finalStream = new MediaStream([
            ...displayStream.getVideoTracks(),
            ...destination.stream.getAudioTracks(),
          ]);
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

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        if (playbackUrlRef.current) URL.revokeObjectURL(playbackUrlRef.current);
        playbackUrlRef.current = url;
        setBlobSize(blob.size);
        setPlaybackUrl(url);
        setDuration(elapsedRef.current);
        setAppState("stopped");
        stopTimer();

        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        if (liveVideoRef.current) liveVideoRef.current.srcObject = null;
      };

      finalStream.getVideoTracks()[0]?.addEventListener("ended", () => {
        if (mediaRecorderRef.current?.state !== "inactive") {
          mediaRecorderRef.current?.stop();
        }
      });

      recorder.start(1000);
      setElapsed(0);
      elapsedRef.current = 0;
      setAppState("recording");
      runTimer(0);
    } catch (err: unknown) {
      const e = err as DOMException;
      if (e?.name === "NotAllowedError" || e?.name === "AbortError") {
        setAppState("idle");
      } else {
        setError(`Could not start recording: ${e?.message ?? "Unknown error"}`);
        setAppState("idle");
      }
    }
  }, [quality, includeMic, includeSystem, stopTimer, runTimer]);

  const handleStop = useCallback(() => {
    stopTimer();
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop();
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
      runTimer(pausedAtRef.current);
      setAppState("recording");
    }
  }, [appState, elapsed, stopTimer, runTimer]);

  const handleReset = useCallback(() => {
    stopTimer();
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current?.stop();
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (playbackUrlRef.current) URL.revokeObjectURL(playbackUrlRef.current);
    playbackUrlRef.current = null;
    chunksRef.current = [];
    setPlaybackUrl(null);
    setBlobSize(0);
    setDuration(0);
    setElapsed(0);
    setError(null);
    setAppState("idle");
  }, [stopTimer]);

  const handleDownload = useCallback(() => {
    if (!playbackUrl) return;
    const a = document.createElement("a");
    a.href = playbackUrl;
    a.download = `screen-recording-${Date.now()}.webm`;
    a.click();
  }, [playbackUrl]);

  if (!isSupported) {
    return (
      <div className="rounded-4xl bg-white p-10 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)]">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <MonitorOff size={22} />
        </span>
        <p className="text-body font-medium text-black">
          Screen recording is not supported here
        </p>
        <p className="mt-2 text-caption leading-relaxed text-black/40">
          This browser does not expose the Screen Capture API. Use Chrome 72+,
          Edge 79+, or Firefox 66+.
        </p>
      </div>
    );
  }

  if (appState === "idle") {
    return (
      <div className="space-y-3">
        <div className="rounded-4xl bg-white px-6 py-14 text-center shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)]">
          <button
            type="button"
            onClick={handleStart}
            title="Start recording"
            className="group mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500 shadow-[0_8px_32px_rgba(239,68,68,0.28)] transition duration-200 hover:bg-red-600 hover:shadow-[0_0_0_10px_rgba(239,68,68,0.12),0_8px_32px_rgba(239,68,68,0.35)]"
          >
            <span className="h-8 w-8 rounded-full bg-white" />
          </button>
          <p className="mt-7 text-body font-medium text-black">
            Click to start recording
          </p>
          <p className="mt-2 text-caption text-black/40">
            Your browser will ask which screen, window, or tab to capture.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-2xl bg-red-50 px-5 py-4 text-caption text-red-700"
          >
            {error}
          </p>
        )}

        <div className="rounded-4xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
          <p className={LABEL_CLASS}>Audio</p>
          <div className="mt-4 space-y-2">
            {[
              {
                label: "System audio",
                value: includeSystem,
                onChange: setIncludeSystem,
              },
              {
                label: "Microphone",
                value: includeMic,
                onChange: setIncludeMic,
              },
            ].map(({ label, value, onChange }) => (
              <button
                key={label}
                type="button"
                role="switch"
                aria-checked={value}
                onClick={() => onChange((v) => !v)}
                className="flex w-full items-center justify-between rounded-2xl border border-black/10 bg-[#fcfbfa] px-5 py-4 transition duration-150 hover:border-black/25"
              >
                <span
                  className={`text-body ${value ? "text-black" : "text-black/45"}`}
                >
                  {label}
                </span>
                <span
                  aria-hidden
                  className={`relative h-6 w-11 shrink-0 rounded-full transition duration-200 ${
                    value ? "bg-black" : "bg-black/15"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-200 ${
                      value ? "left-6" : "left-1"
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-black/8 pt-6">
            <p className={LABEL_CLASS}>Video quality</p>
            <div className="mt-4 flex gap-2">
              {QUALITIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuality(q)}
                  aria-pressed={quality === q}
                  className={`flex-1 rounded-2xl py-3 text-label font-semibold uppercase tracking-[0.12em] transition duration-150 ${
                    quality === q
                      ? "bg-black text-white"
                      : "bg-black/[0.04] text-black/45 hover:bg-black/[0.08] hover:text-black"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="px-1 text-caption text-black/35">
          The capture never leaves your machine — no extension, no upload, no
          server.
        </p>
      </div>
    );
  }

  if (
    appState === "recording" ||
    appState === "paused" ||
    appState === "selecting"
  ) {
    return (
      <div className="space-y-3">
        <div className="overflow-hidden rounded-4xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="relative aspect-video bg-[#0d0d0d]">
            <video
              ref={liveVideoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-contain"
            />

            {appState === "selecting" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <p className="text-caption text-white/60">
                  Waiting for screen selection…
                </p>
              </div>
            )}

            {appState === "paused" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                <p className="rounded-full bg-white/90 px-5 py-2.5 text-label font-semibold uppercase tracking-[0.16em] text-black">
                  Paused
                </p>
              </div>
            )}

            {(appState === "recording" || appState === "paused") && (
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/70 px-3.5 py-2 backdrop-blur">
                <span
                  aria-hidden
                  className={`h-2 w-2 rounded-full bg-red-500 ${
                    appState === "recording" ? "animate-pulse" : "opacity-40"
                  }`}
                />
                <span className="font-mono text-caption font-semibold text-white tabular-nums">
                  {appState === "paused" ? "PAUSED" : "REC"}{" "}
                  {formatTime(elapsed)}
                </span>
              </div>
            )}
          </div>

          {(appState === "recording" || appState === "paused") && (
            <div className="flex flex-wrap items-center justify-center gap-2 p-5">
              <button
                type="button"
                onClick={handlePauseResume}
                className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-5 py-3 text-label font-semibold uppercase tracking-[0.12em] text-black/50 transition duration-150 hover:bg-black/[0.08] hover:text-black"
              >
                {appState === "paused" ? (
                  <Play size={13} />
                ) : (
                  <Pause size={13} />
                )}
                {appState === "paused" ? "Resume" : "Pause"}
              </button>
              <button
                type="button"
                onClick={handleStop}
                className="inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-label font-semibold uppercase tracking-[0.12em] text-white transition duration-150 hover:bg-red-600"
              >
                <Square size={12} />
                Stop recording
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (appState === "stopped" && playbackUrl) {
    return (
      <div className="space-y-3">
        <div className="overflow-hidden rounded-4xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.04)]">
          <video
            src={playbackUrl}
            controls
            playsInline
            className="block max-h-[480px] w-full bg-[#0d0d0d] object-contain"
          />

          <div className="space-y-4 p-5 sm:p-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Duration", value: formatTime(duration) },
                { label: "File size", value: formatBytes(blobSize) },
                { label: "Format", value: "WebM" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-[#fcfbfa] px-4 py-4 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]"
                >
                  <p className="font-mono text-lg font-semibold leading-none tracking-tight text-black tabular-nums">
                    {value}
                  </p>
                  <p className="mt-2 text-label font-semibold uppercase tracking-[0.14em] text-black/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-black py-3.5 text-label font-semibold uppercase tracking-[0.15em] text-white transition duration-200 hover:bg-neutral-800"
              >
                <Download size={14} />
                Download WebM
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-5 py-3.5 text-label font-semibold uppercase tracking-[0.12em] text-black/50 transition duration-150 hover:bg-black/[0.08] hover:text-black"
              >
                <RotateCcw size={13} />
                Record again
              </button>
            </div>
          </div>
        </div>

        <p className="flex items-center gap-2 px-1 text-caption text-black/35">
          <Circle size={9} className="fill-amber-500 text-amber-500" aria-hidden />
          Held in memory only — download it before you leave or refresh the page.
        </p>
      </div>
    );
  }

  return null;
}
