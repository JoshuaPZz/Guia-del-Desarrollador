# 📐 Principios de Ingeniería de Software, SOLID y Patrones de Diseño

Cualquier persona puede escribir código que una computadora entienda; un ingeniero de software profesional escribe código que **otros seres humanos pueden leer, razonar, modificar y mantener a lo largo de los años** sin introducir regresiones ni costos astronómicos.

---

## 1. La Regla de Oro: Pragmáticos, No Dogmáticos

Los principios de software (Clean Code, SOLID, DRY) no son leyes religiosas ni mandamientos absolutos: son **heurísticas de diseño para reducir el coste del cambio**.

> ⚠️ **Advertencia de Sobreingeniería**:
> Aplicar todos los patrones de diseño y niveles de abstracción a un script simple de 50 líneas es tan dañino como escribir código espagueti. La abstracción prematura añade complejidad innecesaria. Como dijo Sandi Metz: **"La duplicación es mucho más económica que la abstracción equivocada"**.

---

## 2. Los Principios Fundamentales de Simplicidad

* **KISS (*Keep It Simple, Stupid*)**: Escoge siempre la solución más simple que resuelva el problema actual. El código inteligente y "creativo" suele ser una pesadilla de mantener.
* **YAGNI (*You Aren't Gonna Need It*)**: No construyas funcionalidades, configuraciones o abstracciones para casos hipotéticos del futuro que nadie te ha pedido todavía.
* **DRY (*Don't Repeat Yourself*)**: Cada fragmento de conocimiento debe tener una representación única y no ambigua en el sistema.
  * *Matiz crítico*: Si dos fragmentos de código lucen parecidos hoy pero cambian por razones de negocio completamente distintas, unirlos a la fuerza acopla módulos que deberían estar separados.

---

## 3. Principios SOLID Explicados con Pragmatismo

| Principio | Significado Esencial | Riesgo de Violación |
|---|---|---|
| **S** - Single Responsibility | Un módulo o clase debe tener una sola razón para cambiar (un solo actor interesado). | Clases "Dios" de 2,000 líneas que hacen de todo y rompen cosas ajenas al modificarlas. |
| **O** - Open / Closed | Las entidades deben estar abiertas a la extensión, pero cerradas a la modificación directa. | Modificar código existente y probado cada vez que surge un nuevo requerimiento de negocio. |
| **L** - Liskov Substitution | Los subtipos deben poder sustituir a sus tipos base sin alterar la corrección del programa. | Métodos heredados que lanzan excepciones porque "este subtipo no soporta esa operación". |
| **I** - Interface Segregation | Los clientes no deben verse forzados a depender de interfaces o métodos que no utilizan. | Interfaces monolíticas con 30 métodos donde una clase solo necesita 2. |
| **D** - Dependency Inversion | Los módulos de alto nivel no deben depender de implementaciones de bajo nivel; ambos deben depender de abstracciones. | Tu lógica de negocio queda fuertemente acoplada a una librería de base de datos específica. |

---

## 4. Refactorización Práctica: Patrón Strategy (Open/Closed & Dependency Inversion)

### ❌ Código Acoplado (Viola Open/Closed)
Cada vez que la empresa añade un nuevo método de pago (ej. Stripe o Transferencia bancaria), nos vemos obligados a modificar la clase central añadiendo más `if/elif`, arriesgándonos a romper los métodos existentes:

```python
class ProcesadorPagos:
    def procesar(self, tipo_pago: str, monto: float):
        if tipo_pago == "paypal":
            print(f"Cobrando ${monto} vía API de PayPal...")
        elif tipo_pago == "tarjeta":
            print(f"Cobrando ${monto} vía Pasarela Bancaria...")
        elif tipo_pago == "crypto":
            print(f"Transfiriendo ${monto} en Bitcoin...")
        else:
            raise ValueError("Método de pago no soportado.")
```

### ✅ Código Refactorizado con Patrón Strategy
Ahora podemos añadir 50 métodos de pago nuevos simplemente creando clases nuevas que cumplan con la interfaz, **sin tocar una sola línea de código existente**:

```python
from abc import ABC, abstractmethod

# 1. Abstracción (Interfaz)
class EstrategiaPago(ABC):
    @abstractmethod
    def pagar(self, monto: float) -> bool:
        pass

# 2. Implementaciones Concretas
class PagoPayPal(EstrategiaPago):
    def pagar(self, monto: float) -> bool:
        print(f"Cobrando ${monto} vía PayPal.")
        return True

class PagoTarjeta(EstrategiaPago):
    def pagar(self, monto: float) -> bool:
        print(f"Cobrando ${monto} vía Pasarela Bancaria.")
        return True

# 3. Módulo de Alto Nivel depende solo de la Abstracción
class ProcesadorPagos:
    def __init__(self, estrategia: EstrategiaPago):
        self._estrategia = estrategia  # Inyección de Dependencia

    def cambiar_estrategia(self, nueva_estrategia: EstrategiaPago):
        self._estrategia = nueva_estrategia

    def ejecutar_cobro(self, monto: float) -> bool:
        return self._estrategia.pagar(monto)
```

---

## 5. Patrones de Diseño Esenciales en el Día a Día

No necesitas memorizar los 23 patrones del libro del Gang of Four. Conoce a fondo estos 4:

1. **Factory Method (Creacional)**: Desacopla la creación de objetos de su uso concreto, permitiendo instanciar diferentes clases según configuraciones dinámicas.
2. **Adapter (Estructural)**: Convierte la interfaz de una clase en otra interfaz que el cliente espera. Muy usado para integrar librerías de terceros o APIs heredadas sin ensuciar tu lógica interna.
3. **Observer / Pub-Sub (Comportamiento)**: Un objeto emite eventos y múltiples suscriptores reaccionan de forma desacoplada (el núcleo de la arquitectura web y sistemas basados en eventos).
4. **Facade (Estructural)**: Proporciona una interfaz simple y unificada sobre un subsistema complejo (ej. una clase `ServicioEnvios` que oculta llamadas a 4 APIs de paquetería distintas).

---

## 6. La Pirámide de Testing y Calidad

Un sistema profesional cuenta con una estrategia de pruebas balanceada:

```
          / \
         / E2E \          -> Pocas, lentas, costosas, prueban flujos completos reales.
        /───────\
       / Integr. \        -> Prueban módulos interactuando entre sí (API + Base de Datos).
      /───────────\
     /   Unitarias \      -> Muchas, ultrarrápidas, prueban funciones puras y lógica aislada.
    /───────────────\
```

### Reglas para Tests Mantenibles
* **El patrón AAA (Arrange - Act - Assert)**: Prepara los datos, ejecuta la acción, verifica el resultado.
* **Aislamiento**: Ninguna prueba unitaria debe depender de que otra prueba haya corrido antes.
* **Determinismo**: Una prueba debe dar exactamente el mismo resultado tanto un lunes por la mañana como un domingo por la noche, sin depender de la hora actual ni de conexiones a internet externas (usa *Mocks* y *Stubs* para dependencias externas).

---

## 7. Cultura de Code Review Profesional

Revisar código ajeno y recibir revisiones del tuyo es la forma más rápida de crecer como desarrollador:
* **El código no es tu identidad**: Separa tu ego del código. Una crítica a una función no es una crítica a tu inteligencia.
* **Critica el código, nunca a la persona**: Escribe *"Esta consulta podría provocar un N+1 en bases de datos con muchos registros"* en lugar de *"Escribiste mal esta consulta"*.
* **Revisa en lotes pequeños**: Los Pull Requests de más de 400 líneas rara vez reciben una revisión exhaustiva. Prefiere PRs atómicos y frecuentes.

---

## 📚 Recursos Recomendados del Tema

* **Catálogo visual de patrones y refactorización**: [Refactoring.Guru](https://refactoring.guru)
* **Lectura fundamental**: *Clean Code: A Handbook of Agile Software Craftsmanship* (Robert C. Martin)
* **Artículo canónico de testing**: [Martin Fowler – The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
* **Documentación oficial de testing**: [Vitest Docs](https://vitest.dev) y [Jest Docs](https://jestjs.io)

---

👉 **Siguiente paso:** **[Diseño de Sistemas y Arquitecturas Escalables](../system-design/README.md)**
