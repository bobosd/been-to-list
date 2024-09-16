import PropTypes from "prop-types";
import "./PlaceItem.css"

const PlaceItem = ({country, city, coordinates, visited}) => {
    return (
        <div className={`place-item ${visited? "place-item--visited" : "place-item--not-visited"}` }>
            <div className={"place-item__country"}>{country}</div>
            <div className={"place-item__city"}>{city}</div>
            <div className={"place-item__coordinates"}>{coordinates[0]}, {coordinates[1]}</div>
            <div className={"place-item__visited-flag"}></div>

        </div>
    );
};

PlaceItem.propTypes = {
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    visited: PropTypes.bool.isRequired,
};

export default PlaceItem;
