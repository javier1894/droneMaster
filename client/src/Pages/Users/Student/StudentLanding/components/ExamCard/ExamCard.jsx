import React, { useContext, useEffect, useState } from 'react'
import '../../studentLandingStyle.scss'
import '../../../../../../components/EditMyProfileModal/editMyProfileModal.scss'
import { AiFillFile } from "react-icons/ai";
import { DroneMasterContext } from '../../../../../../context/DroneMasterProvider';
import axios from 'axios';
import { RatingModal } from '../RatingModal/RatingModal';

export const ExamCard = ({ setShowRatingModal, showRatingModal, counterRating, score, setCounterRating, setScore }) => {
    const { user, courseMaterial } = useContext(DroneMasterContext)
    const [downloadedExam, setDownloadedExam] = useState(0);
    const [fileExam, setFileExam] = useState();
    const [file, setFile] = useState();
    const [userStatus, setUserStatus] = useState()
    const [teacherEmail, setTeacherEmail] = useState()

    // Getting teacher email
    useEffect(() => {
        if (courseMaterial) {
            axios
                .get(`http://localhost:4000/teachers/teacherEmail/${courseMaterial[0]?.course_id}`)
                .then((res) => setTeacherEmail(res.data[0].email))
                .catch((err) => { })
        }
    }, [courseMaterial])

    // getting score and rating counter from one course
    useEffect(() => {
        if (courseMaterial) {
            axios
                .get(`http://localhost:4000/students/scoreCounterRating/${courseMaterial[0]?.course_id}`)
                .then((res) => {
                    setScore(parseFloat(res.data[0].score))
                    setCounterRating(parseInt(res.data[0].counter_rating))
                })
                .catch((err) => { })
        }
    }, [courseMaterial, showRatingModal, score, counterRating])

    // Getting student status to check if student has finished the course
    useEffect(() => {
        if (courseMaterial) {
            axios
                .get(`http://localhost:4000/students/studentStatus/${user.user_id}/${courseMaterial[0]?.course_id}`)
                .then((res) => setUserStatus(res.data[0].status))
                .catch((err) => { })
        }
    }, [courseMaterial, downloadedExam, userStatus])

    // Getting exam name to download
    useEffect(() => {
        if (courseMaterial) {
            axios
                .get(`http://localhost:4000/downloadExam/${courseMaterial[0]?.course_id}`)
                .then((res) => setFileExam(res.data[0].exam_file))
                .catch((err) => { })
        }
    }, [courseMaterial, downloadedExam, userStatus])

    const handleImgChange = (e) => {
        setFile(e.target.files[0])
    }

    // Function to upload the exam into a data base
    const uploadFileExam = async () => {
        const newFormData = new FormData()
        if (file !== undefined) {
            newFormData.append("file", file)
        }

        axios
            .post(`http://localhost:4000/students/uploadExam/${user.user_id}/${courseMaterial[0]?.course_id}`, newFormData)
            .then((res) => {
                setShowRatingModal(true)
                setDownloadedExam(3)
                setUserStatus(2)
            })
            .catch((err) => { })

        try {
            const response = await fetch("http://localhost:4000/infoEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_name: user.user_name, user_lastname: user.user_lastname, phone: user.phone, email: user.email, course_name: courseMaterial[0]?.course_name, status: 2, teacher_email: teacherEmail }),
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="coursesTableCard">
            <div className="cardTitle justify-content-center">
                <div className="titleStudent">
                    <h3 className="titleText text-center text-warning">Realiza tu examen</h3>
                </div>
            </div>
            <div className="cardBody">
                <p className="fst-italic"><span style={{ color: '#f7ab16' }}>Importante:</span> El examen será descargado al clicar en el archivo de descarga. Una vez realizado el examen, deberá subirlo de nuevo en la misma pestaña. Una vez subido el examen el curso se considera completado a la espera de la correción del examen por parte del profesor</p>
            </div>

            {(downloadedExam === 0 && userStatus === 1) && <div className='text-center'>
                <AiFillFile
                    size={60}
                    role="button"
                    className="file"
                    onClick={() => { setDownloadedExam(1) }}
                />
                <p className='fst-italic' style={{ color: '#f7ab16' }}>Descargar examen</p>
            </div>}
            {(downloadedExam === 1 && userStatus === 1) && <div className='d-flex justify-content-center gap-5'>
                {!file && <>
                    <input
                        type="file"
                        onChange={handleImgChange}
                        className="inputFileExam text-center"
                        id="inputFile"
                    />
                    <label htmlFor="inputFile" className="inputImageLabel btnNormal" onChange={handleImgChange}>
                        Cargar Examen
                    </label></>}

                {file && <button className='btnNormal' onClick={uploadFileExam}>Subir Examen</button>}
            </div>}
            {(userStatus === 2 || userStatus === 3 || userStatus === 4) && <div className='d-flex justify-content-center align-items-center gap-2'>
                <p className='m-0'>Calificación:</p>
                {userStatus === 3 && <h2 style={{ color: 'red', margin: '0' }}>NO APTO</h2>}
                {userStatus === 4 && <h2 style={{ color: 'green', margin: '0' }}>APTO</h2>}
            </div>}
            {(downloadedExam === 1 && userStatus === 1) && <iframe
                src={`http://localhost:4000/images/coursesExam/${fileExam}`}
                title="PDF Viewer"
                width="100%"
                height="700px"
            ></iframe>}
            <RatingModal setShowRatingModal={setShowRatingModal} showRatingModal={showRatingModal} score={score} counterRating={counterRating} setScore={setScore} setCounterRating={setCounterRating} />
        </div>
    )
}
