export interface Task {
  id: string;
  title: string;
  type: 'Follow-up' | 'Direction' | 'Project';
  assignee: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Completed';
}

export const masterObserverTasks: Task[] = [
  { id: "T1", title: "Review Q1 Financial Consolidation", type: "Follow-up", assignee: "Financial Dept", deadline: "2026-04-15", priority: "High", status: "In Progress" },
  { id: "T2", title: "Approve Silicon Valley Tech Grant", type: "Direction", assignee: "Tech Board", deadline: "2026-04-18", priority: "Medium", status: "Pending" },
  { id: "T3", title: "Strategic Briefing: ASEAN Expansion", type: "Project", assignee: "Strategy Team", deadline: "2026-04-20", priority: "High", status: "Pending" },
  { id: "T4", title: "Finalize Adia Audit Reports", type: "Follow-up", assignee: "Audit Committee", deadline: "2026-04-14", priority: "High", status: "Completed" },
  { id: "T5", title: "Maritime Security Protocol Update", type: "Direction", assignee: "Security Council", deadline: "2026-04-22", priority: "Medium", status: "Pending" },
  { id: "T6", title: "Hydrogen Corridor Feasibility Study", type: "Project", assignee: "Energy Board", deadline: "2026-04-30", priority: "Medium", status: "In Progress" },
  { id: "T7", title: "G42 AI Infrastructure Audit", type: "Follow-up", assignee: "Internal Audit", deadline: "2026-04-16", priority: "High", status: "Pending" },
];

