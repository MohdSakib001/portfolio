import React from "react";

const Container = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <section
      className={`px-4 sm:px-6 md:px-10 lg:px-16 py-24 sm:mx-6 md:mx-10 lg:mx-16 max-w-6xl mx-auto ${className || ""}`}
      style={style}
    >
      {children}
    </section>
  );
};

export default Container;
