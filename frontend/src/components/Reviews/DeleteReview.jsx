import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";

function DeleteReview({ reviewId, spotId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(deleteReviewThunk(reviewId, spotId))
        .then(closeModal)
    }

    return (
        <form onSubmit={handleDelete}>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button type="submit">Yes (Delete Review)</button>
            <button onClick={() => closeModal()}>No (Keep Review)</button>
        </form>
    )
}

export default DeleteReview;
