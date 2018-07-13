import React from 'react';
import myStuffRequest from '../../firebaseRequests/myStuff';
import authRequests from '../../firebaseRequests/auth';
import './MyStuff.css';

class MyStuff extends React.Component {
  state = {
    myStuff: [],
  }

  componentDidMount () {
    myStuffRequest
      .getRequest(authRequests.getUid())
      .then((myStuff) => {
        this.setState({myStuff});
      })
      .catch((err) => {
        console.error('Error with My Stuff request', err);
      });
  }

  renderStuff = (key) => {
    const item = this.props.items.find(x => x.id  === key);
    const count = this.props.stuff[key];
    const removeItemClickFunction = () => {
      this.props.removeFromStuff(key);
    };

    return (
      <li className="item col-sm-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <img src={item.itemImage} alt={item.itemName} className="item-image"/>
            <div>
              <h3>{item.itemName}</h3>
              <p>{item.itemDescription}</p>
            </div>
          </div>
          <div className="panel-footer">
            <button
              className="btn btn-default remove-btn"
              onClick={this.removeItemClickFunction}
            >
              Claim
            </button>
          </div>
        </div>
      </li>
    )
  };
  render () {
    const myStuffComponents = this.state.myStuff.map((stuff) => {

    })
    return (
      <div>My Stuff
      </div>
    );
  }
}

export default MyStuff;
