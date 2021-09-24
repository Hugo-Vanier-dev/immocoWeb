import React, { useState, useEffect } from 'react';
import './ListClient.css';
import ClientService from '../../shared/services/client.service';
import { BsPlusCircleFill, BsBuilding, BsPersonFill, BsClipboard } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
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
        <table>
          <thead className="grid gird-cols-2">
            <h1 className="col-span-1 col-start-1 py-2 text-blue-300 font-black">Liste des clients</h1>
            <BsPlusCircleFill className="col-span-1 col-start-2" onClick={createClient} />
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
                    <BsPersonFill className="col-span-1 col-start-1" onClick={() => handleClientClick(client.id)} />
                    {
                      client.properties && client.properties.length > 0 &&
                      <BsBuilding className="col-span-1 col-start-2" />
                    }
                    {
                      client.clientWish &&
                      <BsClipboard className="col-span-1 col-start-3" />
                    }
                    <FaTrash className="col-span-1 col-start-4" onClick={() => openSuppressionModal(client.id)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <SuppressionModalTemplate isOpen={suppressionModalOpen} validateSuppressionMethode={deleteClient} invalidateSuppressionMethode={closeModale} suppressionMessage={'Souhaitez-vous vraiment supprimer ce client ?'} />
    </div>
  );
}
