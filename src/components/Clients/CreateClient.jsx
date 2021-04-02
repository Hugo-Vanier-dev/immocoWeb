import React from 'react';
import ClientForm from './form/ClientForm';

function CreateClient() {
  return(
    <ClientForm clientId={null} modeEdit={true} />
  );
}
export default CreateClient;