import React, { Component } from 'react'
import PropTypes from 'prop-types';

import UserList from './UserList';
import UserForm from './UserForm';

class UserSection extends Component {
  render() {
    return (
      <div className='support panel panel-primary'>
        <div className='panel-heading'>
          <strong>Users</strong>
        </div>
        <div className='panel-body channels'>
          <UserList users={this.props.users} />
          <UserForm
            setUserName={this.props.setUserName}
          />
        </div>
      </div>
    )
  }
}

UserSection.propTypes = {
  setUserName: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}

export default UserSection;
