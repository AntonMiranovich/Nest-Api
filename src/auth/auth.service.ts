import { Injectable } from '@nestjs/common';
import { iBody, iUser } from '../interfaces/user.interface';
import users from '../storage/user'

const test = [{ username: '', password: '' }]


@Injectable()
export class AppService {

  handleErrors(condition: boolean, errorMessage: string): void {
    if (condition) {
      throw new Error(errorMessage);
    }
  }

  isValidUser(obj: Partial<iBody>, stor: any) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
      this.handleErrors(!Object.keys(stor[0]).includes(key), `Недопустимое поле: ${key}`);
    });

    if (obj.username && !isNaN(+obj.username)) throw new Error('Incorrect values ​​are introduced')
    if (obj.email && !isNaN(+obj.email)) throw new Error('Incorrect values ​​are introduced')
    if (obj.password && !isNaN(+obj.password)) throw new Error('Incorrect values ​​are introduced')
  }



  postItem(obj: iBody): iUser[] {
    this.isValidUser(obj, users);
    this.handleErrors(!obj.username || !obj.email || !obj.password, 'Введены некорректные значения');

    const dbLength = users.length
    const newId: number = users.length === 0 ? 1 : users[users.length - 1].id + 1
    users.push({ id: newId, ...obj })
    this.handleErrors(dbLength === users.length, 'Произошла ошибка при добавлении');

    return users
  }

  checkItemDB(obj: any): string {
    this.isValidUser(obj, test);
    const checkUser = users.some((el) => el.username == obj.username && el.password == obj.password)

    return checkUser ? 'Вход выполнен' : 'Неверные данные'
  }

}
