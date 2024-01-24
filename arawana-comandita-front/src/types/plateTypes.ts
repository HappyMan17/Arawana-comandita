export interface Plate {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  description: string;
  plateGroup: string;
  image: string | null;
  uid: string;
  isSelected?: boolean;
  quantity?: number;
}

export interface PlateGroup {
  name: string;
}

export type ModalType = 'Modify' | 'Create';

export interface ModalState {
  isShown: boolean;
  type: ModalType;
  title?: string;
  // plateModal
  tableId?: string | null;
}
