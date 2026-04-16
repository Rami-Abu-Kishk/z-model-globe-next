export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  location: string;
  status: 'Confidential' | 'Public' | 'Restricted';
  attendees: string[];
}

export interface TrackingFile {
  id: string;
  name: string;
  size: string;
  updated: string;
  format: 'PDF' | 'EXCEL' | 'IMAGE' | 'DOCX';
  owner: string;
}

export const droAgenda: AgendaItem[] = [
  { id: "A1", time: "09:00 AM", title: "Executive Board Meeting", location: "Global Office", status: "Confidential", attendees: ["CEO", "CFO", "Regional Directors"] },
  { id: "A2", time: "11:30 AM", title: "Investor Relations Briefing", location: "Conference Room B", status: "Public", attendees: ["IR Team", "Major Stakeholders"] },
  { id: "A3", time: "02:00 PM", title: "Philanthropic Fund Review", location: "Virtual", status: "Restricted", attendees: ["Foundation Lead", "Audit Team"] },
  { id: "A4", time: "04:30 PM", title: "Cybersecurity Protocol Review", location: "Secure Room 4", status: "Confidential", attendees: ["CTO", "G42 Reps"] },
];

export const droFiles: TrackingFile[] = [
  { id: "F1", name: "Annual_Report_Draft_v2.pdf", size: "4.2 MB", updated: "2h ago", format: "PDF", owner: "Strategy Dept" },
  { id: "F2", name: "Portfolio_Stats_Q1.xlsx", size: "12.5 MB", updated: "1d ago", format: "EXCEL", owner: "Finance Dept" },
  { id: "F3", name: "Regional_Risk_Map.jpg", size: "8.1 MB", updated: "3h ago", format: "IMAGE", owner: "Security Team" },
  { id: "F4", name: "HydrogenCorridor_Strategy.docx", size: "1.2 MB", updated: "5h ago", format: "DOCX", owner: "Energy Board" },
  { id: "F5", name: "Investor_Pitch_Apr26.pdf", size: "15.4 MB", updated: "10m ago", format: "PDF", owner: "CEO Office" },
];

