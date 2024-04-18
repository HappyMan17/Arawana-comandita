export interface Plate {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  description: string;
  plateGroup: PlateGroup | null;
  image: string | null;
  uid: string;
  isSelected?: boolean;
  quantity?: number;
}

export interface PlateGroup {
  id: string;
  name: string;
  plates: Plate[]
}

export type ModalType = 'Modify' | 'Create';

export interface ModalState {
  isShown: boolean;
  title?: string;
}
