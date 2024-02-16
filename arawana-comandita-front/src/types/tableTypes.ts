import { Plate } from ".";

export interface Table {
  id?: string;
  name: string;
  total: number;
  comment: string;
  uid: string;
  plates: Plate[];
  command: Plate[];
}

export interface TablePlateObject {
  tableId: string;
  selectedPlates: Plate[];
  command: Plate[];
}
