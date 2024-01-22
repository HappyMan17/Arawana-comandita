import { Table } from ".";

export interface DaySummary {
  id?: string;
  date: string;
  total: number;
  comment: string;
  uid: string;
  tables: Table[];
}
