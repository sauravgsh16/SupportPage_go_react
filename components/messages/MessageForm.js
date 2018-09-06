import React, { Component } from 'react'
import PropTypes from 'prop-types';

class MessageForm extends Component {

  onSubmit(event) {
    event.preventDefault();
    const node = this.refs.message;
    const msg = node.value;
    this.props.addMessage(msg);
    node.value = '';
  }

  render() {
    let input;
    if (this.props.activeChannel.id !== 'undefined') {
      input = (
        <input
          type='text'
          className='form-control'
          placeholder='Enter a message'
          ref='message'
        />
      )
    }

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='form-group'>
          {input}
        </div>
      </form>
    )
  }
}

MessageForm.propTypes = {
  activeChannel: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired
}

export default MessageForm;