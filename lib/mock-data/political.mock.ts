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

export interface PoliticalKpi {
  label: string;
  value: string;
  trend: 'up' | 'down';
  representative?: Representative;
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
    label: "Stability Index", 
    value: "68.4", 
    trend: "down",
    representative: {
      name: "Amb. Linda Thomas",
      title: "Permanent Representative",
      org: "UN Security Council"
    }
  },
  { 
    label: "Diplomatic Agility", 
    value: "142", 
    trend: "up",
    representative: {
      name: "H.E. Reem Al Hashimy",
      title: "Minister of State",
      org: "UAE International Cooperation"
    }
  },
  { 
    label: "Trade Lane Security", 
    value: "82%", 
    trend: "down",
    representative: {
      name: "Arsenio Dominguez",
      title: "Secretary-General",
      org: "International Maritime Org"
    }
  },
  { 
    label: "Global Trust Score", 
    value: "94%", 
    trend: "up",
    representative: {
      name: "Børge Brende",
      title: "President",
      org: "World Economic Forum"
    }
  }
];

export interface PoliticalData {
  cases: PoliticalCase[];
  crises: RegionalCrisis[];
  kpis: PoliticalKpi[];
}

export const politicalDataStore: Record<string, PoliticalData> = {
  GLOBAL: {
    cases: politicalCases,
    crises: regionalCrises,
    kpis: politicalKpis
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
      { label: "Stability Index", value: "88.2", trend: "up" },
      { label: "Diplomatic Lead", value: "Rank #1", trend: "up" }
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
      { label: "Policy Efficiency", value: "72.5", trend: "down" },
      { label: "Institutional Trust", value: "42%", trend: "down" }
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
      { label: "Strategic Depth", value: "95.0", trend: "up" },
      { label: "Diplomatic Reach", value: "125 Countries", trend: "up" }
    ]
  }
};

