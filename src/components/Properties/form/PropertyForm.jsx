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

function PropertyForm({ propertyId = null, edit = false }) {
  const currentUser = UseUserContext();
  const [users, setUsers] = React.useState(null);
  const [propertyTypes, setPropertyTypes] = React.useState(null);
  const [modeEdit, setModeEdit] = React.useState(edit);
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
  }
  const handleChange = (e) => {
    console.log("coucou gautier");
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
    HeaterTypeService.getAll().then((heaterTypesRes) => {
      console.log(heaterTypesRes);
      setHeaterTypes(heaterTypesRes.data);
    });
    ShutterTypeService.getAll().then((shutterTypesRes) => {
      console.log(shutterTypesRes);
      setShutterTypes(shutterTypesRes.data);
    });
  }, [setUsers, setFormValues, currentUser, propertyId]);

  return (
    <div id="porpertyFormContainer">
      <div id="propertySubContainer" className="w-full mr-2">
        <div className="text-blue-300 font-black py-2">
          Informations sur la propriété
        </div>
        <div id="propertyInputContainer" className="bg-blue-100 p-2 my-2 rounded-md">
          <form className="grid grid-cols-4"
                onSubmit={(e) => submitForm(e)}>
              <input
                id="propertyLabelId"
                type="text"
                name="label"
                onChange={modeEdit ? (e) => textChange(e) : () => {}}
                value={formValues.firstname}
                readOnly={!modeEdit}
                placeholder="Intitulé de l'annonce"
                className="col-span-4 p-2 mb-5 rounded-md text-center"
              />
            <div id="propertyTypeId" className="grid col-span-4 justify-items-stretch">
              Type de logement
              {propertyTypes && (
                <select
                  readOnly={!modeEdit}
                  name="property_type_id"
                  value={formValues.property_type_id}
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
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
            </div>
            <div id="priceOfPropertyId" className="my-1 flex justify-end col-start-3 col-span-2">
              {/* Prix de vente */}
              <div className="my-auto">€</div>
              <input
                type="text"
                name="price"
                onChange={modeEdit ? (e) => textChange(e) : () => {}}
                value={formValues.firstname}
                readOnly={!modeEdit}
                placeholder="..."
                className="rounded-md text-right"
              />
            </div>
            <div id="addressOfPropertyId" className="my-1 flex justify-end col-start-3 col-span-2">
              Voie
              <input
                type="text"
                name="address"
                onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                value={formValues.streetName}
                readOnly={!modeEdit}
                placeholder="Voie"
                className="rounded-md text-right"
              />
            </div>
            <div>
              <div id="cityOfPropertyId" className="my-1 flex justify-end col-start-3 col-span-2 rounded">
                Ville
                <input
                  type="text"
                  name="city"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.city}
                  readOnly={!modeEdit}
                  placeholder="..."
                  className="rounded-md text-right"
                />
              </div>
              <div id="zipcodeId" className="p-2 w-auto">
                Code postale
                <input
                  type="text"
                  name="zipcode"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.zipcode}
                  readOnly={!modeEdit}
                  placeholder="..."
                  className="rounded-md text-right"
                />
              </div>
            </div>
            <div id="livingAreaId" className="p-2 w-auto">
              Surface habitable
              <input
                type="text"
                name="livingArea"
                onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                value={formValues.livingArea}
                readOnly={!modeEdit}
                placeholder="Surface habitable"
                className="rounded-md text-right"
              />
              m²
            </div>
            <div id="nbOfBedroom" className="p-2 w-auto">
              <input
                type="text"
                name="bedroomNumber"
                onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                value={formValues.bedroomNumber}
                readOnly={!modeEdit}
                placeholder="Nombre de chambre(s)"
                className="rounded-md text-right"
              />
              chambre(s)
            </div>
            <div id="nbOfFloors" className="p-2 w-auto">
              <input
                type="text"
                name="floorNumber"
                onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                value={formValues.floorNumber}
                readOnly={!modeEdit}
                placeholder="Nombre d'étages"
                className="rounded-md text-right"
              />
              étage(s)
            </div>

            <div id="totalAreaId" className="p-2 w-auto">
              Taille du terrain
              <input
                type="text"
                name="area"
                onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                value={formValues.area}
                readOnly={!modeEdit}
                placeholder="Superficie totale"
                className="rounded-md text-right"
              />
              m²
            </div>

            <div id="gardenSelectorId" className="p-2 w-auto">
              <div className="mx-auto text-center">
                <input
                  type="checkbox"
                  name="garden"
                  id="checkboxId"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.garden}
                  readOnly={!modeEdit}
                  className="mx-2"
                />
                Jardin
                <input
                  type="text"
                  name="gardenArea"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.gardenArea}
                  readOnly={!modeEdit}
                  placeholder="Superficie du jardin"
                />
                m²
              </div>
            </div>

            <div id="apptNumber" className="p-2 w-auto">
              Appartement n°
              <input
                type="text"
                name="doorNumber"
                onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                value={formValues.doorNumber}
                readOnly={!modeEdit}
                placeholder="..."
                className="rounded-md text-right"
              />
            </div>

            <div id="buildingNumberId" className="p-2 w-auto">
              Bât.
              <input
                type="text"
                name="buildingNumber"
                onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                value={formValues.buildingNumber}
                readOnly={!modeEdit}
                placeholder="..."
                className="rounded-md text-right"
              />
            </div>

            <div id="levelNumberId" className="p-2 w-auto">
              Palier
              <input
                type="text"
                name="level"
                onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                value={formValues.level}
                readOnly={!modeEdit}
                placeholder="..."
                className="rounded-md text-right"
              />
            </div>

            <div id="heaterSelectId" className="p-2 w-auto">
              Type de chauffage
              {heaterTypes && (
                <select
                  readOnly={!modeEdit}
                  name="heater_type_id"
                  value={formValues.heater_type_id}
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
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
              {formErrors.heater_type_id && <p>{formErrors.heater_type_id}</p>}
            </div>

            <div id="shutterSelectId">
              Type de volets
              {shutterTypes && (
                <select
                  readOnly={!modeEdit}
                  name="shutter_type_id"
                  value={formValues.shutter_type_id}
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  className="p-2 w-auto"
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
            </div>

            <div id="checkboxesSelectorsId" className="flex">
              <div id="cellarId">
                <input
                  type="checkbox"
                  name="cellar"
                  id="checkboxLeft"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.cellar}
                  readOnly={!modeEdit}
                />
                Cave
              </div>
              <div id="atticId">
                <input
                  type="checkbox"
                  name="attic"
                  id="checkboxLeft"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.attic}
                  readOnly={!modeEdit}
                />
                Grenier
              </div>
              <div id="parkingId">
                <input
                  type="checkbox"
                  name="parking"
                  id="checkboxLeft"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.parking}
                  readOnly={!modeEdit}
                />
                Parking
              </div>
              <div id="internetId">
                <input
                  type="checkbox"
                  name="opticalFiber"
                  id="checkboxRight"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.opticalFiber}
                  readOnly={!modeEdit}
                />
                Internet (Haut Débit)
              </div>
              <div id="poolId">
                <input
                  type="checkbox"
                  name="swimmingPool"
                  id="checkboxRight"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.swimmingPool}
                  readOnly={!modeEdit}
                />
                Piscine
              </div>
              <div id="balconyId">
                <input
                  type="checkbox"
                  name="balcony"
                  id="checkboxRight"
                  onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                  value={formValues.balcony}
                  readOnly={!modeEdit}
                />
                Balcon
              </div>
            </div>

            <div id="moreInformations" className="p-2 w-auto">
              <textarea
                type="text"
                name="description"
                onChange={modeEdit ? (e) => handleChange(e) : () => {}}
                value={formValues.description}
                readOnly={!modeEdit}
                className="propertyInfoArea"
                placeholder="Informations complémentaires"
              />
            </div>

            <div id="gpsCoordId">
              <div>Coordonnées GPS</div>
              <div>
                <div id="gpsCoordTextId">
                  Long.
                  <input
                    type="text"
                    name="longitude"
                    onChange={modeEdit ? (e) => textChange(e) : () => {}}
                    value={formValues.firstname}
                    readOnly={!modeEdit}
                    placeholder="Longitude"
                    className="rounded-md text-right"
                  />
                  °
                </div>
                <div>
                  Lat.
                  <input
                    type="text"
                    name="latitude"
                    onChange={modeEdit ? (e) => textChange(e) : () => {}}
                    value={formValues.firstname}
                    readOnly={!modeEdit}
                    placeholder="Latitude"
                    className="rounded-md text-right"
                  />
                  °
                </div>
              </div>
            </div>

            <div id="userSelector" className="p-2 w-auto">
              {currentUser &&
                (currentUser.user_type.value === "admin" ||
                  currentUser.user_type.value === "secrétaire" ||
                  currentUser.user_type.value === "manager") &&
                users && (
                  <select
                    readOnly={!modeEdit}
                    value={formValues.user_id}
                    name="user_id"
                    onChange={modeEdit ? (e) => handleChange(e) : () => {}}
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
                
                  <input
                  onClick={()=>{setModeEdit(!modeEdit)}}
                    type="button"
                    value="Modifier"
                    className="m-auto mt-3 text-white bg-blue-300 hover:bg-blue-600 uppercase font-bold p-2 pt-2 pb-2 mx-2 rounded-xl shadow "
                  />
                
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
