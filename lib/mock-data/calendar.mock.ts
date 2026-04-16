export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Meeting' | 'Review' | 'Personal' | 'Travel';
  groups: string[];
  location: string;
  view: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
}

export const calendarEvents: CalendarEvent[] = [
  { id: "E1", title: "Davos Economic Forum", date: "2026-05-10", time: "All Day", type: "Travel", groups: ["Global Strategy"], location: "Switzerland", view: "Monthly" },
  { id: "E2", title: "Quarterly IHC Audit", date: "2026-04-22", time: "10:00 AM", type: "Review", groups: ["IHC", "Audit Team"], location: "ADGM, Abu Dhabi", view: "Weekly" },
  { id: "E3", title: "G42 Innovation Summit", date: "2026-04-28", time: "09:00 AM", type: "Meeting", groups: ["G42", "Tech Council"], location: "Museum of the Future", view: "Monthly" },
  { id: "E4", title: "Weekend Retreat", date: "2026-04-18", time: "N/A", type: "Personal", groups: [], location: "Private", view: "Weekly" },
  { id: "E5", title: "Board Strategy Session", date: "2026-04-13", time: "02:00 PM", type: "Review", groups: ["ADIA", "Royal Group"], location: "Headquarters", view: "Daily" },
  { id: "E6", title: "Annual Investment Outlook", date: "2026-11-15", time: "09:00 AM", type: "Meeting", groups: ["All Entities"], location: "Emirates Palace", view: "Yearly" },
];

