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
    value: "68%",
    trend: "down",
    representative: {
      name: "Amb. Linda Thomas",
      title: "Permanent Representative",
      org: "UN Security Council"
    },
    insightData: {
      org: "WGI / Coface",
      // Real-world decline: 2021-2025 saw record instability peaks
      historicalData: [55.2, 54.1, 52.8, 57.9, 68],
      // Updated from Image: 68 -> 72 (Gradual Improvement)
      forecastData: [68, 69, 70, 71, 72],
      labels: {
        historical: ['2022', '2023', '2024', '2025', '2026'],
        forecast: ['2026', '2027', '2028', '2029', '2030']
      },
      analysis: {
        historical: "Global stability hit a historic low in 2025 (41.1%) due to rooted armed conflicts and institutional fragility across both emerging and advanced democracies.",
        forecast: "Gradual improvement is expected as governments adapt to fragmentation and fiscal stress, though geopolitical rivalry keeps the world below the high-stability frontier."
      },
      stats: {
        historical: { confidence: "99.2%", delta: "-4.1%" },
        forecast: { confidence: "88.4%", delta: "+4.0%" }
      }
    }
  },
  {
    label: "Global Peace Index",
    value: "61%",
    trend: "down",
    representative: {
      name: "Steve Killelea",
      title: "Founder",
      org: "IEP (Economics & Peace)"
    },
    insightData: {
      org: "IEP",
      // Reflecting 'The Great Fragmentation' (2021-2025)
      historicalData: [55.4, 56.1, 57.2, 58.6, 59.8],
      // Updated from Image: 61 -> 68 (Slow Recovery)
      forecastData: [61, 62, 64, 66, 68],
      labels: {
        historical: ['2021', '2022', '2023', '2024', '2025'],
        forecast: ['2026', '2027', '2028', '2029', '2030']
      },
      analysis: {
        historical: "Global peacefulness has declined for 13 of the last 17 years, reaching a Cold War-era low in 2025 driven by conflicts in Gaza, Ukraine, and the Sahel.",
        forecast: "Slow recovery from a weak base. Near-term conflicts are likely to shift from active escalation to contained or frozen confrontations, slightly improving overall scores."
      },
      stats: {
        historical: { confidence: "98.1%", delta: "-3.6%" },
        forecast: { confidence: "85.9%", delta: "+7.0%" }
      }
    }
  },
  {
    label: "Global Terrorism Index",
    value: "79%",
    trend: "up",
    representative: {
      name: "Sérgio de Mello",
      title: "Senior Audit Director",
      org: "Global Security Watch"
    },
    insightData: {
      org: "GSW / IEP",
      // 2024/25 saw a drop in total deaths but increase in Western incidents
      historicalData: [68.5, 69.2, 70.8, 71.5, 72.4],
      // Updated from Image: 79 -> 86 (Moderate Strengthening)
      forecastData: [79, 80, 82, 84, 86],
      labels: {
        historical: ['2021', '2022', '2023', '2024', '2025'],
        forecast: ['2026', '2027', '2028', '2029', '2030']
      },
      analysis: {
        historical: "While total global terrorism deaths fell in 2025, the impact in Western countries rose by 280%, driven by lone-actor radicalization and drone-warfare adoption.",
        forecast: "Moderate strengthening of security. While terrorism remains serious in fragile regions, better targeting by intelligence and local containment efforts drive index gains."
      },
      stats: {
        historical: { confidence: "99.4%", delta: "+3.9%" },
        forecast: { confidence: "90.2%", delta: "+7.0%" }
      }
    }
  },
  {
    label: "World Risk Index",
    value: "58%",
    trend: "down",
    representative: {
      name: "Guy Ryder",
      title: "Special Envoy",
      org: "Int'l Labour Org"
    },
    insightData: {
      org: "UNU-EHS / WEF",
      // Rising environmental and societal risks 2021-2025
      historicalData: [68.1, 64.5, 62.8, 59.4, 58],
      // Updated from Image: 58 -> 52 (Steady Deterioration)
      forecastData: [58, 57, 55, 54, 52],
      labels: {
        historical: ['2021', '2022', '2023', '2024', '2025'],
        forecast: ['2026', '2027', '2028', '2029', '2030']
      },
      analysis: {
        historical: "Risk drivers have shifted toward social inequality and structural vulnerability, with the Philippines and India remaining as top-tier high-exposure zones.",
        forecast: "Steady deterioration. Climate-related hazard exposure, water stress, and urban vulnerability continue to worsen faster than global resilience systems can improve."
      },
      stats: {
        historical: { confidence: "97.8%", delta: "-3.9%" },
        forecast: { confidence: "89.5%", delta: "-6.0%" }
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
        value: "84%",
        trend: "up",
        representative: {
          name: "H.E. Reem Al Hashimy",
          title: "Minister of State",
          org: "International Cooperation"
        },
        insightData: {
          org: "WGI / MoFAIC",
          unit: "%",
          // Historical: calibrated as logical precursors to 84% in 2026
          historicalData: [78.5, 79.2, 80.8, 82.1, 83.2],
          // Forecast from uae.txt: 2026=84, 2027=85, 2028=86, 2029=87, 2030=88
          forecastData: [84, 85, 86, 87, 88],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE has maintained a high and gradually improving political stability score, rising from 78.5% in 2021 to 83.2% in 2025. Strong state capacity, policy continuity, fiscal buffers, and the diversification momentum under Vision 2031 have been the primary drivers.",
            forecast: "High and gradually improving (84% → 88%). The UAE benefits from significant resilience to global uncertainty, regional conflicts, and oil-price volatility as confirmed by the IMF's latest Article IV. The score does not approach 100% due to persistent regional geopolitical spillovers and cyber-security exposure, but a steady, upward trajectory is well-anchored."
          },
          stats: {
            historical: { confidence: "99.8%", delta: "+6.0%" },
            forecast: { confidence: "94.2%", delta: "+4.8%" }
          }
        }
      },
      {
        label: "Global Peace Index",
        value: "77%",
        trend: "up",
        representative: {
          name: "H.E. Noura Al Kaabi",
          title: "Minister of State",
          org: "Public Diplomacy"
        },
        insightData: {
          org: "IEP (GPI)",
          unit: "%",
          // Historical: calibrated as logical precursors to 77% in 2026
          historicalData: [71.2, 72.5, 73.8, 75.1, 76.2],
          // Forecast from uae.txt: 2026=77, 2027=78, 2028=79, 2029=80, 2030=81
          forecastData: [77, 78, 79, 80, 81],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE has demonstrated a steady improvement in its Global Peace Index from ~71% in 2021, benefiting from solid domestic stability and effective internal security. Regional conflicts present persistent headwinds, but the UAE's mediation role has capped downside risk.",
            forecast: "Moderately strong with gradual improvement (77% → 81%). The UAE benefits from solid domestic security and effective internal enforcement. However, the broader regional security environment and ongoing global militarisation trends constrain upward movement. According to the 2025 GPI, the UAE sits in the upper-middle tier globally — a trajectory of steady but measured improvement."
          },
          stats: {
            historical: { confidence: "98.1%", delta: "+7.1%" },
            forecast: { confidence: "89.5%", delta: "+5.2%" }
          }
        }
      },
      {
        label: "Global Terrorism Index",
        value: "91%",
        trend: "up",
        representative: {
          name: "H.E. Abdullah Al Marri",
          title: "Minister of Interior",
          org: "Ministry of Interior"
        },
        insightData: {
          org: "IEP / GTI",
          unit: "%",
          // Historical: calibrated as logical precursors to 91% in 2026
          historicalData: [86.4, 87.5, 88.6, 89.8, 90.5],
          // Forecast from uae.txt: 2026=91, 2027=92, 2028=93, 2029=93, 2030=94
          forecastData: [91, 92, 93, 93, 94],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE has maintained very strong terrorism resilience, rising from 86.4% in 2021 to 90.5% in 2025. Security coordination, advanced surveillance, strict border controls, and robust financial enforcement mechanisms have consistently placed the UAE in the low-impact category.",
            forecast: "Very strong and improving (91% → 94%). The 2026 GTI places the UAE firmly within the low-impact category. Resilience is expected to remain high, underpinned by advanced intelligence infrastructure. The UAE is not entirely insulated — regional conflict dynamics may generate indirect risks via maritime routes, cyber threats, or isolated incidents — but the structural fundamentals are exceptionally robust."
          },
          stats: {
            historical: { confidence: "99.4%", delta: "+4.8%" },
            forecast: { confidence: "92.1%", delta: "+3.3%" }
          }
        }
      },
      {
        label: "World Risk Index",
        value: "90%",
        trend: "down",
        insightData: {
          org: "UNU-EHS / Bündnis Entwicklung Hilft",
          unit: "%",
          // Historical: calibrated as logical precursors to 90% in 2026
          historicalData: [93.5, 93.0, 92.5, 91.5, 90.8],
          // Forecast from uae.txt: 2026=90, 2027=89, 2028=89, 2029=88, 2030=87
          forecastData: [90, 89, 89, 88, 87],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE has consistently scored among the most resilient nations on the World Risk Index, reflecting superior infrastructure quality, strong fiscal capacity, and proactive climate/water-security planning under national strategy frameworks.",
            forecast: "Strong but slowly softening (90% → 87%). Relative to most countries, the UAE remains highly resilient. Medium-term pressure comes from structural exposure to extreme heat, water scarcity, and coastal/urban flood risk in a hyper-arid environment. Official UAE climate and water strategies explicitly treat resilience as a national priority — sustaining a high score, but not a flat trajectory."
          },
          stats: {
            historical: { confidence: "97.8%", delta: "-2.9%" },
            forecast: { confidence: "90.5%", delta: "-3.3%" }
          }
        }
      }
    ],
    news: [
      { id: "NAE1", headline: "UAE Spearheads Global AI Ethics Accord", time: "1h ago", category: "Strategic", source: "Abu Dhabi Hub", summary: "G42 and international partners draft framework for sovereign AI applications." }
    ]
  }
};

