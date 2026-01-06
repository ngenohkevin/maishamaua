import { getGalleryImages, getStrapiImageUrl } from "@/lib/strapi";
import GalleryClient from "./gallery-client";

const WHATSAPP_LINK = "https://wa.me/message/CRZL573DJ5NSF1";

// Fallback static gallery images
const staticGalleryImages = [
  { src: "/images/photo_2025-12-31%2010.54.06.jpeg", alt: "Beautiful bouquet arrangement" },
  { src: "/images/photo_2025-12-31%2011.23.08.jpeg", alt: "Fresh flower arrangement" },
  { src: "/images/photo_2025-12-31%2011.23.11.jpeg", alt: "Colorful mixed bouquet" },
  { src: "/images/photo_2025-12-31%2011.23.14.jpeg", alt: "Elegant flower display" },
  { src: "/images/photo_2025-12-31%2011.23.34.jpeg", alt: "Premium bouquet collection" },
  { src: "/images/photo_2025-12-31%2011.23.37.jpeg", alt: "Romantic flower arrangement" },
  { src: "/images/photo_2025-12-31%2011.23.43.jpeg", alt: "Autumn inspired bouquet" },
  { src: "/images/photo_2025-12-31%2011.23.47.jpeg", alt: "Vibrant flower mix" },
  { src: "/images/photo_2025-12-31%2011.23.50.jpeg", alt: "Special occasion flowers" },
  { src: "/images/photo_2025-12-31%2011.23.53.jpeg", alt: "Celebration bouquet" },
  { src: "/images/photo_2025-12-31%2011.23.56.jpeg", alt: "Gift-ready arrangement" },
  { src: "/images/photo_2025-12-31%2011.24.02.jpeg", alt: "Handcrafted bouquet" },
  { src: "/images/photo_2025-12-31%2011.24.05.jpeg", alt: "Fresh floral design" },
  { src: "/images/photo_2025-12-31%2011.24.07.jpeg", alt: "Artistic flower arrangement" },
  { src: "/images/photo_2025-12-31%2011.24.11.jpeg", alt: "Luxury flower collection" },
  { src: "/images/photo_2025-12-31%2011.24.14.jpeg", alt: "Thoughtful bouquet design" },
  { src: "/images/photo_2025-12-31%2011.24.17.jpeg", alt: "Custom flower arrangement" },
  { src: "/images/photo_2025-12-31%2011.24.21.jpeg", alt: "Colorful celebration flowers" },
  { src: "/images/photo_2025-12-31%2011.24.24.jpeg", alt: "Beautiful bloom selection" },
  { src: "/images/photo_2025-12-31%2011.24.26.jpeg", alt: "Special delivery bouquet" },
  { src: "/images/photo_2025-12-31%2011.24.29.jpeg", alt: "Premium floral design" },
  { src: "/images/photo_2025-12-31%2011.24.32.jpeg", alt: "Elegant flower gift" },
  { src: "/images/photo_2025-12-31%2011.24.35.jpeg", alt: "Fresh bouquet arrangement" },
  { src: "/images/photo_2025-12-31%2011.24.42.jpeg", alt: "Stunning flower display" },
  { src: "/images/photo_2025-12-31%2011.24.45.jpeg", alt: "Beautiful floral creation" },
  { src: "/images/photo_2025-12-31%2012.33.07.jpeg", alt: "Appreciation bouquet" },
  { src: "/images/photo_2025-12-31%2012.33.09.jpeg", alt: "Milestone celebration flowers" },
  { src: "/images/photo_2025-12-31%2012.33.13.jpeg", alt: "Green and yellow arrangement" },
  { src: "/images/photo_2025-12-31%2012.33.16.jpeg", alt: "Warm toned bouquet" },
  { src: "/images/photo_2025-12-31%2012.33.18.jpeg", alt: "Fresh flower selection" },
  { src: "/images/photo_2025-12-31%2012.33.21.jpeg", alt: "Custom designed bouquet" },
  { src: "/images/photo_2025-12-31%2012.33.24.jpeg", alt: "Elegant floral gift" },
  { src: "/images/photo_2025-12-31%2012.33.26.jpeg", alt: "Premium flower arrangement" },
  { src: "/images/photo_2025-12-31%2012.33.29.jpeg", alt: "Beautiful bloom bouquet" },
  { src: "/images/photo_2025-12-31%2012.33.32.jpeg", alt: "Celebration ready flowers" },
  { src: "/images/photo_2025-12-31%2012.33.39.jpeg", alt: "Fresh floral creation" },
  { src: "/images/photo_2025-12-31%2012.33.49.jpeg", alt: "Pink roses arrangement" },
  { src: "/images/photo_2025-12-31%2012.33.53.jpeg", alt: "Special occasion bouquet" },
  { src: "/images/photo_2025-12-31%2012.33.56.jpeg", alt: "Thoughtful flower gift" },
  { src: "/images/photo_2025-12-31%2012.34.00.jpeg", alt: "Sunflower mix bouquet" },
  { src: "/images/photo_2025-12-31%2012.34.06.jpeg", alt: "Handcrafted floral design" },
  { src: "/images/photo_2025-12-31%2012.34.10.jpeg", alt: "Fresh flower arrangement" },
  { src: "/images/photo_2025-12-31%2012.34.14.jpeg", alt: "Beautiful bouquet creation" },
  { src: "/images/photo_2025-12-31%2012.34.18.jpeg", alt: "Elegant flower selection" },
  { src: "/images/photo_2025-12-31%2012.34.23.jpeg", alt: "Premium floral gift" },
];

export default async function GalleryPage() {
  let galleryImages: Array<{ src: string; alt: string }> = [];

  try {
    const cmsImages = await getGalleryImages();

    if (cmsImages && cmsImages.length > 0) {
      galleryImages = cmsImages.map((img) => ({
        src: img.image ? getStrapiImageUrl(img.image) : "",
        alt: img.title || img.alt || "Gallery image",
      })).filter(img => img.src);
    }

    if (galleryImages.length === 0) {
      galleryImages = staticGalleryImages;
    }
  } catch (error) {
    console.error("Failed to fetch gallery images from CMS:", error);
    galleryImages = staticGalleryImages;
  }

  return <GalleryClient galleryImages={galleryImages} whatsappLink={WHATSAPP_LINK} />;
}
