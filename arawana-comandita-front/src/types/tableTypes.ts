import { Plate } from ".";

export interface Table {
  id?: string;
  name: string;
  total: number;
  comment: string;
  uid: string;
  plates: Plate[];
}
