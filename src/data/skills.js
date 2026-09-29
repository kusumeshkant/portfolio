/**
 * Skills — taken from the current resume (Kusumesh_Resume.pdf).
 * Grouped tags, Flutter first. No self-rated percentages.
 * `core: true` highlights the tools used most in production.
 */

export const SKILL_CATEGORIES = [
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '📱',
    skills: [
      { name: 'Flutter', core: true },
      { name: 'Dart', core: true },
      { name: 'FlutterFlow' },
      { name: 'iOS (Xcode)' },
      { name: 'Android (Android Studio)' },
      { name: 'App Store & Play Store releases' },
    ],
  },
  {
    id: 'arch',
    label: 'State & Architecture',
    icon: '🏗️',
    skills: [
      { name: 'Riverpod', core: true },
      { name: 'BLoC / Cubit', core: true },
      { name: 'GetX' },
      { name: 'Provider' },
      { name: 'Redux' },
      { name: 'Clean Architecture', core: true },
      { name: 'MVVM' },
      { name: 'SOLID' },
      { name: 'get_it / injectable' },
      { name: 'go_router' },
      { name: 'TDD' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Agents',
    icon: '🤖',
    skills: [
      { name: 'Anthropic SDK' },
      { name: 'Claude API (Sonnet / Haiku)' },
      { name: 'Multi-agent orchestration' },
      { name: 'Langfuse' },
      { name: 'Prometheus' },
      { name: 'Grafana' },
      { name: 'Docker Compose' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', core: true },
      { name: 'TypeScript' },
      { name: 'Express.js' },
      { name: 'REST APIs' },
      { name: 'GraphQL' },
      { name: 'OAuth 2.0' },
      { name: 'Dio (encrypted interceptors)' },
      { name: 'MongoDB' },
      { name: 'WebRTC' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & CI/CD',
    icon: '☁️',
    skills: [
      { name: 'Supabase (Postgres, Auth, Edge Functions)', core: true },
      { name: 'Firebase (Auth, Firestore, FCM, Analytics)', core: true },
      { name: 'AWS S3' },
      { name: 'GitHub Actions' },
      { name: 'CI/CD' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🖥️',
    skills: [
      { name: 'React.js' },
      { name: 'Redux' },
    ],
  },
]

export const TOOLS = ['Figma', 'Postman', 'Jira', 'Confluence']

/** Tech globe node positions — what shows on the 3D globe (desktop only) */
export const GLOBE_NODES = [
  { tech: 'Flutter',   lat:  30, lon:  -30, color: '#54C5F8' },
  { tech: 'Dart',      lat: -15, lon:  -90, color: '#40C4FF' },
  { tech: 'Riverpod',  lat: -10, lon:   90, color: '#4FC3F7' },
  { tech: 'Supabase',  lat: -60, lon:   30, color: '#3ECF8E' },
  { tech: 'Firebase',  lat: -40, lon:  -60, color: '#FFA000' },
  { tech: 'Claude',    lat:  70, lon:  150, color: '#D97757' },
  { tech: 'Node.js',   lat: -20, lon:  150, color: '#68A063' },
  { tech: 'GraphQL',   lat:  10, lon: -140, color: '#E10098' },
  { tech: 'React',     lat:  50, lon:   60, color: '#61DAFB' },
]
