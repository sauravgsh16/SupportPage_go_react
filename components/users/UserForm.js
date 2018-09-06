import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserForm extends Component {

  onSubmit(event) {
    event.preventDefault();
    const node = this.refs.userName;
    const name = node.value;
    this.props.setUserName(name)
    node.value = '';
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <input
            className='form-control'
            placeholder='Set your name'
            type='text'
            ref='userName'
          />
        </div>
      </form>
    )
  }
}

UserForm.propTypes = {
  setUserName: PropTypes.func.isRequired
}

export default UserForm;
