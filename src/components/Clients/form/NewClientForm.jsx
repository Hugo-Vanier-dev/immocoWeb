import React from "react";
import ClientService from "../../../shared/services/client.service";
import ClientTypeService from "../../../shared/services/clientType.service";
import { Redirect } from "react-router-dom";
import { UseUserContext } from "../../../shared/context/userContext";
import UserService from "../../../shared/services/user.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

function NewClientForm({ clientId = null, edit = false }) {
  const mailregex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
          setModeEdit(false);
          toast.info("Le client a été mis-à-jour.", {
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
        console.log("coucou");
        ClientService.create(data).then((res) => {
          toast.info("Le client a été créé.", {
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
  }, [setUsers, setClientTypes, setFormValues, currentUser, clientId]);

  if (redirectClientListe) {
    return <Redirect to="/home" />;
  }
  if (redirectInfoClient) {
    return <Redirect to={`/readClient/${clientId}`} />;
  }
  return (
    <div>
      <div className="py-2 mx-2 text-blue-300 font-black">Nouveau client</div>
      <div className="m-2 p-2 border-2 border-blue-100 bg-blue-100 rounded-xl">

        <form onSubmit={(e) => submitForm(e)} className="grid grid-cols-2 gap-2 grid-rows-1">
          <div className="col-span-1 col-start-1">

            <div className="flex justify-end transform translate-x-6 transform translate-y-6">
              Prénom
              <input
                type="text"
                name="firstname"
                onChange={modeEdit ? (e) => textChange(e) : null}
                value={formValues.firstname}
                readOnly={!modeEdit}
                className="m-2 p-2 rounded-md text-center"
                placeholder="Prénom"
              />
              {formErrors.firstname && <p>{formErrors.firstname}</p>}
            </div>
              
            <div className="flex justify-end transform translate-x-6 transform translate-y-6">
              Nom
              <input
                type="text"
                name="lastname"
                onChange={modeEdit ? (e) => textChange(e) : null}
                value={formValues.lastname}
                readOnly={!modeEdit}
                className="m-2 p-2 rounded-md text-center"
                placeholder="Nom"
              />
              {formErrors.lastname && <p>{formErrors.lastname}</p>}
            </div>

            <div className="flex justify-end transform translate-x-6 transform translate-y-6">
              Mail
              <input
                type="email"
                name="mail"
                onChange={modeEdit ? (e) => mailChange(e) : null}
                value={formValues.mail}
                readOnly={!modeEdit}
                className="bg-white m-2 p-2 rounded-md text-center"
                placeholder="@"
              />
              {formErrors.mail && <p>{formErrors.mail}</p>}
            </div>

            <div className="flex justify-end transform translate-x-6 transform translate-y-6">
              Port.
              <input
                type="text"
                name="cellphone"
                onChange={modeEdit ? (e) => telChange(e) : null}
                value={formValues.cellphone}
                readOnly={!modeEdit}
                className="bg-white m-2 p-2 rounded-md text-center"
                placeholder="06 xx xx xx xx"
              />
              {formErrors.cellphone && <p>{formErrors.cellphone}</p>}
            </div>
            
            <div className="flex justify-end transform translate-x-6 transform translate-y-6">
              {clientTypes && (
                <select
                  readOnly={!modeEdit}
                  name="client_type_id"
                  className="bg-white m-2 p-2 rounded-md text-center"
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
                    className="bg-blue-100 m-2 p-2 text-center"
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
          </div>

            <div className="col-start-2 col-span-1">
              Informations
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
        </form>
      </div>
    </div>
  );
}

export default NewClientForm;
