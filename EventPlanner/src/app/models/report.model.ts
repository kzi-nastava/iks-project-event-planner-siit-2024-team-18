export interface Report {
    id: number;
    description: string;
    reportedDate?: Date;
    status: string;
    reporterId: number;
    reportedId: number;
  }