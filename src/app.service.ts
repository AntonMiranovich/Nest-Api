import { Injectable } from '@nestjs/common';
import { iBody, iUser } from './interfaces/user.interface';

const data = [
  {
    id: 1,
    name: "Object One",
    description: "This is the description for object one."
  },
  {
    id: 2,
    name: "Object Two",
    description: "This is the description for object two."
  },
  {
    id: 3,
    name: "Object Three",
    description: "This is the description for object three."
  },
  {
    id: 4,
    name: "Object Four",
    description: "This is the description for object four."
  }
];



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
      this.handleErrors(!Object.keys(data[0]).includes(key), `Недопустимое поле: ${key}`);
    });

    if (obj.name && !isNaN(+obj.name)) throw new Error('Incorrect values ​​are introduced')
    if (obj.description && !isNaN(+obj.description)) throw new Error('Incorrect values ​​are introduced')
  }




  getAllItem(): iUser[] {
    this.handleErrors(!data.length, 'База данных пуста');

    return data;
  }

  postItem(obj: iBody): iUser[] {
    this.isValidUser(obj);
    this.handleErrors(!obj.name || !obj.description, 'Введены некорректные значения');

    const dbLength = data.length
    const newId: number = data.length === 0 ? 1 : data[data.length - 1].id + 1
    data.push({ id: newId, ...obj })
    this.handleErrors(dbLength === data.length, 'Произошла ошибка при добавлении');

    return data
  }

  putItem(id: string, obj: iBody): iUser[] {
    this.isValidUser(obj);

    this.handleErrors(!id || !obj.name || !obj.description, 'Некоторые поля не заполнены');

    const indexEl = data.findIndex(el => el.id === +id);
    if (indexEl === -1) throw new Error('Such ID does not exist');
    data[indexEl] = { ...data[indexEl], ...obj };

    return data;
  }

  patchItem(id: string, obj: Partial<iBody>): iUser[] {
    this.isValidUser(obj);

    this.handleErrors(!id || !obj.name || !obj.description, 'Некоторые поля не заполнены')
    const indexEl = data.findIndex(el => el.id === +id);
    this.handleErrors(indexEl === -1, 'Такой ID не существует')
    data[indexEl] = { ...data[indexEl], ...obj };

    return data;
  }

  deleteItem(id: string): iUser[] {
    const indexEl = data.findIndex(el => el.id === +id);
    this.handleErrors(indexEl === -1, 'Такой ID не существует')
    data.splice(indexEl, 1);

    return data;
  }
}
