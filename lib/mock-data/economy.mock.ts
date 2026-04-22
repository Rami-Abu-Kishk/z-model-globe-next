export interface TrendData {
  label: string;
  value: number;
  dataPoints: number[];
  description?: string;
  relatedCountries?: string[];
  countryValues?: Record<string, number>;
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
        label: "Global AI Sector",
        value: 34.5,
        dataPoints: [8.5, 12.0, 18.5, 26.8, 34.5],
        description: "Exponential acceleration in LLM deployment and enterprise AI integration is driving unprecedented capital allocation. This vector represents the strongest productivity shift in the digital era.",
        relatedCountries: ["US", "CN", "GB", "AE", "IN"],
        countryValues: { "US": 42.5, "CN": 38.2, "GB": 28.4, "AE": 45.1, "IN": 35.7 }
      },
      {
        label: "Green Energy Sector",
        value: 18.2,
        dataPoints: [12.4, 15.2, 17.8, 16.5, 18.2],
        description: "Decarbonization mandates are fueling a massive transition toward renewable infrastructure. Sovereign funds are pivoting heavily toward sustainable assets to hedge against long-term climate risk.",
        relatedCountries: ["CN", "US", "DE", "DK", "AE"],
        countryValues: { "CN": 24.5, "US": 18.1, "DE": 22.8, "DK": 31.4, "AE": 25.6 }
      },
      {
        label: "Emerging Markets Sector",
        value: 12.4,
        dataPoints: [6.5, 4.8, 5.2, 9.4, 12.4],
        description: "Rapid digitization in Southeast Asia and Africa is creating new consumer markets. Local fintech and logistics startups are capturing significant share from traditional global incumbents.",
        relatedCountries: ["IN", "ID", "VN", "BR", "MX"],
        countryValues: { "IN": 18.2, "ID": 14.5, "VN": 16.8, "BR": 10.2, "MX": 11.5 }
      }
    ],
    negativeTrends: [
      {
        label: "Commercial Real Estate Sector",
        value: -8.5,
        dataPoints: [-1.2, -3.5, -6.8, -7.9, -8.5],
        description: "The remote work paradigm shift continues to erode office valuations in major financial hubs. Debt restructuring in this sector remains a significant systemic risk for regional banks.",
        relatedCountries: ["US", "GB", "DE", "FR", "AU"],
        countryValues: { "US": -12.4, "GB": -10.1, "DE": -8.5, "FR": -6.2, "AU": -5.8 }
      },
      {
        label: "Legacy Supply Chain Sector",
        value: -4.2,
        dataPoints: [-8.5, -6.2, -4.8, -4.5, -4.2],
        description: "Traditional logistical frameworks are struggling with rising fuel costs and geopolitical friction. Decoupling from high-risk manufacturing nodes is causing short-term friction and margin compression.",
        relatedCountries: ["CN", "DE", "JP", "KR", "TW"],
        countryValues: { "CN": -6.8, "DE": -5.2, "JP": -3.5, "KR": -4.1, "TW": -3.8 }
      },
      {
        label: "Global Inflation Drag Sector",
        value: -2.1,
        dataPoints: [-1.8, -4.2, -5.7, -3.4, -2.1],
        description: "Persistent core inflation is forcing central banks to maintain restrictive monetary policies. This sustained high-rate environment is dampening consumer demand and stretching corporate balance sheets.",
        relatedCountries: ["AR", "TR", "GB", "US", "DE"],
        countryValues: { "AR": -15.2, "TR": -10.5, "GB": -3.2, "US": -2.4, "DE": -2.1 }
      }
    ],
    kpisAndReports: [
      {
        title: "Global GDP Growth",
        impact: "High",
        value: "3.1%",
        rep: "Kristalina Georgieva",
        org: "IMF",
        insightData: {
          // Historical: 2021 (Rebound), 2022 (War/Energy), 2023 (Tightening), 2024 (Resilience), 2025 (Steady)
          historicalData: [5.9, 3.2, 3.3, 3.2, 3.0],
          forecastData: [3.1, 3.0, 3.2, 3.3, 3.4],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "Global growth saw a massive 5.9% rebound in 2021 post-pandemic, followed by a slowdown to the 3.0-3.3% range through 2025 as central banks raised rates to combat inflation and geopolitical tensions fragmented trade.",
            forecast: "A 2026-27 slowdown driven by geopolitical shocks and restrictive conditions leads into a 2028-30 re-acceleration. Growth is powered by AI productivity gains and energy market stabilization via renewables."
          },
          stats: {
            historical: { confidence: "99.8%", delta: "+0.4%" },
            forecast: { confidence: "94.2%", delta: "+0.5%" }
          }
        }
      },
      {
        title: "Global Trade Volume",
        impact: "Medium",
        value: "$35.1T",
        rep: "Ngozi Okonjo-Iweala",
        org: "WTO",
        insightData: {
          // Data in USD Trillion (approximate based on UNCTAD/WTO reports)
          historicalData: [28.5, 32.2, 30.5, 32.8, 35.1],
          forecastData: [33.5, 34.8, 36.4, 38.1, 40.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "Trade hit a milestone $35T in 2025. Despite a slight stagnation in 2023 due to falling commodity prices, volumes recovered in 2024-2025, driven by electronics and AI-related manufacturing demand.",
            forecast: "Steady expansion despite structural fragmentation and friend-shoring. Growth is driven by the India-Gulf-Africa axis and AI-enabled services trade, outpacing GDP after 2027."
          },
          stats: {
            historical: { confidence: "98.1%", delta: "+7.0%" },
            forecast: { confidence: "89.4%", delta: "+6.5%" }
          }
        }
      },
      {
        title: "Inflation Rate",
        impact: "High",
        value: "4.2%",
        rep: "Jerome Powell",
        org: "OECD",
        insightData: {
          // Historical global averages: 2022 peak followed by gradual cooling
          historicalData: [4.7, 8.7, 6.8, 5.8, 4.2],
          forecastData: [4.2, 3.8, 3.3, 3.0, 2.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "Global inflation peaked at a staggering 8.7% in 2022 following energy shocks and supply chain disruptions. Aggressive policy tightening successfully cooled the rate to approximately 3.5% by late 2025.",
            forecast: "Relatively sticky inflation through 2027 due to energy volatility and supply-chain restructuring. Gradual disinflation follows as AI productivity gains materialize unevenly."
          },
          stats: {
            historical: { confidence: "98.5%", delta: "-2.3%" },
            forecast: { confidence: "87.2%", delta: "-1.4%" }
          }
        }
      },
      {
        title: "Unemployment Rate",
        impact: "Medium",
        value: "5.2%",
        rep: "Gilbert Houngbo",
        org: "ILO",
        insightData: {
          // Historical: 2021 (Recovery), 2022-2024 (Record lows), 2025 (Stabilization)
          historicalData: [6.2, 5.3, 5.1, 5.0, 5.2],
          forecastData: [5.2, 5.3, 5.1, 4.9, 4.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "Global unemployment reached a record low of 5.0% in 2024. Labor markets proved remarkably resilient to high interest rates, though youth and informal employment remained persistent challenges into 2025.",
            forecast: "Short-term rise through 2027 caused by AI displacement and industrial restructuring. Long-term improvement follows as green infrastructure and AI ecosystems absorb labor."
          },
          stats: {
            historical: { confidence: "97.8%", delta: "-0.1%" },
            forecast: { confidence: "84.5%", delta: "-0.4%" }
          }
        }
      }
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
        dataPoints: [22.4, 28.5, 34.2, 40.8, 45.2],
        description: "Massive diversification efforts under Vision 2031 are yielding record results. The UAE is successfully repositioning as a global hub for aviation, logistics, and digital services.",
        relatedCountries: ["AE", "SA", "QA", "OM", "KW"],
        countryValues: { "AE": 45.2, "SA": 12.4, "QA": 8.5, "OM": 5.2, "KW": 4.1 }
      },
      {
        label: "FDI Tech Inflows",
        value: 28.4,
        dataPoints: [12.1, 15.8, 20.4, 24.2, 28.4],
        description: "Business-friendly regulations and golden visa programs are attracting world-class AI and robotics firms. The 'We the UAE 2031' strategy is driving high-fidelity tech investments.",
        relatedCountries: ["AE", "SG", "IE", "CH", "LU"],
        countryValues: { "AE": 28.4, "SG": 15.2, "IE": 12.1, "CH": 10.5, "LU": 9.8 }
      },
      {
        label: "Tourism Revenue",
        value: 15.6,
        dataPoints: [6.2, 9.8, 12.5, 14.2, 15.6],
        description: "Major global events and luxury hospitality expansion are driving double-digit growth. UAE remains the premier destination for regional and international high-net-worth travelers.",
        relatedCountries: ["AE", "ES", "FR", "IT", "SA"],
        countryValues: { "AE": 15.6, "ES": 12.4, "FR": 10.2, "IT": 9.5, "SA": 8.1 }
      }
    ],
    negativeTrends: [
      {
        label: "Legacy Retail Decline",
        value: -3.2,
        dataPoints: [-1.5, -2.1, -2.8, -3.0, -3.2],
        description: "Hyper-growth in e-commerce is putting pressure on traditional local malls. Retailers must adapt to omnichannel strategies to survive the digital-first consumer shift.",
        relatedCountries: ["AE", "SA", "US", "GB", "CA"],
        countryValues: { "AE": -3.2, "SA": -2.8, "US": -1.5, "GB": -1.2, "CA": -0.8 }
      },
      {
        label: "Traditional Media Spend",
        value: -5.1,
        dataPoints: [-2.4, -3.5, -4.2, -4.8, -5.1],
        description: "Advertising budgets are migrating rapidly to social platforms and influencer marketing. Legacy print and television outlets are facing significant revenue headwinds.",
        relatedCountries: ["AE", "US", "GB", "DE", "FR"],
        countryValues: { "AE": -5.1, "US": -4.2, "GB": -3.8, "DE": -3.5, "FR": -3.1 }
      },
      {
        label: "Unoptimized Logistics",
        value: -1.8,
        dataPoints: [-2.1, -1.9, -1.8, -1.8, -1.8],
        description: "Last-mile delivery inefficiencies in some regions are causing minor margin erosion. Strategic investments in AI-driven routing are required for optimization.",
        relatedCountries: ["AE", "SA", "IN", "EG", "ZA"],
        countryValues: { "AE": -1.8, "SA": -1.5, "IN": -1.2, "EG": -0.9, "ZA": -0.7 }
      }
    ],
    kpisAndReports: [
      {
        title: "UAE GDP Growth",
        impact: "High",
        value: "5.3%",
        rep: "Abdulla bin Touq",
        org: "Ministry of Economy",
        insightData: {
          // Historical: 2021(post-covid rebound), 2022(energy windfall), 2023(normalization), 2024(non-oil drive), 2025(stabilization)
          historicalData: [3.8, 7.4, 3.3, 4.0, 4.5],
          // Forecast from uae.txt: 2026-2030
          forecastData: [5.3, 5.0, 5.2, 5.4, 5.6],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE economy demonstrated exceptional resilience, rebounding strongly through 2022's energy windfall before normalizing toward its 3.3–4.5% non-oil growth range by 2025. Vision 2031 diversification milestones have been consistently met.",
            forecast: "A stable, high-growth hub economy profile (5.0–5.6%) is projected. Re-acceleration in 2028–2030 is driven by AI and digital economy scaling, premium tourism expansion, D33 real estate mega-projects, and deepening financial hub dynamics. The UAE's growth floor rises structurally above global peers."
          },
          stats: {
            historical: { confidence: "99.2%", delta: "+0.7%" },
            forecast: { confidence: "93.5%", delta: "+1.1%" }
          }
        }
      },
      {
        title: "UAE Trade Volume",
        impact: "High",
        value: "$1.50T",
        rep: "Thani Al Zeyoudi",
        org: "Ministry of Economy",
        insightData: {
          // Historical data in USD Billion, calibrated to reach ~$1.50T by 2025
          historicalData: [730, 890, 1050, 1280, 1500],
          // Forecast from uae.txt (in $B): 2026=1620, 2027=1710, 2028=1820, 2029=1950, 2030=2100
          forecastData: [1620, 1710, 1820, 1950, 2100],
          unit: "$B",
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE's CEPA program and re-export ecosystem drove trade from $730B in 2021 to $1.5T by 2025. Jebel Ali and Khalifa Port achieved record container throughput, positioning the UAE as the neutral hub for India-Gulf-Africa commerce.",
            forecast: "Trade is projected to expand toward $2.1T by 2030, growing faster than GDP — a structural confirmation of the UAE's role as a global re-export and services hub. Non-oil trade increasingly dominates value creation as rising services exports (finance, tourism, AI, digital) complement the physical logistics base."
          },
          stats: {
            historical: { confidence: "98.9%", delta: "+19.1%" },
            forecast: { confidence: "91.2%", delta: "+40.0%" }
          }
        }
      },
      {
        title: "Inflation Rate",
        impact: "Medium",
        value: "1.8%",
        rep: "Issam Abousleiman",
        org: "FCSC",
        insightData: {
          // Historical: low UAE inflation; 2022 spike, gradual easing
          historicalData: [0.2, 4.8, 3.4, 2.3, 1.8],
          // Forecast from uae.txt: 2026=1.8%, 2027=2.1%, 2028=2.3%, 2029=2.5%, 2030=2.7%
          forecastData: [1.8, 2.1, 2.3, 2.5, 2.7],
          unit: "%",
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "The UAE's currency peg to the USD and efficient import logistics kept inflation near zero in 2021. A supply-side spike in 2022 was swiftly contained. By 2025, inflation had eased to a structurally low 1.6%, well below global peers.",
            forecast: "Inflation trends gradually upward (1.8% → 2.7%) as housing demand, high-skilled immigration, and service-sector normalization apply gentle upward pressure. Productivity gains from automation and the currency peg act as structural dampeners. The UAE transitions from 'ultra-low' to 'mild inflation growth hub' — contained but not negligible."
          },
          stats: {
            historical: { confidence: "98.7%", delta: "+1.4%" },
            forecast: { confidence: "91.0%", delta: "+0.9%" }
          }
        }
      },
      {
        title: "Unemployment Rate",
        impact: "Medium",
        value: "2.3%",
        rep: "Abdulrahman Al Awar",
        org: "MOHRE",
        insightData: {
          // Historical: stable low UAE unemployment anchored by labor-import equilibrium
          historicalData: [2.8, 2.7, 2.6, 2.5, 2.4],
          // Forecast from uae.txt: 2026=2.3%, 2027=2.4%, 2028=2.2%, 2029=2.1%, 2030=2.0%
          forecastData: [2.3, 2.4, 2.2, 2.1, 2.0],
          unit: "%",
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2026', '2027', '2028', '2029', '2030']
          },
          analysis: {
            historical: "UAE unemployment is structurally among the lowest globally, underpinned by a large, flexible expatriate labor market and continuous high-skilled migrant inflows. Emiratization reforms have maintained stability without disrupting labor absorption capacity.",
            forecast: "UAE unemployment behaves as a 'labor-import equilibrium system' — anchored near 2% regardless of global cycles. AI productivity gains create offsetting high-skill roles in construction, logistics, finance, and tech. Free zone expansion and startup ecosystems provide additional absorption capacity, with the rate converging toward a structural 2.0% floor by 2030."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "-0.1%" },
            forecast: { confidence: "94.2%", delta: "-0.3%" }
          }
        }
      }
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
        description: "The CHIPS Act is triggering a massive resurgence in onshoring critical tech manufacturing. Billions in CAPEX are allocated to building leading-edge foundries on US soil.",
        relatedCountries: ["US", "JP", "NL", "TW", "KR"],
        countryValues: { "US": 22.1, "JP": 15.2, "NL": 12.8, "TW": 18.5, "KR": 14.2 }
      },
      {
        label: "AI Enterprise Adoption",
        value: 41.5,
        dataPoints: [15, 22, 30, 38, 41.5],
        description: "S&P 500 companies are racing to integrate generative AI into core operations. This trend reflects a broad mandate for operational efficiency and automated discovery.",
        relatedCountries: ["US", "GB", "CA", "IL", "IN"],
        countryValues: { "US": 41.5, "GB": 35.2, "CA": 32.8, "IL": 38.4, "IN": 30.1 }
      },
      {
        label: "Renewable Grid Expansion",
        value: 14.2,
        dataPoints: [6, 8, 10, 12, 14.2],
        description: "Federal tax incentives are accelerating the modernization of the energy grid. Large-scale utility solar and wind projects are reaching grid parity across the Midwest.",
        relatedCountries: ["US", "CN", "DE", "ES", "DK"],
        countryValues: { "US": 14.2, "CN": 18.5, "DE": 12.4, "ES": 10.8, "DK": 15.2 }
      }
    ],
    negativeTrends: [
      {
        label: "Downtown Office Occupancy",
        value: -15.4,
        dataPoints: [-5, -8, -10, -12, -15.4],
        description: "Major metropolitan areas are facing 'urban doom loop' risks as office vacancies remain at historic highs. Tax bases in cities like San Francisco and Chicago are under pressure.",
        relatedCountries: ["US", "GB", "CA", "DE", "FR"],
        countryValues: { "US": -15.4, "GB": -12.1, "CA": -10.5, "DE": -9.2, "FR": -8.4 }
      },
      {
        label: "Consumer Debt Default Rate",
        value: -4.8,
        dataPoints: [-1, -2, -3, -4, -4.8],
        description: "Rising interest rates are beginning to stress household finances. Credit card and auto loan delinquencies are edging toward pre-pandemic norms, indicating potential cooling.",
        relatedCountries: ["US", "GB", "CA", "AU", "NZ"],
        countryValues: { "US": -4.8, "GB": -4.2, "CA": -3.5, "AU": -3.2, "NZ": -2.8 }
      },
      {
        label: "Regional Bank Deposits",
        value: -6.2,
        dataPoints: [-2, -3, -4, -5, -6.2],
        description: "Competition for deposits from money market funds is squeezing bank margins. Smaller institutions are facing capital flight as clients seek higher-yield, low-risk alternatives.",
        relatedCountries: ["US", "CH", "DE", "IT", "FR"],
        countryValues: { "US": -6.2, "CH": -5.5, "DE": -4.8, "IT": -4.2, "FR": -3.8 }
      }
    ],
    kpisAndReports: [
      {
        title: "US GDP Growth",
        impact: "High",
        value: "2.1%",
        rep: "Jerome Powell",
        org: "Federal Reserve",
        insightData: {
          historicalData: [5.9, 2.1, 2.4, 2.2, 2.1],
          forecastData: [2.1, 2.3, 2.5, 2.8, 3.2],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "The US economy has maintained structural resilience despite aggressive rate hikes. Consumer spending and a strong labor market have supported a 'soft landing' trajectory.",
            forecast: "Z-Model anticipates an AI-led productivity boom that will raise the long-term growth ceiling. Domestic semiconductor onshoring will serve as a significant multiplier."
          },
          stats: {
            historical: { confidence: "99.8%", delta: "-0.1%" },
            forecast: { confidence: "86.5%", delta: "+1.1%" }
          }
        }
      },
      {
        title: "US Trade Volume",
        impact: "Medium",
        value: "$5.4T",
        rep: "Gina Raimondo",
        org: "Dept of Commerce",
        insightData: {
          historicalData: [4.2, 4.8, 5.1, 5.2, 5.4],
          forecastData: [5.4, 5.8, 6.4, 7.2, 8.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Trade flows have been characterized by 'friend-shoring' and diversification away from high-risk nodes. Service exports in tech and finance remain a global dominant force.",
            forecast: "A resurgence in high-tech manufacturing exports is expected to drive the next decade of trade growth. Strategic realignments with North American partners will deepen vertical integration."
          },
          stats: {
            historical: { confidence: "98.2%", delta: "+0.2T" },
            forecast: { confidence: "84.1%", delta: "+3.1T" }
          }
        }
      },
      {
        title: "Inflation Rate",
        impact: "High",
        value: "2.4%",
        rep: "Jerome Powell",
        org: "Federal Reserve",
        insightData: {
          historicalData: [7.0, 6.5, 3.4, 2.8, 2.4],
          forecastData: [2.4, 2.2, 2.0, 2.0, 2.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Core inflation has steadily trended toward the 2% target as supply-demand imbalances normalized. Rent and services remain the primary areas of persistent stickiness.",
            forecast: "Z-Model projections indicate achieving the long-term 2% goal by 2028. Technological deflationary forces are expected to offset demographic-led wage pressures."
          },
          stats: {
            historical: { confidence: "99.5%", delta: "-0.4%" },
            forecast: { confidence: "91.2%", delta: "-0.4%" }
          }
        }
      },
      {
        title: "Unemployment Rate",
        impact: "Medium",
        value: "3.7%",
        rep: "Erika McEntarfer",
        org: "BLS",
        insightData: {
          historicalData: [3.9, 3.6, 3.7, 3.8, 3.7],
          forecastData: [3.7, 3.8, 4.0, 3.9, 3.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "The US labor market has remained historically tight, supporting wage growth even as the economy cooled. Participation rates among prime-age workers are at multi-decade highs.",
            forecast: "Labor force dynamics are expected to shift as AI integration changes the nature of corporate roles. Z-Model forecasts a stable rate with a shift toward high-skilled digital maintenance."
          },
          stats: {
            historical: { confidence: "99.4%", delta: "-0.1%" },
            forecast: { confidence: "87.8%", delta: "+0.1%" }
          }
        }
      }
    ],
    reports: []
  },
  JO: {
    positiveTrends: [
      {
        label: "Amman Tech Hub Growth",
        value: 18.5,
        dataPoints: [5, 8, 12, 15, 18.5],
        description: "Jordan is emerging as a regional software development powerhouse. High talent density and competitive costs are attracting global tech outsourcing mandates.",
        relatedCountries: ["JO", "AE", "SA", "EG", "LB"],
        countryValues: { "JO": 18.5, "AE": 12.4, "SA": 10.2, "EG": 8.5, "LB": 5.1 }
      },
      {
        label: "Tourism Resilience",
        value: 24.2,
        dataPoints: [10, 15, 18, 20, 24.2],
        description: "Post-pandemic travel surge to Petra and Wadi Rum remains strong. National marketing campaigns are successfully diversifying the visitor base beyond regional markets.",
        relatedCountries: ["JO", "EG", "MA", "TR", "AE"],
        countryValues: { "JO": 24.2, "EG": 18.5, "MA": 15.2, "TR": 12.8, "AE": 10.5 }
      }
    ],
    negativeTrends: [
      { label: "Energy Import Costs", value: -12.4, dataPoints: [-2, -5, -8, -10, -12.4], description: "Reliance on external energy sources creates budget vulnerability.", relatedCountries: ["JO", "EG", "IQ", "LB", "MA"], countryValues: { "JO": -12.4, "EG": -8.5, "IQ": -6.2, "LB": -15.1, "MA": -5.2 } },
      { label: "Water Scarcity Impact", value: -15.1, dataPoints: [-5, -8, -10, -12, -15.1], description: "Severe water stress is impacting agricultural output and municipal planning.", relatedCountries: ["JO", "EG", "IQ", "SY", "AE"], countryValues: { "JO": -15.1, "EG": -12.4, "IQ": -10.2, "SY": -18.5, "AE": -5.1 } }
    ],
    kpisAndReports: [
      {
        title: "Jordan GDP Growth",
        impact: "High",
        value: "2.4%",
        rep: "Z-Model Analyst",
        org: "CBJ",
        insightData: {
          historicalData: [2.0, 2.2, 2.1, 2.3, 2.4],
          forecastData: [2.4, 2.8, 3.2, 3.8, 4.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Jordan has maintained steady, conservative growth despite regional geopolitical volatility. Tourism and service exports remain the structural pillars of the economy.",
            forecast: "Z-Model projects an acceleration as the Amman tech hub achieves critical scale and regional infrastructure projects (desalination/energy) begin to yield industrial dividends."
          },
          stats: {
            historical: { confidence: "97.5%", delta: "+0.1%" },
            forecast: { confidence: "88.2%", delta: "+2.1%" }
          }
        }
      },
      {
        title: "Jordan Trade Volume",
        impact: "Medium",
        value: "$18.5B",
        rep: "Dir of Tourism",
        org: "JTB",
        insightData: {
          historicalData: [14.2, 15.5, 16.8, 17.5, 18.5],
          forecastData: [18.5, 20.2, 22.8, 26.5, 31.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Trade flows have been supported by strong phosphorus exports and a resurgence in high-value tourism. Diversification into regional tech services is a growing trend.",
            forecast: "Integration into the IMEC corridor and expanded trade agreements with Gulf partners are set to drive double-digit growth in export volumes."
          },
          stats: {
            historical: { confidence: "96.4%", delta: "+1.0B" },
            forecast: { confidence: "85.9%", delta: "+12.5B" }
          }
        }
      },
      {
        title: "Inflation Rate",
        impact: "Medium",
        value: "2.8%",
        rep: "Central Bank Lead",
        org: "CBJ",
        insightData: {
          historicalData: [3.2, 4.5, 3.8, 3.0, 2.8],
          forecastData: [2.8, 2.6, 2.5, 2.4, 2.2],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Jordan successfully managed inflationary pressures through peg stability and strategic management of fuel subsidies. Core inflation has normalized ahead of regional peers.",
            forecast: "Long-term price stability is projected as national energy security projects reduce reliance on volatile external imports. Convergence toward a 2.2% baseline is expected."
          },
          stats: {
            historical: { confidence: "98.1%", delta: "-0.2%" },
            forecast: { confidence: "89.4%", delta: "-0.6%" }
          }
        }
      },
      {
        title: "Unemployment Rate",
        impact: "High",
        value: "18.2%",
        rep: "Z-Model Analyst",
        org: "Gov of Jordan",
        insightData: {
          historicalData: [22.4, 21.8, 20.5, 19.2, 18.2],
          forecastData: [18.2, 17.5, 16.2, 14.8, 12.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Unemployment remains the primary macroeconomic challenge. However, record growth in the digital services sector and industrial zones is beginning to create high-quality roles.",
            forecast: "Z-Model projects a structural reduction as AI-training centers and regional tech outsourcing nodes in Amman reach full capacity. A move toward a 12.5% target is achievable by 2031."
          },
          stats: {
            historical: { confidence: "97.2%", delta: "-1.0%" },
            forecast: { confidence: "84.5%", delta: "-5.7%" }
          }
        }
      }
    ],
    reports: []
  },
  CN: {
    positiveTrends: [
      { label: "EV Export Dominance", value: 52.1, dataPoints: [10, 20, 35, 45, 52.1], description: "Unmatched scale in battery production is giving Chinese EV makers a decisive global cost advantage.", relatedCountries: ["CN", "DE", "JP", "KR", "US"] },
      { label: "Clean Tech Capex", value: 38.6, dataPoints: [15, 20, 28, 32, 38.6], description: "China continues to lead the world in solar and wind capacity additions to power its industrial core.", relatedCountries: ["CN", "US", "IN", "DE", "BR"] }
    ],
    negativeTrends: [
      { label: "Property Sector Drag", value: -18.4, dataPoints: [-5, -10, -12, -15, -18.4], description: "Ongoing deleveraging in the real estate market is dampening consumer confidence and local gov revenue.", relatedCountries: ["CN", "HK", "AU", "SG", "VN"] },
      { label: "Demographic Aging", value: -4.2, dataPoints: [-1, -2, -3, -4, -4.2], description: "A shrinking workforce is increasing labor costs and long-term social welfare obligations.", relatedCountries: ["CN", "JP", "KR", "IT", "DE"] }
    ],
    kpisAndReports: [
      {
        title: "China GDP Growth",
        impact: "High",
        value: "4.8%",
        rep: "Pan Gongsheng",
        org: "PBOC",
        insightData: {
          historicalData: [8.1, 3.0, 5.2, 4.5, 4.8],
          forecastData: [4.8, 4.5, 4.2, 4.0, 3.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "China's growth has transitioned into a 'new normal' phase centered on high-quality development and consumption. The property sector deleveraging remains a significant structural headwind.",
            forecast: "Z-Model projects a gradual cooling toward a sustainable 3.8% baseline. Dominance in the green tech and EV sectors will act as the primary engines for future industrial output."
          },
          stats: {
            historical: { confidence: "98.5%", delta: "+0.3%" },
            forecast: { confidence: "86.2%", delta: "-1.0%" }
          }
        }
      },
      {
        title: "China Trade Volume",
        impact: "High",
        value: "$6.1T",
        rep: "MOFCOM Spokesperson",
        org: "MOFCOM",
        insightData: {
          historicalData: [5.2, 5.8, 5.9, 6.0, 6.1],
          forecastData: [6.1, 6.5, 7.2, 8.5, 10.2],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Export resilience in EVs and advanced electronics has offset cooling demand in traditional consumer goods. The shift toward Global South markets is accelerating.",
            forecast: "Z-Model anticipates a surge in value-added tech exports as China achieves full autonomy in semiconductor nodes. BRI corridor trade will hit critical mass by 2030."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "+0.1T" },
            forecast: { confidence: "89.4%", delta: "+4.1T" }
          }
        }
      },
      {
        title: "Inflation Rate",
        impact: "Medium",
        value: "1.2%",
        rep: "NBS Spokesperson",
        org: "NBS",
        insightData: {
          historicalData: [0.9, 2.0, 0.2, 0.8, 1.2],
          forecastData: [1.2, 1.5, 1.8, 2.1, 2.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "China has faced deflationary risks due to soft domestic demand and overcapacity. Systematic stimulus measures are beginning to stabilize price levels.",
            forecast: "A transition toward a consumption-led model is expected to drive moderate inflation. Z-Model predicts a move toward the 2.5% target as domestic services reach maturity."
          },
          stats: {
            historical: { confidence: "97.8%", delta: "+0.4%" },
            forecast: { confidence: "87.5%", delta: "+1.3%" }
          }
        }
      },
      {
        title: "Unemployment Rate",
        impact: "Medium",
        value: "5.0%",
        rep: "MIIT Spokesperson",
        org: "MIIT",
        insightData: {
          historicalData: [5.1, 5.5, 5.2, 5.1, 5.0],
          forecastData: [5.0, 4.8, 4.5, 4.2, 4.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Urban unemployment has stabilized, although youth unemployment remains a focal point for policy intervention. The manufacturing core continues to see high labor absorption.",
            forecast: "Z-Model highlights a surge in advanced manufacturing and green energy maintenance roles. Demographic tightening will naturally lead to a lower long-term unemployment baseline."
          },
          stats: {
            historical: { confidence: "98.1%", delta: "-0.2%" },
            forecast: { confidence: "85.4%", delta: "-1.0%" }
          }
        }
      }
    ],
    reports: []
  },
  IN: {
    positiveTrends: [
      { label: "Mobile Manufacturing", value: 42.5, dataPoints: [20, 25, 30, 38, 42.5], description: "The 'Make in India' initiative has transformed the country into the world's second-largest mobile producer.", relatedCountries: ["IN", "VN", "CN", "MX", "TH"] },
      { label: "Service Export Surplus", value: 22.8, dataPoints: [10, 15, 18, 20, 22.8], description: "High-end software and consultancy exports are driving record-high service trade surpluses.", relatedCountries: ["IN", "US", "GB", "AE", "SG"] }
    ],
    negativeTrends: [
      { label: "Infrastructure Bottlenecks", value: -6.4, dataPoints: [-1, -2, -4, -5, -6.4], description: "Logistical delays and power grid inconsistencies are limiting industrial throughput in some corridors.", relatedCountries: ["IN", "BD", "PK", "EG", "NG"] },
      { label: "Air Quality Economic Loss", value: -3.8, dataPoints: [-0.5, -1, -2, -3, -3.8], description: "High pollution levels in industrial hubs are causing health-related labor shortages and higher insurance costs.", relatedCountries: ["IN", "CN", "PK", "BD", "NP"] }
    ],
    kpisAndReports: [
      {
        title: "India GDP Growth",
        impact: "High",
        value: "7.0%",
        rep: "Shaktikanta Das",
        org: "RBI",
        insightData: {
          historicalData: [8.7, 7.2, 8.2, 7.5, 7.0],
          forecastData: [7.0, 7.5, 8.4, 9.2, 10.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "India has emerged as the world's fastest-growing major economy. Infrastructure scaling and the 'India Stack' digital revolution have driven broad-based productivity gains.",
            forecast: "Z-Model predicts a transition into double-digit growth as India becomes the global manufacturing alternative. Favorable demographics and urban development will sustain this momentum."
          },
          stats: {
            historical: { confidence: "99.4%", delta: "-0.5%" },
            forecast: { confidence: "91.8%", delta: "+3.5%" }
          }
        }
      },
      {
        title: "India Trade Volume",
        impact: "High",
        value: "$850B",
        rep: "NPCI Chief",
        org: "Ministry of Commerce",
        insightData: {
          historicalData: [620, 710, 780, 810, 850],
          forecastData: [850, 980, 1250, 1600, 2100],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Service exports remain the dominant force, while mobile manufacturing has seen an exponential rise. Trade agreements with major economies are being aggressively finalized.",
            forecast: "The Z-Model highlights India as the primary beneficiary of supply chain diversification. Export volumes are projected to more than double as local manufacturing ecosystem matures."
          },
          stats: {
            historical: { confidence: "98.7%", delta: "+40B" },
            forecast: { confidence: "87.5%", delta: "+1.25T" }
          }
        }
      },
      {
        title: "Inflation Rate",
        impact: "Medium",
        value: "4.8%",
        rep: "RBI Governor",
        org: "RBI",
        insightData: {
          historicalData: [5.5, 6.7, 5.4, 5.0, 4.8],
          forecastData: [4.8, 4.5, 4.2, 4.0, 4.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "RBI has successfully managed to keep inflation within the tolerance band despite food price volatility. Supply-side interventions have been critical.",
            forecast: "Z-Model expects a gradual move toward the 4% target. Improved agricultural storage and logistics will structurally reduce food price spikes over the next decade."
          },
          stats: {
            historical: { confidence: "98.2%", delta: "-0.2%" },
            forecast: { confidence: "89.1%", delta: "-0.8%" }
          }
        }
      },
      {
        title: "Unemployment Rate",
        impact: "High",
        value: "7.2%",
        rep: "Z-Model Analyst",
        org: "Ministry of Labour",
        insightData: {
          historicalData: [8.5, 7.8, 7.5, 7.4, 7.2],
          forecastData: [7.2, 6.8, 6.2, 5.5, 4.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Labor market absorption has been strong in the gig economy and tech sectors. Rural-to-urban migration continues to drive the need for massive job creation.",
            forecast: "Industrialization and the scaling of the manufacturing sector are expected to significantly reduce unemployment. Z-Model predicts a move toward 4.8% by 2031."
          },
          stats: {
            historical: { confidence: "97.5%", delta: "-0.2%" },
            forecast: { confidence: "84.9%", delta: "-2.4%" }
          }
        }
      }
    ],
    reports: []
  },
  SA: {
    positiveTrends: [
      { label: "Mining Sector Revenue", value: 31.2, dataPoints: [10, 15, 22, 28, 31.2], description: "New mineral deposit discoveries are attracting massive FDI under the Vision 2030 mining framework.", relatedCountries: ["SA", "AU", "CA", "CL", "ZA"] },
      { label: "Gaming Hub Expansion", value: 14.5, dataPoints: [2, 5, 8, 12, 14.5], description: "Strategic investments in e-sports and game development are capturing the regional youth demographic.", relatedCountries: ["SA", "AE", "KR", "US", "JP"] }
    ],
    negativeTrends: [
      { label: "Global Oil Volatility", value: -8.2, dataPoints: [-2, -4, -6, -7, -8.2], description: "Fluctuating Brent prices are creating uncertainty in projected fiscal surpluses for the next quarter.", relatedCountries: ["SA", "RU", "IQ", "AE", "KW"] }
    ],
    kpisAndReports: [
      {
        title: "Saudi Arabia GDP Growth",
        impact: "High",
        value: "4.5%",
        rep: "PIF Strategy Lead",
        org: "PIF",
        insightData: {
          historicalData: [3.2, 8.7, -0.8, 1.3, 4.5],
          forecastData: [4.5, 5.2, 6.4, 7.8, 9.2],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "The Kingdom's growth has been characterized by a massive surge in non-oil activities. Vision 2030 giga-projects have moved from planning to execution, driving local demand.",
            forecast: "Z-Model predicts non-oil GDP will dominate the growth narrative, reaching a 9.2% rate as tourism and mining hubs reach operational maturity."
          },
          stats: {
            historical: { confidence: "99.1%", delta: "+3.2%" },
            forecast: { confidence: "92.4%", delta: "+4.7%" }
          }
        }
      },
      {
        title: "Saudi Arabia Trade Volume",
        impact: "High",
        value: "$620B",
        rep: "Project CEO",
        org: "NEOM",
        insightData: {
          historicalData: [380, 450, 520, 580, 620],
          forecastData: [620, 750, 920, 1200, 1500],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Non-oil exports have seen record growth as industrial capacities in downstream petrochemicals and minerals expand. Port modernization has increased logistics efficiency.",
            forecast: "The inclusion of advanced tech and gaming exports is set to diversify the trade balance. Z-Model anticipates trade volumes hitting $1.5T by the end of the decade."
          },
          stats: {
            historical: { confidence: "98.8%", delta: "+40B" },
            forecast: { confidence: "89.2%", delta: "+880B" }
          }
        }
      },
      {
        title: "Inflation Rate",
        impact: "Medium",
        value: "2.1%",
        rep: "General Authority for Statistics",
        org: "GASTAT",
        insightData: {
          historicalData: [3.1, 2.5, 2.3, 2.2, 2.1],
          forecastData: [2.1, 2.0, 1.9, 1.8, 1.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Saudi Arabia has maintained one of the lowest inflation rates globally through proactive fiscal policies and stable energy costs. Domestic price stability is a key investor attraction.",
            forecast: "Z-Model projects sustained low inflation as domestic manufacturing reduces import costs. A long-term baseline of 1.8% is expected."
          },
          stats: {
            historical: { confidence: "98.5%", delta: "-0.1%" },
            forecast: { confidence: "90.4%", delta: "-0.3%" }
          }
        }
      },
      {
        title: "Unemployment Rate",
        impact: "High",
        value: "7.7%",
        rep: "Vision 2030 Office",
        org: "Vision 2030",
        insightData: {
          historicalData: [11.3, 9.7, 8.6, 8.0, 7.7],
          forecastData: [7.7, 7.4, 7.0, 6.5, 5.0],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Historical lows in citizen unemployment have been achieved through aggressive 'Saudization' and the creation of millions of roles in new sectors.",
            forecast: "The target of 7% is within reach by 2027. Z-Model forecasting highlights a move toward 5% as the private sector becomes the primary engine of employment."
          },
          stats: {
            historical: { confidence: "99.2%", delta: "-0.3%" },
            forecast: { confidence: "94.8%", delta: "-2.7%" }
          }
        }
      }
    ],
    reports: []
  },
  RU: { // Russia Specific Data
    positiveTrends: [
      { label: "Agricultural Self-Sufficiency", value: 12.4, dataPoints: [5, 7, 9, 11, 12.4], description: "Massive state subsidies are driving a record-breaking harvest and food security autonomy.", relatedCountries: ["RU", "BR", "AR", "US", "CA"] },
      { label: "LNG Arctic Expansion", value: 18.2, dataPoints: [10, 12, 14, 16, 18.2], description: "New northern sea route infrastructure is enabling record LNG exports to Asian partners.", relatedCountries: ["RU", "CN", "IN", "QA", "US"] }
    ],
    negativeTrends: [
      { label: "SWIFT Disconnection Impact", value: -25.6, dataPoints: [-10, -15, -20, -22, -25.6], description: "Isolation from global payment systems continues to increase transaction costs for import/export.", relatedCountries: ["RU", "IR", "KP", "VE", "CU"] },
      { label: "CBR Interest Rate Drag", value: -16.0, dataPoints: [-8, -10, -12, -14, -16.0], description: "Emergency double-digit rates are suppressing domestic credit growth and automotive sales.", relatedCountries: ["RU", "TR", "AR", "NG", "EG"] }
    ],
    kpisAndReports: [
      {
        title: "Russia GDP Growth",
        impact: "High",
        value: "2.3%",
        rep: "Elvira Nabiullina",
        org: "CBR",
        insightData: {
          historicalData: [4.7, -2.1, 3.6, 2.5, 2.3],
          forecastData: [2.3, 2.1, 1.8, 1.5, 1.2],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "The economy has demonstrated unexpected resilience through state spending and rapid adaptation to sanctions. Growth is increasingly driven by the military-industrial complex.",
            forecast: "Z-Model projects a long-term cooling effect as labor shortages and limited tech access begin to weigh on productivity. A move toward a 1.2% baseline is expected by 2031."
          },
          stats: {
            historical: { confidence: "97.5%", delta: "-0.2%" },
            forecast: { confidence: "82.4%", delta: "-1.1%" }
          }
        }
      },
      {
        title: "Russia Trade Volume",
        impact: "Medium",
        value: "$710B",
        rep: "Energy Minister",
        org: "Rosneft",
        insightData: {
          historicalData: [780, 850, 720, 690, 710],
          forecastData: [710, 730, 750, 780, 820],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Trade flows have pivoted decisively toward Asian markets. The 'Shadow Fleet' has allowed energy exports to bypass Western caps, though at higher transaction costs.",
            forecast: "Z-Model anticipates a slow expansion of trade as new Arctic routes and regional pipelines reach full capacity. Integration with Global South nodes will be the primary vertical."
          },
          stats: {
            historical: { confidence: "96.2%", delta: "+20B" },
            forecast: { confidence: "81.5%", delta: "+110B" }
          }
        }
      },
      {
        title: "Inflation Rate",
        impact: "High",
        value: "7.4%",
        rep: "Central Bank Lead",
        org: "CBR",
        insightData: {
          historicalData: [6.7, 11.9, 7.4, 7.8, 7.4],
          forecastData: [7.4, 6.5, 5.8, 5.0, 4.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Double-digit rates were used to stabilize the ruble and counter supply shocks. Domestic price pressure remains high due to rapid wage growth in the defense sector.",
            forecast: "Z-Model expects a gradual descent as emergency spending cools. However, high structural costs will likely keep inflation above the 4% target for the foreseeable future."
          },
          stats: {
            historical: { confidence: "98.1%", delta: "-0.4%" },
            forecast: { confidence: "84.2%", delta: "-2.9%" }
          }
        }
      },
      {
        title: "Unemployment Rate",
        impact: "Medium",
        value: "2.9%",
        rep: "Z-Model Analyst",
        org: "Federal Service",
        insightData: {
          historicalData: [4.8, 3.9, 3.2, 3.0, 2.9],
          forecastData: [2.9, 2.8, 2.8, 3.0, 3.2],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Record-low unemployment is a sign of extreme labor market tightness and demographic drainage. Competition for workers has driven significant real wage growth.",
            forecast: "A floor has likely been reached. Z-Model projects a slight increase by 2030 as industrial automation attempts to compensate for systemic labor shortages."
          },
          stats: {
            historical: { confidence: "99.2%", delta: "-0.1%" },
            forecast: { confidence: "88.7%", delta: "+0.3%" }
          }
        }
      }
    ],
    reports: []
  },
  IR: { // Iran Specific Data
    positiveTrends: [
      { label: "Eurasian Customs Pivot", value: 24.5, dataPoints: [8, 12, 16, 20, 24.5], description: "New trade agreements with regional neighbors are opening alternative routes for industrial exports.", relatedCountries: ["IR", "RU", "AM", "BY", "KZ"] },
      { label: "Domestic Tech Self-Reliance", value: 15.2, dataPoints: [5, 8, 10, 12, 15.2], description: "Local startups are successfully cloning global platform models for the insulated domestic market.", relatedCountries: ["IR", "RU", "CN", "TR", "IN"] },
      { label: "Regional Energy Corridor", value: 11.4, dataPoints: [2, 5, 8, 9, 11.4], description: "Increased gas exports to Iraq and Turkey are providing critical hard currency inflows.", relatedCountries: ["IR", "IQ", "TR", "PK", "TM"], countryValues: { "IR": 11.4, "IQ": 8.5, "TR": 7.2, "PK": 5.1, "TM": 4.8 } }
    ],
    negativeTrends: [
      { label: "Exchange Rate Devaluation", value: -42.1, dataPoints: [-10, -20, -30, -38, -42.1], description: "Sustained inflationary pressure is eroding purchasing power for the middle class.", relatedCountries: ["IR", "AR", "TR", "LB", "SY"], countryValues: { "IR": -42.1, "AR": -115.2, "TR": -65.4, "LB": -82.1, "SY": -54.2 } },
      { label: "Capital Infrastructure Aging", value: -18.2, dataPoints: [-5, -8, -12, -15, -18.2], description: "Limited access to international spare parts is causing maintenance backlogs in the aviation and energy sectors.", relatedCountries: ["IR", "RU", "VE", "CU", "SD"], countryValues: { "IR": -18.2, "RU": -15.4, "VE": -22.1, "CU": -12.8, "SD": -25.4 } },
      { label: "Cross-Border Banking Friction", value: -22.5, dataPoints: [-10, -15, -18, -20, -22.5], description: "Non-standard payment channels are causing significant delays in settling international trade balances.", relatedCountries: ["IR", "RU", "KP", "IQ", "AF"], countryValues: { "IR": -22.5, "RU": -18.4, "KP": -15.2, "IQ": -12.1, "AF": -20.5 } }
    ],
    kpisAndReports: [
      {
        title: "Iran GDP Growth",
        impact: "High",
        value: "3.2%",
        rep: "Central Bank Lead",
        org: "CBI",
        insightData: {
          historicalData: [4.5, 3.8, 3.5, 3.0, 3.2],
          forecastData: [3.2, 3.5, 4.2, 5.0, 6.2],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Iran has sustained growth through increased oil exports and regional trade integration. The domestic industrial base has expanded in response to trade restrictions.",
            forecast: "Z-Model projects an acceleration as the Eurasian trade corridor matures and energy exports to the Global South reach record volumes. Strategic tech pivots will drive non-oil growth."
          },
          stats: {
            historical: { confidence: "96.4%", delta: "+0.2%" },
            forecast: { confidence: "84.1%", delta: "+3.0%" }
          }
        }
      },
      {
        title: "Iran Trade Volume",
        impact: "Medium",
        value: "$112B",
        rep: "Oil Ministry Rep",
        org: "NIOC",
        insightData: {
          historicalData: [85, 92, 101, 105, 112],
          forecastData: [112, 125, 148, 185, 230],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Trade flows have realigned away from Western corridors. Petrochemical output and regional energy bridges have become the primary sources of external balance.",
            forecast: "A doubling of trade volume is projected as Z-Model protocols facilitate seamless regional settlement. Transition to value-added chemical exports will enhance margins."
          },
          stats: {
            historical: { confidence: "95.8%", delta: "+7B" },
            forecast: { confidence: "81.4%", delta: "+118B" }
          }
        }
      },
      {
        title: "Inflation Rate",
        impact: "High",
        value: "45.8%",
        rep: "Z-Model Analyst",
        org: "CBI",
        insightData: {
          historicalData: [40.2, 45.1, 48.2, 46.5, 45.8],
          forecastData: [45.8, 42.0, 35.5, 28.0, 22.5],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Sustained inflationary pressure due to exchange rate volatility and restricted access to global financial nodes. Domestic prices are increasingly sensitive to regional stability.",
            forecast: "Z-Model anticipates a cooling effect as regional trade settlements stabilize the rial. A successful move toward 22.5% is projected by 2031 if current trade pivots hold."
          },
          stats: {
            historical: { confidence: "97.2%", delta: "-0.7%" },
            forecast: { confidence: "82.5%", delta: "-23.3%" }
          }
        }
      },
      {
        title: "Unemployment Rate",
        impact: "Medium",
        value: "9.2%",
        rep: "Z-Model Analyst",
        org: "Gov of Iran",
        insightData: {
          historicalData: [10.5, 9.8, 9.5, 9.4, 9.2],
          forecastData: [9.2, 8.8, 8.2, 7.5, 6.8],
          labels: {
            historical: ['2021', '2022', '2023', '2024', '2025'],
            forecast: ['2027', '2028', '2029', '2030', '2031 (Est)']
          },
          analysis: {
            historical: "Unemployment has remained relatively stable despite macro headwinds, supported by state-led industrial programs and a resilient local service sector.",
            forecast: "Job creation is expected to pick up as regional infrastructure projects enter construction phase. Z-Model highlights a surge in engineering and logistics roles."
          },
          stats: {
            historical: { confidence: "96.1%", delta: "-0.2%" },
            forecast: { confidence: "85.2%", delta: "-2.4%" }
          }
        }
      }
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
  { label: "Global Trade Volume", value: "$32T", change: "+1.5%", trend: "up", organization: "WTO" },
  { label: "Inflation Rate", value: "3.4%", change: "-1.3%", trend: "up", organization: "OECD" },
  { label: "Unemployment Rate", value: "5.1%", change: "-1.1%", trend: "up", organization: "ILO" }
];

export const economyTrendData = [
  { category: "Technology", year: 2024, value: 45 },
  { category: "Technology", year: 2025, value: 52 },
  { category: "Technology", year: 2026, value: 68 },
  { category: "Technology", year: 2027, value: 84 },
  { category: "Energy", year: 2024, value: 38 },
  { category: "Energy", year: 2025, value: 42 },
  { category: "Energy", year: 2026, value: 40 },
  { category: "Energy", year: 2027, value: 48 },
  { category: "Finance", year: 2024, value: 30 },
  { category: "Finance", year: 2025, value: 34 },
  { category: "Finance", year: 2026, value: 32 },
  { category: "Finance", year: 2027, value: 36 },
  { category: "Healthcare", year: 2024, value: 25 },
  { category: "Healthcare", year: 2025, value: 28 },
  { category: "Healthcare", year: 2026, value: 34 },
  { category: "Healthcare", year: 2027, value: 42 }
];

export const punchCardSectors = ["Tech", "Energy", "Finance", "Retail", "Healthcare", "Aviation"];
export const punchCardTrends = ["Bullish", "Bearish", "Stable", "Volatile"];
export const punchCardData = [
  // This is a placeholder for the 3D surface but defined for types
  [0, 0, 5], [1, 0, 6], [2, 0, 4]
];