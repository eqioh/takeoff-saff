import { apiRoute } from '../helpers/constants';

const userLogin = async (userName, password) => {
  try {
    const response = await fetch(`${apiRoute}/users`);
    return await response.json().then((data) => {
      if (data[0].userName === userName && data[0].password === password) {
        return true;
      } else {
        return false;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { userLogin };
