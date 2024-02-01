import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlinePhone } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { AiOutlineIdcard } from "react-icons/ai";

export const UserCardInfo = ({ user }) => {
  return (
    <div className="userInfoCard">
      <div className="cardTitle">
        <div className="iconContainer">
          <BiSolidUserDetail />
        </div>
        <div className="title">
          <h6 className="titleText mb-0">Mis Datos</h6>
        </div>
      </div>
      <div className="cardBody">
     
          {/* User Email */}

          <div className="lineInfo">
            <span className="infoIcon">
              <HiOutlineMail />
            </span>
            <p>{user?.email}</p>
          </div>

          {/* User Address */}

          <div className="lineInfo">
            <span className="infoIcon">
              <FiMapPin />
            </span>
            {user?.address ? (
              <p> {user.address} </p>
            ) : (
              <p className="noInfoText"> Información no disponible </p>
            )}
          </div>
   

          {/* User phone */}
          <div className="lineInfo">
            <span className="infoIcon">
              <AiOutlinePhone />
            </span>
            {user?.phone ? (
              <p> {user.phone} </p>
            ) : (
              <p className="noInfoText"> Información no disponible </p>
            )}
          </div>

          {/* User Identification */}
          <div className="lineInfo">
            <span className="infoIcon">
              <AiOutlineIdcard />
            </span>
            {user?.passport ? (
              <p> {user.passport} </p>
            ) : (
              <p className="noInfoText"> Información no disponible </p>
            )}
          </div>
        
      </div>
    </div>
  );
};
