import type { Metadata } from "next";
import { NO_INDEX } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Order status",
  robots: NO_INDEX,
};

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
