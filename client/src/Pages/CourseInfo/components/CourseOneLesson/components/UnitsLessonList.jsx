import React, { useEffect, useState } from "react";
import { MdOutlinePlayLesson } from "react-icons/md";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const UnitsLessonList = ({ myCourseInfo, user, course_id }) => {
  const [unitsName, setUnitsName] = useState([]);
  const [openUnits, setOpenUnits] = useState([]);
  const navigate = useNavigate();

  // Takes uniques unit_title
  const uniqueUnitNames = Array.from(
    new Set(myCourseInfo?.map((item) => item.unit_tittle))
  );

  useEffect(() => {
    setUnitsName(uniqueUnitNames);
  }, [myCourseInfo]);

  const closedHeight = "0px";
  const openedHeight = "35px";

  // Function to prepare the dropdwon
  const toggleUnit = (unitIndex) => {
    if (openUnits.includes(unitIndex)) {
      // If index exist inside the array, it is deleted
      setOpenUnits(openUnits.filter((index) => index !== unitIndex));
    } else {
      // If index doesn`t exist inside the array, it is added
      setOpenUnits([...openUnits, unitIndex]);
    }
  };
  return (
    <div className="allUnitsLessonCard">
      <div className="listHeadline">
        <h6 className="mb-1">{myCourseInfo && myCourseInfo[0].course_name}</h6>
      </div>
      <div className="listContainer">
        {/* Course name */}
        {unitsName.map((unitName, unitIndex) => {
          const filteredLessons = myCourseInfo.filter(
            (item) => item.unit_tittle === unitName && item.lesson_id !== null
          );
          return (
            <div key={unitIndex} className="unitList">
              <div className="unitTitle">
                <h6>
                  <AiOutlineFolderOpen className="icon2 me-2" />
                  {unitIndex + 1}. {unitName}
                </h6>
                {filteredLessons.length > 0 && (
                  <div
                    className="dropdownContainer"
                    onClick={() => toggleUnit(unitIndex)}
                  >
                    {openUnits.includes(unitIndex) ? (
                      <IoMdArrowDropup />
                    ) : (
                      <IoMdArrowDropdown />
                    )}
                  </div>
                )}
              </div>
              <ol>
                {filteredLessons.map((lesson) => (
                  <li
                    key={lesson.lesson_id}
                    className="listedLesson"
                    style={{
                      height: openUnits.includes(unitIndex)
                        ? openedHeight
                        : closedHeight,
                      transition: "height 0.75s ease-in-out",
                    }}
                    onClick={() =>
                      navigate(
                        `/courses/courseInfo/lessonInfo/${course_id}/${lesson.unit_id}/${lesson.lesson_id}`
                      )
                    }
                  >
                    <div className="lessonTitle">
                      <p className="lessonText">
                        <MdOutlinePlayLesson className="icon3 mb-1 me-1" />
                        {lesson.lesson_title}
                      </p>
                      <BsArrowRightShort className="icon" />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
};
