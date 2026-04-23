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
    outlookAndDrivers?: string[];
    interpretation?: string;
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
        label: "Technology and AI Sector",
        value: 27.5,
        dataPoints: [8.5, 12.0, 15.5, 20.8, 27.5],
        description: "Driven by generative AI, cloud infrastructure, and semiconductors. This sector is the fastest-growing globally with massive capital allocation toward digital transformation.",
        relatedCountries: ["AE", "US", "CN", "TW", "KR", "SA"],
        countryValues: { "AE": 40.0, "US": 28.0, "CN": 24.0, "TW": 30.0, "KR": 22.0, "SA": 32.5 }
      },
      {
        label: "Clean Energy Sector",
        value: 15.0,
        dataPoints: [9.4, 11.2, 12.8, 13.5, 15.0],
        description: "Expansion driven by the global transition toward solar, wind, and smart grids. Sovereign funds are pivoting heavily toward carbon neutrality and sustainable assets.",
        relatedCountries: ["AE", "CN", "BR", "US", "IN", "SA"],
        countryValues: { "AE": 28.0, "CN": 18.0, "BR": 17.0, "US": 15.0, "IN": 16.0, "SA": 20.5 }
      },
      {
        label: "Advanced Manufacturing Sector",
        value: 8.0,
        dataPoints: [4.5, 5.8, 6.2, 7.4, 8.0],
        description: "Focus on industrial automation, robotics, and supply chain restructuring. High-tech manufacturing is becoming a key pillar for high-value economic models.",
        relatedCountries: ["AE", "CN", "US", "DE", "IN", "SA"],
        countryValues: { "AE": 22.0, "CN": 8.0, "US": 7.0, "DE": 6.0, "IN": 9.0, "SA": 12.4 }
      }
    ],
    negativeTrends: [
      {
        label: "Construction & Real Estate Sector",
        value: -1.0,
        dataPoints: [-0.2, -0.5, -0.7, -0.9, -1.0],
        description: "Facing headwinds from high interest rates and slowing demand in advanced economies. Systemic risk remains high for legacy property financing models.",
        relatedCountries: ["US", "GB", "DE", "FR", "IT"],
        countryValues: { "US": -2.2, "GB": -4.0, "DE": -2.0, "FR": -1.5, "IT": -1.4 }
      },
      {
        label: "Heavy Industry Sector",
        value: -0.4,
        dataPoints: [-0.1, -0.2, -0.3, -0.3, -0.4],
        description: "Slowdown in international trade and rising production costs are impacting traditional manufacturing bases in Europe and North America.",
        relatedCountries: ["US", "DE", "GB", "IT", "JP"],
        countryValues: { "US": -1.0, "DE": -2.0, "GB": -1.5, "IT": -1.0, "JP": -0.3 }
      },
      {
        label: "Global Agriculture Sector",
        value: -0.5,
        dataPoints: [-0.1, -0.2, -0.3, -0.4, -0.5],
        description: "Climate change and drought conditions are causing significant fluctuations in global food production and grain exports.",
        relatedCountries: ["US", "BR", "IN", "AR", "ZA"],
        countryValues: { "US": -1.0, "BR": -0.5, "IN": -0.6, "AR": -4.0, "ZA": -3.0 }
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
          },
          outlookAndDrivers: [
            "2026–2027 slowdown phase: geopolitical shocks and energy volatility",
            "Productivity gains from AI diffusion and automation",
            "Stabilization of energy markets via renewables + nuclear expansion",
            "Partial normalization of trade flows after fragmentation shock"
          ],
          interpretation: "Slowdown phase followed by AI-led re-acceleration. Geopolitical volatility remains a persistent anchor on baseline growth.",
          unit: "%"
        }
      },
      {
        title: "Global Trade Volume",
        impact: "Medium",
        value: "$35.1 T",
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
          },
          outlookAndDrivers: [
            "Supply-chain regionalization (“friend-shoring”) increases costs/redundancy",
            "India–Gulf–Africa logistics axis becomes a new accelerator",
            "AI-enabled services trade becomes a major contributor",
            "Reconfiguration of global value chains"
          ],
          interpretation: "Moderate but structurally re-routed trade expansion rather than hyper-globalization. Trade grows faster than GDP due to structural reconfiguration.",
          unit: " T"
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
          },
          outlookAndDrivers: [
            "Ongoing pressures from energy volatility and geopolitical tensions",
            "Supply-chain restructuring increases structural production costs",
            "Expansionary fiscal policies in major economies support demand",
            "AI and automation productivity gains (gradual disinflation)"
          ],
          interpretation: "Phase of sticky inflation followed by gradual but uneven disinflation. Prices remain structurally higher than previous decades.",
          unit: "%"
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
          },
          outlookAndDrivers: [
            "Industrial restructuring in manufacturing and fossil fuel sectors",
            "Productivity shock from AI → short-term labor displacement",
            "Job creation in AI services, green infrastructure, and cybersecurity",
            "Emerging markets absorb labor via industrial relocation"
          ],
          interpretation: "Labor markets become more polarized but not structurally weaker. “Job churn increases” while aggregate unemployment gradually improves.",
          unit: "%"
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
        label: "Technology and AI Sector",
        value: 40.0,
        dataPoints: [15.0, 22.0, 30.0, 35.0, 40.0],
        description: "Leading global hub for AI. Growth driven by sovereign investment in data centers, digital infrastructure, and advanced government adoption of AI technologies.",
        relatedCountries: ["AE", "US", "CN", "TW", "KR"],
        countryValues: { "AE": 40.0, "US": 28.0, "CN": 24.0, "SA": 32.5, "TW": 30.0 }
      },
      {
        label: "Clean Energy Sector",
        value: 28.0,
        dataPoints: [10.0, 15.0, 20.0, 24.0, 28.0],
        description: "Rapid expansion of low-cost solar projects and integration of AI in grid management. Implementing carbon neutrality strategies with high execution speed.",
        relatedCountries: ["AE", "CN", "BR", "US", "IN"],
        countryValues: { "AE": 28.0, "CN": 18.0, "BR": 17.0, "US": 15.0, "IN": 16.0 }
      },
      {
        label: "Advanced Manufacturing Sector",
        value: 22.0,
        dataPoints: [8.0, 12.0, 15.0, 18.0, 22.0],
        description: "Development of smart industrial zones. Shift toward high-value manufacturing like aerospace and precision electronics while leveraging global logistics connectivity.",
        relatedCountries: ["AE", "CN", "US", "DE", "IN"],
        countryValues: { "AE": 22.0, "CN": 8.0, "US": 7.0, "DE": 6.0, "IN": 9.0 }
      }
    ],
    negativeTrends: [
      {
        label: "Construction & Real Estate Sector",
        value: -0.2,
        dataPoints: [-0.1, -0.1, -0.1, -0.2, -0.2],
        description: "Resilient compared to global peers but facing minor headwinds from high interest rates affecting long-term financing costs.",
        relatedCountries: ["US", "GB", "DE", "AE", "SA"],
        countryValues: { "AE": -0.2, "US": -2.2, "GB": -4.0, "DE": -2.0, "SA": -0.5 }
      },
      {
        label: "Heavy Industry Sector",
        value: -0.5,
        dataPoints: [-0.2, -0.3, -0.4, -0.5, -0.5],
        description: "Exposure to global demand fluctuations and rising production costs in legacy segments.",
        relatedCountries: ["AE", "DE", "JP", "CN", "IN"],
        countryValues: { "AE": -0.5, "DE": -2.0, "JP": -0.3, "CN": -1.2, "IN": -0.8 }
      },
      {
        label: "Global Agriculture Sector",
        value: -0.4,
        dataPoints: [-0.2, -0.3, -0.4, -0.4, -0.4],
        description: "Fluctuations in global food production affect import costs even as local food security initiatives expand.",
        relatedCountries: ["AE", "US", "BR", "IN", "AR"],
        countryValues: { "AE": -0.4, "US": -1.0, "BR": -0.5, "IN": -0.6, "AR": -4.0 }
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
          },
          outlookAndDrivers: [
            "2026–2027: normalization after strong expansion cycle (~5% baseline)",
            "2028–2030: re-acceleration driven by structural forces",
            "AI + digital economy scaling across government and private sector",
            "Tourism expansion (premium + long-stay residency model)",
            "Real estate + infrastructure mega-project cycle (D33 agenda)",
            "Financial hub deepening (wealth migration, capital inflows)",
            "Energy stability (oil + gas remains fiscal anchor but declining GDP share)"
          ],
          interpretation: "UAE does not decouple from global cycles, but its growth floor rises. Economy behaves like a “managed high-growth hub economy” (5–5.6%)"
        }
      },
      {
        title: "UAE Trade Volume",
        impact: "High",
        value: "$1.62 T",
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
          },
          outlookAndDrivers: [
            "Expansion of Dubai–Abu Dhabi logistics + re-export ecosystems",
            "Growth of India–Gulf–Africa trade corridor",
            "Rising share of services exports (finance, tourism, AI, digital services)",
            "Continued role as a neutral trade intermediary amid global fragmentation"
          ],
          interpretation: "Trade grows faster than GDP, reinforcing UAE’s position as a global re-export and services hub. Non-oil trade increasingly dominates value creation."
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
          },
          outlookAndDrivers: [
            "Strong import efficiency via logistics hubs",
            "Currency peg to USD ensures monetary stability",
            "Productivity gains from automation and AI",
            "Housing + real estate demand (population inflows)",
            "High-skilled labor immigration",
            "Service-sector price normalization (tourism, healthcare, education)"
          ],
          interpretation: "Inflation remains contained but not ultra-low. UAE transitions from “price-stable emerging economy” → “mild inflation growth hub economy”"
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
          },
          outlookAndDrivers: [
            "Large expatriate labor market with flexible absorption",
            "High labor mobility (no rigid unemployment cycles)",
            "Continuous inflow of skilled migrants",
            "AI increases productivity but creates offsetting high-skill jobs",
            "Growth in construction, logistics, tourism, finance, and tech",
            "Expansion of free zones and startup ecosystems"
          ],
          interpretation: "UAE unemployment is not cyclical in the traditional sense. It behaves more like a “labor-import equilibrium system”. Structural unemployment remains anchored near 2%"
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
        label: "Technology and AI Sector",
        value: 28.0,
        dataPoints: [10.0, 15.0, 20.0, 24.0, 28.0],
        description: "Key growth driver through major technology companies. Dominating generative AI, cloud computing, and semiconductor designs.",
        relatedCountries: ["US", "AE", "CN", "TW", "KR"],
        countryValues: { "US": 28.0, "AE": 40.0, "CN": 24.0, "TW": 30.0, "KR": 22.0 }
      },
      {
        label: "Clean Energy Sector",
        value: 15.0,
        dataPoints: [5.0, 8.0, 11.0, 13.0, 15.0],
        description: "Supported by massive government incentives and investments in solar and wind infrastructure modernization.",
        relatedCountries: ["US", "CN", "AE", "DE", "IN"],
        countryValues: { "US": 15.0, "CN": 18.0, "AE": 28.0, "DE": 12.0, "IN": 16.0 }
      },
      {
        label: "Advanced Manufacturing Sector",
        value: 7.0,
        dataPoints: [2.0, 3.5, 5.0, 6.0, 7.0],
        description: "Driven by reshoring of strategic industries and adoption of industrial robotics and AI integration.",
        relatedCountries: ["US", "CN", "DE", "JP", "IN"],
        countryValues: { "US": 7.0, "CN": 8.0, "DE": 6.0, "JP": 5.0, "IN": 9.0 }
      }
    ],
    negativeTrends: [
      {
        label: "Construction & Real Estate Sector",
        value: -2.2,
        dataPoints: [-0.5, -1.0, -1.5, -2.0, -2.2],
        description: "Largest global negative contributor. High interest rates have collapsed mortgage demand and slowed commercial projects.",
        relatedCountries: ["US", "GB", "DE", "FR", "IT"],
        countryValues: { "US": -2.2, "GB": -4.0, "DE": -2.0, "FR": -1.5, "IT": -1.4 }
      },
      {
        label: "Heavy Industry Sector",
        value: -1.0,
        dataPoints: [-0.2, -0.4, -0.6, -0.8, -1.0],
        description: "Slowdown in industrial tech sector and lower demand for capital goods amid supply chain restructuring.",
        relatedCountries: ["US", "DE", "GB", "IT", "JP"],
        countryValues: { "US": -1.0, "DE": -2.0, "GB": -1.5, "IT": -1.0, "JP": -0.3 }
      },
      {
        label: "Global Agriculture Sector",
        value: -1.0,
        dataPoints: [-0.2, -0.4, -0.6, -0.8, -1.0],
        description: "Drought in key agricultural states impacting corn and wheat production volumes.",
        relatedCountries: ["US", "BR", "IN", "AR", "ZA"],
        countryValues: { "US": -1.0, "BR": -0.5, "IN": -0.6, "AR": -4.0, "ZA": -3.0 }
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
        label: "Technology and AI Sector",
        value: 18.5,
        dataPoints: [5.0, 8.0, 12.0, 15.0, 18.5],
        description: "Emerging regional software powerhouse. Growth driven by talent density and competitive outsourcing mandates.",
        relatedCountries: ["JO", "AE", "SA", "EG", "LB"],
        countryValues: { "JO": 18.5, "AE": 12.4, "SA": 10.2, "EG": 8.5, "LB": 5.1 }
      },
      {
        label: "Clean Energy Sector",
        value: 12.0,
        dataPoints: [4.0, 6.0, 8.0, 10.0, 12.0],
        description: "Expansion in solar and wind projects to reduce energy import reliance and support industrial growth.",
        relatedCountries: ["JO", "EG", "MA", "TR", "AE"],
        countryValues: { "JO": 12.0, "EG": 18.5, "MA": 15.2, "TR": 12.8, "AE": 10.5 }
      },
      {
        label: "Advanced Manufacturing Sector",
        value: 9.5,
        dataPoints: [3.0, 5.0, 7.0, 8.5, 9.5],
        description: "Focus on pharmaceuticals and high-value chemical manufacturing for regional export markets.",
        relatedCountries: ["JO", "SA", "AE", "IQ", "EG"],
        countryValues: { "JO": 9.5, "SA": 12.0, "AE": 22.0, "IQ": 6.5, "EG": 7.0 }
      }
    ],
    negativeTrends: [
      {
        label: "Construction & Real Estate Sector",
        value: -1.2,
        dataPoints: [-0.3, -0.5, -0.8, -1.0, -1.2],
        description: "Slowdown in residential development due to high financing costs and regional economic uncertainty.",
        relatedCountries: ["JO", "EG", "LB", "SY", "AE"],
        countryValues: { "JO": -1.2, "EG": -0.8, "LB": -2.5, "SY": -3.0, "AE": -0.2 }
      },
      {
        label: "Heavy Industry Sector",
        value: -2.1,
        dataPoints: [-0.5, -1.0, -1.5, -1.8, -2.1],
        description: "Facing pressure from rising energy import costs and logistics friction in the Levant region.",
        relatedCountries: ["JO", "EG", "IQ", "LB", "TR"],
        countryValues: { "JO": -2.1, "EG": -1.5, "IQ": -1.2, "LB": -3.5, "TR": -0.8 }
      },
      {
        label: "Global Agriculture Sector",
        value: -1.8,
        dataPoints: [-0.4, -0.8, -1.2, -1.5, -1.8],
        description: "Water scarcity and climate volatility impacting local crop yields and agricultural stability.",
        relatedCountries: ["JO", "EG", "IQ", "SY", "SA"],
        countryValues: { "JO": -1.8, "EG": -1.2, "IQ": -1.0, "SY": -2.5, "SA": -0.3 }
      }
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
      {
        label: "Technology and AI Sector",
        value: 24.0,
        dataPoints: [10.0, 15.0, 18.0, 21.0, 24.0],
        description: "Driven by expansion of domestic chip manufacturing and development of national AI systems.",
        relatedCountries: ["CN", "TW", "KR", "US", "AE"],
        countryValues: { "CN": 24.0, "TW": 30.0, "KR": 22.0, "US": 28.0, "AE": 40.0 }
      },
      {
        label: "Clean Energy Sector",
        value: 18.0,
        dataPoints: [8.0, 11.0, 14.0, 16.0, 18.0],
        description: "Leads global production of solar panels and battery technologies. Core engine for green industrial growth.",
        relatedCountries: ["CN", "BR", "US", "IN", "DE"],
        countryValues: { "CN": 18.0, "BR": 17.0, "US": 15.0, "IN": 16.0, "DE": 12.0 }
      },
      {
        label: "Advanced Manufacturing Sector",
        value: 8.0,
        dataPoints: [4.0, 5.5, 6.5, 7.5, 8.0],
        description: "Massive industrial base expansion in industrial robotics and high-tech supply chain automation.",
        relatedCountries: ["CN", "US", "DE", "JP", "IN"],
        countryValues: { "CN": 8.0, "US": 7.0, "DE": 6.0, "JP": 5.0, "IN": 9.0 }
      }
    ],
    negativeTrends: [
      {
        label: "Construction & Real Estate Sector",
        value: -1.5,
        dataPoints: [-0.5, -0.8, -1.0, -1.3, -1.5],
        description: "Ongoing deleveraging in the real estate market is dampening consumer confidence and local gov revenue.",
        relatedCountries: ["CN", "HK", "AU", "SG", "VN"],
        countryValues: { "CN": -1.5, "HK": -2.0, "AU": -0.8, "SG": -0.5, "VN": -0.4 }
      },
      {
        label: "Heavy Industry Sector",
        value: -1.2,
        dataPoints: [-0.4, -0.6, -0.8, -1.0, -1.2],
        description: "Slowdown in traditional heavy manufacturing due to energy costs and cooling demand in export markets.",
        relatedCountries: ["CN", "DE", "JP", "KR", "US"],
        countryValues: { "CN": -1.2, "DE": -2.0, "JP": -0.3, "KR": -0.8, "US": -1.0 }
      },
      {
        label: "Global Agriculture Sector",
        value: -0.2,
        dataPoints: [-0.1, -0.1, -0.2, -0.2, -0.2],
        description: "Climate fluctuations affecting crop consistency, though offset by expansive domestic food security reserves.",
        relatedCountries: ["CN", "US", "BR", "IN", "AR"],
        countryValues: { "CN": -0.2, "US": -1.0, "BR": -0.5, "IN": -0.6, "AR": -4.0 }
      }
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
            forecast: "Z-Model highlights a surge in Advanced Manufacturing Sector and green energy maintenance roles. Demographic tightening will naturally lead to a lower long-term unemployment baseline."
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
      {
        label: "Technology and AI Sector",
        value: 35.7,
        dataPoints: [15.0, 20.0, 25.0, 30.0, 35.7],
        description: "Rapid transformation through digital infrastructure scaling and emerging status as a global AI services hub.",
        relatedCountries: ["IN", "US", "GB", "AE", "SG"],
        countryValues: { "IN": 35.7, "US": 28.0, "GB": 25.0, "AE": 40.0, "SG": 22.0 }
      },
      {
        label: "Clean Energy Sector",
        value: 16.0,
        dataPoints: [6.0, 9.0, 12.0, 14.5, 16.0],
        description: "Significant expansion in solar energy projects and modernization of the national electricity grid.",
        relatedCountries: ["IN", "CN", "AE", "US", "BR"],
        countryValues: { "IN": 16.0, "CN": 18.0, "AE": 28.0, "US": 15.0, "BR": 17.0 }
      },
      {
        label: "Advanced Manufacturing Sector",
        value: 9.0,
        dataPoints: [3.0, 5.0, 6.5, 8.0, 9.0],
        description: "Expansion of the industrial base supported by national manufacturing programs and industrial automation.",
        relatedCountries: ["IN", "CN", "US", "DE", "JP"],
        countryValues: { "IN": 9.0, "CN": 8.0, "US": 7.0, "DE": 6.0, "JP": 5.0 }
      }
    ],
    negativeTrends: [
      {
        label: "Construction & Real Estate Sector",
        value: -0.8,
        dataPoints: [-0.2, -0.4, -0.6, -0.7, -0.8],
        description: "Infrastructure bottlenecks and high financing costs impacting large-scale residential projects.",
        relatedCountries: ["IN", "US", "GB", "CN", "AE"],
        countryValues: { "IN": -0.8, "US": -2.2, "GB": -4.0, "CN": -1.5, "AE": -0.2 }
      },
      {
        label: "Heavy Industry Sector",
        value: -1.0,
        dataPoints: [-0.3, -0.5, -0.7, -0.9, -1.0],
        description: "Logistical delays and rising operational overhead affecting traditional heavy industrial corridors.",
        relatedCountries: ["IN", "CN", "DE", "JP", "US"],
        countryValues: { "IN": -1.0, "CN": -1.2, "DE": -2.0, "JP": -0.3, "US": -1.0 }
      },
      {
        label: "Global Agriculture Sector",
        value: -0.6,
        dataPoints: [-0.2, -0.3, -0.4, -0.5, -0.6],
        description: "Monsoon variability and climate stress affecting consistency of rice and wheat production.",
        relatedCountries: ["IN", "US", "BR", "AR", "ZA"],
        countryValues: { "IN": -0.6, "US": -1.0, "BR": -0.5, "AR": -4.0, "ZA": -3.0 }
      }
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
  SA: { // Saudi Arabia Specific Data
    positiveTrends: [
      {
        label: "Technology and AI Sector",
        value: 32.5,
        dataPoints: [10.0, 15.0, 22.0, 28.0, 32.5],
        description: "Vision 2030 digital core expansion. Massive investment in AI gaming hubs, regional data centers, and digital government infrastructure.",
        relatedCountries: ["SA", "AE", "US", "CN", "TW"],
        countryValues: { "SA": 32.5, "AE": 40.0, "US": 28.0, "CN": 24.0, "TW": 30.0 }
      },
      {
        label: "Clean Energy Sector",
        value: 20.5,
        dataPoints: [5.0, 9.0, 14.0, 18.0, 20.5],
        description: "Strategic pivot toward solar, green hydrogen, and circular economy projects under the Saudi Green Initiative.",
        relatedCountries: ["SA", "AE", "CN", "BR", "US"],
        countryValues: { "SA": 20.5, "AE": 28.0, "CN": 18.0, "BR": 17.0, "US": 15.0 }
      },
      {
        label: "Advanced Manufacturing Sector",
        value: 12.4,
        dataPoints: [3.0, 5.5, 8.0, 10.5, 12.4],
        description: "Mining sector expansion and downstream petrochemical Advanced Manufacturing Sector. Localizing critical supply chains for the MENA region.",
        relatedCountries: ["SA", "AE", "CN", "DE", "IN"],
        countryValues: { "SA": 12.4, "AE": 22.0, "CN": 8.0, "DE": 6.0, "IN": 9.0 }
      }
    ],
    negativeTrends: [
      {
        label: "Construction & Real Estate Sector",
        value: -0.5,
        dataPoints: [-0.1, -0.2, -0.3, -0.4, -0.5],
        description: "Massive project demand offset by higher capital costs. Strategic realignment of giga-projects to manage fiscal liquidity.",
        relatedCountries: ["SA", "AE", "US", "GB", "DE"],
        countryValues: { "SA": -0.5, "AE": -0.2, "US": -1.0, "GB": -1.5, "DE": -1.2 }
      },
      {
        label: "Heavy Industry Sector",
        value: -0.8,
        dataPoints: [-0.2, -0.4, -0.6, -0.7, -0.8],
        description: "Exposure to global demand fluctuations in traditional petrochemical cycles and rising operational overhead.",
        relatedCountries: ["SA", "DE", "CN", "JP", "US"],
        countryValues: { "SA": -0.8, "DE": -2.0, "CN": -1.2, "JP": -0.3, "US": -1.0 }
      },
      {
        label: "Global Agriculture Sector",
        value: -0.3,
        dataPoints: [-0.1, -0.2, -0.3, -0.3, -0.3],
        description: "High reliance on international food chains making fiscal spend sensitive to global grain price volatility.",
        relatedCountries: ["SA", "AE", "US", "BR", "IN"],
        countryValues: { "SA": -0.3, "AE": -0.4, "US": -1.0, "BR": -0.5, "IN": -0.6 }
      }
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
      {
        label: "Technology and AI Sector",
        value: 12.0,
        dataPoints: [3.0, 6.0, 8.0, 10.0, 12.0],
        description: "Focus on domestic tech self-reliance and cloning of global platforms for the regional market.",
        relatedCountries: ["RU", "CN", "IR", "TR", "IN"],
        countryValues: { "RU": 12.0, "CN": 24.0, "IR": 15.2, "TR": 10.5, "IN": 35.7 }
      },
      {
        label: "Clean Energy Sector",
        value: 8.5,
        dataPoints: [2.0, 4.0, 6.0, 7.5, 8.5],
        description: "Expansion in Arctic energy infrastructure and regional grid adaptation strategies.",
        relatedCountries: ["RU", "CN", "IN", "QA", "AE"],
        countryValues: { "RU": 8.5, "CN": 18.0, "IN": 16.0, "QA": 10.2, "AE": 28.0 }
      },
      {
        label: "Advanced Manufacturing Sector",
        value: 10.2,
        dataPoints: [3.0, 5.0, 7.0, 9.0, 10.2],
        description: "Industrial core expansion in Aerospace and defense-adjacent high-tech segments.",
        relatedCountries: ["RU", "CN", "IN", "US", "DE"],
        countryValues: { "RU": 10.2, "CN": 8.0, "IN": 9.0, "US": 7.0, "DE": 6.0 }
      }
    ],
    negativeTrends: [
      {
        label: "Construction & Real Estate Sector",
        value: -2.5,
        dataPoints: [-0.5, -1.0, -1.5, -2.0, -2.5],
        description: "Housing sector contraction due to rising financing costs and material supply chain friction.",
        relatedCountries: ["RU", "DE", "GB", "CN", "AE"],
        countryValues: { "RU": -2.5, "DE": -2.0, "GB": -1.5, "CN": -1.5, "AE": -0.2 }
      },
      {
        label: "Heavy Industry Sector",
        value: -1.8,
        dataPoints: [-0.4, -0.8, -1.2, -1.5, -1.8],
        description: "Decline in European demand for industrial machinery and rising specialized production costs.",
        relatedCountries: ["RU", "DE", "IT", "JP", "CN"],
        countryValues: { "RU": -1.8, "DE": -2.0, "IT": -1.0, "JP": -0.3, "CN": -1.2 }
      },
      {
        label: "Global Agriculture Sector",
        value: -0.1,
        dataPoints: [-0.1, -0.1, -0.1, -0.1, -0.1],
        description: "Consistent yield volumes offset by logistical friction in international grain export channels.",
        relatedCountries: ["RU", "BR", "IN", "AR", "ZA"],
        countryValues: { "RU": -0.1, "BR": -0.5, "IN": -0.6, "AR": -4.0, "ZA": -3.0 }
      }
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
      {
        label: "Technology and AI Sector",
        value: 15.2,
        dataPoints: [5.0, 8.0, 10.0, 12.0, 15.2],
        description: "Local startups successfully adapting global models for the insulated domestic market and regional corridors.",
        relatedCountries: ["IR", "RU", "CN", "TR", "IN"],
        countryValues: { "IR": 15.2, "RU": 12.0, "CN": 24.0, "TR": 10.5, "IN": 35.7 }
      },
      {
        label: "Clean Energy Sector",
        value: 11.4,
        dataPoints: [2.0, 5.0, 8.0, 9.5, 11.4],
        description: "Growth in regional energy bridges and increased gas exports providing critical hard currency inflows.",
        relatedCountries: ["IR", "IQ", "TR", "PK", "TM"],
        countryValues: { "IR": 11.4, "IQ": 8.5, "TR": 7.2, "PK": 5.1, "TM": 4.8 }
      },
      {
        label: "Advanced Manufacturing Sector",
        value: 8.5,
        dataPoints: [2.0, 4.0, 6.0, 7.5, 8.5],
        description: "Focus on domestic industrial self-reliance and specialized component manufacturing for the regional market.",
        relatedCountries: ["IR", "RU", "CN", "AE", "SA"],
        countryValues: { "IR": 8.5, "RU": 10.2, "CN": 8.0, "AE": 22.0, "SA": 12.4 }
      }
    ],
    negativeTrends: [
      {
        label: "Construction & Real Estate Sector",
        value: -3.2,
        dataPoints: [-0.5, -1.2, -1.8, -2.5, -3.2],
        description: "Slowdown in urban development due to financing friction and extreme currency volatility.",
        relatedCountries: ["IR", "AR", "TR", "LB", "SY"],
        countryValues: { "IR": -3.2, "AR": -4.0, "TR": -1.5, "LB": -2.5, "SY": -3.0 }
      },
      {
        label: "Heavy Industry Sector",
        value: -2.8,
        dataPoints: [-0.5, -1.2, -1.8, -2.4, -2.8],
        description: "Maintenance backlogs in aviation and energy sectors due to limited access to global supply chains.",
        relatedCountries: ["IR", "RU", "VE", "CU", "SD"],
        countryValues: { "IR": -2.8, "RU": -1.8, "VE": -2.2, "CU": -1.2, "SD": -2.5 }
      },
      {
        label: "Global Agriculture Sector",
        value: -1.5,
        dataPoints: [-0.3, -0.6, -0.9, -1.2, -1.5],
        description: "Environmental stress and climate fluctuations affecting crop yields in regional agricultural hubs.",
        relatedCountries: ["IR", "IQ", "AF", "SY", "SA"],
        countryValues: { "IR": -1.5, "IQ": -1.0, "AF": -2.0, "SY": -2.5, "SA": -0.3 }
      }
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
  { label: "Global Trade Volume", value: "$32 T", change: "+1.5%", trend: "up", organization: "WTO" },
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