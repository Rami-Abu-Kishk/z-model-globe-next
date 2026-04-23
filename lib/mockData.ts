export interface TrendBrief {
  title: string;
  description: string;
  value: string;
}

export interface SearchableCountry {
  name: string;
  iso: string;
  lat: number;
  lng: number;
  flag: string;
  summary?: string;
  economyStatus?: string;
  politicalStatus?: string;
  newsHeadline?: string;
  // Trend Briefs for the 4 sections
  economyTrend?: TrendBrief;
  investmentTrend?: TrendBrief;
  politicalTrend?: TrendBrief;
  mediaTrend?: TrendBrief;
}

// A more comprehensive list of countries to ensure "everything" is searchable
export const searchableCountries: SearchableCountry[] = [
  { name: 'Afghanistan', iso: 'AF', lat: 33.9391, lng: 67.7100, flag: '🇦🇫' },
  { name: 'Albania', iso: 'AL', lat: 41.1533, lng: 20.1683, flag: '🇦🇱' },
  { name: 'Algeria', iso: 'DZ', lat: 28.0339, lng: 1.6596, flag: '🇩🇿' },
  { name: 'Andorra', iso: 'AD', lat: 42.5063, lng: 1.5218, flag: '🇦🇩' },
  { name: 'Angola', iso: 'AO', lat: -11.2027, lng: 17.8739, flag: '🇦🇴' },
  { name: 'Argentina', iso: 'AR', lat: -38.4161, lng: -63.6167, flag: '🇦🇷', summary: 'Resource-rich economy undergoing major reform.', economyStatus: 'Hyper-inflationary', politicalStatus: 'Transitional', newsHeadline: 'New fiscal policy impacts grain exports' },
  { name: 'Armenia', iso: 'AM', lat: 40.0691, lng: 45.0382, flag: '🇦🇲' },
  { name: 'Australia', iso: 'AU', lat: -25.2744, lng: 133.7751, flag: '🇦🇺', summary: 'Major exporter of natural resources.', economyStatus: 'Stable', politicalStatus: 'Stable', newsHeadline: 'Trade surplus widens on commodities' },
  { name: 'Austria', iso: 'AT', lat: 47.5162, lng: 14.5501, flag: '🇦🇹' },
  { name: 'Azerbaijan', iso: 'AZ', lat: 40.1431, lng: 47.5769, flag: '🇦🇿' },
  { name: 'Bahamas', iso: 'BS', lat: 25.0343, lng: -77.3963, flag: '🇧🇸' },
  { name: 'Bahrain', iso: 'BH', lat: 26.0667, lng: 50.5577, flag: '🇧🇭' },
  { name: 'Bangladesh', iso: 'BD', lat: 23.6850, lng: 90.3563, flag: '🇧🇩' },
  { name: 'Barbados', iso: 'BB', lat: 13.1939, lng: -59.5432, flag: '🇧🇧' },
  { name: 'Belarus', iso: 'BY', lat: 53.7098, lng: 27.9534, flag: '🇧🇾' },
  { name: 'Belgium', iso: 'BE', lat: 50.5039, lng: 4.4699, flag: '🇧🇪' },
  { name: 'Belize', iso: 'BZ', lat: 17.1899, lng: -88.4976, flag: '🇧🇿' },
  { name: 'Benin', iso: 'BJ', lat: 9.3077, lng: 2.3158, flag: '🇧🇯' },
  { name: 'Bhutan', iso: 'BT', lat: 27.5142, lng: 90.4336, flag: '🇧🇹' },
  { name: 'Bolivia', iso: 'BO', lat: -16.2902, lng: -63.5887, flag: '🇧🇴' },
  { name: 'Bosnia and Herzegovina', iso: 'BA', lat: 43.9159, lng: 17.6791, flag: '🇧🇦' },
  { name: 'Botswana', iso: 'BW', lat: -22.3285, lng: 24.6849, flag: '🇧🇼' },
  { 
    name: 'Brazil', iso: 'BR', lat: -14.2350, lng: -51.9253, flag: '🇧🇷', 
    summary: 'Largest economy in Latin America.', 
    economyStatus: 'Moderate', 
    politicalStatus: 'Stabilizing', 
    newsHeadline: 'Agricultural exports hit record high',
    economyTrend: { title: 'Agro-Export Surge', description: 'Record soy and corn exports driving trade surplus.', value: '+4.2%' },
    investmentTrend: { title: 'Green Energy Pivot', description: 'Massive inflows into wind and solar infrastructure.', value: '$12B' },
    politicalTrend: { title: 'Fiscal Reform', description: 'New tax framework aims to stabilize public debt.', value: 'Stable' },
    mediaTrend: { title: 'Amazon Preservation', description: 'Global coverage of renewed rainforest protection efforts.', value: 'Trending' }
  },
  { name: 'Brunei', iso: 'BN', lat: 4.5353, lng: 114.7277, flag: '🇧🇳' },
  { name: 'Bulgaria', iso: 'BG', lat: 42.7339, lng: 25.4858, flag: '🇧🇬' },
  { name: 'Burkina Faso', iso: 'BF', lat: 12.2383, lng: -1.5616, flag: '🇧🇫' },
  { name: 'Burundi', iso: 'BI', lat: -3.3731, lng: 29.9189, flag: '🇧🇮' },
  { name: 'Cambodia', iso: 'KH', lat: 12.5657, lng: 104.9910, flag: '🇰🇭' },
  { name: 'Cameroon', iso: 'CM', lat: 7.3697, lng: 12.3547, flag: '🇨🇲' },
  { name: 'Canada', iso: 'CA', lat: 56.1304, lng: -106.3468, flag: '🇨🇦', summary: 'Major energy and resource exporter, stable G7 economy.', economyStatus: 'Stable', politicalStatus: 'Stable', newsHeadline: 'Resource exports hit quarterly high' },
  { name: 'Cape Verde', iso: 'CV', lat: 16.0020, lng: -24.0131, flag: '🇨🇻' },
  { name: 'Central African Republic', iso: 'CF', lat: 6.6111, lng: 20.9394, flag: '🇨🇫' },
  { name: 'Chad', iso: 'TD', lat: 15.4542, lng: 18.7322, flag: '🇹🇩' },
  { name: 'Chile', iso: 'CL', lat: -35.6751, lng: -71.5430, flag: '🇨🇱' },
  { 
    name: 'China', iso: 'CN', lat: 35.8617, lng: 104.1954, flag: '🇨🇳', 
    summary: 'Major manufacturing and export economy.', 
    economyStatus: 'Recovering', 
    politicalStatus: 'Stable', 
    newsHeadline: 'PBOC cuts reserve requirements',
    economyTrend: { title: 'Industrial Recovery', description: 'Manufacturing PMI shows expansion in high-tech sectors.', value: '+5.1%' },
    investmentTrend: { title: 'Semiconductor Self-Reliance', description: 'State funds accelerating local chip production.', value: '$45B' },
    politicalTrend: { title: 'BRICS+ Expansion', description: 'Leading diplomatic efforts to integrate new member states.', value: 'Active' },
    mediaTrend: { title: 'EV Global Dominance', description: 'Mainstream focus on Chinese EV exports to Europe.', value: 'High' }
  },
  { name: 'Colombia', iso: 'CO', lat: 4.5709, lng: -74.2973, flag: '🇨🇴' },
  { name: 'Comoros', iso: 'KM', lat: -11.6455, lng: 43.3333, flag: '🇰🇲' },
  { name: 'Congo, Democratic Republic of the', iso: 'CD', lat: -4.0383, lng: 21.7587, flag: '🇨🇩' },
  { name: 'Congo, Republic of the', iso: 'CG', lat: -0.2280, lng: 15.8277, flag: '🇨🇬' },
  { name: 'Costa Rica', iso: 'CR', lat: 9.7489, lng: -83.7534, flag: '🇨🇷' },
  { name: 'Croatia', iso: 'HR', lat: 45.1000, lng: 15.2000, flag: '🇭🇷' },
  { name: 'Cuba', iso: 'CU', lat: 21.5218, lng: -77.7812, flag: '🇨🇺' },
  { name: 'Cyprus', iso: 'CY', lat: 35.1264, lng: 33.4299, flag: '🇨🇾' },
  { name: 'Czech Republic', iso: 'CZ', lat: 49.8175, lng: 15.4730, flag: '🇨🇿' },
  { name: 'Denmark', iso: 'DK', lat: 56.2639, lng: 9.5018, flag: '🇩🇰' },
  { name: 'Djibouti', iso: 'DJ', lat: 11.8251, lng: 42.5903, flag: '🇩🇯' },
  { name: 'Dominica', iso: 'DM', lat: 15.4150, lng: -61.3710, flag: '🇩🇲' },
  { name: 'Dominican Republic', iso: 'DO', lat: 18.7357, lng: -70.1627, flag: '🇩🇴' },
  { name: 'Ecuador', iso: 'EC', lat: -1.8312, lng: -78.1834, flag: '🇪🇨' },
  { name: 'Egypt', iso: 'EG', lat: 26.8206, lng: 30.8025, flag: '🇪🇬', summary: 'Key strategic location bridging Africa and Middle East.', economyStatus: 'Challenged', politicalStatus: 'Stable', newsHeadline: 'Suez Canal revenues impacted by regional tensions' },
  { name: 'El Salvador', iso: 'SV', lat: 13.7942, lng: -88.8965, flag: '🇸🇻' },
  { name: 'Equatorial Guinea', iso: 'GQ', lat: 1.6508, lng: 10.2679, flag: '🇬🇶' },
  { name: 'Eritrea', iso: 'ER', lat: 15.1794, lng: 39.7823, flag: '🇪🇷' },
  { name: 'Estonia', iso: 'EE', lat: 58.5953, lng: 25.0136, flag: '🇪🇪' },
  { name: 'Ethiopia', iso: 'ET', lat: 9.1450, lng: 40.4897, flag: '🇪🇹' },
  { name: 'Fiji', iso: 'FJ', lat: -17.7134, lng: 178.0650, flag: '🇫🇯' },
  { name: 'Finland', iso: 'FI', lat: 61.9241, lng: 25.7482, flag: '🇫🇮' },
  { 
    name: 'France', iso: 'FR', lat: 46.2276, lng: 2.2137, flag: '🇫🇷', 
    summary: 'Major European economy, strong luxury and defense sectors.', 
    economyStatus: 'Moderate', 
    politicalStatus: 'Tense', 
    newsHeadline: 'New labor laws proposed',
    economyTrend: { title: 'Luxury Sector Resilience', description: 'LVMH and Hermes report record global sales.', value: '+2.8%' },
    investmentTrend: { title: 'Nuclear Energy Vanguard', description: 'New reactor projects securing long-term energy independence.', value: '€15B' },
    politicalTrend: { title: 'European Defense Lead', description: 'Pushing for autonomous EU security frameworks.', value: 'Tense' },
    mediaTrend: { title: 'Paris 2026 Strategy', description: 'Media focus on post-Olympic infrastructure monetization.', value: 'Trending' }
  },
  { name: 'Gabon', iso: 'GA', lat: -0.8037, lng: 11.6094, flag: '🇬🇦' },
  { name: 'Gambia', iso: 'GM', lat: 13.4432, lng: -15.3101, flag: '🇬🇲' },
  { name: 'Georgia', iso: 'GE', lat: 42.3154, lng: 43.3569, flag: '🇬🇪' },
  { 
    name: 'Germany', iso: 'DE', lat: 51.1657, lng: 10.4515, flag: '🇩🇪', 
    summary: 'European manufacturing powerhouse.', 
    economyStatus: 'Stagnant', 
    politicalStatus: 'Stable', 
    newsHeadline: 'Industrial output shows signs of life',
    economyTrend: { title: 'Manufacturing Rebound', description: 'Automotive and chemical sectors reporting improved orders.', value: '-0.3%' },
    investmentTrend: { title: 'Green Hydrogen Hub', description: 'Federal grants for North Sea hydrogen pipelines.', value: '€9B' },
    politicalTrend: { title: 'Coalition Stability', description: 'Internal debates over budget allocations for defense.', value: 'Complex' },
    mediaTrend: { title: 'Energy Transition', description: 'Public discourse centered on electricity price caps.', value: 'Viral' }
  },
  { name: 'Ghana', iso: 'GH', lat: 7.9465, lng: -1.0232, flag: '🇬🇭' },
  { name: 'Greece', iso: 'GR', lat: 39.0742, lng: 21.8243, flag: '🇬🇷' },
  { 
    name: 'Greenland', iso: 'GL', lat: 71.7069, lng: -42.6043, flag: '🇬🇱',
    summary: 'Autonomous territory within the Kingdom of Denmark. Critical site for climate research and untapped mineral potential.',
    economyStatus: 'Projected Growth',
    politicalStatus: 'Stable',
    newsHeadline: 'Rare earth mineral survey results published',
    economyTrend: { title: 'Arctic Infrastructure', description: 'Significant investment in sustainable mining for battery minerals.', value: '+3.2%' },
    investmentTrend: { title: 'Cryospheric Research', description: 'International funding doubling for ice-sheet monitoring stations.', value: '$850M' },
    politicalTrend: { title: 'North Atlantic Pivot', description: 'Increasing strategic cooperation on maritime security and trade.', value: 'Stable' },
    mediaTrend: { title: 'Rare Earth Potential', description: 'Global media focus on non-Chinese sources for critical minerals.', value: 'High' }
  },
  { name: 'Grenada', iso: 'GD', lat: 12.1165, lng: -61.6790, flag: '🇬🇩' },
  { name: 'Guatemala', iso: 'GT', lat: 15.7835, lng: -90.2308, flag: '🇬🇹' },
  { name: 'Guinea', iso: 'GN', lat: 9.9456, lng: -9.6966, flag: '🇬🇳' },
  { name: 'Guinea-Bissau', iso: 'GW', lat: 11.8037, lng: -15.1804, flag: '🇬🇼' },
  { name: 'Guyana', iso: 'GY', lat: 4.8604, lng: -58.9302, flag: '🇬🇾' },
  { name: 'Haiti', iso: 'HT', lat: 18.9712, lng: -72.2852, flag: '🇭🇹' },
  { name: 'Honduras', iso: 'HN', lat: 15.1999, lng: -86.2419, flag: '🇭🇳' },
  { name: 'Hungary', iso: 'HU', lat: 47.1625, lng: 19.5033, flag: '🇭🇺' },
  { name: 'Iceland', iso: 'IS', lat: 64.9631, lng: -19.0208, flag: '🇮🇸' },
  { 
    name: 'India', iso: 'IN', lat: 20.5937, lng: 78.9629, flag: '🇮🇳', 
    summary: 'Fastest-growing major economy, massive tech workforce.', 
    economyStatus: 'High Growth', 
    politicalStatus: 'Stable', 
    newsHeadline: 'Foreign direct investment reaches new peak',
    economyTrend: { title: 'GDP Outperformance', description: 'Domestic consumption and infra spend driving growth.', value: '+7.2%' },
    investmentTrend: { title: 'Tech Manufacturing', description: 'Apple and Google expanding hardware production lines.', value: '$25B' },
    politicalTrend: { title: 'G20 Legacy', description: 'Deepening "Global South" leadership and trade ties.', value: 'Strong' },
    mediaTrend: { title: 'Digital Public Infra', description: 'International praise for UPI and digital identity scale.', value: 'Global' }
  },
  { name: 'Indonesia', iso: 'ID', lat: -0.7893, lng: 113.9213, flag: '🇮🇩', summary: 'Largest economy in Southeast Asia, rich in minerals.', economyStatus: 'High Growth', politicalStatus: 'Stable', newsHeadline: 'Nickel industry investment surges' },
  { 
    name: 'Iran', iso: 'IR', lat: 32.4279, lng: 53.6880, flag: '🇮🇷',
    summary: 'Strategic West Asian power with significant energy reserves and a focus on domestic industrial resilience.',
    economyStatus: 'High Pressure',
    politicalStatus: 'Stable',
    newsHeadline: 'Regional trade infrastructure agreements advanced'
  },
  { name: 'Iraq', iso: 'IQ', lat: 33.2232, lng: 43.6793, flag: '🇮🇶' },
  { name: 'Ireland', iso: 'IE', lat: 53.4129, lng: -8.2439, flag: '🇮🇪' },
  { name: 'Occupied Palestinian Territories', iso: 'PS', lat: 31.0461, lng: 34.8516, flag: '🇵🇸', summary: 'Critical focus for regional stability and humanitarian intelligence.', economyStatus: 'Vulnerable', politicalStatus: 'Crisis', newsHeadline: 'Ground intelligence updates from Gaza/West Bank' },
  { name: 'Italy', iso: 'IT', lat: 41.8719, lng: 12.5674, flag: '🇮🇹', summary: 'Major European industrial power, leader in design and luxury.', economyStatus: 'Moderate', politicalStatus: 'Coalition', newsHeadline: 'Luxury exports show strong demand' },
  { name: 'Ivory Coast', iso: 'CI', lat: 7.5400, lng: -5.5471, flag: '🇨🇮' },
  { name: 'Jamaica', iso: 'JM', lat: 18.1096, lng: -77.2975, flag: '🇯🇲' },
  { name: 'Japan', iso: 'JP', lat: 36.2048, lng: 138.2529, flag: '🇯🇵', summary: 'Third-largest economy, advanced manufacturing and robotics.', economyStatus: 'Slow', politicalStatus: 'Stable', newsHeadline: 'BOJ shifts monetary policy' },
  { 
    name: 'Jordan', iso: 'JO', lat: 30.5852, lng: 36.2384, flag: '🇯🇴',
    summary: 'Strategic buffer and key regional diplomatic player.',
    economyStatus: 'Stabilizing',
    politicalStatus: 'Stable',
    newsHeadline: 'Water-for-Energy deal progress reported',
    economyTrend: { title: 'Tourism Recovery', description: 'Petra and Wadi Rum seeing record-breaking international arrivals.', value: '+6.5%' },
    investmentTrend: { title: 'Tech Hub Amman', description: 'Growth in software outsourcing and fintech startups.', value: '$1.2B' },
    politicalTrend: { title: 'Regional Mediator', description: 'Leading diplomatic corridors for Levant stability.', value: 'Critical' },
    mediaTrend: { title: 'Water Security', description: 'National focus on the Desalination Project updates.', value: 'Rising' }
  },
  { name: 'Kazakhstan', iso: 'KZ', lat: 48.0196, lng: 66.9237, flag: '🇰🇿' },
  { name: 'Kenya', iso: 'KE', lat: -0.0236, lng: 37.9062, flag: '🇰🇪' },
  { name: 'Kiribati', iso: 'KI', lat: -3.3704, lng: -168.7340, flag: '🇰🇮' },
  { name: 'Kuwait', iso: 'KW', lat: 29.3117, lng: 47.4818, flag: '🇰🇼', summary: 'Significant oil reserves and high per capita income.', economyStatus: 'Stable', politicalStatus: 'Stabilizing', newsHeadline: 'Vision 2035 infrastructure updates' },
  { name: 'Kyrgyzstan', iso: 'KG', lat: 41.2044, lng: 74.7661, flag: '🇰🇬' },
  { name: 'Laos', iso: 'LA', lat: 19.8563, lng: 102.4955, flag: '🇱🇦' },
  { name: 'Latvia', iso: 'LV', lat: 56.8796, lng: 24.6032, flag: '🇱🇻' },
  { name: 'Lebanon', iso: 'LB', lat: 33.8547, lng: 35.8623, flag: '🇱🇧' },
  { name: 'Lesotho', iso: 'LS', lat: -29.6100, lng: 28.2336, flag: '🇱🇸' },
  { name: 'Liberia', iso: 'LR', lat: 6.4281, lng: -9.4295, flag: '🇱🇷' },
  { name: 'Libya', iso: 'LY', lat: 26.3351, lng: 17.2283, flag: '🇱🇾' },
  { name: 'Liechtenstein', iso: 'LI', lat: 47.1660, lng: 9.5554, flag: '🇱🇮' },
  { name: 'Lithuania', iso: 'LT', lat: 55.1694, lng: 23.8813, flag: '🇱🇹' },
  { name: 'Luxembourg', iso: 'LU', lat: 49.8153, lng: 6.1296, flag: '🇱🇺' },
  { name: 'Macedonia', iso: 'MK', lat: 41.6086, lng: 21.7453, flag: '🇲🇰' },
  { name: 'Madagascar', iso: 'MG', lat: -18.7669, lng: 46.8691, flag: '🇲🇬' },
  { name: 'Malawi', iso: 'MW', lat: -13.2543, lng: 34.3015, flag: '🇲🇼' },
  { name: 'Malaysia', iso: 'MY', lat: 4.2105, lng: 101.9758, flag: '🇲🇾' },
  { name: 'Maldives', iso: 'MV', lat: 3.2028, lng: 73.2207, flag: '🇲🇻' },
  { name: 'Mali', iso: 'ML', lat: 17.5707, lng: -3.9962, flag: '🇲🇱' },
  { name: 'Malta', iso: 'MT', lat: 35.9375, lng: 14.3754, flag: '🇲🇹' },
  { name: 'Marshall Islands', iso: 'MH', lat: 7.1315, lng: 171.1845, flag: '🇲🇭' },
  { name: 'Mauritania', iso: 'MR', lat: 21.0079, lng: -10.9408, flag: '🇲🇷' },
  { name: 'Mauritius', iso: 'MU', lat: -20.3484, lng: 57.5522, flag: '🇲🇺' },
  { name: 'Mexico', iso: 'MX', lat: 23.6345, lng: -102.5528, flag: '🇲🇽', summary: 'Leading manufacturing hub in Latin America.', economyStatus: 'Growing', politicalStatus: 'Moderate', newsHeadline: 'Tech manufacturing sector expands' },
  { name: 'Micronesia', iso: 'FM', lat: 7.4256, lng: 150.5508, flag: '🇫🇲' },
  { name: 'Moldova', iso: 'MD', lat: 47.4116, lng: 28.3699, flag: '🇲🇩' },
  { name: 'Monaco', iso: 'MC', lat: 43.7384, lng: 7.4246, flag: '🇲🇨' },
  { name: 'Mongolia', iso: 'MN', lat: 46.8625, lng: 103.8467, flag: '🇲🇳' },
  { name: 'Montenegro', iso: 'ME', lat: 42.7087, lng: 19.3744, flag: '🇲🇪' },
  { name: 'Morocco', iso: 'MA', lat: 31.7917, lng: -7.0926, flag: '🇲🇦' },
  { name: 'Mozambique', iso: 'MZ', lat: -18.6657, lng: 35.5296, flag: '🇲🇿' },
  { name: 'Myanmar', iso: 'MM', lat: 21.9162, lng: 95.9560, flag: '🇲🇲' },
  { name: 'Namibia', iso: 'NA', lat: -22.9576, lng: 18.4904, flag: '🇳🇦' },
  { name: 'Nauru', iso: 'NR', lat: -0.5228, lng: 166.9315, flag: '🇳🇷' },
  { name: 'Nepal', iso: 'NP', lat: 28.3949, lng: 84.1240, flag: '🇳🇵' },
  { name: 'Netherlands', iso: 'NL', lat: 52.1326, lng: 5.2913, flag: '🇳🇱', summary: 'Major European trade and logistics gateway.', economyStatus: 'Stable', politicalStatus: 'Stable', newsHeadline: 'Port of Rotterdam reports volume growth' },
  { name: 'New Zealand', iso: 'NZ', lat: -40.9006, lng: 174.8860, flag: '🇳🇿' },
  { name: 'Nicaragua', iso: 'NI', lat: 12.8654, lng: -85.2072, flag: '🇳🇮' },
  { name: 'Niger', iso: 'NE', lat: 17.6078, lng: 8.0817, flag: '🇳🇪' },
  { name: 'Nigeria', iso: 'NG', lat: 9.0820, lng: 8.6753, flag: '🇳🇬', summary: 'Largest population and major economy in Africa.', economyStatus: 'Challenged', politicalStatus: 'Volatile', newsHeadline: 'Digital economy initiative gains momentum' },
  { name: 'North Korea', iso: 'KP', lat: 40.3399, lng: 127.5101, flag: '🇰🇵' },
  { name: 'Norway', iso: 'NO', lat: 60.4720, lng: 8.4689, flag: '🇳🇴', summary: 'Energy leader with the world\'s largest sovereign wealth fund.', economyStatus: 'Very Strong', politicalStatus: 'Stable', newsHeadline: 'SWF hits new valuation record' },
  { name: 'Oman', iso: 'OM', lat: 21.4735, lng: 55.9754, flag: '🇴🇲' },
  { name: 'Pakistan', iso: 'PK', lat: 30.3753, lng: 69.3451, flag: '🇵🇰' },
  { name: 'Palau', iso: 'PW', lat: 7.5150, lng: 134.5825, flag: '🇵🇼' },
  { name: 'Panama', iso: 'PA', lat: 8.5380, lng: -80.7821, flag: '🇵🇦' },
  { name: 'Papua New Guinea', iso: 'PG', lat: -6.3150, lng: 143.9555, flag: '🇵🇬' },
  { name: 'Paraguay', iso: 'PY', lat: -23.4425, lng: -58.4438, flag: '🇵🇾' },
  { name: 'Peru', iso: 'PE', lat: -9.1900, lng: -75.0152, flag: '🇵🇪' },
  { name: 'Philippines', iso: 'PH', lat: 12.8797, lng: 121.7740, flag: '🇵🇭' },
  { name: 'Poland', iso: 'PL', lat: 51.9194, lng: 19.1451, flag: '🇵🇱' },
  { name: 'Portugal', iso: 'PT', lat: 39.3999, lng: -8.2245, flag: '🇵🇹' },
  { name: 'Qatar', iso: 'QA', lat: 25.3548, lng: 51.1839, flag: '🇶🇦', summary: 'Leading LNG exporter with massive global investments.', economyStatus: 'Strong', politicalStatus: 'Stable', newsHeadline: 'North Field expansion project accelerates' },
  { name: 'Romania', iso: 'RO', lat: 45.9432, lng: 24.9668, flag: '🇷🇴' },
  { 
    name: 'Russia', iso: 'RU', lat: 61.5240, lng: 105.3188, flag: '🇷🇺', 
    summary: 'Major energy exporter.', 
    economyStatus: 'Sanctioned', 
    politicalStatus: 'Authoritarian', 
    newsHeadline: 'Energy exports redirected to Asia',
    economyTrend: { title: 'Export Pivot', description: 'Increased oil and gas flows to China and India.', value: '+1.5%' },
    investmentTrend: { title: 'Parallel Imports', description: 'Securing tech supply chains via secondary markets.', value: '$8B' },
    politicalTrend: { title: 'Wartime Economy', description: 'State redirection of industrial output toward defense.', value: 'Tense' },
    mediaTrend: { title: 'Sanction Evasion', description: 'Focus on shadow fleet and insurance workarounds.', value: 'High' }
  },
  { name: 'Rwanda', iso: 'RW', lat: -1.9403, lng: 29.8739, flag: '🇷🇼' },
  { name: 'Saint Kitts and Nevis', iso: 'KN', lat: 17.3578, lng: -62.7830, flag: '🇰🇳' },
  { name: 'Saint Lucia', iso: 'LC', lat: 13.9094, lng: -60.9789, flag: '🇱🇨' },
  { name: 'Saint Vincent and the Grenadines', iso: 'VC', lat: 12.9843, lng: -61.2872, flag: '🇻🇨' },
  { name: 'Samoa', iso: 'WS', lat: -13.7590, lng: -172.1046, flag: '🇼🇸' },
  { name: 'San Marino', iso: 'SM', lat: 43.9424, lng: 12.4578, flag: '🇸🇲' },
  { name: 'Sao Tome and Principe', iso: 'ST', lat: 0.1864, lng: 6.6131, flag: '🇸🇹' },
  { 
    name: 'Saudi Arabia', iso: 'SA', lat: 23.8859, lng: 45.0792, flag: '🇸🇦', 
    summary: 'Leading oil exporter undergoing massive Vision 2030 transformation.', 
    economyStatus: 'Diversifying', 
    politicalStatus: 'Stable', 
    newsHeadline: 'NEOM project phases announced',
    economyTrend: { title: 'Non-Oil Growth', description: 'Manufacturing and services now share 50% of GDP.', value: '+4.8%' },
    investmentTrend: { title: 'PIF Global Portfolio', description: 'Expansion into gaming, sports, and AI sectors.', value: '$700B' },
    politicalTrend: { title: 'Regional Leadership', description: 'Brokering major trade routes between East and West.', value: 'Pivotal' },
    mediaTrend: { title: 'Vision 2030 Labs', description: 'Launch of the world\'s largest carbon capture plant.', value: 'Trending' }
  },
  { name: 'Senegal', iso: 'SN', lat: 14.4974, lng: -14.4524, flag: '🇸🇳' },
  { name: 'Serbia', iso: 'RS', lat: 44.0165, lng: 21.0059, flag: '🇷🇸' },
  { name: 'Seychelles', iso: 'SC', lat: -4.6796, lng: 55.4920, flag: '🇸🇨' },
  { name: 'Sierra Leone', iso: 'SL', lat: 8.4606, lng: -11.7799, flag: '🇸🇱' },
  { name: 'Singapore', iso: 'SG', lat: 1.3521, lng: 103.8198, flag: '🇸🇬', summary: 'Major global financial and shipping hub.', economyStatus: 'Stable Growth', politicalStatus: 'Stable', newsHeadline: 'New fintech regulations announced' },
  { name: 'Slovakia', iso: 'SK', lat: 48.6690, lng: 19.6990, flag: '🇸🇰' },
  { name: 'Slovenia', iso: 'SI', lat: 46.1512, lng: 14.9955, flag: '🇸🇮' },
  { name: 'Solomon Islands', iso: 'SB', lat: -9.6457, lng: 160.1562, flag: '🇸🇧' },
  { name: 'Somalia', iso: 'SO', lat: 5.1521, lng: 46.1996, flag: '🇸🇴' },
  { name: 'South Africa', iso: 'ZA', lat: -30.5595, lng: 22.9375, flag: '🇿🇦', summary: 'Second-largest economy in Africa, resource-rich.', economyStatus: 'Struggling', politicalStatus: 'Volatile', newsHeadline: 'Energy grid stabilization efforts continue' },
  { name: 'South Korea', iso: 'KR', lat: 35.9078, lng: 127.7669, flag: '🇰🇷', summary: 'Leader in consumer electronics and semiconductors.', economyStatus: 'Moderate', politicalStatus: 'Stable', newsHeadline: 'Chip exports drive economic recovery' },
  { name: 'South Sudan', iso: 'SS', lat: 6.8770, lng: 31.3070, flag: '🇸🇸' },
  { name: 'Spain', iso: 'ES', lat: 40.4637, lng: -3.7492, flag: '🇪🇸', summary: 'Large EU economy with strong tourism and renewables.', economyStatus: 'Recovering', politicalStatus: 'Stable', newsHeadline: 'Green energy capacity hits new record' },
  { name: 'Sri Lanka', iso: 'LK', lat: 7.8731, lng: 80.7718, flag: '🇱🇰' },
  { name: 'Sudan', iso: 'SD', lat: 12.8628, lng: 30.2176, flag: '🇸🇩' },
  { name: 'Suriname', iso: 'SR', lat: 3.9193, lng: -56.0278, flag: '🇸🇷' },
  { name: 'Swaziland', iso: 'SZ', lat: -26.5225, lng: 31.4659, flag: '🇸🇿' },
  { name: 'Sweden', iso: 'SE', lat: 60.1282, lng: 18.6435, flag: '🇸🇪' },
  { name: 'Switzerland', iso: 'CH', lat: 46.8182, lng: 8.2275, flag: '🇨🇭', summary: 'Global center for banking and precision manufacturing.', economyStatus: 'High Stability', politicalStatus: 'Neutral', newsHeadline: 'Wealth management inflows increase' },
  { name: 'Syria', iso: 'SY', lat: 34.8021, lng: 38.9968, flag: '🇸🇾' },
  { name: 'Taiwan', iso: 'TW', lat: 23.6978, lng: 120.9605, flag: '🇹🇼' },
  { name: 'Tajikistan', iso: 'TJ', lat: 38.8610, lng: 71.2761, flag: '🇹🇯' },
  { name: 'Tanzania', iso: 'TZ', lat: -6.3690, lng: 34.8888, flag: '🇹🇿' },
  { name: 'Thailand', iso: 'TH', lat: 15.8700, lng: 100.9925, flag: '🇹🇭' },
  { name: 'Togo', iso: 'TG', lat: 8.6195, lng: 0.8248, flag: '🇹🇬' },
  { name: 'Tonga', iso: 'TO', lat: -21.1790, lng: -175.1982, flag: '🇹🇴' },
  { name: 'Trinidad and Tobago', iso: 'TT', lat: 10.6918, lng: -61.2225, flag: '🇹🇹' },
  { name: 'Tunisia', iso: 'TN', lat: 33.8869, lng: 9.5375, flag: '🇹🇳' },
  { name: 'Turkey', iso: 'TR', lat: 38.9637, lng: 35.2433, flag: '🇹🇷', summary: 'Strategic bridge between Europe and Asia.', economyStatus: 'Volatile', politicalStatus: 'Centralized', newsHeadline: 'Central Bank adjusts interest rates' },
  { name: 'Turkmenistan', iso: 'TM', lat: 38.9697, lng: 59.5563, flag: '🇹🇲' },
  { name: 'Tuvalu', iso: 'TV', lat: -7.1095, lng: 177.6493, flag: '🇹🇻' },
  { name: 'Uganda', iso: 'UG', lat: 1.3733, lng: 32.2903, flag: '🇺🇬' },
  { name: 'Ukraine', iso: 'UA', lat: 48.3794, lng: 31.1656, flag: '🇺🇦' },
  { 
    name: 'United Arab Emirates', iso: 'AE', lat: 23.4241, lng: 53.8478, flag: '🇦🇪', 
    summary: 'Global investment hub and technology leader.', 
    economyStatus: 'Strong Growth', 
    politicalStatus: 'Stable', 
    newsHeadline: 'UAE announces new AI initiatives',
    economyTrend: { title: 'AI Sovereign Cloud', description: 'G42 and Microsoft partnership scaling local compute.', value: '+5.5%' },
    investmentTrend: { title: 'Global Tech Inflow', description: 'Record VC activity in Dubai and Abu Dhabi ecosystems.', value: '$35B' },
    politicalTrend: { title: 'Space Diplomacy', description: 'Success of Martian and Lunar exploration partnerships.', value: 'Leading' },
    mediaTrend: { title: 'Sustainability COP Legacy', description: 'Media focus on Real Estate and Green Portfolios.', value: 'High' }
  },
  { name: 'United Kingdom', iso: 'GB', lat: 55.3781, lng: -3.4360, flag: '🇬🇧', summary: 'Global financial center.', economyStatus: 'Slow Recovery', politicalStatus: 'Transitional', newsHeadline: 'London tech sector sees record investment' },
  { 
    name: 'United States', iso: 'US', lat: 37.0902, lng: -95.7129, flag: '🇺🇸', 
    summary: 'Largest global economy, major technology sector.', 
    economyStatus: 'Moderate Growth', 
    politicalStatus: 'Polarized', 
    newsHeadline: 'Federal Reserve maintains rates',
    economyTrend: { title: 'Tech Sector Earnings', description: 'Big Tech reporting record-high revenue from Cloud/AI.', value: '+3.1%' },
    investmentTrend: { title: 'CHIPS Act Funding', description: 'Massive federal grants for domestic fab construction.', value: '$52B' },
    politicalTrend: { title: 'Election Cycle', description: 'Market volatility increasing ahead of the 2026 cycle.', value: 'Variable' },
    mediaTrend: { title: 'GenAI Regulation', description: 'Bipartisan focus on AI safety and copyright laws.', value: 'Massive' }
  },
  { name: 'Uruguay', iso: 'UY', lat: -32.5228, lng: -55.7658, flag: '🇺🇾' },
  { name: 'Uzbekistan', iso: 'UZ', lat: 41.3775, lng: 64.5853, flag: '🇺🇿' },
  { name: 'Vanuatu', iso: 'VU', lat: -15.3767, lng: 166.9592, flag: '🇻🇺' },
  { name: 'Vatican City', iso: 'VA', lat: 41.9029, lng: 12.4534, flag: '🇻🇦' },
  { name: 'Venezuela', iso: 'VE', lat: 6.4238, lng: -66.5897, flag: '🇻🇪' },
  { name: 'Vietnam', iso: 'VN', lat: 14.0583, lng: 108.2772, flag: '🇻🇳', summary: 'Fast-growing manufacturing and supply chain alternative.', economyStatus: 'High Growth', politicalStatus: 'Stable', newsHeadline: 'Global electronics firms expand presence' },
  { name: 'Yemen', iso: 'YE', lat: 15.5527, lng: 48.5164, flag: '🇾🇪' },
  { name: 'Zambia', iso: 'ZM', lat: -13.1339, lng: 27.8493, flag: '🇿🇲' },
  { name: 'Zimbabwe', iso: 'ZW', lat: -19.0154, lng: 29.1549, flag: '🇿🇼' }
];

export const economyGlobeData: Record<string, { growth: number, status: 'positive' | 'negative' }> = {
  'AE': { growth: 4.2, status: 'positive' },
  'US': { growth: 2.1, status: 'positive' },
  'CN': { growth: 4.8, status: 'positive' },
  'GB': { growth: -0.2, status: 'negative' },
  'DE': { growth: -0.5, status: 'negative' },
  'FR': { growth: 0.4, status: 'positive' },
  'IN': { growth: 6.7, status: 'positive' },
  'SA': { growth: 3.1, status: 'positive' },
  'RU': { growth: -1.5, status: 'negative' },
  'BR': { growth: 1.2, status: 'positive' },
  'JP': { growth: 0.8, status: 'positive' },
  'AU': { growth: 1.9, status: 'positive' },
  'QA': { growth: 2.5, status: 'positive' },
  'SG': { growth: 2.8, status: 'positive' },
  'CH': { growth: 1.1, status: 'positive' },
};

export const investmentGlobePoints = [
  { lat: 24.4539, lng: 54.3773, size: 1.5, color: '#10b981', label: 'UAE Global Hub' },
  { lat: 40.7128, lng: -74.0060, size: 1.2, color: '#10b981', label: 'US Financial Centers' },
  { lat: 45.4215, lng: -75.6972, size: 1.0, color: '#10b981', label: 'Canada Resource Core' },
  { lat: 35.6762, lng: 139.6503, size: 1.1, color: '#10b981', label: 'Japan Tech Infrastructure' },
  { lat: 39.9042, lng: 116.4074, size: 1.4, color: '#10b981', label: 'China Industrial Hub' }
];

export const politicalCrisisRings = [
  // Major Cases
  { lat: 48.3794, lng: 31.1656, maxR: 12, color: '#ef4444', label: 'Russia–Ukraine Conflict' },
  { lat: 37.0902, lng: -95.7129, maxR: 7, color: '#f59e0b', label: 'Trump Domestic Policy Protests' },
  { lat: 32.4279, lng: 53.6880, maxR: 9, color: '#ef4444', label: 'Iran–Israel–US War' },
  { lat: 33.5, lng: 35.5, maxR: 6, color: '#ef4444', label: 'Israel–Lebanon Conflict' },

  // Regional Crises
  { lat: 31.0461, lng: 34.8516, maxR: 6, color: '#ef4444', label: 'Levant Corridor' },
  { lat: 12.58, lng: 43.34, maxR: 8, color: '#ef4444', label: 'Bab-el-Mandeb' },
  { lat: 15.5007, lng: 32.5599, maxR: 10, color: '#f59e0b', label: 'Sudan Heartland' },
  { lat: 26.56, lng: 56.25, maxR: 5, color: '#3b82f6', label: 'Hormuz Straits' }
];

export const politicalArcs = [
  // Red Sea Security Correlation
  { startLat: 24.4539, startLng: 54.3773, endLat: 15.5, endLng: 42.5, color: '#ef4444', name: 'Trade Lane Protection' },
  // Brics+ Cooperation
  { startLat: 24.4539, startLng: 54.3773, endLat: 22.35, endLng: 78.96, color: '#10b981', name: 'India Hub' },
  { startLat: 24.4539, startLng: 54.3773, endLat: 35.86, endLng: 104.19, color: '#10b981', name: 'China Hub' },
  // Arctic Interests
  { startLat: 24.4539, startLng: 54.3773, endLat: 75.0, endLng: 18.06, color: '#3b82f6', name: 'Arctic Council' }
];

export const mediaNewsItems = [
  { lat: 24.4539, lng: 54.3773, text: 'COP28 Initiatives', color: '#ffffff', size: 1.5 },
  { lat: 40.7128, lng: -74.0060, text: 'Wall St Surge', color: '#ffffff', size: 1.2 },
  { lat: 51.5074, lng: -0.1278, text: 'London Tech', color: '#ffffff', size: 1.2 },
  { lat: 35.6762, lng: 139.6503, text: 'BOJ Rate Hike', color: '#ffffff', size: 1.2 }
];

export const groupsArcs = [
  { startLat: 24.4539, startLng: 54.3773, endLat: 38.8951, endLng: -77.0364, color: '#60a5fa', name: 'US Investments' },
  { startLat: 24.4539, startLng: 54.3773, endLat: 39.9042, endLng: 116.4074, color: '#fbbf24', name: 'China Tech Fund' },
  { startLat: 24.4539, startLng: 54.3773, endLat: 51.5074, endLng: -0.1278, color: '#3b82f6', name: 'UK Infrastructure' },
  { startLat: 24.4539, startLng: 54.3773, endLat: 28.6139, endLng: 77.2090, color: '#10b981', name: 'India Logistics Hub' },
  { startLat: 24.4539, startLng: 54.3773, endLat: 1.3521, endLng: 103.8198, color: '#f59e0b', name: 'SE Asia Energy' }
];

export const abuDhabiGovData = {
  committees: [
    { name: 'Executive Council', status: 'Active', meetings: 12 },
    { name: 'Strategic Affairs Council', status: 'Active', meetings: 8 },
    { name: 'Economic Development', status: 'Active', meetings: 15 }
  ],
  kpis: [
    { label: 'Total Active Projects', value: 342, trend: '+12%' },
    { label: 'Budget Utilization', value: '87%', trend: '+4%' },
    { label: 'Foreign Direct Investment', value: '$22B', trend: '+18%' }
  ]
};

export const masterCalendarData = [
  { date: '2026-05-15', event: 'Global Tech Summit', module: 'Economy', location: 'Abu Dhabi' },
  { date: '2026-05-20', event: 'OPEC+ Meeting', module: 'Political', location: 'Vienna' },
  { date: '2026-06-01', event: 'G42 Board Review', module: 'Groups', location: 'HQ' },
  { date: '2026-06-15', event: 'FDI Strategy Launch', module: 'Investment', location: 'Dubai' }
];
