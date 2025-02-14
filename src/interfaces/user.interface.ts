export interface iBody {
  username: string;
  email: string;
  password: string;
}

export interface iUser extends iBody {
  id: number;
}

export interface iOrder {
  id: number,
  userId: number,
  itemName: string
}

export interface iOrderBody {
  userId: number,
  itemName: string
}