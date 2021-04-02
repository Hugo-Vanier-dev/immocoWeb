import React from 'react';
import { useParams } from 'react-router';
import ClientForm from './form/ClientForm';

function UpdateClient() {
  const id = useParams().id;

  return(
    <ClientForm clientId={id} modeEdit={true} />
  );
}
export default UpdateClient;