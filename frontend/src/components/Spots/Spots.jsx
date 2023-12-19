import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk } from "../../store/spots";

function Spots() {
    const dispatch = useDispatch()
    const spotsObj = useSelector((state) => state.spots)
    const spots = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    return (
        <section>
            <ul>
                {spots.map((spot) => (
                    <div key={spot.id}>
                        <img src={spot.previewImage} alt='preview' />
                        <div>
                            <p>{`${spot.city}, ${spot.state}`}</p>
                            {/* <p>{rating}</p> */}
                        </div>
                    </div>
                ))}
            </ul>
        </section>
    )
}

export default Spots;
