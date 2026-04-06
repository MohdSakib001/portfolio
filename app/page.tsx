import ClientLoaderWrapper from "./components/ClientLoaderWrapper";
import Home from "./pages/home";

export default function Page() {
  return (
    <>
      <ClientLoaderWrapper />
      <Home />
    </>
  );
}