import { Arimo } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo",
});

export const metadata = {
  title: "VONNECT",
  description: "VONNECT",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={arimo.variable}>
      <body>
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
