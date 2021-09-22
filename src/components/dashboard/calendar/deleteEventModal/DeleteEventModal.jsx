import React from 'react'

function DeleteEventModal({ onDelete, eventText, onClose }){
    return(
        <>
          <div id="deleteEventModal">
            <h2>Rendez-vous</h2>
    
            <p id="eventText">{eventText}</p>
    
            <button onClick={onDelete} id="deleteButton">Supprimer</button>
            <button onClick={onClose} id="closeButton">Fermer</button>
          </div>
    
          <div id="modalBackDrop"></div>
        </>
      );
    };

export default DeleteEventModal;