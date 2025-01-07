export interface ReportRequest {
    id: number;
    description: string;
    reporterFirstName: string;
    reportedFirstName: string;
    reporterLastName: string;
    reportedLastName: string;
    reportedDate: Date;
  }