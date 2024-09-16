import PropTypes from "prop-types";
import "./PlaceItem.css"

const PlaceItem = ({place}) => {
    const {country, city, coordinates, visited} = place;
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
    place: PropTypes.shape({
        id: PropTypes.number.isRequired,
        country: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        visited: PropTypes.bool.isRequired,
    })
};

export default PlaceItem;
