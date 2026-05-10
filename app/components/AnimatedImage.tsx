"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const AnimatedImage = ({
  url,
  className,
  style,
}: {
  url: string;
  className?: string;
  style: string;
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  const images = Array(5).fill(url);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <div
      className={`relative w-full h-full flex justify-start ${style} overflow-hidden`}
    >
      {images.map((src, index) => {
        const opacity = [1, 0.2, 0.15, 0.1, 0.05][index];

        return (
          <motion.div
            key={index}
            className={`absolute`}
            initial={{ opacity: 0, x: 150 * index }}
            animate={
              isAnimated
                ? { opacity: opacity, x: 60 * index }
                : { opacity: 0, x: 150 * index }
            }
            transition={{
              duration: 1.5,
              delay: index * 0.3,
            }}
            style={{
              zIndex: images.length - index,
            }}
          >
            <div className="relative h-32 w-40">
              <Image src={src} alt={`Layer ${index}`} fill />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnimatedImage;
