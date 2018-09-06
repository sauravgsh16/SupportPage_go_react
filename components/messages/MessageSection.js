import React, { Component } from 'react'
import PropTypes from 'prop-types';

import MessageList from './MessageList';
import MessageForm from './MessageForm';

class MessageSection extends Component {
  render() {
    let { activeChannel } = this.props;

    return (
      <div className='messages-container panel panel-default'>
        <div className='panel-heading'>
          <strong>{activeChannel.name ? activeChannel.name : 'Select a Channel'}</strong>
        </div>
        <div className='panel-body messages'>
          <MessageList messages={this.props.messages} />
          <MessageForm
            activeChannel={this.props.activeChannel}
            addMessage={this.props.addMessage}
          />
        </div>
      </div>
    )
  }
}

MessageSection.propTypes = {
  activeChannel: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired
}

export default MessageSection;
