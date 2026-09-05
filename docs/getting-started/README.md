# 🚀 Primeros Pasos: Cómo Usar Esta Guía

Aprender a programar y forjar una carrera como desarrollador de software no consiste en memorizar sintaxis ni en consumir compulsivamente cursos en video de 60 horas. Consiste en desarrollar **modelos mentales precisos de cómo los sistemas procesan información**, adquirir **criterio para resolver problemas técnicos con código** y construir una **tolerancia profesional a la frustración y el debugging**.

Esta guía está diseñada como un mapa de ruta técnico, honesto y progresivo para que sepas en todo momento **qué aprender, por qué aprenderlo, en qué orden, con qué herramientas y cómo ponerlo a prueba en proyectos reales**.

---

## 1. La Mentalidad del Desarrollador

Antes de escribir tu primera línea de código, debes calibrar tus expectativas sobre el aprendizaje técnico:

1. **La programación es un deporte de contacto con el teclado**: Ver a alguien programar en un video da una falsa sensación de comprensión. Solo entiendes un concepto cuando eres tú quien se enfrenta a un error en la terminal y es capaz de diagnosticarlo y resolverlo.
2. **El "Tutorial Hell" es una trampa de confort**: El "infierno de tutoriales" ocurre cuando saltas de un curso guiado a otro sintiendo que avanzas, pero al abrir un archivo en blanco no sabes cómo empezar. Para evitarlo: **por cada hora de teoría o tutorial, dedica al menos dos horas a construir algo por tu cuenta sin seguir instrucciones paso a paso**.
3. **El debugging es el 70% del trabajo**: Escribir código nuevo es la parte fácil; diagnosticar por qué un sistema existente falla de forma silenciosa es la verdadera labor de ingeniería. Aprende a amar los mensajes de error: son diagnósticos, no acusaciones.
4. **Criterio antes que herramientas de moda**: No aprendas una librería o framework simplemente "porque es popular en Twitter o LinkedIn". Aprende primero los fundamentos sobre los que se sostiene; las herramientas van y vienen, los fundamentos perduran décadas.

---

## 2. Metodología de Estudio Recomendada

Aplica esta secuencia deliberada para cada módulo de esta guía:

```
+-------------------+      +-------------------+      +---------------------+
| 1. Comprender el  | ---> | 2. Práctica       | ---> | 3. Construcción     |
| Fundamento        |      | Aislada (Sandbox) |      | de Proyecto Real    |
+-------------------+      +-------------------+      +---------------------+
                                                                 |
                                                                 v
+-------------------+      +-------------------+      +---------------------+
| 6. Pasar al       | <--- | 5. Uso Crítico    | <--- | 4. Debugging y      |
| Siguiente Módulo  |      | de IA / Revisión  |      | Refactorización     |
+-------------------+      +-------------------+      +---------------------+
```

### Paso 1: Comprender el Problema
Antes de ver cómo se hace algo en código, entiende **qué problema del mundo real resuelve**. ¿Por qué necesitamos bases de datos relacionales si ya existen archivos de texto? ¿Por qué se inventó Git si ya podíamos copiar carpetas? Entender el dolor previo te da contexto duradero.

### Paso 2: Práctica Aislada
Usa un entorno de pruebas o una terminal interactiva (REPL) para probar la sintaxis mínima. Modifica variables, provoca errores intencionales y observa qué responde el compilador o intérprete.

### Paso 3: Construir sin Red de Seguridad
Aplica lo aprendido en los entregables y especificaciones de proyectos propuestos en [docs/projects/](../projects/README.md). Intenta resolver la lógica por ti mismo antes de buscar soluciones ajenas.

### Paso 4: Debugging Consciente
Cuando algo falle, no reinicies el proyecto ni copies el error a una IA inmediatamente. Lee el mensaje de error de principio a fin, localiza el archivo y la línea señalados, e hipotetiza qué causó el estado inválido.

### Paso 5: Consultar la Documentación Oficial
Acostúmbrate desde el primer día a abrir la documentación oficial de la herramienta (MDN para la web, Python Docs, Postgres Docs). La habilidad de extraer respuestas de documentación técnica es la mayor ventaja competitiva de un ingeniero.

---

## 3. Navegación Progresiva Sugerida

No intentes aprenderlo todo a la vez. Sigue esta ruta secuencial por fases:

| Fase | Enfoque Principal | Módulos Clave | Meta Concreta |
|---|---|---|---|
| **Fase 1** | Cimientos y Lógica | [Fundamentos](../fundamentals/README.md), [Programación](../programming/README.md) | Resolver problemas algorítmicos básicos y crear tus primeros programas CLI. |
| **Fase 2** | Entorno Profesional | [Git & GitHub](../git-github/README.md), [DevOps Básico](../devops/README.md) | Manejar la terminal, git branches, commits convencionales y GitHub. |
| **Fase 3** | Especialización Inicial | [Desarrollo Web](../web-development/README.md), [Frontend](../frontend/README.md) o [Backend](../backend/README.md) | Construir tu primera aplicación interactiva o API REST con base de datos. |
| **Fase 4** | Calidad e Ingeniería | [Bases de Datos](../databases/README.md), [Ingeniería de Software](../software-engineering/README.md) | Escribir código testeado, limpio, modelar datos con relaciones y principios ACID. |
| **Fase 5** | Nivel Profesional | [Proyectos Nivel 2-3](../projects/README.md), [IA para Devs](../ai-for-developers/README.md), [Carrera](../career/README.md) | Publicar proyectos dockerizados con CI/CD y preparar tu portfolio técnico. |

---

## 📚 Recursos Recomendados del Módulo

### 🧭 Primeros Pasos y Metodología de Estudio (Tema 1)
* **Artículo de orientación**: [freeCodeCamp – How to Learn to Code](https://www.freecodecamp.org/news/tag/learn-to-code/)
* **Roadmap general interactivo**: [roadmap.sh](https://roadmap.sh)
* **Video formativo**: [freeCodeCamp – How to Learn to Code FAST](https://www.youtube.com/@freecodecamp)
* **Repositorio de rutas curadas por rol**: [kamranahmedse / developer-roadmap](https://github.com/kamranahmedse/developer-roadmap)

### ⚠️ Errores Comunes al Iniciar y Tutorial Hell (Tema 2)
* **Guía técnica**: [freeCodeCamp – Tutorial Hell Explained](https://www.freecodecamp.org/news/tag/tutorial/)
* **Repositorio de buenas prácticas para principiantes**: [practical-tutorials / project-based-learning](https://github.com/practical-tutorials/project-based-learning)
* **Guía técnica interna**: [12 Errores Comunes que Debes Evitar (common-errors.md)](common-errors.md)

---

## 4. Siguiente Paso

Antes de profundizar en conceptos técnicos, lee atentamente el documento de errores comunes para protegerte de los tropiezos que hacen abandonar al 80% de los principiantes:

👉 **[Continuar a: 12 Errores Comunes que Debes Evitar](common-errors.md)**
