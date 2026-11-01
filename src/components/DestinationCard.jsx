
import PropTypes from "prop-types";
import { MapPin, Plus, Check } from "lucide-react";

export default function DestinationCard({
  destination,
  selected,
  onAdd
}) {

  return (
    <div className="destination-card">

      <div className="destination-image">
        <img
          src={destination.image}
          alt={destination.name}
        />

        <span className="image-tag">
          {destination.category}
        </span>
      </div>

      <div className="destination-info">

        <h3>{destination.name}</h3>

        <p>
          <MapPin size={14} />
          {destination.country}
        </p>

        <p className="description">
          {destination.description}
        </p>

        <div className="card-bottom">

          <strong>
            ₹ {destination.cost.toLocaleString("en-IN")}
          </strong>

          <button
            className={selected ? "add-button added" : "add-button"}
            onClick={() => onAdd(destination)}
          >
            {selected ? (
              <>
                <Check size={15} />
                Added
              </>
            ) : (
              <>
                <Plus size={15} />
                Add Trip
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,

  selected: PropTypes.bool.isRequired,

  onAdd: PropTypes.func.isRequired
};
