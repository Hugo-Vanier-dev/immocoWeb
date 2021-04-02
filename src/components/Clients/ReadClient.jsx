import React from 'react';
import { useParams } from 'react-router';
import ClientForm from './form/ClientForm';

function ReadClient() {
  const id = useParams().id;

  return(
    <ClientForm clientId={id} modeEdit={false} />
  );
}
export default ReadClient;