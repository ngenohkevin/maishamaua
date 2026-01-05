# Maisha Maua - Dynamic Content Management System

## Overview

This document outlines the comprehensive plan to transform Maisha Maua from a static website to a dynamic, client-managed platform. The client will be able to manage products, images, pricing, and site content through an intuitive admin panel.

---

## Table of Contents

1. [CMS Options Analysis](#cms-options-analysis)
2. [Recommended Solution](#recommended-solution)
3. [System Architecture](#system-architecture)
4. [Content Types & Data Models](#content-types--data-models)
5. [Admin Panel Features](#admin-panel-features)
6. [Implementation Phases](#implementation-phases)
7. [Technical Stack](#technical-stack)
8. [Deployment Strategy](#deployment-strategy)
9. [Cost Analysis](#cost-analysis)

---

## CMS Options Analysis

### Option 1: Strapi (Recommended)

**What it is:** Open-source, self-hosted headless CMS with visual admin panel.

| Pros | Cons |
|------|------|
| Free and open-source | Requires server hosting |
| Full control over data | More initial setup |
| Self-hosted on your VPS | Needs maintenance |
| PostgreSQL support (uses Dokploy's existing DB) | |
| REST & GraphQL APIs | |
| Media library built-in | |
| User roles & permissions | |
| Docker deployment ready | |

**Best for:** Projects where you want full control, already have infrastructure (like our Dokploy VPS).

### Option 2: Sanity

**What it is:** Cloud-hosted headless CMS with real-time collaboration.

| Pros | Cons |
|------|------|
| Managed hosting | Monthly costs scale with usage |
| Real-time collaboration | Data stored on third-party |
| Excellent image handling | Less control over infrastructure |
| Visual editing | API rate limits on free tier |

**Best for:** Teams needing collaboration, projects without existing infrastructure.

### Option 3: Custom Admin Panel (Prisma + Next.js)

**What it is:** Build a custom admin dashboard from scratch.

| Pros | Cons |
|------|------|
| Complete customization | Significant development time |
| No external dependencies | Must build all features manually |
| Tailored to exact needs | Ongoing maintenance burden |

**Best for:** Highly specific requirements, large development budgets.

---

## Recommended Solution

### Strapi + Next.js + PostgreSQL

**Why Strapi?**

1. **Cost-effective**: Free, self-hosted on existing Dokploy VPS
2. **Easy for client**: Intuitive admin panel requires no technical knowledge
3. **Already compatible**: Works with our existing PostgreSQL database
4. **Media management**: Built-in image upload, optimization, and management
5. **API-ready**: Generates REST/GraphQL APIs automatically
6. **Scalable**: Can grow with the business

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         DOKPLOY VPS                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │                 │  │                 │  │                 │  │
│  │  Next.js App    │  │  Strapi CMS     │  │  PostgreSQL     │  │
│  │  (Frontend)     │  │  (Admin Panel)  │  │  (Database)     │  │
│  │                 │  │                 │  │                 │  │
│  │  Port: 3000     │  │  Port: 1337     │  │  Port: 5432     │  │
│  │                 │  │                 │  │                 │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │           │
│           │    REST API        │     DB Queries     │           │
│           └────────────────────┼────────────────────┘           │
│                                │                                 │
│  ┌─────────────────────────────┴─────────────────────────────┐  │
│  │                     Traefik Proxy                          │  │
│  │  maishamaua.co.ke → Next.js                               │  │
│  │  admin.maishamaua.co.ke → Strapi                          │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      CLOUDFLARE CDN                              │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  - SSL/TLS termination                                      │ │
│  │  - DDoS protection                                          │ │
│  │  - Image caching                                            │ │
│  │  - Global CDN distribution                                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Client visits maishamaua.co.ke** → Next.js fetches data from Strapi API
2. **Admin visits admin.maishamaua.co.ke** → Strapi admin panel loads
3. **Admin updates content** → Strapi saves to PostgreSQL → Next.js rebuilds/revalidates

---

## Content Types & Data Models

### 1. Products (Bouquets/Arrangements)

```typescript
interface Product {
  id: string;
  name: string;                    // "Mixed Rose Bouquet"
  slug: string;                    // "mixed-rose-bouquet"
  description: string;             // Rich text description
  price: number;                   // 2500 (in KES)
  compareAtPrice?: number;         // Original price for sales
  category: Category;              // Relationship
  images: Image[];                 // Multiple images
  featured: boolean;               // Show on homepage
  available: boolean;              // In stock
  sortOrder: number;               // Display order
  tags: string[];                  // ["roses", "romantic", "anniversary"]
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. Categories

```typescript
interface Category {
  id: string;
  name: string;                    // "Roses", "Mixed Bouquets", "Special Occasions"
  slug: string;
  description?: string;
  image?: Image;
  products: Product[];             // Relationship
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. Gallery Images

```typescript
interface GalleryImage {
  id: string;
  title: string;                   // "Valentine's Day Special"
  image: Image;                    // The actual image
  category: GalleryCategory;       // "Weddings", "Events", "Daily"
  featured: boolean;               // Show on homepage gallery
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

type GalleryCategory = 'weddings' | 'events' | 'daily' | 'special';
```

### 4. Site Settings (Singleton)

```typescript
interface SiteSettings {
  // Business Info
  businessName: string;            // "Maisha Maua"
  tagline: string;                 // "Fresh Flowers for Every Occasion"
  description: string;             // SEO description

  // Contact
  phone: string;                   // WhatsApp number
  email: string;
  address: string;

  // Social Media
  instagram?: string;
  facebook?: string;
  tiktok?: string;

  // Business Hours
  businessHours: {
    day: string;
    open: string;
    close: string;
    closed: boolean;
  }[];

  // Homepage Content
  heroTitle: string;
  heroSubtitle: string;
  heroImage: Image;

  // Philosophy Section
  philosophyTitle: string;
  philosophyContent: string;
  philosophyImage: Image;

  // Footer
  footerText: string;
}
```

### 5. Testimonials

```typescript
interface Testimonial {
  id: string;
  customerName: string;
  customerTitle?: string;          // "Wedding Client"
  content: string;                 // The testimonial text
  rating: number;                  // 1-5 stars
  image?: Image;                   // Customer photo (optional)
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
}
```

### 6. Promotions/Banners

```typescript
interface Promotion {
  id: string;
  title: string;                   // "Valentine's Day Sale"
  description: string;
  discount?: string;               // "20% OFF"
  code?: string;                   // "LOVE20"
  image?: Image;
  startDate: Date;
  endDate: Date;
  active: boolean;
  displayLocation: 'banner' | 'popup' | 'both';
}
```

---

## Admin Panel Features

### Dashboard
- Quick stats (total products, categories, gallery images)
- Recent orders/inquiries (future feature)
- Quick actions (add product, upload image)

### Products Management
- **List View**: All products with search, filter by category, sort
- **Add/Edit Product**:
  - Name, description (rich text editor)
  - Price input with currency
  - Multiple image upload with drag-and-drop reorder
  - Category selection
  - Tags input
  - Featured toggle
  - Available toggle
- **Bulk Actions**: Delete, mark as featured, change availability

### Categories Management
- Create/edit categories
- Assign cover image
- Drag-and-drop reorder

### Gallery Management
- Grid view of all images
- Upload multiple images at once
- Assign to gallery categories
- Mark as featured
- Drag-and-drop reorder

### Media Library
- Central repository for all images
- Folder organization
- Image optimization on upload
- Alt text editing
- Used/unused tracking

### Site Settings
- Single page to edit all site-wide content
- Live preview option
- Section-by-section editing

### User Management (Future)
- Admin accounts
- Role-based permissions
- Activity log

---

## Implementation Phases

### Phase 1: Foundation (Core CMS Setup)
**Goal:** Set up Strapi and connect to Next.js

**Tasks:**
1. Create new Strapi project
2. Configure PostgreSQL connection (use Dokploy's existing DB)
3. Deploy Strapi to Dokploy
4. Set up admin.maishamaua.co.ke subdomain
5. Create basic content types:
   - Products
   - Categories
   - Site Settings
6. Migrate existing hardcoded products to Strapi
7. Update Next.js to fetch from Strapi API
8. Set up image handling with Cloudflare

**Deliverables:**
- Working Strapi admin panel
- Products manageable through CMS
- Homepage displays dynamic products

---

### Phase 2: Complete Content Management
**Goal:** Full control over all site content

**Tasks:**
1. Add Gallery content type
2. Add Testimonials content type
3. Implement Site Settings singleton
4. Update all Next.js pages to use dynamic content:
   - Homepage hero section
   - Philosophy section
   - Footer content
   - Contact information
5. Gallery page fully dynamic
6. Implement ISR (Incremental Static Regeneration) for performance

**Deliverables:**
- All site content editable through CMS
- Gallery images manageable
- Site settings configurable

---

### Phase 3: Enhanced Features
**Goal:** Add business-enhancing features

**Tasks:**
1. Promotions/Banners system
2. Product variants (sizes, add-ons)
3. Related products feature
4. Search functionality
5. Category pages with filtering
6. SEO metadata per product/page
7. Sitemap generation

**Deliverables:**
- Promotional capabilities
- Enhanced product catalog
- Better SEO

---

### Phase 4: Analytics & Optimization
**Goal:** Business insights and performance

**Tasks:**
1. Analytics dashboard integration
2. Popular products tracking
3. Image optimization pipeline
4. Performance monitoring
5. Backup automation
6. Security hardening

**Deliverables:**
- Business analytics
- Optimized performance
- Robust backup system

---

### Phase 5: Future Enhancements (Optional)
**Goal:** Additional features as needed

**Potential Features:**
1. Order management system
2. Customer accounts
3. Email notifications
4. Inventory tracking
5. Multi-language support
6. Blog/News section

---

## Technical Stack

### Backend (CMS)
| Component | Technology |
|-----------|------------|
| CMS | Strapi v5 |
| Database | PostgreSQL (existing Dokploy instance) |
| File Storage | Local + Cloudflare CDN |
| API | REST (GraphQL optional) |

### Frontend
| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Data Fetching | Server Components + ISR |
| Image Optimization | Next.js Image + Cloudflare |

### Infrastructure
| Component | Technology |
|-----------|------------|
| Hosting | Dokploy (Docker Swarm) |
| Reverse Proxy | Traefik |
| SSL | Cloudflare |
| CI/CD | GitHub Actions |

### Strapi Plugins (Recommended)
- **@strapi/plugin-users-permissions** - User authentication
- **@strapi/plugin-upload** - Media management (built-in)
- **@strapi/plugin-seo** - SEO metadata management
- **strapi-plugin-import-export-entries** - Bulk import/export

---

## Deployment Strategy

### Strapi Deployment on Dokploy

```yaml
# docker-compose.strapi.yml
services:
  strapi:
    image: ghcr.io/kevinmugiira/maishamaua-cms:latest
    restart: unless-stopped
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: dokploy-postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: maishamaua_cms
      DATABASE_USERNAME: ${DB_USER}
      DATABASE_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
      ADMIN_JWT_SECRET: ${ADMIN_JWT_SECRET}
      APP_KEYS: ${APP_KEYS}
      API_TOKEN_SALT: ${API_TOKEN_SALT}
      NODE_ENV: production
    volumes:
      - strapi-uploads:/opt/app/public/uploads
    networks:
      - dokploy-network
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.strapi.rule=Host(`admin.maishamaua.co.ke`)"
      - "traefik.http.services.strapi.loadbalancer.server.port=1337"

volumes:
  strapi-uploads:
```

### DNS Configuration

| Record | Type | Value |
|--------|------|-------|
| admin.maishamaua.co.ke | A | Cloudflare Proxy → VPS IP |

### CI/CD Pipeline

```yaml
# .github/workflows/deploy-cms.yml
name: Deploy Strapi CMS

on:
  push:
    branches: [main]
    paths:
      - 'cms/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and push Docker image
        # ... build strapi image
      - name: Deploy to Dokploy
        # ... trigger deployment
```

---

## Cost Analysis

### Monthly Costs (Estimated)

| Item | Cost (USD) |
|------|------------|
| VPS (already paid) | $0 (included) |
| PostgreSQL (already running) | $0 (included) |
| Cloudflare (free tier) | $0 |
| Domain (already owned) | $0 |
| **Total Additional Cost** | **$0/month** |

### Development Investment

| Phase | Estimated Effort |
|-------|------------------|
| Phase 1 | Foundation setup |
| Phase 2 | Content management |
| Phase 3 | Enhanced features |
| Phase 4 | Analytics & optimization |

---

## Security Considerations

### Admin Panel Security
- Strong admin passwords
- Two-factor authentication (2FA)
- IP whitelist for admin access (optional)
- Regular security updates

### API Security
- API tokens for frontend access
- Rate limiting
- CORS configuration
- Input validation

### Data Security
- Regular database backups
- Encrypted connections (SSL/TLS)
- Secure environment variables

---

## Client Training

After implementation, the client will receive:

1. **Video tutorials** covering:
   - Logging into admin panel
   - Adding/editing products
   - Managing gallery images
   - Updating site settings
   - Media library usage

2. **Quick reference guide** (PDF):
   - Step-by-step screenshots
   - Common tasks
   - Troubleshooting tips

3. **Support channel**:
   - WhatsApp/Email for questions
   - Response time expectations

---

## Next Steps

1. **Review this documentation** with stakeholders
2. **Approve Phase 1** implementation
3. **Set up Strapi** development environment
4. **Begin migration** of existing content
5. **Deploy and test** admin panel
6. **Client training** session

---

## Appendix

### A. Strapi Content Type Schemas

```javascript
// api/product/content-types/product/schema.json
{
  "kind": "collectionType",
  "collectionName": "products",
  "info": {
    "singularName": "product",
    "pluralName": "products",
    "displayName": "Product"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "description": {
      "type": "richtext"
    },
    "price": {
      "type": "decimal",
      "required": true
    },
    "images": {
      "type": "media",
      "multiple": true,
      "allowedTypes": ["images"]
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category"
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "available": {
      "type": "boolean",
      "default": true
    }
  }
}
```

### B. Next.js Data Fetching Example

```typescript
// lib/strapi.ts
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function getProducts() {
  const res = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  });

  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// app/page.tsx
import { getProducts } from '@/lib/strapi';

export default async function HomePage() {
  const { data: products } = await getProducts();

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### C. Environment Variables

```bash
# .env.local (Next.js)
STRAPI_URL=https://admin.maishamaua.co.ke
STRAPI_API_TOKEN=your-api-token-here

# .env (Strapi)
DATABASE_CLIENT=postgres
DATABASE_HOST=dokploy-postgres
DATABASE_PORT=5432
DATABASE_NAME=maishamaua_cms
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=secure_password_here
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-api-token-salt
```

---

*Document Version: 1.0*
*Created: January 2026*
*Project: Maisha Maua Dynamic CMS*
