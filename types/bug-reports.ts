export type BugReportType = 'bug' | 'suggestion';
export type BugReportStatus = 'open' | 'closed';
export type BugReportPriority = 'low' | 'medium' | 'high' | 'critical';

export interface BugReport {
  id: string;
  user_id: string;
  type: BugReportType;
  title: string;
  description: string;
  status: BugReportStatus;
  priority: BugReportPriority;
  admin_comment?: string;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  closed_by?: string;
}

export interface BugReportWithUser extends BugReport {
  user?: {
    full_name: string;
    email: string;
  };
  closer?: {
    full_name: string;
  };
}

export interface CreateBugReportData {
  type: BugReportType;
  title: string;
  description: string;
}

export interface UpdateBugReportData {
  status?: BugReportStatus;
  priority?: BugReportPriority;
  admin_comment?: string;
  closed_at?: string;
  closed_by?: string;
}
