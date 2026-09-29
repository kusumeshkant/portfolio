/**
 * Projects showcase — Kusumeshkant Sharma
 * Taken from the current resume. featured: true → primary spotlight row.
 *
 * links: only real, public URLs (each verified to return 200). Omit a link
 * rather than point at a private repo or a dead page — cards without links
 * simply show no link row.
 */
export const PROJECTS = [
  {
    id: 'cockpit',
    name: 'Cockpit',
    tagline: 'AI Agent Approval Console',
    domain: 'AI Agents · Mobile',
    status: 'In development',
    description:
      'Mobile-first, human-in-the-loop app for approving AI-agent actions (n8n / Make / Zapier / custom agents). Signed webhook → FCM push → one-tap approve / edit / reject → authenticated callback to the agent, backed by an append-only audit trail. Supabase Postgres with row-level security and transactional Edge Functions enforcing HMAC-signed webhooks and idempotent decisions.',
    tech: ['Flutter', 'Riverpod', 'get_it / injectable', 'go_router', 'Supabase', 'Edge Functions', 'FCM', 'HMAC'],
    color: '#4FC3F7',
    featured: true,
    links: [],
    stat: { value: 'HMAC + RLS', label: 'Secure by design' },
  },
  {
    id: 'selfe-loans',
    name: 'Selfe Loans',
    tagline: 'Digital lending — Equitas Small Finance Bank',
    domain: 'Fintech',
    description:
      'Production lending app for Equitas Small Finance Bank: end-to-end KYC, document upload and real-time application tracking across 900+ branch integrations, built on Riverpod + MVVM with strict Clean Architecture and an interceptor-encrypted Dio API client.',
    tech: ['Flutter', 'Riverpod', 'MVVM', 'Dio', 'Firebase', 'REST APIs'],
    color: '#34D399',
    featured: true,
    links: [
      { label: 'Product page', href: 'https://equitas.bank.in/personal-banking/borrow/loan/selfe-loans/' },
    ],
    stat: { value: '900+', label: 'Branches' },
  },
  {
    id: '150-health',
    name: '150+ Health',
    tagline: 'Cross-platform fitness & smartwatch sync',
    domain: 'Health & Fitness',
    description:
      'Cross-platform fitness app with automated smartwatch activity sync through Google Health Connect (Android) and Apple HealthKit (iOS), personalized video content, and Google Maps court discovery.',
    tech: ['Flutter', 'Health Connect', 'Apple HealthKit', 'Node.js', 'Firebase', 'Google Maps'],
    color: '#8B5CF6',
    featured: true,
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.us.onefiftyplushealth' },
    ],
    stat: { value: 'iOS + Android', label: 'Wearable sync' },
  },
  {
    id: 'dq-orchestrator',
    name: 'DQ AI Agent Orchestrator',
    tagline: 'Multi-agent operations on Claude',
    domain: 'AI Agents · Backend',
    status: 'Personal project · 2026',
    description:
      'Hierarchical 8-agent system: an orchestrator on Claude Sonnet synthesizes the work of 7 parallel specialist agents on Claude Haiku (revenue, sales pipeline, churn, customer success, product, growth, platform) into a daily brief. Every LLM call traced in Langfuse with Prometheus and Grafana, all on Docker Compose.',
    tech: ['Node.js', 'TypeScript', 'Anthropic SDK', 'Claude API', 'Langfuse', 'Prometheus', 'Grafana', 'Docker Compose'],
    color: '#D97757',
    featured: false,
    links: [],
    stat: { value: '~$0.002', label: 'Per run' },
  },
  {
    id: 'ee',
    name: 'EE',
    tagline: 'UK e-commerce app — checkout module',
    domain: 'E-Commerce',
    description:
      'Complete checkout module for the EE e-commerce app (UK): cart, address selection, payment integration and order confirmation, built with Flutter + BLoC + Clean Architecture on GraphQL APIs with TDD.',
    tech: ['Flutter', 'BLoC', 'GraphQL', 'Dio', 'Clean Architecture', 'TDD'],
    color: '#F59E0B',
    featured: false,
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=uk.co.ee.myee' },
    ],
    stat: { value: 'Checkout', label: 'End-to-end' },
  },
  {
    id: 'racketpro',
    name: 'RacketPro',
    tagline: 'Trainer certification platform',
    domain: 'Sports & Education',
    description:
      'Platform for training and certifying pickleball trainers — video-based courses, assessments and certification issuance. Built with Flutter and GetX on a Node.js / Express.js / MongoDB backend.',
    tech: ['Flutter', 'GetX', 'Node.js', 'Express.js', 'MongoDB'],
    color: '#A78BFA',
    featured: false,
    links: [
      { label: 'racketpro.org', href: 'https://www.racketpro.org/' },
    ],
    stat: { value: 'Live', label: 'racketpro.org' },
  },
  {
    id: 'stillsweb',
    name: 'StillsWeb',
    tagline: 'Cloud photo gallery with AWS S3',
    domain: 'Cloud Storage',
    description:
      'Cloud photo storage with 10 GB per user and folder-level role-based permissions on an AWS S3 backend, Hive offline-first persistence, and pixel-perfect Flutter UI from Figma designs.',
    tech: ['Flutter', 'GetX', 'AWS S3', 'Firebase', 'Hive', 'Node.js'],
    color: '#EC4899',
    featured: false,
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.stillsweb.cloud' },
    ],
    stat: { value: '10 GB', label: 'Per user' },
  },
  {
    id: 'srajan-ai',
    name: 'Srajan AI',
    tagline: 'AI app — StillsWeb product family',
    domain: 'AI / Mobile',
    description:
      'Flutter app shipped to the Play Store during my time at StillsWeb, alongside the StillsWeb cloud gallery and Unsync.',
    tech: ['Flutter', 'GetX', 'Firebase'],
    color: '#06B6D4',
    featured: false,
    links: [
      { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.srajanai.cloud' },
    ],
    stat: { value: 'Live', label: 'Play Store' },
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured)
export const STANDARD_PROJECTS = PROJECTS.filter(p => !p.featured)
