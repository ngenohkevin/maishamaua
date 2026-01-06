/**
 * Upload images to Strapi and link them to products
 */
import * as fs from 'fs';
import * as path from 'path';

const STRAPI_URL = process.env.STRAPI_URL || 'https://maishamauacms.iopulse.cloud';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('Error: STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Map product slugs to their image files
const productImages: Record<string, string> = {
  'economy-bouquet': 'warm-bouquet.jpeg',
  'small-mixed-bouquet': 'autumn-bloom.jpeg',
  'medium-mixed-bouquet': 'pink-roses.jpeg',
  'large-mixed-bouquet': 'colorful-mix.jpeg',
  'extra-large-bouquet': 'purple-elegance.jpeg',
  'blast-bouquet': 'sunflower-mix.jpeg',
  'premium-beauty': 'hero-bouquet.jpeg',
  'just-for-you': 'green-yellow.jpeg',
  'money-bouquet': 'money_bouquet.jpeg',
  'lilies-only': 'hero-bouquet.jpeg',
  'sunflowers-only': 'sunflower-mix.jpeg',
  'peonies-only': 'pink-roses.jpeg',
};

async function getProducts() {
  const response = await fetch(`${STRAPI_URL}/api/products`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data;
}

async function uploadImage(imagePath: string, fileName: string) {
  const formData = new FormData();
  const fileBuffer = fs.readFileSync(imagePath);
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
  formData.append('files', blob, fileName);

  const response = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to upload image ${fileName}: ${error}`);
  }

  const result = await response.json();
  return result[0]; // Returns array, we want first item
}

async function linkImageToProduct(productId: number, productDocumentId: string, imageId: number) {
  const response = await fetch(`${STRAPI_URL}/api/products/${productDocumentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        images: [imageId],
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to link image to product: ${error}`);
  }

  return response.json();
}

async function main() {
  console.log('Starting image upload process...\n');
  console.log(`Strapi URL: ${STRAPI_URL}\n`);

  const imagesDir = path.join(process.cwd(), 'public', 'images');

  // Get all products
  const products = await getProducts();
  console.log(`Found ${products.length} products\n`);

  for (const product of products) {
    const imageFile = productImages[product.slug];
    if (!imageFile) {
      console.log(`No image mapping for: ${product.name}`);
      continue;
    }

    const imagePath = path.join(imagesDir, imageFile);
    if (!fs.existsSync(imagePath)) {
      console.log(`Image file not found: ${imagePath}`);
      continue;
    }

    try {
      console.log(`Uploading image for: ${product.name}...`);
      const uploadedImage = await uploadImage(imagePath, imageFile);
      console.log(`  Uploaded: ${uploadedImage.name} (ID: ${uploadedImage.id})`);

      console.log(`  Linking to product...`);
      await linkImageToProduct(product.id, product.documentId, uploadedImage.id);
      console.log(`  Done!\n`);
    } catch (error) {
      console.error(`  Error: ${error}\n`);
    }
  }

  console.log('Image upload complete!');
}

main().catch(console.error);
