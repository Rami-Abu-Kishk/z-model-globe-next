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
  aiInsights?: Record<string, string | React.ReactNode>;
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
    ],
    aiInsights: {
      summary: "G42 and Microsoft have entered a strategic $5 billion partnership to build sovereign cloud infrastructure in the UAE. This initiative aims to enhance AI safety, secure data residency, and accelerate digital transformation across the Middle East, Africa, and Central Asia.",
      statistics: "• Total Investment: $5 Billion\n• Target Reach: 15+ Countries\n• Infrastructure: 3 new Azure Regions\n• Projected GDP Impact: +1.2% by 2030\n• AI Research Fund: $1 Billion earmarked for localized LLMs.",
      background: "The partnership builds upon a multi-year collaboration between the two entities. G42, based in Abu Dhabi, has been a key player in the UAE's digital strategy, while Microsoft has been expanding its cloud footprint in the GCC since 2019. This deal marks the largest tech collaboration in regional history.",
      traceback: "2019: Microsoft opens first UAE data centers.\n2022: G42 partners with Microsoft for health-tech AI.\n2023: UAE announces National AI Strategy 2031.\n2024 (Q1): Preliminary MOU signed.\n2026 (Present): Full $5B implementation phase launched.",
      comparison: "Unlike the Amazon/AWAK venture (focused on West Africa), the G42-Microsoft deal prioritizes Sovereign Data Residency. ByteDance's regional cloud expansion (2025) focused primarily on consumer data, whereas this initiative targets government and enterprise-grade infrastructure.",
      analysis: "This deal is a strategic move to decouple regional AI dependencies from standard global public clouds. By ensuring high-security sovereign layers, the UAE positions itself as a global 'Neutral Zone' for data, attracting both Western and Eastern tech players under a unified security protocol.",
      prediction: "Expect a massive surge in local tech startups leveraging high-speed Azure-G42 backbones. Within 24 months, the UAE's AI sector is predicted to represent 14% of non-oil GDP. Possible formation of a regional 'AI OPEC' by 2028 consisting of GCC digital leaders.",
      'cross-referencing': "Patterns match Saudi Arabia's 'Project Prosperity' (2025). Both focus on compute-power localization. Cross-referencing with global 2030 sustainability goals shows a 45% efficiency gain in energy-grid management via these new cloud nodes.",
      recommendation: "Strategic Action: Investors should pivot toward UAE-based cybersecurity and data center cooling specialists. Institutional portfolios should increase weighting in regional tech infrastructure by 8-12% over the next fiscal cycle."
    }
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
  },
  {
    id: "B4",
    headline: "UAE Unveils Autonomous Defense Blueprint for 2030",
    source: "Defense News",
    time: "1h ago",
    category: "Breaking",
    sentiment: "positive",
    summary: "Abu Dhabi showcases a comprehensive edge-computing autonomous drone network to secure maritime trade routes.",
    countries: ["AE"],
    target: { lat: 24.5, lng: 54.4, zoomLevel: 3.0 },
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "B5",
    headline: "Saudi PIF Launches $50B Advanced Materials Fund",
    source: "Bloomberg",
    time: "2h ago",
    category: "Breaking",
    sentiment: "positive",
    summary: "New sovereign wealth initiative targeting the localization of aerospace and EV component manufacturing in the Kingdom.",
    countries: ["SA"],
    target: { lat: 24.7, lng: 46.7, zoomLevel: 2.5 },
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    aiInsights: {
      summary: "Saudi PIF has announced a staggering $50 billion fund exclusively focused on advanced materials, particularly aerospace alloys and EV battery components.",
      statistics: "• Fund Size: $50 Billion\n• Target Localization: 60% by 2030\n• Expected Hub: Jubail Industrial City",
      prediction: "This move is expected to attract tier-1 automotive and aerospace OEMs to establish manufacturing bases in Saudi Arabia, significantly accelerating the non-oil diversification.",
      recommendation: "Explore industrial real estate and local supply chain logistics opportunities near Jubail and NEOM."
    }
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
  },
  {
    id: "T4",
    headline: "KSA's NEOM Partners with Volocopter for eVTOL Network",
    source: "TechRadar",
    time: "7h ago",
    category: "Global",
    sentiment: "positive",
    summary: "Urban air mobility takes a quantum leap as full-scale commercial testing begins in the Gulf.",
    countries: ["SA", "DE"],
    target: { lat: 28.0, lng: 35.0, zoomLevel: 2.5 },
    imageUrl: "https://images.unsplash.com/photo-1541857754-ae0411ed0262?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "T5",
    headline: "Dubai Financial Market: AI-Driven Algorithmic Trading Reaches 60%",
    source: "Gulf News",
    time: "9h ago",
    category: "Global",
    sentiment: "neutral",
    summary: "Institutional adoption of AI trading bots on the DFM highlights rapid digital transformation in regional finance.",
    countries: ["AE"],
    target: { lat: 25.2, lng: 55.3, zoomLevel: 2.5 },
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000"
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
  },
  {
    id: "LR5",
    headline: "UAE Central Bank Unveils Digital Dirham Implementation Strategy",
    source: "The National",
    time: "14h ago",
    category: "Local",
    sentiment: "positive",
    countries: ["AE"],
    target: { lat: 24.4, lng: 54.4, zoomLevel: 2.0 },
    imageUrl: "https://images.unsplash.com/photo-1621501103258-3e0b7880b91e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "LR6",
    headline: "Riyadh Season Generates Record $3B in Regional Tourism Revenue",
    source: "Arab News",
    time: "18h ago",
    category: "Regional",
    sentiment: "positive",
    countries: ["SA"],
    target: { lat: 24.71, lng: 46.67, zoomLevel: 2.0 },
    imageUrl: "https://images.unsplash.com/photo-1614729188057-a36746817743?auto=format&fit=crop&q=80&w=1000"
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
  },
  AE: {
    metrics: [
      { label: "Sovereign AI Index", value: "95.5", trend: "up", change: "+4.2%" },
      { label: "FDI Inflow Velocity", value: "High", trend: "up", change: "+18.4%" },
      { label: "Regional Stability Index", value: "AAA", trend: "up", change: "+0.2%" }
    ],
    breaking: [
      {
        id: "B-AE-1",
        headline: "UAE Launches Next-Gen Sovereign AI 'Falcon 3.0'",
        source: "WAM",
        time: "10m ago",
        category: "Breaking",
        sentiment: "positive",
        summary: "Technology Innovation Institute releases open-source LLM rivaling top global models, reinforcing UAE's position as an AI powerhouse.",
        countries: ["AE"],
        target: { lat: 24.4539, lng: 54.3773, zoomLevel: 2.5 },
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
        aiInsights: {
          summary: "The Technology Innovation Institute (TII) has officially released Falcon 3.0, the latest iteration of its flagship open-source LLM.",
          statistics: "• Parameters: 250 Billion\n• Training Compute: 80M GPU Hours\n• Evaluation Score: 89.4 (MMLU)",
          prediction: "This release solidifies the UAE as a tier-1 global AI developer, likely attracting further foreign direct investment into Abu Dhabi's tech ecosystem.",
          recommendation: "Increase allocation in UAE-based sovereign tech entities. Monitor adoption rates across EMEA enterprise sectors."
        }
      },
      ...breakingNews.filter(n => n.countries?.includes('AE'))
    ],
    trending: [
      {
        id: "T-AE-1",
        headline: "Abu Dhabi Sovereign Wealth Funds Forge $10B Clean Energy Alliance",
        source: "Bloomberg",
        time: "2h ago",
        category: "Global",
        sentiment: "positive",
        summary: "Mubadala and ADQ pool resources to accelerate global investments in green hydrogen and next-gen solar technologies.",
        countries: ["AE"],
        target: { lat: 24.4539, lng: 54.3773, zoomLevel: 2.0 },
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1000"
      },
      ...trendingNews.filter(n => n.countries?.includes('AE'))
    ],
    regional: [
      {
        id: "R-AE-1",
        headline: "Dubai Financial Market Witnesses Record IPO Over-subscription",
        source: "Khaleej Times",
        time: "5h ago",
        category: "Local",
        sentiment: "positive",
        countries: ["AE"],
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
      },
      ...localRegionalNews.filter(n => n.countries?.includes('AE'))
    ]
  },
  SA: {
    metrics: [
      { label: "Vision 2030 Index", value: "88.2", trend: "up", change: "+3.8%" },
      { label: "Non-Oil Growth", value: "Accelerating", trend: "up", change: "+11.5%" },
      { label: "Entertainment & Tech FDI", value: "$4.2B", trend: "up", change: "+24.1%" }
    ],
    breaking: [
      {
        id: "B-SA-1",
        headline: "PIF Announces Mega-Hub for Esports and AI Gaming in Riyadh",
        source: "Arab News",
        time: "15m ago",
        category: "Breaking",
        sentiment: "positive",
        summary: "A $38 billion commitment to transform Riyadh into the global capital for competitive gaming and AI-driven entertainment.",
        countries: ["SA"],
        target: { lat: 24.7136, lng: 46.6753, zoomLevel: 2.2 },
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000",
        aiInsights: {
          summary: "Saudi Arabia's Public Investment Fund (PIF) has launched a massive initiative to build an unprecedented Esports and AI gaming ecosystem in Riyadh.",
          statistics: "• Total Commitment: $38 Billion\n• Projected Job Creation: 39,000\n• Target GDP Contribution: +1% by 2030",
          prediction: "Riyadh is poised to disrupt the global gaming industry, challenging traditional hubs in East Asia and North America. Expected influx of major game publisher HQs.",
          recommendation: "Analyze strategic partnerships with global game studios. Consider investment in specialized hardware providers and event management firms in the region."
        }
      },
      ...breakingNews.filter(n => n.countries?.includes('SA'))
    ],
    trending: [
      {
        id: "T-SA-1",
        headline: "NEOM Commences Construction on Advanced Cognitive City AI Core",
        source: "Reuters",
        time: "3h ago",
        category: "Global",
        sentiment: "positive",
        summary: "The foundational infrastructure for THE LINE's pervasive AI cognitive system begins deployment.",
        countries: ["SA"],
        target: { lat: 28.0, lng: 35.0, zoomLevel: 2.0 },
        imageUrl: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&q=80&w=1000"
      },
      ...trendingNews.filter(n => n.countries?.includes('SA'))
    ],
    regional: [
      {
        id: "R-SA-1",
        headline: "Aramco Ventures Triples Capital for Climate Tech Innovations",
        source: "Financial Times",
        time: "6h ago",
        category: "Local",
        sentiment: "positive",
        countries: ["SA"],
        imageUrl: "https://images.unsplash.com/photo-1582214349138-0322c366ffce?auto=format&fit=crop&q=80&w=1000"
      },
      ...localRegionalNews.filter(n => n.countries?.includes('SA'))
    ]
  }
};

