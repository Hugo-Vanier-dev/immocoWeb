import React, {useState} from 'react'
import './ListProperties.css'
import PropertyService from '../../shared/services/property.service'
import PropertyForm from './form/PropertyForm'
import PropertyList from './ListProperties'
import PropertyPixLoader from './pixloader/PixLoader'


function PropertyPage() {


const [data, setData] = useState([]);

const [propertyId, setPropertyId] = useState(null);


React.useEffect(() => {
PropertyService.getAll('city','asc',100,0).then(res => {
setData(res.data);
})
}, [])

return(
<div className="mr-5 md:mx-3 sm:mx-2">
    <div className="grid grid-cols-3">
    <div className="col-span-1 col-start-1">
        <PropertyList edit={true} setPropertyId={setPropertyId}/>
    </div>
    <div className="col-span-1 col-start-2">
        <PropertyForm edit={false} propertyId={propertyId}/>
    </div>
    <div className="col-span-1 col-start-3">
        <PropertyPixLoader edit={false} propertyId={propertyId}/>
    </div>
    </div>
</div>
);
}
export default PropertyPage;