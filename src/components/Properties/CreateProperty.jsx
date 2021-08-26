import React from 'react';
import PropertyForm from './form/PropertyForm';

function CreateProperty() {
  return(
    <PropertyForm propertyId={null} modeEdit={true} />
  );
}
export default CreateProperty;