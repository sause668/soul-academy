import { Sour_Gummy, Balsamiq_Sans, Roboto_Flex, Geist, Geist_Mono, Delius } from "next/font/google";

export const sourGummy = Sour_Gummy({
    variable: "--font-sour-gummy",
    subsets: ["latin"],
  });
  
  export const balsamiqSans = Balsamiq_Sans({
    variable: "--font-balsamiq-sans",
    weight: ["400", "700"],
    subsets: ["latin"],
  });
  
  export const robotoFlex = Roboto_Flex({
    variable: "--font-roboto-flex",
    weight: ["400", "700"],
    subsets: ["latin"],
  });

  export const delius = Delius({
    variable: "--font-delius",
    weight: '400',
    subsets: ["latin"],
  });
  
  export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
  export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });