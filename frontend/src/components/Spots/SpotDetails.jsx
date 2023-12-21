import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotByIdThunk } from "../../store/spots";
import { useParams } from "react-router";

function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
    }, [dispatch, spotId])

    if(!spot) return null

    const reserve = (e) => {
        e.preventDefault()
        window.alert('Feature Coming Soon...')
    }

    function ratings() {
        if(spot.avgRating && spot.numReviews === 1) {
            return `${spot.avgRating.toFixed(1)} · ${spot.numReviews} review`
        } else if(spot.avgRating && spot.numReviews > 1) {
            return `${spot.avgRating.toFixed(1)} · ${spot.numReviews} reviews`
        } else {
            return 'New'
        }
    }

    return (
        <section>
            <h1>{spot.name}</h1>
            <span>{spot.city}, {spot.state}, {spot.country}</span>
            <div className="image-container">
                <div className="large-image">
                    <img src={spot.SpotImages?.[0]?.url} alt={spot.SpotImages ? spot.SpotImages[0]?.url : null} />
                </div>
                <div className="small-images">
                    <img src={spot.SpotImages?.[1]?.url} alt={spot.SpotImages ? spot.SpotImages[1]?.url : null} />
                    <img src={spot.SpotImages?.[2]?.url} alt={spot.SpotImages ? spot.SpotImages[2]?.url : null} />
                    <img src={spot.SpotImages?.[3]?.url} alt={spot.SpotImages ? spot.SpotImages[3]?.url : null} />
                    <img src={spot.SpotImages?.[4]?.url} alt={spot.SpotImages ? spot.SpotImages[4]?.url : null} />
                </div>
            </div>
            <div className="description">
                <h1>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h1>
                <p>{spot.description}</p>
            </div>
            <div className="reserve-box">
                <div className="reserve-box-left">
                    <p className="spot-price"><span style={{fontWeight: 'bold'}}>{`$${spot.price.toFixed(0)}`}</span> night</p>
                </div>
                <div className="reserve-box-right">
                    <i className="fas fa-star">{` ${ratings()}`}</i>
                </div>
                <button onClick={reserve} className="reserve-button">Reserve</button>
            </div>
            <div className="review-section">
                <h1><i className="fas fa-star">{` ${ratings()}`}</i></h1>
            </div>
        </section>
    )
}

export default SpotDetails;
