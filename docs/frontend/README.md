# 🎨 Ruta de Especialización: Frontend Engineering

El desarrollo Frontend moderno va mucho más allá de "maquetar páginas web". Es la disciplina de la ingeniería de software encargada de diseñar interfaces de usuario performantes, accesibles, reactivas y sincronizadas con servidores remotos a través de una red inherentemente inestable.

---

## 🗺️ Roadmap Progresivo del Frontend

```
[ 1. HTML5 Semántico y Accesibilidad (a11y) ]
                     │
                     ▼
[ 2. CSS3 Moderno: Flexbox, Grid y Responsive Mobile-First ]
                     │
                     ▼
[ 3. JavaScript Moderno (ES6+): Asincronía, Event Loop y DOM ]
                     │
                     ▼
[ 4. TypeScript: Tipado Estático y Robustez ]
                     │
                     ▼
[ 5. Herramientas de Construcción (Vite, Package Managers) ]
                     │
                     ▼
[ 6. Frameworks Reactivos (React o Vue) ]
                     │
                     ▼
[ 7. Gestión de Estado y Sincronización con Servidor (TanStack Query) ]
                     │
                     ▼
[ 8. Testing Frontend (Vitest, Testing Library, Playwright) ]
                     │
                     ▼
[ 9. Rendimiento Web (Core Web Vitals) y SEO Técnico ]
```

---

## 1. HTML5 Semántico y Accesibilidad (a11y)

El HTML es la estructura esquelética de cualquier aplicación web. Usar etiquetas semánticas no solo mejora el posicionamiento en Google (SEO), sino que permite que lectores de pantalla para personas con discapacidad visual naveguen la web.

* **Etiquetas Semánticas Clave**: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
* **Regla de Oro**: Evita el "Div Soup" (usar `<div>` para todo). Un botón interactivo debe ser un `<button>`, nunca un `<div onclick="...">`. Los botones son accesibles por teclado (tecla Enter / Espacio) de forma nativa; un `div` no.

---

## 2. CSS3 Moderno: Sin Miedo a los Estilos

CSS ya no es el lenguaje frustrante de hace una década. Con las herramientas nativas modernas puedes resolver cualquier diseño sin dependencias externas:

* **El Modelo de Caja (*Box Model*)**: `content` + `padding` + `border` + `margin`. Configura siempre `box-sizing: border-box;` globalmente.
* **CSS Flexbox**: Ideal para alinear elementos en **una sola dimensión** (una fila o una columna). Centrar vertical y horizontalmente se logra con 3 líneas:
  ```css
  .contenedor {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```
* **CSS Grid**: Diseñado para layouts bidimensionales complejos (filas y columnas simultáneas):
  ```css
  .galeria {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  ```
* **Responsive Design (Mobile-First)**: Diseña primero para pantallas móviles compactas y expande mediante Media Queries (`@media (min-width: 768px)`) hacia pantallas grandes.
* **Variables CSS (Custom Properties)**: Para temas oscuros/claros limpios:
  ```css
  :root {
    --color-primario: #3b82f6;
    --color-fondo: #0f172a;
  }
  ```

---

## 3. JavaScript Moderno y Asincronía

No toques un framework antes de dominar estos fundamentos de JavaScript:

* **Manipulación del DOM**: `document.querySelector`, `addEventListener`, delegación de eventos y propagación (*Event Bubbling*).
* **Array Methods Funcionales**: `.map()`, `.filter()`, `.reduce()`, `.find()`.
* **Desestructuración y Spread Operator**: `const { nombre, ...resto } = usuario;`
* **Manejo de Asincronía**: Promesas, `async / await`, y la Fetch API para consumir datos remotos:
  ```javascript
  async function cargarCatalogo() {
    try {
      const respuesta = await fetch('/api/v1/productos');
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      const productos = await respuesta.json();
      renderizarProductos(productos);
    } catch (error) {
      mostrarMensajeError(error.message);
    }
  }
  ```

---

## 4. TypeScript: El Estándar de la Industria

En equipos profesionales casi nadie escribe JavaScript plano para aplicaciones de producción. TypeScript añade **tipado estático** que detecta el 70% de los errores antes de abrir el navegador:

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'LECTOR' | 'AUTOR'; // Tipos literales unidos
  telefono?: string; // Campo opcional
}

function formatearUsuario(usuario: Usuario): string {
  return `${usuario.nombre} (${usuario.rol.toLowerCase()})`;
}
```

---

## 5. Frameworks Reactivos: ¿React o Vue?

Un framework reactivo resuelve el problema más difícil del Frontend tradicional: **mantener sincronizada la interfaz visual (DOM) con el estado de los datos en memoria**.

| Aspecto | React | Vue |
|---|---|---|
| **Filosofía** | Biblioteca minimalista orientada a componentes funcionales y Hooks. Enorme ecosistema de terceros. | Framework progresivo con batería de herramientas oficial (Router, Pinia) y sintaxis intuitiva. |
| **Sintaxis** | JSX (JavaScript y HTML fusionados en código). | SFC (*Single File Components*): `<template>`, `<script>`, `<style>` en un archivo. |
| **Demanda Laboral** | La más alta globalmente (más de 60% de ofertas frontend). | Muy alta en Europa y Asia; fuerte en startups y medianas empresas. |
| **Recomendación** | **React** si buscas maximizar oportunidades laborales; **Vue** si buscas una curva de aprendizaje más suave y ordenada. |

---

## 6. Estado y Sincronización con el Servidor

No confundas el estado del cliente con el estado del servidor:
* **Estado Local**: Un modal abierto, el valor de un campo de texto, una pestaña activa. Se maneja con `useState` (React) o `ref` (Vue).
* **Estado Global de UI**: Tema claro/oscuro, usuario logueado en la sesión. Se maneja con **Zustand** o Context API (evita Redux tradicional salvo que entres a un proyecto *legacy*).
* **Estado del Servidor (Server State)**: La lista de usuarios traída de la base de datos, caché de peticiones, paginación. Usa **TanStack Query (React Query)**: maneja automáticamente caché, reintentos en fallos de red y sincronización en segundo plano.

---

## 7. Testing en Frontend

Una suite de pruebas frontend confiable cubre tres niveles:
1. **Pruebas Unitarias de Lógica**: Probar funciones puras y utilidades matemáticas con **Vitest**.
2. **Pruebas de Componentes**: Probar que los componentes renderizan lo esperado y responden a clics simulando usuarios con **React Testing Library**.
3. **Pruebas End-to-End (E2E)**: Un navegador real controlado por código que realiza flujos completos (ej. login -> agregar al carrito -> comprar) con **Playwright**.

---

## 📚 Recursos Recomendados del Tema

* **Certificación gratuita de CSS**: [freeCodeCamp – Responsive Web Design](https://www.freecodecamp.org/learn/2022/responsive-web-design/)
* **Certificación de algoritmos JS**: [freeCodeCamp – JavaScript Algorithms and Data Structures](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)
* **Tutorial y documentación oficial**: [React Official Docs & Learn](https://react.dev/learn)
* **Manual oficial de TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* **Currículum de proyectos abiertos**: [The Odin Project](https://www.theodinproject.com)
* **Canal en español de referencia**: [midudev](https://www.youtube.com/@midudev)

---

👉 **Siguiente paso:** Si prefieres construir la lógica del servidor, continúa con **[Ruta de Especialización Backend](../backend/README.md)**
