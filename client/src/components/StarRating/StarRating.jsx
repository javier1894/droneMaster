import React from "react";
import "./starRatingStyle.scss";
import { BiSolidStar } from "react-icons/bi"
import { BiStar } from "react-icons/bi"

export const StarRating = ({ rating }) => {
  //Generate an array from 1 to 5
  const starsArray = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <>
      <p className="starsContainer">
        {starsArray.map((star) => (
          <span
            key={star}
            className={star <= rating ? "starFilled" : "starEmpty"}
          >
            {star <= rating ? <BiSolidStar /> : <BiStar />}
          </span>
        ))}
      </p>
    </>
  );
};
