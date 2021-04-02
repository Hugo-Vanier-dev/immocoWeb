import "./Users.css";
import React, { useState } from "react";
import UserService from "../../services/user.service";

function AddUser() {
    const [LasteName, setLasteName] = React.useState('');
    const [FirstName, setFirstName] = React.useState('');
    const [mail, setmail] = React.useState('');
    const [UserName, setUserName] = React.useState('');
    const [CellPhone, setCellPhone] = React.useState('');
    const [Phone, setPhone] = React.useState('');
    const [PassWord, setPassWord] = React.useState('');
    const [ConfpassWord, setConfPassWord] = React.useState('');
    const [UserTypeId, setUserTypeId] = React.useState('');


    function submitForm(e) {
        const data = {
            LasteName: LasteName,
            FirstName: FirstName,
            mail: mail,
            UserName: UserName,
            CellPhone: CellPhone,
            Phone: Phone,
            PassWord: PassWord,
            ConfpassWord: ConfpassWord,
            UserTypeId: UserTypeId,
        };
        UserService.create(data)
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <label>Nom :</label>
            <input
              type="text"
              onChange={(e) => setLasteName(e.target.value)}
              value={LasteName}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
            />
            <label>Prénom :</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={FirstName}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
            />
            <label>Adresse mail :</label>
            <input
              type="text"
              onChange={(e) => setmail(e.target.value)}
              value={mail}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
            />
            <label>Pseudo :</label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              value={UserName}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
            />
            <label>Numéro de téléphone fix :</label>
            <input
              type="number"
              onChange={(e) => setCellPhone(e.target.value)}
              value={CellPhone}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
            />
            <label>Numéro de téléphone portable :</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={Phone}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
            />
            <label>Mots de passe :</label>
            <input
              type="password"
              onChange={(e) => setPassWord(e.target.value)}
              value={PassWord}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
            />
            <label>Confirmation de mots de passe :</label>
            <input
              type="password"
              onChange={(e) => setConfPassWord(e.target.value)}
              value={ConfpassWord}
              className="grid  row-start-3 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
            />
            <label>Selectionnez la catégorie qui correspond :</label>
            <select>
                <option/>
            </select>
            <input
              type="submit"
              value="Create"
              className="text-green-200 uppercase w-1/2 grid row-start-4 auto-cols-auto font-bold  p-2 pt-2 pb-2 rounded-2xl bg-green-400 border-2 border-green-200 shadow "
            />
        </form>
    )
}
export default AddUser;
