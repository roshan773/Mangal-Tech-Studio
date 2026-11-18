export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  popular?: boolean;
  tagline: string;
  imagesCount: string;
  productsCount: string;
  features: string[];
  revisions: string;
  turnaround: string;
  ctaText: string;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: '₹1,499',
    tagline: 'Ideal for single product launches & testing online sales.',
    imagesCount: '5 high-resolution images',
    productsCount: '1 product',
    features: [
      'Studio-style bespoke backgrounds',
      'Lighting and shadow enhancement',
      'Product-focused compositions',
      'Realistic contact shadows',
      'High-res web & social exports (JPG/PNG)',
      '100% Brand logo & label preservation',
      'Manual human quality check'
    ],
    revisions: '1 revision round included',
    turnaround: '48 to 72 hours',
    ctaText: 'Select Essential'
  },
  {
    id: 'brand',
    name: 'Brand',
    price: '₹2,499',
    popular: true,
    tagline: 'Our most popular package for D2C brands & Amazon/Shopify sellers.',
    imagesCount: '10 high-resolution images',
    productsCount: '1 product',
    features: [
      'Multiple studio compositions & podiums',
      'Lifestyle background concepts (interior/nature)',
      'E-commerce (clean white/grey) & social formats',
      'Lighting, reflections & refraction styling',
      'Color grading tuned to your brand aesthetic',
      '1:1 Square, 4:5 Portrait & 16:9 Banner cuts',
      'Manual human quality check'
    ],
    revisions: '1 revision round included',
    turnaround: '48 to 72 hours',
    ctaText: 'Select Brand'
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₹4,499',
    tagline: 'Comprehensive visual suite for brand catalogs & multi-SKU lines.',
    imagesCount: '20 high-resolution images',
    productsCount: 'Up to 3 products',
    features: [
      'Multiple bespoke creative concepts',
      'Both studio pedestals and lifestyle compositions',
      'Product detail visuals & macro texture highlights',
      'Social media promotional creatives (Story & Feed)',
      'Cross-product bundle & family arrangements',
      'Priority queue & dedicated creative specialist',
      'Manual human quality check'
    ],
    revisions: '2 revision rounds included',
    turnaround: '3 to 5 business days',
    ctaText: 'Select Growth'
  },
  {
    id: 'custom-campaign',
    name: 'Custom Campaign',
    price: 'Starting at ₹6,999',
    tagline: 'Full art direction for seasonal launches & large SKU inventories.',
    imagesCount: '30+ high-resolution images',
    productsCount: 'Multiple products / complete collection',
    features: [
      'Custom creative direction & moodboard development',
      'Complex campaign compositions & multi-set styling',
      'Bulk catalogue requirements & custom specifications',
      'Hero banner and billboard/print scale assets',
      'Dedicated lead retoucher & art director',
      'Collaborative preview milestones',
      'Manual human quality check'
    ],
    revisions: 'Tailored revision scope',
    turnaround: '5 to 7 business days',
    ctaText: 'Request Custom Quotation'
  }
];
