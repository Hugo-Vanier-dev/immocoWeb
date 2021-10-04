import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { UseUserContext } from "../../../shared/context/userContext";
import Toggle from 'react-toggle'
import UserService from "../../../shared/services/user.service";
import UserTypeService from "../../../shared/services/userType.service"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

function UserForm({ userId = null, modeEdit = false }) {
  const mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const telRegex = /^\d{2}(\s\d{2}){4}$/;

  const [userTypes, setUserTypes] = React.useState(null);

  const [formErrors, setFormErrors] = React.useState({
    firstname: null,
    lastname: null,
    phone: null,
    cellphone: null,
    sexe: null,
    mail: null,
    user_type_id: null,
  });

  const [formValues, setFormValues] = React.useState({
    firstname: "",
    lastname: "",
    phone: "",
    cellphone: "",
    mail: "",
    sexe: 1,
    user_type_id: 1,
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
      if (userId) {
        UserService.update(userId, data).then((res) => {
          modeEdit = false;
          toast.info("L'utilisateur a bien été modifié.", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
          });
        });
      } else {
        UserService.create(data).then((res) => {
          toast.info("L'utilisateur a bien été créé.", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
          });
        });
      }
    }
  }

  const handleChange = (e) => {
    formValues[e.target.name] = e.target.value;
    setFormValues({ ...formValues });
  };

  const mailChangeError = (e) => {
    if (formValues[e.target.name] === "") {
      setFormErrors({ mail: "Veuillez remplir une adresse mail." });
    } else if (!mailregex.test(formValues[e.target.name])) {
      setFormErrors({
        mail: "L'adresse mail que vous avez rempli n'est pas au bon format.",
      });
    } else {
      setFormErrors({ mail: null });
    }
  }

  const textChangeTestError = (e) => {
    if(formValues[e.target.name] === ""){
      formErrors[e.target.name] = "Veuillez remplir ce champ."
    }else{
      formErrors[e.target.name] = null;
    }
    setFormErrors({ ...formErrors });
  }
  const telChangeError = (e) => {
    if (formValues[e.target.name] === "") {
      formErrors[e.target.name] = "Veuillez remplir ce champ.";
    } else if (!telRegex.test(formValues[e.target.name])) {
      formErrors[e.target.name] =
        "Le numéro de téléphone que vous avez remplis n'est pas valide ou pas français.";
    } else {
      formErrors[e.target.name] = null;
    }
    setFormErrors({ ...formErrors });
  }

  const telChange = (e) => {
    const value = e.target.value
      .replace(/\D+/, "")
      .replace(/^330?/, "0")
      .slice(0, 13)
      .replace(/(\d{2})(?=\d)/g, "$1 ");
    formValues[e.target.name] = value;
    setFormValues({ ...formValues });
  };

  useEffect(() => {
    UserTypeService.getAll().then((res) => {
      setUserTypes(res.data);
    })
  }, []);


  useEffect(() => {
    if (userId) {
      UserService.get(userId).then((res) => {
        setFormValues(res.data);
      });
    }
  }, [userId]);

  return (
    <div>
      <form onSubmit={(e) => submitForm(e)}>
        <input
          type="text"
          name="firstname"
          onBlur={modeEdit ? (e) => textChangeTestError(e) : null}
          onChange={modeEdit ? (e) => handleChange(e) : null}
          value={formValues.firstname}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="Jean"
        />
        {formErrors.firstname && <p>{formErrors.firstname}</p>}
        <input
          type="text"
          name="lastname"
          onBlur={modeEdit ? (e) => textChangeTestError(e) : null}
          onChange={modeEdit ? (e) => handleChange(e) : null}
          value={formValues.lastname}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="Dupont"
        />
        {formErrors.lastname && <p>{formErrors.lastname}</p>}
        <input
          type="email"
          name="mail"
          onBlur={modeEdit ? (e) => mailChangeError(e) : null}
          onChange={modeEdit ? (e) => handleChange(e) : null}
          value={formValues.mail}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="@"
        />
        {formErrors.mail && <p>{formErrors.mail}</p>}
        <select name="sexe" readOnly={!modeEdit} value={formValues.sexe} onChange={modeEdit ? (e) => handleChange(e) : null}>
          <option disabled selected={userId ? false : true}>Veuillez choisir votre sexe</option>
          <option value={true}>Homme</option>
          <option value={false}>Femme</option>
          <option value={null}>Autre</option>
        </select>
        
        <input
          type="text"
          name="phone"
          onBlur={modeEdit ? (e) => telChangeError(e) : null}
          onChange={modeEdit ? (e) => telChange(e) : null}
          value={formValues.phone}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="03 xx xx xx xx"
        />
        {formErrors.phone && <p>{formErrors.phone}</p>}
        <input
          type="text"
          name="cellphone"
          onBlur={modeEdit ? (e) => telChangeError(e) : null}
          onChange={modeEdit ? (e) => telChange(e) : null}
          value={formValues.cellphone}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="06 xx xx xx xx"
        />
        {formErrors.cellphone && <p>{formErrors.cellphone}</p>}
        {userTypes && (
          <select
            readOnly={!modeEdit}
            name="user_type_id"
            value={formValues.User_type_id}
            onChange={modeEdit ? (e) => handleChange(e) : null}
          >
            {userTypes.map((userType) => {
              return (
                <option key={userType.id} value={userType.id}>
                  {userType.value}
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
            className="LoginPageButton text-green-200 uppercase w-1/2 grid row-start-4 auto-cols-auto font-bold  p-2 pt-2 pb-2 rounded-2xl bg-green-400 border-2 border-green-200 shadow "
          />
        ) : (
          <Link to={`/updateUser/${userId}`} >
            <input
              type="button"
              value="Modifier"
              className="LoginPageButton text-green-200 uppercase w-1/2 grid row-start-4 auto-cols-auto font-bold  p-2 pt-2 pb-2 rounded-2xl bg-green-400 border-2 border-green-200 shadow "
            />
          </Link>
        )}
      </form>
    </div>
  );
}

export default UserForm;
