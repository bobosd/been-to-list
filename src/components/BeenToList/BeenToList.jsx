import PlaceItem from "../PlaceItem/PlaceItem.jsx";
import "./BeenToList.css";
import PlaceFormModal from "../PlaceFormModal/PlaceFormModal.jsx";
import React from "react";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";

const BeenToList = () => {
    const [isModalOpened, setIsModalOpened] = React.useState(false);
    const [selectedPlace, setSelectedPlace] = React.useState(null);

    const handleOpen = (place = null) => {
        setSelectedPlace(place);
        setIsModalOpened(true);
    };
    const handleClose= () => setIsModalOpened(false);
    const places = useSelector((state) => state.places);

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
                            places.map((p) => <PlaceItem key={p.id} place={p} clickEvent={() => handleOpen(p)} />)
                        )
                }
            </div>
            <PlaceFormModal handleClose={handleClose} open={isModalOpened} place={selectedPlace}></PlaceFormModal>
        </div>
    );
};

export default BeenToList;
