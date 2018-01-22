import React, { Component } from 'react';

class AddForm extends Component {
  render() {
    return (
      <form className="add-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.props.onChange.bind(this)}
            value={this.props.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="initiative">Initiative</label>
          <input
            type="text"
            name="initiative"
            id="initiative"
            onChange={this.props.onChange.bind(this)}
            value={this.props.initiative || ''}
          />
        </div>
        <input
          type="submit"
          value="Add"
          disabled={!(this.props.name && this.props.initiative)}
          onClick={this.props.submit.bind(this)}
        />
      </form>
    );
  }
}

export default AddForm;
