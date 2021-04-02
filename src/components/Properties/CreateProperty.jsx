import "./Properties.css";
import React, { useState } from "react";
import PropertieService from "../../services/property.service";

function AddProperty() {
    const [Label, setLabel] = React.useState('');
    const [Description, setDescription] = React.useState('');

    function submitForm(e) {
        const data = {
            Label: Label,
            Description: Description,
        };
        PropertieService.create(data)
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <input
              type="text"
              onChange={(e) => setLabel(e.target.value)}
              value={Label}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
              placeholder="Titre du bien."
            />
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={Description}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
            />
            <input
              type="submit"
              value="Create"
              className="text-green-200 uppercase w-1/2 grid row-start-4 auto-cols-auto font-bold  p-2 pt-2 pb-2 rounded-2xl bg-green-400 border-2 border-green-200 shadow "
            />
        </form>
    ) 

    } if('form' == null ) {
        console.log('form');
}

export default AddProperty;
