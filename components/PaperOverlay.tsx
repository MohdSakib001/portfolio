/** Paper-grain wash that sits on top of every pastel panel. */
export default function PaperOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-45"
      style={{
        backgroundImage: `url("/assets/paper-texture.avif")`,
        backgroundSize: "cover",
      }}
    />
  );
}
