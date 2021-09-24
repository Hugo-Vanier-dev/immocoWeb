import React, { useEffect, useState } from "react";
import ClientService from "../../../shared/services/client.service";
import ClientTypeService from "../../../shared/services/clientType.service";
import { UseUserContext } from "../../../shared/context/userContext";
import UserService from "../../../shared/services/user.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import './ClientForm.css';

toast.configure();

function ClientForm({ clientId = null, modeEdit, setModeEdit, setReloadList, reloadList }) {
  const mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const telRegex = /^\d{2}(\s\d{2}){4}$/;

  const currentUser = UseUserContext();
  const [users, setUsers] = useState(null);
  const [clientTypes, setClientTypes] = useState(null);


  const [formErrors, setFormErrors] = useState({
    firstname: null,
    lastname: null,
    phone: null,
    cellphone: null,
    mail: null,
    streetNumber: null,
    streetName: null,
    zipCode: null,
    city: null,
    description: null,
    client_type_id: null,
    user_id: null,
  });

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    cellphone: "",
    mail: "",
    streetNumber: "",
    streetName: "",
    zipCode: "",
    description: "",
    city: "",
    client_type_id: 1,
    user_id: 1,
  });

  function submitForm(e) {
    e.preventDefault();
    let formIsValid = true;
    for (const errorProp in formErrors) {
      if (formErrors[errorProp] != null) {
        formIsValid = false;
      }
    }
    if (formIsValid) {
      const data = formValues;
      if (clientId) {
        ClientService.update(clientId, data).then((res) => {
          setModeEdit(false);
          setReloadList(!reloadList);
          toast.info("Le client a bien été modifié.", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
          });
        });
      } else {
        ClientService.create(data).then((res) => {
          setReloadList(!reloadList);
          toast.info("Le client a bien été créé.", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
          })
        });
      }
    }
  }

  const handleChange = (e) => {
    formValues[e.target.name] = e.target.value;
    setFormValues({ ...formValues });
  };

  const mailChange = (e) => {
    handleChange(e);
    if (e.target.value === "") {
      setFormErrors({ mail: "Veuillez remplir une adresse mail." });
    } else if (!mailregex.test(e.target.value)) {
      setFormErrors({
        mail: "L'adresse mail que vous avez rempli n'est pas au bon format.",
      });
    } else {
      setFormErrors({ mail: null });
    }
  };

  const textChange = (e) => {
    handleChange(e);
    if (e.target.value === "") {
      formErrors[e.target.name] = "Veuillez remplir ce champ.";
    } else {
      formErrors[e.target.name] = null;
    }
    setFormErrors({ ...formErrors });
  };

  const telChange = (e) => {
    const value = e.target.value
      .replace(/\D+/, "")
      .replace(/^330?/, "0")
      .slice(0, 13)
      .replace(/(\d{2})(?=\d)/g, "$1 ");
    formValues[e.target.name] = value;
    setFormValues({ ...formValues });
    if (value === "") {
      formErrors[e.target.name] = "Veuillez remplir ce champ.";
    } else if (!telRegex.test(value)) {
      formErrors[e.target.name] =
        "Le numéro de téléphone que vous avez remplis n'est pas valide ou pas français.";
    } else {
      formErrors[e.target.name] = null;
    }
    setFormErrors({ ...formErrors });
  };

  useEffect(() => {
    ClientTypeService.getAll().then((clientTypesRes) => {
      setClientTypes(clientTypesRes.data);
    });
  },[]);

  useEffect(() => {
    if (currentUser) {
      if (
        currentUser.user_type.value === "admin" ||
        currentUser.user_type.value === "secrétaire" ||
        currentUser.user_type.value === "manager"
      ) {
        UserService.getAll().then((usersRes) => setUsers(usersRes.data)).catch(error => console.log(error));
      } else {
        setFormValues({ user_id: currentUser.id });
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (clientId) {
      ClientService.get(clientId).then((res) => {
        setFormValues(res.data);
      });
    }else {
      setFormValues({
        firstname: "",
        lastname: "",
        phone: "",
        cellphone: "",
        mail: "",
        streetNumber: "",
        streetName: "",
        zipCode: "",
        description: "",
        city: "",
        client_type_id: 1,
        user_id: 1,
      })
    }
  }, [clientId]);

  return (
    <div className="">
      <div className="">
        <div className="py-2 mx-2 text-blue-300 font-black">Informations clients</div>

        <div className="grid grid-rows-1">
          <form onSubmit={(e) => submitForm(e)} className="grid grid-cols-1">
            <div className="flex justify-end">
              <div>Nom</div>
              <input
                type="text"
                name="lastname"
                onChange={modeEdit ? (e) => textChange(e) : null}
                value={formValues.lastname}
                readOnly={!modeEdit}
                className="col-start-2 m-2 p-2 rounded-md text-center border-2 border-blue-300"
                placeholder="Nom"
              />
              {formErrors.lastname && <p>{formErrors.lastname}</p>}
              <div>Prénom</div>
              <input
                id="firstname"
                type="text"
                name="firstname"
                onChange={modeEdit ? (e) => textChange(e) : null}
                value={formValues.firstname}
                readOnly={!modeEdit}
                className="col-start-1 m-2 p-2 rounded-md text-center border-2 border-blue-300"
                placeholder="Prénom"
              />
              {formErrors.firstname && <p>{formErrors.firstname}</p>}
            </div>

            <div className="grid grid-cols-8 justify-items-stretch w-auto">
              <div className="col-span-2">Adresse mail</div>
              <input
                type="email"
                name="mail"
                onChange={modeEdit ? (e) => mailChange(e) : null}
                value={formValues.mail}
                readOnly={!modeEdit}
                className=" col-start-3 col-span-6 bg-white m-2 p-2 rounded-md text-center border-2 border-blue-300"
                placeholder="@"
              />
              {formErrors.mail && <p>{formErrors.mail}</p>}
            </div>

            <div className="flex justify-end">
              <div>Tél.</div>
              <input
                type="text"
                name="phone"
                onChange={modeEdit ? (e) => telChange(e) : null}
                value={formValues.phone}
                readOnly={!modeEdit}
                className="col-start-1 bg-white m-2 p-2 rounded-md text-center border-2 border-blue-300"
                placeholder="03 xx xx xx xx"
              />
              {formErrors.phone && <p>{formErrors.phone}</p>}
              <div>Port.</div>
              <input
                type="text"
                name="cellphone"
                onChange={modeEdit ? (e) => telChange(e) : null}
                value={formValues.cellphone}
                readOnly={!modeEdit}
                className="col-start-2 bg-white m-2 p-2 rounded-md text-center border-2 border-blue-300"
                placeholder="06 xx xx xx xx"
              />
              {formErrors.cellphone && <p>{formErrors.cellphone}</p>}
            </div>


            <div className="flex justify-center">Adresse postale</div>
            <div className="flex justify-end">
              <div>N°</div>
              <input
                type="text"
                name="streetNumber"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.streetNumber}
                readOnly={!modeEdit}
                className="bg-white m-2 p-2 rounded-md text-left border-2 border-blue-300"
                placeholder="N°"
              />
              {formErrors.streetNumber && <p>{formErrors.streetNumber}</p>}
              <div>Voie</div>
              <input
                type="text"
                name="streetName"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.streetName}
                readOnly={!modeEdit}
                className="bg-white m-2 p-2 rounded-md text-left border-2 border-blue-300"
                placeholder="Rue"
              />
              {formErrors.streetName && <p>{formErrors.streetName}</p>}
            </div>
            <div className="flex justify-end">
              <div>Ville</div>
              <input
                type="text"
                name="city"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.city}
                readOnly={!modeEdit}
                className="bg-white m-2 p-2 rounded-md text-left border-2 border-blue-300"
                placeholder="Ville"
              />
              {formErrors.city && <p>{formErrors.city}</p>}
              <div>Code postal</div>
              <input
                type="text"
                name="zipCode"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.zipCode}
                readOnly={!modeEdit}
                className="bg-white m-2 p-2 rounded-md text-left border-2 border-blue-300"
                placeholder="CP"
              />
            </div>
            {formErrors.zipCode && <p>{formErrors.zipCode}</p>}

            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center">Informations complémentaires</div>
              <textarea
                type="text"
                name="description"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.description}
                readOnly={!modeEdit}
                className="infoArea bg-white m-2 p-2 rounded-md text-start border-2 border-blue-300"
                placeholder="Informations complémentaires"
              />
            </div>
            <div className="flex justify-between">
              {clientTypes && (
                <select
                  readOnly={!modeEdit}
                  name="client_type_id"
                  className="row-start-2 bg-white m-2 p-2 rounded-md text-center border-2 border-blue-300"
                  value={formValues.client_type_id}
                  onChange={modeEdit ? (e) => handleChange(e) : null}
                >
                  {clientTypes.map((clientType) => {
                    return (
                      <option key={clientType.id} value={clientType.id}>
                        {clientType.value}
                      </option>
                    );
                  })}
                </select>
              )}
              {formErrors.client_type_id && <p>{formErrors.client_type_id}</p>}
              {currentUser &&
                (currentUser.user_type.value === "admin" ||
                  currentUser.user_type.value === "secrétaire" ||
                  currentUser.user_type.value === "manager") &&
                users && (
                  <select
                    readOnly={!modeEdit}
                    value={formValues.user_id}
                    className="row-start-2 bg-blue-100 m-2 p-2 text-center border-2 border-blue-300"
                    name="user_id"
                    onChange={modeEdit ? (e) => handleChange(e) : null}
                  >
                    {users.map((user) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.firstname} {user.lastname}
                        </option>
                      );
                    })}
                  </select>
                )}
              {formErrors.user_id && <p>{formErrors.user_id}</p>}
            </div>
            {
              clientId ?
              (<div>
                {modeEdit ? (
                  <input
                    type="submit"
                    value="enregistrer"
                    className="m-auto mt-5 text-white uppercase bg-blue-300 hover:bg-blue-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
                  />
                ) : (
                  <button
                    onClick={() => setModeEdit(!modeEdit)}
                    type="button"
                    className="m-auto mt-5 text-white bg-yellow-200 hover:bg-yellow-400 uppercase font-bold p-2 pt-2 pb-2 mx-2 rounded-xl">
                    Modifier
                  </button>
                )}
              </div>)
            : (
              <input
                    type="submit"
                    value="Créer"
                    className="m-auto mt-5 text-white uppercase bg-blue-300 hover:bg-blue-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
              />
            )}
          </form>
        </div>

      </div>
    </div>
  );
}

export default ClientForm;
