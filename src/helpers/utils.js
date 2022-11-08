import store from '../redux/store';
import { LayoutSection } from './enums';

export const cloneAccount = () => {
  return JSON.parse(JSON.stringify(store.getState().accountData.account));
}

//export const apiUrl = 'https://localhost:7055/account';
export const apiUrl = 'https://linksnews2api.azurewebsites.net/account';

export const getLoginStr = () => {
  return localStorage.getItem('login');
}

export const getLogin = () => {
  const l = getLoginStr();
  if (!l) {
    return undefined
  }
  return JSON.parse(l);
}

export const config = () => {
  const l = getLoginStr();

  if (!l) {
    return undefined;
  }

  const result = {
    'headers': {
      'login': l
    }
  }

  return result;
}

export const addObject = (objects, newObj, selectedObj = null, before = true) => {

  if (selectedObj === null) {
    objects.push(newObj);
    return;
  }
  const o = objects.find(x => x.id === selectedObj.id);
  let index = objects.indexOf(o);
  if (index < 0) {
    throw new Error("Object not found")
  }
  if (!before) {
    index++;
  }
  objects.splice(index, 0, newObj);
}

export const findNewLayoutSection = (account, section, id) => {

  if (section === LayoutSection.Page) {
    return account.pages.find(x => x.id === id)
  }

  for (let i = 0; i < account.pages.length; i++) {
    const page = account.pages[i];
    if (section === LayoutSection.Row) {
      const result = page.rows.find(x => x.id === id);
      if (result) {
        return result;
      }
      continue;
    }

    for (let j = 0; j < page.rows.length; j++) {
      const row = page.rows[j];
      if (section === LayoutSection.Column) {
        const result = row.columns.find(x => x.id === id)
        if (result) {
          return result;
        }
        continue;
      }
  
      for (let k = 0; k < row.columns.length; k++) {
        const column = row.columns[k];
        if (section === LayoutSection.Link) {
          const result = column.links.find(x => x.id === id)
          if (result) {
            return result;
          }
        }
      }
    }
  }

  return null;

}