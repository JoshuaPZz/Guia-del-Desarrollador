# 💼 Preparación de Carrera Profesional: De Cero al Primer Empleo

Conseguir tu primer empleo como desarrollador de software no es una lotería; es un **proceso de ingeniería de producto donde el producto eres tú y tu capacidad de aportar valor a un equipo de desarrollo**.

El mercado actual ha dejado atrás los tiempos en que bastaba con completar un bootcamp de 12 semanas y mostrar dos tutoriales para ser contratado. Hoy, las empresas exigen rigor, criterio, fundamentos y madurez profesional desde el nivel de entrada.

---

## 🎯 ¿Qué Busca Realmente un Equipo de Ingeniería en un Desarrollador Junior?

Muchos principiantes creen erróneamente que los evaluadores técnicos esperan que un junior lo sepa todo. Nada más alejado de la realidad. Lo que un equipo sénior evalúa meticulosamente en una entrevista junior se resume en estos 7 pilares:

```
                          EL PERFIL JUNIOR IDEAL
 ┌───────────────────────────┬─────────────────────────────────────────────────────────┐
 │ 1. Fundamentos Sólidos    │ Entiende qué es una variable, cómo viaja una petición   │
 │                           │ HTTP y cómo funciona la memoria o una consulta SQL.     │
 ├───────────────────────────┼─────────────────────────────────────────────────────────┤
 │ 2. Metodología de Debug   │ Ante un error, lee el stack trace y formula hipótesis  │
 │                           │ en lugar de cambiar líneas de código a ciegas.          │
 ├───────────────────────────┼─────────────────────────────────────────────────────────┤
 │ 3. Capacidad de Aprender  │ Si no conoce una librería, no entra en pánico: abre la  │
 │                           │ documentación oficial y aprende a usarla rápidamente.   │
 ├───────────────────────────┼─────────────────────────────────────────────────────────┤
 │ 4. Comunicación Clara     │ Sabe explicar su razonamiento técnico en voz alta sin   │
 │                           │ balbucear ni ocultar lo que desconoce.                  │
 ├───────────────────────────┼─────────────────────────────────────────────────────────┤
 │ 5. Dominio de Git         │ Sabe trabajar en ramas, escribir commits limpios y      │
 │                           │ resolver un conflicto sin destruir la rama `main`.      │
 ├───────────────────────────┼─────────────────────────────────────────────────────────┤
 │ 6. Humildad y Feedback    │ Recibe críticas a su código en un Pull Request con      │
 │                           │ curiosidad y profesionalismo, no con ego herido.        │
 ├───────────────────────────┼─────────────────────────────────────────────────────────┤
 │ 7. Proyectos Demostrables │ Ha llevado proyectos completos desde cero hasta el      │
 │                           │ despliegue público con pruebas y documentación clara.   │
 └───────────────────────────┴─────────────────────────────────────────────────────────┘
```

---

## 1. El Portfolio de GitHub: Tu Mejor Carta de Presentación

Tu perfil de GitHub es tu verdadero currículum técnico. Un reclutador técnico no leerá 20 repositorios; mirará únicamente tus **2 o 3 repositorios fijados (*Pinned*)**.

### Reglas para tu GitHub:
1. **Calidad sobre Cantidad**: Es infinitamente mejor tener 3 repositorios excepcionales (completos, testeados, documentados y dockerizados) que 25 repositorios con nombres como `tarea1`, `test-react` o proyectos clonados a medio hacer.
2. **El README de Proyecto Perfecto**:
   * **Título y Descripción de 2 líneas**: Qué problema resuelve y para quién.
   * **Insignias y Enlace a Demo en Vivo**: URL pública para probar la aplicación en 1 clic.
   * **Capturas de Pantalla / GIF interactivo**: Muestra la interfaz o el funcionamiento.
   * **Diagrama de Arquitectura**: Cómo se conectan la API, la base de datos y los clientes.
   * **Instrucciones Deterministas de Ejecución Local**:
     ```bash
     git clone https://github.com/tu-usuario/proyecto.git
     cp .env.example .env
     docker compose up --build
     ```
   * **Decisiones Técnicas y Trade-offs**: Breve párrafo explicando por qué elegiste PostgreSQL sobre MongoDB o qué aprendiste al optimizar las consultas.

---

## 2. El Currículum Vitae (CV) de Alto Impacto

Los reclutadores técnicos dedican un promedio de **7 segundos** a escanear un CV antes de decidir si pasa al filtro técnico o va a la papelera.

### Reglas Estrictas para tu CV:
* **Máximo 1 página**: Si tienes menos de 5 años de experiencia, un CV de 2 páginas denota falta de capacidad de síntesis.
* **PROHIBIDO usar barras de porcentaje de habilidades**: Poner *"HTML: 90%, JavaScript: 75%, Python: 80%"* es un cliché que no significa nada técnicamente y denota amateurismo. Lista tus tecnologías por categorías: Lenguajes, Frameworks, Bases de Datos, Herramientas / DevOps.
* **Fórmula de Google para Puntos de Impacto**:
  > *"Logré [X], medido por [Y], haciendo [Z]"*
  * ❌ *Malo*: "Hice el backend de una tienda online".
  * ✅ *Profesional*: "Diseñé e implementé una API REST de e-commerce en Node.js/TypeScript y PostgreSQL, reduciendo el tiempo de respuesta de consultas en un 40% mediante indexación B-Tree y cubriendo el 85% de la lógica con pruebas automatizadas en Jest".

---

## 3. Estrategia para Entrevistas Técnicas

### A. La Prueba Algorítmica y de Lógica (LeetCode / HackerRank)
* **No intentes memorizar 500 problemas**: Domina los **patrones algorítmicos fundamentales**: *Two Pointers*, *Sliding Window*, *Fast & Slow Pointers*, *BFS/DFS en Grafos* y *Búsqueda Binaria*.
* **Comunica tu pensamiento (*Think Out Loud*)**: Durante la entrevista, el evaluador valora más tu proceso mental que si llegas a la solución perfecta en el minuto uno. Explica tu enfoque inicial por fuerza bruta, calcula su complejidad Big-O y luego propone optimizaciones.

### B. La Entrevista de Arquitectura (System Design para Juniors)
* No intenten diseñar Netflix o Uber con 50 microservicios.
* Enfócate en: modelado de base de datos relacional (tablas y llaves), códigos de estado HTTP adecuados, seguridad de contraseñas, y cuándo añadir una capa de caché con Redis para aliviar la base de datos.

### C. La Entrevista de Comportamiento (Método STAR)
Estructura tus respuestas a preguntas como *"Cuéntame sobre algún momento en que algo falló en tu código"*:
* **S (Situación)**: Contexto del proyecto y el desafío.
* **T (Tarea)**: Tu responsabilidad específica en ese problema.
* **A (Acción)**: Qué medidas técnicas tomaste para diagnosticar y resolver el problema.
* **R (Resultado)**: Qué impacto tuvo la solución y qué aprendiste del incidente.

---

## 4. Comunidades, Networking y Contribución Open Source

* **Asiste a Meetups Técnicos Locales o Virtuales**: La mayoría de las ofertas de trabajo junior no se publican en portales públicos; se cubren por recomendación interna de ingenieros que se conocen en comunidades técnicas.
* **Contribuciones Open Source Reales**: No hagas spam de correcciones tipográficas en READMEs ajenos. Busca proyectos que utilices en tu día a día, filtra por la etiqueta `good-first-issue` en GitHub, discute el problema en los issues y envía un Pull Request bien documentado. Una sola contribución aprobada a una librería popular demuestra que sabes leer código ajeno y adaptarte a estándares exigentes.

---

## 📚 Recursos Recomendados del Tema

* **Guías de redacción de CV técnico**: [freeCodeCamp – Resume Tips and Guides](https://www.freecodecamp.org/news/tag/resume/)
* **Práctica de algoritmos**: [LeetCode](https://leetcode.com)
* **Simulación de entrevistas técnicas con pares**: [Pramp (Mock Interviews)](https://www.pramp.com)
* **System Design para entrevistas técnicas**: [donnemartin / system-design-primer](https://github.com/donnemartin/system-design-primer)

---

👉 **Siguiente paso:** **[Recursos de Estudio Curados y Fichas Técnicas](../resources/README.md)**
