import React from "react";
import PropertyService from "../../../shared/services/property.service";
import PropertyTypeService from "../../../shared/services/propertyType.service";
import { Link } from "react-router-dom";
import { UseUserContext } from "../../../shared/context/userContext";
import UserService from "../../../shared/services/user.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./PropertyForm.css";

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
    address: null,
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
    level: null,
    doorNumber: null,
    garden: null,
    garage: null,
    cellar: null,
    attic: null,
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
    price: "",
    label: "",
    description: "",
    longitude: "",
    latitude: "",
    city: "",
    address: "",
    zipcode: "",
    livingArea: "",
    area: "",
    gardenArea: "",
    floorNumber: "",
    piecesNumber: "",
    bedroomNumber: "",
    bathroomNumber: "",
    wcNumber: "",
    buildingNumber: "",
    level: "",
    doorNumber: "",
    garden: "",
    garage: "",
    cellar: "",
    attic: "",
    parking: "",
    opticalFiber: "",
    swimmingPool: "",
    balcony: "",
    archive: "",
    client_Id: 1,
    property_type_id: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
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
          toast.info("Le bien est ajouté.", {
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
  }, [setUsers, setFormValues, currentUser, propertyId]);

  return (
    <div className="porpertyFormContainer">
      <div className="py-2 mx-2 text-gray-50">
        <div className="py-2 mx-2 text-blue-300 font-black">
          Informations sur la propriété
        </div>
        <div className="pt-2 pb-8 mx-2 text-gray-800 bg-blue-100 rounded-md">
          <form onSubmit={(e) => submitForm(e)}>
            <input
              type="text"
              name="price"
              onChange={modeEdit ? (e) => textChange(e) : null}
              value={formValues.firstname}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Prix"
            />
            <input
              type="text"
              name="label"
              onChange={modeEdit ? (e) => textChange(e) : null}
              value={formValues.firstname}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Type de logement"
            />
            <input
              type="text"
              name="longitude"
              onChange={modeEdit ? (e) => textChange(e) : null}
              value={formValues.firstname}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Longitude"
            />
            <input
              type="text"
              name="latitude"
              onChange={modeEdit ? (e) => textChange(e) : null}
              value={formValues.firstname}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Latitude"
            />
            <input
              type="text"
              name="address"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.streetName}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Adresse"
            />
            <input
              type="text"
              name="city"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.city}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Ville"
            />
            <input
              type="text"
              name="zipcode"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.zipcode}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Code postal"
            />
            <input
              type="text"
              name="area"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.area}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Superficie totale"
            />
            <input
              type="text"
              name="livingArea"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.livingArea}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Surface habitable"
            />
            <div id="lineSize" className="mx-auto rounded-md">
              <div className="mx-auto text-center">
                <p className="font-semibold text-gray-500">
                  Jardin
                  <input
                    type="checkbox"
                    name="garden"
                    id="checkboxId"
                    onChange={modeEdit ? (e) => handleChange(e) : null}
                    value={formValues.garden}
                    readOnly={!modeEdit}
                    className="mx-5"
                  />
                  <input
                    type="text"
                    name="gardenArea"
                    onChange={modeEdit ? (e) => handleChange(e) : null}
                    value={formValues.gardenArea}
                    readOnly={!modeEdit}
                    className=" m-4 p-2 rounded-md text-center"
                    placeholder="Superficie du jardin"
                  />
                  m²
                </p>
              </div>
            </div>
            <div id="lineSize" className="mx-auto rounded-md">
            <p className="font-semibold text-gray-500">
                <input
                  type="text"
                  name="floorNumber"
                  onChange={modeEdit ? (e) => handleChange(e) : null}
                  value={formValues.floorNumber}
                  readOnly={!modeEdit}
                  className=" m-3 p-2 rounded-md text-center"
                  placeholder="Nombre d'étages"
                />
                étage(s)
              </p>
            </div>
            
            <div>
            <p className="font-semibold text-gray-500">
                Appartement n°
                <input
                  type="text"
                  name="doorNumber"
                  onChange={modeEdit ? (e) => handleChange(e) : null}
                  value={formValues.doorNumber}
                  readOnly={!modeEdit}
                  className=" m-3 p-2 rounded-md text-center"
                  placeholder="Numéro d'appartement"
                />
              </p>
            </div>
            <div id="lineSize" className="mx-auto rounded-md">
            <p className="font-semibold text-gray-500">
              <input
                type="text"
                name="bedroomNumber"
                onChange={modeEdit ? (e) => handleChange(e) : null}
                value={formValues.bedroomNumber}
                readOnly={!modeEdit}
                className=" m-3 p-2 rounded-md text-center"
                placeholder="Nombre de chambre"
              />
              chambre(s)
              </p>
            </div>
            <input
              type="text"
              name="buildingNumber"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.buildingNumber}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Jardin"
            />
            <input
              type="text"
              name="level"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.level}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Palier"
            />
            <input
              type="text"
              name="garage"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.garage}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Stationnement"
            />
            <input
              type="text"
              name="cellar"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.cellar}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Cave"
            />
            <input
              type="text"
              name="attic"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.attic}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Grenier"
            />
            <input
              type="text"
              name="parking"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.parking}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Stationnement extérieur"
            />
            <input
              type="text"
              name="opticalFiber"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.zipCode}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Internet"
            />
            <input
              type="text"
              name="swimmingPool"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.opticalFiber}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Piscine"
            />
            <input
              type="text"
              name="balcony"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.balcony}
              readOnly={!modeEdit}
              className=" m-1 p-2 rounded-md text-center"
              placeholder="Balcon"
            />
            <textarea
              type="text"
              name="description"
              onChange={modeEdit ? (e) => handleChange(e) : null}
              value={formValues.description}
              readOnly={!modeEdit}
              className="propertyInfoArea m-1 p-2 rounded-md text-center"
              placeholder="Informations complémentaires"
            />
            <div>
              {propertyTypes && (
                <select
                  readOnly={!modeEdit}
                  name="property_type_id"
                  className="m-1 p-2 rounded-md text-center"
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
              {formErrors.property_type_id && (
                <p>{formErrors.property_type_id}</p>
              )}
              {currentUser &&
                (currentUser.user_type.value === "admin" ||
                  currentUser.user_type.value === "secrétaire" ||
                  currentUser.user_type.value === "manager") &&
                users && (
                  <select
                    readOnly={!modeEdit}
                    value={formValues.user_id}
                    className="row-start-2 bg-blue-100 m-2 p-2 text-start"
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
                  className="m-auto mt-3 text-white uppercase bg-blue-300 hover:bg-blue-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl shadow "
                />
              ) : (
                <Link to={`/updateProperty/${propertyId}`}>
                  <input
                    type="button"
                    value="Modifier"
                    className="m-auto mt-3 text-white bg-blue-300 hover:bg-blue-600 uppercase font-bold p-2 pt-2 pb-2 mx-2 rounded-xl shadow "
                  />
                </Link>
              )}
              <input
                type="submit"
                /*onClick={#.goBack}*/
                value="Annuler"
                className="m-auto mt-3 text-white uppercase bg-red-300 hover:bg-red-600 font-bold p-2 pt-2 pb-2 mx-2 rounded-xl shadow "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PropertyForm;
