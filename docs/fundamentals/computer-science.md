# 💻 Arquitectura de Computadores y Ejecución de Software

Para escribir software de alto nivel sin tropezar con problemas inexplicables de rendimiento o memoria, es indispensable entender qué hace físicamente tu ordenador cuando le pides ejecutar un programa.

---

## 1. ¿Qué es Realmente un Programa Informático?

A nivel de hardware, el procesador (CPU) de tu computadora no entiende palabras en inglés como `if`, `function`, `class` o `print`. La CPU solo es capaz de realizar operaciones aritmético-lógicas extremadamente elementales (sumar dos números, mover un grupo de bits de una posición a otra, comparar si un valor es igual a cero) sobre secuencias de voltajes eléctricos representadas como **unos y ceros (lenguaje binario / código máquina)**.

Un **programa informático** es simplemente:
1. Una secuencia ordenada y finita de instrucciones codificadas en binario.
2. Un conjunto de datos asociados (texto, números, imágenes) sobre los que operan esas instrucciones.

Para evitar que los seres humanos tengamos que escribir millones de ceros y unos a mano, inventamos los **lenguajes de programación**: sistemas de notación abstractos, legibles y formales que nos permiten expresar intenciones complejas que luego son traducidas automáticamente a instrucciones que la máquina pueda ejecutar.

---

## 2. De Texto a Voltajes: Compiladores, Intérpretes y JIT

Existen tres formas principales en que el código fuente escrito por ti se convierte en acción física en la CPU:

```
                  ┌─────────────────────────────────────────────────────────────┐
                  │                    CÓDIGO FUENTE (Texto)                    │
                  │                      print("Hola Mundo")                    │
                  └──────────────────────────────┬──────────────────────────────┘
                                                 │
        ┌────────────────────────────────────────┼────────────────────────────────────────┐
        │                                        │                                        │
        ▼                                        ▼                                        ▼
┌──────────────────┐                   ┌──────────────────┐                    ┌──────────────────┐
│   COMPILACIÓN    │                   │  INTERPRETACIÓN  │                    │    MODELO JIT    │
│  (C, C++, Rust)  │                   │ (Python, Ruby)   │                    │ (Java, V8/Node)  │
└───────┬──────────┘                   └────────┬─────────┘                    └────────┬─────────┘
        │                                       │                                       │
        │ Compilador genera                     │ Intérprete lee                        │ Compila a Bytecode;
        │ binario ejecutable                    │ línea a línea y                       │ la máquina virtual
        │ directo para la CPU                   │ ejecuta al vuelo                      │ compila en caliente (JIT)
        ▼                                       ▼                                       ▼
┌──────────────────┐                   ┌──────────────────┐                    ┌──────────────────┐
│ Código Máquina   │                   │ Acción Inmediata │                    │ Código Máquina   │
│ (Nativo Rápido)  │                   │ (Más Lento/Flex) │                    │ Optimizado       │
└──────────────────┘                   └──────────────────┘                    └──────────────────┘
```

### A. Lenguajes Compilados (C, C++, Rust, Go)
* **Cómo operan**: Un software llamado **Compilador** lee todo tu código fuente de una sola vez, analiza su sintaxis, optimiza las operaciones y genera un archivo ejecutable binario (`.exe`, binario ELF en Linux) específico para la arquitectura de tu procesador (x86_64, ARM64).
* **Ventajas**: Máxima velocidad de ejecución posible y mínimo consumo de memoria. No se necesita ningún software adicional instalado para ejecutar el programa en la máquina destino.
* **Desventajas**: El proceso de compilación toma tiempo. Un binario compilado para Windows x86 no funcionará en una Mac con procesador ARM sin recompilar.

### B. Lenguajes Interpretados Puros (Python tradicional, Ruby, Bash)
* **Cómo operan**: No generan un archivo binario independiente. En su lugar, un programa ejecutable ya existente llamado **Intérprete** lee tu archivo de código fuente en tiempo real, analiza cada instrucción y le pide a la CPU que la ejecute de inmediato.
* **Ventajas**: Desarrollo ágil, código multiplataforma (el mismo archivo `.py` corre en Windows, Linux o Mac siempre que el intérprete esté instalado) y tipado muy dinámico.
* **Desventajas**: Mayor lentitud de ejecución (de 10 a 50 veces más lento que C para operaciones de CPU puras) y mayor consumo de memoria, pues el análisis ocurre durante la ejecución.

### C. Lenguajes con Máquina Virtual y Compilación JIT (Java, C#, JavaScript en motores V8)
* **Cómo operan**: Un punto intermedio de ingeniería. El código fuente se pre-compila a un formato intermedio y compacto llamado **Bytecode**. Cuando ejecutas la aplicación, una **Máquina Virtual** (como la JVM de Java o el motor V8 de Node/Chrome) ejecuta ese bytecode y, mediante un compilador **JIT (*Just-In-Time*)**, detecta las partes de código que se ejecutan muchas veces y las compila a lenguaje máquina nativo en tiempo de ejecución.
* **Ventajas**: Portabilidad de bytecode combinada con alto rendimiento tras el calentamiento del motor.

---

## 3. Arquitectura de Memoria de un Proceso (RAM)

Cuando haces doble clic en un ejecutable o lanzas `node app.js` o `python main.py`, el sistema operativo asigna un bloque de memoria RAM dedicado exclusivamente a ese **proceso**.

Esta memoria se organiza lógicamente en cuatro regiones esenciales:

```
+------------------------------------+  Memoria Alta (Direcciones altas)
| Argumentos y Variables de Entorno  |
+------------------------------------+
| STACK (Pila de Ejecución)          |  <- Crece hacia abajo
|  - Variables locales               |
|  - Punteros de retorno             |  (Gestión ultrarrápida automática por CPU)
|                                    |
|                  v                 |
|                                    |
|                  ^                 |
|                                    |  (Gestión dinámica por programador o GC)
| HEAP (Montículo Dinámico)          |  <- Crece hacia arriba
|  - Objetos complejos               |
|  - Arrays dinámicos, buffers       |
+------------------------------------+
| BSS (Variables globales sin inic.) |
+------------------------------------+
| DATA (Variables globales con valor)|
+------------------------------------+
| TEXT / CODE (Instrucciones binarias|  <- Solo lectura (Protegido)
+------------------------------------+  Memoria Baja (0x00000000)
```

### El Stack (Pila)
* **Propósito**: Almacena las variables locales primitivas (enteros, booleanos, flotantes pequeños) y los registros de activación de cada función (*Stack Frames*).
* **Cómo funciona**: Sigue la regla **LIFO (*Last In, First Out*)**. Cuando llamas a una función `foo()`, se coloca un marco en la cima del Stack. Cuando la función retorna, ese marco se retira al instante moviendo un puntero de la CPU (*Stack Pointer*).
* **Rendimiento**: Extremadamente rápido (casi sin coste de tiempo).
* **Limitación**: Tamaño fijo y limitado (usualmente unos pocos Megabytes).
* **Error clásico**: **`Stack Overflow`**. Ocurre típicamente cuando una función recursiva se llama a sí misma infinitamente sin condición de parada, llenando toda la memoria del stack.

### El Heap (Montículo)
* **Propósito**: Almacena datos cuyo tamaño no se conoce en tiempo de compilación o cuya vida útil debe extenderse más allá de la función que los creó (por ejemplo: un objeto de usuario, un array de 100,000 elementos, el contenido de un archivo subido).
* **Cómo funciona**: El programa solicita un bloque de tamaño variable al sistema operativo (mediante `malloc` en C, `new` en Java/JS, o instanciando objetos en Python).
* **Rendimiento**: Mucho más lento que el Stack porque requiere buscar un bloque contiguo libre y gestionar fragmentación.
* **Gestión de Memoria**:
  * **Manual (C, C++, Rust)**: El programador debe liberar la memoria explícitamente (`free(puntero)`). Si olvidas liberarla, ocurre una **Fuga de Memoria (*Memory Leak*)**. Si intentas usarla después de liberada, ocurre un fallo catastrófico (*Use-After-Free* o *Segmentation Fault*).
  * **Automática con Garbage Collector (JS, Python, Java, Go)**: Un proceso en segundo plano rastrea qué objetos en el Heap ya no tienen ninguna referencia activa y los libera automáticamente. Esto previene fugas graves pero puede introducir pequeñas pausas (*GC pauses*).

---

## 4. Procesos vs. Hilos (*Threads*)

| Característica | Proceso | Hilo (*Thread*) |
|---|---|---|
| **Definición** | Una instancia de un programa en ejecución gestionada por el SO. | La unidad mínima de ejecución dentro de un proceso. |
| **Espacio de Memoria** | **Aislado**. Un proceso no puede leer ni escribir en la memoria de otro sin mecanismos IPC (*Inter-Process Communication*). | **Compartido**. Todos los hilos del mismo proceso comparten el mismo Heap y variables globales. |
| **Coste de Creación** | Alto (requiere asignar tabla de páginas, descriptores de archivos). | Bajo y ligero (*Lightweight process*). |
| **Fallo** | Si un proceso crashea, los demás procesos del sistema siguen vivos. | Si un hilo provoca un fallo de memoria no controlado, **todo el proceso muere**. |
| **Riesgo Típico** | Sobrecarga de recursos si se crean miles. | **Condiciones de carrera (*Race Conditions*)** y bloqueos mutuos (*Deadlocks*) al modificar datos compartidos simultáneamente. |

---

## 📚 Recursos Recomendados del Tema

* **Curso universitario de referencia**: [Harvard CS50x – Introduction to Computer Science](https://cs50.harvard.edu/x/)
* **Curso de hardware y abstracción**: [Nand2Tetris – Build a Modern Computer from First Principles](https://www.nand2tetris.org)
* **Serie de videos completa**: [Crash Course Computer Science (YouTube Playlist)](https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo)
* **Canal especializado**: [Computerphile](https://www.youtube.com/@Computerphile)

---

👉 **Continúa leyendo:** **[Conceptos de Software Explicados sin Jerga](software-concepts.md)**
