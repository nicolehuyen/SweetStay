import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { updateSpotThunk } from "../../store/spots"
import { useNavigate, useParams } from 'react-router-dom';
import './CreateSpot.css'

function UpdateSpot() {
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [description, setDescription] = useState(spot?.description)
    const [name, setName] = useState(spot?.name)
    const [price, setPrice] = useState(spot?.price)
    const [errors, setErrors] = useState([])
    const [validations, setValidations] = useState({})

    useEffect(() => {
        const errorsArr = []
        const validationsObj = {}

        if(!country) {
            errorsArr.push('Country is required')
            validationsObj.country = 'Country is required'
        }

        if(!address) {
            errorsArr.push('Address is required')
            validationsObj.address = 'Address is required'
        }

        if(!city) {
            errorsArr.push('City is required')
            validationsObj.city = 'City is required'
        }

        if(!state) {
            errorsArr.push('State is required')
            validationsObj.state = 'State is required'
        }

        if(String(description).length < 30) {
            errorsArr.push('Description needs a minimum of 30 characters')
            validationsObj.description = 'Description needs a minimum of 30 characters'
        }

        if(!name) {
            errorsArr.push('Name is required')
            validationsObj.name = 'Name is required'
        }

        if(!Number(price)) {
            errorsArr.push('Price is required')
            validationsObj.price = 'Price is required'
        }

        setErrors(errorsArr)
        setValidations(validationsObj)

    }, [country, address, city, state, description, name, price])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedSpot = {
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            lat: 1,
            lng: 1
        }

        const submit = await dispatch(updateSpotThunk(updatedSpot, spotId))

        navigate(`/spots/${submit.id}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="location-input">
                <h1>Update your Spot</h1>
                <h2>Where&apos;s your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label className="label">
                    {<span>Country <span className="errors">{errors.filter((error) => error.includes('Country'))}</span></span>}
                    <input
                        type='text'
                        value={country}
                        placeholder='Country'
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label className="label">
                    {<span>Street Address <span className="errors">{errors.filter((error) => error.includes('Address'))}</span></span>}
                    <input
                        type='text'
                        value={address}
                        placeholder='Address'
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <div className="city-state-input">
                    <label className="label">
                        {<span>City <span className="errors">{errors.filter((error) => error.includes('City'))}</span></span>}
                        <input
                            type='text'
                            value={city}
                            placeholder='City'
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <span>, </span>
                    <label className="label">
                        {<span>State <span className="errors">{errors.filter((error) => error.includes('State'))}</span></span>}
                        <input
                            type='text'
                            value={state}
                            placeholder='STATE'
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                </div>
            </div>
            <div className="description-input">
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <label className="label">
                    <input
                        type='text'
                        value={description}
                        placeholder='Please write at least 30 characters'
                        onChange={(e) => setDescription(e.target.value)}
                        minLength={30}
                    />
                    {<span className="errors">{errors.filter((error) => error.includes('Description'))}</span>}
                </label>
            </div>
            <div className="title-input">
                <h2>Create a title for your spot</h2>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <label className="label">
                    <input
                        type='text'
                        value={name}
                        placeholder='Name of your spot'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {<span className="errors">{errors.filter((error) => error.includes('Name'))}</span>}
                </label>
            </div>
            <div className="price-input">
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div className="price-input-detail">
                    <span>$</span>
                    <label className="label">
                        <input
                            type='number'
                            value={price}
                            placeholder='Price per night (USD)'
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        {<span className="errors">{errors.filter((error) => error.includes('Price'))}</span>}
                    </label>
                </div>
            </div>
            <div className="create-spot-button">
                <button className="create-button" type="submit" disabled={Object.values(validations).length}>Update your Spot</button>
            </div>
        </form>
    )
}

export default UpdateSpot;
