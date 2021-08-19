import React, {useState} from 'react'
import ClientService from '../../shared/services/client.service'
import NewClientForm from './form/NewClientForm'
import ClientForm from './form/ClientForm'
import ClientList from './ListClient'


function ClientPage() {
const [data, setData] = useState([])

const [clientId, setClientId] = useState(null);

React.useEffect(() => {
ClientService.create().then(res => {
setData(res.data);
})
}, [])

return(
<div className="grid grid-cols-3">
  <div className="col-span-1 col-start-1">
    <NewClientForm edit={true}/>
      <div>
        <input
          type="submit"
          value="Créer"
          className="m-auto mt-5 text-white uppercase bg-green-300 hover:bg-green-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
        />
        <input
          type="button"
          value="Annuler"
          className="m-auto mt-5 text-white uppercase bg-red-300 hover:bg-red-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
        />
      </div>
  </div>
  <div className="col-span-1 col-start-2">
    <ClientList edit={true} setClientId={setClientId}/>
  </div>
  <div className="col-span-1 col-start-3">
    <ClientForm edit={false} clientId={clientId}/>
  </div>
</div>
);
}
export default ClientPage;