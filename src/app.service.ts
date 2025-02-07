import { Injectable } from '@nestjs/common';

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

interface iUser {
  id: number,
  name: string,
  description: string
}

interface iBody {
  name: string,
  description: string
}


@Injectable()
export class AppService {

  isValidUser(obj: Partial<iBody>) {
    if (obj.name && !isNaN(+obj.name)) throw new Error('Incorrect values ​​are introduced')
    if (obj.description && !isNaN(+obj.description)) throw new Error('Incorrect values ​​are introduced')
  }

  getAllItem(): iUser[] {
    if (!data.length) throw new Error('The database is empty')

    return data;
  }

  postItem(obj: iBody): iUser[] {
    this.isValidUser(obj)
    if (!obj.name || !obj.description) throw new Error('Incorrect values ​​are introduced')
    const dbLength = data.length
    const newId: number = data.length === 0 ? 1 : data[data.length - 1].id + 1
    data.push({ id: newId, ...obj })
    if (dbLength === data.length) throw new Error('There was an add -on error')

    return data
  }

  putItem(id: string, obj: iBody): iUser[] {
    this.isValidUser(obj)
    if (!id || !obj.name || !obj.description) throw new Error('There are incomplete fields')
    const indexEl = data.findIndex(el => el.id === +id);
    if (indexEl === -1) throw new Error('Such ID does not exist');
    data[indexEl] = { ...data[indexEl], ...obj };

    return data;
  }

  patchItem(id: string, obj: Partial<iBody>): iUser[] {
    this.isValidUser(obj)
    if (!id && !obj.name && !obj.description) throw new Error('There are incomplete fields')
    const indexEl = data.findIndex(el => el.id === +id);
    if (indexEl === -1) throw new Error('Such ID does not exist');
    data[indexEl] = { ...data[indexEl], ...obj };

    return data;
  }

  deleteItem(id: string): iUser[] {
    if (data.findIndex(el => el.id === +id) === -1) throw new Error('Such ID does not exist')
    const indexEl = data.findIndex(el => el.id === +id);
    data.splice(indexEl, 1);

    return data;
  }
}
