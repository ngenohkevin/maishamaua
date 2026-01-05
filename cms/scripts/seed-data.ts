/**
 * Seed script to populate Strapi with initial product data
 * Run with: npx ts-node scripts/seed-data.ts
 * Or after building: node dist/scripts/seed-data.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('Error: STRAPI_API_TOKEN environment variable is required');
  console.error('Create an API token in Strapi admin: Settings > API Tokens');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`,
};

// Categories to create
const categories = [
  {
    name: 'Standard Bouquets',
    slug: 'standard-bouquets',
    description: 'Our regular collection of beautiful mixed flower bouquets',
    sortOrder: 1,
  },
  {
    name: 'Custom Orders',
    slug: 'custom-orders',
    description: 'Special bouquets requiring advance ordering',
    sortOrder: 2,
  },
  {
    name: 'Premium Collection',
    slug: 'premium-collection',
    description: 'Luxurious premium flower arrangements',
    sortOrder: 3,
  },
];

// Products to create (from existing page.tsx)
const products = [
  {
    name: 'Economy Bouquet',
    slug: 'economy-bouquet',
    shortDescription: 'Beautiful starter arrangement',
    price: 1200,
    size: 'small',
    featured: false,
    available: true,
    sortOrder: 1,
    categorySlug: 'standard-bouquets',
  },
  {
    name: 'Small Mixed Bouquet',
    slug: 'small-mixed-bouquet',
    shortDescription: 'Lovely mixed flower selection',
    price: 1500,
    size: 'small',
    featured: false,
    available: true,
    sortOrder: 2,
    categorySlug: 'standard-bouquets',
  },
  {
    name: 'Medium Mixed Bouquet',
    slug: 'medium-mixed-bouquet',
    shortDescription: 'Perfect balance of blooms',
    price: 2300,
    size: 'medium',
    featured: true,
    available: true,
    sortOrder: 3,
    categorySlug: 'standard-bouquets',
  },
  {
    name: 'Large Mixed Bouquet',
    slug: 'large-mixed-bouquet',
    shortDescription: 'Generous flower arrangement',
    price: 3000,
    size: 'large',
    featured: true,
    available: true,
    sortOrder: 4,
    categorySlug: 'standard-bouquets',
  },
  {
    name: 'Extra Large Bouquet',
    slug: 'extra-large-bouquet',
    shortDescription: 'Stunning statement piece',
    price: 4500,
    size: 'extra-large',
    featured: false,
    available: true,
    sortOrder: 5,
    categorySlug: 'standard-bouquets',
  },
  {
    name: 'Blast Bouquet',
    slug: 'blast-bouquet',
    shortDescription: 'Impressive floral explosion',
    price: 6000,
    size: 'extra-large',
    featured: true,
    available: true,
    sortOrder: 6,
    categorySlug: 'premium-collection',
  },
  {
    name: 'Premium Beauty',
    slug: 'premium-beauty',
    shortDescription: 'Luxurious premium collection',
    price: 10000,
    size: 'extra-large',
    featured: true,
    available: true,
    sortOrder: 7,
    categorySlug: 'premium-collection',
  },
  {
    name: 'Just For You',
    slug: 'just-for-you',
    shortDescription: 'Ultimate luxury bouquet',
    price: 12000,
    size: 'extra-large',
    featured: true,
    available: true,
    sortOrder: 8,
    categorySlug: 'premium-collection',
  },
  // Custom order bouquets
  {
    name: 'Money Bouquet',
    slug: 'money-bouquet',
    shortDescription: 'Real currency beautifully arranged with flowers',
    description: 'A unique and memorable gift featuring real currency artfully arranged with fresh flowers. Perfect for graduations, achievements, and special celebrations. Price varies based on denomination.',
    price: 5000, // Starting price
    size: 'custom',
    featured: true,
    available: true,
    customOrder: true,
    sortOrder: 9,
    categorySlug: 'custom-orders',
  },
  {
    name: 'Lilies Only',
    slug: 'lilies-only',
    shortDescription: 'Elegant pure lily arrangement',
    description: 'A stunning arrangement featuring only the finest lilies. Requires 2-3 days advance notice.',
    price: 4000,
    size: 'custom',
    featured: false,
    available: true,
    customOrder: true,
    sortOrder: 10,
    categorySlug: 'custom-orders',
  },
  {
    name: 'Sunflowers Only',
    slug: 'sunflowers-only',
    shortDescription: 'Cheerful sunflower collection',
    description: 'Bright and cheerful sunflower arrangement. Requires advance ordering as availability is seasonal.',
    price: 3500,
    size: 'custom',
    featured: false,
    available: true,
    customOrder: true,
    sortOrder: 11,
    categorySlug: 'custom-orders',
  },
  {
    name: 'Peonies Only',
    slug: 'peonies-only',
    shortDescription: 'Romantic peony bouquet',
    description: 'Luxurious peony bouquet for romantic occasions. Seasonal availability, advance ordering required.',
    price: 6000,
    size: 'custom',
    featured: false,
    available: true,
    customOrder: true,
    sortOrder: 12,
    categorySlug: 'custom-orders',
  },
];

// Site settings
const siteSettings = {
  businessName: 'Maisha Maua',
  tagline: 'Fresh Flowers for Every Occasion',
  description: 'Maisha Maua is a premium flower shop in Ruaka, Nairobi, Kenya. We specialize in beautiful bouquets and flower arrangements for all occasions.',
  phone: '+254725496220',
  whatsappLink: 'https://wa.me/message/CRZL573DJ5NSF1',
  email: 'hello@maishamaua.co.ke',
  address: 'Ruaka, Nairobi, Kenya',
  instagram: '@maishamaua.flower.shop.ruaka',
  facebook: 'maishamaua',
  tiktok: '@maisha.maua',
  businessHours: [
    { day: 'Monday', open: '08:00', close: '18:00', closed: false },
    { day: 'Tuesday', open: '08:00', close: '18:00', closed: false },
    { day: 'Wednesday', open: '08:00', close: '18:00', closed: false },
    { day: 'Thursday', open: '08:00', close: '18:00', closed: false },
    { day: 'Friday', open: '08:00', close: '18:00', closed: false },
    { day: 'Saturday', open: '08:00', close: '18:00', closed: false },
    { day: 'Sunday', open: '08:00', close: '18:00', closed: false },
  ],
  heroTitle: 'Beautiful Flowers for Every Moment',
  heroSubtitle: 'Fresh, hand-crafted bouquets delivered with love in Nairobi',
  philosophyTitle: 'Our Philosophy',
  philosophyContent: 'At Maisha Maua, we believe flowers have the power to transform moments into memories. Each bouquet is thoughtfully crafted with the freshest blooms to convey your deepest emotions.',
  footerText: '© 2025 Maisha Maua. Spreading joy through flowers.',
};

async function createCategory(category: typeof categories[0]) {
  const response = await fetch(`${STRAPI_URL}/api/categories`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: category }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create category ${category.name}: ${error}`);
  }

  const result = await response.json() as { data: { id: number } };
  console.log(`✓ Created category: ${category.name}`);
  return result.data;
}

async function createProduct(product: typeof products[0], categoryId: number) {
  const { categorySlug, ...productData } = product;

  const response = await fetch(`${STRAPI_URL}/api/products`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      data: {
        ...productData,
        category: categoryId,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create product ${product.name}: ${error}`);
  }

  const result = await response.json() as { data: { id: number } };
  console.log(`✓ Created product: ${product.name}`);
  return result.data;
}

async function createSiteSettings() {
  // First check if site settings exist
  const checkResponse = await fetch(`${STRAPI_URL}/api/site-setting`, { headers });

  if (checkResponse.ok) {
    // Update existing
    const response = await fetch(`${STRAPI_URL}/api/site-setting`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: siteSettings }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update site settings: ${error}`);
    }
    console.log('✓ Updated site settings');
  } else {
    // Create new
    const response = await fetch(`${STRAPI_URL}/api/site-setting`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: siteSettings }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create site settings: ${error}`);
    }
    console.log('✓ Created site settings');
  }
}

async function seed() {
  console.log('🌱 Starting seed process...\n');

  try {
    // Create categories
    console.log('Creating categories...');
    const categoryMap: Record<string, number> = {};

    for (const category of categories) {
      const created = await createCategory(category);
      categoryMap[category.slug] = created.id;
    }
    console.log('');

    // Create products
    console.log('Creating products...');
    for (const product of products) {
      const categoryId = categoryMap[product.categorySlug];
      if (!categoryId) {
        console.warn(`⚠ Skipping ${product.name}: category ${product.categorySlug} not found`);
        continue;
      }
      await createProduct(product, categoryId);
    }
    console.log('');

    // Create site settings
    console.log('Creating site settings...');
    await createSiteSettings();
    console.log('');

    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
