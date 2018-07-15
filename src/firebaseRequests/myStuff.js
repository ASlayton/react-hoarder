import axios from 'axios';
import constants from '../constants';

const getRequest = (uid) => {
  return new Promise ((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/stuffList.json?orderBy="uid"`)
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

const postRequest = (newItem) => {
  return new Promise ((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/stuffList.json`, newItem)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteRequest = (orderId) => {
  return new Promise ((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/orders/${orderId}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getRequest, postRequest, deleteRequest };
