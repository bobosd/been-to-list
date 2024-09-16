import PlaceItem from "../PlaceItem/PlaceItem.jsx";
import "./BeenToList.css";

const BeenToList = () => {
    const places = [
        {
            country: "US",
            city: "California",
            coordinates: [36.778, -199.417],
            visited: false,
        },
        {
            country: "France",
            city: "Paris",
            coordinates: [48.8534951, 2.3483915],
            visited: false,
        },
        {
            country: "Spain",
            city: "Barcelona",
            coordinates: [41.3828939, 2.1774322],
            visited: true,
        }
    ];

    return (
        <div className={"been-to-list"}>
            <div className={"been-to-list__header"}>
            </div>
            <div className={"been-to-list__body"}>
                {
                    places.map((p) => <PlaceItem key={p.coordinates} country={p.country} city={p.city} coordinates={p.coordinates}
                                                 visited={p.visited}/>)
                }
            </div>
        </div>
    );
};

export default BeenToList;
