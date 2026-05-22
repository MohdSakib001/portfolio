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
  className,
}: {
  href: string;
  title: string;
  type: "img" | "svg" | "icon";
  img?: string;
  icon?: any;
  Svg?: any;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 bg-white shadow-md rounded-lg relative group/icon overflow-hidden hover:border-2 hover:border-black/30 group ${className}`}
    >
      <div className="absolute inset-0 z-10 bg-black/0 group-hover/icon:bg-gray-800 transition-all duration-300 flex items-center justify-center">
        <p className="text-white text-label opacity-0 group-hover/icon:opacity-100 transition-opacity text-center px-1">
          {title}
        </p>
      </div>

      {type === "svg" ? (
        <Svg />
      ) : type === "img" && img ? (
        <div className="w-full h-full relative">
          <Image src={img} alt={""} fill sizes={"40px"} />
        </div>
      ) : null}
    </Link>
  );
};

export default Icon;
