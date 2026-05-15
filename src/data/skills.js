/**
 * Skills — extracted directly from Kusumeshkant Sharma's resume
 * Real skills, real proficiency levels based on years of production use.
 */

export const SKILL_CATEGORIES = [
  {
    id: 'mobile',
    label: 'Mobile',
    icon: '📱',
    skills: [
      { name: 'Flutter',     level: 95, tag: 'Primary' },
      { name: 'Dart',        level: 93 },
      { name: 'iOS (Xcode)', level: 78 },
      { name: 'Android',     level: 80 },
    ],
  },
  {
    id: 'state',
    label: 'State Management',
    icon: '⚡',
    skills: [
      { name: 'Riverpod',  level: 90 },
      { name: 'BLoC',      level: 88 },
      { name: 'GetX',      level: 85 },
      { name: 'Redux',     level: 78 },
      { name: 'Provider',  level: 82 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '🖥️',
    skills: [
      { name: 'React.js',     level: 85, tag: 'Primary' },
      { name: 'JavaScript',   level: 82 },
      { name: 'HTML5 / CSS3', level: 80 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js',    level: 82, tag: 'Primary' },
      { name: 'Express.js', level: 80 },
      { name: 'REST APIs',  level: 92 },
      { name: 'GraphQL',    level: 75 },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Database',
    icon: '☁️',
    skills: [
      { name: 'Firebase',  level: 90, tag: 'Primary' },
      { name: 'AWS S3',    level: 78 },
      { name: 'Azure',     level: 68 },
      { name: 'MongoDB',   level: 75 },
    ],
  },
  {
    id: 'arch',
    label: 'Architecture',
    icon: '🏗️',
    skills: [
      { name: 'Clean Architecture', level: 88 },
      { name: 'MVVM',               level: 90 },
      { name: 'SOLID Principles',   level: 85 },
      { name: 'CI/CD',              level: 75 },
    ],
  },
]

export const ALL_SKILLS = SKILL_CATEGORIES.flatMap(c => c.skills.map(s => s.name))

/** Tech globe node positions — what shows on the 3D globe */
export const GLOBE_NODES = [
  { tech: 'Flutter',   lat:  30, lon:  -30, color: '#54C5F8' },
  { tech: 'React',     lat:  50, lon:   60, color: '#61DAFB' },
  { tech: 'Node.js',   lat: -20, lon:  120, color: '#68A063' },
  { tech: 'Firebase',  lat: -40, lon:  -60, color: '#FFA000' },
  { tech: 'GraphQL',   lat:  10, lon: -120, color: '#E10098' },
  { tech: 'AWS',       lat:  70, lon:  150, color: '#FF9900' },
  { tech: 'Azure',     lat: -60, lon:   30, color: '#0089D6' },
  { tech: 'MongoDB',   lat:  20, lon:   -5, color: '#4DB33D' },
  { tech: 'Riverpod',  lat: -10, lon:   90, color: '#4FC3F7' },
]
