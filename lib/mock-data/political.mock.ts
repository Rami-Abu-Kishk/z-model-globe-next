export interface Representative {
  name: string;
  title: string;
  org: string;
  avatar?: string;
}

export interface PoliticalCase {
  id: string;
  name: string;
  region: string;
  severity: 'Critical' | 'Warning' | 'Stable';
  coordinates: [number, number]; // [lng, lat]
  description: string;
  involvedParties: string[];
  isoCodes?: string[];
  files?: { name: string; size: string }[];
  summary?: string;
  imageUrl?: string;
}

export interface RegionalCrisis {
  id: string;
  region: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  alert: boolean;
  details: string;
  uaeImpact: number; // 0-100 score
  coordinates: [number, number]; // [lat, lng] for ringing
  summary?: string;
  imageUrl?: string;
}

export interface PoliticalNews {
  id: string;
  headline: string;
  time: string;
  category: 'Strategic' | 'Diplomatic' | 'Security';
  summary: string;
  source: string;
}

export interface PoliticalKpi {
  label: string;
  value: string;
  trend: 'up' | 'down';
  representative?: Representative;
  insightData?: {
    org: string;
    unit?: string;
    historicalData: number[];
    forecastData: number[];
    labels: {
      historical: string[];
      forecast: string[];
    };
    analysis: {
      historical: string;
      forecast: string;
    };
    stats: {
      historical: { confidence: string; delta: string };
      forecast: { confidence: string; delta: string };
    };
  };
}

export const politicalCases: PoliticalCase[] = [
  {
    id: "C1",
    name: "Red Sea Maritime Security",
    region: "MENA / Global",
    severity: "Critical",
    coordinates: [42.5, 15.5],
    description: "Protection of critical trade lanes against non-state actor interference. Impacting 12% of global trade volume.",
    involvedParties: ["UN Security Council", "IMO", "Combined Maritime Forces"],
    isoCodes: ["YE", "SA", "EG", "DJ", "ER", "JO"],
    files: [
      { name: "Maritime_Security_Audit_2024.pdf", size: "2.4 MB" },
      { name: "Trade_Route_Impact_Analysis.docx", size: "1.1 MB" }
    ],
    summary: "The escalation of maritime security threats in the Red Sea has necessitated a multi-national naval response to safeguard global supply chains. Insurance premiums for commercial transit have spiked by 300% since Q4.",
    imageUrl: "https://images.unsplash.com/photo-1590644365607-1c5a519a9a37?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "C2",
    name: "G7 Digital Governance Accord",
    region: "Europe / N. America",
    severity: "Stable",
    coordinates: [2.3522, 48.8566],
    description: "Harmonization of AI safety standards and cross-border data flow regulations between G7 nations.",
    involvedParties: ["OECD", "G7 Secretariat", "Tech Council"],
    isoCodes: ["US", "GB", "FR", "DE", "IT", "CA", "JP"],
    files: [
      { name: "AI_Safety_Framework.pdf", size: "4.8 MB" }
    ]
  },
  {
    id: "C3",
    name: "Arctic Sovereignty Demarcation",
    region: "Arctic Circle",
    severity: "Warning",
    coordinates: [18.0686, 75.0],
    description: "Contested claims over seabed resources and new northern shipping lanes due to glacial retreat.",
    involvedParties: ["Arctic Council", "UNCLOS Commissioners"],
    isoCodes: ["CA", "RU", "US", "NO", "DK"],
    files: [
      { name: "Seabed_Claim_Map_V4.jpg", size: "12.5 MB" }
    ]
  },
  {
    id: "C4",
    name: "Brics+ Energy Coalition",
    region: "Global South",
    severity: "Stable",
    coordinates: [45.0, 24.0],
    description: "Strategic coordination of energy export quotas and de-dollarization of hydro-carbon trade.",
    involvedParties: ["BRICS Task Force", "NDB"],
    isoCodes: ["BR", "RU", "IN", "CN", "ZA", "AE", "SA", "EG", "ET", "IR"]
  }
];

export const regionalCrises: RegionalCrisis[] = [
  { 
    id: "RC1",
    region: "Levant Corridor", 
    status: "Active Conflict Management", 
    priority: "High", 
    alert: true, 
    details: "Ongoing humanitarian logistics and regional spillover mediation.", 
    uaeImpact: 85,
    coordinates: [31.0461, 34.8516],
    summary: "Diplomatic efforts are intensifying as the Levant region faces unprecedented humanitarian challenges. Strategic mediation focuses on de-escalation of border tensions while ensuring aid corridors remain operational for affected civilian populations. Operational stability in the corridor is critical for wider regional security architecture.",
    imageUrl: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&q=80&w=1200"
  },
  { 
    id: "RC2",
    region: "Bab-el-Mandeb", 
    status: "Security Escalation", 
    priority: "High", 
    alert: true, 
    details: "Commercial vessel protection and maritime insurance risk monitoring.", 
    uaeImpact: 92,
    coordinates: [12.58, 43.34]
  },
  { 
    id: "RC3",
    region: "Sudan Heartland", 
    status: "Humanitarian Support", 
    priority: "High", 
    alert: true, 
    details: "Airlift coordination for aid delivery and refugee settlement stabilization.", 
    uaeImpact: 64,
    coordinates: [15.5007, 32.5599]
  },
  { 
    id: "RC4",
    region: "Hormuz Straits", 
    status: "Monitoring / Routine", 
    priority: "Low", 
    alert: false, 
    details: "Maintenance of navigational freedom and environmental safety protocols.", 
    uaeImpact: 98,
    coordinates: [26.56, 56.25]
  }
];

export const politicalKpis: PoliticalKpi[] = [
  { 
    label: "Political Stability Index", 
    value: "46.90%", 
    trend: "down",
    representative: {
      name: "Amb. Linda Thomas",
      title: "Permanent Representative",
      org: "UN Security Council"
    },
    insightData: {
      org: "UNSC",
      historicalData: [52.1, 51.5, 50.2, 48.8, 46.9],
      forecastData: [46.9, 45.2, 43.5, 41.8, 40.1],
      labels: {
        historical: ['2021', '2022', '2023', '2024', '2025'],
        forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
      },
      analysis: {
        historical: "Global stability has faced significant headwinds, primarily driven by regional fragmentation and the disruption of traditional diplomatic channels.",
        forecast: "Predictive vectors indicate potential stabilization if multilateral maritime safety protocols are solidified in key corridors."
      },
      stats: {
        historical: { confidence: "99.2%", delta: "-3.7%" },
        forecast: { confidence: "88.4%", delta: "-6.3%" }
      }
    }
  },
  { 
    label: "Global Peace Index", 
    value: "52.40%", 
    trend: "down",
    representative: {
      name: "Steve Killelea",
      title: "Founder",
      org: "IEP (Economics & Peace)"
    },
    insightData: {
      org: "IEP",
      historicalData: [58.5, 57.2, 55.8, 54.1, 52.4],
      forecastData: [52.4, 51.2, 50.5, 49.8, 49.0],
      labels: {
        historical: ['2021', '2022', '2023', '2024', '2025'],
        forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
      },
      analysis: {
        historical: "The index reflects a world where conflict intensity has increased, particularly in the Levant and Eastern Europe, affecting overall peace scores.",
        forecast: "Medium-term projections suggest a tapering of the decline as regional mediation efforts begin to localize conflict containment."
      },
      stats: {
        historical: { confidence: "98.1%", delta: "-5.2%" },
        forecast: { confidence: "85.9%", delta: "-3.4%" }
      }
    }
  },
  { 
    label: "Global Terrorism Index", 
    value: "38.15%", 
    trend: "up",
    representative: {
      name: "Sérgio de Mello",
      title: "Senior Audit Director",
      org: "Global Security Watch"
    },
    insightData: {
      org: "GSW / IEP",
      historicalData: [32, 34.5, 35.8, 37.2, 38.15],
      forecastData: [38.15, 39.5, 41.2, 42.8, 44.5],
      labels: {
        historical: ['2021', '2022', '2023', '2024', '2025'],
        forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
      },
      analysis: {
        historical: "Terrorism vectors have shifted from large-scale coordinated attacks to decentralized small-cell activity, complicating detection and prevention matrices.",
        forecast: "Z-Model analytics predict a continued rise in cyber-terrorism incidents, necessitating a shift in global defense spending toward digital infrastructure."
      },
      stats: {
        historical: { confidence: "99.4%", delta: "+15.6%" },
        forecast: { confidence: "90.2%", delta: "+16.8%" }
      }
    }
  },
  { 
    label: "Work Risk Index", 
    value: "61.20%", 
    trend: "down",
    representative: {
      name: "Guy Ryder",
      title: "Special Envoy",
      org: "Int'l Labour Org"
    },
    insightData: {
      org: "ILO / WEF",
      historicalData: [68, 66.5, 64.2, 62.8, 61.2],
      forecastData: [61.2, 60.1, 58.5, 57.2, 55.5],
      labels: {
        historical: ['2021', '2022', '2023', '2024', '2025'],
        forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
      },
      analysis: {
        historical: "Labour disruption due to political instability and AI displacement has significantly altered the risk profile for multinational employers.",
        forecast: "A transition toward 'resilient working' models is expected to lower risk scores as legal frameworks for remote sovereign work mature."
      },
      stats: {
        historical: { confidence: "97.8%", delta: "-6.8%" },
        forecast: { confidence: "89.5%", delta: "-9.2%" }
      }
    }
  }
];

export interface PoliticalData {
  cases: PoliticalCase[];
  crises: RegionalCrisis[];
  kpis: PoliticalKpi[];
  news: PoliticalNews[];
}

export const politicalDataStore: Record<string, PoliticalData> = {
  GLOBAL: {
    cases: politicalCases,
    crises: regionalCrises,
    kpis: politicalKpis,
    news: [
      { id: "N1", headline: "UNSC Drafts New Maritime Security Protocol", time: "2h ago", category: "Security", source: "Intelligence Desk", summary: "A new draft resolution aims to establish enhanced security zones in critical transit chokepoints." },
      { id: "N2", headline: "G7 Summit Reaffirms Commitment to Indo-Pacific", time: "5h ago", category: "Diplomatic", source: "Diplomatic Core", summary: "Leaders have pledged increased cooperation on maritime defense and digital governance standards." }
    ]
  },
  JO: {
    cases: [
      {
        id: "C-JO-1",
        name: "Levant Stability Initiative",
        region: "Jordan / Regional",
        severity: "Stable",
        coordinates: [36.2384, 30.5852],
        description: "Diplomatic coordination for cross-border humanitarian corridors.",
        involvedParties: ["UNHCR", "Jordanian Armed Forces", "EU Delegation"],
        isoCodes: ["JO", "SY", "LB"]
      }
    ],
    crises: [
      {
        id: "RC-JO-1",
        region: "Northern Border",
        status: "High Vigilance",
        priority: "Medium",
        alert: false,
        details: "Monitoring logistical movements and refugee infrastructure stability.",
        uaeImpact: 45,
        coordinates: [32.5, 36.5]
      }
    ],
    kpis: [
      { label: "Political Stability Index", value: "88.20%", trend: "up" },
      { label: "Global Peace Index", value: "72.50%", trend: "up" },
      { label: "Global Terrorism Index", value: "12.40%", trend: "down" },
      { label: "Work Risk Index", value: "35.10%", trend: "up" }
    ],
    news: [
      { id: "NJ1", headline: "Amman Hosts Regional Security Dialogue", time: "1h ago", category: "Diplomatic", source: "Amman Bureau", summary: "High-level representatives meet to discuss logistics for humanitarian corridors." }
    ]
  },
  US: {
    cases: [
      {
        id: "C-US-1",
        name: "Indo-Pacific Security Pact",
        region: "Global / Pacific",
        severity: "Warning",
        coordinates: [-122.4194, 37.7749],
        description: "Strengthening maritime defense cooperation and technological decoupling.",
        involvedParties: ["Department of State", "AUKUS Partners"],
        isoCodes: ["US", "AU", "GB", "JP"]
      }
    ],
    crises: [],
    kpis: [
      { label: "Political Stability Index", value: "68.40%", trend: "down" },
      { label: "Global Peace Index", value: "62.10%", trend: "down" },
      { label: "Global Terrorism Index", value: "24.50%", trend: "up" },
      { label: "Work Risk Index", value: "78.20%", trend: "down" }
    ],
    news: [
      { id: "NU1", headline: "State Dept. Issues New Digital Governance Mandate", time: "30m ago", category: "Strategic", source: "DC Bureau", summary: "New framework for cross-border data flows and AI safety standards finalized." }
    ]
  },
  CN: {
    cases: [
      {
        id: "C-CN-1",
        name: "Belt and Road 2.0",
        region: "Global / Central Asia",
        severity: "Stable",
        coordinates: [116.4074, 39.9042],
        description: "Strategic investment in digital infrastructure and sustainable logistics across the Global South.",
        involvedParties: ["NDRC", "Silk Road Fund", "BRICS Central Banks"],
        isoCodes: ["CN", "PK", "KZ", "ET", "BR"]
      }
    ],
    crises: [],
    kpis: [
      { label: "Political Stability Index", value: "92.50%", trend: "up" },
      { label: "Global Peace Index", value: "85.80%", trend: "up" },
      { label: "Global Terrorism Index", value: "5.20%", trend: "down" },
      { label: "Work Risk Index", value: "81.40%", trend: "up" }
    ],
    news: [
      { id: "NC1", headline: "Digital Silk Road Expansion Announced", time: "4h ago", category: "Strategic", source: "Beijing Desk", summary: "New fiber-link projects connecting Central Asia to Europe slated for 2026." }
    ]
  },
  AE: {
    cases: [
      {
        id: "C-AE-1",
        name: "Global Trade Corridors",
        region: "UAE / Global",
        severity: "Stable",
        coordinates: [54.3773, 24.4539],
        description: "Strategic expansion of UAE-led maritime and air logistics hubs connecting three continents.",
        involvedParties: ["DP World", "Etihad Rail", "Ministry of Economy"],
        isoCodes: ["AE", "IN", "CN", "ZA"]
      },
      {
        id: "C-AE-2",
        name: "Energy Transition Roadmap",
        region: "UAE / MENA",
        severity: "Stable",
        coordinates: [55.2708, 25.2048],
        description: "Implementation of COP28 mandates and net-zero 2050 strategic initiatives.",
        involvedParties: ["ADNOC", "Masdar", "Ministry of Climate Change"],
        isoCodes: ["AE", "SA", "DE"]
      },
      {
        id: "C-AE-3",
        name: "AI Sovereign Cloud Initiative",
        region: "UAE / Global",
        severity: "Critical",
        coordinates: [54.3773, 24.4539],
        description: "Development of domestic AI compute clusters and secure data sovereign zones for governmental applications.",
        summary: "The UAE's AI Sovereign Cloud Initiative is a critical pillar of its digital economy strategy, aiming to ensure data sovereignty and advanced compute capabilities.",
        involvedParties: ["G42", "TII", "Cybersecurity Council", "NVIDIA", "ASPIRE"],
        isoCodes: ["AE", "US"]
      }
    ],
    crises: [
      {
        id: "RC-AE-1",
        region: "Arabian Gulf Maritime",
        status: "Deterrence Monitoring",
        priority: "High",
        alert: true,
        details: "Increased naval patrolling to prevent interference with commercial oil tankers near international chokepoints.",
        uaeImpact: 94,
        coordinates: [25.5, 53.5]
      }
    ],
    kpis: [
      { 
        label: "Political Stability Index", 
        value: "70.14%", 
        trend: "up",
        representative: {
          name: "H.E. Reem Al Hashimy",
          title: "Minister of State",
          org: "International Cooperation"
        },
        insightData: {
          org: "MoFAIC",
          historicalData: [65.85, 64.88, 70.24, 70.24, 70.14],
          forecastData: [70.14, 72.5, 75.8, 78.2, 81.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "The UAE has maintained a high-performance trajectory in political stability, with a significant jump observed between 2021 and 2022.",
            forecast: "Z-Model projections indicate a hockeystick acceleration as the 'We the UAE 2031' vision gains momentum."
          },
          stats: {
            historical: { confidence: "99.8%", delta: "+6.5%" },
            forecast: { confidence: "94.2%", delta: "+16.2%" }
          }
        }
      },
      { 
        label: "Global Peace Index", 
        value: "84.20%", 
        trend: "up",
        representative: {
          name: "H.E. Noura Al Kaabi",
          title: "Minister of State",
          org: "Public Diplomacy"
        }
      },
      { 
        label: "Global Terrorism Index", 
        value: "95.10%", 
        trend: "up",
        representative: {
          name: "H.E. Abdullah Al Marri",
          title: "Minister of Economy",
          org: "Regulatory Affairs"
        }
      },
      { 
        label: "Work Risk Index", 
        value: "78.77%", 
        trend: "up"
      }
    ],
    news: [
      { id: "NAE1", headline: "UAE Spearheads Global AI Ethics Accord", time: "1h ago", category: "Strategic", source: "Abu Dhabi Hub", summary: "G42 and international partners draft framework for sovereign AI applications." }
    ]
  }
};

