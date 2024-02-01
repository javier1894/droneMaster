import React, { useState } from "react";

export const CourseDescription = ({ description }) => {
  const byteArray = new Uint8Array(description?.data);
  const descriptionText = new TextDecoder("utf-8").decode(byteArray);

  // Define a maximum length to display the summary
  const maxDescriptionLength = 200;

  // State to control whether to display the full text
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to change the state and show the full text
  const handleShowFull = () => {
    setShowFullDescription(true);
  };

  // Function to change the state and show a part of the text
  const handleShowPart = () => {
    setShowFullDescription(false);
  };

  return (
    <div className="containerCourseDescription">
      <div className="headLineDescription">
        <h5 className="mb-1">Descripción</h5>
      </div>
      {descriptionText  && (
        <div
          className={
            showFullDescription
              ? "fullDescription descriptionContent"
              : "smallDescription descriptionContent"
          }
        >
          {/* Show only the first 3 lines of the text or the full text if requested */}
          <p>
            {showFullDescription
              ? descriptionText
              : descriptionText.slice(0, maxDescriptionLength)}
            {descriptionText.length > maxDescriptionLength && !showFullDescription && (
              <span>...</span>
            )}
          </p>
        </div>
      )}
      {!descriptionText  && (
        <div
          className={
            showFullDescription
              ? "fullDescription descriptionContent"
              : "smallDescription descriptionContent"
          }
        >
          {/* Display a message when there is no description */}
          <p className="noInfoText">Descripción no disponible</p>
        </div>
      )}
      {/* Show the "Ver mas/menos" button only if the description exceeds the maximum length */}
      {descriptionText &&
        descriptionText.length > maxDescriptionLength &&
        (!showFullDescription ? (
          <button className="showTextButton" onClick={handleShowFull}>
            Ver mas
          </button>
        ) : (
          <button className="showTextButton" onClick={handleShowPart}>
            Ver menos
          </button>
        ))}
    </div>
  );
};
