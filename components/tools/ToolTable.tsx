import Container from "@/components/Container";

type ToolTableProps = {
  heading: string;
  description?: string;
  columns: string[];
  /** Row cells, aligned to `columns`. First cell is emphasised. */
  rows: (string | number)[][];
  /** Renders the first column in mono — right for syntax, codes, and units. */
  monoFirst?: boolean;
};

export default function ToolTable({
  heading,
  description,
  columns,
  rows,
  monoFirst = false,
}: ToolTableProps) {
  return (
    <Container className="py-12">
      <h2 className="text-title font-semibold tracking-tight">{heading}</h2>
      {description && (
        <p className="mt-3 max-w-2xl text-body leading-relaxed text-black/50">
          {description}
        </p>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
        <table className="w-full min-w-[34rem] border-collapse bg-white text-left">
          <thead>
            <tr className="border-b border-black/8">
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="whitespace-nowrap px-5 py-4 text-label font-semibold uppercase tracking-[0.16em] text-black/40"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-black/5 last:border-0"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      cellIndex === 0
                        ? `px-5 py-4 align-top text-caption font-medium text-black ${monoFirst ? "whitespace-nowrap font-mono" : ""}`
                        : "px-5 py-4 align-top text-caption leading-relaxed text-black/55"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
