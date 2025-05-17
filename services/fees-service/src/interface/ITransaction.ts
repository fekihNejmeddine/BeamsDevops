export interface ITransaction {
  id?: number;
  amount: number;
  date: Date;
  userId: number;
  caisseId: number;
  description:string;
  Photo: string,
  isDeleted?: boolean;

}
