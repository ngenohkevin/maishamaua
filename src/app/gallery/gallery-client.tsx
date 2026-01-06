"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import {
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";

interface GalleryClientProps {
  galleryImages: Array<{ src: string; alt: string }>;
  whatsappLink: string;
}

function GalleryImage({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <button
      onClick={onClick}
      className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4A5D48] focus:ring-offset-2"
      aria-label={`View ${alt}`}
    >
      {!isLoaded && (
        <Skeleton className="absolute inset-0 bg-[#F0E6E2] dark:bg-[#2d2528]" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-500 group-hover:scale-110 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </button>
  );
}

export default function GalleryClient({ galleryImages, whatsappLink }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  }, [selectedImage, galleryImages.length]);

  const prevImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(
        (selectedImage - 1 + galleryImages.length) % galleryImages.length
      );
    }
  }, [selectedImage, galleryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, nextImage, prevImage]);

  return (
    <div className="min-h-screen bg-[#FDF8F6] dark:bg-[#1a1517]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F6]/90 dark:bg-[#1a1517]/90 backdrop-blur-md border-b border-[#F0E6E2] dark:border-[#2d2528]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/images/logo.jpeg"
                alt="Maisha Maua"
                width={40}
                height={40}
                className="rounded-full sm:w-12 sm:h-12"
              />
              <h1 className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl text-[#5C4A45] dark:text-[#E8DED8] italic">
                Maisha Maua
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="hidden md:flex items-center gap-1 text-sm text-[#8A6F68] dark:text-[#a08a85] hover:text-[#5C4A45] dark:hover:text-[#E8DED8] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <ThemeToggle />
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-5 text-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            </Link>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-[#4A5D48]/10 dark:bg-[#4A5D48]/20 text-[#4A5D48] dark:text-[#8aab86] border-[#4A5D48] dark:border-[#6B8068] mb-4 sm:mb-6 text-xs sm:text-sm">
            Our Portfolio
          </Badge>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl md:text-6xl text-[#5C4A45] dark:text-[#E8DED8] mb-4 sm:mb-6 leading-tight">
            Flower <span className="italic">Gallery</span>
          </h1>
          <p className="text-[#8A6F68] dark:text-[#a08a85] text-base sm:text-lg max-w-2xl mx-auto">
            Browse our collection of beautiful bouquets and floral arrangements.
            Each creation is handcrafted with love to celebrate life&apos;s
            meaningful moments.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.map((image, index) => (
              <GalleryImage
                key={index}
                src={image.src}
                alt={image.alt}
                onClick={() => openImage(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#4A5D48] dark:bg-[#2d3a2c]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl text-white mb-4 italic">
            Love what you see?
          </h2>
          <p className="text-[#c4d4c2] text-base sm:text-lg mb-6">
            Order a custom bouquet designed just for your special someone.
          </p>
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-5 rounded-full text-base">
              <MessageCircle className="w-5 h-5 mr-2" />
              Order on WhatsApp
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3d322f] dark:bg-[#0f0d0e] text-[#c4aba5] py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <Image
              src="/images/logo.jpeg"
              alt="Maisha Maua"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-[family-name:var(--font-playfair)] text-xl text-white italic">
              Maisha Maua
            </span>
          </Link>
          <p className="text-sm text-[#8A6F68]">
            &copy; {new Date().getFullYear()} Maisha Maua. Ruaka, Nairobi, Kenya.
          </p>
        </div>
      </footer>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImage !== null} onOpenChange={closeImage}>
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] p-0 bg-black/60 backdrop-blur-xl border-0 overflow-hidden"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {selectedImage !== null ? galleryImages[selectedImage].alt : "Image viewer"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Use arrow keys or buttons to navigate between images. Press Escape to close.
          </DialogDescription>
          {selectedImage !== null && (
            <div className="relative w-full h-[90vh] flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Previous button */}
              <button
                onClick={prevImage}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-7 h-7 text-white" />
              </button>

              {/* Image */}
              <div className="relative w-full h-full px-16">
                <Image
                  key={selectedImage}
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="95vw"
                  priority
                />
              </div>

              {/* Next button */}
              <button
                onClick={nextImage}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="w-7 h-7 text-white" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
