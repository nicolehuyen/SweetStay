import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";

function DeleteSpot({ spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(deleteSpotThunk(spotId))
        .then(closeModal)
    }

    return (
        <form onSubmit={handleDelete}>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button type="submit">Yes (Delete Spot)</button>
            <button onClick={() => closeModal()}>No (Keep Spot)</button>
        </form>
    )
}

export default DeleteSpot;
