import React, { Component } from 'react';
import ChannelSection from './channels/ChannelSection';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: [],
      activeChannel: {}
    }
  }

  addChannel(name) {
    let { channels } = this.state;
    channels.push({ id: channels.length, name})
    this.setState({ channels });
    // TODO: send to server
  }

  setChannel(activeChannel) {
    this.setState({ activeChannel });
    // TODO: get latest message for that channel
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
        </div>
      </div>
    )
  }
}

export default App;
