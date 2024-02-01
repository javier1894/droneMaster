import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export const CommentsAndResponsesList = ({
  allComments,
  allResponses,
  user,
  course_id,
  unit_id,
  lesson_id,
  setResetComments,
  resetComments,
}) => {
  const [responseInputForComment, setResponseInputForComment] = useState();
  const [responseContent, setResponseContent] = useState();

  const handleResponseInputChange = (e) => {
    setResponseContent(e.target.value);
  };

  // Function get comment responses
  const onSubmit = (commentId) => {
    axios
      .post(
        `http://localhost:4000/myCourse/myLesson/addResponse/${course_id}/${unit_id}/${lesson_id}/${user.user_id}/${commentId}`,
        { responseContent }
      )
      .then((res) => {
        setResponseInputForComment(-1);
        setResetComments(!resetComments);
      })
      .catch((err) => { });
  };

  // Function to disable comment
  const handleCommentDisable = (commentId) => {
    axios
      .put(`http://localhost:4000/admin/disableComment/${commentId}`)
      .then((res) => { })
      .catch((err) => { });
    setResetComments(!resetComments);
  };

  // Function to enable comment
  const handleCommentEnable = (commentId) => {
    axios
      .put(`http://localhost:4000/admin/enableComment/${commentId}`)
      .then((res) => { })
      .catch((err) => { });

    setResetComments(!resetComments);
  };

  return (
    <div className="commentsResponsesList">
      {allComments?.map((comment, commentIndex) => {

        return (
          <span key={comment.comment_id}>
            {(user?.type === 2 || comment.comment_is_hidden === 0) && (
              <div

                className="commentCont"
                style={{
                  filter: `${comment.comment_is_hidden === 0
                    ? "brightness(1)"
                    : "brightness(0.5)"
                    }`,
                }}
              >
                <div className="commentTitle">
                  <div className="userImgContainer">
                    {comment?.user_img ? (
                      <img
                        src={`http://localhost:4000/images/users/${comment.user_img}`}
                      />
                    ) : (
                      <h6 className="avatarText">
                        {comment.user_name.at(0).toUpperCase()}
                      </h6>
                    )}
                  </div>
                  <p className="mb-0 text-capitalize">
                    {comment.user_name} {comment?.user_lastname}
                  </p>
                  {(user?.user_id == comment.user_id || user?.type !== 0) && (
                    <div className="deleteButtonCont">
                      {comment.comment_is_hidden === 0 ? (
                        <AiOutlineEyeInvisible
                          className="visible"
                          onClick={() => handleCommentDisable(comment.comment_id)}
                        />
                      ) : (
                        <AiOutlineEye
                          className="hide"
                          onClick={() => handleCommentEnable(comment.comment_id)}
                        />
                      )}
                    </div>
                  )}
                </div>
                <p>{comment.comment_content}</p>
                <button
                  className="responseButton"
                  onClick={() => setResponseInputForComment(commentIndex)}
                >
                  Responder
                </button>
                {responseInputForComment === commentIndex && (
                  <div className="commentInputContainer">
                   <div className="userImgContainer">
              {user?.user_img ? (
                <img
                  src={`http://localhost:4000/images/users/${user.user_img}`}
                />
              ) : (
                <h6 className="avatarText">
                  {user?.user_name.at(0).toUpperCase()}
                </h6>
              )}
              <p className="mb-0">
                {user?.user_name} {user?.user_lastname}
              </p>
            </div>
                    <textarea
                      className="commentInput"
                      type="text"
                      onChange={handleResponseInputChange}
                    />
                    <div className="buttonContainer">
                      <button
                        className="commentButton"
                        onClick={() => setResponseInputForComment(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="commentButton"
                        onClick={() => onSubmit(comment.comment_id)}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                )}
                {allResponses
                  ?.filter(
                    (response) =>
                      response.parent_comment_id === comment.comment_id
                  )
                  .map((response) => (
                    <span key={response.comment_id}>
                      {(user?.type !== 0 || response.comment_is_hidden === 0) && (
                        <div
                          key={response.comment_id}
                          className="responseCont"
                          style={{
                            filter: `${response.comment_is_hidden === 0
                              ? "brightness(1)"
                              : "brightness(0.5)"
                              }`,
                          }}
                        >
                          <div className="commentTitle">
                            <div className="userImgContainer">
                              {response.user_img ? (
                                <img
                                  src={`http://localhost:4000/images/users/${response.user_img}`}
                                />
                              ) : (
                                <h6 className="avatarText">
                                  {response?.user_name.at(0).toUpperCase()}
                                </h6>
                              )}
                            </div>
                            <p className="mb-0 text-capitalize">
                              {response?.user_name} {response?.user_lastname}
                            </p>
                            {(user?.user_id == response.user_id ||
                              user.type === 2) && (
                                <div className="deleteButtonCont">
                                  {response.comment_is_hidden === 0 ? (
                                    <AiOutlineEyeInvisible
                                      className="visible"
                                      onClick={() =>
                                        handleCommentDisable(response.comment_id)
                                      }
                                    />
                                  ) : (
                                    <AiOutlineEye
                                      className="hide"
                                      onClick={() =>
                                        handleCommentEnable(response.comment_id)
                                      }
                                    />
                                  )}
                                </div>
                              )}
                          </div>
                          <p>{response.comment_content}</p>
                        </div>
                      )}
                    </span>
                  ))}
              </div>
            )}
          </span>
        )
      }
      )}
    </div>
  );
};
