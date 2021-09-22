import React, {useState} from 'react'
import './ListClient.css'
import ClientService from '../../shared/services/client.service'



export default function ListClient({setClientId}) {
const [data, setData] = useState([])

const handleClientClick = (e) =>{
  
  setClientId(e.target.attributes.getNamedItem('data-id').value);
}

React.useEffect(() => {
ClientService.getAll().then(res => {
setData(res.data);
})
}, [])

return(
<div>
    <div>
      <div className="py-2 text-blue-300 font-black">Liste des clients</div>
      <div className="grid grid-cols-2 bg-blue-300 text-gray-50 p-1 rounded-md my-2">
        <div className="text-left mx-2">NOM</div>
        <div className="text-left mx-2">Prénom</div>
      </div>
    </div>
    <div className="clientTableContainer">
      <table className="">
      <tbody>
        {data.map(function(user, index){
        return(
        <tr key={user.id} id={user.id} onClick={handleClientClick} className="bg-white hover:bg-blue-400 hover:text-gray-100 grid grid-cols-2">
          <td data-id={user.id} className="text-left">{user.lastname}</td>
          <td data-id={user.id} className="text-left">{user.firstname}</td>
        </tr>
        )
        })}
        </tbody>
      </table>
    </div>
</div>
);
}
/** export default ListClient; */
