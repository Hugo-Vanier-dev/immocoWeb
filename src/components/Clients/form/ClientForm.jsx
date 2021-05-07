import React from "react";
import ClientService from "../../../shared/services/client.service";
import ClientTypeService from "../../../shared/services/clientType.service";
import { Redirect, Link } from "react-router-dom";
import { UseUserContext } from "../../../shared/context/userContext";
import UserService from "../../../shared/services/user.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

function ClientForm({ clientId = null, modeEdit = false }) {
  const mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const telRegex = /^\d{2}(\s\d{2}){4}$/;

  const [redirectClientListe, setRedirectClientListe] = React.useState(false);
  const [redirectInfoClient, setredirectInfoClient] = React.useState(false);

  const currentUser = UseUserContext();
  const [users, setUsers] = React.useState(null);
  const [clientTypes, setClientTypes] = React.useState(null);

  const [formErrors, setFormErrors] = React.useState({
    firstname: null,
    lastname: null,
    phone: null,
    cellphone: null,
    mail: null,
    client_type_id: null,
    user_id: null,
  });

  const [formValues, setFormValues] = React.useState({
    firstname: "",
    lastname: "",
    phone: "",
    cellphone: "",
    mail: "",
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
      if (
        currentUser.role === "admin" ||
        currentUser.role === "secrétaire" ||
        currentUser.role === "manager"
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
  if(redirectInfoClient){
    return <Redirect to={`/readClient/${clientId}`} />
  }
  return (
    <div className="flex justify-evenly m-4 w-auto">
      <div className="my-10 py-10 shadow-md bg-opacity-50 bg-white border-solid border-white border-4 rounded-xl ">

          <div className="grid grid-rows-1">
            <form onSubmit={(e) => submitForm(e)}>

              <div className="grid grid-cols-2 w-auto">
                <input
                  type="text"
                  name="firstname"
                  onChange={modeEdit ? (e) => textChange(e) : null}
                  value={formValues.firstname}
                  readOnly={!modeEdit}
                  className="col-start-1 border-2 border-white bg-green-100 m-2 p-2 rounded-md text-center"
                  placeholder="Jean"
                />
                {formErrors.firstname && <p>{formErrors.firstname}</p>}
                <input
                  type="text"
                  name="lastname"
                  onChange={modeEdit ? (e) => textChange(e) : null}
                  value={formValues.lastname}
                  readOnly={!modeEdit}
                  className="col-start-2 border-2 border-white bg-green-100 m-2 p-2 rounded-md text-center"
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
                  className="row-start-2 border-2 border-white bg-green-100 m-2 p-2 rounded-md text-center"
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
                  className="col-start-1 border-2 border-white bg-green-100 m-2 p-2 rounded-md text-center"
                  placeholder="03 xx xx xx xx"
                />
                {formErrors.phone && <p>{formErrors.phone}</p>}
                <input
                  type="text"
                  name="cellphone"
                  onChange={modeEdit ? (e) => telChange(e) : null}
                  value={formValues.cellphone}
                  readOnly={!modeEdit}
                  className="col-start-2 border-2 border-white bg-green-100 m-2 p-2 rounded-md text-center"
                  placeholder="06 xx xx xx xx"
                />
                {formErrors.cellphone && <p>{formErrors.cellphone}</p>}
              </div>

              <div className="grid grid-cols-1 grid-rows-3 w-auto">
                <div className="flex flex-row">
                  <input
                    type="text"
                    name="streetNumber"
                    onChange={modeEdit ? (e) => telChange(e) : null}
                    value={formValues.streetNumber}
                    readOnly={!modeEdit}
                    className="row-start-1 border-2 w-1/6 border-white bg-green-100 m-2 p-2 rounded-md text-left"
                    placeholder="N°"
                  />
                  {formErrors.streetNumber && <p>{formErrors.streetNumber}</p>}
                  <input
                    type="text"
                    name="streetName"
                    onChange={modeEdit ? (e) => telChange(e) : null}
                    value={formValues.streetName}
                    readOnly={!modeEdit}
                    className="row-start-1 w-5/6 border-2 border-white bg-green-100 m-2 p-2 rounded-md text-left"
                    placeholder="rue"
                  />
                  {formErrors.streetName && <p>{formErrors.streetName}</p>}
                </div>
                <input
                  type="text"
                  name="address"
                  onChange={modeEdit ? (e) => telChange(e) : null}
                  value={formValues.address}
                  readOnly={!modeEdit}
                  className="row-start-2 border-2 border-white bg-green-100 m-2 p-2 rounded-md text-left"
                  placeholder="bâtiment/lotissement"
                />
                {formErrors.address && <p>{formErrors.address}</p>}
                <div className="flex flex-row">
                    <input
                      type="text"
                      name="city"
                      onChange={modeEdit ? (e) => telChange(e) : null}
                      value={formValues.city}
                      readOnly={!modeEdit}
                      className="row-start-1 border-2 w-4/6 border-white bg-green-100 m-2 p-2 rounded-md text-left"
                      placeholder="Ville"
                    />
                    {formErrors.city && <p>{formErrors.city}</p>}
                    <input
                      type="text"
                      name="zipCode"
                      onChange={modeEdit ? (e) => telChange(e) : null}
                      value={formValues.zipCode}
                      readOnly={!modeEdit}
                      className="row-start-1 w-2/6 border-2 border-white bg-green-100 m-2 p-2 rounded-md text-left"
                      placeholder="CP"
                    />
                  </div>
                {formErrors.zipCode && <p>{formErrors.zipCode}</p>}
              </div>
              
              <div className="grid grid-row-4 grid-flow-col gap-4">
                <textarea
                  type="text"
                  name="informations"
                  onChange={modeEdit ? (e) => mailChange(e) : null}
                  value={formValues.informations}
                  readOnly={!modeEdit}
                  className="row-span-4 border-2 border-white bg-green-100 m-2 p-2 rounded-md text-start"
                  placeholder="Informations"
                />
              </div>

              {clientTypes && (
                <select
                  readOnly={!modeEdit}
                  name="client_type_id"
                  className="row-start-2 border-2 border-white bg-green-100 m-2 p-2 text-gray-400 rounded-md text-center"

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
                (currentUser.role === "admin" ||
                  currentUser.role === "secrétaire" ||
                  currentUser.role === "manager") &&
                users && (
                  <select
                    readOnly={!modeEdit}
                    value={formValues.user_id}
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
              {modeEdit ? (
                <input
                  type="submit"
                  value="enregistrer"
                  className="text-green-200 uppercase w-auto hover:border-blue-200 hover:bg-green-300 hover:text-green-700 auto-cols-auto font-bold  p-2 pt-2 pb-2 rounded-2xl bg-green-400 border-2 border-green-200 shadow "
                />
              ) : (
                <Link to={`/updateClient/${clientId}`} >
                  <input
                    type="button"
                    value="Modifier"
                    className="text-green-100 uppercase w-auto auto-cols-auto font-bold  p-2 pt-2 pb-2 rounded-2xl hover:border-blue-200 hover:bg-green-300 hover:text-green-700 bg-green-400 border-2 border-green-200 shadow "
                  />
                </Link>
              )}
            </form>
          </div>
          
      </div>
    </div>
  );
}

export default ClientForm;
