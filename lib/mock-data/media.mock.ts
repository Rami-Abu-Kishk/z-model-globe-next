import type { GlobeTarget } from '../types';

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  time: string;
  category: 'Breaking' | 'Local' | 'Regional' | 'Global';
  sentiment: 'positive' | 'negative' | 'neutral';
  summary?: string;
  url?: string;
  target?: GlobeTarget;
  countries?: string[];
  imageUrl?: string;
  links?: { label: string; url: string }[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  format: 'PDF' | 'DOCX';
  size: string;
}

export interface MediaMetric {
  label: string;
  value: string;
  trend: 'up' | 'down';
  change: string;
}

export const mediaMetrics: MediaMetric[] = [
  { label: 'Global Media Sentiment', value: '78.4', trend: 'up', change: '+2.1%' },
  { label: 'Trending Velocity', value: 'High', trend: 'up', change: '+15.2%' },
  { label: 'Sovereign Reach Ind.', value: '92/100', trend: 'down', change: '-0.5%' },
];

export const breakingNews: NewsItem[] = [
  {
    id: "B1",
    headline: "G42 and Microsoft Announce $5B Joint Cloud Initiative",
    source: "Financial Times",
    time: "2m ago",
    category: "Breaking",
    sentiment: "positive",
    summary: "A massive expansion of the sovereign cloud infrastructure across the MENA region, focusing on Al safety and data residency.",
    countries: ["AE", "US"],
    target: { lat: 25.0, lng: 55.0, zoomLevel: 2.0 },
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
    links: [
      { label: "Official Press Release", url: "#" },
      { label: "Technical whitepaper", url: "#" }
    ]
  },
  {
    id: "B2",
    headline: "Supply Chain Bottlenecks in Red Sea Reaching Critical Levels",
    source: "Reuters",
    time: "15m ago",
    category: "Breaking",
    sentiment: "negative",
    summary: "Maritime insurance premiums spike as alternative routes add 10 days to standard delivery times for European imports.",
    countries: ["YE", "EG", "SA"],
    target: { lat: 15.0, lng: 42.0, zoomLevel: 1.8 },
    imageUrl: "/assets/images/mock/red_sea_logistics.png",
    links: [
      { label: "Maritime Logistics Report", url: "#" },
      { label: "Trade Impact Analysis", url: "#" }
    ]
  },
  {
    id: "B3",
    headline: "Central Banks Signal Potential Rate Cut in Q3 2026",
    source: "Bloomberg",
    time: "45m ago",
    category: "Breaking",
    sentiment: "positive",
    summary: "Inflation cooling faster than anticipated triggers major market rally across Asian and GCC indices.",
    countries: ["US", "EU", "AE", "SA"],
    target: { lat: 30.0, lng: 20.0, zoomLevel: 2.5 },
    imageUrl: "/assets/images/mock/financial_rates.png"
  }
];

export const trendingNews: NewsItem[] = [
  {
    id: "T1",
    headline: "The Rise of 'Sovereign AI' in Emerging Economies",
    source: "TechCrunch",
    time: "1h ago",
    category: "Global",
    sentiment: "positive",
    summary: "Nations are increasingly building local GPU clusters to ensure digital sovereignty and protection against global API reliance.",
    countries: ["AE", "IN", "SG", "KR"],
    target: { lat: 20.0, lng: 70.0, zoomLevel: 2.5 },
    imageUrl: "/assets/images/mock/sovereign_ai_brain.png"
  },
  {
    id: "T2",
    headline: "Semi-conductor Self-Sufficiency: India's New Roadmap",
    source: "Nikkei Asia",
    time: "3h ago",
    category: "Global",
    sentiment: "positive",
    summary: "A $10B subsidy package announced for 2nm fabrication plant in Gujarat, aiming for production by 2028.",
    countries: ["IN"],
    target: { lat: 22.0, lng: 72.0, zoomLevel: 1.5 },
    imageUrl: "/assets/images/mock/semiconductor_fab.png"
  },
  {
    id: "T3",
    headline: "Global Energy Transition: Nuclear Small Modular Reactors",
    source: "WSJ",
    time: "5h ago",
    category: "Global",
    sentiment: "positive",
    summary: "SMR technology gains traction as a viable 'always-on' alternative to bridge renewable intermittency in heavy industrial zones.",
    countries: ["US", "FR", "AE", "CN"],
    target: { lat: 40.0, lng: -40.0, zoomLevel: 2.8 },
    imageUrl: "http://googleusercontent.com/image_collection/image_retrieval/576214024933720820_0"
  }
];

export const localRegionalNews: NewsItem[] = [
  {
    id: "LR1",
    headline: "Abu Dhabi Global Market (ADGM) Reports 35% Rise in Asset Management",
    source: "Abu Dhabi Media",
    time: "2h ago",
    category: "Local",
    sentiment: "positive",
    countries: ["AE"],
    target: { lat: 24.4539, lng: 54.3773, zoomLevel: 1.2 },
    imageUrl: "https://images.unsplash.com/photo-1549413247-4979e2f89c49?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "LR2",
    headline: "NEOM Green Hydrogen Project Secures Final Investment Decision",
    source: "Arab News",
    time: "4h ago",
    category: "Regional",
    sentiment: "positive",
    countries: ["SA"],
    target: { lat: 28.5, lng: 35.0, zoomLevel: 1.2 },
    imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c295944b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "LR3",
    headline: "Oman and UAE Rail Project: Final Station Designs Unveiled",
    source: "The National",
    time: "8h ago",
    category: "Regional",
    sentiment: "positive",
    countries: ["AE", "OM"],
    target: { lat: 24.0, lng: 56.0, zoomLevel: 1.5 },
    imageUrl: "http://googleusercontent.com/image_collection/image_retrieval/3985455145555052574_0"
  },
  {
    id: "LR4",
    headline: "Qatar Investment Authority to Expand Portfolio in Green Energy",
    source: "Al Jazeera",
    time: "12h ago",
    category: "Regional",
    sentiment: "neutral",
    countries: ["QA"],
    target: { lat: 25.2769, lng: 51.5200, zoomLevel: 1.2 },
    imageUrl: "/assets/images/mock/qatar_green_energy.png"
  }
];

export const researchPapers: ResearchPaper[] = [
  { id: "P1", title: "The Impact of Al on GCC Sovereign Wealth Management", author: "Z-Research Group", date: "Apr 2026", category: "Finance", format: "PDF", size: "2.4 MB" },
  { id: "P2", title: "Hydrogen Export Corridors: UAE to Europe Strategy", author: "Energy Board", date: "Mar 2026", category: "Energy", format: "PDF", size: "4.1 MB" },
  { id: "P3", title: "Demographic Shifts and Urbanization in MENA 2030", author: "Strategic Studies", date: "Feb 2026", category: "Sociology", format: "PDF", size: "1.8 MB" },
  { id: "P4", title: "Semi-conductor Sovereignty: Building Local Foundries", author: "Tech Council", date: "Jan 2026", category: "Technology", format: "DOCX", size: "5.2 MB" },
];

export interface MediaData {
  metrics: MediaMetric[];
  breaking: NewsItem[];
  trending: NewsItem[];
  regional: NewsItem[];
}

export const mediaDataStore: Record<string, MediaData> = {
  GLOBAL: {
    metrics: mediaMetrics,
    breaking: breakingNews,
    trending: trendingNews,
    regional: localRegionalNews
  },
  JO: {
    metrics: [
      { label: "Regional Sentiment", value: "82.1", trend: "up", change: "+1.5%" },
      { label: "Tourism Reach", value: "High", trend: "up", change: "+22.4%" }
    ],
    breaking: [
      {
        id: "B-JO-1",
        headline: "National Desalination Project Reaches Milestones",
        source: "Amman News",
        time: "1h ago",
        category: "Breaking",
        sentiment: "positive",
        summary: "Major infrastructure projects in Jordan securing long-term regional stability.",
        countries: ["JO"],
        target: { lat: 31.9, lng: 35.9, zoomLevel: 1.5 },
        imageUrl: "/assets/images/mock/jordan_desalination.png"
      }
    ],
    trending: [],
    regional: [
      {
        id: "R-JO-1",
        headline: "Amman Design Week Showcases Levant Talent",
        source: "Z-Media",
        time: "4h ago",
        category: "Regional",
        sentiment: "positive",
        countries: ["JO", "LB", "SY"],
        imageUrl: "/assets/images/mock/levant_design.png"
      }
    ]
  },
  IN: {
    metrics: [
      { label: "Tech Sentiment", value: "94.2", trend: "up", change: "+5.1%" },
      { label: "Startup Velocity", value: "Very High", trend: "up", change: "+12.1%" }
    ],
    breaking: [
      {
        id: "B-IN-1",
        headline: "Global Tech Hubs Focus on Bangalore Expansion",
        source: "ET Tech",
        time: "30m ago",
        category: "Breaking",
        sentiment: "positive",
        summary: "Nations are increasingly building local GPU clusters to ensure digital sovereignty.",
        countries: ["IN"],
        target: { lat: 12.97, lng: 77.59, zoomLevel: 1.8 },
        imageUrl: "/assets/images/mock/india_tech_hub.png"
      }
    ],
    trending: [
      {
        id: "T-IN-1",
        headline: "UPI Goes Global with New France-India Deal",
        source: "NDTV",
        time: "2h ago",
        category: "Global",
        sentiment: "positive",
        countries: ["IN", "FR"],
        imageUrl: "/assets/images/mock/india_upi.png"
      }
    ],
    regional: []
  }
};

