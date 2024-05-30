import "@/app/(site)/globals.css";
import { Work_Sans } from "next/font/google"
import { OverlayMenu } from "@/app/(site)/components/Menu";
import { ORIGIN_PATH } from "@/utils/endpoint";
import { Toaster } from "@/components/ui/toaster"


import { cn } from "@/lib/utils"



const fontWorkSans = Work_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-Worksans",
})

export const metadata = {
  title: 'FMA Modeling Agency',
  description: 'FMA Modeling Agency is a modeling agency that provides models for fashion shows, commercials, and other events.',
  robots: {
    index: true,
  },
  openGraph: {
    title: 'FMA Modeling Agency',
    description: 'FMA Modeling Agency is a modeling agency that provides models for fashion shows, commercials, and other events.',
    url: 'https://www.studioblog.com',
    siteName: 'FMA Modeling Agency',
    images: [
      {
        url: `${ORIGIN_PATH}/Banner.jpg`,
        width: 800,
        height: 600,
        alt: 'Og Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FMA Modeling Agency',
    description: 'FMA Modeling Agency is a modeling agency that provides models for fashion shows, commercials, and other events.',
    site: '@studio_blog',
    creator: '@studio_blog',
    images: [`${ORIGIN_PATH}/Banner.jpg`],
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

// export const metadata = {
//   metadataBase: new URL('https://www.mbmdigitalhub.com/'),
//   title: "MBM DIGITAL HUB",
//   description: 'MBM Logistics LLC Company is a logistics company specializing in transportation and distribution services.',
//   type: 'website',
//   url: 'https://www.mbmdigitalhub.com/',
  // robots: {
  //   index: true,
  // },
//   icons: {
//     icon: [
//       '/advertising.png',
//     ],
//     apple: [
//       '/advertising.png',
//     ]
//   },
//   openGraph: {
//     title: "MBM Logistics LLC Company",
//     description: 'MBM Logistics LLC Company is a logistics company specializing in transportation and distribution services.',
//     url: 'https://www.mbmdigitalhub.com/',
//     siteName: 'MBM Logistics LLC Company',
//     image: 'https://i.postimg.cc/wjxmFN1P/pexels-david-dibert-1117210.jpg',
//     images: [
//       {
//         url: 'https://i.postimg.cc/wjxmFN1P/pexels-david-dibert-1117210.jpg',
//         secureUrl: 'https://i.postimg.cc/wjxmFN1P/pexels-david-dibert-1117210.jpg',
//         alt: 'Logo Website',
//         width: 1200,
//         height: 630,
//         type: 'image/png',
//       },
//     ],
//     locale: 'en-US',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'MBM Logistics LLC Company',
//     description: 'MBM Logistics LLC Company is a logistics company specializing in transportation and distribution services.',
//     creator: '@ditkos',
//     images: ['https://i.postimg.cc/wjxmFN1P/pexels-david-dibert-1117210.jpg'],
//   },
// }




export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontWorkSans.variable}`} >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontWorkSans.variable
        )}
      >
      <OverlayMenu />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
