"use client";
import { useState, useEffect, useCallback } from "react";

interface Card {
  id: string;
  term: string;
  definition: string;
}

type Mode = "create" | "study";
type StudyResult = "know" | "review" | null;

const SAMPLE_CARDS: Card[] = [
  { id: "1", term: "Tokyo", definition: "Capital city of Japan, the most populous metropolitan area in the world." },
  { id: "2", term: "Closure", definition: "A function that retains access to variables from its outer lexical scope even after the outer function has returned." },
  { id: "3", term: "Ottawa", definition: "Capital city of Canada, located in the province of Ontario." },
  { id: "4", term: "Recursion", definition: "A programming technique where a function calls itself in order to solve a problem by breaking it into smaller instances." },
  { id: "5", term: "Canberra", definition: "Capital city of Australia, chosen as a compromise between Sydney and Melbourne." },
];

const STORAGE_KEY = "flashcard-maker-deck";
const DECK_NAME_KEY = "flashcard-maker-deck-name";

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function FlashcardMaker() {
  const [mode, setMode] = useState<Mode>("create");
  const [cards, setCards] = useState<Card[]>(SAMPLE_CARDS);
  const [deckName, setDeckName] = useState("My Study Deck");
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTerm, setEditTerm] = useState("");
  const [editDefinition, setEditDefinition] = useState("");
  const [csvText, setCsvText] = useState("");
  const [showImport, setShowImport] = useState(false);
  const [importError, setImportError] = useState("");

  const [studyCards, setStudyCards] = useState<Card[]>([]);
  const [studyIndex, setStudyIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Record<string, StudyResult>>({});
  const [studyDone, setStudyDone] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedName = localStorage.getItem(DECK_NAME_KEY);
      if (stored) setCards(JSON.parse(stored));
      if (storedName) setDeckName(storedName);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch {}
  }, [cards]);

  useEffect(() => {
    try {
      localStorage.setItem(DECK_NAME_KEY, deckName);
    } catch {}
  }, [deckName]);

  const addCard = () => {
    if (!term.trim() || !definition.trim()) return;
    setCards(prev => [...prev, { id: generateId(), term: term.trim(), definition: definition.trim() }]);
    setTerm("");
    setDefinition("");
  };

  const deleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const startEdit = (card: Card) => {
    setEditingId(card.id);
    setEditTerm(card.term);
    setEditDefinition(card.definition);
  };

  const saveEdit = () => {
    if (!editTerm.trim() || !editDefinition.trim()) return;
    setCards(prev => prev.map(c => c.id === editingId ? { ...c, term: editTerm.trim(), definition: editDefinition.trim() } : c));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const importCsv = () => {
    setImportError("");
    const lines = csvText.trim().split("\n").filter(l => l.trim());
    const newCards: Card[] = [];
    for (const line of lines) {
      const commaIdx = line.indexOf(",");
      if (commaIdx === -1) {
        setImportError(`Invalid line (no comma found): "${line.slice(0, 40)}"`);
        return;
      }
      const t = line.slice(0, commaIdx).trim();
      const d = line.slice(commaIdx + 1).trim();
      if (!t || !d) {
        setImportError(`Empty term or definition on line: "${line.slice(0, 40)}"`);
        return;
      }
      newCards.push({ id: generateId(), term: t, definition: d });
    }
    if (newCards.length === 0) {
      setImportError("No valid cards found in the CSV.");
      return;
    }
    setCards(prev => [...prev, ...newCards]);
    setCsvText("");
    setShowImport(false);
  };

  const startStudy = useCallback(() => {
    if (cards.length === 0) return;
    setStudyCards([...cards]);
    setStudyIndex(0);
    setFlipped(false);
    setResults({});
    setStudyDone(false);
    setMode("study");
  }, [cards]);

  const shuffle = () => {
    setStudyCards(prev => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
    setStudyIndex(0);
    setFlipped(false);
    setResults({});
    setStudyDone(false);
  };

  const restartDeck = () => {
    setStudyIndex(0);
    setFlipped(false);
    setResults({});
    setStudyDone(false);
  };

  const markCard = (result: "know" | "review") => {
    const card = studyCards[studyIndex];
    const newResults = { ...results, [card.id]: result };
    setResults(newResults);
    if (studyIndex + 1 >= studyCards.length) {
      setStudyDone(true);
    } else {
      setStudyIndex(i => i + 1);
      setFlipped(false);
    }
  };

  const goNext = useCallback(() => {
    setStudyIndex(i => {
      if (i + 1 < studyCards.length) { setFlipped(false); return i + 1; }
      return i;
    });
  }, [studyCards.length]);

  const goPrev = useCallback(() => {
    setStudyIndex(i => {
      if (i > 0) { setFlipped(false); return i - 1; }
      return i;
    });
  }, []);

  useEffect(() => {
    if (mode !== "study") return;
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") { e.preventDefault(); setFlipped(f => !f); }
      if (e.code === "ArrowRight") goNext();
      if (e.code === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, goNext, goPrev]);

  const knownCount = Object.values(results).filter(v => v === "know").length;
  const reviewCount = Object.values(results).filter(v => v === "review").length;
  const totalReviewed = knownCount + reviewCount;
  const scorePercent = totalReviewed > 0 ? Math.round((knownCount / totalReviewed) * 100) : 0;

  const reviewCards = studyCards.filter(c => results[c.id] === "review");

  return (
    <div style={{ fontFamily: "inherit" }}>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("create")}
          className="px-5 py-2 rounded-full text-[12px] font-semibold transition-all"
          style={{
            background: mode === "create" ? "#e67e22" : "rgba(230,126,34,0.1)",
            color: mode === "create" ? "#ffffff" : "#e67e22",
            border: `1px solid ${mode === "create" ? "#e67e22" : "rgba(230,126,34,0.3)"}`,
          }}
        >
          Create
        </button>
        <button
          onClick={startStudy}
          className="px-5 py-2 rounded-full text-[12px] font-semibold transition-all"
          style={{
            background: mode === "study" ? "#1e3a5f" : "rgba(30,58,95,0.1)",
            color: mode === "study" ? "#e0f0ff" : "#1e3a5f",
            border: `1px solid ${mode === "study" ? "#1e3a5f" : "rgba(30,58,95,0.3)"}`,
          }}
        >
          Study ({cards.length} cards)
        </button>
      </div>

      {mode === "create" && (
        <div className="space-y-4">
          <div className="rounded-[18px] p-5" style={{ background: "#fffef9", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: "rgba(44,62,80,0.5)" }}>
              Deck Name
            </label>
            <input
              value={deckName}
              onChange={e => setDeckName(e.target.value)}
              placeholder="My Study Deck"
              className="w-full rounded-[10px] px-4 py-2.5 text-[14px] font-semibold outline-none"
              style={{ background: "#f5ede0", border: "1px solid rgba(0,0,0,0.08)", color: "#2c3e50", fontFamily: "inherit" }}
            />
          </div>

          <div className="rounded-[18px] p-5 space-y-3" style={{ background: "#fffef9", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(44,62,80,0.5)" }}>Add New Card</p>
            <input
              value={term}
              onChange={e => setTerm(e.target.value)}
              placeholder="Term or question..."
              className="w-full rounded-[10px] px-4 py-2.5 text-[13.5px] outline-none"
              style={{ background: "#f5ede0", border: "1px solid rgba(0,0,0,0.08)", color: "#2c3e50", fontFamily: "inherit" }}
            />
            <textarea
              value={definition}
              onChange={e => setDefinition(e.target.value)}
              placeholder="Definition or answer..."
              rows={3}
              className="w-full rounded-[10px] px-4 py-2.5 text-[13.5px] outline-none resize-none"
              style={{ background: "#f5ede0", border: "1px solid rgba(0,0,0,0.08)", color: "#2c3e50", fontFamily: "inherit" }}
            />
            <div className="flex gap-2">
              <button
                onClick={addCard}
                disabled={!term.trim() || !definition.trim()}
                className="px-5 py-2 rounded-[10px] text-[12px] font-semibold transition-opacity"
                style={{ background: "#e67e22", color: "#ffffff", opacity: (!term.trim() || !definition.trim()) ? 0.4 : 1 }}
              >
                Add Card
              </button>
              <button
                onClick={() => setShowImport(s => !s)}
                className="px-5 py-2 rounded-[10px] text-[12px] font-semibold transition-all"
                style={{ background: "rgba(44,62,80,0.08)", color: "#2c3e50" }}
              >
                Import CSV
              </button>
            </div>
          </div>

          {showImport && (
            <div className="rounded-[18px] p-5 space-y-3" style={{ background: "#fffef9", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "rgba(44,62,80,0.5)" }}>
                Paste CSV — one card per line: <span style={{ color: "#e67e22" }}>term,definition</span>
              </p>
              <textarea
                value={csvText}
                onChange={e => setCsvText(e.target.value)}
                placeholder={"Paris,Capital of France\nBerlin,Capital of Germany"}
                rows={5}
                className="w-full rounded-[10px] px-4 py-2.5 text-[13px] outline-none resize-none"
                style={{ background: "#f5ede0", border: "1px solid rgba(0,0,0,0.08)", color: "#2c3e50", fontFamily: "monospace" }}
              />
              {importError && <p style={{ fontSize: "12px", color: "#c0392b" }}>{importError}</p>}
              <div className="flex gap-2">
                <button
                  onClick={importCsv}
                  disabled={!csvText.trim()}
                  className="px-5 py-2 rounded-[10px] text-[12px] font-semibold transition-opacity"
                  style={{ background: "#e67e22", color: "#ffffff", opacity: !csvText.trim() ? 0.4 : 1 }}
                >
                  Import
                </button>
                <button
                  onClick={() => { setShowImport(false); setCsvText(""); setImportError(""); }}
                  className="px-5 py-2 rounded-[10px] text-[12px] font-semibold"
                  style={{ background: "rgba(44,62,80,0.08)", color: "#2c3e50" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {cards.length === 0 && (
              <div className="rounded-[14px] px-5 py-8 text-center" style={{ background: "#fffef9", border: "1px dashed rgba(0,0,0,0.12)" }}>
                <p style={{ fontSize: "13px", color: "rgba(44,62,80,0.4)" }}>No cards yet. Add your first card above.</p>
              </div>
            )}
            {cards.map((card, i) => (
              <div key={card.id} className="rounded-[14px] px-5 py-4" style={{ background: "#fffef9", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                {editingId === card.id ? (
                  <div className="space-y-2">
                    <input
                      value={editTerm}
                      onChange={e => setEditTerm(e.target.value)}
                      className="w-full rounded-[8px] px-3 py-2 text-[13px] outline-none"
                      style={{ background: "#f5ede0", border: "1px solid rgba(0,0,0,0.08)", color: "#2c3e50", fontFamily: "inherit" }}
                    />
                    <textarea
                      value={editDefinition}
                      onChange={e => setEditDefinition(e.target.value)}
                      rows={2}
                      className="w-full rounded-[8px] px-3 py-2 text-[13px] outline-none resize-none"
                      style={{ background: "#f5ede0", border: "1px solid rgba(0,0,0,0.08)", color: "#2c3e50", fontFamily: "inherit" }}
                    />
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="px-4 py-1.5 rounded-[8px] text-[11px] font-semibold" style={{ background: "#e67e22", color: "#ffffff" }}>Save</button>
                      <button onClick={cancelEdit} className="px-4 py-1.5 rounded-[8px] text-[11px] font-semibold" style={{ background: "rgba(44,62,80,0.08)", color: "#2c3e50" }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 text-[10px] font-bold" style={{ color: "rgba(44,62,80,0.3)", fontFamily: "monospace", marginTop: "2px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[13.5px] truncate" style={{ color: "#2c3e50" }}>{card.term}</p>
                      <p className="text-[12px] mt-0.5 line-clamp-2" style={{ color: "rgba(44,62,80,0.5)", lineHeight: 1.5 }}>{card.definition}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button onClick={() => startEdit(card)} className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[13px] transition-opacity hover:opacity-70" style={{ background: "rgba(230,126,34,0.1)", color: "#e67e22" }}>✏</button>
                      <button onClick={() => deleteCard(card.id)} className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[13px] transition-opacity hover:opacity-70" style={{ background: "rgba(192,57,43,0.08)", color: "#c0392b" }}>✕</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {cards.length > 0 && (
            <div className="pt-2">
              <button
                onClick={startStudy}
                className="w-full py-3.5 rounded-[14px] text-[13px] font-semibold transition-opacity hover:opacity-90"
                style={{ background: "#1e3a5f", color: "#e0f0ff" }}
              >
                Study {cards.length} card{cards.length !== 1 ? "s" : ""} →
              </button>
            </div>
          )}
        </div>
      )}

      {mode === "study" && (
        <div className="space-y-5">
          {!studyDone ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: "rgba(44,62,80,0.45)" }}>
                  {deckName}
                </p>
                <div className="flex gap-2">
                  <button onClick={shuffle} className="px-3 py-1.5 rounded-full text-[10px] font-semibold transition-opacity hover:opacity-70" style={{ background: "rgba(44,62,80,0.08)", color: "#2c3e50" }}>
                    ⇄ Shuffle
                  </button>
                  <button onClick={() => setMode("create")} className="px-3 py-1.5 rounded-full text-[10px] font-semibold transition-opacity hover:opacity-70" style={{ background: "rgba(44,62,80,0.08)", color: "#2c3e50" }}>
                    Edit Deck
                  </button>
                </div>
              </div>

              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(44,62,80,0.1)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${studyCards.length > 0 ? ((studyIndex) / studyCards.length) * 100 : 0}%`, background: "#e67e22" }}
                />
              </div>
              <p className="text-[11px]" style={{ color: "rgba(44,62,80,0.4)" }}>
                Card {studyIndex + 1} of {studyCards.length} &nbsp;·&nbsp; {knownCount} known &nbsp;·&nbsp; {reviewCount} to review
              </p>

              <div
                className="relative cursor-pointer select-none"
                style={{ perspective: "1000px", height: "240px" }}
                onClick={() => setFlipped(f => !f)}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      background: "#fffef9",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "32px",
                    }}
                  >
                    <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(44,62,80,0.35)", marginBottom: "16px" }}>
                      Term
                    </p>
                    <p style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 700, color: "#2c3e50", textAlign: "center", lineHeight: 1.3 }}>
                      {studyCards[studyIndex]?.term}
                    </p>
                    <p style={{ fontSize: "11px", color: "rgba(44,62,80,0.3)", marginTop: "20px" }}>
                      Click or press Space to flip
                    </p>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "#1e3a5f",
                      border: "1px solid rgba(30,58,95,0.3)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "32px",
                    }}
                  >
                    <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(224,240,255,0.4)", marginBottom: "16px" }}>
                      Definition
                    </p>
                    <p style={{ fontSize: "clamp(13px,2vw,16px)", fontWeight: 500, color: "#e0f0ff", textAlign: "center", lineHeight: 1.6 }}>
                      {studyCards[studyIndex]?.definition}
                    </p>
                  </div>
                </div>
              </div>

              {flipped && (
                <div className="flex gap-3">
                  <button
                    onClick={() => markCard("know")}
                    className="flex-1 py-3 rounded-[12px] text-[13px] font-semibold transition-opacity hover:opacity-90"
                    style={{ background: "rgba(39,174,96,0.12)", color: "#27ae60", border: "1px solid rgba(39,174,96,0.25)" }}
                  >
                    Know it ✓
                  </button>
                  <button
                    onClick={() => markCard("review")}
                    className="flex-1 py-3 rounded-[12px] text-[13px] font-semibold transition-opacity hover:opacity-90"
                    style={{ background: "rgba(231,76,60,0.1)", color: "#e74c3c", border: "1px solid rgba(231,76,60,0.2)" }}
                  >
                    Review again ✗
                  </button>
                </div>
              )}

              {!flipped && results[studyCards[studyIndex]?.id] && (
                <div className="flex gap-3">
                  <button
                    onClick={goPrev}
                    disabled={studyIndex === 0}
                    className="flex-1 py-2.5 rounded-[12px] text-[12px] font-semibold transition-opacity"
                    style={{ background: "rgba(44,62,80,0.06)", color: "#2c3e50", opacity: studyIndex === 0 ? 0.3 : 1 }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={goNext}
                    disabled={studyIndex + 1 >= studyCards.length}
                    className="flex-1 py-2.5 rounded-[12px] text-[12px] font-semibold transition-opacity"
                    style={{ background: "rgba(44,62,80,0.06)", color: "#2c3e50", opacity: studyIndex + 1 >= studyCards.length ? 0.3 : 1 }}
                  >
                    Next →
                  </button>
                </div>
              )}

              {!flipped && !results[studyCards[studyIndex]?.id] && (
                <div className="flex gap-3">
                  <button
                    onClick={goPrev}
                    disabled={studyIndex === 0}
                    className="flex-1 py-2.5 rounded-[12px] text-[12px] font-semibold transition-opacity"
                    style={{ background: "rgba(44,62,80,0.06)", color: "#2c3e50", opacity: studyIndex === 0 ? 0.3 : 1 }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={goNext}
                    disabled={studyIndex + 1 >= studyCards.length}
                    className="flex-1 py-2.5 rounded-[12px] text-[12px] font-semibold transition-opacity"
                    style={{ background: "rgba(44,62,80,0.06)", color: "#2c3e50", opacity: studyIndex + 1 >= studyCards.length ? 0.3 : 1 }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-[20px] p-8 text-center" style={{ background: "#fffef9", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
                <p style={{ fontSize: "42px", fontWeight: 800, color: scorePercent >= 80 ? "#27ae60" : scorePercent >= 50 ? "#e67e22" : "#e74c3c" }}>
                  {scorePercent}%
                </p>
                <p className="font-semibold mt-1" style={{ fontSize: "16px", color: "#2c3e50" }}>
                  {knownCount} correct out of {studyCards.length} cards
                </p>
                <p style={{ fontSize: "13px", color: "rgba(44,62,80,0.45)", marginTop: "6px" }}>
                  {scorePercent >= 80 ? "Great work! You know most of these." : scorePercent >= 50 ? "Good progress — keep reviewing." : "Keep practicing — you'll get there."}
                </p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button onClick={restartDeck} className="px-6 py-2.5 rounded-[12px] text-[13px] font-semibold transition-opacity hover:opacity-90" style={{ background: "#e67e22", color: "#ffffff" }}>
                    Restart deck
                  </button>
                  <button onClick={() => setMode("create")} className="px-6 py-2.5 rounded-[12px] text-[13px] font-semibold" style={{ background: "rgba(44,62,80,0.08)", color: "#2c3e50" }}>
                    Edit deck
                  </button>
                </div>
              </div>

              {reviewCards.length > 0 && (
                <div className="rounded-[18px] p-5" style={{ background: "#fffef9", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: "#e74c3c" }}>
                    Cards to review ({reviewCards.length})
                  </p>
                  <div className="space-y-2">
                    {reviewCards.map(card => (
                      <div key={card.id} className="rounded-[10px] px-4 py-3" style={{ background: "rgba(231,76,60,0.05)", border: "1px solid rgba(231,76,60,0.15)" }}>
                        <p className="font-semibold text-[13px]" style={{ color: "#2c3e50" }}>{card.term}</p>
                        <p className="text-[12px] mt-0.5" style={{ color: "rgba(44,62,80,0.55)", lineHeight: 1.5 }}>{card.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
