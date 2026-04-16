export interface TrendData {
  label: string;
  value: number;
  dataPoints: number[];
}

export interface KpiReport {
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  value: string;
  rep: string;
  org: string;
}

export interface EconomyData {
  positiveTrends: TrendData[];
  negativeTrends: TrendData[];
  kpisAndReports: KpiReport[];
}

// Dictionary keyed by ISO codes, with a fallback "GLOBAL" key
export const economyDataStore: Record<string, EconomyData> = {
  GLOBAL: {
    positiveTrends: [
      { label: "Global AI Sector Growth", value: 34.5, dataPoints: [10, 15, 22, 28, 34.5] },
      { label: "Green Energy Investment", value: 18.2, dataPoints: [5, 8, 12, 15, 18.2] },
      { label: "Emerging Markets Tech", value: 12.4, dataPoints: [2, 4, 7, 10, 12.4] }
    ],
    negativeTrends: [
      { label: "Commercial Real Estate", value: -8.5, dataPoints: [0, -2, -4, -6, -8.5] },
      { label: "Legacy Supply Chain", value: -4.2, dataPoints: [-1, -2, -3, -4, -4.2] },
      { label: "Global Inflation Drag", value: -2.1, dataPoints: [-0.5, -1, -1.5, -2, -2.1] }
    ],
    kpisAndReports: [
      { title: "Global GDP Growth Forecast", impact: "High", value: "2.8%", rep: "Kristalina Georgieva", org: "IMF" },
      { title: "Trade Volume Index", impact: "Medium", value: "104.5", rep: "Ngozi Okonjo-Iweala", org: "WTO" },
      { title: "Global Poverty Reduction Rate", impact: "High", value: "+1.2%", rep: "Ajay Banga", org: "World Bank" },
      { title: "Cross-Border FDI", impact: "Medium", value: "$1.3T", rep: "Rebeca Grynspan", org: "UNCTAD" }
    ]
  },
  AE: { // United Arab Emirates Specific Data
    positiveTrends: [
      { label: "Non-Oil GDP Surge", value: 45.2, dataPoints: [20, 25, 30, 40, 45.2] },
      { label: "FDI Tech Inflows", value: 28.4, dataPoints: [10, 15, 20, 25, 28.4] },
      { label: "Tourism Revenue", value: 15.6, dataPoints: [8, 10, 12, 14, 15.6] }
    ],
    negativeTrends: [
      { label: "Legacy Retail Decline", value: -3.2, dataPoints: [0, -1, -2, -3, -3.2] },
      { label: "Traditional Media Spend", value: -5.1, dataPoints: [-1, -2, -3, -4, -5.1] },
      { label: "Unoptimized Logistics", value: -1.8, dataPoints: [-0.5, -1, -1.2, -1.5, -1.8] }
    ],
    kpisAndReports: [
      { title: "UAE Global Competitiveness", impact: "High", value: "Rank #10", rep: "World Bank Rep", org: "World Bank" },
      { title: "Digital Economy Contribution", impact: "High", value: "11.7%", rep: "Regional Director", org: "IMF" }
    ]
  },
  US: { // United States Specific Data
    positiveTrends: [
      { label: "Domestic Semiconductor Mfg", value: 22.1, dataPoints: [5, 10, 15, 18, 22.1] },
      { label: "AI Enterprise Adoption", value: 41.5, dataPoints: [15, 22, 30, 38, 41.5] },
      { label: "Renewable Grid Expansion", value: 14.2, dataPoints: [6, 8, 10, 12, 14.2] }
    ],
    negativeTrends: [
      { label: "Downtown Office Occupancy", value: -15.4, dataPoints: [-5, -8, -10, -12, -15.4] },
      { label: "Consumer Debt Default Rate", value: -4.8, dataPoints: [-1, -2, -3, -4, -4.8] },
      { label: "Regional Bank Deposits", value: -6.2, dataPoints: [-2, -3, -4, -5, -6.2] }
    ],
    kpisAndReports: [
      { title: "US Federal Interest Rate", impact: "High", value: "5.25%", rep: "Jerome Powell", org: "Federal Reserve" },
      { title: "Tech Sector Job Growth", impact: "Medium", value: "+4.5%", rep: "Labor Stat Chief", org: "BLS" }
    ]
  },
  JO: {
    positiveTrends: [
      { label: "Amman Tech Hub Growth", value: 18.5, dataPoints: [5, 8, 12, 15, 18.5] },
      { label: "Tourism Resilience", value: 24.2, dataPoints: [10, 15, 18, 20, 24.2] }
    ],
    negativeTrends: [
      { label: "Energy Import Costs", value: -12.4, dataPoints: [-2, -5, -8, -10, -12.4] },
      { label: "Water Scarcity Impact", value: -15.1, dataPoints: [-5, -8, -10, -12, -15.1] }
    ],
    kpisAndReports: [
      { title: "National Desalination Project", impact: "High", value: "Funding Secured", rep: "Minister for Water", org: "Gov of Jordan" },
      { title: "UNESCO Corridor Revenue", impact: "Medium", value: "+12.1%", rep: "Director of Tourism", org: "JTB" }
    ]
  },
  CN: {
    positiveTrends: [
      { label: "EV Export Dominance", value: 52.1, dataPoints: [10, 20, 35, 45, 52.1] },
      { label: "Clean Tech Capex", value: 38.6, dataPoints: [15, 20, 28, 32, 38.6] }
    ],
    negativeTrends: [
      { label: "Property Sector Drag", value: -18.4, dataPoints: [-5, -10, -12, -15, -18.4] },
      { label: "Demographic Aging", value: -4.2, dataPoints: [-1, -2, -3, -4, -4.2] }
    ],
    kpisAndReports: [
      { title: "PBOC Reserve Ratio", impact: "High", value: "0.5% Cut", rep: "Pan Gongsheng", org: "PBOC" },
      { title: "Semiconductor Output", impact: "High", value: "+32%", rep: "MIIT Spokesperson", org: "MIIT" }
    ]
  },
  IN: {
    positiveTrends: [
      { label: "Mobile Manufacturing", value: 42.5, dataPoints: [20, 25, 30, 38, 42.5] },
      { label: "Service Export Surplus", value: 22.8, dataPoints: [10, 15, 18, 20, 22.8] }
    ],
    negativeTrends: [
      { label: "Infrastructure Bottlenecks", value: -6.4, dataPoints: [-1, -2, -4, -5, -6.4] },
      { label: "Air Quality Economic Loss", value: -3.8, dataPoints: [-0.5, -1, -2, -3, -3.8] }
    ],
    kpisAndReports: [
      { title: "RBI Repo Rate", impact: "Medium", value: "6.50%", rep: "Shaktikanta Das", org: "RBI" },
      { title: "India Stack Adoption", impact: "High", value: "450M Users", rep: "NPCI Chief", org: "NPCI" }
    ]
  },
  SA: {
    positiveTrends: [
      { label: "Mining Sector Revenue", value: 31.2, dataPoints: [10, 15, 22, 28, 31.2] },
      { label: "Gaming Hub Expansion", value: 14.5, dataPoints: [2, 5, 8, 12, 14.5] }
    ],
    negativeTrends: [
      { label: "Global Oil Volatility", value: -8.2, dataPoints: [-2, -4, -6, -7, -8.2] }
    ],
    kpisAndReports: [
      { title: "Non-Oil Sector Contribution", impact: "High", value: "52%", rep: "PIF Strategy Lead", org: "PIF" },
      { title: "NEOM Capital Injection", impact: "High", value: "$40B", rep: "Project CEO", org: "NEOM" }
    ]
  },
  RU: { // Russia Specific Data
    positiveTrends: [
      { label: "Agricultural Self-Sufficiency", value: 12.4, dataPoints: [5, 7, 9, 11, 12.4] },
      { label: "LNG Arctic Expansion", value: 18.2, dataPoints: [10, 12, 14, 16, 18.2] }
    ],
    negativeTrends: [
      { label: "SWIFT Disconnection Impact", value: -25.6, dataPoints: [-10, -15, -20, -22, -25.6] },
      { label: "CBR Interest Rate Drag", value: -16.0, dataPoints: [-8, -10, -12, -14, -16.0] }
    ],
    kpisAndReports: [
      { title: "Current Account Surplus", impact: "High", value: "$125B", rep: "Elvira Nabiullina", org: "CBR" },
      { title: "Shadow Fleet Capacity", impact: "Medium", value: "Increased", rep: "Energy Minister", org: "Rosneft" }
    ]
  },
  IR: { // Iran Specific Data
    positiveTrends: [
      { label: "Eurasian Customs Pivot", value: 24.5, dataPoints: [8, 12, 16, 20, 24.5] },
      { label: "Domestic Tech Self-Reliance", value: 15.2, dataPoints: [5, 8, 10, 12, 15.2] },
      { label: "Regional Energy Corridor", value: 11.4, dataPoints: [2, 5, 8, 9, 11.4] }
    ],
    negativeTrends: [
      { label: "Exchange Rate Devaluation", value: -42.1, dataPoints: [-10, -20, -30, -38, -42.1] },
      { label: "Capital Infrastructure Aging", value: -18.2, dataPoints: [-5, -8, -12, -15, -18.2] },
      { label: "Cross-Border Banking Friction", value: -22.5, dataPoints: [-10, -15, -18, -20, -22.5] }
    ],
    kpisAndReports: [
      { title: "Inflationary Pressure Index", impact: "High", value: "45.8%", rep: "Central Bank Lead", org: "CBI" },
      { title: "Petrochemical Output Margin", impact: "Medium", value: "+8.2%", rep: "Oil Ministry Rep", org: "NIOC" }
    ]
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