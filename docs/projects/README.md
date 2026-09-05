# 🛠️ Progresión Práctica de Proyectos para tu Portfolio

Un reclutador técnico o un líder de ingeniería sénior tarda menos de 60 segundos en juzgar tu valor profesional al abrir tu perfil de GitHub. Si tus únicos proyectos son la enésima calculadora básica copiada de un tutorial o un clon superficial de Twitter sin pruebas ni base de datos, tu candidatura será descartada.

Para destacar en el mercado actual, tus proyectos deben responder a especificaciones claras, resolver un problema real, tener pruebas automatizadas, estar empaquetados en Docker y poder ejecutarse con un solo comando.

A continuación tienes una progresión de 5 niveles diseñada para construir un portfolio de calibre profesional.

---

## 🗺️ Visión General de la Progresión

```
[ Nivel 0: Dominio de Sintaxis y Lógica ] ──────> CLI / Utilidad de Consola con Testing
                     │
                     ▼
[ Nivel 1: Datos y Consumo Web ] ──────────────> CRUD con Persistencia y Consumo de API
                     │
                     ▼
[ Nivel 2: Arquitectura y Seguridad ] ─────────> API REST con Base de Datos SQL, JWT y Tests
                     │
                     ▼
[ Nivel 3: Aplicación Fullstack Profesional ] ─> App Completa Dockerizada con CI/CD y Deploy
                     │
                     ▼
[ Nivel 4: Sistemas Distribuidos y Escala ] ───> Colas de Mensajería, Caché Redis y Observabilidad
```

---

## Nivel 0: El Primer Escalón (Lógica, Tipado y CLI)

### Proyecto Recomendado: Analizador Financiero / Validador de Datos por Consola (CLI)
* **Objetivo**: Construir una herramienta de terminal que procese archivos de datos estructurados (CSV, JSON), realice validaciones y genere un reporte estadístico sin depender de frameworks web.
* **Conocimientos necesarios**: Variables, condicionales, bucles, funciones puras, lectura/escritura en disco, manejo de excepciones y parsing de argumentos de línea de comandos (`sys.argv` o `argparse`).
* **Funcionalidades requeridas**:
  * Aceptar flags de terminal (ej. `--input transacciones.csv --min-monto 100 --moneda USD`).
  * Validar cada fila: ignorar filas corruptas y registrar un log de advertencia sin detener el proceso.
  * Calcular balance total, promedio de gasto y categorización por etiquetas.
  * Emitir una tabla formateada en la terminal o exportar un resumen en JSON limpio.
* **Tecnologías sugeridas**: Python o TypeScript/Node.js (usando bibliotecas estándar nativas).
* **Qué demuestra en tu portfolio**: Dominio de la lógica de programación pura, manejo robusto de errores de usuario y capacidad de escribir scripts limpios y probados sin apoyarse en muletas visuales.

---

## Nivel 1: Persistencia y Consumo de APIs Externas

### Proyecto Recomendado: Monitor Meteorológico o Rastreador de Divisas con Interfaz Interactiva
* **Objetivo**: Consumir datos asíncronos de una API pública externa (ej. OpenWeather API, CoinGecko API), gestionar estados de carga/error y permitir al usuario guardar preferencias persistentes.
* **Conocimientos necesarios**: Peticiones HTTP asíncronas (`fetch`, `async/await`), manipulación del DOM o estado reactivo básico, manejo de `localStorage` o base de datos SQLite ligera.
* **Funcionalidades requeridas**:
  * Búsqueda dinámica con debounce para no saturar de peticiones la API externa.
  * Manejo estricto de tres estados de UI: **Cargando (*Loading*)**, **Éxito (*Data*)** y **Error de Red (*Error Fallback*)**.
  * Guardar ciudades o monedas favoritas en persistencia local.
  * Visualización de datos históricos mediante una gráfica sencilla (ej. Chart.js).
* **Tecnologías sugeridas**: Frontend con React o Vue + TypeScript (o Vanilla JS impecable).
* **Qué demuestra en tu portfolio**: Comprensión del ciclo de vida asíncrono, diseño de interfaces resilientes a fallos de red y consumo estricto de APIs externas.

---

## Nivel 2: La API REST Profesional (Arquitectura, SQL y Auth)

### Proyecto Recomendado: API de Gestión de Inventario y Pedidos para E-Commerce
* **Objetivo**: Construir un backend robusto con separación de capas (*Router - Service - Repository*), modelado de datos relacional y autenticación de usuarios.
* **Conocimientos necesarios**: Node.js/Express o Python/FastAPI o Go, PostgreSQL, migraciones de base de datos, hashing con Bcrypt, tokens JWT y pruebas automatizadas con Jest/Pytest.
* **Funcionalidades requeridas**:
  * **Autenticación y Autorización**: Rutas `/api/v1/auth/register` y `/api/v1/auth/login`. Roles de usuario: `CLIENTE` (solo ve y crea sus pedidos) y `ADMIN` (gestiona catálogo y stock).
  * **Relaciones SQL**: Tablas `usuarios`, `productos`, `pedidos` y `items_pedido` (relación N:M).
  * **Transacciones ACID**: Al confirmar un pedido, restar el stock del producto y crear el registro de orden dentro de una transacción indivisible; si no hay stock suficiente, abortar con `Rollback`.
  * **Validación de Entradas**: Middleware que valide estrictamente los esquemas JSON entrantes con Zod o Pydantic.
  * **Suite de Pruebas**: Pruebas unitarias para la lógica de negocio y pruebas de integración para los endpoints HTTP con base de datos en memoria o de test.
* **Qué demuestra en tu portfolio**: Criterio de ingeniería backend, seguridad básica, modelado relacional consistente y disciplina de pruebas automáticas.

---

## Nivel 3: Aplicación Fullstack Desplegada (Docker & CI/CD)

### Proyecto Recomendado: Plataforma Colaborativa de Documentación o Feedback (SaaS Clone)
* **Objetivo**: Desarrollar una aplicación completa de extremo a extremo, empaquetarla con Docker Compose, configurar un pipeline de integración continua y desplegarla en un entorno público accesible.
* **Conocimientos necesarios**: Frontend moderno (Next.js o React/Vite), Backend con API REST, PostgreSQL, Docker, Docker Compose, GitHub Actions, y despliegue en plataformas como Render, Railway o AWS.
* **Funcionalidades requeridas**:
  * Interfaz de usuario responsiva, accesible y estilizada profesionalmente.
  * Subida de archivos o imágenes a un almacenamiento de objetos tipo S3 (o bucket compatible).
  * `Dockerfile` multi-stage optimizado para producción.
  * `docker-compose.yml` que levante el Frontend, la API y PostgreSQL localmente con `docker compose up`.
  * Flujo de GitHub Actions que ejecute linters y pruebas en cada Pull Request.
  * **URL pública activa** añadida en la cabecera del README con credenciales de prueba (`demo@empresa.com / ClaveDemo123`).
* **Qué demuestra en tu portfolio**: Madurez técnica total para un perfil junior: eres capaz de llevar una idea desde el concepto hasta producción automatizada.

---

## Nivel 4: Arquitectura Distribuida y Escala (Mensajería, Caché y Logs)

### Proyecto Recomendado: Motor de Notificaciones Masivas y Procesamiento Asíncrono de Reportes
* **Objetivo**: Diseñar un sistema desacoplado capaz de absorber picos repentinos de tráfico sin degradar el tiempo de respuesta de los usuarios.
* **Conocimientos necesarios**: Microservicios o Monolito Modular, Colas de Mensajería (RabbitMQ o Redis BullMQ), Caché en memoria (Redis), Observabilidad (OpenTelemetry, Prometheus, Grafana).
* **Funcionalidades requeridas**:
  * **Endpoint Asíncrono**: El usuario solicita un reporte pesado en PDF/Excel; la API encola la tarea en RabbitMQ y responde inmediatamente `202 Accepted` con un `ticket_id`.
  * **Worker en Background**: Un servicio independiente consume la tarea de la cola, genera el reporte y notifica al usuario (vía WebSocket o email).
  * **Estrategia de Caché**: Redis implementando el patrón *Cache-Aside* con invalidación por eventos y TTL.
  * **Rate Limiting Distribuido**: Algoritmo *Token Bucket* implementado sobre Redis para limitar peticiones por IP.
  * **Observabilidad**: Métricas de latencia de peticiones y logs estructurados en JSON.
* **Qué demuestra en tu portfolio**: Conocimientos avanzados de System Design, tolerancia a fallos y visión de escala empresarial.

---

## 📚 Recursos Recomendados del Tema

* **Repositorio con cientos de proyectos prácticos por lenguaje**: [practical-tutorials / project-based-learning](https://github.com/practical-tutorials/project-based-learning)
* **Catálogo de ideas de proyectos por dificultad**: [roadmap.sh / projects](https://roadmap.sh/projects)
* **Retos de interfaz con diseño profesional en Figma**: [Frontend Mentor](https://www.frontendmentor.io)

---

👉 **Siguiente paso:** **[Preparación de Carrera, CV, GitHub y Entrevistas Técnicas](../career/README.md)**
