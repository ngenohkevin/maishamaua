import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Instagram, MessageCircle } from "lucide-react";

const designs = [
  {
    id: 1,
    name: "Elegant Minimal",
    description: "Clean, sophisticated design with warm cream tones and serif typography. Perfect for a premium, luxury flower brand that wants to convey timeless elegance.",
    style: "Luxury & Premium",
    colors: ["#3D3428", "#FAF8F5", "#8B7355"],
    features: ["Serif typography", "Warm cream tones", "Minimalist layout", "Soft transitions"],
    href: "/design-1",
  },
  {
    id: 2,
    name: "Fresh & Modern",
    description: "Contemporary design with sage green accents and clean lines. Great for a fresh, modern brand that values simplicity and natural beauty.",
    style: "Modern & Clean",
    colors: ["#4A5D48", "#FFFFFF", "#E5EBE5"],
    features: ["Sans-serif typography", "Sage green accents", "Rounded corners", "Clean sections"],
    href: "/design-2",
  },
  {
    id: 3,
    name: "Earthy Organic",
    description: "Natural, warm design with earthy browns and terracotta tones. Ideal for eco-conscious brands focused on sustainability and community.",
    style: "Natural & Sustainable",
    colors: ["#5C4D42", "#FBF7F0", "#8B7355"],
    features: ["Earthy palette", "Warm textures", "Story-focused", "Eco messaging"],
    href: "/design-3",
  },
  {
    id: 4,
    name: "Classic Romantic",
    description: "Soft, dreamy design with blush pink and dusty rose tones. Perfect for weddings, anniversaries, and romantic occasions.",
    style: "Romantic & Soft",
    colors: ["#C4A59E", "#FDF8F6", "#5C4A45"],
    features: ["Italic serif fonts", "Blush pink tones", "Elegant curves", "Wedding-ready"],
    href: "/design-4",
  },
  {
    id: 5,
    name: "Bold Kenyan",
    description: "Vibrant design celebrating Kenya's tropical flora with warm gold and rich brown tones. Great for showcasing local, bold tropical flowers.",
    style: "Tropical & Local",
    colors: ["#B8860B", "#FFFBF5", "#2D1810"],
    features: ["Bold typography", "Gold accents", "Kenyan pride", "Tropical vibes"],
    href: "/design-5",
  },
];

export default function DesignSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Maisha Maua</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Website Design Prototypes</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0 mb-4">5 Design Options</Badge>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hey Sophie! 👋
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I have five different design directions for Maisha Maua.
            Each one has light and dark mode — click the sun/moon icon to toggle!
          </p>
        </div>

        {/* Design Cards */}
        <div className="grid gap-6">
          {designs.map((design) => (
            <Link key={design.id} href={design.href}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-800">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Preview Colors */}
                    <div className="md:w-1/4 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex gap-2">
                          {design.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-12 h-12 rounded-full shadow-md border-2 border-white dark:border-gray-700"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Color Palette</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-3/4 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge variant="outline" className="mb-2 text-xs dark:border-gray-600 dark:text-gray-300">{design.style}</Badge>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            Design {design.id}: {design.name}
                          </h3>
                        </div>
                        <span className="text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors text-xl">
                          →
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed text-sm">
                        {design.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {design.features.map((feature, i) => (
                          <Badge key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-0 text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">How to check them out</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Click on any design card above to see the full page</li>
            <li>Try the sun/moon toggle to switch between light and dark mode</li>
            <li>Scroll through to see all the sections: hero, products, about, and contact</li>
            <li>Use &quot;Back to Designs&quot; to come back here and compare</li>
            <li>Just let me know which one you like best and I&apos;ll take it from there!</li>
          </ol>
        </div>

        {/* Social Links */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Got questions? Just text me!</p>
          <div className="flex justify-center gap-6">
            <a href="https://www.instagram.com/maishamaua.flower.shop.ruaka/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
            <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
