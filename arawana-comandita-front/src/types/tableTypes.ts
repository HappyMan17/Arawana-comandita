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
  commands: Command[];
}

export type State = "start" | "stop" | "reset";

export interface Command {
  id?: string;
  table_id: string;
  initCommand: Date;
  endCommand: Date | null;
  platesServed: boolean;
  plates: Plate[];
}

export interface TablePlateObject {
  tableId: string;
  selectedPlates: Plate[];
}
