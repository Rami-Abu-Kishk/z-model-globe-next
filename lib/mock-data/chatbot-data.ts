export interface ChatBotResponse {
  text: string;
  status?: string;
  insightData?: any;
  event?: {
    type: 'MAP_NAVIGATE' | 'FILTER_DASHBOARD' | 'HIGHLIGHT_GRID';
    payload: any;
  };
}

export const chatbotData: Record<string, Record<string, ChatBotResponse>> = {
  GLOBAL: {
    ECONOMY: {
      text: "Global GDP is projected to grow by 2.9% in 2024, driven primarily by resilience in emerging markets and the AI technology surge.",
      insightData: {
        title: "Global Economic Outlook",
        kpis: [
          { label: "Projected Growth", value: "2.9%" },
          { label: "Inflation Trend", value: "Easing" }
        ]
      },
      event: { type: 'FILTER_DASHBOARD', payload: { category: 'economy', scale: 'global' } }
    },
    INVESTMENT: {
      text: "International investment flows are pivoting toward Green Energy and AI infrastructure, with a 15% increase in cross-border tech CAPEX.",
      event: { type: 'HIGHLIGHT_GRID', payload: { module: 'investment', priority: 'high' } }
    },
    DEFAULT: {
      text: "I am the Z-Model AI. I can provide insights on Global, India, UAE, USA, Japan, and Germany markets. Try asking about 'India GDP growth' or 'UAE investments'."
    }
  },
  TRIGGERS: {
    "GLOBAL AI SECTOR GROWTH": {
      text: "Z-Model audit cores detect a massive 34.5% surge in AI-related CAPEX. This is no longer speculative; we see structural technological expansion across G7 hubs. Projections indicate a 2x efficiency multiplier in industrial output by 2028.",
      insightData: {
        title: "AI Growth Audit",
        kpis: [
          { label: "CAGR Delta", value: "+34.5%" },
          { label: "Stability", value: "High" }
        ]
      }
    },
    "GREEN ENERGY INVESTMENT": {
      text: "Sustainability shifts are accelerating. The 18.2% growth in Green Energy reflects a permanent capital pivot. Institutional investors are de-risking fossil assets in favor of decentralized hydrogen and solar grids.",
      insightData: {
        title: "Green Capital Pivot",
        kpis: [
          { label: "Capital Flow", value: "+18.2%" },
          { label: "Grid Impact", value: "Regional" }
        ]
      }
    },
    "EMERGING MARKETS TECH": {
      text: "Tech adoption in developing regions is outpacing legacy markets. We see a 12.4% rise in regional fintech and logistics hubs, particularly across SE Asia and GCC corridors.",
      insightData: {
        title: "EM Growth Vector",
        kpis: [
          { label: "Adoption Rate", value: "+12.4%" },
          { label: "Geo-Context", value: "Emerging" }
        ]
      }
    },
    "COMMERCIAL REAL ESTATE": {
      text: "The -8.5% correction in Commercial Real Estate is a direct consequence of the remote-work pivot. We advise monitoring refinancing risks over the next 14 months as lease maturities trigger market liquidations.",
      insightData: {
        title: "CRE Risk Analysis",
        kpis: [
          { label: "Contraction", value: "-8.5%" },
          { label: "Risk Factor", value: "Elevated" }
        ]
      }
    },
    "LEGACY SUPPLY CHAIN": {
      text: "Static logistics frameworks are failing. The -4.2% dip highlights critical bottlenecks in maritime and rail. Modernization via Z-Model autonomous protocols is the only viable path to restoration.",
      insightData: {
        title: "Supply Chain Audit",
        kpis: [
          { label: "Efficiency dip", value: "-4.2%" },
          { label: "Constraint", value: "Legacy" }
        ]
      }
    },
    "GLOBAL INFLATION DRAG": {
      text: "Purchasing power is under sustained pressure. The -2.1% drag reflects the lingering delta between wage growth and core CPI. Central bank hawkishness remains the primary headwind.",
      insightData: {
        title: "Inflation Delta",
        kpis: [
          { label: "Drag Force", value: "-2.1%" },
          { label: "Policy State", value: "Tight" }
        ]
      }
    },
    "GLOBAL GDP GROWTH": {
      text: "IMF data confirms a 2.9% global baseline. While modest, this stability is a 'Goldilocks' zone for many developed markets. We see resilience in consumer spending offsetting manufacturing headwinds.",
      insightData: {
        title: "Global GDP Stability",
        kpis: [
          { label: "Current Growth", value: "2.9%" },
          { label: "Stability Index", value: "0.84" }
        ]
      }
    },
    "TRADE VOLUME INDEX": {
      text: "Cross-border commerce health remains positive at 104.5. This high-water mark suggests that despite geopolitical 'de-risking', the physical flow of goods remains robust across core trade corridors.",
      insightData: {
        title: "Commerce Health",
        kpis: [
          { label: "Volume Index", value: "104.5" },
          { label: "Trade Flow", value: "Resilient" }
        ]
      }
    },
    // POLITICAL TRIGGERS
    "MIDDLE EAST TRADE ROUTES": {
      text: "Tactical Assessment: Trade route stability is currently categorized as 'Guarded'. Z-Model sensors detect increased maritime insurance premiums. Diplomatic channels are active, but we advise preparing contingency logistics via the Northern Corridor to mitigate potential bab-el-Mandeb volatility.",
      insightData: {
        title: "Trade Route Briefing",
        kpis: [
          { label: "Stability", value: "Guarded" },
          { label: "Risk Delta", value: "+12%" }
        ]
      }
    },
    "EAST SEA TENSIONS": {
      text: "Diplomatic Audit: Escalating naval presence is creating a high-frequency friction zone. Our involved parties analysis shows a deadlock in bilateral talks. Immediate implication is a 15% increase in regional security CAPEX for Tier-1 corporate assets.",
      insightData: {
        title: "East Sea Audit",
        kpis: [
          { label: "Tension Level", value: "High" },
          { label: "Impact", value: "Resource Flow" }
        ]
      }
    },
    "BAB-EL-MANDEB SECURITY": {
      text: "Strategic Security Report: Bab-el-Mandeb remains a critical bottleneck. Z-Model military-grade telemetry identifies persistent asymmetric threats. Sovereign navies are coordinating, but 'Freedom of Navigation' operations are currently at peak intensity.",
      insightData: {
        title: "Maritime Security",
        kpis: [
          { label: "Status", value: "Critical" },
          { label: "Naval Load", value: "92%" }
        ]
      }
    },
    // MEDIA TRIGGERS
    "MENA CLOUD INFRASTRUCTURE EXPANSION": {
      text: "A massive expansion of the sovereign cloud infrastructure across the MENA region, focusing on Al safety and data residency.\n\nStrategic intelligence reports indicate that this development will have significant implications for regional sovereignty and digital infrastructure. Our analysis suggests a 15% increase in operational efficiency across relevant sectors within the next fiscal quarter.",
      insightData: {
        title: "MENA Cloud Expansion",
        kpis: [
          { label: "Operational Efficiency", value: "+15%" },
          { label: "Sector Focus", value: "AI & Data" }
        ]
      }
    },
    "GLOBAL SUMMIT ON AI ETHICS": {
      text: "Sentiment Analysis: 85% Positive / 15% Skeptical. Media consensus suggests this summit is a pivot point for harmonized global regulation. Public impact is high, with 'Trust' metrics for big-tech entities seeing a 12-point recovery following the transparency pledge.",
      insightData: {
        title: "AI Media Sentiment",
        kpis: [
          { label: "Sentiment Score", value: "85%" },
          { label: "Public Trust", value: "+12" }
        ]
      }
    },
    "MARKET REACTION TO CENTRAL BANK PIVOT": {
      text: "Fact-Check Scan: Contradictory reporting detected. While tier-1 outlets focus on the 'dovish' stance, regional bureaus highlight surging bond yields. Public sentiment is 'Confused', with a high volatility index across retail social channels.",
      insightData: {
        title: "CB Pivot Analysis",
        kpis: [
          { label: "Media Bias", value: "Moderate" },
          { label: "Volatility", value: "High" }
        ]
      }
    },
    // INVESTMENT TRIGGERS
    "GLOBAL AI INFRASTRUCTURE HUB": {
      text: "Investment Thesis: This hub is the cornerstone of the 'Compute-Sovereignty' play. ROI is projected at 22% CAGR over 5 years. Primary barriers: Energy grid capacity and advanced silicon quotas. Sovereign wealth strategy: Direct equity in hydro-cooled data centers.",
      insightData: {
        title: "AI Hub Thesis",
        kpis: [
          { label: "Proj. ROI", value: "22%" },
          { label: "Strategy", value: "Direct Equity" }
        ]
      }
    },
    "GREEN ENERGY TRANSITION": {
      text: "Transition Briefing: Pivot from legacy grids to decentralized hydrogen is entering Phase 3. Market entry barriers are falling due to sovereign subsidies. We recommend a 15% allocation shift from ESG-compliant debt to direct infrastructure ownership.",
      insightData: {
        title: "Energy Pivot Thesis",
        kpis: [
          { label: "Transition Phase", value: "3/5" },
          { label: "Alloc. Shift", value: "15%" }
        ]
      }
    }
  },
  AE: {
    ECONOMY: {
      text: "The UAE's non-oil GDP has surged by 4.5%, reflecting successful diversification under the 'We the UAE 2031' strategy.",
      insightData: {
        title: "UAE Non-Oil Performance",
        kpis: [
          { label: "Non-Oil Growth", value: "+4.5%" },
          { label: "FDI Inflow", value: "$23B" }
        ]
      },
      event: { type: 'MAP_NAVIGATE', payload: { countryCode: 'AE', zoom: 4 } }
    },
    INVESTMENT: {
      text: "Abu Dhabi remains a top target for sovereign wealth, with major allocations in renewable energy and advanced logistics corridors.",
      event: { type: 'FILTER_DASHBOARD', payload: { country: 'UAE', sector: 'investment' } }
    }
  },
  US: {
    ECONOMY: {
      text: "The US economy is navigating high-interest rates with surprising labor market resilience, though commercial real estate remains a constraint.",
      event: { type: 'MAP_NAVIGATE', payload: { countryCode: 'US', zoom: 3 } }
    },
    INVESTMENT: {
      text: "Tech and Semiconductor manufacturing are the primary investment drivers in the US, supported by recent federal industrial policy updates.",
      event: { type: 'HIGHLIGHT_GRID', payload: { region: 'US', sectors: ['tech', 'semi'] } }
    }
  },
  JP: {
    ECONOMY: {
      text: "Japan is seeing a historic shift in monetary policy as it exits negative interest rates, boosting domestic consumption expectations.",
      event: { type: 'MAP_NAVIGATE', payload: { countryCode: 'JP', zoom: 5 } }
    }
  },
  DE: {
    ECONOMY: {
      text: "Germany is refocusing on industrial modernization and green hydrogen to maintain its export-oriented competitive edge in the Eurozone.",
      event: { type: 'MAP_NAVIGATE', payload: { countryCode: 'DE', zoom: 5 } }
    }
  }
};

export const COUNTRY_DATA: Record<string, ChatBotResponse> = {
  "AE": {
    text: "UAE Executive Briefing: The federation is successfully pivoting toward a post-oil future through deep AI integration and non-oil GDP expansion (+4.5%). Tech-driven sovereign investments are accelerating in the Advanced Technology Research Council (ATRC) ecosystem.",
    insightData: {
      title: "UAE Economic Pivot",
      kpis: [
        { label: "Non-Oil Growth", value: "+4.5%" },
        { label: "AI Integration", value: "Strategic" }
      ]
    },
    event: { type: 'MAP_NAVIGATE', payload: { countryCode: 'AE', zoom: 4 } }
  },
  "SA": {
    text: "Saudi Arabia Strategic Outlook: Vision 2030 implementation is entering an intensive phase. Infrastructure gigaprojects (NEOM, Red Sea) are driving critical CAPEX, while the renewable energy transition is positioning the Kingdom as a future green hydrogen exporter.",
    insightData: {
      title: "KSA Vision 2030",
      kpis: [
        { label: "Gigaproject Load", value: "High" },
        { label: "Energy Pivot", value: "Active" }
      ]
    },
    event: { type: 'MAP_NAVIGATE', payload: { countryCode: 'SA', zoom: 3.5 } }
  },
  "US": {
    text: "USA Market Intelligence: Policy focus remains centered on federal interest rate normalization. We detect early signs of commercial real estate stabilization in tier-1 metros. Legacy supply chains are undergoing rapid modernization through domestic semiconductor reshoring.",
    insightData: {
      title: "US Market Audit",
      kpis: [
        { label: "Policy Rate", value: "5.25-5.5%" },
        { label: "RE Stability", value: "Gaining" }
      ]
    },
    event: { type: 'MAP_NAVIGATE', payload: { countryCode: 'US', zoom: 3 } }
  },
  "JO": {
    text: "Jordan Digital Briefing: Amman and Irbid are emerging as regional software development powerhouses. Digital infrastructure expansion is supporting a new wave of tech exports. Notably, Jordan leads the region in Electric Vehicle (EV) adoption, with BYD and Changan models dominating the local market.",
    insightData: {
      title: "Jordan Tech Hub",
      kpis: [
        { label: "EV Adoption", value: "High-Range" },
        { label: "Software Hubs", value: "Growing" }
      ]
    },
    event: { type: 'MAP_NAVIGATE', payload: { countryCode: 'JO', zoom: 6 } }
  },
  "IN": {
    text: "India Strategic Briefing: The nation is currently the fastest-growing major economy (7.6% FY26 projection). The 'PM Gati Shakti' master plan and PLI manufacturing schemes are driving a structural pivot toward high-tech exports. Digital Public Infrastructure (DPI) remains a core competitive advantage.",
    insightData: {
      title: "India Growth Alpha",
      kpis: [
        { label: "Proj. GDP Growth", value: "7.6%" },
        { label: "Savings Rate", value: "30.3%" }
      ]
    },
    event: { type: 'MAP_NAVIGATE', payload: { countryCode: 'IN', zoom: 3.5 } }
  },
  "GLOBAL": {
    text: "Global Executive Overview: The macro landscape is defined by three converging vectors: the AI efficiency multiplier, the global energy transition, and a transition from globalized to regionalized trade corridors. Stability remains the primary KPI for sovereign forecasting.",
    insightData: {
      title: "Global Macro Context",
      kpis: [
        { label: "Macro Stability", value: "Guarded" },
        { label: "Trade Shift", value: "Regional" }
      ]
    }
  }
};
