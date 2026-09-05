# 🧱 Fundamentos de la Computación y del Software

Bienvenido al módulo de **Fundamentos**. Muchos cursos contemporáneos intentan saltarse esta etapa para enseñar directamente a "hacer clics y arrastrar componentes", provocando que los aprendices memoricen sintaxis sin entender qué ocurre realmente cuando la máquina ejecuta su código.

Los fundamentos son las leyes de la física del software. Una vez que entiendes cómo viajan los bytes, cómo se asigna la memoria y cómo interactúan los procesos con el sistema operativo, cualquier nuevo lenguaje de programación o herramienta de moda te resultará familiar y predecible.

---

## 🗺️ Mapa de Contenidos del Módulo

Este módulo está dividido en dos partes complementarias:

### 1. [Arquitectura de Computadores y Ejecución (`computer-science.md`)](computer-science.md)
* **¿Qué es un programa informático?**: De instrucciones electromagnéticas a código fuente legible.
* **Compiladores vs. Intérpretes vs. JIT**: Cómo se traduce el texto que escribes a lenguaje máquina binario ($0$ y $1$).
* **Arquitectura de Memoria de un Proceso**:
  * Pila (*Stack*): Asignación rápida, alcance local y desbordamientos (*Stack Overflow*).
  * Montículo (*Heap*): Memoria dinámica, punteros y fugas (*Memory Leaks*).
  * Código (*Text*) y Variables Globales (*Data/BSS*).
* **Procesos e Hilos (*Threads*)**: Cómo el sistema operativo distribuye el tiempo de CPU y la concurrencia.

### 2. [Conceptos de Software Explicados sin Jerga (`software-concepts.md`)](software-concepts.md)
Un glosario conceptual profundo y progresivo que desmitifica los términos que la industria suele dar por sentados:
* **Estructura básica**: Variable, Tipo de Dato, Función, Algoritmo, Ámbito (*Scope*).
* **Ecosistema y Reutilización**: Módulo, Paquete, Dependencia, Librería vs. Framework.
* **Comunicación y Redes**: API, Servidor, Cliente, Protocolo HTTP/HTTPS, Formato JSON.
* **Persistencia y Datos**: Base de Datos, SQL, Transacciones, Normalización.
* **Control de Versiones**: Repositorio, Git vs. GitHub, Commit, Rama (*Branch*).
* **Entornos y Despliegue**: Variable de Entorno (`.env`), Contenedor Docker, Cloud Computing, CI/CD.
* **Seguridad y Diseño**: Autenticación vs. Autorización, Arquitectura Monolítica vs. Microservicios.

---

## 💡 El Principio Clave de este Módulo

> **"Una computadora es un dispositivo extraordinariamente rápido, pero totalmente ciego y literal."**

No intentes programar adivinando qué "crees que la máquina va a entender". Cada instrucción que escribas se traducirá a un conjunto exacto y finito de operaciones de lectura, escritura y operaciones aritmético-lógicas en memoria y procesador. Si el modelo mental de cómo la máquina lee tu código es claro, escribirlo y corregirlo se vuelve natural.

---

## 📚 Recursos Recomendados del Módulo

### 🧱 Fundamentos de Computación, Arquitectura y Memoria (Tema 3)
* **Curso universitario de referencia**: [Harvard CS50x – Introduction to Computer Science](https://cs50.harvard.edu/x/)
* **Curso de hardware y abstracción**: [Nand2Tetris – Build a Modern Computer from First Principles](https://www.nand2tetris.org)
* **Serie de videos completa**: [Crash Course Computer Science (YouTube Playlist)](https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo)
* **Canal especializado**: [Computerphile](https://www.youtube.com/@Computerphile)
* **Guía técnica interna**: [Arquitectura de Computadores y Ejecución (computer-science.md)](computer-science.md)

### 🧩 Conceptos de Software sin Jerga (Tema 4)
* **Glosario canónico**: [MDN Web Docs Glossary](https://developer.mozilla.org/en-US/docs/Glossary)
* **Artículo didáctico**: [freeCodeCamp – What is an API in Plain English](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/)
* **Video para principiantes**: [freeCodeCamp – APIs for Beginners](https://www.youtube.com/@freecodecamp)
* **Guía técnica interna**: [Conceptos de Software Explicados sin Jerga (software-concepts.md)](software-concepts.md)

---

👉 **Comienza con la primera lección:** **[Arquitectura de Computadores y Ejecución](computer-science.md)**
