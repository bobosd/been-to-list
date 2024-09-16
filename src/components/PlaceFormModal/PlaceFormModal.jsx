import PropTypes from "prop-types";
import {Box, Button, Checkbox, FormControlLabel, Grid2, Modal, TextField} from "@mui/material";
import "./PlaceFormModal.css";
import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {addPlace} from "../../redux/slices/placeSlice.jsx";

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
    const [visited, setVisited] = useState(place ? place.visited : false);

    const inputCountry = useRef(null);
    const inputCity = useRef(null);
    const inputLatitude = useRef(0.0);
    const inputLongitude = useRef(0.0);

    const reduxDispatch = useDispatch();

    const handleAddPlace = () => {
        const latitude = parseFloat(inputLatitude.current.value);
        const longitude = parseFloat(inputLongitude.current.value);
        const place = {
            id: id,
            country: inputCountry.current.value,
            city: inputCountry.current.value,
            coordinates: [latitude, longitude],
            visited: visited
        }
        reduxDispatch(addPlace(place));
        setId(id + 1);
    };

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
                                    <TextField required label="País" size="small" inputRef={inputCountry}></TextField>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextField required label="Ciudad" size="small" inputRef={inputCity}></TextField>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextField required label="Latitud" size="small"
                                               inputRef={inputLatitude}></TextField>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextField required label="Longitud" size="small"
                                               inputRef={inputLongitude}></TextField>
                                </Grid2>
                            </Grid2>
                            <FormControlLabel
                                control={<Checkbox size="small" checked={visited}
                                                   onChange={() => setVisited(!visited)}/>}
                                label="Visitado"/>
                        </div>
                        <div className={"place-modal__footer"}>
                            {
                                place ?
                                    (<>
                                        <Button variant="outlined" size="small">Actualizar</Button>
                                        <Button variant="outlined" size="small" color="error">Eliminar</Button>
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
