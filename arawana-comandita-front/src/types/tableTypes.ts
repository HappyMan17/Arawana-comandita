import { Plate } from ".";

export interface Table {
  id?: string;
  name: string;
  total: number;
  comment: string;
  uid: string;
  initCommand: string;
  platesServed: string;
  plates: Plate[];
  command: Plate[];
}

export type State = "start" | "stop" | "reset";

export interface TablePlateObject {
  tableId: string;
  selectedPlates: Plate[];
}
