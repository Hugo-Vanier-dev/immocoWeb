import React from 'react';
import { useParams } from 'react-router';
import PropertyForm from './form/PropertyForm';
import PixLoader from './pixloader/PixLoader';

function ReadProperty() {
  const id = useParams().id;

  return(
    <div className="grid grid-cols-2">
      <div className="grid col-start-1 col-span-1">        
        <PropertyForm propertyId={id} modeEdit={true} />
      </div>
      <div className="col-start-2">
        <PixLoader />
      </div>
    </div>
  );
}
export default ReadProperty;