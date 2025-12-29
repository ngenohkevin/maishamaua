import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { elegantImages } from "@/lib/images";

const products = [
  { name: "White Rose Bouquet", price: "KSh 3,500", image: elegantImages.featured1 },
  { name: "Garden Peonies", price: "KSh 4,200", image: elegantImages.featured2 },
  { name: "Lily Arrangement", price: "KSh 5,800", image: elegantImages.featured3 },
];

export default function ElegantDesign() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#1a1916]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 dark:bg-[#1a1916]/90 backdrop-blur-md border-b border-[#E8E4DE] dark:border-[#2d2a24]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#8B7355] dark:text-[#a99274] text-sm hover:text-[#6B5A47] dark:hover:text-[#c4ab8a] transition-colors">
            &larr; Back to Designs
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl tracking-wide text-[#3D3428] dark:text-[#E8E4DE]">
            Maisha Maua
          </h1>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm text-[#6B5A47] dark:text-[#a99274]">
              <a href="#collection" className="hover:text-[#3D3428] dark:hover:text-[#E8E4DE] transition-colors">Collection</a>
              <a href="#about" className="hover:text-[#3D3428] dark:hover:text-[#E8E4DE] transition-colors">About</a>
              <a href="#contact" className="hover:text-[#3D3428] dark:hover:text-[#E8E4DE] transition-colors">Contact</a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={elegantImages.hero}
            alt="Elegant flower arrangement"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#FAF8F5]/70 dark:bg-[#1a1916]/80" />
        </div>
        <div className="relative text-center max-w-2xl px-6 pt-16">
          <p className="text-[#6B5A47] dark:text-[#c4ab8a] uppercase tracking-[0.3em] text-sm mb-4 font-medium">
            Nairobi&apos;s Finest Florist
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl text-[#2A241B] dark:text-[#F5F0E8] mb-6 leading-tight drop-shadow-sm">
            Timeless
            <br />
            <span className="italic">Elegance</span>
          </h2>
          <p className="text-[#5C4D42] dark:text-[#c4ab8a] text-lg mb-8 leading-relaxed max-w-lg mx-auto">
            Handcrafted floral arrangements for life&apos;s most beautiful moments.
            Delivered with care across Nairobi.
          </p>
          <Button className="bg-[#3D3428] dark:bg-[#E8E4DE] hover:bg-[#2A241B] dark:hover:bg-[#d4cfc7] text-[#FAF8F5] dark:text-[#1a1916] px-8 py-6 text-sm tracking-wider rounded-none">
            View Collection
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section id="collection" className="py-24 px-6 bg-[#FAF8F5] dark:bg-[#1a1916]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#8B7355] dark:text-[#a99274] uppercase tracking-[0.2em] text-sm mb-3">Our Selection</p>
            <h3 className="font-[family-name:var(--font-playfair)] text-4xl text-[#3D3428] dark:text-[#E8E4DE]">
              Signature Arrangements
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="border-0 shadow-none bg-transparent group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-[family-name:var(--font-playfair)] text-xl text-[#3D3428] dark:text-[#E8E4DE] mb-2">
                      {product.name}
                    </h4>
                    <p className="text-[#8B7355] dark:text-[#a99274]">{product.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-xs mx-auto">
        <div className="h-px bg-[#E8E4DE] dark:bg-[#2d2a24]" />
      </div>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#FAF8F5] dark:bg-[#1a1916]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square">
            <Image
              src={elegantImages.about}
              alt="About Maisha Maua"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[#8B7355] dark:text-[#a99274] uppercase tracking-[0.2em] text-sm mb-3">Our Story</p>
            <h3 className="font-[family-name:var(--font-playfair)] text-4xl text-[#3D3428] dark:text-[#E8E4DE] mb-6">
              Crafted with Love
            </h3>
            <p className="text-[#6B5A47] dark:text-[#a99274] leading-relaxed mb-6">
              At Maisha Maua, we believe flowers are more than just blooms — they are expressions of love,
              celebration, and heartfelt moments. Based in the heart of Nairobi, we source the finest
              flowers to create arrangements that speak volumes.
            </p>
            <p className="text-[#6B5A47] dark:text-[#a99274] leading-relaxed">
              Each bouquet is thoughtfully designed to bring joy and elegance to every occasion,
              from intimate gatherings to grand celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#EDE9E3] dark:bg-[#242118] py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#8B7355] dark:text-[#a99274] uppercase tracking-[0.2em] text-sm mb-3">Get in Touch</p>
          <h3 className="font-[family-name:var(--font-playfair)] text-4xl text-[#3D3428] dark:text-[#E8E4DE] mb-6">
            Order Your Blooms
          </h3>
          <p className="text-[#6B5A47] dark:text-[#a99274] mb-8">
            Contact us via WhatsApp for custom orders and same-day delivery across Nairobi.
          </p>
          <Button className="bg-[#5C8A4D] hover:bg-[#4A7340] text-white px-8 py-6 text-sm tracking-wider rounded-none">
            WhatsApp: +254 700 000 000
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3D3428] dark:bg-[#0f0e0b] text-[#a99274] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <h4 className="font-[family-name:var(--font-playfair)] text-2xl text-[#E8E4DE]">Maisha Maua</h4>
          <p className="text-sm">Nairobi, Kenya &bull; Delivering Beauty Daily</p>
          <p className="text-sm">&copy; 2024 Maisha Maua</p>
        </div>
      </footer>
    </div>
  );
}
