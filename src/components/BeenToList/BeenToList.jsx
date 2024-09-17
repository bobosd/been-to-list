import PlaceItem from "../PlaceItem/PlaceItem.jsx";
import "./BeenToList.css";
import PlaceFormModal from "../PlaceFormModal/PlaceFormModal.jsx";
import React from "react";
import {Button, Grid2} from "@mui/material";
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
            <PlaceFormModal handleClose={handleClose} open={isModalOpened} place={selectedPlace}></PlaceFormModal>
            <div className={"been-to-list__header"}>
                <Button variant="outlined" onClick={() => handleOpen()}>Añadir lugar</Button>
            </div>
            <div className={"been-to-list__body"}>
                <div className={"b2l-body__th"}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={3}>
                            País
                        </Grid2>
                        <Grid2 size={3}>
                            Ciudad
                        </Grid2>
                        <Grid2 size={3}>
                            Coordenadas
                        </Grid2>
                        <Grid2 size={3}>
                            Visitado
                        </Grid2>
                    </Grid2>
                </div>
                <hr/>
                <div className={"b2l-body__tr"}>
                    {
                        places.length == null || places.length === 0 ?
                            (
                                <div className={"been-to-list__body--empty"}>Lista vacía</div>
                            ) :
                            (
                                places.map((p) => <PlaceItem key={p.id} place={p} clickEvent={() => handleOpen(p)}/>)
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default BeenToList;
