import React, {useState} from 'react'
import './ListProperties.css'
import PropertyService from '../../shared/services/property.service'
import { Link } from 'react-router-dom'
import PropertyForm from './form/PropertyForm'



function PropertyList() {
const [data, setData] = useState([])

const [propertyId, setPropertyId] = useState(null);
const handlePropertyClick = (e) =>{
  /**
   * lors de la sélection de l'élément voulu, on récupère la valeur de son id
   */
  setPropertyId(e.target.attributes.getNamedItem('data-id').value);
}

React.useEffect(() => {
PropertyService.getAll().then(res => {
setData(res.data);
})
}, [])

return(
<div className="grid grid-cols-1">
  <div>
    <div>
      <div className="py-2 mx-2 text-gray-50">Liste des propriétés</div>
      <div className="grid grid-cols-6 bg-blue-400 text-gray-50 p-1 mx-2">
        <div className="text-left mx-2">Localité</div>
        <div className="text-left mx-2">Code postal</div>
        <div className="text-left mx-2">Type de bien</div>
        <div className="text-left mx-2">Surface habitable</div>
        <div className="text-right mx-2">Terrain (superficie)</div>
        <div className="text-right mx-2">Prix</div>
      </div>
    </div>
    <div className="tableContainer mx-2">
      <table className="bg-gray-100">
      <tbody>
        {data.map(function(property, index){
        return(
        <tr key={property.id} id={property.id} onClick={handlePropertyClick} className="bg-white hover:bg-green-300 grid grid-cols-2">
          <td data-id={property.id} className="text-left">{property.city}</td>
          <td data-id={property.id} className="text-left">{property.price} €</td>
        </tr>
        )
        })}
        </tbody>
      </table>
    </div>
  </div>
  <div>
    <PropertyForm modeEdit={true} propertyId={propertyId}/>
  </div>
</div>
);
}
export default PropertyList;