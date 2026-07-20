import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUXE INTERIORS | Premium 3D Luxury Interior Design Studio",
  description:
    "Designing Spaces That Inspire. LUXE INTERIORS is an award-winning luxury architecture & interior design studio offering immersive 3D walkthroughs, custom high-end furniture planning, and AI-powered space recommendations.",
  keywords: [
    "Luxury Interior Design",
    "3D Interior Design",
    "Premium Architecture",
    "Virtual Reality Walkthrough",
    "Modern Interior Studio",
  ],
  authors: [{ name: "LUXE INTERIORS Team" }],
  openGraph: {
    title: "LUXE INTERIORS | Premium 3D Luxury Interior Design",
    description: "Designing Spaces That Inspire. Experience our custom 3D floor plans and high-end materials showcases.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full dark antialiased`}
      style={{ scrollBehavior: "auto" }}
    >
      <body className="bg-bg-dark text-white min-h-full font-sans antialiased overflow-x-hidden selection:bg-primary selection:text-bg-dark">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
