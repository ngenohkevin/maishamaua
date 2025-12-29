import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { romanticImages } from "@/lib/images";

const products = [
  { name: "Blush Peonies", price: "KSh 4,500", image: romanticImages.featured1 },
  { name: "Rose Garden", price: "KSh 3,800", image: romanticImages.featured2 },
  { name: "Champagne Dreams", price: "KSh 5,200", image: romanticImages.featured3 },
];

const occasions = [
  { name: "Weddings", desc: "Bridal bouquets, centerpieces & venue decor" },
  { name: "Anniversaries", desc: "Celebrate your love story" },
  { name: "Proposals", desc: "Make the moment unforgettable" },
  { name: "Just Because", desc: "No reason needed to show love" },
];

export default function RomanticDesign() {
  return (
    <div className="min-h-screen bg-[#FDF8F6] dark:bg-[#1a1517]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F6]/90 dark:bg-[#1a1517]/90 backdrop-blur-md border-b border-[#F0E6E2] dark:border-[#2d2528]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="text-[#B8A099] dark:text-[#a08a85] text-xs sm:text-sm hover:text-[#8A6F68] dark:hover:text-[#c4aba5] transition-colors">
            &larr; <span className="hidden sm:inline">Back to Designs</span><span className="sm:hidden">Back</span>
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl text-[#5C4A45] dark:text-[#E8DED8] italic">
            Maisha Maua
          </h1>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex gap-6 text-sm text-[#8A6F68] dark:text-[#a08a85]">
              <a href="#collection" className="hover:text-[#5C4A45] dark:hover:text-[#E8DED8] transition-colors">Collection</a>
              <a href="#occasions" className="hover:text-[#5C4A45] dark:hover:text-[#E8DED8] transition-colors">Occasions</a>
              <a href="#contact" className="hover:text-[#5C4A45] dark:hover:text-[#E8DED8] transition-colors">Contact</a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={romanticImages.hero}
            alt="Romantic floral arrangement"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#FDF8F6]/60 dark:bg-[#1a1517]/70" />
        </div>

        <div className="relative text-center max-w-3xl px-4 sm:px-6 pt-20 sm:pt-16">
          <p className="text-[#B8A099] dark:text-[#a08a85] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-4 sm:mb-6">
            For Life&apos;s Most Precious Moments
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-7xl text-[#5C4A45] dark:text-[#E8DED8] mb-4 sm:mb-6 leading-tight">
            Love in
            <br />
            <span className="italic">Every Petal</span>
          </h2>
          <p className="text-[#8A6F68] dark:text-[#a08a85] text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto">
            Romantic arrangements crafted for weddings, anniversaries, and all the moments
            that deserve something truly special.
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
            <Button className="bg-[#C4A59E] dark:bg-[#8A6F68] hover:bg-[#B8968E] dark:hover:bg-[#7a5f58] text-white px-5 sm:px-8 py-4 sm:py-6 rounded-none tracking-wider text-sm sm:text-base">
              Shop Romance
            </Button>
            <Button variant="outline" className="border-[#C4A59E] dark:border-[#8A6F68] text-[#8A6F68] dark:text-[#a08a85] hover:bg-[#F0E6E2] dark:hover:bg-[#2d2528] px-5 sm:px-8 py-4 sm:py-6 rounded-none tracking-wider text-sm sm:text-base">
              Wedding Inquiry
            </Button>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="py-12 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#0f0d0e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <p className="text-[#B8A099] dark:text-[#a08a85] uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3">Our Signature</p>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl text-[#5C4A45] dark:text-[#E8DED8] italic">
              Romantic Collection
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <Card key={index} className="border-0 shadow-none bg-transparent group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4 sm:mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#5C4A45]/0 group-hover:bg-[#5C4A45]/10 transition-all duration-300" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-[#5C4A45] dark:text-[#E8DED8] mb-1 sm:mb-2 italic">
                      {product.name}
                    </h4>
                    <p className="text-[#B8A099] dark:text-[#a08a85] mb-3 sm:mb-4 text-sm sm:text-base">{product.price}</p>
                    <Button variant="outline" size="sm" className="border-[#C4A59E] dark:border-[#8A6F68] text-[#8A6F68] dark:text-[#a08a85] hover:bg-[#F0E6E2] dark:hover:bg-[#2d2528] rounded-none text-xs sm:text-sm">
                      Order Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section id="occasions" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#F5EEEB] dark:bg-[#1a1517]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <p className="text-[#B8A099] dark:text-[#a08a85] uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3">Perfect For</p>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl text-[#5C4A45] dark:text-[#E8DED8] italic">
              Every Special Occasion
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {occasions.map((occasion, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-white dark:bg-[#0f0d0e] rounded-lg">
                <h4 className="font-[family-name:var(--font-playfair)] text-base sm:text-xl text-[#5C4A45] dark:text-[#E8DED8] mb-1 sm:mb-2 italic">
                  {occasion.name}
                </h4>
                <p className="text-[#8A6F68] dark:text-[#a08a85] text-xs sm:text-sm">{occasion.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#0f0d0e]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="relative aspect-square sm:aspect-[4/5]">
            <Image
              src={romanticImages.about}
              alt="Our romantic arrangements"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-[#B8A099] dark:text-[#a08a85] uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3">Our Philosophy</p>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl text-[#5C4A45] dark:text-[#E8DED8] mb-4 sm:mb-6 italic">
              Where Love Blooms
            </h3>
            <p className="text-[#8A6F68] dark:text-[#a08a85] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              At Maisha Maua, we understand that some moments call for something extraordinary.
              Our romantic collection features the softest blush roses, delicate peonies, and
              dreamy garden florals — each arrangement designed to capture the essence of love.
            </p>
            <p className="text-[#8A6F68] dark:text-[#a08a85] leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Whether you&apos;re planning a wedding, celebrating an anniversary, or simply want
              to show someone you care, our team of floral artisans will create something
              that speaks from the heart.
            </p>
            <Button variant="outline" className="border-[#C4A59E] dark:border-[#8A6F68] text-[#8A6F68] dark:text-[#a08a85] hover:bg-[#F0E6E2] dark:hover:bg-[#2d2528] px-6 sm:px-8 py-4 sm:py-5 rounded-none text-sm sm:text-base">
              Wedding Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#C4A59E] dark:bg-[#5C4A45]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/80 uppercase tracking-[0.2em] text-xs sm:text-sm mb-2 sm:mb-3">Let&apos;s Create Magic</p>
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl text-white mb-4 sm:mb-6 italic">
            Start Your Love Story
          </h3>
          <p className="text-white/80 text-base sm:text-lg mb-6 sm:mb-8">
            Contact us for custom romantic arrangements, wedding consultations,
            and same-day delivery across Nairobi.
          </p>
          <Button className="bg-white text-[#8A6F68] hover:bg-[#F5EEEB] px-6 sm:px-10 py-4 sm:py-6 rounded-none tracking-wider text-sm sm:text-base">
            Chat on WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5C4A45] dark:bg-[#0f0d0e] text-[#c4aba5] py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center">
          <h4 className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl text-white italic">Maisha Maua</h4>
          <div className="flex gap-6 text-xs sm:text-sm">
            <a href="https://www.instagram.com/maishamaua.flower.shop.ruaka/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://wa.me/254725496220" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
          <p className="text-xs sm:text-sm">&copy; 2024 Maisha Maua. Made with love in Nairobi.</p>
        </div>
      </footer>
    </div>
  );
}
