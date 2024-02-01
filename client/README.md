# DroneMaster

## Descripción
DronMaster es una plataforma de cursos de formación especializados en drones. Los cursos de DronMaster abarcan desde principiantes hasta niveles avanzados, cubriendo temas como pilotaje de drones, normativas y regulaciones, fotogrametría, videografía aérea y más. DronMaster ha sido creada utilizando la tecnología de React, lo que garantiza una experiencia de usuario moderna y altamente interactiva para los estudiantes.

## Características

- Registro de usuarios: Los usuarios pueden crear una cuenta en la aplicación proporcionando su nombre, dirección de correo electrónico y contraseña.
- Inicio de sesión: Los usuarios pueden iniciar sesión en la aplicación utilizando su correo electrónico y contraseña registrados.
- Gestión de libros: Los usuarios pueden agregar libros a su biblioteca personal, marcar libros como leídos o en progreso, y registrar su progreso de lectura.
- Valoraciones y opiniones: Los usuarios pueden asignar una calificación y agregar comentarios sobre los libros que han leído.
- Lista de amigos: Los usuarios pueden buscar y agregar amigos a su red de contactos en la aplicación.
- Interfaz intuitiva: La aplicación ofrece una interfaz de usuario moderna y fácil de usar, con una navegación clara y opciones de búsqueda y filtrado.

## Tecnologías utilizadas

- Backend: JavaScript (Node.js), Express.js, MySQL como base de datos relacional, Nodemailer, Bcrypt, Multer, Jsonwebtoken, dotenv,.
- Frontend: React.js, ReactBootstrap y Axios para las solicitudes HTTP,React Chart JS 2, React Hook Form, React Icons, File Saver, Sass, React Router Dom .

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega hasta el directorio raíz del proyecto server
3. Ejecuta el siguiente comando para instalar las dependencias del backend:
   
   $npm i
   
5. Navega hasta el directorio raíz del proyecto client
6. Ejecuta el siguiente comando para instalar las dependencias del frontend:

   $npm i

## Configuración de la base de datos

1. Crea una base de datos MySQL en tu servidor local o en un servicio de alojamiento de bases de datos.
2. Abre el archivo `config.js` ubicado en el directorio raíz del proyecto.
3. Actualiza los valores de configuración para la conexión a la base de datos según tus propias credenciales:

host: 'localhost',
user: 'tu_usuario',
password: 'tu_contraseña',
database: 'nombre_de_tu_base_de_datos'

## Configuración de correo para nodemailer

1. Crea una dirección de correo corporativa.
2. Al crear la cuenta de correo entra en `configuración` --> `seguridad` --> `inciar sesion en google` --> ` verificación en 2 pasos`. Completar la verificacion.
3. Una vez terminemos la configuración navega a `contraseña de aplicaiones` --> `Seleccionar aplicación` --> `otra (nombre personalizado)`.
4. Rellenar el campo con la palabra `admin` y pulsar en generar. Y te devuelve una contraseña, la cual usaremos posteriormente (IMPORTANTE no perder)
5. Abre el archivo `app.js` ubicado en el directorio raíz del proyecto (server).
6. Actualiza los valores de `user` y `pass` con el correo corporativo creado anteriormente y añade una contraseña de autorización (nueva para nodemailer).


## Configuración del archivo .env

1. Crea un archivo con el nombre `.env`.
2. Abre el archivo `.env` ubicado en el directorio raíz del proyecto.
3. Añade el siguiente contenido:
4. Escribir una palabra SECRETA en el campo de SECRET=`Tu_palabra_secreta`

# desarrollo
# Claves para dase de batos
DB_HOST=localhost
DB_USER='tu_usuario' (el mismo que la Base de Datos)
DB_PASS='tu_contraseña'  (la mismo que la Base de Datos)
DB_NAME='nombre_de_tu_base_de_datos'  (el mismo que la Base de Datos)
# palabra secreta para los token
SECRET=secret
#puerto para conexion servidor
PORT=4000


## Ejecución

1. Desde el directorio raíz del proyecto, ejecuta el siguiente comando para iniciar el servidor backend:

npm run dev


2. Navega hasta el directorio `client` dentro del proyecto y ejecuta el siguiente comando para iniciar el servidor de desarrollo del frontend:

npm run dev


3. Accede a la aplicación en tu navegador web utilizando la dirección [http://localhost:4000].



