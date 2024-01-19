export interface Plate {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  description: string;
  image: string | null;
  uid: string;
  isSelected?: boolean;
  quantity?: number;
}

export type ModalType = 'Modify' | 'Create';

export interface ModalState {
  isShown: boolean;
  type: ModalType;
  title?: string;
  // plateModal
  tableId?: string | null;
}
