export interface Order {
  id: number;
  address: string;
  price: number;
  date: string;
  status: string;
  userId: number;
  OrdersProducts: any;
}
