/**
 * Projects showcase — Kusumeshkant Sharma
 * Real production projects from resume. featured: true → primary spotlight row.
 */
export const PROJECTS = [
  {
    id: 1,
    name: 'Selfe Loans',
    tagline: 'Digital lending — Equitas Small Finance Bank',
    domain: 'Fintech',
    description:
      'Production fintech platform offering business loans, home loans, loans against property, merchant overdrafts, and car loans. End-to-end KYC, document upload, and real-time approval tracking backed by 900+ branch integrations across India.',
    tech: ['Flutter', 'Riverpod', 'Dio', 'Firebase', 'REST APIs', 'MVVM'],
    color: '#4FC3F7',
    featured: true,
    links: {
      live: 'https://play.google.com/store/apps/details?id=com.equitas.selfeloans',
    },
    stat: { value: '900+', label: 'Branches' },
  },
  {
    id: 2,
    name: '150+ Health',
    tagline: 'Cross-platform fitness & smartwatch sync',
    domain: 'Health & Fitness',
    description:
      'Cross-platform fitness app with wearable smartwatch sync for both iOS (Apple HealthKit) and Android (Google Fit), personalized video content, calorie tracking, and Google Maps-powered location-based court discovery.',
    tech: ['Flutter', 'Node.js', 'Firebase', 'Google Fit', 'Apple HealthKit', 'Google Maps'],
    color: '#34D399',
    featured: true,
    links: {
      live: 'https://play.google.com/store/apps/details?id=com.us.onefiftyplushealth',
    },
    stat: { value: 'iOS + Android', label: 'Wearable Sync' },
  },
  {
    id: 3,
    name: 'RacketPro',
    tagline: 'Trainer certification web platform',
    domain: 'Sports & Education',
    description:
      'Platform for training and certifying pickleball trainers. Features video-based course delivery, interactive assessments, and official certification issuance. Built with Flutter and GetX for smooth cross-platform performance.',
    tech: ['Flutter', 'GetX', 'Node.js', 'Firebase', 'Google Maps'],
    color: '#8B5CF6',
    featured: true,
    links: {
      live: 'https://www.racketpro.org/',
    },
    stat: { value: 'Live', label: 'racketpro.org' },
  },
  {
    id: 4,
    name: 'EE E-Commerce',
    tagline: 'Checkout flow for UK electronics giant',
    domain: 'E-Commerce',
    description:
      'Checkout flow module for EE, a UK-based electronics e-commerce platform. Implemented cart management, shipping address selection, payment method integration, and order confirmation using Flutter + BLoC with GraphQL APIs.',
    tech: ['Flutter', 'BLoC', 'GraphQL', 'Dio', 'Clean Architecture'],
    color: '#F59E0B',
    featured: false,
    links: {
      live: 'https://play.google.com/store/apps/details?id=uk.co.ee.myee',
    },
    stat: { value: 'UK Market', label: 'Enterprise' },
  },
  {
    id: 5,
    name: 'StillsWeb',
    tagline: 'Cloud photo gallery with AWS S3',
    domain: 'Cloud Storage',
    description:
      'Cloud photo storage platform with 10GB per user, folder-level permission management (view/edit/full access), and AWS S3 backend. Implemented granular role-based access control and pixel-perfect Flutter UI from Figma designs.',
    tech: ['Flutter', 'AWS S3', 'Firebase', 'GetX', 'Node.js', 'Hive'],
    color: '#EC4899',
    featured: false,
    links: {
      live: 'https://play.google.com/store/apps/details?id=com.stillsweb.cloud',
    },
    stat: { value: '10GB', label: 'Per User' },
  },
  {
    id: 6,
    name: 'Srajan AI',
    tagline: 'AI-powered creative app',
    domain: 'AI / Mobile',
    description:
      'AI-integrated Flutter app built alongside the StillsWeb ecosystem. Features intelligent content processing and creative tools. Live on Google Play Store as a companion to the StillsWeb cloud gallery platform.',
    tech: ['Flutter', 'Firebase', 'GetX', 'AI Integration', 'Node.js'],
    color: '#06B6D4',
    featured: false,
    links: {
      live: 'https://play.google.com/store/apps/details?id=com.stillsweb.cloud',
    },
    stat: { value: 'Live', label: 'Play Store' },
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured)
export const STANDARD_PROJECTS = PROJECTS.filter(p => !p.featured)
