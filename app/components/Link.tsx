import Link from "next/link";

const MyLink = ({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) => {
  return (
    <Link
      href={href}
      className="text-caption tracking-[0.03em] font-medium"
      title={title}
    >
      {text}
    </Link>
  );
};

export default MyLink;
