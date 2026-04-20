export interface Opportunity {
  title: string;
  region: string;
  expectedReturn: string;
  status: 'up' | 'down' | 'stable';
  description: string;
  isoCodes?: string[]; // New: For globe highlights
  imageUrl?: string; // New: For opportunity cards
}

export interface KpiReport {
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  value: string;
  rep: string;
  org: string;
}

export interface InvestmentData {
  bestTarget: {
    label: string;
    name: string;
    score: number;
    details: string;
    timestamp: string;
    iso?: string; // Used to fly the camera
    imageUrl?: string; // New: For hero target
  };
  topOpportunities: Opportunity[];
  kpisAndReports: KpiReport[];
  tableData: {
    id: string;
    entity: string;
    rating: string;
    inflow: string;
    risk: 'Low' | 'Medium' | 'High' | 'Extreme';
    yield: string;
  }[];
}

export const investmentDataStore: Record<string, InvestmentData> = {
  GLOBAL: {
    bestTarget: {
      label: "Best Country to Invest In",
      name: "United Arab Emirates",
      iso: "AE",
      score: 98.5,
      details: "Top FDI destination driven by zero corporate tax zones, golden visa programs, and massive infrastructure spending.",
      timestamp: "Updated: Live 24/7",
      imageUrl: "/assets/images/mock/uae_investment_hero.png"
    },
    topOpportunities: [
      {
        title: "Sovereign Green Bonds",
        region: "Middle East",
        expectedReturn: "6.5% APY",
        status: "up",
        description: "High-yield government-backed green energy transition bonds.",
        isoCodes: ["SA", "AE", "QA"],
        imageUrl: "/assets/images/mock/green_energy_bonds.png"
      },
      {
        title: "Semiconductor Infrastructure",
        region: "North America",
        expectedReturn: "12.0% IRR",
        status: "up",
        description: "Subsidized fab construction and supply chain logistics.",
        isoCodes: ["US", "CA"],
        imageUrl: "/assets/images/mock/semiconductor_fab.png"
      },
      {
        title: "Lithium Supply Chain",
        region: "South America",
        expectedReturn: "18.5% IRR",
        status: "stable",
        description: "Direct extraction technologies and processing plants.",
        isoCodes: ["CL", "AR", "BO"],
        imageUrl: "/assets/images/mock/lithium_mining.png"
      }
    ],
    kpisAndReports: [
      { title: "Global FDI Flows", impact: "High", value: "$1.4 Trillion", rep: "Rebeca Grynspan", org: "UNCTAD" },
      { title: "Sovereign Wealth Index", impact: "High", value: "84.2", rep: "Diego López", org: "Global SWF" },
      { title: "Emerging Market Yield", impact: "Medium", value: "7.1%", rep: "Marcello Estevão", org: "World Bank" }
    ],
    tableData: [
      { id: "1", entity: "UAE", rating: "Aa2", inflow: "+$23B", risk: "Low", yield: "4.1%" },
      { id: "2", entity: "Japan", rating: "Aaa", inflow: "+$18B", risk: "Low", yield: "3.8%" },
      { id: "3", entity: "India", rating: "Baa3", inflow: "+$45B", risk: "Medium", yield: "7.2%" },
      { id: "4", entity: "Brazil", rating: "Ba2", inflow: "+$12B", risk: "High", yield: "10.5%" }
    ]
  },
  AE: {
    bestTarget: {
      label: "Prime Investment Sector",
      name: "AI & Sovereign Data Centers",
      score: 99.1,
      details: "Massive influx of capital into sovereign cloud infrastructure and localized large language model training facilities.",
      timestamp: "Updated: Live 24/7",
      imageUrl: "/assets/images/mock/uae_investment_hero.png"
    },
    topOpportunities: [
      {
        title: "Abu Dhabi Sovereign Cloud",
        region: "Abu Dhabi",
        expectedReturn: "14.2% IRR",
        status: "up",
        description: "Tier 4 data center expansion funded by public-private partnerships.",
        isoCodes: ["AE"],
        imageUrl: "/assets/images/mock/uae_ai_datacenter.png"
      },
      {
        title: "Clean Energy Grids",
        region: "Dubai / AD",
        expectedReturn: "8.5% APY",
        status: "up",
        description: "Solar and hydrogen transition infrastructure projects.",
        isoCodes: ["AE"],
        imageUrl: "/assets/images/mock/green_energy_bonds.png"
      },
      {
        title: "Luxury Real Estate",
        region: "Dubai",
        expectedReturn: "11.0% ROI",
        status: "stable",
        description: "Ultra-prime waterfront and branded residence developments.",
        isoCodes: ["AE"]
      }
    ],
    kpisAndReports: [
      { title: "UAE FDI Inflow Growth", impact: "High", value: "+10.3%", rep: "Minister of Economy", org: "UAE Gov" },
      { title: "Tech Sector Investment", impact: "High", value: "$5.2B", rep: "Regional Director", org: "WEF" },
      { title: "Real Estate Transaction Volume", impact: "Medium", value: "120B AED", rep: "DLD Chief", org: "DLD" }
    ],
    tableData: [
      { id: "1", entity: "Abu Dhabi Gov", rating: "Aa2", inflow: "+$15B", risk: "Low", yield: "4.0%" },
      { id: "2", entity: "Dubai Gov", rating: "Unrated", inflow: "+$10B", risk: "Low", yield: "4.5%" },
      { id: "3", entity: "Sharjah Gov", rating: "Ba1", inflow: "+$2B", risk: "Medium", yield: "6.2%" },
      { id: "4", entity: "Ras Al Khaimah", rating: "A-", inflow: "+$1.5B", risk: "Low", yield: "5.1%" }
    ]
  },
  US: {
    bestTarget: {
      label: "Best Country to Invest In",
      name: "United States",
      score: 97.2,
      details: "Robust capital markets, AI leadership, and aggressive fiscal stimulus via the CHIPS Act and IRA.",
      timestamp: "Updated: Live 24/7"
    },
    topOpportunities: [
      {
        title: "AI Chip Fabrication",
        region: "Arizona",
        expectedReturn: "15.0% IRR",
        status: "up",
        description: "Domestic semiconductor manufacturing and advanced packaging.",
        isoCodes: ["US"],
        imageUrl: "/assets/images/mock/semiconductor_fab.png"
      },
      {
        title: "Boutique Life Sciences",
        region: "Massachusetts",
        expectedReturn: "22.0% IRR",
        status: "up",
        description: "Early-stage biotech and genomic research facilities.",
        isoCodes: ["US"]
      },
      {
        title: "Renewable Grid Storage",
        region: "Texas",
        expectedReturn: "9.5% APY",
        status: "stable",
        description: "Large-scale battery storage and transmission upgrades.",
        isoCodes: ["US"],
        imageUrl: "/assets/images/mock/green_energy_bonds.png"
      }
    ],
    kpisAndReports: [
      { title: "Federal Funds Rate", impact: "High", value: "5.25%", rep: "Jerome Powell", org: "Federal Reserve" },
      { title: "Venture Capital Volume", impact: "High", value: "$45B", rep: "Regional Head", org: "SVB" },
      { title: "S&P 500 Dividend Yield", impact: "Medium", value: "1.6%", rep: "Chief Analyst", org: "BlackRock" }
    ],
    tableData: [
      { id: "1", entity: "Treasury Bonds", rating: "AA+", inflow: "+$120B", risk: "Low", yield: "4.2%" },
      { id: "2", entity: "Nasdaq 100", rating: "N/A", inflow: "+$65B", risk: "High", yield: "12.5%" },
      { id: "3", entity: "Real Estate REITs", rating: "BBB", inflow: "-$5B", risk: "Medium", yield: "6.4%" }
    ]
  },
  CN: {
    bestTarget: {
      label: "Strategic Investment Target",
      name: "China",
      score: 89.4,
      details: "Focus shifting toward high-end manufacturing, EVs, and green energy despite property sector headwinds.",
      timestamp: "Updated: Live 24/7"
    },
    topOpportunities: [
      {
        title: "Electric Vehicle Ecosystem",
        region: "Shenzhen",
        expectedReturn: "13.0% IRR",
        status: "up",
        description: "Battery manufacturing and charging infrastructure dominance.",
        isoCodes: ["CN"]
      },
      {
        title: "Digital Renminbi Expansion",
        region: "Shanghai",
        expectedReturn: "N/A (Strategic)",
        status: "stable",
        description: "Cross-border payment systems and fintech integration.",
        isoCodes: ["CN"]
      },
      {
        title: "Solar Photovoltaic Export",
        region: "Qinghai",
        expectedReturn: "10.0% IRR",
        status: "up",
        description: "Mass-scale solar panel production for global markets.",
        isoCodes: ["CN"]
      }
    ],
    kpisAndReports: [
      { title: "GDP Growth Rate", impact: "High", value: "5.0%", rep: "Pan Gongsheng", org: "PBOC" },
      { title: "Tech R&D Spending", impact: "High", value: "$450B", rep: "Secretary", org: "MOST" },
      { title: "Foreign Direct Investment", impact: "Medium", value: "$160B", rep: "Director", org: "SAFE" }
    ],
    tableData: [
      { id: "1", entity: "CSI 300 Index", rating: "N/A", inflow: "-$12B", risk: "High", yield: "8.5%" },
      { id: "2", entity: "Gov Bonds (10Y)", rating: "A+", inflow: "+$45B", risk: "Low", yield: "2.4%" },
      { id: "3", entity: "PBoC Liquidity", rating: "N/A", inflow: "+$100B", risk: "Low", yield: "2.1%" }
    ]
  },
  JO: {
    bestTarget: {
      label: "Strategic Opportunity",
      name: "Aqaba Port & Logistics Hub",
      score: 92.4,
      details: "Expansion of maritime trade corridors and special economic zone incentives for regional distribution.",
      timestamp: "Updated: Weekly"
    },
    topOpportunities: [
      {
        title: "Dead Sea Hospitality",
        region: "Jordan Valley",
        expectedReturn: "9.5% ROI",
        status: "stable",
        description: "Boutique eco-resorts and wellness infrastructure.",
        isoCodes: ["JO"]
      },
      {
        title: "National Water Carrier",
        region: "Amman/Aqaba",
        expectedReturn: "7.2% Yield",
        status: "up",
        description: "Public-private partnership for long-term water security infrastructure.",
        isoCodes: ["JO"],
        imageUrl: "/assets/images/mock/jordan_desalination.png"
      }
    ],
    kpisAndReports: [
      { title: "Tourism Growth", impact: "High", value: "+15.4%", rep: "JTB Strategy", org: "Jordan Tourism Board" },
      { title: "FDI Inflow", impact: "Medium", value: "$1.2B", rep: "Investment Min", org: "MoI" }
    ],
    tableData: [
      { id: "1", entity: "Public Treasury Bills", rating: "B+", inflow: "+$500M", risk: "High", yield: "8.2%" },
      { id: "2", entity: "ASE Index", rating: "N/A", inflow: "+$120M", risk: "Medium", yield: "5.5%" }
    ]
  },
  IN: {
    bestTarget: {
      label: "High-Growth Target",
      name: "Renewable Energy Grid",
      score: 96.8,
      details: "World-leading solar capacity expansion and green hydrogen ecosystem development.",
      timestamp: "Updated: Daily"
    },
    topOpportunities: [
      {
        title: "Tech Infrastructure (BLR/HYD)",
        region: "South India",
        expectedReturn: "18.0% IRR",
        status: "up",
        description: "Cloud and AI data centers for global enterprise service export.",
        isoCodes: ["IN"],
        imageUrl: "/assets/images/mock/india_tech_hub.png"
      },
      {
        title: "Fintech Ecosystems",
        region: "National",
        expectedReturn: "25.0% IRR",
        status: "up",
        description: "Scaling UPI-integrated consumer and merchant services.",
        isoCodes: ["IN"]
      }
    ],
    kpisAndReports: [
      { title: "Quarterly FDI Inflow", impact: "High", value: "$18.5B", rep: "RBI Director", org: "RBI" },
      { title: "MSME Credit Growth", impact: "Medium", value: "+14%", rep: "Finance Min", org: "MoF" }
    ],
    tableData: [
      { id: "1", entity: "Nifty 50", rating: "N/A", inflow: "+$12B", risk: "Medium", yield: "12.2%" },
      { id: "2", entity: "Sovereign Green Bonds", rating: "BBB-", inflow: "+$5B", risk: "Low", yield: "7.1%" }
    ]
  },
  SA: {
    bestTarget: {
      label: "Best Country to Invest In",
      name: "NEOM & Giga-Projects",
      score: 98.2,
      details: "Unparalleled scale of infrastructure and urban development projects under Vision 2030.",
      timestamp: "Updated: Live 24/7"
    },
    topOpportunities: [
      {
        title: "Entertainment & Sports",
        region: "Qiddiya",
        expectedReturn: "14.5% IRR",
        status: "up",
        description: "Massive scale theme parks and sports city developments.",
        isoCodes: ["SA"]
      },
      {
        title: "Mining & Mineral Ext.",
        region: "Western Region",
        expectedReturn: "11.0% IRR",
        status: "up",
        description: "Extraction of critical minerals for EV supply chains.",
        isoCodes: ["SA"],
        imageUrl: "/assets/images/mock/lithium_mining.png"
      }
    ],
    kpisAndReports: [
      { title: "PIF Assets Under Mgmt", impact: "High", value: "$770B", rep: "H.E. Yasir Al-Rumayyan", org: "PIF" },
      { title: "Non-Oil Revenue Growth", impact: "High", value: "+4.8%", rep: "Finance Min", org: "MoF" }
    ],
    tableData: [
      { id: "1", entity: "Saudi Aramco", rating: "A1", inflow: "+$20B", risk: "Low", yield: "4.8%" },
      { id: "2", entity: "TASI Index", rating: "N/A", inflow: "+$8B", risk: "Medium", yield: "3.5%" }
    ]
  },
  RU: {
    bestTarget: {
      label: "Domestic Pivot",
      name: "Arctic Logistics Corridor",
      score: 82.5,
      details: "Northern Sea Route development for strategic energy transit to Asian markets.",
      timestamp: "Updated: Monthly"
    },
    topOpportunities: [
      {
        title: "Import Substitution Tech",
        region: "Moscow/SPB",
        expectedReturn: "N/A (Sovereign)",
        status: "stable",
        description: "Localized software and hardware development for state-critical infra.",
        isoCodes: ["RU"]
      }
    ],
    kpisAndReports: [
      { title: "Capital Flight Volume", impact: "High", value: "Decreasing", rep: "CBR Analyst", org: "CBR" },
      { title: "Export Transit Surplus", impact: "Medium", value: "$65B", rep: "Rosatom Chief", org: "Rosatom" }
    ],
    tableData: [
      { id: "1", entity: "OFZ Bonds", rating: "Restricted", inflow: "N/A", risk: "Extreme", yield: "16.5%" },
      { id: "2", entity: "MOEX Index", rating: "N/A", inflow: "N/A", risk: "High", yield: "9.2%" }
    ]
  }
};



export const assetTimeline = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const assetHistory: Record<string, number[][]> = {
  "Sovereign Green Bonds": [
    [100, 105, 98, 107], [105, 103, 101, 108], [103, 108, 102, 110], [108, 110, 106, 112],
    [110, 115, 109, 118], [115, 112, 111, 116], [112, 118, 110, 120], [118, 122, 117, 125],
    [122, 120, 118, 124], [120, 125, 119, 127], [125, 130, 124, 132], [130, 135, 128, 138]
  ],
  "Semiconductor Infrastructure": [
    [200, 210, 195, 215], [210, 205, 200, 212], [205, 220, 203, 225], [220, 235, 218, 240],
    [235, 230, 225, 238], [230, 250, 228, 255], [250, 270, 245, 275], [270, 265, 260, 272],
    [265, 280, 263, 285], [280, 295, 278, 300], [295, 310, 290, 315], [310, 325, 305, 330]
  ],
  "Lithium Supply Chain": [
    [150, 140, 135, 155], [140, 145, 138, 150], [145, 160, 142, 165], [160, 155, 150, 162],
    [155, 170, 153, 175], [170, 185, 168, 190], [185, 180, 175, 188], [180, 195, 178, 200],
    [195, 210, 192, 215], [210, 205, 200, 212], [205, 220, 203, 225], [220, 240, 215, 245]
  ],
  "Abu Dhabi Sovereign Cloud": [
    [300, 310, 298, 315], [310, 325, 305, 330], [325, 320, 315, 335], [320, 340, 318, 345],
    [340, 360, 335, 365], [360, 355, 350, 368], [355, 375, 352, 380], [375, 390, 370, 395],
    [390, 410, 385, 415], [410, 405, 400, 412], [405, 425, 402, 430], [425, 450, 420, 455]
  ],
  "Clean Energy Grids": [
    [120, 125, 118, 128], [125, 130, 122, 135], [130, 128, 125, 133], [128, 135, 126, 140],
    [135, 145, 134, 148], [145, 142, 140, 150], [142, 155, 140, 160], [155, 165, 152, 170],
    [165, 162, 160, 168], [162, 175, 160, 180], [175, 185, 174, 190], [185, 200, 182, 205]
  ],
  "Luxury Real Estate": [
    [500, 510, 495, 515], [510, 520, 505, 525], [520, 515, 510, 530], [515, 535, 512, 540],
    [535, 550, 530, 555], [550, 545, 540, 560], [545, 565, 542, 570], [565, 580, 560, 590],
    [580, 595, 575, 600], [595, 590, 585, 605], [590, 610, 588, 620], [610, 630, 605, 640]
  ]
};