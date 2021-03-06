import React from "react";
import ClientService from "../../../shared/services/client.service";
import ClientTypeService from "../../../shared/services/clientType.service";
import { Redirect } from "react-router-dom";
import { UseUserContext } from "../../../shared/context/userContext";
import UserService from "../../../shared/services/user.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import './ClientForm.css';

toast.configure();

function ClientForm({ clientId = null, edit = false }) {
  const mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const telRegex = /^\d{2}(\s\d{2}){4}$/;

  const [redirectClientListe, setRedirectClientListe] = React.useState(false);
  const [redirectInfoClient, setredirectInfoClient] = React.useState(false);

  const currentUser = UseUserContext();
  const [users, setUsers] = React.useState(null);
  const [clientTypes, setClientTypes] = React.useState(null);

  const [modeEdit, setModeEdit] = React.useState(edit);



console.log(clientId);

  const [formErrors, setFormErrors] = React.useState({
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

  const [formValues, setFormValues] = React.useState({
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
          modeEdit = false;
          toast.info("Le client a bien été modifié.", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
          });
          setredirectInfoClient(true);
        });
      } else {
        console.log('coucou');
        ClientService.create(data).then((res) => {
          toast.info("Le client a bien été créé.", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
          });
          setRedirectClientListe(true);
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

  React.useEffect(() => {
    ClientTypeService.getAll().then((clientTypesRes) => {
      setClientTypes(clientTypesRes.data);
    });
    if (currentUser) {
      console.log(currentUser.user_type.value);
      if (
        currentUser.user_type.value === "admin" ||
        currentUser.user_type.value === "secrétaire" ||
        currentUser.user_type.value === "manager"
      ) {
        UserService.getAll().then((usersRes) => setUsers(usersRes.data));
      } else {
        setFormValues({ user_id: currentUser.id });
      }
    }
    if (clientId) {
      ClientService.get(clientId).then((res) => {
        setFormValues(res.data);
      });
    }
  }, [
    setUsers,
    setClientTypes,
    setFormValues,
    currentUser,
    clientId
  ]);

  if (redirectClientListe) {
    return <Redirect to="/home" />;
  }
  if (redirectInfoClient) {
    return <Redirect to={`/readClient/${clientId}`} />
  }
  return (
    <div className="">
      <div className="">
      <div className="py-2 mx-2 bg-gray-700 text-gray-50">Informations clients</div>

        <div className="grid grid-rows-1">
          <form onSubmit={(e) => submitForm(e)}>

            <div className="grid grid-cols-2 w-auto">
              <input
                type="text"
                name="firstname"
                onChange={modeEdit ? (e) => textChange(e) : null}
                value={formValues.firstname}
                readOnly={!modeEdit}
                className="col-start-1 bg-white m-2 p-2 rounded-md text-center"
                placeholder="Jean"
              />
              {formErrors.firstname && <p>{formErrors.firstname}</p>}
              <input
                type="text"
                name="lastname"
                onChange={modeEdit ? (e) => textChange(e) : null}
                value={formValues.lastname}
                readOnly={!modeEdit}
                className="col-start-2 bg-white m-2 p-2 rounded-md text-center"
                placeholder="Dupont"
              />
              {formErrors.lastname && <p>{formErrors.lastname}</p>}
            </div>

            <div className="grid grid-rows-1 w-auto">
              <input
                type="email"
                name="mail"
                onChange={modeEdit ? (e) => mailChange(e) : null}
                value={formValues.mail}
                readOnly={!modeEdit}
                className="row-start-2 bg-white m-2 p-2 rounded-md text-center"
                placeholder="@"
              />
              {formErrors.mail && <p>{formErrors.mail}</p>}
            </div>

            <div className="grid grid-cols-2 w-auto">
              <input
                type="text"
                name="phone"
                onChange={modeEdit ? (e) => telChange(e) : null}
                value={formValues.phone}
                readOnly={!modeEdit}
                className="col-start-1 bg-white m-2 p-2 rounded-md text-center"
                placeholder="03 xx xx xx xx"
              />
              {formErrors.phone && <p>{formErrors.phone}</p>}
              <input
                type="text"
                name="cellphone"
                onChange={modeEdit ? (e) => telChange(e) : null}
                value={formValues.cellphone}
                readOnly={!modeEdit}
                className="col-start-2 bg-white m-2 p-2 rounded-md text-center"
                placeholder="06 xx xx xx xx"
              />
              {formErrors.cellphone && <p>{formErrors.cellphone}</p>}
            </div>

            <div className="grid grid-cols-1 grid-rows-2 w-auto">
              <div className="flex flex-row">
                <input
                  type="text"
                  name="streetNumber"
                  onChange={modeEdit ? (e) => handleChange(e) : null}
                  value={formValues.streetNumber}
                  readOnly={!modeEdit}
                  className="row-start-1 w-1/6 bg-white m-2 p-2 rounded-md text-left"
                  placeholder="N°"
                />
                {formErrors.streetNumber && <p>{formErrors.streetNumber}</p>}
                <input
                  type="text"
                  name="streetName"
                  onChange={modeEdit ? (e) => handleChange(e) : null}
                  value={formValues.streetName}
                  readOnly={!modeEdit}
                  className="row-start-1 w-5/6 bg-white m-2 p-2 rounded-md text-left"
                  placeholder="rue"
                />
                {formErrors.streetName && <p>{formErrors.streetName}</p>}
              </div>
              <div className="flex flex-row">
                <input
                  type="text"
                  name="city"
                  onChange={modeEdit ? (e) => handleChange(e) : null}
                  value={formValues.city}
                  readOnly={!modeEdit}
                  className="row-start-1  w-4/6 bg-white m-2 p-2 rounded-md text-left"
                  placeholder="Ville"
                />
                {formErrors.city && <p>{formErrors.city}</p>}
                <input
                  type="text"
                  name="zipCode"
                  onChange={modeEdit ? (e) => handleChange(e) : null}
                  value={formValues.zipCode}
                  readOnly={!modeEdit}
                  className="row-start-1 w-2/6 bg-white m-2 p-2 rounded-md text-left"
                  placeholder="CP"
                />
              </div>
              {formErrors.zipCode && <p>{formErrors.zipCode}</p>}
            </div>
            <div className="grid grid-flow-col gap-4">
              <textarea
                type="text"
                name="description"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.description}
                readOnly={!modeEdit}
                className="infoArea bg-white m-2 p-2 rounded-md text-start"
                placeholder="Informations complémentaires"
              />
            </div>
            <div className="flex justify-between">
              {clientTypes && (
                <select
                  readOnly={!modeEdit}
                  name="client_type_id"
                  className="row-start-2 bg-white m-2 p-2 rounded-md text-center"
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
                    className="row-start-2 bg-blue-100 m-2 p-2 text-center"
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
            <div>
            {modeEdit ? (
              <input
                type="submit"
                value="enregistrer"
                className="m-auto mt-5 text-white uppercase bg-blue-300 hover:bg-blue-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
              />
            ) : (
                <input
                  onClick={() => setModeEdit(!modeEdit)}
                  type="button"
                  value="Modifier"
                  className="m-auto mt-5 text-white bg-blue-300 hover:bg-blue-600 uppercase font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
                />
            )}
            <input
                type="submit"
                value="Supprimer"
                className="m-auto mt-5 text-white uppercase bg-red-300 hover:bg-red-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl"
              />
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default ClientForm;
