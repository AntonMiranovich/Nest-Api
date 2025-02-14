import { Injectable } from '@nestjs/common';
import { iBody, iUser } from '../interfaces/user.interface';
import users from '../storage/user'




@Injectable()
export class AppService {

  handleErrors(condition: boolean, errorMessage: string): void {
    if (condition) {
      throw new Error(errorMessage);
    }
  }

  isValidUser(obj: Partial<iBody>) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
      this.handleErrors(!Object.keys(users[0]).includes(key), `Недопустимое поле: ${key}`);
    });

    if (obj.username && !isNaN(+obj.username)) throw new Error('Incorrect values ​​are introduced')
    if (obj.email && !isNaN(+obj.email)) throw new Error('Incorrect values ​​are introduced')
  }




  getAllItem(): iUser[] {
    this.handleErrors(!users.length, 'База данных пуста');

    return users;
  }

  postItem(obj: iBody): iUser[] {
    this.isValidUser(obj);
    this.handleErrors(!obj.username || !obj.email || !obj.password, 'Введены некорректные значения');

    const dbLength = users.length
    const newId: number = users.length === 0 ? 1 : users[users.length - 1].id + 1
    users.push({ id: newId, ...obj })
    this.handleErrors(dbLength === users.length, 'Произошла ошибка при добавлении');

    return users
  }

  putItem(id: string, obj: iBody): iUser[] {
    this.isValidUser(obj);

    this.handleErrors(!obj.username || !obj.email || !obj.password, 'Некоторые поля не заполнены');

    const indexEl = users.findIndex(el => el.id === +id);
    if (indexEl === -1) throw new Error('Such ID does not exist');
    users[indexEl] = { ...users[indexEl], ...obj };

    return users;
  }

  patchItem(id: string, obj: Partial<iBody>): iUser[] {
    this.isValidUser(obj);

    this.handleErrors(!id || !obj.username || !obj.email || !obj.password, 'Некоторые поля не заполнены')
    const indexEl = users.findIndex(el => el.id === +id);
    this.handleErrors(indexEl === -1, 'Такой ID не существует')
    users[indexEl] = { ...users[indexEl], ...obj };

    return users;
  }

  deleteItem(id: string): iUser[] {
    const indexEl = users.findIndex(el => el.id === +id);
    this.handleErrors(indexEl === -1, 'Такой ID не существует')
    users.splice(indexEl, 1);

    return users;
  }
}
