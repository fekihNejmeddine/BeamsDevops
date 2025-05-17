export interface ICaisse {
  id?: number;
  name: string;
  balance: number;
  minBalance: number;
  participants: number[];
  isDeleted?: boolean;
}
