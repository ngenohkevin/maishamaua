import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://maishamaua.iopulse.cloud/#business",
      name: "Maisha Maua",
      description:
        "Give them their flowers while they're still here. Customized bouquets for appreciation, celebrations, and meaningful moments.",
      url: "https://maishamaua.iopulse.cloud",
      image: "https://maishamaua.iopulse.cloud/images/logo.jpeg",
      telephone: "+254725496220",
      priceRange: "KSh 1,200 - KSh 12,000",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ruaka",
        addressRegion: "Nairobi",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -1.2095,
        longitude: 36.7803,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
      sameAs: [
        "https://www.instagram.com/maishamaua.flower.shop.ruaka",
        "https://www.tiktok.com/@maisha.maua",
        "https://www.facebook.com/share/1ByLchvJvv/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+254725496220",
        contactType: "customer service",
        availableLanguage: ["English", "Swahili"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://maishamaua.iopulse.cloud/#website",
      url: "https://maishamaua.iopulse.cloud",
      name: "Maisha Maua",
      description: "Flowers for Life's Beautiful Moments",
      publisher: {
        "@id": "https://maishamaua.iopulse.cloud/#business",
      },
    },
    {
      "@type": "Product",
      name: "Economy Bouquet",
      description: "Beautiful starter flower arrangement",
      offers: {
        "@type": "Offer",
        price: "1200",
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      name: "Premium Beauty Bouquet",
      description: "Luxurious premium flower collection",
      offers: {
        "@type": "Offer",
        price: "10000",
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      name: "Money Bouquet",
      description:
        "Real currency beautifully arranged with flowers - perfect for birthdays and celebrations",
      offers: {
        "@type": "Offer",
        priceRange: "KSh 2,300 - KSh 3,000",
        priceCurrency: "KES",
        availability: "https://schema.org/PreOrder",
      },
    },
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maisha Maua - Flowers for Life's Beautiful Moments",
  description:
    "Give them their flowers while they're still here. Customized bouquets for appreciation, celebrations, and meaningful moments. Flower delivery in Ruaka, Nairobi, Kenya.",
  keywords: [
    "flowers",
    "bouquets",
    "flower shop",
    "Nairobi",
    "Ruaka",
    "flower delivery",
    "gift flowers",
    "Kenya",
    "custom bouquets",
    "money bouquet",
    "celebration flowers",
  ],
  authors: [{ name: "Maisha Maua" }],
  creator: "Maisha Maua",
  publisher: "Maisha Maua",
  metadataBase: new URL("https://maishamaua.iopulse.cloud"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maisha Maua - Flowers for Life's Beautiful Moments",
    description:
      "Give them their flowers while they're still here. Customized bouquets for appreciation, celebrations, and meaningful moments.",
    url: "https://maishamaua.iopulse.cloud",
    siteName: "Maisha Maua",
    images: [
      {
        url: "/images/hero-bouquet.jpeg",
        width: 1200,
        height: 630,
        alt: "Beautiful flower bouquet from Maisha Maua",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maisha Maua - Flowers for Life's Beautiful Moments",
    description:
      "Give them their flowers while they're still here. Customized bouquets for appreciation, celebrations, and meaningful moments.",
    images: ["/images/hero-bouquet.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
