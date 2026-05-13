import React from "react";

const BlurContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`backdrop-blur-sm ${className || ""}`}
      style={{
        background: "rgba(255,255,255,0.85)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.88), 0 2px 12px rgba(0,0,0,0.055)",
      }}
    >
      {children}
    </div>
  );
};

export default BlurContainer;
8;
