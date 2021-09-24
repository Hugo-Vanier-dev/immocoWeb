import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

export default function SuppressionModalTemplate({isOpen, validateSuppressionMethode, invalidateSuppressionMethode, suppressionMessage = 'Souhaitez-vous vraiment supprimer ceci ?'}) {
    return (
        <Modal isOpen={isOpen}
        style={customStyles}
      >
        <header>
          <h1>Suppression</h1>
        </header>
        <body>
          <p>{suppressionMessage}</p>
          <div>
            <button onClick={invalidateSuppressionMethode}>Non</button>
            <button onClick={validateSuppressionMethode}>Oui</button>
          </div>
        </body>
      </Modal>
    )
}