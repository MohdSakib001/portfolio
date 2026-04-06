"use client";

import { useState } from "react";
import Loader from "./components/Loader";
import Home from "./pages/home";

export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Home />
      {loading && <Loader onComplete={() => setLoading(false)} />}
    </>
  );
}