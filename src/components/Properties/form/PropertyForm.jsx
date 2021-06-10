import React from "react";
import PropertyService from "../../../shared/services/property.service";
import PropertyTypeService from "../../../shared/services/propertyType.service";
import { Link } from "react-router-dom";
import { UseUserContext } from "../../../shared/context/userContext";
import UserService from "../../../shared/services/user.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import './PropertyForm.css';

toast.configure();

function PropertyForm({ propertyId = null, modeEdit = false }) {

  const currentUser = UseUserContext();
  const [users, setUsers] = React.useState(null);
  const [propertyTypes, setPropertyTypes] = React.useState(null);

console.log(propertyId);

  const [formErrors, setFormErrors] = React.useState({
    price: null,
    label: null,
    description: null,
    longitude: null,
    latitude: null,
    city: null,
    adress: null,
    zipcode: null,
    livingArea: null,
    area: null,
    gardenArea: null,
    floorNumber: null,
    piecesNumber: null,
    bedroomNumber: null,
    bathroomNumber: null,
    wcNumber: null,
    buildingNumber: null,
    bearing: null,
    doorNumber: null,
    garden: null,
    garage: null,
    cellar: null,
    atic: null,
    parking: null,
    opticalFiber: null,
    swimmingPool: null,
    balcony: null,
    archive: null,
    client_Id: null,
    property_type_id: null,
    created_at: null,
    updated_at: null,
    deleted_at: null,
  });

  const [formValues, setFormValues] = React.useState({
    price: '',
    label: '',
    description: '',
    longitude: '',
    latitude: '',
    city: '',
    adress: '',
    zipcode: '',
    livingArea: '',
    area: '',
    gardenArea: '',
    floorNumber: '',
    piecesNumber: '',
    bedroomNumber: '',
    bathroomNumber: '',
    wcNumber: '',
    buildingNumber: '',
    bearing: '',
    doorNumber: '',
    garden: '',
    garage: '',
    cellar: '',
    atic: '',
    parking: '',
    opticalFiber: '',
    swimmingPool: '',
    balcony: '',
    archive: '',
    client_Id: 1,
    property_type_id: '',
    created_at: '',
    updated_at: '',
    deleted_at: '',
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
      if (propertyId) {
        PropertyService.update(propertyId, data).then((res) => {
          modeEdit = false;
          toast.info("La fiche a bien été modifié.", {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
          });
        });
      } else {
        PropertyService.create(data).then((res) => {
          toast.info("Le bien a bien été créé.", {
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


  const textChange = (e) => {
    handleChange(e);
    if (e.target.value === "") {
      formErrors[e.target.name] = "Veuillez remplir ce champ.";
    } else {
      formErrors[e.target.name] = null;
    }
    setFormErrors({ ...formErrors });
  };

  React.useEffect(() => {
    PropertyTypeService.getAll().then((propertyTypesRes) => {
      setPropertyTypes(propertyTypesRes.data);
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
    if (propertyId) {
      PropertyService.get(propertyId).then((res) => {
        setFormValues(res.data);
      });
    }
  }, [
    setUsers,
    /*set0+++Types,*/
    setFormValues,
    currentUser,
    propertyId
  ]);

  return (
    <div className="grid grid-cols-3 gap-2">
        <div className="py-2 mx-2 text-gray-50">
          Informations Biens
        </div>
        <form onSubmit={(e) => submitForm(e)}>

              <input
                type="text"
                name="firstname"
                onChange={modeEdit ? (e) => textChange(e) : null}
                value={formValues.firstname}
                readOnly={!modeEdit}
                className="col-start-1 bg-white m-2 p-2 rounded-md text-center"
                placeholder="Jean"
              />
              <input
                type="text"
                name="streetNumber"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.streetNumber}
                readOnly={!modeEdit}
                className="row-start-1 w-1/6 bg-white m-2 p-2 rounded-md text-left"
                placeholder="N°"
              />
              <input
                type="text"
                name="streetName"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.streetName}
                readOnly={!modeEdit}
                className="row-start-1 w-5/6 bg-white m-2 p-2 rounded-md text-left"
                placeholder="rue"
              />
              <input
                type="text"
                name="city"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.city}
                readOnly={!modeEdit}
                className="row-start-1  w-4/6 bg-white m-2 p-2 rounded-md text-left"
                placeholder="Ville"
              />
              <input
                type="text"
                name="zipCode"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.zipCode}
                readOnly={!modeEdit}
                className="row-start-1 w-2/6 bg-white m-2 p-2 rounded-md text-left"
                placeholder="CP"
              />
              <textarea
                type="text"
                name="description"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.description}
                readOnly={!modeEdit}
                className="bg-white m-2 p-2 rounded-md text-start"
                placeholder="Informations complémentaires"
              />
          <div>
            {propertyTypes && (
              <select
                readOnly={!modeEdit}
                name="property_type_id"
                className="row-start-2 bg-white m-2 p-2 rounded-md text-center"
                value={formValues.property_type_id}
                onChange={modeEdit ? (e) => handleChange(e) : null}
              >
                {propertyTypes.map((propertyType) => {
                  return (
                    <option key={propertyType.id} value={propertyType.id}>
                      {propertyType.value}
                    </option>
                  );
                })}
              </select>
            )}
            {formErrors.property_type_id && <p>{formErrors.property_type_id}</p>}
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
            <input
                type="submit"
                value="Créer"
                className="m-auto mt-5 text-white uppercase bg-green-400 hover:bg-green-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl shadow "
              />
            {modeEdit ? (
              <input
                type="submit"
                value="enregistrer"
                className="m-auto mt-5 text-white uppercase bg-blue-300 hover:bg-blue-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl shadow "
              />
            ) : (
              <Link to={`/updateProperty/${propertyId}`} >
                <input
                  type="button"
                  value="Modifier"
                  className="m-auto mt-5 text-white bg-blue-300 hover:bg-blue-600 uppercase font-bold p-2 pt-2 pb-2 mx-2 rounded-xl shadow "
                />
              </Link>
            )}
            <input
                type="submit"
                value="Supprimer"
                className="m-auto mt-5 text-white uppercase bg-red-300 hover:bg-red-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl shadow "
              />
          </div>
        </form>
      </div>
  );
}

export default PropertyForm;
