import React from "react";
import "./AboutApp.scss";
import { Container } from "react-bootstrap";
import { TbDrone } from "react-icons/tb"

export const AboutApp = () => {
  return (
    <Container fluid className="about">
      <p className="text-center">
        Bienvenidos a{" "}
        <span className="text-warning fs-5 fst-italic">DroneMaster</span>, tu
        destino líder en educación y capacitación especializada en el fascinante
        mundo de los drones aplicados a la agricultura, cuerpos de seguridad y
        bomberos. Nos enorgullece ser la principal fuente de conocimiento y
        habilidades para aquellos que desean dominar las habilidades avanzadas
        necesarias para operar drones en contextos cruciales y específicos.
      </p>
      <div className="paragraph">
        <h3 className="text-warning text-center text-md-start">
          Nuestra Misión
        </h3>
        <p className=" text-center text-md-start">
          Nuestra misión es empoderar a profesionales de diversos sectores
          apasionados de la innovación, brindándoles formación online y
          presencial que les dote de las habilidades y conocimiento necesarios
          para realizar vuelos seguros y eficientes con drones, y para examinar
          los datos resultantes de manera detallada, convirtiéndoles en pilotos
          altamente competentes.
        </p>
        <p className=" text-center text-md-start">
          Buscamos ser el puente que conecta la tecnología dron con las
          necesidades cambiantes de diversos sectores, permitiendo a nuestros
          graduados aplicar sus habilidades de manera impactante en su trabajo
          diario.</p>
      </div>
      <div className="paragraph">
        <h3 className="text-warning text-center text-md-start">
          Visión
        </h3>
        <p className=" text-center text-md-start">
          Aspiramos a ser reconocidos como el estándar de excelencia en la
          formación de pilotos de drones, elevando constantemente la calidad
          de nuestra educación y adaptándonos a las últimas tecnologías y
          tendencias. Nuestra visión abarca la creación de una comunidad global de
          expertos en drones que contribuyan al progreso sostenible de diversos
          sectores en todo el mundo.
        </p>
      </div>
      <div className="paragraph">
        <h3 className="text-warning text-center text-md-start">
          Valores
        </h3>
        <div className="d-flex">
          <div className="d-none d-md-flex pt-1">
            <TbDrone style={{ color: "#f7ab16", paddingRight: "5px", width: "40px" }} />
          </div>
          <p className=" text-center text-md-start">
            Entendemos que la práctica es esencial para el aprendizaje efectivo.
            Por ello, hemos incorporado experiencias prácticas y escenarios
            realistas en nuestros cursos. Los estudiantes tendrán la oportunidad
            de poner en práctica lo aprendido a través de simulaciones y proyectos
            que reflejen situaciones de la vida real en la agricultura moderna y
            en operaciones de seguridad y rescate.
          </p>
        </div>
        <div className="d-flex">
          <div className="d-none d-md-flex pt-1">
            <TbDrone style={{ color: "#f7ab16", paddingRight: "5px", width: "40px" }} />
          </div>
          <p className=" text-center text-md-start">
            Abrazamos la innovación tecnológica y pedagógica en una
            búsqueda continua de nuevas formas de mejorar nuestra formación y
            adaptarnos a las últimas tendencias en el mundo de los drones y el
            análisis de datos.
          </p>
        </div>
        <div className="d-flex">
          <div className="d-none d-md-flex pt-1">
            <TbDrone style={{ color: "#f7ab16", paddingRight: "5px", width: "40px" }} />
          </div>
          <p className=" text-center text-md-start">
            Creemos que compartir conocimientos y experiencias enriquece a todos y
            acelera la adopción efectiva de la tecnología dron en diversos campos.
          </p>
        </div>
        <div className="d-flex">
          <div className="d-none d-md-flex pt-1">
            <TbDrone style={{ color: "#f7ab16", paddingRight: "5px", width: "40px" }} />
          </div>
          <p className=" text-center text-md-start">
            Somos conscientes de la naturaleza cambiante de la tecnología y de los
            sectores a los que servimos. Estamos comprometidos a adaptarnos y
            evolucionar para mantenernos relevantes y a la vanguardia de la
            educación en pilotos de drones.
          </p>
        </div>
      </div>
      <p className="text-center text-warning fs-6 pt-4">
        ¡Explora, Aprende, Lidera con DroneMaster!
      </p>
    </Container>
  );
};
