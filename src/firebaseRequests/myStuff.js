import axios from 'axios';
import constants from '../constants';

const getRequest = (uid) => {
  return new Promise ((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/stuffList.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const myStuff = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            myStuff.push(res.data[fbKey]);
          });
        }
        resolve(myStuff);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getRequest };
