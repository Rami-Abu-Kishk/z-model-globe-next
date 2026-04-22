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

export interface InvestmentReport {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  org: string;
  author: string;
  date: string;
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
    pdfReportData?: {
      summary: string;
      highlights: { title: string; detail: string }[];
      metrics: { label: string; value: string; trend?: string }[];
      downloadUrl: string;
    };
  };
  topOpportunities: Opportunity[];
  kpis: KpiReport[];
  reports: InvestmentReport[];
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
      imageUrl: "/assets/images/mock/uae_investment_hero.png",
      pdfReportData: {
        summary: "The United Arab Emirates (UAE) presents a highly attractive, affluent investment landscape characterized by strong government support, a low-tax environment, and world-class infrastructure. While the overall investment climate is robust, investors should diversify across sectors to mitigate localized risks such as slowing consumption and export growth.",
        highlights: [
          { title: "Macroeconomic Profile", detail: "GDP & Wealth: $504.17 Billion (Per Capita: ~$53,000) across a population of 9.52 Million. Growth & Stability: Projected GDP growth of 4.0% for 2024, supported by a highly stable inflation rate of 1.66% and low unemployment at 2.13%. Foreign Direct Investment (FDI): Strong international footprint with an FDI rate of 8.5%." },
          { title: "Investment Climate & Key Trends", detail: "The UAE scores a strong 81.4 on the Investment Climate index, bolstered by perfect scores in transportation infrastructure, telecommunications, and tax burden. Positive KPI Trends: Significant improvements in Digitalization (↑13.75%) and massive drops in Crime (↓85.15%) and Government Debt Growth (↓99.48%). The Business Environment Index remains highly stable." },
          { title: "Strategic Risks & Watch-Outs", detail: "The report warns of challenges regarding investment growth momentum and potential currency depreciation. Corresponding KPIs also show sharp declines in Consumption Growth (↓88.98%) and Export Growth (↓75.54%)." },
          { title: "Top Strategic Opportunities", detail: "The highest-value sector for capital allocation is Financial Services, though high-yield opportunities span multiple industries. Industry & Manufacturing: EDB Industrial Mobilization Program — $16.34B pipeline | 8-14% ROI. Financial Services (Top Value Sector): EDB Industrial & Green Financing Pipeline — $16.30B | 5-9% ROI. UAE National Investment Fund — $10.00B | 6-12% ROI. Infrastructure: Abu Dhabi Multi-Project PPP — $12.80B | 5-12% ROI, Dubai Strategic Sewerage Tunnel — 6-10% ROI. Renewable Energy: Masdar + EWEC Solar PV + BESS Gigascale Project — 6-12% ROI." },
          { title: "Strategic Takeaway", detail: "The UAE offers fertile ground for investors. Capitalizing on infrastructure and green financing pipelines while maintaining a diversified portfolio is the optimal strategy to navigate the slight dips in localized consumption and export momentum." }
        ],
        metrics: [
          { label: "GDP growth", value: "4.0%", trend: "up" },
          { label: "Inflation rate", value: "1.66%", trend: "stable" },
          { label: "Unemployment", value: "2.13%", trend: "down" },
          { label: "FDI Interest", value: "8.5%", trend: "up" }
        ],
        downloadUrl: "/files/Report - Country Card for UAE.pdf"
      }
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
    kpis: [
      {
        title: "Global Investment",
        impact: "High",
        value: "$18.5 Trillion",
        rep: "Makhtar Diop",
        org: "World Bank",
        insightData: {
          org: "World Bank",
          unit: "$T",
          historicalData: [16.2, 16.8, 17.5, 17.9, 18.5],
          forecastData: [18.5, 19.4, 20.8, 22.5, 24.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Global capital formation has seen a steady 4% CAGR, supported by the massive expansion of the digital economy and energy transition infrastructure.",
            forecast: "Z-Model projections indicate a significant acceleration as frontier markets stabilize and AI-driven industrialization triples ROI in emerging hubs."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "+14.2%" },
            forecast: { confidence: "87.5%", delta: "+34.0%" }
          }
        }
      },
      {
        title: "Global Investment Growth",
        impact: "High",
        value: "3.2%",
        rep: "Gita Gopinath",
        org: "IMF",
        insightData: {
          org: "IMF",
          unit: "%",
          historicalData: [2.1, 2.4, 2.8, 3.0, 3.2],
          forecastData: [3.2, 3.5, 3.9, 4.2, 4.6],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Growth rates have been resilient despite aggressive monetary tightening, primarily fueled by public sector investment in 'CHIPS' and 'IRA' equivalent acts globally.",
            forecast: "The shift from interest-rate volatility to productivity-driven growth is expected to push global investment expansion north of 4.5% by 2030."
          },
          stats: {
            historical: { confidence: "98.5%", delta: "+52.3%" },
            forecast: { confidence: "89.2%", delta: "+43.7%" }
          }
        }
      },
      {
        title: "Global FDI Inflows",
        impact: "High",
        value: "$1.4 Trillion",
        rep: "Rebeca Grynspan",
        org: "UNCTAD",
        insightData: {
          org: "UNCTAD",
          unit: "$T",
          historicalData: [1.2, 1.3, 1.5, 1.4, 1.4],
          forecastData: [1.4, 1.6, 1.9, 2.3, 2.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "FDI flows have plateaued due to logistical decoupling and geopolitical friction, leading to more regionalized investment corridors.",
            forecast: "A major rebound is forecasted as sovereign cloud corridors and digital trade bridges (like the IMEC) simplify cross-border capital friction."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "-6.7%" },
            forecast: { confidence: "85.4%", delta: "+100.0%" }
          }
        }
      },
      {
        title: "Global External Debt",
        impact: "Medium",
        value: "$92 Trillion",
        rep: "Emre Tiftik",
        org: "IIF",
        insightData: {
          org: "IIF",
          unit: "$T",
          historicalData: [84, 86, 89, 91, 92],
          forecastData: [92, 94, 95, 96, 97],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Debt levels reached historic highs as governments financed recovery and subsidies. High-interest environments have made serviceability a top priority for SWFs.",
            forecast: "We project a deleveraging phase as AI efficiency gains improve GDP-to-debt ratios, allowing for a gradual reduction in sovereign credit risk premiums."
          },
          stats: {
            historical: { confidence: "97.8%", delta: "+9.5%" },
            forecast: { confidence: "82.1%", delta: "+5.4%" }
          }
        }
      },
      {
        title: "Global Savings",
        impact: "Medium",
        value: "26.5%",
        rep: "Indermit Gill",
        org: "World Bank",
        insightData: {
          org: "World Bank",
          unit: "%",
          historicalData: [25.4, 25.8, 26.2, 26.4, 26.5],
          forecastData: [26.5, 27.2, 28.1, 29.5, 31.2],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Global savings rates have remained stable, with high accumulation in surplus economies (GCC, East Asia) offsetting consumption-driven debt in the West.",
            forecast: "Automation-led cost reduction is expected to increase net margin for corporations, leading to a structural rise in global gross savings and reinvestment capacity."
          },
          stats: {
            historical: { confidence: "98.2%", delta: "+4.3%" },
            forecast: { confidence: "91.5%", delta: "+17.7%" }
          }
        }
      }
    ],
    reports: [
      {
        id: "rep-1",
        title: "Accelerating Investment",
        description: "Comprehensive audit of global capital allocation strategies and efficiency vectors for 2026.",
        fileUrl: "/files/Accelerating-Investment.pdf",
        org: "Z-Model Digital",
        author: "World Bank",
        date: "Apr 2026"
      }
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
      label: "Prime Investment Target",
      name: "United Arab Emirates",
      score: 99.1,
      details: "Premier global hub for sovereign capital and AI innovation, supported by a world-class regulatory framework.",
      timestamp: "Updated: Live 24/7",
      imageUrl: "/assets/images/mock/uae_investment_hero.png",
      pdfReportData: {
        summary: "The United Arab Emirates (UAE) presents a highly attractive, affluent investment landscape characterized by strong government support, a low-tax environment, and world-class infrastructure. While the overall investment climate is robust, investors should diversify across sectors to mitigate localized risks such as slowing consumption and export growth.",
        highlights: [
          { title: "Macroeconomic Profile", detail: "GDP & Wealth: $504.17 Billion (Per Capita: ~$53,000) across a population of 9.52 Million. Growth & Stability: Projected GDP growth of 4.0% for 2024, supported by a highly stable inflation rate of 1.66% and low unemployment at 2.13%. Foreign Direct Investment (FDI): Strong international footprint with an FDI rate of 8.5%." },
          { title: "Investment Climate & Key Trends", detail: "The UAE scores a strong 81.4 on the Investment Climate index, bolstered by perfect scores in transportation infrastructure, telecommunications, and tax burden. Positive KPI Trends: Significant improvements in Digitalization (↑13.75%) and massive drops in Crime (↓85.15%) and Government Debt Growth (↓99.48%). The Business Environment Index remains highly stable." },
          { title: "Strategic Risks & Watch-Outs", detail: "The report warns of challenges regarding investment growth momentum and potential currency depreciation. Corresponding KPIs also show sharp declines in Consumption Growth (↓88.98%) and Export Growth (↓75.54%)." },
          { title: "Top Strategic Opportunities", detail: "The highest-value sector for capital allocation is Financial Services, though high-yield opportunities span multiple industries. Industry & Manufacturing: EDB Industrial Mobilization Program — $16.34B pipeline | 8-14% ROI. Financial Services (Top Value Sector): EDB Industrial & Green Financing Pipeline — $16.30B | 5-9% ROI. UAE National Investment Fund — $10.00B | 6-12% ROI. Infrastructure: Abu Dhabi Multi-Project PPP — $12.80B | 5-12% ROI, Dubai Strategic Sewerage Tunnel — 6-10% ROI. Renewable Energy: Masdar + EWEC Solar PV + BESS Gigascale Project — 6-12% ROI." },
          { title: "Strategic Takeaway", detail: "The UAE offers fertile ground for investors. Capitalizing on infrastructure and green financing pipelines while maintaining a diversified portfolio is the optimal strategy to navigate the slight dips in localized consumption and export momentum." }
        ],
        metrics: [
          { label: "GDP growth", value: "4.0%", trend: "up" },
          { label: "Inflation rate", value: "1.66%", trend: "stable" },
          { label: "Unemployment", value: "2.13%", trend: "down" },
          { label: "FDI Interest", value: "8.5%", trend: "up" }
        ],
        downloadUrl: "/files/Report - Country Card for UAE.pdf"
      }
    },
    topOpportunities: [
      {
        title: "EDB Industrial Mobilization",
        region: "UAE Global",
        expectedReturn: "8-14% ROI",
        status: "up",
        description: "Emirates Development Bank program focusing on industry and manufacturing mobilization.",
        isoCodes: ["AE"],
        imageUrl: "/assets/images/mock/uae_ai_datacenter.png"
      },
      {
        title: "Abu Dhabi Multi-Project PPP",
        region: "Abu Dhabi",
        expectedReturn: "5-12% ROI",
        status: "up",
        description: "Major infrastructure public-private partnership pipeline across the capital.",
        isoCodes: ["AE"],
        imageUrl: "/assets/images/mock/green_energy_bonds.png"
      },
      {
        title: "Masdar Solar PV + BESS",
        region: "National",
        expectedReturn: "6-12% ROI",
        status: "up",
        description: "Gigascale renewable energy initiative integrating Solar PV and Battery Storage.",
        isoCodes: ["AE"]
      }
    ],
    kpis: [
      {
        title: "UAE Investment",
        impact: "High",
        value: "28.5% of GDP",
        rep: "Abdulla bin Touq",
        org: "Ministry of Economy",
        insightData: {
          org: "Ministry of Economy",
          unit: "%",
          // Historical: calibrated to reach 28.5% by 2026 as per uae.txt
          historicalData: [24.8, 25.5, 26.2, 27.1, 27.8],
          // Forecast from uae.txt: 2026=28.5, 2027=29.1, 2028=29.7, 2029=30.2, 2030=30.6
          forecastData: [28.5, 29.1, 29.7, 30.2, 30.6],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE's investment ratio has steadily climbed from ~24.8% of GDP in 2021, driven by infrastructure buildout, digital economy programs, and the D33 industrial strategy. Advanced manufacturing and logistics attracted the lion's share of non-oil capital.",
            forecast: "The investment ratio is projected to rise gradually to 30.6% by 2030. Key drivers include infrastructure capex, data centers, clean-energy buildout, power grid reinforcement, and advanced manufacturing under Operation 300bn. The National Investment Strategy 2031 and CEPA corridors provide structural tailwinds for continued expansion."
          },
          stats: {
            historical: { confidence: "99.4%", delta: "+12.0%" },
            forecast: { confidence: "93.1%", delta: "+7.4%" }
          }
        }
      },
      {
        title: "UAE Investment Growth",
        impact: "High",
        value: "7.4%",
        rep: "Mohamed Al Shorafa",
        org: "UAE Gov",
        insightData: {
          org: "ADDED",
          unit: "%",
          // Historical: strong growth cycle pre-2026
          historicalData: [8.5, 9.2, 7.8, 7.2, 7.4],
          // Forecast from uae.txt: 2026=6.8, 2027=6.3, 2028=6.0, 2029=5.6, 2030=5.3
          forecastData: [6.8, 6.3, 6.0, 5.6, 5.3],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "Investment growth peaked during the intense infrastructure buildout cycle of 2021–2022, fueled by public balance sheet strength and accelerating FDI momentum. Figures normalized toward a still-healthy 7.4% by 2025 as priority projects transitioned from planning to execution.",
            forecast: "Investment growth is strongest in 2026–2027 (6.8–6.3%), then moderates as the expansion matures from build-out into scaling. This is not bearish — it reflects a move from first-burst capex to a normalized growth pace. Lower borrowing costs, strong public finances, and FDI execution sustain each year's still-healthy contribution to the capital base."
          },
          stats: {
            historical: { confidence: "98.8%", delta: "-12.8%" },
            forecast: { confidence: "92.5%", delta: "-22.1%" }
          }
        }
      },
      {
        title: "Foreign direct investment, net inflows",
        impact: "High",
        value: "7.8% of GDP",
        rep: "Issam Abousleiman",
        org: "World Bank",
        insightData: {
          org: "UNCTAD",
          unit: "%",
          // Historical: calibrated to approach 7.8% by 2026 per uae.txt
          historicalData: [5.8, 6.2, 6.5, 6.9, 7.2],
          // Forecast from uae.txt: 2026=7.8, 2027=8.0, 2028=8.2, 2029=8.4, 2030=8.5
          forecastData: [7.8, 8.0, 8.2, 8.4, 8.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE has sustained one of the highest FDI-to-GDP ratios in the world, rising from 5.8% in 2021 to 7.2% in 2025. The Strategic 'Free Zone' framework and Golden Visa program have captured 40% of all MENA inflows.",
            forecast: "FDI stays high by international standards and trends modestly upward to 8.5% by 2030 — one of the UAE's clearest structural strengths. Official targets include annual FDI inflows of AED 240B by 2031. UNCTAD data and official UAE sources confirm very strong recent performance, backed by the National Investment Strategy."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "+24.1%" },
            forecast: { confidence: "91.2%", delta: "+18.1%" }
          }
        }
      },
      {
        title: "Lending Interest Rate",
        impact: "Medium",
        value: "5.1%",
        rep: "Khaled Mohamed Al Tameemi",
        org: "Central Bank UAE",
        insightData: {
          org: "Central Bank UAE",
          unit: "%",
          // Historical: high-rate environment aligned to US Fed cycle (dirham peg)
          historicalData: [3.5, 4.2, 5.5, 5.8, 5.1],
          // Forecast from uae.txt: 2026=5.1, 2027=4.8, 2028=4.7, 2029=4.8, 2030=5.0
          forecastData: [5.1, 4.8, 4.7, 4.8, 5.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "Lending rates rose sharply from 3.5% in 2021 to a peak of 5.8% in 2024 as the UAE directly transmitted the US Fed's aggressive tightening cycle via its dirham peg. By 2025, rates eased slightly to 5.5% as global inflation moderated.",
            forecast: "Lending rates decline gradually in early years (to 4.7% by 2028) as global inflation eases and monetary policy normalizes. Rates then restabilize around 4.8–5.0%, supported by strong domestic credit demand from the investment expansion and non-oil sector growth. Global structural shifts — higher fiscal spending and energy/tech investment — limit any significant further decline in borrowing costs."
          },
          stats: {
            historical: { confidence: "99.7%", delta: "-0.4%" },
            forecast: { confidence: "91.5%", delta: "-0.1%" }
          }
        }
      },
      {
        title: "UAE Savings",
        impact: "High",
        value: "41.2% of GDP",
        rep: "Hanan Ahli",
        org: "FCSC",
        insightData: {
          org: "FCSC",
          unit: "%",
          // Historical: very high savings, leveling off as domestic investment absorbs more capital
          historicalData: [42.5, 42.8, 41.9, 41.5, 41.2],
          // Forecast from uae.txt: 2026=40.5, 2027=40.0, 2028=39.6, 2029=39.1, 2030=38.7
          forecastData: [40.5, 40.0, 39.6, 39.1, 38.7],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE has maintained exceptional savings rates above 41%, driven by windfall oil revenues, sovereign wealth fund accumulation, and efficient corporate reinvestment. World Bank data confirm very high recent gross domestic savings as a share of GDP.",
            forecast: "The savings ratio edges down slightly (40.5% → 38.7%) as more domestic capital is absorbed by the investment expansion. This is consistent with an economy retaining large external and fiscal buffers while channeling a bigger share of income into domestic growth. The IMF notes a strong external position and large current-account surplus underpinning this transition."
          },
          stats: {
            historical: { confidence: "99.2%", delta: "-3.1%" },
            forecast: { confidence: "93.4%", delta: "-4.4%" }
          }
        }
      }
    ],
    reports: [
      {
        id: "rep-uae-1",
        title: "Report - Country Card for UAE",
        description: "Official investment profile: GDP $504B, Growth 4.0%, and strategic sector analysis.",
        fileUrl: "/files/Report - Country Card for UAE.pdf",
        org: "Z-Model Research",
        author: "AI Analyst",
        date: "Apr 2026"
      },
      {
        id: "rep-2",
        title: "Accelerating Investment",
        description: "Strategic audit of UAE industry mobilization and green financing pipelines.",
        fileUrl: "/files/Accelerating-Investment.pdf",
        org: "Z-Model Digital",
        author: "World Bank",
        date: "Apr 2026"
      }
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
    kpis: [
      {
        title: "US Investment",
        impact: "High",
        value: "$2.1 Trillion",
        rep: "Philip Jefferson",
        org: "Federal Reserve",
        insightData: {
          org: "BEA",
          unit: "$T",
          historicalData: [1.8, 1.9, 2.0, 2.05, 2.1],
          forecastData: [2.1, 2.3, 2.6, 2.9, 3.4],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Venture Capital and CAPEX in semiconductor fabrication have reached all-time highs following federal subsidy programs.",
            forecast: "The US is projected to retain its status as the world's primary AI R&D hub, attracting massive private equity rotation into enterprise automation."
          },
          stats: {
            historical: { confidence: "99.8%", delta: "+16.7%" },
            forecast: { confidence: "91.2%", delta: "+61.9%" }
          }
        }
      },
      {
        title: "US Investment Growth",
        impact: "High",
        value: "2.1%",
        rep: "Clare Lombardelli",
        org: "OECD",
        insightData: {
          org: "OECD",
          unit: "%",
          historicalData: [1.2, 1.5, 1.8, 1.9, 2.1],
          forecastData: [2.1, 2.4, 2.8, 3.2, 3.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Growth has been tempered by historically high interest rates, though structural demand for AI infrastructure has provide a resilient floor.",
            forecast: "Monetary easing and the maturity of onshored manufacturing projects are expected to drive a growth surge starting in 2027."
          },
          stats: {
            historical: { confidence: "98.5%", delta: "+75.0%" },
            forecast: { confidence: "87.1%", delta: "+81.0%" }
          }
        }
      },
      {
        title: "US FDI Inflows",
        impact: "High",
        value: "$285 Billion",
        rep: "Gina Raimondo",
        org: "Dept of Commerce",
        insightData: {
          org: "UNCTAD",
          unit: "$B",
          historicalData: [240, 260, 275, 280, 285],
          forecastData: [285, 310, 345, 390, 450],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "The US continues to lead global FDI capture, particularly from European and Asian tech firms seeking proximity to the Silicon Valley ecosystem.",
            forecast: "Strategic green energy projects and domestic fab expansions will continue to attract high-conviction foreign capital."
          },
          stats: {
            historical: { confidence: "99.2%", delta: "+18.8%" },
            forecast: { confidence: "89.5%", delta: "+57.9%" }
          }
        }
      },
      {
        title: "US External Debt",
        impact: "High",
        value: "$34 Trillion",
        rep: "Janet Yellen",
        org: "US Treasury",
        insightData: {
          org: "Treasury",
          unit: "$T",
          historicalData: [28, 30, 32, 33, 34],
          forecastData: [34, 36, 38, 41, 45],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Sovereign debt levels remain a topic of intense debate, though demand for Treasuries as the world's risk-free asset remains unparalleled.",
            forecast: "Continued fiscal deficits are projected to drive debt higher, requiring innovative debt-servicing frameworks via productivity gains."
          },
          stats: {
            historical: { confidence: "100.0%", delta: "+21.4%" },
            forecast: { confidence: "84.3%", delta: "+32.4%" }
          }
        }
      },
      {
        title: "US Savings",
        impact: "Medium",
        value: "17.4%",
        rep: "Vipin Arora",
        org: "BEA",
        insightData: {
          org: "BEA",
          unit: "%",
          historicalData: [16.2, 16.5, 17.0, 17.2, 17.4],
          forecastData: [17.4, 17.8, 18.5, 19.4, 21.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Household and corporate savings have stabilized after pandemic-era fluctuations, though debt servicing is eating into net margins.",
            forecast: "A shift towards more automated businesses is expected to increase corporate retained earnings, lifting the national gross savings rate."
          },
          stats: {
            historical: { confidence: "98.9%", delta: "+7.4%" },
            forecast: { confidence: "88.2%", delta: "+20.7%" }
          }
        }
      }
    ],
    reports: [],
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
    kpis: [
      {
        title: "China Investment",
        impact: "High",
        value: "$5.8 Trillion",
        rep: "Zhang Qingsong",
        org: "PBOC",
        insightData: {
          org: "PBOC",
          unit: "$T",
          historicalData: [5.2, 5.4, 5.6, 5.7, 5.8],
          forecastData: [5.8, 6.2, 6.8, 7.5, 8.4],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Investment has pivoted from infrastructure and property towards the 'New Three' (EVs, Batteries, Renewables).",
            forecast: "State-led capital is projected to dominate global supply chains for the energy transition, despite demographic headwinds."
          },
          stats: {
            historical: { confidence: "98.5%", delta: "+11.5%" },
            forecast: { confidence: "86.2%", delta: "+44.8%" }
          }
        }
      },
      {
        title: "China Investment Growth",
        impact: "High",
        value: "4.2%",
        rep: "Zheng Shanjie",
        org: "NDRC",
        insightData: {
          org: "NDRC",
          unit: "%",
          historicalData: [5.9, 5.1, 4.8, 4.5, 4.2],
          forecastData: [4.2, 4.0, 3.9, 4.2, 4.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "A slowing trend as the economy matures and moves away from debt-fueled property expansion.",
            forecast: "A U-shaped recovery is expected as high-tech manufacturing productivity offsets the decline in traditional sectors."
          },
          stats: {
            historical: { confidence: "97.1%", delta: "-28.8%" },
            forecast: { confidence: "82.5%", delta: "+14.3%" }
          }
        }
      },
      {
        title: "China FDI Inflows",
        impact: "Medium",
        value: "$160 Billion",
        rep: "Fu Hua",
        org: "SAFE",
        insightData: {
          org: "UNCTAD",
          unit: "$B",
          historicalData: [180, 189, 175, 168, 160],
          forecastData: [160, 155, 150, 158, 175],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Decreasing trend as Western firms de-risk and friend-shore, though high-end manufacturing remains a strong pull for European capital.",
            forecast: "Stabilization is expected as China opens more service sectors to foreign ownership and standardizes cross-border data transfer."
          },
          stats: {
            historical: { confidence: "96.4%", delta: "-11.1%" },
            forecast: { confidence: "81.0%", delta: "+9.4%" }
          }
        }
      },
      {
        title: "China External Debt",
        impact: "Medium",
        value: "$2.4 Trillion",
        rep: "Pan Gongsheng",
        org: "PBOC",
        insightData: {
          org: "SAFE",
          unit: "$T",
          historicalData: [2.1, 2.3, 2.4, 2.45, 2.4],
          forecastData: [2.4, 2.3, 2.2, 2.1, 2.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "China maintains a strong external position with robust FX reserves. Debt levels are manageable and primarily trade-related.",
            forecast: "We project a gradual deleveraging as China promotes more Renminbi-denominated trade and credit settlements."
          },
          stats: {
            historical: { confidence: "98.8%", delta: "+14.3%" },
            forecast: { confidence: "89.2%", delta: "-16.7%" }
          }
        }
      },
      {
        title: "China Savings",
        impact: "High",
        value: "44.5%",
        rep: "Han Wenxiu",
        org: "Zhongnanhai",
        insightData: {
          org: "World Bank",
          unit: "%",
          historicalData: [45.8, 45.4, 45.1, 44.8, 44.5],
          forecastData: [44.5, 43.8, 42.5, 41.0, 40.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "China's savings rate remains the highest among major economies, providing a massive domestic pool for state investment.",
            forecast: "A gradual decline is expected as'Social Security' improvements and the transition to a consumption-led model encourage household spending."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "-2.8%" },
            forecast: { confidence: "90.5%", delta: "-10.1%" }
          }
        }
      }
    ],
    reports: [],
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
    kpis: [
      {
        title: "Jordan Investment",
        impact: "High",
        value: "$8.4 Billion",
        rep: "Z-Model Analyst",
        org: "CBJ",
        insightData: {
          org: "Central Bank of Jordan",
          unit: "$B",
          historicalData: [6.8, 7.2, 7.5, 8.0, 8.4],
          forecastData: [8.4, 9.2, 10.5, 12.8, 15.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Investment is concentrated in energy and telecommunications as Jordan modernizes its national digital infrastructure.",
            forecast: "Regional stability and new PPP laws are expected to drive a surge in water and transport infrastructure capital."
          },
          stats: {
            historical: { confidence: "97.5%", delta: "+23.5%" },
            forecast: { confidence: "84.2%", delta: "+84.5%" }
          }
        }
      },
      {
        title: "Jordan Investment Growth",
        impact: "Medium",
        value: "2.4%",
        rep: "Kholoud Saqqaf",
        org: "Min of Investment",
        insightData: {
          org: "Ministry of Investment",
          unit: "%",
          historicalData: [1.5, 1.8, 2.0, 2.2, 2.4],
          forecastData: [2.4, 2.8, 3.5, 4.2, 5.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Steady but slow growth, impacted by regional volatility and high debt-servicing costs.",
            forecast: "The 'Economic Modernization Vision' is projected to double growth as green energy manufacturing matures."
          },
          stats: {
            historical: { confidence: "96.4%", delta: "+60.0%" },
            forecast: { confidence: "81.5%", delta: "+108.3%" }
          }
        }
      },
      {
        title: "Jordan FDI Inflows",
        impact: "High",
        value: "$1.2 Billion",
        rep: "Nayef Al-Fayez",
        org: "JTB Strategy",
        insightData: {
          org: "UNCTAD",
          unit: "$B",
          historicalData: [0.6, 0.8, 1.0, 1.1, 1.2],
          forecastData: [1.2, 1.5, 2.1, 2.8, 3.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "FDI has recovered strongly post-pandemic, primarily from GCC countries investing in Jordan's real estate and tourism.",
            forecast: "Increased interest in Jordan's technology talent and special economic zones (Aqaba) is expected to drive inflows higher."
          },
          stats: {
            historical: { confidence: "98.1%", delta: "+100.0%" },
            forecast: { confidence: "83.4%", delta: "+191.7%" }
          }
        }
      },
      {
        title: "Jordan External Debt",
        impact: "High",
        value: "$38 Billion",
        rep: "Mohamad Al-Ississ",
        org: "MoF",
        insightData: {
          org: "Ministry of Finance",
          unit: "$B",
          historicalData: [32, 34, 36, 37, 38],
          forecastData: [38, 39, 40, 41, 42],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Debt-to-GDP remains at high levels, necessitating close cooperation with the IMF and regional donors.",
            forecast: "A gradual stabilization of the debt ratio is projected as GDP growth outpaces new borrowing under structural reforms."
          },
          stats: {
            historical: { confidence: "99.4%", delta: "+18.8%" },
            forecast: { confidence: "87.1%", delta: "+10.5%" }
          }
        }
      },
      {
        title: "Jordan Savings",
        impact: "Low",
        value: "9.2%",
        rep: "Z-Model Analyst",
        org: "Gov of Jordan",
        insightData: {
          org: "CBJ",
          unit: "%",
          historicalData: [7.5, 8.0, 8.5, 8.8, 9.2],
          forecastData: [9.2, 10.1, 11.5, 13.2, 16.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Low savings rates reflect high consumption and limited disposable income in a high-inflation environment.",
            forecast: "Expanding the formal financial sector and digital payment adoption is expected to increase domestic savings capture."
          },
          stats: {
            historical: { confidence: "97.2%", delta: "+22.7%" },
            forecast: { confidence: "82.4%", delta: "+73.9%" }
          }
        }
      }
    ],
    reports: [],
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
    kpis: [
      {
        title: "India Investment",
        impact: "High",
        value: "$850 Billion",
        rep: "Shaktikanta Das",
        org: "RBI",
        insightData: {
          org: "RBI",
          unit: "$B",
          historicalData: [620, 680, 750, 810, 850],
          forecastData: [850, 980, 1150, 1400, 1850],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Investment is surging in physical infrastructure (Gati Shakti) and digital stack manufacturing.",
            forecast: "India is projected to be the world's primary global manufacturing hub as capital continues to rotate away from traditional nodes."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "+37.1%" },
            forecast: { confidence: "92.4%", delta: "+117.6%" }
          }
        }
      },
      {
        title: "India Investment Growth",
        impact: "High",
        value: "7.0%",
        rep: "Nirmala Sitharaman",
        org: "MoF",
        insightData: {
          org: "Finance Ministry",
          unit: "%",
          historicalData: [6.1, 6.5, 6.8, 6.9, 7.0],
          forecastData: [7.0, 7.2, 7.5, 7.8, 8.2],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "The world's fastest-growing major economy, supported by demographics and massive service exports.",
            forecast: "Continued fiscal consolidation and focus on 'Make in India' are expected to maintain growth above 7%."
          },
          stats: {
            historical: { confidence: "98.8%", delta: "+14.8%" },
            forecast: { confidence: "91.2%", delta: "+17.1%" }
          }
        }
      },
      {
        title: "India FDI Inflows",
        impact: "High",
        value: "$82 Billion",
        rep: "Rajesh Kumar Singh",
        org: "DPIIT",
        insightData: {
          org: "UNCTAD",
          unit: "$B",
          historicalData: [65, 72, 78, 80, 82],
          forecastData: [82, 95, 115, 145, 190],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Record inflows in the tech and renewables sectors as global firms seek to diversify their India-centric supply chains.",
            forecast: "The relaxation of FDI rules in space and defense is expected to attract a new wave of high-tech capital."
          },
          stats: {
            historical: { confidence: "99.4%", delta: "+26.2%" },
            forecast: { confidence: "89.5%", delta: "+131.7%" }
          }
        }
      },
      {
        title: "India External Debt",
        impact: "Medium",
        value: "$625 Billion",
        rep: "V. Anantha Nageswaran",
        org: "CEA",
        insightData: {
          org: "Ministry of Finance",
          unit: "$B",
          historicalData: [570, 590, 610, 620, 625],
          forecastData: [625, 640, 660, 690, 750],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "External debt is predominantly long-term and manageable compared to one of the world's largest FX reserves.",
            forecast: "India's inclusion in global bond indices is expected to increase capital inflows and lower sovereign borrowing costs."
          },
          stats: {
            historical: { confidence: "99.7%", delta: "+9.6%" },
            forecast: { confidence: "92.1%", delta: "+20.0%" }
          }
        }
      },
      {
        title: "India Savings",
        impact: "High",
        value: "30.2%",
        rep: "Z-Model Analyst",
        org: "MoStats",
        insightData: {
          org: "World Bank",
          unit: "%",
          historicalData: [28.5, 29.1, 29.6, 30.0, 30.2],
          forecastData: [30.2, 31.5, 33.2, 35.8, 39.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Household savings have traditionally been the bedrock of India's domestic investment pool.",
            forecast: "The transition to formal banking and digital economy is projected to capture a higher share of the huge unorganized sector savings."
          },
          stats: {
            historical: { confidence: "99.3%", delta: "+6.0%" },
            forecast: { confidence: "91.8%", delta: "+30.8%" }
          }
        }
      }
    ],
    reports: [],
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
    kpis: [
      {
        title: "Saudi Arabia Investment",
        impact: "High",
        value: "$68 Billion",
        rep: "Yasir Al-Rumayyan",
        org: "PIF",
        insightData: {
          org: "PIF",
          unit: "$B",
          historicalData: [45, 52, 58, 64, 68],
          forecastData: [68, 85, 112, 154, 210],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Investment is being deployed at an unprecedented scale into the Giga-projects (NEOM, Red Sea, Qiddiya).",
            forecast: "Saudi Arabia is projected to become the world's primary construction and smart-city laboratory as Vision 2030 reaches peak maturity."
          },
          stats: {
            historical: { confidence: "99.4%", delta: "+51.1%" },
            forecast: { confidence: "93.4%", delta: "+208.8%" }
          }
        }
      },
      {
        title: "Saudi Arabia Investment Growth",
        impact: "High",
        value: "4.5%",
        rep: "Mohammed Al-Jadaan",
        org: "MoF",
        insightData: {
          org: "Finance Ministry",
          unit: "%",
          historicalData: [3.2, 3.8, 4.1, 4.3, 4.5],
          forecastData: [4.5, 5.2, 6.1, 7.5, 9.4],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Growth is driven by the rapid maturity of the non-oil economy and localized industrialization.",
            forecast: "Total capital formation is expected to accelerate significantly as private sector participation in Giga-projects triples by 2029."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "+40.6%" },
            forecast: { confidence: "93.5%", delta: "+108.9%" }
          }
        }
      },
      {
        title: "Saudi Arabia FDI Inflows",
        impact: "High",
        value: "$33 Billion",
        rep: "Khalid Al-Falih",
        org: "MISA",
        insightData: {
          org: "UNCTAD",
          unit: "$B",
          historicalData: [19, 24, 28, 31, 33],
          forecastData: [33, 45, 62, 88, 125],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Record inflows as the Kingdom opens new sectors to 100% foreign ownership and simplifies licensing via the MISA portal.",
            forecast: "Strategic minerals and the newly launched 'Sovereign AI' initiatives are expected to attract massive global institutional attention."
          },
          stats: {
            historical: { confidence: "99.3%", delta: "+73.7%" },
            forecast: { confidence: "91.8%", delta: "+278.8%" }
          }
        }
      },
      {
        title: "Saudi Arabia External Debt",
        impact: "Medium",
        value: "$182 Billion",
        rep: "H.E. Abdulaziz Al-Rasheed",
        org: "NDMC",
        insightData: {
          org: "NDMC",
          unit: "$B",
          historicalData: [165, 172, 178, 180, 182],
          forecastData: [182, 185, 188, 190, 195],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Debt remains very low relative to GDP and is exceptionally well-managed by the National Debt Management Center.",
            forecast: "The Kingdom maintains high credit ratings, allowing it to tap international markets at very favorable yield spreads for strategic funding."
          },
          stats: {
            historical: { confidence: "100.0%", delta: "+10.3%" },
            forecast: { confidence: "95.4%", delta: "+7.1%" }
          }
        }
      },
      {
        title: "Saudi Arabia Savings",
        impact: "High",
        value: "38.4%",
        rep: "Z-Model Analyst",
        org: "GASTAT",
        insightData: {
          org: "World Bank",
          unit: "%",
          historicalData: [35, 36, 37.2, 37.8, 38.4],
          forecastData: [38.4, 40.5, 43.8, 48.2, 55.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "High savings rates are a structural feature of the Saudi economy, providing significant domestic liquidity.",
            forecast: "The maturity of the local equity market (Tadawul) and institutionalized savings plans are expected to drive rates higher."
          },
          stats: {
            historical: { confidence: "99.5%", delta: "+9.7%" },
            forecast: { confidence: "94.2%", delta: "+43.2%" }
          }
        }
      }
    ],
    reports: [],
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
    kpis: [
      {
        title: "Russia Investment",
        impact: "Medium",
        value: "$420 Billion",
        rep: "Maxim Reshetnikov",
        org: "Min of Eco Dev",
        insightData: {
          org: "Rosstat",
          unit: "$B",
          historicalData: [380, 395, 405, 415, 420],
          forecastData: [420, 435, 455, 480, 520],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Investment has pivoted entirely towards domestic import substitution and the 'Pivot to the East' logistics corridors.",
            forecast: "Arctic development and North-South transport corridors are projected to be the primary domestic capital sinks for the next decade."
          },
          stats: {
            historical: { confidence: "94.1%", delta: "+10.5%" },
            forecast: { confidence: "78.5%", delta: "+23.8%" }
          }
        }
      },
      {
        title: "Russia Investment Growth",
        impact: "Medium",
        value: "2.3%",
        rep: "Elvira Nabiullina",
        org: "CBR",
        insightData: {
          org: "Central Bank of Russia",
          unit: "%",
          historicalData: [4.2, -2.1, 1.8, 2.1, 2.3],
          forecastData: [2.3, 2.5, 2.8, 3.2, 3.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "A sharp contraction in 2022 followed by a government-led recovery focused on industrial sovereignty.",
            forecast: "Growth is modeled to stay modest as the economy adapts to a high-rate environment and restricted external financing."
          },
          stats: {
            historical: { confidence: "95.2%", delta: "-45.2%" },
            forecast: { confidence: "75.4%", delta: "+65.2%" }
          }
        }
      },
      {
        title: "Russia FDI Inflows",
        impact: "Low",
        value: "$1.5 Billion",
        rep: "Z-Model Analyst",
        org: "UNCTAD",
        insightData: {
          org: "UNCTAD",
          unit: "$B",
          historicalData: [32, -18, -5, 0.5, 1.5],
          forecastData: [1.5, 2.5, 4.8, 8.5, 15.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Effective collapse of Western FDI, partially offset by tactical capital from 'friendly' nations.",
            forecast: "A slow recovery is projected as Asian and Middle Eastern partners formalize long-term joint ventures in the energy sector."
          },
          stats: {
            historical: { confidence: "92.1%", delta: "-95.3%" },
            forecast: { confidence: "70.2%", delta: "+900.0%" }
          }
        }
      },
      {
        title: "Russia External Debt",
        impact: "High",
        value: "$320 Billion",
        rep: "Anton Siluanov",
        org: "MoF",
        insightData: {
          org: "Ministry of Finance",
          unit: "$B",
          historicalData: [480, 380, 350, 335, 320],
          forecastData: [320, 300, 280, 260, 240],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "Aggressive repayment of external debt to minimize vulnerability to international financial restrictions.",
            forecast: "Russia is projected to become one of the least leveraged major economies as it shifts to domestic credit markets."
          },
          stats: {
            historical: { confidence: "98.5%", delta: "-33.3%" },
            forecast: { confidence: "85.4%", delta: "-25.0%" }
          }
        }
      },
      {
        title: "Russia Savings",
        impact: "Medium",
        value: "28.4%",
        rep: "Z-Model Analyst",
        org: "Federal Service",
        insightData: {
          org: "World Bank",
          unit: "%",
          historicalData: [26, 27, 27.8, 28.1, 28.4],
          forecastData: [28.4, 29.2, 30.5, 32.4, 35.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030 (Est)']
          },
          analysis: {
            historical: "High gross savings driven by corporate energy profits and high domestic interest rates attracting retail deposits.",
            forecast: "Increased focus on infrastructure bonds and domestic investment funds is projected to raise capital capture from the household sector."
          },
          stats: {
            historical: { confidence: "96.4%", delta: "+9.2%" },
            forecast: { confidence: "81.2%", delta: "+23.2%" }
          }
        }
      }
    ],
    reports: [],
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