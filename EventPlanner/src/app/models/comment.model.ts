export interface Comment {
    id: number;
    content: string;
    date?: Date;
    status: string;
    comentatorId: number;
  }