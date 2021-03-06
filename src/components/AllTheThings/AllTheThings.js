import React from 'react';
import './AllTheThings.css';
import stuffRequest from '../../firebaseRequests/items';
import Item from '../Item/Item';

class AllTheThings extends React.Component {
  state = {
    items: [],
    myStuff: {
      uid: '',
      items: {},
    },
  }

  componentDidMount () {
    stuffRequest
      .getRequest()
      .then((items) => {
        this.setState({items});
      })
      .catch((err) => {
        console.error('error with item get request', err);
      });
  }

  render () {
    const itemComponents = this.state.items.map((item) => {
      return (
        <Item
          key={item.id}
          details={item}
          addToHovel={this.addToHovel}
        />
      );
    });
    return (
      <div className="items col-xs-12">
        <h1>All The Things</h1>
        <ul className="items">
          {itemComponents}
        </ul>
      </div>
    );
  }
}

export default AllTheThings;
