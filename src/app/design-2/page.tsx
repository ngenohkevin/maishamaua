import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { modernImages } from "@/lib/images";

const products = [
  { name: "Spring Garden", price: "KSh 2,800", tag: "Popular", image: modernImages.featured1 },
  { name: "Eucalyptus Mix", price: "KSh 3,200", tag: "New", image: modernImages.featured2 },
  { name: "White Dreams", price: "KSh 4,500", tag: "Premium", image: modernImages.featured3 },
];

const features = [
  { icon: "01", title: "Same Day Delivery", desc: "Order before 2PM for same-day delivery across Nairobi" },
  { icon: "02", title: "Fresh Guarantee", desc: "Every bloom is hand-picked and guaranteed fresh" },
  { icon: "03", title: "Custom Orders", desc: "Tell us your vision and we'll create something special" },
];

export default function ModernDesign() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0a0f0a]/90 backdrop-blur-md border-b border-[#E5EBE5] dark:border-[#1a2a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="text-[#6B8068] dark:text-[#8aab86] text-xs sm:text-sm hover:text-[#4A5D48] dark:hover:text-[#a8c9a4] transition-colors">
            &larr; <span className="hidden sm:inline">Back to Designs</span><span className="sm:hidden">Back</span>
          </Link>
          <h1 className="text-lg sm:text-2xl font-medium text-[#1a2a1a] dark:text-white tracking-tight">
            maisha maua
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" className="hidden md:flex text-[#4A5D48] dark:text-[#8aab86] hover:text-[#1a2a1a] dark:hover:text-white hover:bg-[#E5EBE5] dark:hover:bg-[#1a2a1a]">
              Shop
            </Button>
            <ThemeToggle />
            <Button className="bg-[#4A5D48] dark:bg-[#6B8068] hover:bg-[#3d4d3c] dark:hover:bg-[#5a6f58] text-white rounded-full px-4 sm:px-6 text-xs sm:text-sm">
              Order
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F9F5] dark:from-[#0a0f0a] via-white dark:via-[#0f1a0f] to-[#E5EBE5] dark:to-[#1a2a1a]" />

        {/* Mobile Hero Image */}
        <div className="relative w-full h-64 sm:h-80 lg:hidden mt-16">
          <Image
            src={modernImages.hero}
            alt="Fresh flowers"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90 dark:to-[#0a0f0a]/90" />
        </div>

        {/* Desktop Hero Image */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <Image
            src={modernImages.hero}
            alt="Fresh flowers"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#0a0f0a] via-white/60 dark:via-[#0a0f0a]/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-24 w-full">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <Badge className="bg-[#E5EBE5] dark:bg-[#1a2a1a] text-[#4A5D48] dark:text-[#8aab86] border-0 mb-4 sm:mb-6 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm">
              Fresh flowers, delivered daily
            </Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-[#1a2a1a] dark:text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight">
              Bring nature
              <br />
              into your space
            </h2>
            <p className="text-base sm:text-lg text-[#6B8068] dark:text-[#8aab86] mb-6 sm:mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
              Curated arrangements that blend modern aesthetics with the natural beauty
              of locally-sourced blooms.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center lg:justify-start">
              <Button className="bg-[#1a2a1a] dark:bg-white hover:bg-[#2a3a2a] dark:hover:bg-[#e5e5e5] text-white dark:text-[#1a2a1a] px-5 sm:px-8 py-4 sm:py-6 rounded-full text-sm sm:text-base">
                Browse Collection
              </Button>
              <Button variant="outline" className="border-[#4A5D48] dark:border-[#6B8068] text-[#4A5D48] dark:text-[#8aab86] hover:bg-[#E5EBE5] dark:hover:bg-[#1a2a1a] px-5 sm:px-8 py-4 sm:py-6 rounded-full text-sm sm:text-base">
                How it works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-[#F5F9F5] dark:bg-[#0f1a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-light text-[#4A5D48] dark:text-[#6B8068] mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-medium text-[#1a2a1a] dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-[#6B8068] dark:text-[#8aab86]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-white dark:bg-[#0a0f0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-16 gap-4">
            <div className="text-center md:text-left w-full md:w-auto">
              <p className="text-[#6B8068] dark:text-[#6B8068] text-xs sm:text-sm uppercase tracking-wider mb-2">Our collection</p>
              <h3 className="text-2xl sm:text-4xl font-medium text-[#1a2a1a] dark:text-white">Featured arrangements</h3>
            </div>
            <Button variant="ghost" className="text-[#4A5D48] dark:text-[#8aab86] hover:text-[#1a2a1a] dark:hover:text-white hidden md:flex">
              View all &rarr;
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {products.map((product, index) => (
              <Card key={index} className="border border-[#E5EBE5] dark:border-[#1a2a1a] hover:border-[#4A5D48] dark:hover:border-[#4A5D48] transition-all duration-300 overflow-hidden group bg-white dark:bg-[#0f1a0f] rounded-xl sm:rounded-2xl">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 dark:bg-[#1a2a1a]/90 text-[#4A5D48] dark:text-[#8aab86] border-0 rounded-full text-xs sm:text-sm">
                      {product.tag}
                    </Badge>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base sm:text-lg font-medium text-[#1a2a1a] dark:text-white mb-1">{product.name}</h4>
                        <p className="text-[#4A5D48] dark:text-[#6B8068] font-medium text-sm sm:text-base">{product.price}</p>
                      </div>
                      <Button size="sm" className="bg-[#4A5D48] dark:bg-[#6B8068] hover:bg-[#3d4d3c] dark:hover:bg-[#5a6f58] text-white rounded-full text-xs sm:text-sm px-3 sm:px-4">
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
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[#F5F9F5] dark:bg-[#0f1a0f]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="relative aspect-square sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden">
            <Image
              src={modernImages.about}
              alt="Our story"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-[#6B8068] dark:text-[#6B8068] text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">About us</p>
            <h3 className="text-2xl sm:text-4xl font-medium text-[#1a2a1a] dark:text-white mb-4 sm:mb-6">
              Fresh, local, sustainable
            </h3>
            <p className="text-base sm:text-lg text-[#6B8068] dark:text-[#8aab86] leading-relaxed mb-4 sm:mb-6">
              We work directly with flower farms across Kenya to bring you the freshest blooms.
              Every arrangement is crafted by hand in our Nairobi studio, with sustainability
              at the heart of everything we do.
            </p>
            <p className="text-base sm:text-lg text-[#6B8068] dark:text-[#8aab86] leading-relaxed mb-6 sm:mb-8">
              From weddings to everyday moments, we&apos;re here to help you express yourself
              through the timeless beauty of flowers.
            </p>
            <Button variant="outline" className="border-[#4A5D48] dark:border-[#6B8068] text-[#4A5D48] dark:text-[#8aab86] hover:bg-[#E5EBE5] dark:hover:bg-[#1a2a1a] rounded-full px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base">
              Learn more about us
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-[#4A5D48] dark:bg-[#1a2a1a]">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl sm:text-4xl font-medium text-white mb-4 sm:mb-6">
            Ready to order?
          </h3>
          <p className="text-[#c4d4c2] dark:text-[#8aab86] text-base sm:text-lg mb-6 sm:mb-8">
            WhatsApp us for custom orders, bulk pricing, and same-day delivery across Nairobi.
          </p>
          <Button className="bg-white text-[#4A5D48] hover:bg-[#E5EBE5] px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg rounded-full">
            Chat on WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2a1a] dark:bg-[#050a05] text-[#8aab86] py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center">
          <span className="text-lg sm:text-xl text-white font-medium">maisha maua</span>
          <div className="flex gap-6 sm:gap-8 text-xs sm:text-sm">
            <a href="https://www.instagram.com/maishamaua.flower.shop.ruaka/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://wa.me/254725496220" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
          <p className="text-xs sm:text-sm">&copy; 2024 Maisha Maua. Nairobi, Kenya</p>
        </div>
      </footer>
    </div>
  );
}
