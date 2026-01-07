"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface FeatureImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function FeatureImage({ src, alt, className = "", sizes = "(max-width: 768px) 100vw, 50vw" }: FeatureImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <Skeleton className="absolute inset-0 bg-[#C4A59E]/30 dark:bg-[#5C4A45]/30" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
}
