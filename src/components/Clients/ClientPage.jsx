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
    <ClientForm edit={true}/>
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