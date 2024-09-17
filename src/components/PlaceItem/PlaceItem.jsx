import PropTypes from "prop-types";
import "./PlaceItem.css"
import {Grid2} from "@mui/material";

const PlaceItem = ({place, clickEvent}) => {
    const {country, city, latitude, longitude, visited} = place;
    return (
        <div onClick={clickEvent} className={`place-item ${visited? "place-item--visited" : "place-item--not-visited"}`}>
            <Grid2 container spacing={2}>
                <Grid2 size={3}>
                    <div className={"place-item__country"}>{country}</div>
                </Grid2>
                <Grid2 size={3}>
                    <div className={"place-item__city"}>{city}</div>
                </Grid2>
                <Grid2 size={3}>
                    <div className={"place-item__coordinates"}>{latitude}, {longitude}</div>
                </Grid2>
                <Grid2 size={3}>
                    <div className={"place-item__visited-flag"}>

                    </div>
                </Grid2>
            </Grid2>
        </div>
    );
};

PlaceItem.propTypes = {
    place: PropTypes.shape({
        id: PropTypes.number.isRequired,
        country: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        visited: PropTypes.bool.isRequired,
    }),
    clickEvent: PropTypes.func.isRequired,
};

export default PlaceItem;
