# mern


/tu-proyecto
│── /backend
│   │── /config
│   │   ├── database.js           # Conexión a MongoDB
│   │── /controllers
│   │   ├── usuario.controller.js # Controlador para usuarios
│   │── /middlewares
│   │   ├── auth.js               # Middleware de autenticación (JWT)
│   │   ├── multer.js             # Middleware para subida de imágenes
│   │── /models
│   │   ├── usuario.js            # Modelo de Usuario
│   │── /routes
│   │   ├── usuario.js            # Rutas relacionadas con usuarios
│   │── /uploads                  # Carpeta para almacenar imágenes subidas
│   │── .env                       # Variables de entorno
│   │── app.js                     # Configuración principal de Express
│   │── index.js                   # Punto de entrada del servidor
│
│── /frontend
│   │── /src
│   │   ├── /components           # Componentes reutilizables
│   │   ├── /pages
│   │   │   ├── Register.jsx      # Página de Registro de Usuario
│   │   │   ├── Login.jsx         # Página de Inicio de Sesión
│   │   │   ├── Profile.jsx       # Página de Perfil del Usuario
│   │   ├── /services
│   │   │   ├── api.js            # Configuración de Axios para hacer peticiones
│   │   ├── App.jsx               # Componente principal
│   │   ├── main.jsx              # Punto de entrada de React
│   │── package.json               # Dependencias del frontend
│   │── vite.config.js             # Configuración de Vite
│
│── package.json                   # Dependencias del backend
│── README.md                       # Documentación del proyecto