# ⚙️ Ruta de Especialización: Backend Engineering

El desarrollo Backend es el cerebro invisible del software: se encarga del procesamiento de reglas de negocio, la integridad de los datos, la autenticación de usuarios, la seguridad transaccional y la escalabilidad bajo alta demanda de tráfico.

---

## 🗺️ El Camino Progresivo del Backend

```
[ 1. Dominio de un Lenguaje de Servidor (Node/TS, Python, Go o Java) ]
                               │
                               ▼
[ 2. Protocolo HTTP, Códigos de Estado y Arquitectura RESTful ]
                               │
                               ▼
[ 3. Framework Web y Middleware (Express/Fastify, FastAPI, Spring) ]
                               │
                               ▼
[ 4. Validación Estricta de Entradas (Zod, Pydantic) ]
                               │
                               ▼
[ 5. Autenticación Segura (Hashing Bcrypt/Argon2, JWT, OAuth2) ]
                               │
                               ▼
[ 6. Persistencia en Base de Datos (SQL, Migraciones, ORMs) ]
                               │
                               ▼
[ 7. Testing Automatizado (Unitario e Integración con BD de prueba) ]
                               │
                               ▼
[ 8. Logging Estructurado, Manejo Centralizado de Errores y Seguridad ]
                               │
                               ▼
[ 9. Empaquetado en Docker y Despliegue en la Nube ]
```

---

## 1. Anatomía de un Servidor Backend Profesional

Todo servidor backend sigue un flujo de capas (*Layered Architecture* o *Clean Architecture* básica) para separar responsabilidades:

```
[ Petición HTTP entrante ]
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ 1. Capa de Transporte / Enrutador (Router / Controller)│ -> Valida formato y extrae datos
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 2. Capa de Lógica de Negocio (Service / Use Case)      │ -> Reglas del negocio y cálculos
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 3. Capa de Acceso a Datos (Repository / DAO)           │ -> Consultas a Base de Datos
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
                  [ Base de Datos / SQL ]
```

---

## 2. Ejemplo Práctico: API REST con Express y TypeScript

A continuación se muestra una API REST con tipado estricto, manejo de middleware y validaciones:

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json()); // Middleware esencial para parsear cuerpos JSON

// 1. Modelo de Datos
interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
  creadoEn: string;
}

// Almacén en memoria simulado (en producción sería una Base de Datos)
let tareasDB: Tarea[] = [];
let consecutivoId = 1;

// 2. Middleware de Registro de Peticiones (Logging)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Pasa el control a la siguiente función
});

// 3. GET /api/v1/tareas - Listado con paginación
app.get('/api/v1/tareas', (req: Request, res: Response) => {
  res.status(200).json({
    exito: true,
    total: tareasDB.length,
    datos: tareasDB
  });
});

// 4. POST /api/v1/tareas - Creación con validación estricta de entrada
app.post('/api/v1/tareas', (req: Request, res: Response) => {
  const { titulo } = req.body;

  // Validación defensiva
  if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
    return res.status(400).json({
      exito: false,
      error: 'Parámetro inválido',
      mensaje: "El campo 'titulo' es mandatorio y debe ser una cadena de texto no vacía."
    });
  }

  const nuevaTarea: Tarea = {
    id: consecutivoId++,
    titulo: titulo.trim(),
    completada: false,
    creadoEn: new Date().toISOString()
  };

  tareasDB.push(nuevaTarea);
  return res.status(201).json({ exito: true, datos: nuevaTarea });
});

// 5. Middleware Centralizado de Errores (Siempre al final)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[ERROR NO CONTROLADO]:', err.stack);
  res.status(500).json({
    exito: false,
    error: 'Error Interno del Servidor',
    mensaje: 'Ha ocurrido un error inesperado. El incidente ha sido registrado.'
  });
});

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => console.log(`🚀 Servidor activo en http://localhost:${PUERTO}`));
```

---

## 3. Seguridad Nuclear en Backend

### A. Almacenamiento Seguro de Contraseñas
* **Regla Inquebrantable**: **NUNCA almacenes una contraseña en texto plano ni uses funciones hash rápidas como MD5 o SHA-256**. Un atacante con acceso a la base de datos puede descifrar contraseñas con tablas *Rainbow* en segundos.
* **Solución**: Usa algoritmos criptográficos lentos diseñados para contraseñas con *salt* automático: **Bcrypt** o **Argon2id**.

### B. Prevención de Inyecciones SQL (SQL Injection)
* ❌ **Vulnerable**: `db.query("SELECT * FROM usuarios WHERE email = '" + email + "'");` (Permite a un atacante inyectar `' OR '1'='1`).
* ✅ **Seguro**: Consultas parametrizadas (*Prepared Statements*):
  ```typescript
  db.query("SELECT * FROM usuarios WHERE email = $1", [email]);
  ```

### C. Rate Limiting y Protección DoS
Implementa siempre limitadores de peticiones (ej. `express-rate-limit`) en rutas de login y registro para evitar ataques de fuerza bruta.

---

## 4. Estilos de Comunicación entre Servicios

1. **REST (HTTP/JSON)**: El estándar universal por su simpleza y compatibilidad con cualquier cliente.
2. **GraphQL**: Permite al cliente solicitar exactamente los campos que necesita, reduciendo el *over-fetching* y *under-fetching*. Excelente para interfaces complejas con muchas entidades interconectadas.
3. **gRPC (HTTP/2 y Protocol Buffers)**: Comunicación binaria ultrarrápida y fuertemente tipada entre microservicios internos.
4. **WebSockets**: Conexión bidireccional permanente en tiempo real (chats, cotizaciones en vivo, juegos colaborativos).

---

## 📚 Recursos Recomendados del Tema

* **Guías oficiales de Node.js**: [Node.js Official Learn Guides](https://nodejs.org/en/learn)
* **Documentación oficial de Express**: [Express.js Docs](https://expressjs.com)
* **Tutorial oficial de FastAPI**: [FastAPI Tutorial & Docs](https://fastapi.tiangolo.com)
* **Certificación gratuita de backend**: [freeCodeCamp – Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/)
* **Referencia técnica de autenticación**: [JWT.io – Introduction to JSON Web Tokens](https://jwt.io/introduction)

---

👉 **Siguiente paso:** **[Bases de Datos, SQL y Modelado de Información](../databases/README.md)**
