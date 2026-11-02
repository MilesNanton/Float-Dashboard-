import type { Metadata } from "next";
import "@fontsource/courier-prime/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Float Dashboard",
  description: "Float operations dashboard",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
