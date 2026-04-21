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
    label: "Stability Index", 
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
        historical: ['2020', '2021', '2022', '2023', '2024'],
        forecast: ['2025', '2026', '2027', '2028', '2029 (Est)']
      },
      analysis: {
        historical: "Global stability has faced significant headwinds, primarily driven by regional fragmentation and the disruption of traditional diplomatic channels. The current index reflects a cumulative 10.4% decline over the last four cycles.",
        forecast: "Predictive vectors indicate potential stabilization if multilateral maritime safety protocols are solidified. However, short-term projections remain cautious given the current volatility in energy transit corridors."
      },
      stats: {
        historical: { confidence: "99.2%", delta: "-3.7%" },
        forecast: { confidence: "88.4%", delta: "-6.3%" }
      }
    }
  },
  { 
    label: "Corruption Index (CPI)", 
    value: "57.54%", 
    trend: "up",
    representative: {
      name: "Delia Ferreira Rubio",
      title: "Chair",
      org: "Transparency International"
    },
    insightData: {
      org: "Transparency Int.",
      historicalData: [54, 55, 56, 56.5, 57.54],
      forecastData: [57.54, 58.5, 60.2, 61.8, 63.5],
      labels: {
        historical: ['2021', '2022', '2023', '2024', '2025'],
        forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
      },
      analysis: {
        historical: "The Global Corruption Perceptions Index shows marginal but steady improvement in transparency across emerging markets, facilitated by the adoption of blockchain-based audit trails in public procurement.",
        forecast: "Projections suggest a hockeystick acceleration in trust scores as AI-driven compliance frameworks are integrated into the G20 financial architecture."
      },
      stats: {
        historical: { confidence: "98.5%", delta: "+6.5%" },
        forecast: { confidence: "92.1%", delta: "+10.2%" }
      }
    }
  },
  { 
    label: "Voice & Accountability", 
    value: "48.18%", 
    trend: "down",
    representative: {
      name: "Arsenio Dominguez",
      title: "Secretary-General",
      org: "International Maritime Org"
    },
    insightData: {
      org: "World Bank / WGI",
      unit: "%",
      historicalData: [51, 50.5, 49.8, 49, 48.18],
      forecastData: [48.18, 47.5, 47, 46.5, 46],
      labels: {
        historical: ['2020', '2021', '2022', '2023', '2024'],
        forecast: ['2025', '2026', '2027', '2028', '2029 (Est)']
      },
      analysis: {
        historical: "There has been a noted contraction in global accountability scores, reflecting a broader trend of institutional restructuring and shifts in public participation models.",
        forecast: "While current trends show downward pressure, digital governance initiatives are expected to create a floor for the index by late 2026."
      },
      stats: {
        historical: { confidence: "99.8%", delta: "-5.8%" },
        forecast: { confidence: "85.6%", delta: "-4.1%" }
      }
    }
  },
  { 
    label: "Rule of Law", 
    value: "53.09%", 
    trend: "up",
    representative: {
      name: "Børge Brende",
      title: "President",
      org: "World Economic Forum"
    },
    insightData: {
      org: "WJP / WEF",
      unit: "%",
      historicalData: [51.5, 52, 52.3, 52.8, 53.09],
      forecastData: [53.09, 54, 55.2, 56.5, 58],
      labels: {
        historical: ['2020', '2021', '2022', '2023', '2024'],
        forecast: ['2025', '2026', '2027', '2028', '2029 (Est)']
      },
      analysis: {
        historical: "The Rule of Law index has maintained a slow upward trajectory, supported by legal tech advancements and cross-border judicial cooperation frameworks.",
        forecast: "Accelerated legal digitization is projected to drive a significant rise in this index, particularly in trade-heavy jurisdictions adopting the UNCITRAL Model Law on Electronic Transferable Records."
      },
      stats: {
        historical: { confidence: "97.4%", delta: "+3.1%" },
        forecast: { confidence: "91.2%", delta: "+9.2%" }
      }
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
        summary: "The UAE's AI Sovereign Cloud Initiative is a critical pillar of its digital economy strategy, aiming to ensure data sovereignty and advanced compute capabilities. International partnerships are being balanced with strict domestic compliance frameworks.",
        involvedParties: ["G42", "TII", "Cybersecurity Council", "NVIDIA", "ASPIRE"],
        isoCodes: ["AE", "US"]
      },
      {
        id: "C-AE-4",
        name: "Space Security Framework",
        region: "UAE / orbital",
        severity: "Warning",
        coordinates: [54.65, 24.43],
        description: "Establishment of diplomatic protocols for satellite defense and asteroid resource utilization.",
        involvedParties: ["UAE Space Agency", "UNOOSA", "MBR Space Centre"],
        isoCodes: ["AE", "US", "JP", "FR"]
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
        coordinates: [25.5, 53.5],
        summary: "Regional maritime stability remains a top priority. The UAE is coordinating with international task forces to ensure the free flow of trade through the straits, utilizing advanced drone surveillance and satellite tracking.",
        imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1200"
      },
      {
        id: "RC-AE-2",
        region: "Strategic Supply Chain",
        status: "Diversification Phase",
        priority: "Medium",
        alert: false,
        details: "Addressing potential shortages in semiconductor and food security through bilateral trade agreements.",
        uaeImpact: 78,
        coordinates: [24.4, 54.4],
        summary: "In response to global supply chain volatility, the UAE is accelerating its 'Global South' trade bridge initiative. Strategic stockpiling and local manufacturing of critical components are being incentivized to buffer against external shocks."
      },
      {
        id: "RC-AE-3",
        region: "AI Regulation Alignment",
        status: "Active Negotiation",
        priority: "Medium",
        alert: false,
        details: "Harmonizing domestic AI safety laws with global G7 and BRICS+ standards.",
        uaeImpact: 65,
        coordinates: [25.0, 55.0]
      }
    ],
    kpis: [
      { 
        label: "Stability Index", 
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
            historical: ['2020', '2021', '2022', '2023', '2024'],
            forecast: ['2025', '2026', '2027', '2028', '2029 (Est)']
          },
          analysis: {
            historical: "The UAE has maintained a high-performance trajectory in political stability, with a significant jump observed between 2021 and 2022 as regional integration efforts matured.",
            forecast: "Z-Model projections indicate a hockeystick acceleration as the 'We the UAE 2031' vision gains momentum, particularly in diplomatic mediation and economic security."
          },
          stats: {
            historical: { confidence: "99.8%", delta: "+6.5%" },
            forecast: { confidence: "94.2%", delta: "+16.2%" }
          }
        }
      },
      { 
        label: "Corruption Index (CPI)", 
        value: "87.15%", 
        trend: "up",
        representative: {
          name: "H.E. Abdullah bin Touq",
          title: "Minister of Economy",
          org: "UAE Ministry of Economy"
        },
        insightData: {
          org: "MoE",
          historicalData: [85.0, 85.56, 85.56, 82.55, 87.15],
          forecastData: [87.15, 89.2, 91.5, 93.8, 95.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "The transparency index for the UAE remains among the highest globally, with the latest surge attributed to the comprehensive digitization of federal judicial and economic services.",
            forecast: "Continued implementation of AI-driven oversight and open-data protocols is expected to position the UAE within the global top 5 for transparency by 2027."
          },
          stats: {
            historical: { confidence: "99.5%", delta: "+2.53%" },
            forecast: { confidence: "91.8%", delta: "+9.0%" }
          }
        }
      },
      { 
        label: "Voice & Accountability", 
        value: "28.1%", 
        trend: "up",
        representative: {
          name: "H.E. Noura Al Kaabi",
          title: "Minister of State",
          org: "Public Diplomacy"
        },
        insightData: {
          org: "MoFAIC",
          unit: "%",
          historicalData: [15.76, 15.27, 18.23, 18.23, 28.1],
          forecastData: [28.1, 32.5, 38.2, 44.5, 52.0],
          labels: {
            historical: ['2020', '2021', '2022', '2023', '2024'],
            forecast: ['2025', '2026', '2027', '2028', '2029 (Est)']
          },
          analysis: {
            historical: "The Voice and Accountability scores have seen a record 54% expansion in the most recent cycle, driven by digital participation platforms and increased NGO engagement.",
            forecast: "Vectors suggest further growth as the 'National Strategy for Wellbeing' expands public consultation channels through integrated Z-Model feedback loops."
          },
          stats: {
            historical: { confidence: "98.2%", delta: "+78.3%" },
            forecast: { confidence: "86.5%", delta: "+85.0%" }
          }
        }
      },
      { 
        label: "Rule of Law", 
        value: "78.77%", 
        trend: "up",
        representative: {
          name: "H.E. Abdullah Al Marri",
          title: "Minister of Economy",
          org: "Regulatory Affairs"
        },
        insightData: {
          org: "MoE / Justice",
          unit: "%",
          historicalData: [73.38, 73.57, 73.94, 73.94, 78.77],
          forecastData: [78.77, 81.2, 84.5, 87.8, 91.2],
          labels: {
            historical: ['2020', '2021', '2022', '2023', '2024'],
            forecast: ['2025', '2026', '2027', '2028', '2029 (Est)']
          },
          analysis: {
            historical: "Legal reforms and the expansion of the DIFC/ADGM common law jurisdictions have significantly bolstered the Rule of Law scores across commercial and civil sectors.",
            forecast: "The hockeystick vector for legal certainty is projected to reach institutional parity with the world's leading administrative hubs by 2028."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "+7.3%" },
            forecast: { confidence: "92.4%", delta: "+15.8%" }
          }
        }
      }
    ]
  }
};

