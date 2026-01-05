/**
 * Seed script to migrate static content to Strapi CMS
 * Run with: npx ts-node --esm scripts/seed-production.ts
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://maishamauacms.iopulse.cloud';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('Error: STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Static data from the frontend
const categories = [
  { name: 'Standard Bouquets', slug: 'standard-bouquets', description: 'Our regular collection of beautiful mixed bouquets', sortOrder: 1 },
  { name: 'Custom Orders', slug: 'custom-orders', description: 'Specialty bouquets requiring advance orders', sortOrder: 2 },
];

const products = [
  { name: 'Economy Bouquet', price: 1200, description: 'Beautiful starter arrangement', size: 'small', sortOrder: 1, category: 'standard-bouquets' },
  { name: 'Small Mixed Bouquet', price: 1500, description: 'Lovely mixed flower selection', size: 'small', sortOrder: 2, category: 'standard-bouquets' },
  { name: 'Medium Mixed Bouquet', price: 2300, description: 'Perfect balance of blooms', size: 'medium', sortOrder: 3, category: 'standard-bouquets' },
  { name: 'Large Mixed Bouquet', price: 3000, description: 'Generous flower arrangement', size: 'large', sortOrder: 4, category: 'standard-bouquets' },
  { name: 'Extra Large Bouquet', price: 4500, description: 'Stunning statement piece', size: 'extra-large', sortOrder: 5, category: 'standard-bouquets' },
  { name: 'Blast Bouquet', price: 6000, description: 'Impressive floral explosion', size: 'extra-large', sortOrder: 6, category: 'standard-bouquets' },
  { name: 'Premium Beauty', price: 10000, description: 'Luxurious premium collection', size: 'extra-large', sortOrder: 7, category: 'standard-bouquets' },
  { name: 'Just For You', price: 12000, description: 'Ultimate luxury bouquet', size: 'extra-large', sortOrder: 8, category: 'standard-bouquets' },
  { name: 'Money Bouquet', price: 5000, description: 'Real currency beautifully arranged with flowers', size: 'custom', sortOrder: 1, category: 'custom-orders', customOrder: true },
  { name: 'Lilies Only', price: 4000, description: 'Elegant pure lily arrangement', size: 'custom', sortOrder: 2, category: 'custom-orders', customOrder: true },
  { name: 'Sunflowers Only', price: 3500, description: 'Cheerful sunflower collection', size: 'custom', sortOrder: 3, category: 'custom-orders', customOrder: true },
  { name: 'Peonies Only', price: 5000, description: 'Romantic peony bouquet', size: 'custom', sortOrder: 4, category: 'custom-orders', customOrder: true },
];

const galleryImages = [
  { title: 'Beautiful bouquet arrangement', galleryCategory: 'arrangements', sortOrder: 1 },
  { title: 'Fresh flower arrangement', galleryCategory: 'daily', sortOrder: 2 },
  { title: 'Colorful mixed bouquet', galleryCategory: 'arrangements', sortOrder: 3 },
  { title: 'Elegant flower display', galleryCategory: 'special', sortOrder: 4 },
  { title: 'Premium bouquet collection', galleryCategory: 'special', sortOrder: 5 },
  { title: 'Romantic flower arrangement', galleryCategory: 'weddings', sortOrder: 6 },
  { title: 'Autumn inspired bouquet', galleryCategory: 'daily', sortOrder: 7 },
  { title: 'Vibrant flower mix', galleryCategory: 'arrangements', sortOrder: 8 },
  { title: 'Special occasion flowers', galleryCategory: 'events', sortOrder: 9 },
  { title: 'Celebration bouquet', galleryCategory: 'events', sortOrder: 10 },
];

const siteSettings = {
  businessName: 'Maisha Maua',
  tagline: 'Give them their flowers while they\'re still here',
  description: 'Fresh flowers and customized bouquets in Nairobi, Kenya. We specialize in beautiful arrangements for all occasions.',
  phone: '+254725496220',
  whatsappLink: 'https://wa.me/message/CRZL573DJ5NSF1',
  email: 'hello@maishamaua.co.ke',
  address: 'Ruaka, Nairobi, Kenya',
  instagram: 'https://www.instagram.com/maishamaua.flower.shop.ruaka',
  facebook: 'https://www.facebook.com/share/1ByLchvJvv/',
  tiktok: 'https://www.tiktok.com/@maisha.maua',
  heroTitle: 'Celebrate Life With Flowers',
  heroSubtitle: 'Why wait for a special occasion? Show love, gratitude, and appreciation with customized bouquets and gifts — while they are still here.',
  philosophyTitle: 'Our Philosophy',
  philosophyContent: 'At Maisha Maua, we believe that life\'s most meaningful moments deserve to be celebrated while people are still here. Flowers and gifts are not just for special occasions — they are a way to express love, gratitude, and appreciation in real time. We specialize in customized bouquets thoughtfully designed to reflect the personality, preferences, and purpose of each recipient.',
  footerText: 'Flowers for life\'s beautiful moments — not for farewells.',
};

async function createCategory(category: typeof categories[0]) {
  const response = await fetch(`${STRAPI_URL}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data: category }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create category ${category.name}: ${error}`);
  }

  const result = await response.json();
  console.log(`Created category: ${category.name}`);
  return result.data;
}

async function getCategoryBySlug(slug: string) {
  const response = await fetch(`${STRAPI_URL}/api/categories?filters[slug][$eq]=${slug}`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result.data[0] || null;
}

async function createProduct(product: typeof products[0], categoryId: number) {
  const data = {
    name: product.name,
    slug: product.name.toLowerCase().replace(/\s+/g, '-'),
    description: product.description,
    price: product.price,
    size: product.size,
    sortOrder: product.sortOrder,
    featured: product.sortOrder <= 4,
    available: true,
    customOrder: product.customOrder || false,
    category: categoryId,
  };

  const response = await fetch(`${STRAPI_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create product ${product.name}: ${error}`);
  }

  console.log(`Created product: ${product.name}`);
  return (await response.json()).data;
}

async function createGalleryImage(image: typeof galleryImages[0]) {
  const data = {
    title: image.title,
    galleryCategory: image.galleryCategory,
    sortOrder: image.sortOrder,
    featured: image.sortOrder <= 8,
  };

  const response = await fetch(`${STRAPI_URL}/api/gallery-images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create gallery image ${image.title}: ${error}`);
  }

  console.log(`Created gallery image: ${image.title}`);
  return (await response.json()).data;
}

async function createOrUpdateSiteSettings() {
  // Check if site settings exist
  const getResponse = await fetch(`${STRAPI_URL}/api/site-setting`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (getResponse.ok) {
    const existing = await getResponse.json();
    if (existing.data) {
      // Update existing
      const response = await fetch(`${STRAPI_URL}/api/site-setting`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({ data: siteSettings }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to update site settings: ${error}`);
      }

      console.log('Updated site settings');
      return (await response.json()).data;
    }
  }

  // Create new
  const response = await fetch(`${STRAPI_URL}/api/site-setting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data: siteSettings }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create site settings: ${error}`);
  }

  console.log('Created site settings');
  return (await response.json()).data;
}

async function seed() {
  console.log('Starting seed process...\n');
  console.log(`Strapi URL: ${STRAPI_URL}\n`);

  try {
    // Create categories
    console.log('Creating categories...');
    const categoryMap: Record<string, number> = {};
    for (const category of categories) {
      const existing = await getCategoryBySlug(category.slug);
      if (existing) {
        console.log(`Category already exists: ${category.name}`);
        categoryMap[category.slug] = existing.id;
      } else {
        const created = await createCategory(category);
        categoryMap[category.slug] = created.id;
      }
    }

    // Create products
    console.log('\nCreating products...');
    for (const product of products) {
      const categoryId = categoryMap[product.category];
      if (!categoryId) {
        console.error(`Category not found for product: ${product.name}`);
        continue;
      }
      await createProduct(product, categoryId);
    }

    // Create gallery images (metadata only - images need to be uploaded via admin)
    console.log('\nCreating gallery image entries...');
    for (const image of galleryImages) {
      await createGalleryImage(image);
    }

    // Create site settings
    console.log('\nCreating site settings...');
    await createOrUpdateSiteSettings();

    console.log('\nSeed completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Log into Strapi admin: https://maishamauacms.iopulse.cloud/admin');
    console.log('2. Upload images for products via Media Library');
    console.log('3. Upload images for gallery entries');
    console.log('4. Upload hero image and logo in Site Settings');

  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
