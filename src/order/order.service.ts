import { Injectable } from '@nestjs/common';
import orders from 'src/storage/order';
import { iOrderBody, iOrder } from '../interfaces/user.interface';



@Injectable()
export class AppService {
  getItem(): iOrder[] {
    if (orders.length === 0) throw new Error('The database is empty')

    return orders;
  }

  postItem(obj: iOrderBody): iOrder[] {
    if ( !obj.itemName) throw new Error('There are incomplete fields')

    const newId: number = orders.length === 0 ? 1 : orders[orders.length - 1].id + 1
    orders.push({ id: newId, ...obj })

    return orders;
  }

}
