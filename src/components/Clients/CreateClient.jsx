import React from 'react';
import NewClientForm from './form/NewClientForm';

function CreateClient() {
  return(
    <NewClientForm clientId={null} modeEdit={true} />
  );
}
export default CreateClient;