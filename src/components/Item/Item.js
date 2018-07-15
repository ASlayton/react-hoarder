import React from 'react';
import './Item.css';

class Item extends React.Component {

  addClickEvent = () => {
    this.props.addToMyStuff(this.props.details);
  };

  render () {
    const {details} = this.props;
    return (
      <li className="item col-sm-4">
        <div className="panel panel-default">
          <div className="panel-body">
            <img src={details.itemImage} alt={details.itemName} className="item-image"/>
            <div>
              <h3>{details.itemName}</h3>
              <p>{details.itemDescription}</p>
            </div>
          </div>
          <div className="panel-footer">
            <button
              className="btn btn-default claim-btn"
              onClick={this.addClickEvent}
            >
              Claim
            </button>
          </div>
        </div>
      </li>
    );
  };
}

export default Item;
