import React, { useState } from 'react';
import ClientForm from './form/ClientForm'
import ClientList from './ListClient'


function ClientPage() {
  const [clientId, setClientId] = useState(null);
  const [modeEdit, setModeEdit] = useState(true);
  const [reloadList, setReloadList] = useState(true);

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1 col-start-1">
        <ClientList setClientId={setClientId} setModeEdit={setModeEdit} reloadList={reloadList} />
      </div>
      <div className="col-span-1 col-start-2">
        <ClientForm modeEdit={modeEdit} setModeEdit={setModeEdit} clientId={clientId} setReloadList={setReloadList} reloadList={reloadList} />
      </div>
    </div>
  );
}
export default ClientPage;