import PlaceItem from "../PlaceItem/PlaceItem.jsx";
import "./BeenToList.css";
import PlaceFormModal from "../PlaceFormModal/PlaceFormModal.jsx";
import React from "react";
import {Button, Grid2} from "@mui/material";
import {useSelector} from "react-redux";

const BeenToList = () => {
    const [isModalOpened, setIsModalOpened] = React.useState(false);
    const [selectedPlace, setSelectedPlace] = React.useState(null);
    const places = useSelector((state) => state.places);

    const handleOpenModal = (place = null) => {
        setSelectedPlace(place);
        setIsModalOpened(true);
    };

    const handleOpenMap = () => {
        const visitedPlaces = places
            .filter((p => p.visited))
            .map((p) => {
                return {
                    city: p.city,
                    coor: [p.latitude, p.longitude],
                };
            });
        const encodedPlace = encodeURIComponent(JSON.stringify(visitedPlaces));
        const newWindow = window.open("/map.html?places=" + encodedPlace, "newWindow", "width=600,height=350");
        newWindow.opener.postMessage({key: 'value'}, '*');
    }

    const handleClose= () => setIsModalOpened(false);


    return (
        <div className={"been-to-list"}>
            <PlaceFormModal handleClose={handleClose} open={isModalOpened} place={selectedPlace}></PlaceFormModal>
            <div className={"been-to-list__header"}>
                <Button variant="outlined" onClick={() => handleOpenModal()}>Añadir lugar</Button>
                <Button variant="outlined" onClick={handleOpenMap}>Mapa visitados</Button>
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
                                places.map((p) => <PlaceItem key={p.id} place={p}
                                                             clickEvent={() => handleOpenModal(p)}/>)
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default BeenToList;
