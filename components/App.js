import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection';
import UserSection from './users/UserSection';
import MessageSection from './messages/MessageSection';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: [],
      users: [],
      messages: [],
      activeChannel: {}
    }
  }

  addChannel(name) {
    let { channels } = this.state;
    channels.push({ id: channels.length, name })
    this.setState({ channels });
    // TODO: send to server
  }

  setChannel(activeChannel) {
    this.setState({ activeChannel });
    // TODO: get latest message for that channel
  }

  setUserName(name) {
    let { users } = this.state;
    users.push({ id: users.length, name })
    this.setState({ users });
    // TODO: send to server
  }

  addMessage(body) {
    let { messages, users } = this.state;
    let createdAt = new Date;
    let author = users.length > 0 ? users[0].name : 'anonymous';
    messages.push({ id: messages.length, body, createdAt, author });
    this.setState({ messages });
    // TODO: send to server
  }

  render() {
    return (
      <div className='app'>
        <div className='nav'>
          <ChannelSection
            channels={this.state.channels}
            activeChannel={this.state.activeChannel}
            addChannel={this.addChannel.bind(this)}
            setChannel={this.setChannel.bind(this)}
          />
          <UserSection
            users={this.state.users}
            setUserName={this.setUserName.bind(this)}
          />
        </div>
        <MessageSection
          activeChannel={this.state.activeChannel}
          addMessage={this.addMessage.bind(this)}
          messages={this.state.messages}
        />
      </div>
    )
  }
}

export default App;
