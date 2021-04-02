import React from 'react';
import UserForm from './form/UserFrom';

function CreateUser() {
  return(
    <UserForm UserId={null} modeEdit={true} />
  );
}
export default CreateUser;