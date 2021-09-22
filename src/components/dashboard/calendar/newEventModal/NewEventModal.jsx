import React, { useState } from 'react';

function NewEventModal({ onSave, onClose }){
    const [title, setTitle] = useState('');
    const [error, setError] = useState(false);
  
    return(
      <>
        <div id="newEventModal"
             className="uppercase
                        text-gray-700
                        rounded-xl
                        bg-gray-100
                        shadow-md">
          <h2>Nouveau Rendez-vous</h2>
  
          <input 
            className={error ? 'error' : ''}
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            id="eventTitleInput" 
            placeholder="Nom"/>
          <input 
            className={error ? 'error' : ''}
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            id="eventTitleInput" 
            placeholder="Prénom"/>
          <input 
            className={error ? 'error' : ''}
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            id="eventTitleInput" 
            type= "time"/>

          <button 
            onClick={() => {
              if (title) {
                setError(false);
                onSave(title);
              } else {
                setError(true);
              }
            }} 
            id="saveButton"
            className="text-blue-400
                       hover:text-gray-50
                       shadow-sm
                       mx-2
                       py-1
                       rounded-xl
                       border-2
                       border-blue-300
                       bg-gray-50
                       hover:bg-green-300">Valider</button>
  
          <button 
            onClick={onClose}
            id="cancelButton"
            className="text-blue-400
                       hover:text-gray-50
                       shadow-sm
                       mx-2
                       py-1
                       rounded-xl
                       border-2
                       border-blue-300
                       bg-gray-50
                       hover:bg-red-300">Annuler</button>
        </div>
  
        <div id="modalBackDrop"></div>
      </>
    );
  };

export default NewEventModal;