"use client";

import { useState, useEffect } from "react";
import Loader from "./Loader";

export default function ClientLoaderWrapper() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  if (!loading) return null;

  return <Loader onComplete={() => setLoading(false)} />;
}
