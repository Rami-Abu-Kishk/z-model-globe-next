export interface CompanyProject {
  id: string;
  name: string;
  category: string;
  status: 'Ongoing' | 'Completed' | 'Strategic';
  value: string;
}

export interface CompanyCard {
  id: string;
  name: string;
  ticker?: string;
  financials: string;
  auditStatus: string;
  projectsCount: number;
  highlight: string;
  description: string;
  financialHistory: { month: string; value: number }[];
  mainProjects: CompanyProject[];
}

export const groupCompanies: CompanyCard[] = [
  {
    id: "G1",
    name: "IHC",
    ticker: "IHC:ADX",
    financials: "AED 340B Assets",
    auditStatus: "Verified",
    projectsCount: 142,
    highlight: "Diversified Expansion",
    description: "International Holding Company is one of the world's fastest-growing holding companies with a global presence.",
    financialHistory: [
      { month: 'Jan', value: 310 }, { month: 'Feb', value: 315 }, { month: 'Mar', value: 330 }, { month: 'Apr', value: 340 }
    ],
    mainProjects: [
      { id: "P1", name: "Alpha Energy Port", category: "Energy", status: "Ongoing", value: "AED 12B" },
      { id: "P2", name: "Global Logistics Hub", category: "Logistics", status: "Strategic", value: "AED 8.5B" },
    ]
  },
  {
    id: "G2",
    name: "Royal Group",
    financials: "AED 210B AUM",
    auditStatus: "Verified",
    projectsCount: 85,
    highlight: "Strategic Investments",
    description: "A prominent conglomerate driven by long-term value creation across multiple asset classes.",
    financialHistory: [
      { month: 'Jan', value: 195 }, { month: 'Feb', value: 200 }, { month: 'Mar', value: 205 }, { month: 'Apr', value: 210 }
    ],
    mainProjects: [
      { id: "P3", name: "Horizon Smart City", category: "Real Estate", status: "Ongoing", value: "AED 15B" },
      { id: "P4", name: "Food Security Initiative", category: "Agri-Tech", status: "Completed", value: "AED 4.2B" },
    ]
  },
  {
    id: "G3",
    name: "G42",
    financials: "Tech Leader",
    auditStatus: "Audited",
    projectsCount: 56,
    highlight: "AI Supremacy",
    description: "An AI and cloud computing powerhouse transforming industries through foundational intelligence.",
    financialHistory: [
      { month: 'Jan', value: 45 }, { month: 'Feb', value: 48 }, { month: 'Mar', value: 52 }, { month: 'Apr', value: 65 }
    ],
    mainProjects: [
      { id: "P5", name: "Jais 2.0 LLM", category: "AI", status: "Ongoing", value: "N/A" },
      { id: "P6", name: "Bio-Genomics Bank", category: "Health", status: "Strategic", value: "AED 2.8B" },
    ]
  },
  {
    id: "G4",
    name: "ADIA",
    financials: "$850B Est. Assets",
    auditStatus: "Governed",
    projectsCount: 1200,
    highlight: "Global Sovereign",
    description: "One of the world's largest sovereign wealth funds, investing for the future of Abu Dhabi.",
    financialHistory: [
      { month: 'Jan', value: 820 }, { month: 'Feb', value: 835 }, { month: 'Mar', value: 842 }, { month: 'Apr', value: 850 }
    ],
    mainProjects: [
      { id: "P7", name: "Asian Infra Bond", category: "Finance", status: "Strategic", value: "USD 5B" },
      { id: "P8", name: "Green European Energy", category: "Renewables", status: "Ongoing", value: "EUR 3.4B" },
    ]
  },
];

