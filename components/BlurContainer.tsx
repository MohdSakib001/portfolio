import React from "react";

const BlurContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`bg-white/85 ${className || ""}`}>{children}</div>;
};

export default BlurContainer;
