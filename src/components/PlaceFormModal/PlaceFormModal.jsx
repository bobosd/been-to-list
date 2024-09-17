import PropTypes from "prop-types";
import {Box, Button, Checkbox, FormControlLabel, Grid2, Modal, TextField} from "@mui/material";
import "./PlaceFormModal.css";
import {useEffect, useState} from "react";
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

const defaultPlace = {
    country: "",
    city: "",
    latitude: null,
    longitude: null,
    visited: false
};

const defaultErrors = {
    country: false,
    city: false,
    latitude: false,
    longitude: false,
}

const PlaceFormModal = ({open, handleClose, place}) => {
    const [id, setId] = useState(0);
    const [formData, setFormData] = useState({...defaultPlace});
    const [errors, setErrors] = useState({...defaultErrors});

    //initialize visited check
    useEffect(() => {
        const p = place ? {...place} : {...defaultPlace}
        setFormData(() => {
            return p;
        });
        setErrors(() => {
            return {...defaultErrors};
        });
    }, [place]);

    //handle form text & validation
    const handleTextInput = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => {
            return {...prevState, [name]: value};
        });
        validateHasText(name, value);
    }
    const validateHasText = (name, value) => {
        if (value == null || value.trim().length < 1) {
            setErrors((prevState) => {
                return {...prevState, [name]: true}
            });
        } else {
            setErrors((prevState) => {
                return {...prevState, [name]: false}
            });
        }
    }

    //handle form number & validation
    const handleNumberInput = (e) => {
        let {name, value} = e.target;
        value = parseFloat(value);
        setFormData((prevState) => {
            return {...prevState, [name]: value};
        });
        validateNumber(name, value);
    }
    const validateNumber = (name, value) => {
        if (value == null || isNaN(value)) {
            setErrors((prevState) => {
                return {...prevState, [name]: true}
            });
            return;
        }

        if (
            (name === "latitude" && (value >= 90 || value <= -90)) ||
            (name === "longitude" && (value >= 180 || value <= -180))
        ) {
            setErrors((prevState) => {
                return {...prevState, [name]: true}
            });
        } else {
            setErrors((prevState) => {
                return {...prevState, [name]: false}
            });
        }
    };

    //validation check before create & update
    const validationCheck = () => {
        let isValid = true;
        for (let key in formData) {
            if (formData[key] == null || formData[key].length < 1) {
                setErrors(prevState => {
                    return {...prevState, [key]: true};
                });
                isValid = false;
            }
        }
        return isValid;
    }

    //reset input values and errors on modal close
    const closeModal = () => {
        setErrors(() => ({...defaultErrors}));
        setFormData(() => ({...defaultPlace}));
        console.log(errors);
        handleClose();
    }

    //handle visited check
    const handleVisited = () => {
        setFormData((prevState) => {
            return {...prevState, visited: !prevState.visited};
        });
    };

    //redux
    const reduxDispatch = useDispatch();
    const handleAddPlace = () => {
        const hasError = Object.values(errors).some((err) => err);
        if (hasError || !validationCheck()) return;
        const newPlace = {...formData, id: id};
        reduxDispatch(addPlace(newPlace));
        setId(id + 1);
        closeModal();
    };

    const handleUpdatePlace = () => {
        const hasError = Object.values(errors).some((err) => err);
        if (hasError) return;
        const updatedPlace = {...formData, id: place.id}
        reduxDispatch(updatePlace(updatedPlace));
        closeModal();
    }

    const handleRemovePlace = () => {
        reduxDispatch(removePlace(place.id));
        closeModal();
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
                                    <TextField required label="País" size="small" onChange={handleTextInput}
                                               error={errors.country} name="country"
                                               defaultValue={place ? place.country : ""}></TextField>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextField required label="Ciudad" size="small" name="city"
                                               error={errors.city} onChange={handleTextInput}
                                               defaultValue={place ? place.city : ""}></TextField>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextField required label="Latitud" size="small" name="latitude"
                                               error={errors.latitude} onChange={handleNumberInput}
                                               defaultValue={place ? place.latitude : ""}></TextField>
                                </Grid2>
                                <Grid2 size={6}>
                                    <TextField required label="Longitud" size="small" name="longitude"
                                               error={errors.longitude} onChange={handleNumberInput}
                                               defaultValue={place ? place.longitude : ""}></TextField>
                                </Grid2>
                            </Grid2>
                            <FormControlLabel
                                control={<Checkbox size="small" defaultChecked={place ? place.visited : false}
                                                   onChange={handleVisited}/>}
                                label="Visitado"/>
                        </div>
                        <div className={"place-modal__footer"}>
                            {
                                place ?
                                    (<>
                                        <Button variant="outlined" size="small"
                                                onClick={handleUpdatePlace}>Actualizar</Button>
                                        <Button variant="outlined" size="small" color="error"
                                                onClick={handleRemovePlace}>Eliminar</Button>
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
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        visited: PropTypes.bool.isRequired,
    })
};

export default PlaceFormModal;
