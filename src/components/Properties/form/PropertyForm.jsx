import React from "react";
import PropertyService from "../../../shared/services/property.service";
import PropertyTypeService from "../../../shared/services/propertyType.service";
import HeaterTypeService from "../../../shared/services/heaterType.service";
import ShutterTypeService from "../../../shared/services/shutterType.service";
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
  const [heaterTypes, setHeaterTypes] = React.useState(null);
  const [shutterTypes, setShutterTypes] = React.useState(null);

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
  };
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
    HeaterTypeService.getAll().then((heaterTypesRes) => { console.log(heaterTypesRes)
      setHeaterTypes(heaterTypesRes.data);
    });
    ShutterTypeService.getAll().then((shutterTypesRes) => { console.log(shutterTypesRes)
      setShutterTypes(shutterTypesRes.data);
    });
  },
  [
    setUsers,
    setFormValues,
    currentUser,
    propertyId,
  ]);

  return (
    <div id="porpertyFormContainer">
      <div className="">
        <div className="text-blue-400 font-black mx-2 py-2">
          Informations sur la propriété
        </div>
        <div>
          <form onSubmit={(e) => submitForm(e)}>
            <div id="propertyLabelId">
              <p>
                <input
                  type="text"
                  name="label"
                  onChange={modeEdit ? (e) => textChange(e) : ()=> {}}
                  value={formValues.firstname}
                  readOnly={!modeEdit}
                  placeholder="Intitulé de l'annonce"
                />
              </p>
            </div>
              <div id="propertyTypeId">
                <p>
                  Type de logement
                {propertyTypes && (
                  <select
                    readOnly={!modeEdit}
                    name="property_type_id"
                    value={formValues.property_type_id}
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
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
              </p>
              </div>
              <div id="priceOfPropertyId">
                <p>
                  Prix de vente
                  <input
                    type="text"
                    name="price"
                    onChange={modeEdit ? (e) => textChange(e) : ()=> {}}
                    value={formValues.firstname}
                    readOnly={!modeEdit}
                    placeholder="..."
                  />
                  €
                </p>
              </div>
              <div id="addressOfPropertyId">
                <p>
                  Adresse
                  <input
                    type="text"
                    name="address"
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                    value={formValues.streetName}
                    readOnly={!modeEdit}
                    placeholder="..."
                  />
                </p>
              </div>
              <div>
                <div id="cityOfPropertyId">
                  <p>
                    Ville
                    <input
                      type="text"
                      name="city"
                      onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                      value={formValues.city}
                      readOnly={!modeEdit}
                      placeholder="..."
                    />
                  </p>
                </div>
                <div id="zipcodeId">
                  <p>
                    Code postale
                    <input
                      type="text"
                      name="zipcode"
                      onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                      value={formValues.zipcode}
                      readOnly={!modeEdit}
                      placeholder="..."
                    />
                  </p>
                </div>
              </div>
              <div id="livingAreaId">
                <p>
                  Surface habitable
                  <input
                    type="text"
                    name="livingArea"
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                    value={formValues.livingArea}
                    readOnly={!modeEdit}
                    placeholder="Surface habitable"
                  />
                  m²
                </p>
              </div>
              <div id="nbOfBedroom">
                <p>
                  <input
                    type="text"
                    name="bedroomNumber"
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                    value={formValues.bedroomNumber}
                    readOnly={!modeEdit}
                    placeholder="Nombre de chambre(s)"
                  />
                  chambre(s)
                </p>
              </div>
              <div id="nbOfFloors">
                <p>
                  <input
                    type="text"
                    name="floorNumber"
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                    value={formValues.floorNumber}
                    readOnly={!modeEdit}
                    placeholder="Nombre d'étages"
                  />
                  étage(s)
                </p>
              </div>
            
            <div id="totalAreaId">
              <p>
                Taille du terrain
                <input
                  type="text"
                  name="area"
                  onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                  value={formValues.area}
                  readOnly={!modeEdit}
                  placeholder="Superficie totale"
                />
                m²
              </p>
            </div>
            
            <div id="gardenSelectorId">
              <div className="mx-auto text-center">
                <p>
                  <input
                    type="checkbox"
                    name="garden"
                    id="checkboxId"
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                    value={formValues.garden}
                    readOnly={!modeEdit}
                    className="mx-2"
                  />
                  Jardin
                  <input
                    type="text"
                    name="gardenArea"
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                    value={formValues.gardenArea}
                    readOnly={!modeEdit}
                    placeholder="Superficie du jardin"
                  />
                  m²
                </p>
              </div>
            </div>
            
            <div id="apptNumber">
              <p>
                Appartement n°
                <input
                  type="text"
                  name="doorNumber"
                  onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                  value={formValues.doorNumber}
                  readOnly={!modeEdit}
                  placeholder="..."
                />
              </p>
            </div>
            
            <div id="buildingNumberId">
              <p>Bât.
                <input
                  type="text"
                  name="buildingNumber"
                  onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                  value={formValues.buildingNumber}
                  readOnly={!modeEdit}
                  placeholder="..."
                />
              </p>
            </div>
            
            <div id="levelNumberId">
              <p>Palier
                <input
                  type="text"
                  name="level"
                  onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                  value={formValues.level}
                  readOnly={!modeEdit}
                  placeholder="..."
                />
              </p>
            </div>
            
            <div id="heaterSelectId">
              <p>
                Type de chauffage
                {heaterTypes && (
                  <select
                    readOnly={!modeEdit}
                    name="heater_type_id"
                    value={formValues.heater_type_id}
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                  >
                    {heaterTypes.map((heaterType) => {
                      return (
                        <option key={heaterType.id} value={heaterType.id}>
                          {heaterType.value}
                        </option>
                      );
                    })}
                  </select>
                )}
                {formErrors.heater_type_id && (
                  <p>{formErrors.heater_type_id}</p>
                )}
              </p>
            </div>
            
            <div id="shutterSelectId" className="">
              <p>
                Type de volets
                {shutterTypes && (
                  <select
                    readOnly={!modeEdit}
                    name="shutter_type_id"
                    value={formValues.shutter_type_id}
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                  >
                    {shutterTypes.map((shutterType) => {
                      return (
                        <option key={shutterType.id} value={shutterType.id}>
                          {shutterType.value}
                        </option>
                      );
                    })}
                  </select>
                )}
                {formErrors.shutter_type_id && (
                  <p>{formErrors.shutter_type_id}</p>
                )}
              </p>
            </div>
            
            <div id="checkboxesSelectorsId">
              <div>
                <div id="cellarId" className="lineSize mx-auto">
                  <p>
                    Cave
                    <input
                      type="checkbox"
                      name="cellar"
                      id="checkboxLeft"
                      onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                      value={formValues.cellar}
                      readOnly={!modeEdit}
                    />
                  </p>
                </div>
                <div id="atticId">
                  <p>
                    Grenier
                    <input
                      type="checkbox"
                      name="attic"
                      id="checkboxLeft"
                      onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                      value={formValues.attic}
                      readOnly={!modeEdit}
                    />
                  </p>
                </div>
                <div id="parkingId">
                <div className="mx-auto text-center">
                  <p>
                    Parking
                    <input
                      type="checkbox"
                      name="parking"
                      id="checkboxLeft"
                      onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                      value={formValues.parking}
                      readOnly={!modeEdit}
                    />
                  </p>
                </div>
              </div>
              </div>
              <div className="">
                <div id="internetId">
                  <p>
                    Internet la Fibre
                    <input
                      type="checkbox"
                      name="opticalFiber"
                      id="checkboxRight"
                      onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                      value={formValues.opticalFiber}
                      readOnly={!modeEdit}
                    />
                  </p>
                </div>
                <div id="poolId">
                  <p>
                    Piscine
                    <input
                     type="checkbox"
                      name="swimmingPool"
                      id="checkboxRight"
                      onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                      value={formValues.swimmingPool}
                      readOnly={!modeEdit}
                    />
                  </p>
                </div>
                <div id="balconyId">
                  <p>
                    Balcon
                    <input
                      type="checkbox"
                      name="balcony"
                      id="checkboxRight"
                      onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                      value={formValues.balcony}
                      readOnly={!modeEdit}
                    />
                  </p>
                </div>
              </div>
            </div>
            
            <div id="moreInformations">
              <textarea
                type="text"
                name="description"
                onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
                value={formValues.description}
                readOnly={!modeEdit}
                className="propertyInfoArea"
                placeholder="Informations complémentaires"
              />
            </div>
            
            <div id="gpsCoordId">
              <div >Coordonnées GPS</div>
              <div>
                <div id="gpsCoordTextId">
                  Long.
                    <input
                      type="text"
                      name="longitude"
                      onChange={modeEdit ? (e) => textChange(e) : ()=> {}}
                      value={formValues.firstname}
                      readOnly={!modeEdit}
                      placeholder="Longitude"
                    />
                    °
                  </div>
                  <div>
                    Lat.
                    <input
                      type="text"
                      name="latitude"
                      onChange={modeEdit ? (e) => textChange(e) : ()=> {}}
                      value={formValues.firstname}
                      readOnly={!modeEdit}
                      placeholder="Latitude"
                    />
                    °
                  </div>
              </div>
            </div>

            <div id="userSelector">
              {currentUser &&
                (currentUser.user_type.value === "admin" ||
                  currentUser.user_type.value === "secrétaire" ||
                  currentUser.user_type.value === "manager") &&
                users && (
                  <select
                    readOnly={!modeEdit}
                    value={formValues.user_id}
                    name="user_id"
                    onChange={modeEdit ? (e) => handleChange(e) : ()=> {}}
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
            <div id="validationBtns">
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
