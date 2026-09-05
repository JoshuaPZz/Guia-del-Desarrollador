# 💻 Ruta Progresiva de Programación

Aprender a programar no es aprender la sintaxis de un lenguaje específico; es aprender a estructurar el pensamiento de forma determinista para resolver problemas. La sintaxis de un lenguaje se aprende en un par de fines de semana; el criterio algorítmico, el diseño y el debugging toman meses de práctica deliberada.

Esta ruta está diseñada para guiarte desde cero hasta escribir código limpio, probado y estructurado con calidad profesional.

---

## 🗺️ Las 8 Etapas de la Maestría en Programación

```
[ 1. Lógica y Control de Flujo ]
               │
               ▼
[ 2. Funciones y Modularidad ]
               │
               ▼
[ 3. Estructuras de Datos y Algoritmia (DSA) ]
               │
               ▼
[ 4. Manejo de Errores y Excepciones ]
               │
               ▼
[ 5. Paradigma de Objetos: Composición > Herencia ]
               │
               ▼
[ 6. Técnicas Profesionales de Debugging ]
               │
               ▼
[ 7. Testing Automatizado y Calidad ]
               │
               ▼
[ 8. Principios de Clean Code y Refactorización ]
```

---

## Etapa 1: Lógica, Variables y Control de Flujo

Todo software en el planeta se reduce a tres operaciones fundamentales:
1. **Secuencia**: Ejecutar instrucciones una tras otra.
2. **Selección (Condicionales)**: Tomar caminos distintos según condiciones booleanas (`if / else`, `switch / match`).
3. **Iteración (Ciclos)**: Repetir un bloque de código mientras se cumpla una condición (`for`, `while`).

### La Ley Fundamental de la Lógica Booleana: De Morgan
Simplificar condicionales complejas previene el 50% de los bugs en código novato:
* `!(A && B)` es estrictamente equivalente a `!A || !B`
* `!(A || B)` es estrictamente equivalente a `!A && !B`

### Mutabilidad vs. Inmutabilidad
Comprender la diferencia entre datos mutables e inmutables previene efectos secundarios desastrosos:
* **Inmutables** (`int`, `str`, `tuple` en Python; primitivos en JS): Cada modificación genera un nuevo valor en memoria.
* **Mutables** (`list`, `dict` en Python; `Array`, `Object` en JS): Se modifican en el mismo espacio de memoria y se transmiten por referencia.

```python
# PELIGRO COMÚN: Argumentos mutables por defecto en funciones
# ❌ INCORRECTO (La lista persiste entre llamadas sucesivas):
def agregar_tarea(tarea: str, lista_tareas: list = []):
    lista_tareas.append(tarea)
    return lista_tareas

# ✅ CORRECTO (Garantiza una lista nueva por cada llamada sin argumento):
def agregar_tarea_segura(tarea: str, lista_tareas: list = None):
    if lista_tareas is None:
        lista_tareas = []
    lista_tareas.append(tarea)
    return lista_tareas
```

---

## Etapa 2: Funciones y Alcance (*Scope*)

Una función debe cumplir con tres cualidades esenciales:
1. **Responsabilidad única**: Hacer una sola cosa y hacerla de manera predecible.
2. **Entradas y salidas explícitas**: Evitar alterar variables globales ocultas (minimizar efectos secundarios).
3. **Nombres descriptivos**: Si necesitas un comentario para explicar qué hace el nombre de una función, el nombre está mal elegido.

---

## Etapa 3: Estructuras de Datos y Algoritmos (DSA)

Las estructuras de datos definen cómo se almacena la información en la memoria RAM; los algoritmos son los pasos para manipularla. Su eficiencia se mide mediante la **Complejidad Asintótica (Notación Big-O)**:

```
Operaciones
    ^
    |                                            O(2^n) Exponencial (Inviable)
    |                                      O(n^2) Cuadrática (Bucles anidados)
    |                                 /
    |                             /  
    |                         /       O(n log n) Lineal-Logarítmica (MergeSort)
    |                     /
    |                 /               O(n) Lineal (Búsqueda secuencial)
    |             /
    |         /
    |     /--------------------------- O(log n) Logarítmica (Búsqueda Binaria)
    |--------------------------------- O(1) Constante (Acceso a índice / Hash Map)
    +----------------------------------------> Cantidad de Datos de Entrada (n)
```

### Tabla de Estructuras Esenciales

| Estructura | Acceso | Inserción | Búsqueda | Cuándo Utilizarla |
|---|---|---|---|---|
| **Array / Vector** | $O(1)$ | $O(n)$ | $O(n)$ | Acceso rápido por índice y colecciones de tamaño relativamente estable. |
| **Linked List** | $O(n)$ | $O(1)$ | $O(n)$ | Inserciones y eliminaciones frecuentes sin costo de realocación de memoria. |
| **Stack (Pila)** | $O(1)$ (cima) | $O(1)$ | $O(n)$ | Historiales, deshacer/rehacer, validación de sintaxis/paréntesis, parsing. |
| **Queue (Cola)** | $O(1)$ (frente) | $O(1)$ | $O(n)$ | Procesamiento por orden de llegada (FIFO), buffers, colas de impresión y tareas. |
| **Hash Table / Map** | $O(1)$ prom. | $O(1)$ prom. | $O(1)$ prom. | Búsqueda ultrarrápida por clave única (diccionarios, índices en memoria). |

### Algoritmo Fundamental: Búsqueda Binaria ($O(\log n)$)
Permite encontrar un elemento en un array ordenado de 1,000,000 de elementos en solo 20 comparaciones:

```python
def busqueda_binaria(elementos_ordenados: list[int], objetivo: int) -> int:
    inicio = 0
    fin = len(elementos_ordenados) - 1

    while inicio <= fin:
        medio = inicio + (fin - inicio) // 2  # Evita posibles desbordamientos
        
        if elementos_ordenados[medio] == objetivo:
            return medio
        elif elementos_ordenados[medio] < objetivo:
            inicio = medio + 1
        else:
            fin = medio - 1

    return -1  # No encontrado
```

---

## Etapa 4: Manejo Robusto de Excepciones

Un programa profesional no debe caerse con un *crash* sin control ante la primera entrada inesperada del usuario o una desconexión de red.

```python
import json
from pathlib import Path

def leer_datos_usuario(ruta_archivo: str) -> dict:
    ruta = Path(ruta_archivo)
    
    if not ruta.is_file():
        raise FileNotFoundError(f"El archivo especificado no existe: {ruta_archivo}")
        
    try:
        # Context manager ('with') asegura el cierre del descriptor de archivo pase lo que pase
        with open(ruta, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError as err:
        # Registramos el error de parseo sin silenciarlo a ciegas
        raise ValueError(f"Formato JSON corrupto en línea {err.lineno}: {err.msg}") from err
```

---

## Etapa 5: Paradigma de Objetos (Composición sobre Herencia)

El mayor error en Programación Orientada a Objetos es crear árboles gigantescos de herencia (`Animal -> Mamifero -> Canino -> PerroDomestico`). La industria moderna aplica de forma unánime el principio: **Prefiere composición sobre herencia**.

```python
from abc import ABC, abstractmethod

# 1. Definimos una interfaz mediante Abstracción
class Notificador(ABC):
    @abstractmethod
    def enviar(self, destinatario: str, mensaje: str) -> bool:
        pass

class NotificadorEmail(Notificador):
    def enviar(self, destinatario: str, mensaje: str) -> bool:
        print(f"[EMAIL enviado a {destinatario}]: {mensaje}")
        return True

# 2. La clase del servicio no hereda del notificador: lo compone
class ServicioRegistro:
    def __init__(self, notificador: Notificador):
        self._notificador = notificador  # Inyección de dependencia

    def registrar_usuario(self, email: str):
        print(f"Usuario {email} guardado en base de datos.")
        self._notificador.enviar(email, "¡Bienvenido a la plataforma!")
```

---

## Etapa 6: Debugging Metódico

Deja de adivinar soluciones colocando `print()` aleatorios. Aplica el **Método Científico de Debugging**:
1. **Reproducir el error de forma determinista**: Encuentra el input exacto que detona el bug.
2. **Aislar la causa**: Usa el debugger de tu editor (VS Code, PyCharm) colocando un **Breakpoint** justo antes del fallo.
3. **Inspeccionar el Call Stack y Variables**: Verifica que las variables en ese instante contengan exactamente los valores que tu modelo mental asume.
4. **Formular una hipótesis y validar**: Modifica una variable a la vez y comprueba si la hipótesis es cierta antes de alterar código masivamente.

---

## Etapa 7: Testing Automatizado

Un sistema sin pruebas automáticas no puede modificarse con seguridad. El testing automatizado es tu seguro contra la regresión:

```python
# test_calculos.py
import pytest

def calcular_descuento(precio: float, porcentaje: float) -> float:
    if precio < 0 or porcentaje < 0 or porcentaje > 100:
        raise ValueError("Valores fuera de rango permitido")
    return round(precio * (1 - porcentaje / 100), 2)

# Pruebas unitarias
def test_calculo_descuento_valido():
    assert calcular_descuento(100.0, 15.0) == 85.0
    assert calcular_descuento(50.0, 0.0) == 50.0

def test_descuento_valores_invalidos():
    with pytest.raises(ValueError):
        calcular_descuento(-10.0, 20.0)
    with pytest.raises(ValueError):
        calcular_descuento(100.0, 150.0)
```

---

## 📚 Recursos Recomendados del Módulo

### 💻 Fundamentos de Programación, Algoritmos y Testing (Tema 5)
* **Curso introductorio de Python**: [Harvard CS50P – Introduction to Programming with Python](https://cs50.harvard.edu/python/)
* **Curso en video (Full Course)**: [freeCodeCamp – Learn Python for Beginners](https://www.youtube.com/watch?v=rfscVS0vtbw)
* **Práctica interactiva con mentores**: [Exercism.org](https://exercism.org)
* **Curso de estructuras de datos**: [freeCodeCamp – Data Structures and Algorithms](https://www.youtube.com/@freecodecamp)
* **Visualizador interactivo de algoritmos**: [VisuAlgo](https://visualgo.net)
* **Libro ilustrado accesible**: *Grokking Algorithms* (Aditya Bhargava)
* **Plataformas de ejercicios de código**: [LeetCode](https://leetcode.com) | [HackerRank](https://www.hackerrank.com) | [NeetCode](https://neetcode.io)

### 🧭 Elección de Lenguaje y Documentación Canónica (Tema 6)
* **Comparativa objetiva y árboles de decisión**: [roadmap.sh – Choose a Language](https://roadmap.sh)
* **Documentaciones oficiales canónicas**:
  * [Python Official Docs](https://docs.python.org/3/)
  * [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) y [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
  * [Go Official Documentation & Tour](https://go.dev/doc/)
  * [The Rust Programming Language Book](https://doc.rust-lang.org/book/)
  * [Oracle Java Documentation](https://docs.oracle.com/en/java/)
  * [Microsoft .NET / C# Documentation](https://learn.microsoft.com/en-us/dotnet/csharp/)
* **Guía técnica interna detallada**: [Criterios para Elegir tu Primer Lenguaje de Programación (language-selection.md)](language-selection.md)

---

## Etapa 8: Criterios de Elección de Lenguaje

¿Qué lenguaje deberías elegir para recorrer esta ruta? 

👉 **Lee la guía detallada:** **[Criterios para Elegir tu Primer Lenguaje de Programación](language-selection.md)**
