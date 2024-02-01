import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { DroneMasterContext } from "../../../../../../context/DroneMasterProvider";
import { useNavigate } from "react-router-dom";

const AdminCard = ({ setShowEditionModal }) => {
  const { user } = useContext(DroneMasterContext);
  const navigate = useNavigate();

  return (
    <div className="AdminCard ">
      <div className="adminCard w-100 ">
        {/* Admin User Picture */}
        <div className="imgContainer">
          {user?.user_img ? (
            <img src={`http://localhost:4000/images/users/${user.user_img}`} />
          ) : (
            <h2 className="avatarText">
              {user?.user_name.at(0).toUpperCase()}
            </h2>
          )}
        </div>

        {/* Admin User Personal information */}
        <div className="textContainer">
          <h6 className="name">
            {user?.user_name} {user?.user_lastname}{" "}
          </h6>
          <p>
            {user?.type == 2 && (
              <>
                <span
                  role="button"
                  className="textHover"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </span>
                <span> / </span>
                <span
                  role="button"
                  className="textHover"
                  onClick={() => navigate("/teacher")}
                >
                  Profesor
                </span>
              </>
            )}
          </p>
        </div>
        <div className="editionButton">
          <div className="editionButton">
            <div
              className="iconButton"
              onClick={() => setShowEditionModal(true)}
            >
              <FaEdit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
