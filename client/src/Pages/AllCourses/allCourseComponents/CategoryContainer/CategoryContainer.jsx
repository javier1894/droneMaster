import React, { useEffect, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { CourseCard } from "../../../../components/CardCourse/CourseCard";
import { TbDrone } from "react-icons/tb"


export const CategoryContainer = ({
  courseData,
  category_id,
  category_name,
}) => {
  const [courseByCategory, setCourseByCategory] = useState();
  const [counter, setCounter] = useState(0);
  const [counterRatio, setCounterRatio] = useState(1);

  useEffect(() => {
    setCourseByCategory(
      courseData?.filter((course) => course.category_id === category_id)
    );
  }, [courseData]);

  // We use a listener to get the current width for Responsive. Using a counter to know how many cards we need to show.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700 && window.innerWidth < 768) {
        setCounterRatio(1);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        setCounterRatio(2);
      } else if (window.innerWidth >= 1200 && window.innerWidth < 1400) {
        setCounterRatio(3);
      } else if (window.innerWidth >= 1400 && window.innerWidth < 1700) {
        setCounterRatio(4);
      } else if (window.innerWidth >= 1700) {
        setCounterRatio(5);
      };
    }
    handleResize(); // Call initially
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="categoryContainer">
      <h4 className="categoryTitle text-center text-md-start"><span className="iconCat"><TbDrone /></span>{category_name}</h4>
      <div className="courseCardContainerWrapper">
        {counter !== 0 ?
          <div className="navigationButtonContainerLeft">
            <MdNavigateBefore
              className="navigationButton"
              onClick={() => setCounter(counter - counterRatio)}
            />
          </div> : <div className="navigationButtonContainerLeft">
            <MdNavigateBefore
              className="navigationButton opacity-0"
            />
          </div>
        }
        <div className="courseCardContainer">
          {courseByCategory
            ?.slice(counter, counter + counterRatio)
            .map((oneCourse) => {
              return (
                <CourseCard key={oneCourse.course_id} oneCourse={oneCourse} />
              );
            })}
        </div>
        {counter + counterRatio < courseByCategory?.length ?
          <div className="navigationButtonContainerRight">
            <MdNavigateNext
              className="navigationButton"
              onClick={() => setCounter(counter + counterRatio)}
            />
          </div> : <div className="navigationButtonContainerRight">
            <MdNavigateNext
              className="navigationButton opacity-0"
            />
          </div>
        }
      </div>
    </div>
  );
};
