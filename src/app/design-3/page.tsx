import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { organicImages } from "@/lib/images";

const products = [
  { name: "Wildflower Bunch", price: "KSh 2,500", desc: "Seasonal field flowers", image: organicImages.featured1 },
  { name: "Herb Garden Mix", price: "KSh 3,000", desc: "Eucalyptus & greenery", image: organicImages.featured2 },
  { name: "Sunset Bouquet", price: "KSh 3,800", desc: "Warm-toned blooms", image: organicImages.featured3 },
];

const values = [
  { title: "Locally Grown", desc: "We partner with small-scale Kenyan flower farms within 100km of Nairobi." },
  { title: "Zero Plastic", desc: "All packaging is compostable or recyclable. We use kraft paper and jute twine." },
  { title: "Fair Trade", desc: "We pay our farmers above-market rates and support their communities." },
];

export default function OrganicDesign() {
  return (
    <div className="min-h-screen bg-[#FBF7F0] dark:bg-[#1a1814]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FBF7F0]/90 dark:bg-[#1a1814]/90 backdrop-blur-sm border-b border-[#E8DFD0] dark:border-[#2d2820]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-[#7D6B5D] dark:text-[#a69585] text-sm hover:text-[#5C4D42] dark:hover:text-[#c4b5a5] transition-colors">
            &larr; Back to Designs
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <h1 className="text-2xl font-normal text-[#3D3830] dark:text-[#E8DFD0]">maisha maua</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm text-[#7D6B5D] dark:text-[#a69585]">
              <a href="#shop" className="hover:text-[#3D3830] dark:hover:text-[#E8DFD0] transition-colors">Shop</a>
              <a href="#values" className="hover:text-[#3D3830] dark:hover:text-[#E8DFD0] transition-colors">Our Values</a>
              <a href="#contact" className="hover:text-[#3D3830] dark:hover:text-[#E8DFD0] transition-colors">Contact</a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src={organicImages.hero}
            alt="Natural garden flowers"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBF7F0] dark:from-[#1a1814] via-[#FBF7F0]/80 dark:via-[#1a1814]/80 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-[#8B7355] dark:bg-[#a69585]" />
              <span className="text-[#8B7355] dark:text-[#a69585] text-sm tracking-widest uppercase">Sustainable Floristry</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-light text-[#3D3830] dark:text-[#E8DFD0] mb-6 leading-tight">
              From the earth,
              <br />
              <span className="font-normal">with care</span>
            </h2>
            <p className="text-lg text-[#5C4D42] dark:text-[#a69585] mb-8 leading-relaxed">
              Seasonal arrangements grown by local Kenyan farmers.
              We believe in flowers that are good for you and good for the planet.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button className="bg-[#5C4D42] dark:bg-[#8B7355] hover:bg-[#4A3E36] dark:hover:bg-[#7a6448] text-white px-8 py-6 rounded-full">
                Shop Seasonal
              </Button>
              <Button variant="outline" className="border-[#5C4D42] dark:border-[#8B7355] text-[#5C4D42] dark:text-[#a69585] hover:bg-[#E8DFD0] dark:hover:bg-[#2d2820] px-8 py-6 rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="py-24 px-6 bg-white dark:bg-[#0f0e0b]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#8B7355] dark:text-[#a69585] text-sm tracking-widest uppercase">What&apos;s in Season</span>
            <h3 className="text-4xl font-light text-[#3D3830] dark:text-[#E8DFD0] mt-3">This Week&apos;s Harvest</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {products.map((product, index) => (
              <Card key={index} className="border-0 shadow-none bg-transparent group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl text-[#3D3830] dark:text-[#E8DFD0] mb-1">{product.name}</h4>
                    <p className="text-[#7D6B5D] dark:text-[#a69585] text-sm mb-3">{product.desc}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-[#5C4D42] dark:text-[#c4b5a5]">{product.price}</p>
                      <Button variant="ghost" className="text-[#5C4D42] dark:text-[#a69585] hover:text-[#3D3830] dark:hover:text-[#E8DFD0] hover:bg-[#E8DFD0] dark:hover:bg-[#2d2820] p-2">
                        Add to basket →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-24 px-6 bg-[#5C4D42] dark:bg-[#2d2820]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#c4b5a5] text-sm tracking-widest uppercase">Our Promise</span>
            <h3 className="text-4xl font-light text-white mt-3">Rooted in Values</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <h4 className="text-xl font-medium text-white mb-4">{value.title}</h4>
                <p className="text-[#c4b5a5] leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-6 bg-[#FBF7F0] dark:bg-[#1a1814]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#8B7355] dark:text-[#a69585] text-sm tracking-widest uppercase">Our Story</span>
            <h3 className="text-4xl font-light text-[#3D3830] dark:text-[#E8DFD0] mt-3 mb-6">
              Growing together with our community
            </h3>
            <p className="text-[#5C4D42] dark:text-[#a69585] leading-relaxed mb-6">
              Maisha Maua started in 2020 when we began working directly with flower farmers
              in Limuru and Naivasha. We saw an opportunity to bring truly fresh, sustainably-grown
              flowers to Nairobi while supporting local livelihoods.
            </p>
            <p className="text-[#5C4D42] dark:text-[#a69585] leading-relaxed mb-8">
              Today, we work with over 15 small farms and have helped plant over 5,000 trees
              as part of our carbon offset program.
            </p>
            <Button variant="outline" className="border-[#5C4D42] dark:border-[#8B7355] text-[#5C4D42] dark:text-[#a69585] hover:bg-[#E8DFD0] dark:hover:bg-[#2d2820] px-6 py-5 rounded-full">
              Meet our farmers
            </Button>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src={organicImages.about}
              alt="Our farm partners"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-[#3D3830] dark:bg-[#0f0e0b]">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-4xl mb-6 block">🌻</span>
          <h3 className="text-4xl font-light text-white mb-6">Let&apos;s grow together</h3>
          <p className="text-[#a69585] text-lg mb-8">
            Order via WhatsApp for seasonal boxes and learn about our subscription service.
            Same-day delivery available across Nairobi.
          </p>
          <Button className="bg-[#8B7355] hover:bg-[#7a6448] text-white px-10 py-6 text-lg rounded-full">
            Message us on WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2A2520] dark:bg-[#0a0908] text-[#a69585] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌿</span>
              <span className="text-xl text-white">maisha maua</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
            </div>
            <p className="text-sm">&copy; 2024 Maisha Maua. Sustainably grown in Kenya.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
