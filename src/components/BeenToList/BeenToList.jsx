import PlaceItem from "../PlaceItem/PlaceItem.jsx";

const BeenToList = () => {
    return (
        <div className={"been-to-list"}>
            <div className={"been-to-list__header"}>
            </div>
            <div className={"been-to-list__body"}>
                <PlaceItem></PlaceItem>
                <PlaceItem></PlaceItem>
            </div>
        </div>
    );
};

export default BeenToList;
