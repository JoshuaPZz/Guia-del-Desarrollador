# 📖 Glosario Fundamental del Ingeniero de Software

Cuando comienzas en el mundo del desarrollo, la mayor barrera no es la lógica, sino la avalancha de términos técnicos que las personas del sector dan por sentados. 

Este documento explica **los 27 conceptos nucleares del desarrollo de software**, utilizando analogías claras y definiciones técnicas precisas para que nunca más te sientas perdido en una conversación técnica.

---

## 1. Fundamentos de Programación

### ¿Qué es una Variable?
Una **variable** es una caja etiquetada en la memoria RAM de tu computadora donde guardas un valor para usarlo o modificarlo más adelante en tu programa. Tiene un **nombre** (identificador), un **tipo** (ej. texto, número entero) y un **contenido** (el valor actual).
> *Analogía*: Una etiqueta con el nombre `edad` pegada en una caja donde guardas el número `25`. Si cumples años, cambias el número dentro de la caja por `26`, pero la etiqueta sigue siendo la misma.

### ¿Qué es una Función?
Una **función** es un bloque de código reutilizable con un nombre que realiza una tarea específica. Recibe datos de entrada (*parámetros*), procesa esos datos y opcionalmente devuelve un resultado de salida (*retorno*).
> *Analogía*: Una licuadora. Le introduces fruta y leche (entradas), presiona un botón (ejecución de la función) y obtienes un batido (resultado de retorno). No tienes que construir una licuadora nueva cada vez que quieres un batido.

---

## 2. Reutilización de Código y Modularidad

### ¿Qué es una Dependencia?
Una **dependencia** es cualquier fragmento de código escrito por otra persona o equipo del cual depende tu propio programa para poder funcionar. Si tu proyecto necesita generar archivos PDF y utilizas un módulo ya existente para hacerlo, ese módulo es una dependencia de tu proyecto.

### ¿Qué es un Paquete (*Package*)?
Un **paquete** es un conjunto de archivos de código relacionados, empaquetados en un formato estándar junto con un archivo de metadatos (como `package.json` en Node o `pyproject.toml` en Python) que describe su versión, autor y las dependencias que necesita para funcionar.

### ¿Qué es una Librería (*Library*)?
Una **librería** es una colección de funciones y clases pre-escritas que tú puedes importar en tu código para resolver problemas específicos (ej. formatear fechas, hacer cálculos matemáticos, enviar emails). 
* **Regla clave**: **Tú tienes el control**. Tú decides cuándo invocar a la librería y cuándo no.

### ¿Qué es un Framework?
Un **framework** (marco de trabajo) es una estructura completa que define la arquitectura y el flujo de vida de tu aplicación. Te proporciona un esqueleto predefinido y tú rellenas los huecos con tu lógica de negocio.
* **Diferencia crucial (Inversión de Control)**: En una **librería**, tu código llama a la librería. En un **framework**, el framework es quien llama a tu código cuando él lo decide (por ejemplo, cuando llega una petición web).

---

## 3. Redes y Comunicación Web

### ¿Qué es un Servidor?
Un **servidor** tiene dos significados según el contexto:
1. **Físico**: Una computadora conectada a Internet las 24 horas del día, los 7 días de la semana, diseñada para no apagarse nunca.
2. **Lógico / Software**: Un programa que se queda escuchando peticiones en un puerto de red específico (ej. puerto 80 o 443) y responde a las solicitudes de los clientes (navegadores, apps móviles).

### ¿Qué es HTTP / HTTPS?
**HTTP** (*Hypertext Transfer Protocol*) es el conjunto de reglas y formato de texto estandarizado mediante el cual los navegadores web y los servidores intercambian información. 
* **HTTPS** es la versión segura de HTTP, donde toda la comunicación viaja cifrada mediante algoritmos criptográficos (TLS/SSL), impidiendo que intermediarios en la red puedan espiar tus contraseñas o datos bancarios.

### ¿Qué es una API (*Application Programming Interface*)?
Una **API** es un contrato o conjunto de reglas que permite que dos programas de software se comuniquen entre sí. En el desarrollo web, una API suele ser un conjunto de URLs (*endpoints*) que permiten a una aplicación cliente solicitar o modificar datos en un servidor (ej. la API de Google Maps te permite consultar rutas desde tu propia app).

### ¿Qué es JSON (*JavaScript Object Notation*)?
**JSON** es el formato de texto estándar más popular del mundo para intercambiar datos entre servidores y clientes. Es ligero, independiente del lenguaje y fácil de leer tanto por humanos como por máquinas:
```json
{
  "id": 101,
  "nombre": "Sofia Ramirez",
  "estaActivo": true,
  "roles": ["developer", "admin"]
}
```

---

## 4. Persistencia y Bases de Datos

### ¿Qué es una Base de Datos?
Una **base de datos** es un sistema de software especializado diseñado para almacenar, organizar, indexar y recuperar grandes volúmenes de información de manera rápida, segura y consistente, garantizando que los datos no se pierdan cuando el servidor se apaga o se reinicia.

### ¿Qué es SQL (*Structured Query Language*)?
**SQL** es el lenguaje estándar utilizado para interactuar con bases de datos relacionales (como PostgreSQL, MySQL o SQLite). Te permite crear esquemas de datos, insertar registros, modificarlos y realizar consultas complejas para filtrar y cruzar millones de filas de información:
```sql
SELECT nombre, email FROM usuarios WHERE edad >= 18;
```

---

## 5. Control de Versiones y Trabajo en Equipo

### ¿Qué es Git?
**Git** es un sistema de control de versiones distribuido que se ejecuta **en tu propia computadora local**. Registra cada cambio que realizas en los archivos de tu proyecto a lo largo del tiempo, permitiéndote regresar a versiones anteriores si algo se rompe, experimentar en ramas aisladas y combinar el trabajo de varios desarrolladores sin sobreescribir código.

### ¿Qué es GitHub?
**GitHub** es una plataforma en la nube (un sitio web y servicio de servidores) que aloja repositorios de Git remotos. Añade herramientas de colaboración social y profesional como revisión de código (*Pull Requests*), seguimiento de errores (*Issues*), automatización (*GitHub Actions*) y documentación.
* **Regla mnemotécnica**: Git es el motor; GitHub es el garaje compartido en la nube.

### ¿Qué es un Repositorio (*Repo*)?
Un **repositorio** es la carpeta raíz de tu proyecto que contiene todo tu código fuente, archivos de configuración, documentación y la base de datos histórica oculta de Git (la carpeta `.git`), la cual almacena el registro cronológico de todos los commits realizados.

---

## 6. Infraestructura, Entornos y Despliegue

### ¿Qué es una Variable de Entorno?
Una **variable de entorno** es un par clave-valor dinámico que reside en el sistema operativo donde corre tu aplicación, fuera de tu código fuente. Se utiliza para configurar valores que varían entre la computadora del programador (desarrollo) y los servidores de producción (ej. contraseñas de bases de datos, llaves de API, puertos de red).
* **Regla de oro de seguridad**: **Nunca jamás guardes contraseñas o llaves secretas dentro del código que subes a Git**. Utiliza variables de entorno cargadas desde un archivo `.env` local que esté incluido en tu `.gitignore`.

### ¿Qué es Docker?
**Docker** es una herramienta que permite empaquetar una aplicación junto con absolutamente todo lo que necesita para ejecutarse (versión exacta del lenguaje, dependencias del sistema, librerías y configuraciones) dentro de una unidad estandarizada y aislada llamada **contenedor**.
* **El problema que soluciona**: Elimina para siempre la clásica queja: *"En mi máquina sí funciona, pero en el servidor de producción falla"*. Con Docker, el contenedor corre exactamente idéntico en tu laptop con Windows/Mac que en un servidor con Linux en la nube.

### ¿Qué es Cloud (La Nube)?
**Cloud** (computación en la nube) es la práctica de alquilar servidores, almacenamiento, bases de datos y redes a proveedores gigantescos (como Amazon Web Services, Microsoft Azure o Google Cloud) en lugar de comprar y mantener servidores físicos en una oficina propia. Pagas únicamente por los segundos o gigabytes que consumes y puedes escalar recursos con un clic.

### ¿Qué es CI/CD (*Continuous Integration / Continuous Deployment*)?
**CI/CD** es una práctica de ingeniería que automatiza las pruebas y la puesta en producción de tu software:
* **Integración Continua (CI)**: Cada vez que un desarrollador sube un cambio a GitHub, un servidor automatizado descarga el código, ejecuta linters y corre la suite de pruebas para verificar que nada se haya roto.
* **Despliegue Continuo (CD)**: Si todas las pruebas del CI pasan con éxito, el sistema empaqueta y envía automáticamente la nueva versión a los servidores de producción sin intervención manual.

---

## 7. Seguridad y Arquitectura

### ¿Qué es Autenticación vs. Autorización?
Son los dos pilares de la seguridad en sistemas de usuarios y con frecuencia se confunden:
* **Autenticación (AuthN)**: Responde a la pregunta: **"¿Quién eres?"**. Es el proceso de verificar la identidad del usuario (ej. ingresar tu correo y contraseña, o escanear tu huella digital).
* **Autorización (AuthZ)**: Responde a la pregunta: **"¿Qué tienes permitido hacer?"**. Es el proceso de verificar los permisos de un usuario ya autenticado (ej. un usuario común puede ver su propio perfil, pero solo un usuario con rol `Admin` puede borrar otros usuarios del sistema).

### ¿Qué es Arquitectura de Software?
La **arquitectura de software** es el conjunto de decisiones estructurales de alto nivel sobre cómo se organizan, dividen y comunican los diferentes componentes y subsistemas de una aplicación para garantizar que sea mantenible, escalable, segura y tolerante a fallos a lo largo del tiempo.

### ¿Qué es un Microservicio?
Un **microservicio** es un estilo arquitectónico en el que una aplicación grande se divide en varios servicios pequeños, independientes y especializados (ej. un servicio exclusivo para cobros, otro exclusivo para autenticación, otro para inventario). Cada servicio tiene su propia base de datos y se comunica con los demás a través de la red (HTTP o colas de mensajería).
* **Contraste con el Monolito**: En un **Monolito**, todo el código de la aplicación corre dentro de un único proceso y comparte una única base de datos. Para la inmensa mayoría de proyectos y desarrolladores junior, el monolito es más rápido de desarrollar, más fácil de depurar y considerablemente más económico.

---

## 📚 Recursos Recomendados del Tema

* **Glosario canónico**: [MDN Web Docs Glossary](https://developer.mozilla.org/en-US/docs/Glossary)
* **Artículo didáctico**: [freeCodeCamp – What is an API in Plain English](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/)
* **Video para principiantes**: [freeCodeCamp – APIs for Beginners](https://www.youtube.com/@freecodecamp)

---

👉 **Siguiente paso:** **[Ruta Progresiva de Programación](../programming/README.md)**
