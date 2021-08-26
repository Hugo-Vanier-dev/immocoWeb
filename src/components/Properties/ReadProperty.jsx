import React from 'react';
import { useParams } from 'react-router';
import PropertyForm from './form/PropertyForm';

function ReadProperty() {
  const id = useParams().id;

  return(
    <PropertyForm propertyId={id} modeEdit={false} />
  );
}
export default ReadProperty;