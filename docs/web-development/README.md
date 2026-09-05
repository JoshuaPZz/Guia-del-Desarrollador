# 🌐 Fundamentos del Desarrollo Web y Arquitectura HTTP

La web no es una pantalla gráfica; es una red global de intercambio de mensajes estructurados entre computadoras conectadas. Ya sea que te especialices en Frontend, Backend, Seguridad o DevOps, el dominio de los protocolos web es el cimiento de todo lo que construirás.

---

## 1. ¿Cómo Funciona Realmente Internet?

Internet es una red global de computadoras interconectadas que se comunican mediante la suite de protocolos **TCP/IP**.

Cuando escribes en tu navegador `https://api.midominio.com/usuarios` y presionas Enter, ocurre una coreografía en milisegundos:

```
[ 1. Navegador ] ──(Consulta DNS)──> [ Servidor DNS ] ──(Retorna IP 198.51.100.42)──┐
       │                                                                            │
       │<───────────────────────────────────────────────────────────────────────────┘
       ▼
[ 2. Handshake TCP ] (SYN ──> SYN-ACK ──> ACK) con el Servidor en puerto 443
       ▼
[ 3. Handshake TLS ] (Negociación de llaves criptográficas y certificado SSL)
       ▼
[ 4. Petición HTTP ] ──(GET /usuarios HTTP/1.1)──> [ Servidor Web / API ]
       │                                                    │
       │                                           (Consulta a Base de Datos)
       │                                                    │
       ▼                                                    ▼
[ 5. Respuesta HTTP ] <──(200 OK + JSON [ ... ])────────────┘
```

1. **Resolución DNS**: El navegador no sabe qué es `midominio.com`. Pregunta al Servidor de Nombres de Dominio (DNS) para traducir ese nombre legible a una **Dirección IP** numérica (ej. `198.51.100.42`).
2. **Conexión TCP (*Three-Way Handshake*)**: Se establece un canal confiable entre el cliente y el servidor:
   * Cliente envía paquete `SYN` (Sincronización).
   * Servidor responde `SYN-ACK` (Sincronización + Reconocimiento).
   * Cliente responde `ACK` (Reconocimiento). La conexión queda abierta.
3. **Cifrado TLS (*Transport Layer Security*)**: Si la URL es `https`, cliente y servidor negocian algoritmos criptográficos para cifrar los datos, de modo que nadie en la red Wi-Fi o ISP pueda leerlos.
4. **Intercambio HTTP**: Se envían bytes que representan la petición y se recibe la respuesta.

---

## 2. Anatomía de una Transacción HTTP

HTTP es un protocolo de texto plano basado en el paradigma **Petición - Respuesta (Request - Response)** y es por definición **sin estado (*Stateless*)**: el servidor no recuerda peticiones anteriores a menos que explícitamente se gestione una sesión.

### A. La Petición HTTP (Request)
```http
POST /api/v1/productos HTTP/1.1
Host: api.tienda.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
Accept: application/json

{
  "nombre": "Teclado Mecánico RGB",
  "precio": 89.99,
  "stock": 25
}
```
* **Línea de Inicio**: Verbo HTTP (`POST`), recurso (`/api/v1/productos`) y versión del protocolo (`HTTP/1.1`).
* **Cabeceras (*Headers*)**: Metadatos clave-valor (tipo de contenido, tokens de autenticación, agente).
* **Cuerpo (*Body*)**: Los datos que se transmiten al servidor (comúnmente en formato JSON).

### B. La Respuesta HTTP (Response)
```http
HTTP/1.1 201 Created
Date: Fri, 04 Sep 2026 20:30:00 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 78

{
  "id": 402,
  "nombre": "Teclado Mecánico RGB",
  "precio": 89.99,
  "creadoEn": "2026-09-04T20:30:00Z"
}
```

---

## 3. Códigos de Estado HTTP Esenciales

Los códigos de respuesta están estandarizados por categorías:

| Rango | Significado | Ejemplos Comunes |
|---|---|---|
| **`2xx`** | Éxito | `200 OK` (operación exitosa), `201 Created` (recurso creado con éxito), `204 No Content` (éxito sin contenido de retorno). |
| **`3xx`** | Redirección | `301 Moved Permanently` (recurso mudado permanentemente), `304 Not Modified` (el navegador puede usar su copia en caché). |
| **`4xx`** | Error del Cliente | `400 Bad Request` (datos enviados incorrectos o faltantes), `401 Unauthorized` (falta autenticarse), `403 Forbidden` (autenticado pero sin permisos), `404 Not Found` (recurso inexistente), `422 Unprocessable Entity` (datos bien formados pero lógicamente inválidos). |
| **`5xx`** | Error del Servidor | `500 Internal Server Error` (excepción no controlada en el backend), `502 Bad Gateway` (el servidor proxy no recibió respuesta del servidor de aplicación), `503 Service Unavailable` (servidor sobrecargado o en mantenimiento). |

---

## 4. Principios del Diseño REST (Representational State Transfer)

REST es un conjunto de restricciones arquitectónicas para construir APIs consistentes y predecibles:

1. **Uso de Sustantivos en Plural para Recursos**:
   * ✅ `GET /api/v1/usuarios` (Obtener lista)
   * ✅ `GET /api/v1/usuarios/15` (Obtener usuario con id 15)
   * ❌ `GET /api/v1/obtenerUsuarios` (Antipatrón: usar verbos en la URL)
2. **Correspondencia Semántica de Verbos HTTP**:
   * `GET`: Solo lectura de datos. Debe ser **seguro** (no modificar nada en el servidor) e **idempotente** (ejecutarlo 1 o 100 veces da el mismo resultado).
   * `POST`: Creación de un nuevo recurso subordinado. No es idempotente.
   * `PUT`: Reemplazo completo de un recurso existente. Es idempotente.
   * `PATCH`: Modificación parcial de un recurso (ej. actualizar solo el email).
   * `DELETE`: Eliminación de un recurso. Es idempotente.

---

## 5. Estado en la Web: Cookies, Sesiones y JWT

Como HTTP es *stateless*, ¿cómo sabe el servidor quién eres cuando cambias de página?

```
┌────────────────────────┬───────────────────────────────────────────┬──────────────────────────────────────────┐
│ Mecanismo              │ ¿Dónde se Almacena?                       │ Características Principales              │
├────────────────────────┼───────────────────────────────────────────┼──────────────────────────────────────────┤
│ **Cookies**            │ En el navegador (enviadas automáticamente │ Limitadas a 4KB. Si usan las flags       │
│                        │ en cada petición al mismo dominio).       │ `HttpOnly` y `Secure`, son seguras       │
│                        │                                           │ contra robo vía JavaScript (XSS).        │
├────────────────────────┼───────────────────────────────────────────┼──────────────────────────────────────────┤
│ **Session (Servidor)** │ El estado en la memoria/BD del servidor;  │ Muy seguro, pero requiere almacenamiento │
│                        │ solo un `session_id` opaco en la cookie.  │ centralizado (como Redis) al escalar     │
│                        │                                           │ a múltiples servidores.                  │
├────────────────────────┼───────────────────────────────────────────┼──────────────────────────────────────────┤
│ **JWT (JSON Web Token)│ En el cliente (Cookie segura o memoria).  │ **Stateless y Cifrado criptográficamente**.│
│                        │                                           │ El servidor valida la firma sin consultar│
│                        │                                           │ la base de datos en cada petición.       │
└────────────────────────┴───────────────────────────────────────────┴──────────────────────────────────────────┘
```

---

## 6. CORS (*Cross-Origin Resource Sharing*)

El error de CORS es el dolor de cabeza número uno de los desarrolladores novatos:
```text
Access to fetch at 'https://api.servidor.com' from origin 'http://localhost:3000' 
has been blocked by CORS policy.
```

### ¿Por qué existe CORS?
CORS es un mecanismo de **seguridad implementado exclusivamente por los navegadores web** (no por Postman ni por llamadas entre servidores). Su propósito es evitar que un sitio malicioso (`hacker.com`) haga peticiones invisibles a tu banco (`mibanco.com`) aprovechándose de tus cookies guardadas.

### ¿Cómo se resuelve correctamente?
Configurando en tu servidor backend las cabeceras HTTP que declaran qué dominios tienen permiso para consumir la API:
```http
Access-Control-Allow-Origin: https://miapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## 7. La División: Frontend vs. Backend

```
          NAVEGADOR DEL USUARIO                          INFRAESTRUCTURA DEL SERVIDOR
 ┌──────────────────────────────────────┐             ┌──────────────────────────────────────┐
 │             FRONTEND                 │             │              BACKEND                 │
 │  - Corre en la máquina del cliente   │   Petición  │  - Corre en tus servidores o nube    │
 │  - HTML, CSS, JavaScript/TypeScript  │ ──────────> │  - Node.js, Python, Java, Go, C#     │
 │  - Manipulación visual y UX          │    HTTP     │  - Lógica de negocio y validación    │
 │  - NUNCA es un entorno seguro: el    │ <────────── │  - Conexión a Base de Datos          │
 │    usuario tiene acceso al código    │   JSON      │  - Manejo de contraseñas y pagos     │
 └──────────────────────────────────────┘             └──────────────────────────────────────┘
```

* **Regla de oro de seguridad**: **Nunca confíes en el Frontend**. Toda validación que hagas en el navegador (validar un formulario, verificar un precio) debe ser re-validada obligatoriamente en el Backend. Cualquier usuario con conocimientos básicos puede abrir la consola de desarrollador y enviar peticiones directas saltándose las reglas visuales.

---

## 📚 Recursos Recomendados del Tema

* **Guía completa oficial**: [MDN – How the Web Works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)
* **Curso intensivo de HTTP**: [freeCodeCamp – HTTP Crash Course](https://www.youtube.com/@freecodecamp)
* **Curso de redes de computadoras**: [freeCodeCamp – Computer Networking Course](https://www.youtube.com/@freecodecamp)
* **Guía de diseño RESTful**: [RESTful API Design Guide](https://restfulapi.net)

---

👉 **Elige tu siguiente especialización:**
* Para interfaces de usuario: **[Ruta de Especialización Frontend](../frontend/README.md)**
* Para servidores y APIs: **[Ruta de Especialización Backend](../backend/README.md)**
