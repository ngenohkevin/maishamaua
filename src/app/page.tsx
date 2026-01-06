import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { getProducts, getSiteSettings, formatPrice, getStrapiImageUrl, type Product, type SiteSettings } from "@/lib/strapi";

// Fallback static products (used if CMS is unavailable)
const staticProducts = [
  { name: "Economy Bouquet", price: 1200, image: "/images/warm-bouquet.jpeg", description: "Beautiful starter arrangement", size: "small" as const },
  { name: "Small Mixed Bouquet", price: 1500, image: "/images/autumn-bloom.jpeg", description: "Lovely mixed flower selection", size: "small" as const },
  { name: "Medium Mixed Bouquet", price: 2300, image: "/images/pink-roses.jpeg", description: "Perfect balance of blooms", size: "medium" as const },
  { name: "Large Mixed Bouquet", price: 3000, image: "/images/colorful-mix.jpeg", description: "Generous flower arrangement", size: "large" as const },
  { name: "Extra Large Bouquet", price: 4500, image: "/images/purple-elegance.jpeg", description: "Stunning statement piece", size: "extra-large" as const },
  { name: "Blast Bouquet", price: 6000, image: "/images/sunflower-mix.jpeg", description: "Impressive floral explosion", size: "extra-large" as const },
  { name: "Premium Beauty", price: 10000, image: "/images/hero-bouquet.jpeg", description: "Luxurious premium collection", size: "extra-large" as const },
  { name: "Just For You", price: 12000, image: "/images/green-yellow.jpeg", description: "Ultimate luxury bouquet", size: "extra-large" as const },
];

// Static image mapping for products without CMS images
const productImageMap: Record<string, string> = {
  "economy-bouquet": "/images/warm-bouquet.jpeg",
  "small-mixed-bouquet": "/images/autumn-bloom.jpeg",
  "medium-mixed-bouquet": "/images/pink-roses.jpeg",
  "large-mixed-bouquet": "/images/colorful-mix.jpeg",
  "extra-large-bouquet": "/images/purple-elegance.jpeg",
  "blast-bouquet": "/images/sunflower-mix.jpeg",
  "premium-beauty": "/images/hero-bouquet.jpeg",
  "just-for-you": "/images/green-yellow.jpeg",
  "money-bouquet": "/images/money_bouquet.jpeg",
  "lilies-only": "/images/hero-bouquet.jpeg",
  "sunflowers-only": "/images/sunflower-mix.jpeg",
  "peonies-only": "/images/pink-roses.jpeg",
};

const occasions = [
  { name: "Appreciation", desc: "Show gratitude to those who matter" },
  { name: "Celebrations", desc: "Birthdays, promotions & achievements" },
  { name: "Milestones", desc: "Anniversaries & special moments" },
  { name: "Just Because", desc: "No reason needed to show love" },
];

const WHATSAPP_LINK = "https://wa.me/message/CRZL573DJ5NSF1";
const WHATSAPP_NUMBER = "254725496220";

function getWhatsAppLink(productName?: string, price?: string) {
  if (!productName) return WHATSAPP_LINK;
  const message = `Hi! I'd like to order the *${productName}* (${price}).

Please let me know the next steps.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getCustomOrderLink(bouquetType?: string) {
  const message = bouquetType
    ? `Hi! I'm interested in ordering a custom *${bouquetType}*. Can you tell me more about pricing and availability?`
    : `Hi! I'd like to inquire about a custom bouquet order. Can you help me?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Helper to get product image URL
function getProductImage(product: Product): string {
  // If product has images from CMS, use the first one
  if (product.images && product.images.length > 0) {
    return getStrapiImageUrl(product.images[0]);
  }
  // Fallback to static image mapping
  return productImageMap[product.slug] || "/images/hero-bouquet.jpeg";
}

// Helper to format size for display
function formatSize(size?: string): string {
  if (!size) return "Standard";
  return size.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// Fallback site settings
const defaultSiteSettings = {
  businessName: "Maisha Maua",
  tagline: "Give them their flowers while they're still here",
  heroTitle: "Celebrate Life With Flowers",
  heroSubtitle: "Why wait for a special occasion? Show love, gratitude, and appreciation with customized bouquets and gifts — while they are still here.",
  whatsappLink: "https://wa.me/message/CRZL573DJ5NSF1",
  footerText: "Flowers for life's beautiful moments — not for farewells.",
  heroImage: null as SiteSettings["heroImage"] | null,
  logo: null as SiteSettings["logo"] | null,
  philosophyTitle: "Our Philosophy",
  philosophyContent: "At Maisha Maua, we believe that life's most meaningful moments deserve to be celebrated while people are still here. Flowers and gifts are not just for special occasions — they are a way to express love, gratitude, and appreciation in real time.",
};

export default async function MaishaMaua() {
  // Fetch products from CMS with fallback to static data
  let products: Array<{ name: string; price: number; image: string; description: string; size: string }> = [];
  let customBouquets: Array<{ name: string; description: string }> = [];
  let siteSettings = defaultSiteSettings;

  try {
    const cmsProducts = await getProducts({ available: true });

    if (cmsProducts && cmsProducts.length > 0) {
      // Separate standard and custom products
      const standardProducts = cmsProducts.filter(p => !p.customOrder).slice(0, 8);
      const customProducts = cmsProducts.filter(p => p.customOrder);

      products = standardProducts.map(p => ({
        name: p.name,
        price: p.price,
        image: getProductImage(p),
        description: p.description || "",
        size: formatSize(p.size),
      }));

      customBouquets = customProducts.map(p => ({
        name: p.name,
        description: p.description || "",
      }));
    } else {
      // Use static fallback
      products = staticProducts.map(p => ({
        ...p,
        size: formatSize(p.size),
      }));
      customBouquets = [
        { name: "Money Bouquet", description: "Real currency beautifully arranged with flowers" },
        { name: "Lilies Only", description: "Elegant pure lily arrangement" },
        { name: "Sunflowers Only", description: "Cheerful sunflower collection" },
        { name: "Peonies Only", description: "Romantic peony bouquet" },
      ];
    }
  } catch (error) {
    console.error("Failed to fetch products from CMS:", error);
    // Use static fallback on error
    products = staticProducts.map(p => ({
      ...p,
      size: formatSize(p.size),
    }));
    customBouquets = [
      { name: "Money Bouquet", description: "Real currency beautifully arranged with flowers" },
      { name: "Lilies Only", description: "Elegant pure lily arrangement" },
      { name: "Sunflowers Only", description: "Cheerful sunflower collection" },
      { name: "Peonies Only", description: "Romantic peony bouquet" },
    ];
  }

  // Fetch site settings
  try {
    const cmsSiteSettings = await getSiteSettings();
    if (cmsSiteSettings) {
      siteSettings = {
        businessName: cmsSiteSettings.businessName || defaultSiteSettings.businessName,
        tagline: cmsSiteSettings.tagline || defaultSiteSettings.tagline,
        heroTitle: cmsSiteSettings.heroTitle || defaultSiteSettings.heroTitle,
        heroSubtitle: cmsSiteSettings.heroSubtitle || defaultSiteSettings.heroSubtitle,
        whatsappLink: cmsSiteSettings.whatsappLink || defaultSiteSettings.whatsappLink,
        footerText: cmsSiteSettings.footerText || defaultSiteSettings.footerText,
        heroImage: cmsSiteSettings.heroImage || null,
        logo: cmsSiteSettings.logo || null,
        philosophyTitle: cmsSiteSettings.philosophyTitle || defaultSiteSettings.philosophyTitle,
        philosophyContent: cmsSiteSettings.philosophyContent || defaultSiteSettings.philosophyContent,
      };
    }
  } catch (error) {
    console.error("Failed to fetch site settings from CMS:", error);
  }

  // Helper to get image URL from CMS or fallback
  const getHeroImageUrl = () => {
    if (siteSettings.heroImage?.url) {
      return getStrapiImageUrl(siteSettings.heroImage);
    }
    return "/images/hero-bouquet.jpeg";
  };

  const getLogoUrl = () => {
    if (siteSettings.logo?.url) {
      return getStrapiImageUrl(siteSettings.logo);
    }
    return "/images/logo.jpeg";
  };

  return (
    <div className="min-h-screen bg-[#FDF8F6] dark:bg-[#1a1517]">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#4A5D48] focus:text-white focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <header>
        <nav
          className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F6]/90 dark:bg-[#1a1517]/90 backdrop-blur-md border-b border-[#F0E6E2] dark:border-[#2d2528]"
          aria-label="Main navigation"
        >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src={getLogoUrl()}
              alt={siteSettings.businessName}
              width={40}
              height={40}
              className="rounded-full sm:w-12 sm:h-12"
            />
            <h1 className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl text-[#5C4A45] dark:text-[#E8DED8] italic">
              {siteSettings.businessName}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex gap-6 text-sm text-[#8A6F68] dark:text-[#a08a85]">
              <a href="#bouquets" className="hover:text-[#5C4A45] dark:hover:text-[#E8DED8] transition-colors">Bouquets</a>
              <Link href="/gallery" className="hover:text-[#5C4A45] dark:hover:text-[#E8DED8] transition-colors">Gallery</Link>
              <a href="#about" className="hover:text-[#5C4A45] dark:hover:text-[#E8DED8] transition-colors">About</a>
              <a href="#contact" className="hover:text-[#5C4A45] dark:hover:text-[#E8DED8] transition-colors">Contact</a>
            </div>
            <ThemeToggle />
            <Link href={siteSettings.whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-5 text-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            </Link>
            <MobileNav />
          </div>
        </div>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-16" aria-labelledby="hero-heading">
        <div className="absolute inset-0">
          <Image
            src={getHeroImageUrl()}
            alt="Beautiful flower bouquet"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#FDF8F6]/70 dark:bg-[#1a1517]/80" />
        </div>

        <div className="relative text-center max-w-3xl px-4 sm:px-6 py-12">
          <Badge className="bg-[#4A5D48]/10 dark:bg-[#4A5D48]/20 text-[#4A5D48] dark:text-[#8aab86] border-[#4A5D48] dark:border-[#6B8068] mb-4 sm:mb-6 text-xs sm:text-sm">
            {siteSettings.tagline}
          </Badge>
          <h2 id="hero-heading" className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-7xl text-[#5C4A45] dark:text-[#E8DED8] mb-4 sm:mb-6 leading-tight">
            {siteSettings.heroTitle?.split(" ").slice(0, 2).join(" ")}
            <br />
            <span className="italic">{siteSettings.heroTitle?.split(" ").slice(2).join(" ")}</span>
          </h2>
          <p className="text-[#8A6F68] dark:text-[#a08a85] text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto">
            {siteSettings.heroSubtitle}
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
            <Link href={siteSettings.whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 sm:px-8 py-5 sm:py-6 rounded-full text-sm sm:text-base">
                <MessageCircle className="w-5 h-5 mr-2" />
                Order on WhatsApp
              </Button>
            </Link>
            <Link href="#bouquets">
              <Button variant="outline" className="border-[#5C4A45] dark:border-[#8A6F68] text-[#5C4A45] dark:text-[#a08a85] hover:bg-[#F0E6E2] dark:hover:bg-[#2d2528] px-6 sm:px-8 py-5 sm:py-6 rounded-full text-sm sm:text-base">
                View Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="bouquets" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#FDF8F6] dark:bg-[#1a1517]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <p className="text-[#8A6F68] dark:text-[#a08a85] uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3">Our Collection</p>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl text-[#5C4A45] dark:text-[#E8DED8] italic">
              Beautiful Bouquets
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <Card key={index} className="border border-[#F0E6E2] dark:border-[#2d2528] hover:border-[#4A5D48] dark:hover:border-[#4A5D48] transition-all duration-300 overflow-hidden group bg-white dark:bg-[#0f0d0e] rounded-xl">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                    />
                    <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#4A5D48] text-white border-0 text-[10px] sm:text-xs">
                      {product.size}
                    </Badge>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 className="font-[family-name:var(--font-playfair)] text-sm sm:text-lg text-[#5C4A45] dark:text-[#E8DED8] mb-1 italic line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[#8A6F68] dark:text-[#a08a85] text-[10px] sm:text-xs mb-2 line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm sm:text-lg font-semibold text-[#4A5D48] dark:text-[#8aab86]">{formatPrice(product.price)}</p>
                      <Link href={getWhatsAppLink(product.name, formatPrice(product.price))} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full text-[10px] sm:text-xs px-2 sm:px-3 h-7 sm:h-8">
                          Order
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Bouquets Section */}
          <div className="mt-12 sm:mt-16">
            <div className="text-center mb-6 sm:mb-8">
              <Badge className="bg-[#C4A59E]/20 text-[#8A6F68] dark:text-[#c4aba5] border-[#C4A59E] mb-3 text-xs">
                Advance Orders Required
              </Badge>
              <h4 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl text-[#5C4A45] dark:text-[#E8DED8] italic">
                Custom & Specialty Bouquets
              </h4>
              <p className="text-[#8A6F68] dark:text-[#a08a85] text-sm mt-2">
                Specific inspiration bouquets range between medium and large pricing
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {customBouquets.map((item, index) => (
                <div key={index} className="text-center p-4 sm:p-6 bg-white dark:bg-[#0f0d0e] rounded-xl border border-[#F0E6E2] dark:border-[#2d2528]">
                  <h5 className="font-[family-name:var(--font-playfair)] text-sm sm:text-base text-[#5C4A45] dark:text-[#E8DED8] italic mb-1">
                    {item.name}
                  </h5>
                  <p className="text-[#8A6F68] dark:text-[#a08a85] text-[10px] sm:text-xs">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href={getCustomOrderLink()} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#C4A59E] hover:bg-[#8A6F68] text-white rounded-full text-sm px-6 py-5">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Inquire About Custom Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 bg-[#4A5D48] dark:bg-[#2d3a2c]" aria-labelledby="philosophy-heading">
        <div className="max-w-4xl mx-auto text-center">
          <h3 id="philosophy-heading" className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl text-white mb-4 sm:mb-6 italic">
            {siteSettings.philosophyTitle}
          </h3>
          <p className="text-[#c4d4c2] text-base sm:text-lg leading-relaxed mb-6">
            {siteSettings.philosophyContent}
          </p>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white dark:bg-[#0f0d0e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#8A6F68] dark:text-[#a08a85] uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3">Perfect For</p>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl text-[#5C4A45] dark:text-[#E8DED8] italic">
              Every Meaningful Moment
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {occasions.map((occasion, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-[#FDF8F6] dark:bg-[#1a1517] rounded-xl">
                <h4 className="font-[family-name:var(--font-playfair)] text-base sm:text-xl text-[#5C4A45] dark:text-[#E8DED8] mb-1 sm:mb-2 italic">
                  {occasion.name}
                </h4>
                <p className="text-[#8A6F68] dark:text-[#a08a85] text-xs sm:text-sm">{occasion.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money Bouquet Feature */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-[#C4A59E] to-[#8A6F68] dark:from-[#5C4A45] dark:to-[#3d322f]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="/images/money_bouquet.jpeg"
              alt="Money Bouquet"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <Badge className="bg-white/20 text-white border-white/30 mb-4 text-xs sm:text-sm">
              Special Collection
            </Badge>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl text-white mb-4 sm:mb-6 italic">
              Money Bouquets
            </h3>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              A unique way to gift! Our stunning money bouquets combine real currency with
              beautiful flowers — perfect for birthdays, graduations, and celebrations
              that deserve something extra special.
            </p>
            <Link href={getCustomOrderLink("Money Bouquet")} target="_blank" rel="noopener noreferrer">
              <Button className="bg-white text-[#5C4A45] hover:bg-[#F0E6E2] px-6 sm:px-8 py-5 sm:py-6 rounded-full text-sm sm:text-base">
                <MessageCircle className="w-5 h-5 mr-2" />
                Inquire on WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#5C4A45] dark:bg-[#2d2528]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl text-white mb-4 sm:mb-6 italic">
            Ready to Celebrate Someone Special?
          </h3>
          <p className="text-[#c4aba5] text-base sm:text-lg mb-6 sm:mb-8">
            Order via WhatsApp for customized bouquets, gift combinations,
            and delivery across Nairobi. Let&apos;s create something beautiful together!
          </p>
          <Link href={siteSettings.whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg rounded-full">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </Link>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#3d322f] dark:bg-[#0f0d0e] text-[#c4aba5] py-10 sm:py-16 px-4 sm:px-6" aria-label="Site footer">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <Image
                  src={getLogoUrl()}
                  alt={siteSettings.businessName}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <h4 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl text-white italic">
                  {siteSettings.businessName}
                </h4>
              </div>
              <p className="text-sm text-[#a08a85]">
                {siteSettings.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h5 className="text-white font-medium mb-4">Quick Links</h5>
              <div className="flex flex-col gap-2 text-sm">
                <a href="#bouquets" className="hover:text-white transition-colors">Our Bouquets</a>
                <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            {/* Social */}
            <div className="text-center md:text-right">
              <h5 className="text-white font-medium mb-4">Connect With Us</h5>
              <div className="flex gap-4 justify-center md:justify-end">
                <a
                  href="https://www.instagram.com/maishamaua.flower.shop.ruaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-10 h-10 rounded-full bg-[#5C4A45] flex items-center justify-center hover:bg-[#E1306C] transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" aria-hidden="true" />
                </a>
                <a
                  href="https://www.tiktok.com/@maisha.maua"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on TikTok"
                  className="w-10 h-10 rounded-full bg-[#5C4A45] flex items-center justify-center hover:bg-black transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/1ByLchvJvv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="w-10 h-10 rounded-full bg-[#5C4A45] flex items-center justify-center hover:bg-[#1877F2] transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" aria-hidden="true" />
                </a>
                <a
                  href={siteSettings.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact us on WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#5C4A45] flex items-center justify-center hover:bg-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-[#5C4A45] pt-6 sm:pt-8 text-center">
            <p className="text-xs sm:text-sm text-[#8A6F68]">
              &copy; {new Date().getFullYear()} {siteSettings.businessName}. Ruaka, Nairobi, Kenya.
            </p>
            <p className="text-xs text-[#6B5A4D] mt-2">
              {siteSettings.footerText}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
