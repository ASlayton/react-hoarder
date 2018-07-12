import axios from 'axios';
import constants from '../constants';

const stuffRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/items.json`)
      .then(res => {
        const stuff = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            stuff.push(res.data[fbKey]);
          });
        }
        resolve(stuff);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default stuffRequest;
