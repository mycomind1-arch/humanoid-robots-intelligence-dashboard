import {
  capabilityLabels,
  companies,
  deployments,
  formatCurrency,
  news,
  robots,
  sciFiReferences,
  timeline,
} from '@/data/intelligence';
import type { DeploymentRecord, NewsRecord, RobotRecord, TimelineRecord } from '@/types/intelligence';

export type SearchResult =
  | { kind: 'robot'; id: string; title: string; detail: string; score: number }
  | { kind: 'company'; id: string; title: string; detail: string; score: number }
  | { kind: 'deployment'; id: string; title: string; detail: string; score: number }
  | { kind: 'news'; id: string; title: string; detail: string; score: number }
  | { kind: 'timeline'; id: string; title: string; detail: string; score: number };

export type CompareMetricRow = {
  label: string;
  key: string;
  values: Array<{ id: string; name: string; value: string }>;
};

export type AssistantAnswer = {
  question: string;
  answer: string;
  highlights: string[];
};

export function getOverallScore(robot: RobotRecord) {
  const capabilityMean =
    Object.values(robot.capabilityScores).reduce((sum, value) => sum + value, 0) /
    Object.keys(robot.capabilityScores).length;
  const readinessBoost = robot.factoryReady || robot.warehouseReady ? 6 : 0;
  const conversationBoost = robot.capabilityScores.conversation > 60 ? 4 : 0;
  return Math.round(capabilityMean + readinessBoost + conversationBoost);
}

export function getRobotPriceTrend(robot: RobotRecord) {
  return robot.priceHistory.map((entry) => ({
    year: `${entry.year}`,
    price: entry.price,
    note: entry.note,
  }));
}

export function getTopCapabilityImprovements(limit = 5) {
  return [...robots]
    .sort((a, b) => capabilityDelta(b) - capabilityDelta(a))
    .slice(0, limit)
    .map((robot) => ({
      robot,
      delta: capabilityDelta(robot),
    }));
}

export function getNewestRobots(limit = 5) {
  return [...robots].sort((a, b) => b.releaseYear - a.releaseYear).slice(0, limit);
}

export function getMostActiveCompanies(limit = 5) {
  return [...companies]
    .map((company) => ({
      company,
      activity: company.robots.length + company.timeline.length + company.news.length,
    }))
    .sort((a, b) => b.activity - a.activity)
    .slice(0, limit);
}

export function getNewestDeployments(limit = 5) {
  return [...deployments]
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
    .slice(0, limit);
}

export function getTimelineHighlights(limit = 5) {
  return [...timeline].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function getLatestNews(limit = 8) {
  return [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function dedupeNewsStories(items = news) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.robot}-${item.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getCapabilityRadar(robot: RobotRecord) {
  return [
    { label: capabilityLabels.walking, value: robot.capabilityScores.walking },
    { label: capabilityLabels.running, value: robot.capabilityScores.running },
    { label: capabilityLabels.dexterity, value: robot.capabilityScores.dexterity },
    { label: capabilityLabels.autonomy, value: robot.capabilityScores.autonomy },
    { label: capabilityLabels.conversation, value: robot.capabilityScores.conversation },
    { label: capabilityLabels.reasoning, value: robot.capabilityScores.reasoning },
    { label: capabilityLabels.vision, value: robot.capabilityScores.vision },
    { label: capabilityLabels.navigation, value: robot.capabilityScores.navigation },
    { label: capabilityLabels.manipulation, value: robot.capabilityScores.manipulation },
    { label: capabilityLabels.strength, value: robot.capabilityScores.strength },
    { label: capabilityLabels.battery, value: robot.capabilityScores.battery },
    { label: capabilityLabels.safety, value: robot.capabilityScores.safety },
    { label: capabilityLabels.sdk, value: robot.capabilityScores.sdk },
    { label: capabilityLabels.repairability, value: robot.capabilityScores.repairability },
    { label: capabilityLabels.commercialReadiness, value: robot.capabilityScores.commercialReadiness },
  ];
}

export function buildCompareRows(selected: RobotRecord[]): CompareMetricRow[] {
  return [
    {
      label: 'Price',
      key: 'price',
      values: selected.map((robot) => ({ id: robot.id, name: robot.name, value: robot.priceLabel })),
    },
    {
      label: 'Payload',
      key: 'payload',
      values: selected.map((robot) => ({ id: robot.id, name: robot.name, value: `${robot.payloadKg} kg` })),
    },
    {
      label: 'Battery',
      key: 'battery',
      values: selected.map((robot) => ({ id: robot.id, name: robot.name, value: `${robot.batteryHours} h` })),
    },
    {
      label: 'Speed',
      key: 'speed',
      values: selected.map((robot) => ({ id: robot.id, name: robot.name, value: `${robot.walkingSpeedKph} km/h` })),
    },
    {
      label: 'DOF',
      key: 'dof',
      values: selected.map((robot) => ({ id: robot.id, name: robot.name, value: `${robot.degreesOfFreedom}` })),
    },
    {
      label: 'Hands',
      key: 'hands',
      values: selected.map((robot) => ({ id: robot.id, name: robot.name, value: `${robot.hands}` })),
    },
    {
      label: 'Sensors',
      key: 'sensors',
      values: selected.map((robot) => ({
        id: robot.id,
        name: robot.name,
        value: `${[
          robot.vision ? 'vision' : null,
          robot.lidar ? 'lidar' : null,
          robot.forceSensors ? 'force' : null,
          robot.imu ? 'imu' : null,
        ]
          .filter(Boolean)
          .join(', ')}`,
      })),
    },
    {
      label: 'AI',
      key: 'ai',
      values: selected.map((robot) => ({
        id: robot.id,
        name: robot.name,
        value: robot.foundationModel,
      })),
    },
    {
      label: 'SDK',
      key: 'sdk',
      values: selected.map((robot) => ({ id: robot.id, name: robot.name, value: robot.sdk.join(', ') })),
    },
    {
      label: 'Deployment',
      key: 'deployment',
      values: selected.map((robot) => ({
        id: robot.id,
        name: robot.name,
        value: [robot.warehouseReady ? 'warehouse' : null, robot.factoryReady ? 'factory' : null, robot.homeReady ? 'home' : null]
          .filter(Boolean)
          .join(', '),
      })),
    },
    {
      label: 'Overall Score',
      key: 'overall',
      values: selected.map((robot) => ({ id: robot.id, name: robot.name, value: `${getOverallScore(robot)}` })),
    },
  ];
}

export function getSciFiRows() {
  return sciFiReferences.map((reference) => ({
    title: reference.title,
    description: reference.description,
    similarity: Math.round(
      Object.values(reference.scores).reduce((sum, value) => sum + value, 0) /
        Object.values(reference.scores).length
    ),
    scores: reference.scores,
  }));
}

export function searchIntelligence(query: string): SearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [
      ...robots.slice(0, 4).map((robot) => robotResult(robot, 100)),
      ...news.slice(0, 2).map((item) => newsResult(item.title, item.summary, 90, item.id)),
    ];
  }

  const filters = buildSearchFilters(normalized);
  const candidates: SearchResult[] = [
    ...robots.flatMap((robot) => (robotMatches(robot, filters) ? [robotResult(robot, relevanceScore(normalized, robot))] : [])),
    ...companies.flatMap((company) =>
      companyMatches(company, filters) ? [companyResult(company.name, company.summary, relevanceScore(normalized, company), company.id)] : []
    ),
    ...deployments.flatMap((deployment) =>
      deploymentMatches(deployment, filters)
        ? [deploymentResult(deployment, relevanceScore(normalized, deployment))]
        : []
    ),
    ...dedupeNewsStories().flatMap((item) =>
      newsMatches(item, filters) ? [newsResult(item.title, item.summary, relevanceScore(normalized, item), item.id)] : []
    ),
    ...timeline.flatMap((item) =>
      timelineMatches(item, filters) ? [timelineResult(item.title, item.detail, relevanceScore(normalized, item), item.id)] : []
    ),
  ];

  return candidates.sort((a, b) => b.score - a.score).slice(0, 20);
}

export function buildAssistantAnswer(question: string): AssistantAnswer {
  const q = question.trim().toLowerCase();

  if (q.includes('compare figure') && q.includes('optimus')) {
    const figure = robots.find((robot) => robot.id === 'figure-02');
    const optimus = robots.find((robot) => robot.id === 'optimus-gen3');
    return {
      question,
      answer:
        'Figure 02 leads on dexterity, conversation, and battery endurance. Optimus Gen 3 is stronger on production posture and cost pressure. The better near-term choice depends on whether you need manipulation depth or vertical integration.',
      highlights: [
        `${figure?.name ?? 'Figure 02'}: ${figure?.capabilityScores.dexterity ?? 0} dexterity score`,
        `${optimus?.name ?? 'Optimus Gen 3'}: ${optimus?.capabilityScores.commercialReadiness ?? 0} commercial readiness score`,
        'Use the compare page to inspect price, payload, battery, and deployment fit side by side.',
      ],
    };
  }

  if (q.includes('cheapest')) {
    const cheapest = [...robots]
      .filter((robot) => robot.price > 0)
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);
    return {
      question,
      answer: `The cheapest priced robot in the local dataset is ${cheapest[0]?.name ?? 'not available'} at ${formatCurrency(
        cheapest[0]?.price ?? 0
      )}.`,
      highlights: cheapest.map((robot) => `${robot.name}: ${robot.priceLabel}`),
    };
  }

  if (q.includes('dexterity')) {
    const top = [...robots].sort((a, b) => b.capabilityScores.dexterity - a.capabilityScores.dexterity)[0];
    return {
      question,
      answer: `${top?.name ?? 'The current leader'} currently has the strongest dexterity profile in this local dataset.`,
      highlights: [
        `${top?.name ?? 'Robot'}: ${top?.capabilityScores.dexterity ?? 0} dexterity score`,
        'Fine manipulation and hand geometry remain the hardest commercial gap.',
      ],
    };
  }

  if (q.includes('this month')) {
    const items = [...timeline].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
    return {
      question,
      answer: 'The biggest recent changes are the latest deployments, price reductions, and software updates in the local snapshot.',
      highlights: items.map((item) => `${item.date}: ${item.title}`),
    };
  }

  if (q.includes('hiring')) {
    return {
      question,
      answer: 'The local dataset does not yet track hiring feeds. Add a careers ingestion source to surface open roles automatically.',
      highlights: ['Suggested future source: company careers pages', 'Suggested future source: LinkedIn role feed'],
    };
  }

  if (q.includes('warehouse')) {
    const robotsReady = robots.filter((robot) => robot.warehouseReady);
    return {
      question,
      answer: `Several robots are already suitable for warehouse work, led by ${robotsReady
        .slice(0, 3)
        .map((robot) => robot.name)
        .join(', ')}.`,
      highlights: robotsReady.slice(0, 4).map((robot) => `${robot.name}: ${robot.capabilityScores.manipulation} manipulation score`),
    };
  }

  return {
    question,
    answer:
      'This panel is powered by local data now and is structured for later LLM routing. It can answer comparisons, cheap robots, dexterity leaders, deployments, and warehouse-fit questions.',
    highlights: ['Use examples like "Compare Figure and Optimus"', 'Use examples like "Show the cheapest robots"'],
  };
}

function buildSearchFilters(query: string) {
  const underMatch = query.match(/under\s*\$?(\d+[,\d]*)/);
  const overMatch = query.match(/over\s*\$?(\d+[,\d]*)/);
  const dofMatch = query.match(/(?:over|more than)\s*(\d+)\s*dof/);
  const fingersMatch = query.match(/five finger|5 finger/);
  const hasVision = query.includes('vision');
  const hasForce = query.includes('force sensor') || query.includes('force sensors');
  const hasRos = query.includes('ros');
  const hasFactory = query.includes('factory');
  const hasWarehouse = query.includes('warehouse');
  const isChinese = query.includes('chinese');
  const isAmerican = query.includes('american') || query.includes('usa') || query.includes('us ');

  return {
    underPrice: underMatch ? Number(underMatch[1].replace(/,/g, '')) : null,
    overPrice: overMatch ? Number(overMatch[1].replace(/,/g, '')) : null,
    overDof: dofMatch ? Number(dofMatch[1]) : null,
    fiveFingerHands: Boolean(fingersMatch),
    hasVision,
    hasForce,
    hasRos,
    hasFactory,
    hasWarehouse,
    isChinese,
    isAmerican,
  };
}

function robotMatches(robot: RobotRecord, filters: ReturnType<typeof buildSearchFilters>) {
  if (filters.underPrice !== null && robot.price > filters.underPrice) return false;
  if (filters.overPrice !== null && robot.price > 0 && robot.price < filters.overPrice) return false;
  if (filters.overDof !== null && robot.degreesOfFreedom <= filters.overDof) return false;
  if (filters.fiveFingerHands && robot.fingerCount < 10) return false;
  if (filters.hasVision && !robot.vision) return false;
  if (filters.hasForce && !robot.forceSensors) return false;
  if (filters.hasRos && !robot.rosSupport) return false;
  if (filters.hasFactory && !robot.factoryReady) return false;
  if (filters.hasWarehouse && !robot.warehouseReady) return false;
  if (filters.isChinese && robot.country !== 'China') return false;
  if (filters.isAmerican && robot.country !== 'USA') return false;
  return true;
}

function companyMatches(company: (typeof companies)[number], filters: ReturnType<typeof buildSearchFilters>) {
  if (filters.isChinese && company.country !== 'China') return false;
  if (filters.isAmerican && company.country !== 'USA') return false;
  return true;
}

function deploymentMatches(deployment: DeploymentRecord, filters: ReturnType<typeof buildSearchFilters>) {
  if (filters.isChinese && deployment.country !== 'China') return false;
  if (filters.isAmerican && deployment.country !== 'USA') return false;
  if (filters.hasFactory && (deployment.industry.toLowerCase().includes('factory') || deployment.industry.toLowerCase().includes('manufacturing') || deployment.industry.toLowerCase().includes('assembly'))) return true;
  if (filters.hasWarehouse && (deployment.industry.toLowerCase().includes('warehouse') || deployment.industry.toLowerCase().includes('logistics'))) return true;
  return !(filters.hasFactory || filters.hasWarehouse);
}

function newsMatches(item: NewsRecord, filters: ReturnType<typeof buildSearchFilters>) {
  if (filters.isChinese && item.region !== 'China') return false;
  if (filters.isAmerican && item.region !== 'USA') return false;
  return true;
}

function timelineMatches(item: TimelineRecord, filters: ReturnType<typeof buildSearchFilters>) {
  if (filters.isChinese && item.company && !item.company.toLowerCase().includes('ubtech') && !item.company.toLowerCase().includes('unitree') && !item.company.toLowerCase().includes('fourier')) {
    return false;
  }
  if (filters.isAmerican && item.company && !item.company.toLowerCase().includes('tesla') && !item.company.toLowerCase().includes('figure') && !item.company.toLowerCase().includes('agility') && !item.company.toLowerCase().includes('apptronik')) {
    return false;
  }
  return true;
}

function relevanceScore(query: string, item: RobotRecord | (typeof companies)[number] | DeploymentRecord | NewsRecord | TimelineRecord) {
  const haystack = JSON.stringify(item).toLowerCase();
  const tokens = query.split(/\s+/).filter(Boolean);
  return tokens.reduce((score, token) => score + (haystack.includes(token) ? 8 : 0), 40);
}

function capabilityDelta(robot: RobotRecord) {
  return Math.round(
    robot.capabilityScores.dexterity +
      robot.capabilityScores.autonomy +
      robot.capabilityScores.reasoning +
      robot.capabilityScores.vision -
      robot.capabilityScores.repairability
  );
}

function robotResult(robot: RobotRecord, score: number): SearchResult {
  return {
    kind: 'robot',
    id: robot.id,
    title: robot.name,
    detail: `${robot.manufacturer} · ${robot.country} · ${robot.priceLabel}`,
    score,
  };
}

function companyResult(title: string, detail: string, score: number, id: string): SearchResult {
  return { kind: 'company', id, title, detail, score };
}

function deploymentResult(deployment: DeploymentRecord, score: number): SearchResult {
  return {
    kind: 'deployment',
    id: deployment.id,
    title: `${deployment.robot} · ${deployment.location}`,
    detail: `${deployment.industry} · ${deployment.status}`,
    score,
  };
}

function newsResult(title: string, detail: string, score: number, id: string): SearchResult {
  return { kind: 'news', id, title, detail, score };
}

function timelineResult(title: string, detail: string, score: number, id: string): SearchResult {
  return { kind: 'timeline', id, title, detail, score };
}
