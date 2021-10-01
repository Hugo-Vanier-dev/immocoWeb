import React, {useState} from 'react'
import './ListProperties.css'
import PropertyService from '../../shared/services/property.service'
import PropertyForm from './form/PropertyForm'
import PropertyList from './ListProperties'
import PropertyPixLoader from './pixloader/PixLoader'


function PropertyPage() {

const [checkbox, setCheckbox] = useState([]);
const handleChange = (e) => {
  let isChecked = e.target.checked;
  // do whatever you want with isChecked value
  if (isChecked){
    /** vérifie la selection */
    setCheckbox(baseState=> [...baseState, e.target.id]);
  }else{
    /** on filtre les données sélectionnées
     *  et si le checkbox est OFF,
     *  l'id est retiré du tableau */
    let newArray = checkbox.filter(item => item !== e.target.id);
    console.log(newArray);
    setCheckbox(newArray);
  }
  console.log(e.target.id);
}

const [data, setData] = useState([]);

const [propertyId, setPropertyId] = useState(null);
const handlePropertyClick = (e) =>{
  /**
   * lors de la sélection de l'élément voulu, on récupère la valeur de son id
   */
  setPropertyId(e.target.attributes.getNamedItem('data-id').value);
}

React.useEffect(() => {
PropertyService.getAll('city','asc',100,0).then(res => {
  console.log(res.data)
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