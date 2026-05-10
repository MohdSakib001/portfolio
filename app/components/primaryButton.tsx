import Link from "next/link";

const PrimaryButton = ({
  href,
  title,
  text,
  size = "sm",
}: {
  href: string;
  title: string;
  text: string;
  size?: "sm" | "base" | "lg";
}) => {
  return (
    <Link
      href={href}
      className={`text-label uppercase tracking-[0.12em] font-semibold bg-black text-white ${size === "sm" ? "px-4 py-2" : size === "base" ? "px-6 py-4" : "px-4 py-2"}  rounded-4xl hover:bg-neutral-800 transition-colors duration-200`}
      title={title}
    >
      {text}
    </Link>
  );
};

export default PrimaryButton;
