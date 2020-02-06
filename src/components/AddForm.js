import React from 'react';

const AddForm = props => {
  const { name, initiative, onChange, inputRef, submit } = props;
  return (
    <form className="add-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={onChange}
          value={name}
          ref={inputRef}
        />
      </div>
      <div className="form-group">
        <label htmlFor="initiative">Initiative</label>
        <input
          type="number"
          name="initiative"
          id="initiative"
          onChange={onChange}
          value={initiative || ''}
        />
      </div>
      <input
        type="submit"
        value="Add"
        disabled={!(name && initiative)}
        onClick={submit}
      />
    </form>
  );
};

export default AddForm;
