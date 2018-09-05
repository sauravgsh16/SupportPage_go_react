import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChannelForm from './ChannelForm';
import ChannelList from './ChannelList';


class ChannelSection extends Component {
  render() {
    return (
      <div className='support panel panel-primary'>
        <div className='panel-heading'>
          <strong>Channels</strong>
        </div>
        <div className='panel-body channels'>
          <ChannelList
            channels={this.props.channels}
            setChannel={this.props.setChannel}
            activeChannel={this.props.activeChannel}
          />
          <ChannelForm
            addChannel={this.props.addChannel}
          />
        </div>
      </div>
    )
  }
}

ChannelSection.propTypes = {
  channels: PropTypes.array.isRequired,
  setChannel: PropTypes.func.isRequired,
  addChannel: PropTypes.func.isRequired,
  activeChannel: PropTypes.object.isRequired
}

export default ChannelSection;