# 🏛️ Diseño de Sistemas y Arquitectura de Software Escalable

El diseño de sistemas (*System Design*) es el arte y la disciplina de estructurar aplicaciones, bases de datos, redes y componentes de cómputo para soportar **altos volúmenes de usuarios, tráfico masivo y tolerancia a fallos**, garantizando que el sistema continúe operando de forma rápida y consistente.

---

## 1. El Espectro Arquitectónico: De Monolito a Microservicios

```
   MONOLITO TRADICIONAL            MONOLITO MODULAR                MICROSERVICIOS
┌────────────────────────┐    ┌────────────────────────┐    ┌─────────┐    ┌─────────┐
│ Todo el código en un   │    │ Un solo ejecutable,    │    │ Auth    │    │ Pagos   │
│ solo bloque y proceso; │    │ pero con fronteras de  │    │ Service │    │ Service │
│ acoplamiento alto      │    │ dominio estrictas      │    └────┬────┘    └────┬────┘
└───────────┬────────────┘    └───────────┬────────────┘         │ Red HTTP/gRPC  │
            ▼                             ▼                      ▼                ▼
    [ Base de Datos ]             [ Base de Datos ]         [ DB Auth ]    [ DB Pagos ]
```

### ¿Cuándo usar cada uno?
1. **Monolito Tradicional**: Excelente para validar prototipos rápidos (MVPs). Conforme crece el equipo, puede volverse difícil de desplegar sin pisarse los pies.
2. **Monolito Modular (La opción recomendada para el 95% de los proyectos)**: Todo corre en el mismo proceso y comparte infraestructura, pero los módulos tienen interfaces internas estrictas y no se acceden a datos privados directamente. Máxima velocidad de desarrollo y coste operativo mínimo.
3. **Microservicios**: Solo tienen sentido técnico y financiero cuando:
   * Tienes docenas de equipos de desarrollo independientes que se bloquean entre sí al hacer despliegues.
   * Diferentes partes del sistema tienen requerimientos de escala radicalmente distintos (ej. el servicio de procesamiento de video necesita 100 servidores de GPU, pero el servicio de facturación solo necesita un contenedor pequeño).

---

## 2. Escalabilidad: Vertical vs. Horizontal

* **Escalabilidad Vertical (*Scale Up*)**: Poner más memoria RAM, discos SSD más veloces o CPUs más potentes en el mismo servidor.
  * *Ventaja*: Cero complejidad de arquitectura (no cambias tu código).
  * *Límite*: Existe un límite físico y económico máximo de hardware; y sigues teniendo un **Único Punto de Fallo (*SPOF - Single Point of Failure*)**.
* **Escalabilidad Horizontal (*Scale Out*)**: Añadir más servidores pequeños en paralelo detrás de un balanceador de carga.
  * *Ventaja*: Escalabilidad prácticamente infinita y tolerancia a que un servidor muera sin afectar el servicio.
  * *Desafío*: Exige que tu aplicación sea completamente **Stateless** (el estado de sesiones no puede guardarse en la memoria local del servidor).

---

## 3. Balanceo de Carga (*Load Balancing*)

Un **Balanceador de Carga** (como NGINX, HAProxy o AWS ALB) actúa como un policía de tráfico que distribuye las peticiones entrantes entre múltiples servidores de aplicación:

```
                        ┌──> [ Servidor App 1 ]
Clientes ──> [ Load ] ──┼──> [ Servidor App 2 ]
             [Balancer] └──> [ Servidor App 3 ]
```

* **Algoritmos Comunes**:
  * **Round Robin**: Distribuye secuencialmente (1 -> 2 -> 3 -> 1...).
  * **Least Connections**: Envía la petición al servidor que menos conexiones activas tenga en ese momento.
  * **IP Hash**: El cliente siempre se comunica con el mismo servidor según su IP (para retener afinidad).

---

## 4. Estrategias de Caché (*Caching*)

La consulta más rápida es la que nunca llega a la base de datos. Una **Caché** (como Redis) almacena en memoria RAM datos de lectura frecuente:

### Patrón Cache-Aside (El más usado):
1. La aplicación recibe una petición para obtener un producto con ID `42`.
2. Revisa si el producto está en Redis (*Cache Hit*). Si está, lo devuelve en 2 milisegundos.
3. Si no está en Redis (*Cache Miss*), consulta la base de datos SQL (tarda 40ms).
4. Guarda el resultado en Redis con un tiempo de expiración (**TTL - Time To Live**) de 10 minutos.
5. Retorna la respuesta al cliente.

> 💡 **Cita Clásica**: *"Solo hay dos cosas difíciles en Ciencias de la Computación: la invalidación de caché y ponerle nombres a las variables."* (Phil Karlton).

---

## 5. Arquitecturas Basadas en Eventos y Colas de Mensajería

En lugar de que el servidor web ejecute tareas lentas sincrónicamente (ej. generar un reporte en PDF de 5 minutos o enviar 1,000 correos), desacopla el trabajo usando **Colas de Mensajería (Message Queues)**:

```
[ Cliente ] ──(POST /reporte)──> [ API Web ] ──(Envía tarea a la cola)──> [ RabbitMQ / Redis ]
                                     │                                              │
                     (Responde 202 Accepted de inmediato)                           ▼
                                                                           [ Worker en Background ]
                                                                           (Procesa el PDF a su ritmo)
```

* **Herramientas Clave**:
  * **RabbitMQ**: Excelente para colas de tareas con enrutamiento complejo de mensajes.
  * **Apache Kafka**: Diseñado para transmisión masiva de eventos en tiempo real (*Event Streaming*) con capacidad de replay y millones de eventos por segundo.
  * **Redis Pub/Sub o BullMQ**: Ligero y fácil de implementar para proyectos Node.js/Python.

---

## 6. El Teorema CAP en Sistemas Distribuidos

En cualquier sistema distribuido que almacene datos a través de una red, ante una falla de comunicación entre servidores (**P - Tolerancia a Particiones**), solo puedes elegir una de dos garantías:

```
                    TEOREMA CAP
                        /\
                       /  \
                      /    \
                     /  CA  \  (Sistemas centralizados tradicionales)
                    /        \
(Consistencia)  C  /__________\  A  (Disponibilidad)
                   \    CP    /
                    \        /  (Prefiere fallar a devolver datos desactualizados)
                     \  AP  /   (Prefiere devolver datos desactualizados a fallar)
                      \    /
                       \  /
                        \/
                  P (Partición de Red)
```

* **CP (Consistency + Partition Tolerance)**: Si un nodo de la base de datos no puede sincronizarse con los demás debido a una caída de red, prefiere rechazar la petición del usuario antes que devolver un dato incorrecto o desactualizado (ej. saldo de cuenta bancaria).
* **AP (Availability + Partition Tolerance)**: Prefiere responder siempre al usuario con el último dato disponible, aunque exista el riesgo temporal de que no sea el más reciente (ej. conteo de likes en un post de Instagram).

---

## 7. Recursos Recomendados para Aprender System Design

* **El repositorio de referencia obligado**: [donnemartin / system-design-primer](https://github.com/donnemartin/system-design-primer)
* **Canal en video**: [NeetCode – System Design Playlist](https://www.youtube.com/@NeetCode) y [ByteByteGo (Alex Xu)](https://www.youtube.com/@ByteByteGo)
* **Documentación oficial de caché**: [Redis Official Documentation](https://redis.io/docs/latest/)
* **Tutoriales oficiales de colas**: [RabbitMQ Official Tutorials](https://www.rabbitmq.com/tutorials)
* **Explicación del Teorema CAP**: [IBM – What is the CAP Theorem?](https://www.ibm.com/topics/cap-theorem)
* **Libro de referencia**: *"Designing Data-Intensive Applications"* (Martin Kleppmann)

---

👉 **Siguiente paso:** **[DevOps, Terminal Linux, Docker y Automatización CI/CD](../devops/README.md)**
