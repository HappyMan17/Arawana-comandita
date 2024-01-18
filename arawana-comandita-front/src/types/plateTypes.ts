export interface Plate {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string | null;
  uid: string;
}

export type ModalType = 'Modify' | 'Create';

export interface ModalState {
  isShown: boolean;
  title: string;
  type: ModalType;
}
