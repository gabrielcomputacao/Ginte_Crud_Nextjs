import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MainLayout } from "./layout/layout";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </MainLayout>
  );
}
