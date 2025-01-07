export interface SuspensionDetails {
    userId: number;
    suspensionEndDate: string;
    timeLeft: {
      seconds: number;
      nanos: number;
    };
  }