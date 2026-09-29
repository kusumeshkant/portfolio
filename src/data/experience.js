/**
 * Experience timeline — Kusumeshkant Sharma
 * Taken from the current resume. Most-recent first.
 * EARLIER_ROLES are non-development roles, shown as a single compact line.
 */
export const EXPERIENCES = [
  {
    id: 1,
    period: 'Sept 2025 — Mar 2026',
    company: 'Apto Solutions',
    location: 'Chennai',
    role: 'Sr. Software Developer (Flutter)',
    domain: 'Fintech',
    description:
      'Architected the Selfe Loans app for Equitas Small Finance Bank with Riverpod + MVVM and strict Clean Architecture layering, across 900+ branch integrations India-wide. Built a modular Dio API client with interceptor-level request/response encryption, end-to-end onboarding (KYC, document upload, real-time status tracking), and owned the App Store + Play Store release pipeline.',
    tech: ['Flutter', 'Riverpod', 'MVVM', 'Clean Architecture', 'Dio', 'Firebase Analytics', 'Netcore'],
    highlight: 'Owned App Store + Play Store releases',
  },
  {
    id: 2,
    period: 'Sept 2024 — Apr 2025',
    company: 'Joola India Pvt. Ltd',
    location: 'Bangalore',
    role: 'Sr. Software Developer (Flutter)',
    domain: 'Health & Sports',
    description:
      'Led Flutter development of 150+ Health (Play Store) with smartwatch sync via Google Health Connect (Android) and Apple HealthKit (iOS). Mentored junior developers on Clean Architecture and state management and ran code reviews across the mobile codebase. Built the Node.js / Express.js / MongoDB backend for analytics and content delivery, and built the RacketPro trainer certification platform (racketpro.org) with Flutter + GetX.',
    tech: ['Flutter', 'Health Connect', 'Apple HealthKit', 'GetX', 'Node.js', 'Express.js', 'MongoDB'],
    highlight: 'Mentored developers · led code reviews',
  },
  {
    id: 3,
    period: 'Nov 2023 — Apr 2024',
    company: 'Joulestowatts BS Pvt. Ltd',
    location: 'Bangalore',
    role: 'Software Developer',
    domain: 'E-Commerce',
    description:
      'Delivered the complete checkout module (cart, address, payment integration, order confirmation) for the EE e-commerce app (UK, Play Store) using Flutter + BLoC + Clean Architecture. Integrated GraphQL APIs with TDD documentation and applied SOLID across all feature modules.',
    tech: ['Flutter', 'BLoC', 'GraphQL', 'Dio', 'Clean Architecture', 'TDD'],
    highlight: 'End-to-end checkout for a UK app',
  },
  {
    id: 4,
    period: 'Feb 2022 — Oct 2023',
    company: 'StillsWeb',
    location: 'Mumbai · Remote',
    role: 'Software Developer',
    domain: 'Cloud Storage & AI',
    description:
      'Shipped StillsWeb (cloud photo gallery) to the Play Store, built the Srajan AI Flutter front end from scratch, and built Unsync, a real-time video/audio/text app on Firebase + WebRTC. Built Node.js / Express.js / MongoDB services, AWS S3 storage with role-based folder permissions (10 GB/user), Hive offline-first persistence, and React.js admin interfaces.',
    tech: ['Flutter', 'GetX', 'Firebase', 'WebRTC', 'AWS S3', 'Hive', 'Node.js', 'React.js'],
    highlight: '10 GB cloud storage per user',
  },
]

export const EARLIER_ROLES = [
  { period: 'Jun 2020 — Sep 2021', role: 'Technical Engineer', company: 'Concentrix', location: 'Bangalore', note: 'L1/L2 enterprise technical support' },
]

