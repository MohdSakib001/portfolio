import Container from "@/components/Container";

type ToolNotesProps = {
  heading: string;
  description?: string;
  notes: { title: string; body: string }[];
  /** Numbers each card — right for ordered techniques and step-by-step guides. */
  numbered?: boolean;
};

export default function ToolNotes({
  heading,
  description,
  notes,
  numbered = false,
}: ToolNotesProps) {
  return (
    <Container className="py-12">
      <h2 className="text-title font-semibold tracking-tight">{heading}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-body leading-relaxed text-black/50">
          {description}
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, index) => (
          <div
            key={note.title}
            className="rounded-2xl bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
          >
            {numbered && (
              <p className="mb-3 font-mono text-label font-semibold tracking-[0.16em] text-black/30">
                {String(index + 1).padStart(2, "0")}
              </p>
            )}
            <h3 className="text-caption font-semibold text-black">
              {note.title}
            </h3>
            <p className="mt-2 text-caption leading-relaxed text-black/50">
              {note.body}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
