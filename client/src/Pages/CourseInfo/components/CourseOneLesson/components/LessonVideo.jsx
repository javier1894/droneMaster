import React from "react";

export const LessonVideo = ({ videoUrl }) => {
  const videoId = videoUrl?.includes("youtube.com")
    ? videoUrl?.split("v=")[1]
    : videoUrl?.split("/").slice(-1)[0];

  return (
    <div className="introMultimedia">
      {videoId ? (
        <iframe
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Lesson Video"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          src="http://localhost:4000/images/courses/DefaultLesson.jpg"
          alt="Course image"
        />
      )}
    </div>
  );
};
