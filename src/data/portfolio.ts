export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Skincare' | 'Beauty' | 'Jewellery' | 'Fashion' | 'Home Décor' | 'Lifestyle' | 'Food';
  clientType: string;
  deliverables: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  featured?: boolean;
  aspectRatio?: 'portrait' | 'square' | 'landscape';
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'lumiere-botanical-serum',
    title: 'Lumière Botanical Radiance Serum',
    category: 'Skincare',
    clientType: 'Organic Skincare Brand',
    deliverables: 'Studio Podiums, Water Refraction, Organic Botanical Accents',
    description: 'Transforming a basic smartphone bottle shot into a sun-drenched, high-end marble and water-droplet studio editorial.',
    // Raw plain smartphone shot on wooden tabletop with harsh ambient light
    beforeImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    // High-end luxury studio cosmetic staging with podium, water droplets, and rim lighting
    afterImage: 'https://images.unsplash.com/photo-1608248597359-5f25712e52c8?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    aspectRatio: 'portrait'
  },
  {
    id: 'aurelia-emerald-pendant',
    title: 'Aurelia 18K Emerald Heritage Pendant',
    category: 'Jewellery',
    clientType: 'Fine Jewellery Label',
    deliverables: 'Dark Velvet & Travertine Macro Showcase with Micro-Facet Sparkle',
    description: 'Elevating tabletop jewellery snaps with dramatic directional rim lighting, gold sheen enhancement, and razor-sharp gem faceting.',
    // Casual tabletop smartphone jewellery shot on desk
    beforeImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    // Ultra-luxury studio jewellery editorial with dark velvet and dramatic lighting
    afterImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    aspectRatio: 'square'
  },
  {
    id: 'artisan-single-origin-espresso',
    title: 'Monsoon Malabar Single-Origin Coffee',
    category: 'Food',
    clientType: 'Artisanal Roastery',
    deliverables: 'Steam Particle Styling, Warm Morning Light & Jute Textures',
    description: 'Packaging photo re-contextualized into a warm, sensory café atmosphere with aromatic roasted beans and morning glow.',
    // Casual bag photo on plain counter
    beforeImage: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    // Atmospheric cafe studio visual with rich textures and steam particles
    afterImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    aspectRatio: 'portrait'
  },
  {
    id: 'terracotta-sculptural-vase',
    title: 'Komorebi Hand-Thrown Ceramic Vessel',
    category: 'Home Décor',
    clientType: 'Contemporary Craft Studio',
    deliverables: 'Architectural Shadows, Minimalist Pedestal & Linen Backdrop',
    description: 'Clean ecommerce flat shot reimagined in an architectural brutalist interior with natural window shadow-play.',
    // Simple smartphone snap of clay pot on floor
    beforeImage: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    // Architectural interior studio set with dramatic morning sun and clean pedestal
    afterImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    aspectRatio: 'landscape'
  },
  {
    id: 'velvet-matte-lip-collection',
    title: 'Velour Rose Hydrating Lip Elixir',
    category: 'Beauty',
    clientType: 'Indie Cosmetics Brand',
    deliverables: 'High-Gloss Swatch Swirls, Satin Sheen & Rose Quartz Pedestals',
    description: 'Converting flat catalog cosmetic shots into luxury magazine advertising spreads with texture smudges and chromatic fidelity.',
    // Plain flat lay phone photo
    beforeImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    // Professional cosmetic studio photoshoot with cream smudges and clean styling
    afterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    aspectRatio: 'square'
  },
  {
    id: 'cuir-artisan-leather-tote',
    title: 'Vachetta Tan Handcrafted Carryall',
    category: 'Fashion',
    clientType: 'Sustainable Leather Goods',
    deliverables: 'Urban Lifestyle Shoot, Streetwear Vignette, Brass Hardware Polish',
    description: 'Plain cardboard studio snapshot converted into an authentic European cobblestone street lifestyle campaign.',
    // Phone shot on flat cardboard or floor
    beforeImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    // Magazine-grade street style editorial with atmospheric city backdrop
    afterImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    aspectRatio: 'portrait'
  },
  {
    id: 'zenith-nordic-scented-candle',
    title: 'Santal & Cedarwood Soy Candle',
    category: 'Lifestyle',
    clientType: 'Wellness & Home Fragrance',
    deliverables: 'Gentle Wick Glow, Cozy Hearth Tone, Cashmere Styling',
    description: 'From unlit product mock-up to a warm, evocative lifestyle setting that sells fragrance through ambient visual mood.',
    // Simple unlit candle on plain desk
    beforeImage: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=800&q=80',
    // Warm, cozy ambient lifestyle staging with glowing flame and soft knit textures
    afterImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    aspectRatio: 'square'
  },
  {
    id: 'solstice-botanical-tonic',
    title: 'Botanical Herbal Aperitif',
    category: 'Food',
    clientType: 'Craft Beverage Company',
    deliverables: 'Condensation Droplet Styling, Citrus Garnish & Golden Hour Ambient',
    description: 'Dry bottle rendered with crisp glass reflections, effervescent condensation, and Mediterranean sun rays.',
    // Plain dry bottle against basic kitchen wall
    beforeImage: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80',
    // Sunlit golden hour bar lifestyle shot with condensation droplets and fresh garnishes
    afterImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
    featured: false,
    aspectRatio: 'landscape'
  },
  {
    id: 'solitaire-diamond-ring',
    title: 'Celestial Diamond Engagement Ring',
    category: 'Jewellery',
    clientType: 'Custom Jeweller',
    deliverables: 'Prong Detail Macro, Prismatic Caustics, Dark Titanium Stage',
    description: 'Mobile phone photo transformed into an ultra-luxury editorial with prismatic dispersion and immaculate metal polish.',
    // Blurry or basic phone photo of ring
    beforeImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    // High-end macro diamond brilliance studio photography
    afterImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    aspectRatio: 'square'
  }
];
