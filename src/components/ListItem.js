import React from 'react';

const ListItem = (props) => {
  return (
    <div className="list-item" onClick={() => props.onClick(props.name, props.initiative)}>
      <div className="character">{props.name}</div>
      <div className="initiative">{props.initiative}</div>
    </div>
  )
}

export default ListItem;
