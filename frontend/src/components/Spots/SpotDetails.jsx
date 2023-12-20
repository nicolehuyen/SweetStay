import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotByIdThunk } from "../../store/spots";

function SpotDetails() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotByIdThunk())
    }, [dispatch])

    return (
        <h1>Spot Details</h1>
    )
}

export default SpotDetails;
