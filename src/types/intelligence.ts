export type Provenance = {
  source: string;
  confidence: number;
  lastUpdated: string;
  verified: boolean;
  url: string;
};

export type CapabilityKey =
  | 'walking'
  | 'running'
  | 'dexterity'
  | 'autonomy'
  | 'conversation'
  | 'reasoning'
  | 'vision'
  | 'navigation'
  | 'manipulation'
  | 'strength'
  | 'battery'
  | 'safety'
  | 'sdk'
  | 'repairability'
  | 'commercialReadiness';

export type RobotStatus =
  | 'Research / Prototype'
  | 'Limited Deployment'
  | 'Commercial Use'
  | 'Mass Production';

export type RobotRecord = {
  id: string;
  name: string;
  manufacturer: string;
  country: string;
  countryCode: string;
  controlMode: 'AI-controlled' | 'teleoperated' | 'manual';
  releaseYear: number;
  generation: string;
  status: RobotStatus;
  price: number;
  priceLabel: string;
  priceHistory: { year: number; price: number; note?: string }[];
  availability: string;
  weightKg: number;
  heightM: number;
  payloadKg: number;
  walkingSpeedKph: number;
  runningSpeedKph: number;
  batteryHours: number;
  chargingTimeHours: number;
  operatingTimeHours: number;
  degreesOfFreedom: number;
  hands: number;
  fingerCount: number;
  vision: boolean;
  lidar: boolean;
  forceSensors: boolean;
  imu: boolean;
  microphones: number;
  speakers: number;
  compute: string;
  gpu: string;
  cpu: string;
  operatingSystem: string;
  sdk: string[];
  api: string[];
  rosSupport: boolean;
  foundationModel: string;
  reasoningModel: string;
  voiceModel: string;
  navigation: string;
  objectManipulation: string;
  stairs: string;
  balanceRecovery: string;
  warehouseReady: boolean;
  factoryReady: boolean;
  hospitalReady: boolean;
  homeReady: boolean;
  militaryPotential: number;
  capabilityScores: Record<CapabilityKey, number>;
  image: string;
  gallery: string[];
  videos: string[];
  documents: string[];
  patents: string[];
  news: string[];
  deploymentHistory: string[];
  summary: string;
  sources: Partial<Record<keyof Omit<RobotRecord, 'sources'>, Provenance>>;
};

export type CompanyRecord = {
  id: string;
  name: string;
  country: string;
  founded: number;
  employees: number;
  fundingUsd: number;
  valuationUsd: number;
  investors: string[];
  factoryLocations: string[];
  productionCapacity: number;
  website: string;
  github?: string;
  patents: number;
  robots: string[];
  timeline: { year: number; label: string }[];
  news: string[];
  summary: string;
  sources: Partial<Record<keyof Omit<CompanyRecord, 'sources'>, Provenance>>;
};

export type DeploymentRecord = {
  id: string;
  company: string;
  robot: string;
  location: string;
  country: string;
  industry: string;
  startDate: string;
  status: string;
  tasks: string[];
  numberOfRobots: number;
  latitude: number;
  longitude: number;
  source: string;
  sourceUrl: string;
  confidence: number;
  lastUpdated: string;
  verified: boolean;
};

export type NewsRecord = {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
  robot: string;
  company: string;
  capability: CapabilityKey | 'market' | 'deployment' | 'funding' | 'research' | 'warehouseReady';
  region: string;
};

export type TimelineRecord = {
  id: string;
  date: string;
  title: string;
  category:
    | 'Robot announcement'
    | 'Funding'
    | 'Software update'
    | 'Factory deployment'
    | 'Price reduction'
    | 'Research breakthrough';
  detail: string;
  robot?: string;
  company?: string;
  source: string;
  url: string;
};

export type SciFiReference = {
  title: string;
  description: string;
  scores: Record<
    | 'walking'
    | 'running'
    | 'vision'
    | 'dexterity'
    | 'strength'
    | 'conversation'
    | 'autonomousMissionExecution'
    | 'humanAppearance'
    | 'swarmIntelligence'
    | 'construction'
    | 'selfRepair'
    | 'generalIntelligence'
    | 'learning'
    | 'trustworthiness',
    number
  >;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
  tone?: 'accent' | 'muted' | 'positive' | 'warning';
};
