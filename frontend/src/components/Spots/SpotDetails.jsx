import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByIdThunk } from "../../store/spots";
import { useParams } from "react-router";

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])
    // console.log(spot)

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
    }, [dispatch, spotId])

    if(!spot) return null

    // spot images
    let arr = []

    for(let i = 1; i < 5; i++) {
        let image = spot.SpotImages[i]

        if(image !== undefined) {
            arr.push(image)
        }
    }

    return (
        <section>
            <h1>{spot.name}</h1>
            <span>{spot.city}, {spot.state}, {spot.country}</span>
            <div className="image-container">
                <div className="large-image">
                    <img src={spot.SpotImages[0].url} alt='image1' />
                </div>
                <div className="small-images">
                    {arr.map((image) => (<img src={image.url} alt='image' />))}
                </div>
            </div>
        </section>
    )
}

export default SpotDetails;
