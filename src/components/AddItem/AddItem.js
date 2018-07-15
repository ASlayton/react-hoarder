import React from 'react';
import './AddItem.css';
import authRequests from '../../firebaseRequests/auth';
import itemRequests from '../../firebaseRequests/items';
import myStuffRequests from '../../firebaseRequests/myStuff';
// import MyStuff from '../MyStuff/MyStuff';
import Item from '../Item/Item';

class AddItem extends React.Component {
  state = {
    items: [],
    myStuff: {},
  };

  addToMyStuff = (newItem) => {
    // console.error(newItem);
    const myUid = authRequests.getUid();
    // const newItem = {...this.state.myStuff};
    // this.setState({myStuff: newItem});
    newItem.uid = myUid;
    myStuffRequests
      .postRequest(newItem)
      .then(() => {
        this.props.history.push('/items');
      })
      .catch((err) => {
        console.error('error in newItem post', err);
      });
  };
  saveMyStuff = () => {
    const newItem = {items: {...this.state.myStuff}};
    newItem.uid = authRequests.getUid();

  };
  componentDidMount () {
    itemRequests
      .getRequest()
      .then((items) => {
        this.setState({items});
      })
      .catch((err) => {
        console.error('error in item get request', err);
      });
  }
  render () {
    const itemComponents = this.state.items.map((item) => {
      return (
        <Item
          key={item.id}
          details={item}
          addToMyStuff={this.addToMyStuff}
        />
      );
    });
    return (
      <div className="takeItem">
        <div className="container">
          <h1>All the things</h1>
          <ul>
            {itemComponents}
          </ul>
        </div>
      </div>
    );
  }
};

export default AddItem;
