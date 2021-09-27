import React, { useState, useEffect } from 'react';
import './ListClient.css';
import ClientService from '../../shared/services/client.service';
import { BsPlusCircleFill, BsHouseDoor, BsPerson, BsTable, BsArchive } from 'react-icons/bs';
import SuppressionModalTemplate from '../../shared/helper/SuppressionModalTemplate';


export default function
  ListClient({ setClientId, setModeEdit, reloadList }) {
  const [data, setData] = useState([]);
  const [suppressionModalOpen, setSuppressionModalOpen] = useState(false);
  const [currentClientToBeDeletedId, setCurrentClientTobeDeletedId] = useState(null);


  const handleClientClick = (clientId) => {
    setClientId(clientId);
    setModeEdit(false);
  }

  const createClient = () => {
    setClientId(null);
    setModeEdit(true);
  }

  const openSuppressionModal = (clientId) => {
    setCurrentClientTobeDeletedId(clientId);
    setSuppressionModalOpen(true);
  }


  const deleteClient = () => {
    ClientService.delete(currentClientToBeDeletedId).then(res => {
      setSuppressionModalOpen(false);
      setCurrentClientTobeDeletedId(null);
      ClientService.getAll().then(res => {
        setData(res.data);
      })
    });
  }

  const closeModale = () => {
    setSuppressionModalOpen(false);
    setCurrentClientTobeDeletedId(null);
  }

  useEffect(() => {
    ClientService.getAll().then(res => {
      setData(res.data);
    })
  }, [reloadList])

  return (
    <div>
      <div className="clientTableContainer">
        <table className="table-auto">
          <thead>
            <h1 className="py-2 text-blue-300 font-black">Liste des clients</h1>
          </thead>
          <tbody>
            <tr className="grid grid-cols-3 bg-blue-300 text-gray-50 p-1 rounded-md my-2">
              <th className="text-left mx-2">Nom</th>
              <th className="text-left mx-2">Prénom</th>
              <th className="text-left mx-2">Action</th>
            </tr>
            {data.map(function (client) {
              return (
                <tr key={client.id} id={client.id} className="bg-white hover:bg-blue-400 hover:text-gray-100 grid grid-cols-3">
                  <td data-id={client.id} className="text-left">{client.lastname}</td>
                  <td data-id={client.id} className="text-left">{client.firstname}</td>
                  <td data-id={client.id} className="text-left grid grid-cols-4">
                    <BsPerson className="col-span-1 col-start-1 mx-3 text-blue-400 bg-white border-2 hover:text-red-500 hover:border-red-500 border-blue-300 shadow-sm rounded-lg p-1"  size="35px" onClick={() => handleClientClick(client.id)} />
                    {
                      client.properties && client.properties.length > 0 &&
                      <BsHouseDoor className="col-span-1 col-start-2 mx-3 text-blue-400 bg-white border-2 hover:text-red-500 hover:border-red-500 border-blue-300 shadow-sm rounded-lg p-1"  size="35px" />
                    }
                    {
                      client.clientWish &&
                      <BsTable className="col-span-1 col-start-3 mx-3 text-blue-400 bg-white border-2 hover:text-red-500 hover:border-red-500 border-blue-300 shadow-sm rounded-lg p-1"  size="35px" />
                    }
                    <BsArchive className="col-span-1 col-start-4 mx-3 text-blue-400 bg-white border-2 hover:text-red-500 hover:border-red-500 border-blue-300 shadow-sm rounded-lg p-1"  size="35px" onClick={() => openSuppressionModal(client.id)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="my-5 flex justify-center items-center">
        <BsPlusCircleFill className="text-blue-300 hover:text-green-400" size="50px" onClick={createClient} />
        </div>
      </div>
      <SuppressionModalTemplate isOpen={suppressionModalOpen} validateSuppressionMethode={deleteClient} invalidateSuppressionMethode={closeModale} suppressionMessage={'Souhaitez-vous vraiment supprimer ce client ?'} />
    </div>
  );
}
