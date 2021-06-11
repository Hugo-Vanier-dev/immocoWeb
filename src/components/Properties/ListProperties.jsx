import React, {useState} from 'react'
import './ListProperties.css'
import PropertyService from '../../shared/services/property.service'
import { Link } from 'react-router-dom'
import PropertyForm from './form/PropertyForm'



function PropertyList() {

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

console.log(checkbox);

React.useEffect(() => {
PropertyService.getAll('city','asc',100,0).then(res => {
  console.log(res.data)
setData(res.data);
})
}, [])

return(
<div>
  <div>
    <div>
      <div className="py-2 mx-2 text-gray-50">Liste des propriétés</div>
      <div className="grid grid-cols-6 bg-blue-400 text-gray-50 p-1 mx-2">
        <div className="text-left mx-2">Localité</div>
        <div className="text-center mx-2">Code postal</div>
        <div className="text-center mx-2">Type de bien</div>
        <div className="text-center mx-2">Surface habitable</div>
        <div className="text-right mx-2">Superficie totale</div>
        <div className="text-right mx-2">Prix (€)</div>
      </div>
    </div>
    <div className="tableContainer mx-2">
      <table className="bg-gray-100">
      <tbody>
        {data.map(function(property, index){
        return(
        <tr key={property.id} id={property.id} className="bg-white hover:bg-green-300 grid grid-cols-6">
          <td data-id={property.id} className="text-left">
            <input type="checkbox" onChange={handleChange} className="mx-4" id={property.id} />
            {property.city}
            </td>
          <td data-id={property.id} className="text-center">{property.zipcode}</td>
          <td data-id={property.id} className="text-center">{property.property_types}</td>
          <td data-id={property.id} className="text-center">{property.livingArea} m²</td>
          <td data-id={property.id} className="text-right">{property.area} m²</td>
          <td data-id={property.id} className="text-right">{property.price} €</td>
        </tr>
        )
        })}
        </tbody>
      </table>
    </div>
  </div>
  <div>
    
    <Link to={`/createProperty/${propertyId}`} >
    <input
      type="submit"
      value="Créer"
      path={PropertyForm}
      className="m-auto mt-5 text-gray-50 uppercase bg-green-300 hover:bg-green-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
    />
    </Link>
    <Link to={`/readProperty/${checkbox[0]}`} >
    <input
    type="submit"
    value="Afficher"
    className="m-auto mt-5 text-gray-50 uppercase bg-blue-300 hover:bg-blue-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
    />
    </Link>
    <input
      type="submit"
      value="Supprimer"
      className="m-auto mt-5 text-gray-50 uppercase bg-red-300 hover:bg-red-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
    />
    <input
      type="button"
      onClick={() => window.print()}
      value="Imprimer"
      className="m-auto mt-5 text-gray-50 uppercase bg-gray-400 hover:bg-yellow-400 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
    />
   
  </div>
</div>
);
}
export default PropertyList;