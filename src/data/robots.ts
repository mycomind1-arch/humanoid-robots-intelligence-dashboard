export interface Robot {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  countryCode: string;
  status: 'Research / Prototype' | 'Limited Deployment' | 'Commercial Use' | 'Mass Production';
  price: string;
  priceEstimate?: string;
  releaseDate: string;
  availability: string;
  image: string;
  score: number;
  specs: {
    height: string;
    weight: string;
    payload: string;
    topSpeed: string;
    battery: string;
    dof: string;
    aiSystem: string;
    useCases: string;
  };
}

export const robots: Robot[] = [
  {
    id: 'optimus-gen3',
    name: 'Optimus Gen 3',
    manufacturer: 'Tesla',
    country: 'USA',
    countryCode: 'US',
    status: 'Limited Deployment',
    price: '$20,000 - $30,000',
    priceEstimate: '(est.)',
    releaseDate: '2025 (Limited)',
    availability: '2025 (Limited)',
    image: '/robots/optimus-gen3.png',
    score: 86,
    specs: {
      height: '~1.72 m / 5\'8"',
      weight: '~57 kg / 126 lbs',
      payload: '~20 kg / 44 lbs',
      topSpeed: '~8 km/h / 5 mph',
      battery: '~2.5 hrs',
      dof: '~40+',
      aiSystem: 'Tesla AI',
      useCases: 'General Purpose',
    },
  },
  {
    id: 'unitree-g1',
    name: 'Unitree G1',
    manufacturer: 'Unitree Robotics',
    country: 'China',
    countryCode: 'CN',
    status: 'Mass Production',
    price: '$16,000',
    releaseDate: 'Now',
    availability: 'Now',
    image: '/robots/unitree-g1.png',
    score: 84,
    specs: {
      height: '~1.32 m / 4\'3"',
      weight: '~35 kg / 77 lbs',
      payload: '~10 kg / 22 lbs',
      topSpeed: '~7 km/h / 4.3 mph',
      battery: '~2 hrs',
      dof: '23-43',
      aiSystem: 'Unitree AI',
      useCases: 'Education, Service',
    },
  },
  {
    id: 'h1',
    name: 'H1',
    manufacturer: 'Fourier Intelligence',
    country: 'China',
    countryCode: 'CN',
    status: 'Limited Deployment',
    price: '~$70,000',
    releaseDate: '2025',
    availability: '2025',
    image: '/robots/h1.png',
    score: 82,
    specs: {
      height: '~1.80 m / 5\'11"',
      weight: '~47 kg / 104 lbs',
      payload: '~20 kg / 44 lbs',
      topSpeed: '~7 km/h / 4.3 mph',
      battery: '~2 hrs',
      dof: '~41',
      aiSystem: 'Fourier GR-1',
      useCases: 'Industrial, Service',
    },
  },
  {
    id: 'walker-s',
    name: 'Walker S',
    manufacturer: 'UBTECH',
    country: 'China',
    countryCode: 'CN',
    status: 'Mass Production',
    price: '~$70,000+',
    releaseDate: 'Now',
    availability: 'Now',
    image: '/robots/walker-s.png',
    score: 80,
    specs: {
      height: '~1.70 m / 5\'7"',
      weight: '~43 kg / 95 lbs',
      payload: '~15 kg / 33 lbs',
      topSpeed: '~8 km/h / 5 mph',
      battery: '~2 hrs',
      dof: '~42',
      aiSystem: 'UBTECH Brain',
      useCases: 'Education, Service',
    },
  },
  {
    id: 'figure-02',
    name: 'Figure 02',
    manufacturer: 'Figure AI',
    country: 'USA',
    countryCode: 'US',
    status: 'Limited Deployment',
    price: '~$40,000 (est.)',
    releaseDate: '2025 (Beta)',
    availability: '2025 (Beta)',
    image: '/robots/figure-02.png',
    score: 79,
    specs: {
      height: '~1.67 m / 5\'6"',
      weight: '~70 kg / 154 lbs',
      payload: '~20 kg / 44 lbs',
      topSpeed: '~5 km/h / 3 mph',
      battery: '~5 hrs',
      dof: '~41',
      aiSystem: 'OpenAI + Custom',
      useCases: 'General Purpose',
    },
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    manufacturer: 'Sanctuary AI',
    country: 'Canada',
    countryCode: 'CA',
    status: 'Limited Deployment',
    price: '~$70,000+',
    releaseDate: '2025',
    availability: '2025',
    image: '/robots/phoenix.png',
    score: 78,
    specs: {
      height: '~1.70 m / 5\'7"',
      weight: '~70 kg / 154 lbs',
      payload: '~25 kg / 55 lbs',
      topSpeed: '~5 km/h / 3 mph',
      battery: '~4 hrs',
      dof: '~35',
      aiSystem: 'Sanctuary AI',
      useCases: 'Industrial, Healthcare',
    },
  },
  {
    id: 'atlas',
    name: 'Atlas',
    manufacturer: 'Boston Dynamics',
    country: 'USA',
    countryCode: 'US',
    status: 'Research / Prototype',
    price: 'N/A',
    releaseDate: 'Research Only',
    availability: 'Research Only',
    image: '/robots/atlas.png',
    score: 76,
    specs: {
      height: '~1.50 m / 4\'11"',
      weight: '~89 kg / 196 lbs',
      payload: '~11 kg / 35 lbs',
      topSpeed: '~6 km/h / 3.7 mph',
      battery: '~1 hr',
      dof: '~28',
      aiSystem: 'Boston Dynamics AI',
      useCases: 'Research, Industrial',
    },
  },
  {
    id: 'digit',
    name: 'Digit',
    manufacturer: 'Agility Robotics',
    country: 'USA',
    countryCode: 'US',
    status: 'Limited Deployment',
    price: '$250,000+',
    releaseDate: '2025 (Beta)',
    availability: '2025 (Beta)',
    image: '/robots/digit.png',
    score: 75,
    specs: {
      height: '~1.75 m / 5\'9"',
      weight: '~64 kg / 141 lbs',
      payload: '~16 kg / 35 lbs',
      topSpeed: '~5 km/h / 3 mph',
      battery: '~4 hrs',
      dof: '~36',
      aiSystem: 'Agility AI',
      useCases: 'Logistics, Industrial',
    },
  },
];

export const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  'Research / Prototype': { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500' },
  'Limited Deployment': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500' },
  'Commercial Use': { bg: 'bg-blue-400/20', text: 'text-blue-300', border: 'border-blue-400' },
  'Mass Production': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500' },
};

export const deploymentData = [
  { label: 'Research / Proto', value: 38, color: '#8A93A6' },
  { label: 'Limited Deployment', value: 27, color: '#2A5CFF' },
  { label: 'Commercial Use', value: 20, color: '#B8C2FF' },
  { label: 'Mass Production', value: 15, color: '#00C27A' },
];

export const usChinaComparison = [
  { category: 'Frontier AI', usa: 61, china: 57 },
  { category: 'AI Chips / Hardware', usa: 75, china: 49 },
  { category: 'Robotics', usa: 48, china: 72 },
  { category: 'Manufacturing Scale', usa: 55, china: 80 },
  { category: 'Government Support', usa: 68, china: 74 },
  { category: 'Talent & Research', usa: 63, china: 67 },
  { category: 'Commercial Deployment', usa: 58, china: 62 },
];

export const marketTrendData = [
  { year: 2022, usa: 2.1, china: 1.8, rest: 1.2 },
  { year: 2023, usa: 3.5, china: 3.2, rest: 2.0 },
  { year: 2024, usa: 6.2, china: 6.8, rest: 3.5 },
  { year: 2025, usa: 10.5, china: 12.4, rest: 5.8 },
  { year: 2026, usa: 16.8, china: 20.2, rest: 9.1 },
  { year: 2027, usa: 24.5, china: 29.8, rest: 13.5 },
  { year: 2028, usa: 33.2, china: 41.5, rest: 18.8 },
  { year: 2029, usa: 42.8, china: 54.2, rest: 25.1 },
  { year: 2030, usa: 52.5, china: 68.0, rest: 33.0 },
];

export const recentDevelopments = [
  { date: 'May 21, 2025', flag: 'US', headline: 'Tesla Optimus Gen 3 unveiled', source: 'official' },
  { date: 'May 13, 2025', flag: 'CN', headline: 'Unitree G1 price drop to $16K', source: 'news' },
  { date: 'May 1, 2025', flag: 'US', headline: 'Figure AI raises $675M Series B', source: 'official' },
  { date: 'Apr 28, 2025', flag: 'CN', headline: 'China unveils new humanoid roadmap', source: 'news' },
  { date: 'Apr 15, 2025', flag: 'US', headline: 'Boston Dynamics Atlas electric update', source: 'official' },
];

export const filterOptions = {
  country: ['All Countries', 'USA', 'China', 'Canada'],
  priceRange: ['All Prices', 'Under $20K', '$20K - $50K', '$50K - $100K', '$100K+'],
  status: ['All Statuses', 'Research / Prototype', 'Limited Deployment', 'Commercial Use', 'Mass Production'],
  useCase: ['All Use Cases', 'General Purpose', 'Industrial', 'Logistics', 'Education', 'Service', 'Healthcare', 'Research'],
};
