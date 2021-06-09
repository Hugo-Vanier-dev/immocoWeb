import React, {useState} from 'react'
import './ListClient.css'
import ClientService from '../../shared/services/client.service'
import { Link } from 'react-router-dom'
import ClientForm from './form/ClientForm'



function ListClient() {
const [data, setData] = useState([])

const [clientId, setClientId] = useState(null);
const handleClientClick = (e) =>{
  /**
   * lors de la sélection de l'élément voulu, on récupère la valeur de son id
   */
  setClientId(e.target.attributes.getNamedItem('data-id').value);
}

React.useEffect(() => {
ClientService.getAll().then(res => {
setData(res.data);
})
}, [])

return(
<div className="grid grid-cols-2 gap-0">
  <div>
    <div>
      <div className="py-2 mx-2 bg-gray-700 text-gray-50">Liste des clients</div>
      <div className="grid grid-cols-2 bg-blue-400 text-gray-50 p-1 mx-2">
        <div className="text-left">NOM</div>
        <div className="text-center">Prénom</div>
      </div>
    </div>
    <div className="tableContainer mx-2">
      <table className="">
      <tbody>
        {data.map(function(user, index){
        return(
        <tr key={user.id} id={user.id} onClick={handleClientClick} className="hover:bg-blue-200">
          <td data-id={user.id} className="text-left">{user.lastname}</td>
          <td data-id={user.id} className="mx-2">{user.firstname}</td>
        </tr>
        )
        })}
        </tbody>
      </table>
    </div>
  </div>
  <div>
    <ClientForm modeEdit={true} clientId={clientId}/>
  </div>
</div>
);
}
export default ListClient;