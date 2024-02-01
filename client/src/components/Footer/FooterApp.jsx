import React, { useState } from 'react'
import './footerApp.scss'
import { Container, Row } from 'react-bootstrap'
import logo_DroneMaster from '../../../public/dashboard_images/logo_DroneMaster.png'
import { AiOutlineWhatsApp, AiOutlineTwitter, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineYoutube } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { FormMailModal } from './FormMail/FormMailModal';


export const FooterApp = () => {
    const navigate = useNavigate()
    const [showMailModal, setShowMailModal] = useState(false)

    return (
        <Container fluid className='footer'>
            <Row className='d-flex-column justify-content-center'>
                <hr className='footerLine' />
                <div className='footer1'>
                    <p className='titleFooter1'>MEJORA TUS HABILIDADES PARA UN FUTURO MEJOR</p>
                    <h2>Solicita más información</h2>
                    <hr />
                    <p>Explora los cielos con confianza. Aprende a pilotar drones de manera segura y profesional con nuestros cursos especializados. ¡Eleva tus habilidades con nosotros!</p>
                    <button onClick={() => setShowMailModal(true)} className='btnNormal'>Contáctanos</button>
                    <p>© 2023 DorneMaster SL</p>
                </div>
                <hr className='footerLine' />
                <div className='footer2 d-flex-column d-md-flex justify-content-md-between align-items-md-center text-center'>
                    <img className='logoFooter pb-3 pb-md-0' src={logo_DroneMaster} alt="logo_DroneMaster" />
                    <div className='footerInfo pb-3 pb-md-0'>
                        <a href='#top' onClick={() => { navigate('/') }}>Inicio</a>
                        <a href='#top' onClick={() => { navigate('/about') }}>Acerca de</a>
                        <a href='#top' onClick={() => { navigate('/allCourses') }}>Cursos</a>
                    </div>
                    <div className='footerLinks'>
                        <AiOutlineWhatsApp />
                        <AiOutlineTwitter />
                        <AiOutlineInstagram />
                        <AiOutlineLinkedin />
                        <AiOutlineYoutube />
                    </div>
                </div>
                <FormMailModal showMailModal={showMailModal} setShowMailModal={setShowMailModal} />
            </Row>
        </Container>
    )
}
