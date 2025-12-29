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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-[#6B8068] dark:text-[#8aab86] text-sm hover:text-[#4A5D48] dark:hover:text-[#a8c9a4] transition-colors">
            &larr; Back to Designs
          </Link>
          <h1 className="text-2xl font-medium text-[#1a2a1a] dark:text-white tracking-tight">
            maisha maua
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex text-[#4A5D48] dark:text-[#8aab86] hover:text-[#1a2a1a] dark:hover:text-white hover:bg-[#E5EBE5] dark:hover:bg-[#1a2a1a]">
              Shop
            </Button>
            <ThemeToggle />
            <Button className="bg-[#4A5D48] dark:bg-[#6B8068] hover:bg-[#3d4d3c] dark:hover:bg-[#5a6f58] text-white rounded-full px-6">
              Order Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F9F5] dark:from-[#0a0f0a] via-white dark:via-[#0f1a0f] to-[#E5EBE5] dark:to-[#1a2a1a]" />
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

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-xl">
            <Badge className="bg-[#E5EBE5] dark:bg-[#1a2a1a] text-[#4A5D48] dark:text-[#8aab86] border-0 mb-6 rounded-full px-4 py-1.5">
              Fresh flowers, delivered daily
            </Badge>
            <h2 className="text-5xl md:text-6xl font-medium text-[#1a2a1a] dark:text-white mb-6 leading-[1.1] tracking-tight">
              Bring nature
              <br />
              into your space
            </h2>
            <p className="text-lg text-[#6B8068] dark:text-[#8aab86] mb-8 leading-relaxed max-w-md">
              Curated arrangements that blend modern aesthetics with the natural beauty
              of locally-sourced blooms.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button className="bg-[#1a2a1a] dark:bg-white hover:bg-[#2a3a2a] dark:hover:bg-[#e5e5e5] text-white dark:text-[#1a2a1a] px-8 py-6 rounded-full text-base">
                Browse Collection
              </Button>
              <Button variant="outline" className="border-[#4A5D48] dark:border-[#6B8068] text-[#4A5D48] dark:text-[#8aab86] hover:bg-[#E5EBE5] dark:hover:bg-[#1a2a1a] px-8 py-6 rounded-full text-base">
                How it works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[#F5F9F5] dark:bg-[#0f1a0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-light text-[#4A5D48] dark:text-[#6B8068] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-[#1a2a1a] dark:text-white mb-2">{feature.title}</h3>
                <p className="text-[#6B8068] dark:text-[#8aab86]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 px-6 bg-white dark:bg-[#0a0f0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <p className="text-[#6B8068] dark:text-[#6B8068] text-sm uppercase tracking-wider mb-2">Our collection</p>
              <h3 className="text-4xl font-medium text-[#1a2a1a] dark:text-white">Featured arrangements</h3>
            </div>
            <Button variant="ghost" className="text-[#4A5D48] dark:text-[#8aab86] hover:text-[#1a2a1a] dark:hover:text-white">
              View all &rarr;
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="border border-[#E5EBE5] dark:border-[#1a2a1a] hover:border-[#4A5D48] dark:hover:border-[#4A5D48] transition-all duration-300 overflow-hidden group bg-white dark:bg-[#0f1a0f] rounded-2xl">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-white/90 dark:bg-[#1a2a1a]/90 text-[#4A5D48] dark:text-[#8aab86] border-0 rounded-full">
                      {product.tag}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-[#1a2a1a] dark:text-white mb-1">{product.name}</h4>
                        <p className="text-[#4A5D48] dark:text-[#6B8068] font-medium">{product.price}</p>
                      </div>
                      <Button size="sm" className="bg-[#4A5D48] dark:bg-[#6B8068] hover:bg-[#3d4d3c] dark:hover:bg-[#5a6f58] text-white rounded-full">
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
      <section className="py-24 px-6 bg-[#F5F9F5] dark:bg-[#0f1a0f]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={modernImages.about}
              alt="Our story"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-[#6B8068] dark:text-[#6B8068] text-sm uppercase tracking-wider mb-4">About us</p>
            <h3 className="text-4xl font-medium text-[#1a2a1a] dark:text-white mb-6">
              Fresh, local, sustainable
            </h3>
            <p className="text-lg text-[#6B8068] dark:text-[#8aab86] leading-relaxed mb-6">
              We work directly with flower farms across Kenya to bring you the freshest blooms.
              Every arrangement is crafted by hand in our Nairobi studio, with sustainability
              at the heart of everything we do.
            </p>
            <p className="text-lg text-[#6B8068] dark:text-[#8aab86] leading-relaxed mb-8">
              From weddings to everyday moments, we&apos;re here to help you express yourself
              through the timeless beauty of flowers.
            </p>
            <Button variant="outline" className="border-[#4A5D48] dark:border-[#6B8068] text-[#4A5D48] dark:text-[#8aab86] hover:bg-[#E5EBE5] dark:hover:bg-[#1a2a1a] rounded-full px-8 py-5">
              Learn more about us
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#4A5D48] dark:bg-[#1a2a1a]">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-medium text-white mb-6">
            Ready to order?
          </h3>
          <p className="text-[#c4d4c2] dark:text-[#8aab86] text-lg mb-8">
            WhatsApp us for custom orders, bulk pricing, and same-day delivery across Nairobi.
          </p>
          <Button className="bg-white text-[#4A5D48] hover:bg-[#E5EBE5] px-10 py-6 text-lg rounded-full">
            Chat with us on WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2a1a] dark:bg-[#050a05] text-[#8aab86] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-xl text-white font-medium">maisha maua</span>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-white transition-colors">Email</a>
          </div>
          <p className="text-sm">&copy; 2024 Maisha Maua. Nairobi, Kenya</p>
        </div>
      </footer>
    </div>
  );
}
