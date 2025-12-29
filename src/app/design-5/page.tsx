import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { kenyanImages } from "@/lib/images";

const products = [
  { name: "Tropical Heliconia", price: "KSh 3,200", tag: "Local Favorite", image: kenyanImages.featured1 },
  { name: "Protea Mix", price: "KSh 4,000", tag: "Bold", image: kenyanImages.featured2 },
  { name: "Safari Sunset", price: "KSh 4,800", tag: "Premium", image: kenyanImages.featured3 },
];

const features = [
  { title: "100% Kenyan", desc: "All our flowers are grown right here in Kenya" },
  { title: "Bold & Unique", desc: "Tropical blooms you won't find anywhere else" },
  { title: "Supporting Local", desc: "Every purchase supports Kenyan farmers" },
];

export default function KenyanDesign() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] dark:bg-[#1a1612]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFBF5]/90 dark:bg-[#1a1612]/90 backdrop-blur-md border-b border-[#E8D5C4] dark:border-[#2d251e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="text-[#B8860B] dark:text-[#d4a01a] text-xs sm:text-sm hover:text-[#8B6914] dark:hover:text-[#e8b82e] transition-colors">
            &larr; <span className="hidden sm:inline">Back to Designs</span><span className="sm:hidden">Back</span>
          </Link>
          <h1 className="text-base sm:text-2xl font-bold text-[#2D1810] dark:text-[#F5EDE5] tracking-tight">
            MAISHA MAUA
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex gap-6 text-sm font-medium text-[#5C3D2E] dark:text-[#c4a890]">
              <a href="#shop" className="hover:text-[#B8860B] dark:hover:text-[#d4a01a] transition-colors">Shop</a>
              <a href="#about" className="hover:text-[#B8860B] dark:hover:text-[#d4a01a] transition-colors">Our Story</a>
              <a href="#contact" className="hover:text-[#B8860B] dark:hover:text-[#d4a01a] transition-colors">Contact</a>
            </div>
            <ThemeToggle />
            <Button className="bg-[#B8860B] hover:bg-[#8B6914] text-white rounded-full px-3 sm:px-6 text-xs sm:text-sm">
              Order
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src={kenyanImages.hero}
            alt="Tropical Kenyan flowers"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFBF5] dark:from-[#1a1612] via-[#FFFBF5]/80 dark:via-[#1a1612]/80 to-[#FFFBF5]/50 dark:to-transparent sm:to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32 pt-20 w-full">
          <div className="max-w-xl mx-auto sm:mx-0 text-center sm:text-left">
            <Badge className="bg-[#B8860B]/10 dark:bg-[#B8860B]/20 text-[#B8860B] dark:text-[#d4a01a] border-[#B8860B] dark:border-[#d4a01a] mb-4 sm:mb-6 text-xs sm:text-sm">
              Proudly Kenyan
            </Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#2D1810] dark:text-[#F5EDE5] mb-4 sm:mb-6 leading-tight">
              Bold Blooms
              <br />
              <span className="text-[#B8860B] dark:text-[#d4a01a]">from Home</span>
            </h2>
            <p className="text-base sm:text-xl text-[#5C3D2E] dark:text-[#c4a890] mb-6 sm:mb-8 leading-relaxed">
              Celebrate Kenya&apos;s incredible floral diversity. From tropical heliconias
              to stunning proteas — flowers as vibrant as our culture.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
              <Button className="bg-[#2D1810] dark:bg-[#B8860B] hover:bg-[#1a0f0a] dark:hover:bg-[#8B6914] text-white px-5 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg rounded-full">
                Explore Collection
              </Button>
              <Button variant="outline" className="border-2 border-[#B8860B] text-[#B8860B] dark:text-[#d4a01a] hover:bg-[#B8860B]/10 px-5 sm:px-8 py-4 sm:py-6 text-sm sm:text-lg rounded-full">
                Our Story
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-[#FFFBF5] dark:from-[#1a1612] to-transparent" />
      </section>

      {/* Features */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-[#2D1810] dark:bg-[#0f0b08]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center py-4 sm:py-6">
                <h3 className="text-lg sm:text-xl font-bold text-[#B8860B] mb-2">{feature.title}</h3>
                <p className="text-[#c4a890] text-sm sm:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#FFFBF5] dark:bg-[#1a1612]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-[#B8860B]/10 dark:bg-[#B8860B]/20 text-[#B8860B] dark:text-[#d4a01a] border-[#B8860B] dark:border-[#d4a01a] mb-3 sm:mb-4 text-xs sm:text-sm">
              Fresh This Week
            </Badge>
            <h3 className="text-2xl sm:text-4xl font-bold text-[#2D1810] dark:text-[#F5EDE5]">
              Our Tropical Selection
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {products.map((product, index) => (
              <Card key={index} className="border-2 border-[#E8D5C4] dark:border-[#2d251e] hover:border-[#B8860B] dark:hover:border-[#B8860B] transition-all duration-300 overflow-hidden group bg-white dark:bg-[#0f0b08] rounded-xl">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#B8860B] text-white border-0 text-xs sm:text-sm">
                      {product.tag}
                    </Badge>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-bold text-[#2D1810] dark:text-[#F5EDE5] mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-xl sm:text-2xl font-bold text-[#B8860B] dark:text-[#d4a01a]">{product.price}</p>
                      <Button className="bg-[#2D1810] dark:bg-[#B8860B] hover:bg-[#1a0f0a] dark:hover:bg-[#8B6914] text-white rounded-full text-xs sm:text-sm px-3 sm:px-4">
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#F5EDE5] dark:bg-[#0f0b08]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={kenyanImages.about}
              alt="Kenyan flower farms"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <Badge className="bg-[#B8860B]/10 dark:bg-[#B8860B]/20 text-[#B8860B] dark:text-[#d4a01a] border-[#B8860B] dark:border-[#d4a01a] mb-3 sm:mb-4 text-xs sm:text-sm">
              Our Roots
            </Badge>
            <h3 className="text-2xl sm:text-4xl font-bold text-[#2D1810] dark:text-[#F5EDE5] mb-4 sm:mb-6">
              Celebrating Kenyan Flora
            </h3>
            <p className="text-base sm:text-lg text-[#5C3D2E] dark:text-[#c4a890] leading-relaxed mb-4 sm:mb-6">
              Kenya is home to some of the world&apos;s most spectacular flowers.
              From the highlands of the Rift Valley to the tropical coast, our land
              produces blooms of extraordinary beauty.
            </p>
            <p className="text-base sm:text-lg text-[#5C3D2E] dark:text-[#c4a890] leading-relaxed mb-6 sm:mb-8">
              At Maisha Maua, we&apos;re proud to showcase these treasures. We work directly
              with local farmers to bring you flowers that represent the best of Kenya —
              bold, vibrant, and full of life.
            </p>
            <div className="flex gap-6 sm:gap-8 justify-center md:justify-start">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[#B8860B]">50+</p>
                <p className="text-xs sm:text-sm text-[#5C3D2E] dark:text-[#c4a890]">Local Farms</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[#B8860B]">1000+</p>
                <p className="text-xs sm:text-sm text-[#5C3D2E] dark:text-[#c4a890]">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[#B8860B]">100%</p>
                <p className="text-xs sm:text-sm text-[#5C3D2E] dark:text-[#c4a890]">Kenyan Grown</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-12 sm:py-24 px-4 sm:px-6 bg-[#B8860B]">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Experience Kenya&apos;s Best?
          </h3>
          <p className="text-[#F5EDE5] text-base sm:text-lg mb-6 sm:mb-8">
            Order via WhatsApp for tropical arrangements, corporate orders,
            and same-day delivery across Nairobi.
          </p>
          <Button className="bg-white text-[#B8860B] hover:bg-[#F5EDE5] px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-bold rounded-full">
            Chat on WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D1810] dark:bg-[#0a0705] text-[#c4a890] py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center">
            <h4 className="text-lg sm:text-2xl font-bold text-white">MAISHA MAUA</h4>
            <div className="flex gap-6 text-xs sm:text-sm">
              <a href="https://www.instagram.com/maishamaua.flower.shop.ruaka/" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8860B] transition-colors">Instagram</a>
              <a href="https://wa.me/254725496220" target="_blank" rel="noopener noreferrer" className="hover:text-[#B8860B] transition-colors">WhatsApp</a>
            </div>
            <p className="text-xs sm:text-sm">&copy; 2024 Maisha Maua. Proudly Kenyan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
