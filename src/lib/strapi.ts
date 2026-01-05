import { unstable_cache } from 'next/cache';

// Strapi API configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Types for Strapi responses
export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  image?: StrapiImage;
  sortOrder: number;
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images?: StrapiImage[];
  category?: Category;
  featured: boolean;
  available: boolean;
  sortOrder: number;
  size?: 'small' | 'medium' | 'large' | 'extra-large' | 'custom';
  tags?: string[];
  customOrder: boolean;
}

export interface GalleryImage {
  id: number;
  documentId: string;
  title: string;
  image: StrapiImage;
  alt?: string;
  galleryCategory: 'weddings' | 'events' | 'daily' | 'special' | 'arrangements';
  featured: boolean;
  sortOrder: number;
}

export interface Testimonial {
  id: number;
  documentId: string;
  customerName: string;
  customerTitle?: string;
  content: string;
  rating: number;
  image?: StrapiImage;
  featured: boolean;
  sortOrder: number;
}

export interface SiteSettings {
  id: number;
  documentId: string;
  businessName: string;
  tagline?: string;
  description?: string;
  phone?: string;
  whatsappLink?: string;
  email?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  businessHours?: Array<{
    day: string;
    open: string;
    close: string;
    closed: boolean;
  }>;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: StrapiImage;
  philosophyTitle?: string;
  philosophyContent?: string;
  philosophyImage?: StrapiImage;
  footerText?: string;
  logo?: StrapiImage;
}

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Helper to construct full image URL
export function getStrapiImageUrl(image: StrapiImage | undefined): string {
  if (!image) return '';

  // If URL is already absolute, return it
  if (image.url.startsWith('http')) {
    return image.url;
  }

  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${image.url}`;
}

// Base fetch function with authentication
async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (STRAPI_TOKEN) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Get all products with optional filters
export const getProducts = unstable_cache(
  async (options?: {
    featured?: boolean;
    available?: boolean;
    categorySlug?: string;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    params.append('populate', '*');
    params.append('sort', 'sortOrder:asc');

    if (options?.featured !== undefined) {
      params.append('filters[featured][$eq]', String(options.featured));
    }
    if (options?.available !== undefined) {
      params.append('filters[available][$eq]', String(options.available));
    }
    if (options?.categorySlug) {
      params.append('filters[category][slug][$eq]', options.categorySlug);
    }
    if (options?.limit) {
      params.append('pagination[limit]', String(options.limit));
    }

    const response = await fetchStrapi<StrapiResponse<Product[]>>(
      `/products?${params.toString()}`
    );

    return response.data;
  },
  ['products'],
  { revalidate: 60, tags: ['products'] }
);

// Get a single product by slug
export const getProductBySlug = unstable_cache(
  async (slug: string) => {
    const params = new URLSearchParams();
    params.append('populate', '*');
    params.append('filters[slug][$eq]', slug);

    const response = await fetchStrapi<StrapiResponse<Product[]>>(
      `/products?${params.toString()}`
    );

    return response.data[0] || null;
  },
  ['product'],
  { revalidate: 60, tags: ['products'] }
);

// Get all categories
export const getCategories = unstable_cache(
  async () => {
    const params = new URLSearchParams();
    params.append('populate', '*');
    params.append('sort', 'sortOrder:asc');

    const response = await fetchStrapi<StrapiResponse<Category[]>>(
      `/categories?${params.toString()}`
    );

    return response.data;
  },
  ['categories'],
  { revalidate: 60, tags: ['categories'] }
);

// Get gallery images
export const getGalleryImages = unstable_cache(
  async (options?: {
    category?: string;
    featured?: boolean;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    params.append('populate', '*');
    params.append('sort', 'sortOrder:asc');

    if (options?.category) {
      params.append('filters[galleryCategory][$eq]', options.category);
    }
    if (options?.featured !== undefined) {
      params.append('filters[featured][$eq]', String(options.featured));
    }
    if (options?.limit) {
      params.append('pagination[limit]', String(options.limit));
    }

    const response = await fetchStrapi<StrapiResponse<GalleryImage[]>>(
      `/gallery-images?${params.toString()}`
    );

    return response.data;
  },
  ['gallery-images'],
  { revalidate: 60, tags: ['gallery'] }
);

// Get testimonials
export const getTestimonials = unstable_cache(
  async (options?: { featured?: boolean; limit?: number }) => {
    const params = new URLSearchParams();
    params.append('populate', '*');
    params.append('sort', 'sortOrder:asc');

    if (options?.featured !== undefined) {
      params.append('filters[featured][$eq]', String(options.featured));
    }
    if (options?.limit) {
      params.append('pagination[limit]', String(options.limit));
    }

    const response = await fetchStrapi<StrapiResponse<Testimonial[]>>(
      `/testimonials?${params.toString()}`
    );

    return response.data;
  },
  ['testimonials'],
  { revalidate: 60, tags: ['testimonials'] }
);

// Get site settings (single type)
export const getSiteSettings = unstable_cache(
  async () => {
    const params = new URLSearchParams();
    params.append('populate', '*');

    const response = await fetchStrapi<StrapiResponse<SiteSettings>>(
      `/site-setting?${params.toString()}`
    );

    return response.data;
  },
  ['site-settings'],
  { revalidate: 60, tags: ['site-settings'] }
);

// Format price in KES
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
