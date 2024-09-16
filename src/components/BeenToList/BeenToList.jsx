import PlaceItem from "../PlaceItem/PlaceItem.jsx";
import "./BeenToList.css";
import PlaceFormModal from "../PlaceFormModal/PlaceFormModal.jsx";
import React from "react";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";

const BeenToList = () => {
    const [isModalOpened, setIsModalOpened] = React.useState(false);
    const handleOpen = () => setIsModalOpened(true);
    const handleClose= () => setIsModalOpened(false);
    const places = useSelector((state) => state.places);
    /*
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
     */

    return (
        <div className={"been-to-list"}>
            <div className={"been-to-list__header"}>
                <Button variant="outlined" onClick={() => handleOpen()}>Añadir lugar</Button>
            </div>
            <div className={"been-to-list__body"}>
                {
                    places.length == null || places.length === 0 ?
                        (
                            <div>Lista vacía</div>
                        ) :
                        (
                            places.map((p) => <PlaceItem key={p.id} place={p}/>)
                        )
                }
            </div>
            <PlaceFormModal handleClose={handleClose} open={isModalOpened}></PlaceFormModal>
        </div>
    );
};

export default BeenToList;
