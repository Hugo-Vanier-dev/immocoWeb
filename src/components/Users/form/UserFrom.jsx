import React from "react";
import { Redirect, Link } from "react-router-dom";
import { UseUserContext } from "../../../context/userContext";
import UserService from "../../../services/user.service";
import UserTypeService from "../../../services/userType.service"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

function UserForm({ UserId = null, modeEdit = false }) {
  const mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const telRegex = /^\d{2}(\s\d{2}){4}$/;

  const [redirectUserListe, setRedirectUserListe] = React.useState(false);
  const [redirectInfoUser, setredirectInfoUser] = React.useState(false);

  const currentUser = UseUserContext();
  const [users, setUsers] = React.useState(null);
  const [UserTypes, setUserTypes] = React.useState(null);

  const [formErrors, setFormErrors] = React.useState({
    firstname: null,
    lastname: null,
    phone: null,
    cellphone: null,
    username: null,
    mail: null,
    User_type_id: null,
  });

  const [formValues, setFormValues] = React.useState({
    firstname: "",
    lastname: "",
    phone: "",
    cellphone: "",
    username: "",
    mail: "",
    User_type_id: 1,
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
      if (UserId) {
        UserService.update(UserId, data).then((res) => {
          modeEdit = false;
          toast.info("Le User a bien été modifié.", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
          });
          setredirectInfoUser(true);
        });
      } else {
        UserService.create(data).then((res) => {
          toast.info("Le User a bien été créé.", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
          });
          console.log(formValues)
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
    UserTypeService.getAll().then((UserTypesRes) => {
      setUserTypes(UserTypesRes.data);
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
    if (UserId) {
      UserService.get(UserId).then((res) => {
        setFormValues(res.data);
      });
    }
  }, [
    setUsers,
    setUserTypes,
    setFormValues,
    currentUser,
    UserId
  ]);

  if (redirectUserListe) {
    return <Redirect to="/home" />;
  }
  if(redirectInfoUser){
    return <Redirect to={`/readUser/${UserId}`} />
  }
  return (
    <div>
      <form onSubmit={(e) => submitForm(e)}>
        <input
          type="text"
          name="firstname"
          onChange={modeEdit ? (e) => textChange(e) : null}
          value={formValues.firstname}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="Jean"
        />
        {formErrors.firstname && <p>{formErrors.firstname}</p>}
        <input
          type="text"
          name="lastname"
          onChange={modeEdit ? (e) => textChange(e) : null}
          value={formValues.lastname}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="Dupont"
        />
        {formErrors.lastname && <p>{formErrors.lastname}</p>}
        <input
          type="email"
          name="mail"
          onChange={modeEdit ? (e) => mailChange(e) : null}
          value={formValues.mail}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="@"
        />
        <input
          type="text"
          name="username"
          onChange={modeEdit ? (e) => textChange(e) : null}
          value={formValues.username}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="Pseudo"
        />
        {formErrors.mail && <p>{formErrors.mail}</p>}
        <input
          type="text"
          name="phone"
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
          onChange={modeEdit ? (e) => telChange(e) : null}
          value={formValues.cellphone}
          readOnly={!modeEdit}
          className="grid row-start-2 border-2 border-white bg-gray-300 m-2 p-2 rounded-md text-center"
          placeholder="06 xx xx xx xx"
        />
        {formErrors.cellphone && <p>{formErrors.cellphone}</p>}
        {UserTypes && (
          <select
            readOnly={!modeEdit}
            name="User_type_id"
            value={formValues.User_type_id}
            onChange={modeEdit ? (e) => handleChange(e) : null}
          >
            {UserTypes.map((UserType) => {
              return (
                <option key={UserType.id} value={UserType.id}>
                  {UserType.value}
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
          <Link to={`/updateUser/${UserId}`} >
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
