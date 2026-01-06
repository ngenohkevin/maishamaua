/**
 * Upload gallery images to Strapi and link them to gallery entries
 */
import * as fs from 'fs';
import * as path from 'path';

const STRAPI_URL = process.env.STRAPI_URL || 'https://maishamauacms.iopulse.cloud';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('Error: STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Gallery images from the frontend
const galleryImageFiles = [
  { file: "photo_2025-12-31 10.54.06.jpeg", title: "Beautiful bouquet arrangement", category: "arrangements" },
  { file: "photo_2025-12-31 11.23.08.jpeg", title: "Fresh flower arrangement", category: "daily" },
  { file: "photo_2025-12-31 11.23.11.jpeg", title: "Colorful mixed bouquet", category: "arrangements" },
  { file: "photo_2025-12-31 11.23.14.jpeg", title: "Elegant flower display", category: "special" },
  { file: "photo_2025-12-31 11.23.34.jpeg", title: "Premium bouquet collection", category: "special" },
  { file: "photo_2025-12-31 11.23.37.jpeg", title: "Romantic flower arrangement", category: "weddings" },
  { file: "photo_2025-12-31 11.23.43.jpeg", title: "Autumn inspired bouquet", category: "daily" },
  { file: "photo_2025-12-31 11.23.47.jpeg", title: "Vibrant flower mix", category: "arrangements" },
  { file: "photo_2025-12-31 11.23.50.jpeg", title: "Special occasion flowers", category: "events" },
  { file: "photo_2025-12-31 11.23.53.jpeg", title: "Celebration bouquet", category: "events" },
  { file: "photo_2025-12-31 11.23.56.jpeg", title: "Gift-ready arrangement", category: "daily" },
  { file: "photo_2025-12-31 11.24.02.jpeg", title: "Handcrafted bouquet", category: "arrangements" },
  { file: "photo_2025-12-31 11.24.05.jpeg", title: "Fresh floral design", category: "daily" },
  { file: "photo_2025-12-31 11.24.07.jpeg", title: "Artistic flower arrangement", category: "special" },
  { file: "photo_2025-12-31 11.24.11.jpeg", title: "Luxury flower collection", category: "special" },
  { file: "photo_2025-12-31 11.24.14.jpeg", title: "Thoughtful bouquet design", category: "daily" },
  { file: "photo_2025-12-31 11.24.17.jpeg", title: "Custom flower arrangement", category: "arrangements" },
  { file: "photo_2025-12-31 11.24.21.jpeg", title: "Colorful celebration flowers", category: "events" },
  { file: "photo_2025-12-31 11.24.24.jpeg", title: "Beautiful bloom selection", category: "daily" },
  { file: "photo_2025-12-31 11.24.26.jpeg", title: "Special delivery bouquet", category: "special" },
  { file: "photo_2025-12-31 11.24.29.jpeg", title: "Premium floral design", category: "special" },
  { file: "photo_2025-12-31 11.24.32.jpeg", title: "Elegant flower gift", category: "daily" },
  { file: "photo_2025-12-31 11.24.35.jpeg", title: "Fresh bouquet arrangement", category: "arrangements" },
  { file: "photo_2025-12-31 11.24.42.jpeg", title: "Stunning flower display", category: "special" },
  { file: "photo_2025-12-31 11.24.45.jpeg", title: "Beautiful floral creation", category: "arrangements" },
  { file: "photo_2025-12-31 12.33.07.jpeg", title: "Appreciation bouquet", category: "daily" },
  { file: "photo_2025-12-31 12.33.09.jpeg", title: "Milestone celebration flowers", category: "events" },
  { file: "photo_2025-12-31 12.33.13.jpeg", title: "Green and yellow arrangement", category: "arrangements" },
  { file: "photo_2025-12-31 12.33.16.jpeg", title: "Warm toned bouquet", category: "daily" },
  { file: "photo_2025-12-31 12.33.18.jpeg", title: "Fresh flower selection", category: "daily" },
  { file: "photo_2025-12-31 12.33.21.jpeg", title: "Custom designed bouquet", category: "arrangements" },
  { file: "photo_2025-12-31 12.33.24.jpeg", title: "Elegant floral gift", category: "special" },
  { file: "photo_2025-12-31 12.33.26.jpeg", title: "Premium flower arrangement", category: "special" },
  { file: "photo_2025-12-31 12.33.29.jpeg", title: "Beautiful bloom bouquet", category: "daily" },
  { file: "photo_2025-12-31 12.33.32.jpeg", title: "Celebration ready flowers", category: "events" },
  { file: "photo_2025-12-31 12.33.39.jpeg", title: "Fresh floral creation", category: "arrangements" },
  { file: "photo_2025-12-31 12.33.49.jpeg", title: "Pink roses arrangement", category: "weddings" },
  { file: "photo_2025-12-31 12.33.53.jpeg", title: "Special occasion bouquet", category: "events" },
  { file: "photo_2025-12-31 12.33.56.jpeg", title: "Thoughtful flower gift", category: "daily" },
  { file: "photo_2025-12-31 12.34.00.jpeg", title: "Sunflower mix bouquet", category: "daily" },
  { file: "photo_2025-12-31 12.34.06.jpeg", title: "Handcrafted floral design", category: "arrangements" },
  { file: "photo_2025-12-31 12.34.10.jpeg", title: "Fresh flower arrangement", category: "daily" },
  { file: "photo_2025-12-31 12.34.14.jpeg", title: "Beautiful bouquet creation", category: "arrangements" },
  { file: "photo_2025-12-31 12.34.18.jpeg", title: "Elegant flower selection", category: "special" },
  { file: "photo_2025-12-31 12.34.23.jpeg", title: "Premium floral gift", category: "special" },
];

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
  return result[0];
}

async function createGalleryEntry(title: string, category: string, imageId: number, sortOrder: number) {
  const response = await fetch(`${STRAPI_URL}/api/gallery-images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        title,
        galleryCategory: category,
        image: imageId,
        sortOrder,
        featured: sortOrder <= 12,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create gallery entry: ${error}`);
  }

  return response.json();
}

async function deleteExistingGalleryEntries() {
  // Get all existing entries
  const response = await fetch(`${STRAPI_URL}/api/gallery-images?pagination[limit]=100`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!response.ok) return;

  const result = await response.json();

  for (const entry of result.data) {
    await fetch(`${STRAPI_URL}/api/gallery-images/${entry.documentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    });
    console.log(`Deleted old entry: ${entry.title}`);
  }
}

async function main() {
  console.log('Starting gallery image upload...\n');
  console.log(`Strapi URL: ${STRAPI_URL}\n`);

  const imagesDir = path.join(process.cwd(), 'public', 'images');

  // Delete existing entries without images
  console.log('Removing old gallery entries...\n');
  await deleteExistingGalleryEntries();

  console.log('\nUploading gallery images...\n');

  let sortOrder = 1;
  for (const item of galleryImageFiles) {
    const imagePath = path.join(imagesDir, item.file);

    if (!fs.existsSync(imagePath)) {
      console.log(`Image not found: ${item.file}`);
      continue;
    }

    try {
      console.log(`[${sortOrder}/${galleryImageFiles.length}] Uploading: ${item.title}...`);
      const uploadedImage = await uploadImage(imagePath, item.file);

      await createGalleryEntry(item.title, item.category, uploadedImage.id, sortOrder);
      console.log(`  Done!\n`);
      sortOrder++;
    } catch (error) {
      console.error(`  Error: ${error}\n`);
    }
  }

  console.log(`\nGallery upload complete! ${sortOrder - 1} images uploaded.`);
}

main().catch(console.error);
