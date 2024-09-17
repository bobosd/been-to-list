import PropTypes from "prop-types";
import {Box, Button, Checkbox, FormControlLabel, Grid2, Modal, TextField} from "@mui/material";
import "./PlaceFormModal.css";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {addPlace, updatePlace, removePlace} from "../../redux/slices/placeSlice.jsx";

const style = {
    position: 'absolute',
    top: '15rem',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30rem',
    backgroundColor: 'white',
    border: '1px solid var(--border-gray)',
    padding: '1.5rem',
    borderRadius: '0.85rem'
};

const PlaceFormModal = ({open, handleClose, place}) => {
    const [id, setId] = useState(0);
    let [visited, setVisited] = useState(place ? place.visited : false);

    const inputCountry = useRef(null);
    const inputCity = useRef(null);
    const inputLatitude = useRef(0.0);
    const inputLongitude = useRef(0.0);

    const reduxDispatch = useDispatch();

    const collectFormData = () => {
        const latitude = parseFloat(inputLatitude.current.value);
        const longitude = parseFloat(inputLongitude.current.value);
        return {
            country: inputCountry.current.value,
            city: inputCountry.current.value,
            coordinates: [latitude, longitude],
            visited: visited
        };
    }

    const handleAddPlace = () => {
        const newPlace = {...collectFormData(), id: id};
        reduxDispatch(addPlace(newPlace));
        setId(id + 1);
        handleClose();
    };

    const handleUpdatePlace = () => {
        const updatedPlace = {...collectFormData(), id: place.id}
        reduxDispatch(updatePlace(updatedPlace));
        handleClose();
    }

    const handleRemovePlace = () => {
        reduxDispatch(removePlace(place.id));
        handleClose();
    }

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <div className={"place-modal__header"}>
                            Lugar a visitar
                        </div>
                        <div className={"place-modal__body"}>
                            <Grid2 container spacing={2}>
                                <Grid2 size={6}>
                                    <TextField required label="País" size="small" inputRef={inputCountry}
                                               defaultValue={place ? place.country : ""}></TextField>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextField required label="Ciudad" size="small" inputRef={inputCity}
                                               defaultValue={place ? place.city : ""}></TextField>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextField required label="Latitud" size="small"
                                               inputRef={inputLatitude}
                                               defaultValue={place ? place.coordinates[0] : ""}></TextField>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextField required label="Longitud" size="small"
                                               inputRef={inputLongitude}
                                               defaultValue={place ? place.coordinates[1] : ""}></TextField>
                                </Grid2>
                            </Grid2>
                            <FormControlLabel
                                control={<Checkbox size="small" defaultChecked={place? place.visited: false}
                                                   onChange={() => setVisited(!visited)}/>}
                                label="Visitado"/>
                        </div>
                        <div className={"place-modal__footer"}>
                            {
                                place ?
                                    (<>
                                        <Button variant="outlined" size="small" onClick={handleUpdatePlace}>Actualizar</Button>
                                        <Button variant="outlined" size="small" color="error" onClick={handleRemovePlace}>Eliminar</Button>
                                    </>) :
                                    (
                                        <Button variant="outlined" size="small" onClick={handleAddPlace}>Crear</Button>
                                    )
                            }
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
};

PlaceFormModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    place: PropTypes.shape({
        id: PropTypes.number.isRequired,
        country: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        visited: PropTypes.bool.isRequired,
    })
};

export default PlaceFormModal;
