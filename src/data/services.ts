export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  categories: string[];
  deliverables: string[];
  features: string[];
  ctaText: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'studio-product-photography',
    title: 'AI-Assisted Studio Photography',
    shortDescription: 'Pristine, podium, and pedestal compositions engineered with bespoke studio lighting and shadow accuracy.',
    fullDescription: 'Our flagship studio service replaces expensive commercial studio bookings. We take your raw product images, isolate the geometry, preserve all brand logos and packaging details, and place them on customized architectural pedestals, travertine stone, water reflections, or bespoke studio backdrops with physical lighting parity.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
    categories: ['Cosmetics & Skincare', 'Perfumes & Fragrances', 'Watches & Jewellery', 'Packaged Goods'],
    deliverables: [
      'High-resolution studio master files (300 DPI)',
      'Multiple angle and lighting perspectives',
      'Flawless clean backgrounds with realistic drop shadows',
      'Optimized versions for Amazon, Shopify & brand websites'
    ],
    features: [
      'Physical lighting simulation (softbox, rim, natural caustics)',
      'Pedestals: Travertine, marble, frosted glass, sand, wood',
      'Pixel-level packaging label protection and chromatic fidelity',
      'Manual retouching and human QC check'
    ],
    ctaText: 'Book Studio Shoot'
  },
  {
    id: 'lifestyle-product-photography',
    title: 'Lifestyle Product Photography',
    shortDescription: 'Evocative contextual scenes that show your products thriving in authentic, high-end environments.',
    fullDescription: 'Customers buy the lifestyle, not just the product. We compose your items into aspirational living rooms, sun-drenched marble bathrooms, bustling urban streets, or serene natural landscapes. We carefully balance depth of field, ambient reflections, and environmental interaction.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
    categories: ['Home Décor & Candles', 'Handmade & Artisanal', 'Apparel & Leather Goods', 'Wellness Products'],
    deliverables: [
      'Editorial lifestyle compositions for hero banners',
      'Varied interior and exterior lighting moods (morning, dusk, warm hearth)',
      'Color-graded cohesive collections for seasonal launches',
      'Cross-platform multi-aspect ratio cutouts'
    ],
    features: [
      'Authentic contextual scene synthesis',
      'Precise shadow casting onto organic surfaces (linen, wood, stone)',
      'Prop styling harmonious with your brand palette',
      'Strict brand identity preservation'
    ],
    ctaText: 'Create Lifestyle Scenes'
  },
  {
    id: 'ecommerce-product-images',
    title: 'E-commerce Product Visuals',
    shortDescription: 'Conversion-calibrated marketplace imagery tailored to Amazon, Shopify, Flipkart, and WooCommerce guidelines.',
    fullDescription: 'E-commerce conversion hinges on clarity, consistency, and compliance. We produce immaculate pure white (#FFFFFF) background shots, dimensional neutral grey plates, and consistent catalog series that make your product grids look uniform, trustworthy, and premium.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
    categories: ['Consumer Electronics', 'Footwear & Bags', 'Fashion Accessories', 'Health Supplements'],
    deliverables: [
      '100% compliant Amazon/Shopify pure white cutouts',
      'Natural contact shadows and mirror reflections',
      'Square (1:1) and vertical (4:5) format outputs',
      'Fast turnaround for high-volume catalogs'
    ],
    features: [
      'Color calibration matching physical samples',
      'Crisp edge segmentation without fuzzy halos',
      'Uniform sizing and horizon alignment across product ranges',
      'Batch production consistency'
    ],
    ctaText: 'Upgrade E-commerce Catalog'
  },
  {
    id: 'product-detail-visuals',
    title: 'Product Detail Visuals',
    shortDescription: 'Macro-level closeups highlighting material textures, tactile finishes, ingredients, and craft details.',
    fullDescription: 'Build buyer confidence by demonstrating quality up close. We produce macro-style visuals that showcase the weave of handcrafted textiles, the golden sparkle of jewelry facets, the rich emulsion of a skincare cream, or the precise embossing of a leather wallet.',
    image: 'https://images.unsplash.com/photo-1608248597359-5f25712e52c8?auto=format&fit=crop&w=1200&q=85',
    categories: ['Fine Jewellery', 'Skincare & Cosmetics', 'Leather Goods', 'Craft & Pottery'],
    deliverables: [
      'Macro detail zooms (fabric weaves, gemstone prongs, textures)',
      'Texture swatch visualizations (smears, droplets, powders)',
      'Ingredient accent compositions (botanicals, oils, spices)',
      'Exploded or component-highlight visuals'
    ],
    features: [
      'Extreme optical sharpness enhancement',
      'Realistic material shaders (metallic luster, glass caustics, matte finish)',
      'Harmonious natural ingredients & prop integration',
      'Micro-inspection by senior creative retouchers'
    ],
    ctaText: 'Highlight Product Details'
  },
  {
    id: 'social-media-product-creatives',
    title: 'Social Media Product Creatives',
    shortDescription: 'Scroll-stopping aesthetic visuals designed to drive engagement, shares, and clicks on Instagram and Pinterest.',
    fullDescription: 'Social feeds require dynamic, trend-aware aesthetics. We craft bold, colorful, and highly stylized visuals tailored for Instagram carousels, Stories, Pinterest pins, and TikTok video cover cards that command attention in crowded mobile feeds.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    categories: ['Indie Brands', 'Instagram Sellers', 'Direct-to-Consumer (D2C)', 'Fashion Accessories'],
    deliverables: [
      'Story & Reels 9:16 vertical compositions',
      'Feed post 1:1 square & 4:5 portrait formats',
      'Minimal text space integration for promo headlines',
      'Cohesive 9-grid aesthetic themes'
    ],
    features: [
      'Contemporary editorial color grading (warm retro, minimal scandi, vivid pop)',
      'High-impact negative space for marketing copy',
      'Mobile-optimized contrast and visual punch',
      'Platform-native sizing'
    ],
    ctaText: 'Boost Social Presence'
  },
  {
    id: 'custom-campaign-visuals',
    title: 'Custom Campaign Visuals',
    shortDescription: 'Complete thematic art direction for seasonal launches, festival promos, and multi-product brand campaigns.',
    fullDescription: 'When launching a seasonal collection or a flagship product line, standard templates won’t suffice. Our creative team develops an end-to-end visual art direction with unified color narratives, thematic prop worlds (e.g., Diwali festive, summer glow, monsoon freshness), and full cross-channel collateral.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
    categories: ['Established Brands', 'Seasonal Collections', 'Festive Campaigns', 'Flagship Launches'],
    deliverables: [
      'Complete art-directed campaign styleguide',
      '30+ coordinated high-resolution assets',
      'Multi-product composite arrangements and bundle visuals',
      'Website hero banners, billboard-resolution deliverables & print-ready files'
    ],
    features: [
      'Bespoke creative direction consultation',
      'Dedicated lead retoucher & art director',
      'Unlimited variation concepts during ideation phase',
      'Priority turnaround with express milestone reviews'
    ],
    ctaText: 'Request Custom Campaign'
  }
];
