export interface TrendData {
  label: string;
  value: number;
  dataPoints: number[];
  description?: string;
}

export interface KpiReport {
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  value: string;
  rep: string;
  org: string;
  insightData?: {
    org?: string;
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

export interface InvestmentReport {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  org: string;
  author: string;
  date: string;
}

export interface EconomyData {
  positiveTrends: TrendData[];
  negativeTrends: TrendData[];
  kpisAndReports: KpiReport[];
  reports: InvestmentReport[];
}

// Dictionary keyed by ISO codes, with a fallback "GLOBAL" key
export const economyDataStore: Record<string, EconomyData> = {
  GLOBAL: {
    positiveTrends: [
      { 
        label: "Global AI Sector Growth", 
        value: 34.5, 
        dataPoints: [10, 15, 22, 28, 34.5],
        description: "Exponential acceleration in LLM deployment and enterprise AI integration is driving unprecedented capital allocation. This vector represents the strongest productivity shift in the digital era."
      },
      { 
        label: "Green Energy Investment", 
        value: 18.2, 
        dataPoints: [5, 8, 12, 15, 18.2],
        description: "Decarbonization mandates are fueling a massive transition toward renewable infrastructure. Sovereign funds are pivoting heavily toward sustainable assets to hedge against long-term climate risk."
      },
      { 
        label: "Emerging Markets Tech", 
        value: 12.4, 
        dataPoints: [2, 4, 7, 10, 12.4],
        description: "Rapid digitization in Southeast Asia and Africa is creating new consumer markets. Local fintech and logistics startups are capturing significant share from traditional global incumbents."
      }
    ],
    negativeTrends: [
      { 
        label: "Commercial Real Estate", 
        value: -8.5, 
        dataPoints: [0, -2, -4, -6, -8.5],
        description: "The remote work paradigm shift continues to erode office valuations in major financial hubs. Debt restructuring in this sector remains a significant systemic risk for regional banks."
      },
      { 
        label: "Legacy Supply Chain", 
        value: -4.2, 
        dataPoints: [-1, -2, -3, -4, -4.2],
        description: "Traditional logistical frameworks are struggling with rising fuel costs and geopolitical friction. Decoupling from high-risk manufacturing nodes is causing short-term friction and margin compression."
      },
      { 
        label: "Global Inflation Drag", 
        value: -2.1, 
        dataPoints: [-0.5, -1, -1.5, -2, -2.1],
        description: "Persistent core inflation is forcing central banks to maintain restrictive monetary policies. This sustained high-rate environment is dampening consumer demand and stretching corporate balance sheets."
      }
    ],
    kpisAndReports: [
      { 
        title: "Global GDP Growth", 
        impact: "High", 
        value: "2.9%", 
        rep: "Kristalina Georgieva", 
        org: "IMF",
        insightData: {
          historicalData: [2.4, 2.1, -1.2, 1.8, 2.6],
          forecastData: [2.9, 3.2, 4.8, 6.5, 8.8],
          labels: {
            historical: ['2019', '2020', '2021', '2022', '2023'],
            forecast: ['2024', '2025', '2026', '2027', '2028 (Est)']
          },
          analysis: {
            historical: "Audit records from 2019-2023 confirm a recovery trajectory following global disruptions. Verification via Z-Model ledger nodes indicates high correlation between regional fiscal stimulus and the current 2.9% baseline.",
            forecast: "The projected 8.8% growth is driven by three convergent vectors: wide-scale industrial GenAI integration, a massive capital pivot towards decentralized energy grids, and reduced cross-border friction via Z-Model protocols."
          },
          stats: {
            historical: { confidence: "99.8%", delta: "+0.8%" },
            forecast: { confidence: "94.2%", delta: "+6.2%" }
          }
        }
      },
      { 
        title: "Trade Volume Index", 
        impact: "Medium", 
        value: "104.5", 
        rep: "Ngozi Okonjo-Iweala", 
        org: "WTO",
        insightData: {
          historicalData: [98, 102, 95, 101, 104.5],
          forecastData: [104.5, 108.2, 112.5, 118, 125],
          labels: {
            historical: ['2019', '2020', '2021', '2022', '2023'],
            forecast: ['2024', '2025', '2026', '2027', '2028 (Est)']
          },
          analysis: {
            historical: "Global trade volumes shifted toward digital services and fragmented manufacturing hubs. Regional trade agreements in Asia-Pacific compensated for contractions in Atlantic corridors.",
            forecast: "Z-Model indicates a 'Great Acceleration' in cross-border settlement speeds as DLT-based trade finance reaches 40% adoption among top-tier exporters by 2026."
          },
          stats: {
            historical: { confidence: "98.1%", delta: "+6.5" },
            forecast: { confidence: "89.4%", delta: "+20.5" }
          }
        }
      },
      { title: "Global Poverty Reduction Rate", impact: "High", value: "+1.2%", rep: "Ajay Banga", org: "World Bank" },
      { title: "Cross-Border FDI", impact: "Medium", value: "$1.3T", rep: "Rebeca Grynspan", org: "UNCTAD" }
    ],
    reports: [
      {
        id: "econ-rep-1",
        title: "Global Economic Prospects, January 2026",
        description: "Comprehensive analysis of global growth trajectories, downside risks, and sovereign policy recommendations for 2026-2028.",
        fileUrl: "/files/Global Economic Prospects, January 2026.pdf",
        org: "World Bank",
        author: "Chief Economist Unit",
        date: "Jan 2026"
      }
    ]
  },
  AE: { // United Arab Emirates Specific Data
    positiveTrends: [
      { 
        label: "Non-Oil GDP Surge", 
        value: 45.2, 
        dataPoints: [20, 25, 30, 40, 45.2],
        description: "Massive diversification efforts under Vision 2031 are yielding record results. The UAE is successfully repositioning as a global hub for aviation, logistics, and digital services."
      },
      { 
        label: "FDI Tech Inflows", 
        value: 28.4, 
        dataPoints: [10, 15, 20, 25, 28.4],
        description: "Business-friendly regulations and golden visa programs are attracting world-class AI and robotics firms. The 'We the UAE 2031' strategy is driving high-fidelity tech investments."
      },
      { 
        label: "Tourism Revenue", 
        value: 15.6, 
        dataPoints: [8, 10, 12, 14, 15.6],
        description: "Major global events and luxury hospitality expansion are driving double-digit growth. UAE remains the premier destination for regional and international high-net-worth travelers."
      }
    ],
    negativeTrends: [
      { 
        label: "Legacy Retail Decline", 
        value: -3.2, 
        dataPoints: [0, -1, -2, -3, -3.2],
        description: "Hyper-growth in e-commerce is putting pressure on traditional local malls. Retailers must adapt to omnichannel strategies to survive the digital-first consumer shift."
      },
      { 
        label: "Traditional Media Spend", 
        value: -5.1, 
        dataPoints: [-1, -2, -3, -4, -5.1],
        description: "Advertising budgets are migrating rapidly to social platforms and influencer marketing. Legacy print and television outlets are facing significant revenue headwinds."
      },
      { 
        label: "Unoptimized Logistics", 
        value: -1.8, 
        dataPoints: [-0.5, -1, -1.2, -1.5, -1.8],
        description: "Last-mile delivery inefficiencies in some regions are causing minor margin erosion. Strategic investments in AI-driven routing are required for optimization."
      }
    ],
    kpisAndReports: [
      { title: "UAE Global Competitiveness", impact: "High", value: "Rank #10", rep: "World Bank Rep", org: "World Bank" },
      { title: "Digital Economy Contribution", impact: "High", value: "11.7%", rep: "Regional Director", org: "IMF" },
      { title: "Strategic Trade Corridor Growth", impact: "High", value: "+15.4%", rep: "Trade Envoy", org: "WTO" },
      { title: "Innovation Index Surplus", impact: "Medium", value: "Top 5", rep: "Research Lead", org: "WIPO" }
    ],
    reports: [
      {
        id: "uae-econ-1",
        title: "UAE Economic Vision 2031 Audit",
        description: "Deep-dive assessment of non-oil GDP performance and diversification milestones in the Emirates.",
        fileUrl: "/files/Report - Country Card for UAE.pdf",
        org: "Z-Model Research",
        author: "AI Analyst",
        date: "Apr 2026"
      }
    ]
  },
  US: { // United States Specific Data
    positiveTrends: [
      { 
        label: "Domestic Semiconductor Mfg", 
        value: 22.1, 
        dataPoints: [5, 10, 15, 18, 22.1],
        description: "The CHIPS Act is triggering a massive resurgence in onshoring critical tech manufacturing. Billions in CAPEX are allocated to building leading-edge foundries on US soil."
      },
      { 
        label: "AI Enterprise Adoption", 
        value: 41.5, 
        dataPoints: [15, 22, 30, 38, 41.5],
        description: "S&P 500 companies are racing to integrate generative AI into core operations. This trend reflects a broad mandate for operational efficiency and automated discovery."
      },
      { 
        label: "Renewable Grid Expansion", 
        value: 14.2, 
        dataPoints: [6, 8, 10, 12, 14.2],
        description: "Federal tax incentives are accelerating the modernization of the energy grid. Large-scale utility solar and wind projects are reaching grid parity across the Midwest."
      }
    ],
    negativeTrends: [
      { 
        label: "Downtown Office Occupancy", 
        value: -15.4, 
        dataPoints: [-5, -8, -10, -12, -15.4],
        description: "Major metropolitan areas are facing 'urban doom loop' risks as office vacancies remain at historic highs. Tax bases in cities like San Francisco and Chicago are under pressure."
      },
      { 
        label: "Consumer Debt Default Rate", 
        value: -4.8, 
        dataPoints: [-1, -2, -3, -4, -4.8],
        description: "Rising interest rates are beginning to stress household finances. Credit card and auto loan delinquencies are edging toward pre-pandemic norms, indicating potential cooling."
      },
      { 
        label: "Regional Bank Deposits", 
        value: -6.2, 
        dataPoints: [-2, -3, -4, -5, -6.2],
        description: "Competition for deposits from money market funds is squeezing bank margins. Smaller institutions are facing capital flight as clients seek higher-yield, low-risk alternatives."
      }
    ],
    kpisAndReports: [
      { title: "Federal Funds Rate", impact: "High", value: "5.25%", rep: "Jerome Powell", org: "Federal Reserve" },
      { title: "Tech Sector Job Growth", impact: "Medium", value: "+4.5%", rep: "Labor Stat Chief", org: "BLS" }
    ],
    reports: []
  },
  JO: {
    positiveTrends: [
      { 
        label: "Amman Tech Hub Growth", 
        value: 18.5, 
        dataPoints: [5, 8, 12, 15, 18.5],
        description: "Jordan is emerging as a regional software development powerhouse. High talent density and competitive costs are attracting global tech outsourcing mandates."
      },
      { 
        label: "Tourism Resilience", 
        value: 24.2, 
        dataPoints: [10, 15, 18, 20, 24.2],
        description: "Post-pandemic travel surge to Petra and Wadi Rum remains strong. National marketing campaigns are successfully diversifying the visitor base beyond regional markets."
      }
    ],
    negativeTrends: [
      { label: "Energy Import Costs", value: -12.4, dataPoints: [-2, -5, -8, -10, -12.4], description: "Reliance on external energy sources creates budget vulnerability." },
      { label: "Water Scarcity Impact", value: -15.1, dataPoints: [-5, -8, -10, -12, -15.1], description: "Severe water stress is impacting agricultural output and municipal planning." }
    ],
    kpisAndReports: [
      { title: "National Desalination Project", impact: "High", value: "Funding Secured", rep: "Minister for Water", org: "Gov of Jordan" },
      { title: "UNESCO Corridor Revenue", impact: "Medium", value: "+12.1%", rep: "Director of Tourism", org: "JTB" }
    ],
    reports: []
  },
  CN: {
    positiveTrends: [
      { label: "EV Export Dominance", value: 52.1, dataPoints: [10, 20, 35, 45, 52.1], description: "Unmatched scale in battery production is giving Chinese EV makers a decisive global cost advantage." },
      { label: "Clean Tech Capex", value: 38.6, dataPoints: [15, 20, 28, 32, 38.6], description: "China continues to lead the world in solar and wind capacity additions to power its industrial core." }
    ],
    negativeTrends: [
      { label: "Property Sector Drag", value: -18.4, dataPoints: [-5, -10, -12, -15, -18.4], description: "Ongoing deleveraging in the real estate market is dampening consumer confidence and local gov revenue." },
      { label: "Demographic Aging", value: -4.2, dataPoints: [-1, -2, -3, -4, -4.2], description: "A shrinking workforce is increasing labor costs and long-term social welfare obligations." }
    ],
    kpisAndReports: [
      { title: "PBOC Reserve Ratio", impact: "High", value: "0.5% Cut", rep: "Pan Gongsheng", org: "PBOC" },
      { title: "Semiconductor Output", impact: "High", value: "+32%", rep: "MIIT Spokesperson", org: "MIIT" }
    ],
    reports: []
  },
  IN: {
    positiveTrends: [
      { label: "Mobile Manufacturing", value: 42.5, dataPoints: [20, 25, 30, 38, 42.5], description: "The 'Make in India' initiative has transformed the country into the world's second-largest mobile producer." },
      { label: "Service Export Surplus", value: 22.8, dataPoints: [10, 15, 18, 20, 22.8], description: "High-end software and consultancy exports are driving record-high service trade surpluses." }
    ],
    negativeTrends: [
      { label: "Infrastructure Bottlenecks", value: -6.4, dataPoints: [-1, -2, -4, -5, -6.4], description: "Logistical delays and power grid inconsistencies are limiting industrial throughput in some corridors." },
      { label: "Air Quality Economic Loss", value: -3.8, dataPoints: [-0.5, -1, -2, -3, -3.8], description: "High pollution levels in industrial hubs are causing health-related labor shortages and higher insurance costs." }
    ],
    kpisAndReports: [
      { title: "RBI Repo Rate", impact: "Medium", value: "6.50%", rep: "Shaktikanta Das", org: "RBI" },
      { title: "India Stack Adoption", impact: "High", value: "450M Users", rep: "NPCI Chief", org: "NPCI" }
    ],
    reports: []
  },
  SA: {
    positiveTrends: [
      { label: "Mining Sector Revenue", value: 31.2, dataPoints: [10, 15, 22, 28, 31.2], description: "New mineral deposit discoveries are attracting massive FDI under the Vision 2030 mining framework." },
      { label: "Gaming Hub Expansion", value: 14.5, dataPoints: [2, 5, 8, 12, 14.5], description: "Strategic investments in e-sports and game development are capturing the regional youth demographic." }
    ],
    negativeTrends: [
      { label: "Global Oil Volatility", value: -8.2, dataPoints: [-2, -4, -6, -7, -8.2], description: "Fluctuating Brent prices are creating uncertainty in projected fiscal surpluses for the next quarter." }
    ],
    kpisAndReports: [
      { title: "Non-Oil Sector Contribution", impact: "High", value: "52%", rep: "PIF Strategy Lead", org: "PIF" },
      { title: "NEOM Capital Injection", impact: "High", value: "$40B", rep: "Project CEO", org: "NEOM" }
    ],
    reports: []
  },
  RU: { // Russia Specific Data
    positiveTrends: [
      { label: "Agricultural Self-Sufficiency", value: 12.4, dataPoints: [5, 7, 9, 11, 12.4], description: "Massive state subsidies are driving a record-breaking harvest and food security autonomy." },
      { label: "LNG Arctic Expansion", value: 18.2, dataPoints: [10, 12, 14, 16, 18.2], description: "New northern sea route infrastructure is enabling record LNG exports to Asian partners." }
    ],
    negativeTrends: [
      { label: "SWIFT Disconnection Impact", value: -25.6, dataPoints: [-10, -15, -20, -22, -25.6], description: "Isolation from global payment systems continues to increase transaction costs for import/export." },
      { label: "CBR Interest Rate Drag", value: -16.0, dataPoints: [-8, -10, -12, -14, -16.0], description: "Emergency double-digit rates are suppressing domestic credit growth and automotive sales." }
    ],
    kpisAndReports: [
      { title: "Current Account Surplus", impact: "High", value: "$125B", rep: "Elvira Nabiullina", org: "CBR" },
      { title: "Shadow Fleet Capacity", impact: "Medium", value: "Increased", rep: "Energy Minister", org: "Rosneft" }
    ],
    reports: []
  },
  IR: { // Iran Specific Data
    positiveTrends: [
      { label: "Eurasian Customs Pivot", value: 24.5, dataPoints: [8, 12, 16, 20, 24.5], description: "New trade agreements with regional neighbors are opening alternative routes for industrial exports." },
      { label: "Domestic Tech Self-Reliance", value: 15.2, dataPoints: [5, 8, 10, 12, 15.2], description: "Local startups are successfully cloning global platform models for the insulated domestic market." },
      { label: "Regional Energy Corridor", value: 11.4, dataPoints: [2, 5, 8, 9, 11.4], description: "Increased gas exports to Iraq and Turkey are providing critical hard currency inflows." }
    ],
    negativeTrends: [
      { label: "Exchange Rate Devaluation", value: -42.1, dataPoints: [-10, -20, -30, -38, -42.1], description: "Sustained inflationary pressure is eroding purchasing power for the middle class." },
      { label: "Capital Infrastructure Aging", value: -18.2, dataPoints: [-5, -8, -12, -15, -18.2], description: "Limited access to international spare parts is causing maintenance backlogs in the aviation and energy sectors." },
      { label: "Cross-Border Banking Friction", value: -22.5, dataPoints: [-10, -15, -18, -20, -22.5], description: "Non-standard payment channels are causing significant delays in settling international trade balances." }
    ],
    kpisAndReports: [
      { title: "Inflationary Pressure Index", impact: "High", value: "45.8%", rep: "Central Bank Lead", org: "CBI" },
      { title: "Petrochemical Output Margin", impact: "Medium", value: "+8.2%", rep: "Oil Ministry Rep", org: "NIOC" }
    ],
    reports: []
  }
};

export interface EconomicKpi {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  organization: string;
}

export const economicKpis: EconomicKpi[] = [
  { label: "Global GDP Growth", value: "2.9%", change: "+0.2%", trend: "up", organization: "IMF" },
  { label: "World Trade Volume", value: "108.4", change: "+1.5%", trend: "up", organization: "WTO" },
  { label: "Global FDI Inflow", value: "$1.42T", change: "-4.2%", trend: "down", organization: "UNCTAD" },
  { label: "Inflation CPI", value: "4.1%", change: "-0.8%", trend: "up", organization: "OECD" },
  { label: "Market Volatility", value: "14.2", change: "-2.1%", trend: "up", organization: "VIX" },
  { label: "Energy Price Index", value: "125.6", change: "+5.4%", trend: "down", organization: "IEA" },
  { label: "Digital Econ Index", value: "112.4", change: "+12.1%", trend: "up", organization: "G20" },
  { label: "Sustainability Bond", value: "$850B", change: "+24%", trend: "up", organization: "WB" }
];

export const economyTrendData = [
  { category: "Technology", year: 2022, value: 45 },
  { category: "Technology", year: 2023, value: 52 },
  { category: "Technology", year: 2024, value: 68 },
  { category: "Technology", year: 2025, value: 84 },
  { category: "Energy", year: 2022, value: 38 },
  { category: "Energy", year: 2023, value: 42 },
  { category: "Energy", year: 2024, value: 40 },
  { category: "Energy", year: 2025, value: 48 },
  { category: "Finance", year: 2022, value: 30 },
  { category: "Finance", year: 2023, value: 34 },
  { category: "Finance", year: 2024, value: 32 },
  { category: "Finance", year: 2025, value: 36 },
  { category: "Healthcare", year: 2022, value: 25 },
  { category: "Healthcare", year: 2023, value: 28 },
  { category: "Healthcare", year: 2024, value: 34 },
  { category: "Healthcare", year: 2025, value: 42 }
];

export const punchCardSectors = ["Tech", "Energy", "Finance", "Retail", "Healthcare", "Aviation"];
export const punchCardTrends = ["Bullish", "Bearish", "Stable", "Volatile"];
export const punchCardData = [
  // This is a placeholder for the 3D surface but defined for types
  [0, 0, 5], [1, 0, 6], [2, 0, 4]
];