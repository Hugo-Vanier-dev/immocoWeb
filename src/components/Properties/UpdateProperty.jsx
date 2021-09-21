import PropertyForm from "./form/PropertyForm";
import PixLoader from "./pixloader/PixLoader";

function UpdateProperty() {
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="grid col-start-1 col-span-1">
          <PropertyForm propertyId={null} modeEdit={true} />
        </div>
        <div className="col-start-2">
          <PixLoader />
        </div>
      </div>
    </div>
  );
}

export default UpdateProperty;
