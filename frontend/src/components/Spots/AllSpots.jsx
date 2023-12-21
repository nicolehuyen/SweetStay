import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk } from "../../store/spots";
import './AllSpots.css'
import { NavLink } from "react-router-dom";

function AllSpots() {
    const dispatch = useDispatch()
    const spotsObj = useSelector((state) => state.spots)
    const spots = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch])

    return (
        <section className="section">
            <div className="spots-container">
                {spots.map((spot) => (
                    <NavLink key={spot.id} to={`/spots/${spot.id}`} className='spot-link'>
                        <div>
                            <img className='spot-image' src={spot.previewImage} alt='preview' />
                            <div className="text-container">
                                <div className="spot-left">
                                    <span>{`${spot.city}, ${spot.state}`}</span>
                                    <p className="spot-price"><span style={{fontWeight: 'bold'}}>{`$${spot.price.toFixed()}`}</span> night</p>
                                </div>
                                <div className="spot-right">
                                    <i className="fas fa-star">{` ${spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}`}</i>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </section>
    )
}

export default AllSpots;
