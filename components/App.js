import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection';
import UserSection from './users/UserSection';
import MessageSection from './messages/MessageSection';

import Socket from '../socket';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: [],
      users: [],
      messages: [],
      activeChannel: {},
      connected: false
    }
  }

  componentDidMount() {
    let socket = this.socket = new Socket();
    socket.on('connect', this.onConnect.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('channel add', this.onAddChannel.bind(this));
    socket.on('user add', this.onAddUser.bind(this));
    socket.on('user edit', this.onEditUser.bind(this));
    socket.on('user remove', this.onRemoveUser.bind(this));
    socket.on('message add', this.onAddMessage.bind(this));
  }

  onConnect() {
    this.setState({ connected: true });
    // We want messages from the active Channel, so app should start and stop
    // feed as and when needed.
    // Thus, we subscribe for a channel and a user when we know that we are connected.
    this.socket.emit('channel subscribe');
    this.socket.emit('user subscribe');
  }

  onDisconnect() {
    this.setState({ coonnected: false });
  }

  onAddChannel(channel) {
    let { channels } = this.state;
    channels.push(channel);
    this.setState({ channels });
  }

  onAddUser(user) {
    let { users } = this.state;
    users.push(user);
    this.setState({ users });
  }

  onEditUser(editUser) {
    let { users } = this.state;
    users = users.map(user => {
      if (editUser.id === user.id) {
        return editUser;
      }
      return user;
    });
    this.setState({ users });
  }

  onRemoveUser(removeUser) {
    let { users } = this.state;
    users = users.filter(user => {
      if (removeUser.id !== user.id) {
        return true
      }
      return false
    });
    this.setState({ users });
  }

  onAddMessage(message) {
    let { messages } = this.state;
    messages.push(message);
    this.setState({ messages })
  }

  addChannel(name) {
    this.socket.emit('channel add', { name });
  }

  setChannel(activeChannel) {
    this.setState({ activeChannel });
    // Here we set an message unsubscribe to stop any previously started data feeds
    // And set messages to empty array which will remove any messages selected 
    // from the last selected channel
    this.socket.emit('message unsubscribe');
    this.setState({ messages: [] });
    // Now we send the message subscribe event with the channelId of the active channel
    this.socket.emit('message subscribe', { channelId: activeChannel.id })
  }

  setUserName(name) {
    this.socket.emit('user edit', { name });
    // TODO: send to server
  }

  addMessage(body) {
    let { activeChannel } = this.state;
    this.socket.emit('message add', { channelId: activeChannel.id, body });
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
