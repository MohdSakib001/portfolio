import Image from "next/image";
import Link from "next/link";
import React from "react";

const Icon = ({
  href,
  title,
  img,
  icon,
  Svg,
  type = "icon",
}: {
  href: string;
  title: string;
  type: "img" | "svg" | "icon";
  img?: string;
  icon?: any;
  Svg?: any;
}) => {
  return (
    <Link
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 p-1 bg-white shadow-md rounded-lg relative border-2 border-transparent hover:border-black/30 group"
    >
      <div className="group-[hover:block] hidden inset-0 absolute bg-black ">
        <p>{title}</p>
      </div>

      {type === "svg" ? (
        <Svg />
      ) : type === "img" ? (
        <div className="w-full h-full relative">
          <Image src={img ?? ""} alt={title} fill />
        </div>
      ) : null}
    </Link>
  );
};

export default Icon;
