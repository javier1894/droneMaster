import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import "./ratingModal.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";

export const RatingModal = ({
  setShowRatingModal,
  showRatingModal,
  counterRating,
  score,
  setCounterRating,
  setScore,
}) => {
  const { courseMaterial } = useContext(DroneMasterContext);
  const { register, handleSubmit } = useForm();

  // Function to close rating modal
  const handleClose = () => {
    setShowRatingModal(false);
  };

  // Function to update data base with new score
  const onSubmit = (data) => {
    const rating = parseInt(data.rating);
    const newCounterRating = counterRating + 1;

    if (score === 0.0 && counterRating === 0) {
      const info = { score: rating, counter_rating: newCounterRating };
      axios
        .put(
          `http://localhost:4000/students/updateScoreRating/${courseMaterial[0]?.course_id}`,
          { score: rating, counter_rating: newCounterRating }
        )
        .then((res) => {
          setScore(rating);
          setCounterRating(newCounterRating);
          setShowRatingModal(false);
        })
        .catch((err) => { });
    } else {
      const newScore = (score * counterRating + rating) / newCounterRating;
      const info = { score: newScore, counter_rating: newCounterRating };
      axios
        .put(
          `http://localhost:4000/students/updateScoreRating/${courseMaterial[0]?.course_id}`,
          { score: rating, counter_rating: newCounterRating }
        )
        .then((res) => {
          setScore(newScore);
          setCounterRating(newCounterRating);
          setShowRatingModal(false);
        })
        .catch((err) => { });
    }
  };

  return (
    <Modal
      show={showRatingModal}
      onHide={handleClose}
      centered
      size="sm"
      fullscreen="false"
      className="ratingModal"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className=" bodyRating">
          <h4>Puntua tu experiencia con este curso</h4>
          <div className="ratingStars">
            <label className="starLabel" htmlFor="radio1">
              ★
            </label>
            <input id="radio1" type="radio" {...register("rating")} value="5" />
            <label className="starLabel" htmlFor="radio2">
              ★
            </label>
            <input id="radio2" type="radio" {...register("rating")} value="4" />
            <label className="starLabel" htmlFor="radio3">
              ★
            </label>
            <input id="radio3" type="radio" {...register("rating")} value="3" />
            <label className="starLabel" htmlFor="radio4">
              ★
            </label>
            <input id="radio4" type="radio" {...register("rating")} value="2" />
            <label className="starLabel" htmlFor="radio5">
              ★
            </label>
            <input id="radio5" type="radio" {...register("rating")} value="1" />
          </div>
          <button className="btnNormal" type="submit">
            Puntúanos
          </button>
        </Modal.Body>
      </form>
    </Modal>
  );
};
