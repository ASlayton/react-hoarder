import React from 'react';
import myStuffRequests from '../../firebaseRequests/myStuff';
import './MyStuff.css';
import authRequest from '../../firebaseRequests/auth';
import Item from '../Item/Item';

class AllMyStuff extends React.Component {

  state = {
    myStuff: [],
  }
  saveMyStuff = () => {
    const newItem = {items: {...this.state.myStuff}};
    newItem.uid = authRequest.getUid();
    myStuffRequests
      .postRequest(newItem)
      .then(() => {
        this.props.history.push('/items');
      })
      .catch((err) => {
        console.error('error in newItem post', err);
      });
  };
  componentDidMount () {
    const myUid = authRequest.getUid();
    myStuffRequests
      .getRequest(myUid)
      .then((myStuff) => {
        this.setState({myStuff});
      })
      .catch((err) => {
        console.error('error with myStuffRequests get', err);
      });
  }
  render () {
    const myStuffComponents = this.state.myStuff.map((aThing) => {
      return (
        <Item
          key={aThing.id}
          details={aThing}
        />
      );
    });
    return (
      <div className="myStuff">
        <h1>My Stuff</h1>
        <ul>
          {myStuffComponents}
        </ul>
        <button className="btn btn-default" onClick={this.saveMyStuff}>Save Things</button>
      </div>
    );
  }
};

export default AllMyStuff;
