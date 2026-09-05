# 🗄️ Bases de Datos, Modelado Relacional y Persistencia

El código va y viene; los frameworks cambian cada dos años, pero **los datos de una empresa son su activo más valioso e irremplazable**. Si un servidor se cae, lo reinicias; si los datos se corrompen o se pierden, el negocio puede quebrar.

---

## 1. SQL vs. NoSQL: ¿Cuál Elegir?

La eterna batalla no es sobre cuál tecnología es "mejor", sino sobre qué garantías de consistencia y flexibilidad requiere tu modelo de negocio:

| Característica | Bases de Datos Relacionales (SQL) | Bases de Datos NoSQL (Documentales / Clave-Valor) |
|---|---|---|
| **Estructura** | Esquema rígido y tabular (Tablas, Columnas, Filas). | Esquema dinámico/flexible (Documentos JSON, pares clave-valor). |
| **Integridad** | Estricta integridad referencial y garantías ACID completas. | Consistencia eventual en muchos casos; flexibilidad a nivel de aplicación. |
| **Escalabilidad** | Principalmente **Vertical** (más CPU/RAM en la misma máquina). | Diseñadas para **Horizontal** (distribuir datos entre muchos servidores). |
| **Consultas** | Consultas complejas con uniones (`JOIN`), agregaciones y filtros. | Búsquedas rápidas por ID o clave primaria; joins costosos o inexistentes. |
| **Ejemplos** | **PostgreSQL**, **MySQL**, SQLite, MariaDB. | **MongoDB**, **Redis**, DynamoDB, Cassandra. |

### Criterio de Selección Profesional
* **Elige SQL (PostgreSQL como opción por defecto)**: Para el 90% de las aplicaciones comerciales (comercio electrónico, sistemas financieros, redes sociales, autenticación de usuarios, inventarios). El modelo relacional previene la duplicación de datos y garantiza consistencia absoluta.
* **Elige NoSQL**:
  * **Redis (Clave-Valor en memoria)**: Para caché de alta velocidad, sesiones de usuario y contadores en tiempo real.
  * **MongoDB (Documental)**: Para catálogos con atributos altamente variables e impredecibles, logs de auditoría o almacenamiento transitorio de documentos JSON no relacionales.

---

## 2. El Modelo Relacional: Llaves y Relaciones

* **Primary Key (PK)**: Identificador único irrepetible de cada fila en una tabla (ej. `id` entero autoincremental o `UUID`).
* **Foreign Key (FK)**: Una columna que apunta a la Primary Key de otra tabla, estableciendo una relación formal y garantizando que no existan "registros huérfanos".

### Tipos de Relaciones
1. **Uno a Uno (1:1)**: Un usuario tiene un único perfil médico.
2. **Uno a Muchos (1:N)**: Un cliente tiene muchas órdenes de compra; cada orden pertenece a un único cliente.
3. **Muchos a Muchos (N:M)**: Un estudiante se inscribe en muchos cursos; un curso tiene muchos estudiantes. Requiere una **Tabla Intermedia o Pivote** (`inscripciones`) que almacena las llaves foráneas de ambos lados.

---

## 3. SQL Profesional: DDL y DML

El siguiente script en PostgreSQL muestra la creación de un esquema con restricciones estrictas de integridad y una consulta analítica:

```sql
-- ==========================================================
-- 1. DDL: Definición de Esquema con Restricciones
-- ==========================================================

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ordenes (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
    estado VARCHAR(20) DEFAULT 'PENDIENTE',
    fecha_orden TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Creación de un índice en la Foreign Key para acelerar JOINs y búsquedas
CREATE INDEX idx_ordenes_cliente_id ON ordenes(cliente_id);

-- ==========================================================
-- 2. DML: Consulta Analítica Avanzada con JOIN y Agregaciones
-- ==========================================================

SELECT 
    c.id AS cliente_id,
    c.nombre,
    COUNT(o.id) AS total_compras,
    COALESCE(SUM(o.total), 0.00) AS volumen_total_gastado
FROM clientes c
LEFT JOIN ordenes o ON c.id = o.cliente_id AND o.estado = 'COMPLETADA'
GROUP BY c.id, c.nombre
HAVING COALESCE(SUM(o.total), 0.00) > 500.00
ORDER BY volumen_total_gastado DESC;
```

---

## 4. Tipos de JOINs Explicados Visualmente

```
    INNER JOIN               LEFT JOIN              FULL OUTER JOIN
  +-----+  +-----+        +-----+  +-----+        +-----+  +-----+
  |  A  |∩|  B  |        |  A  |█|  B  |        |  A  |█|  B  |
  +-----+  +-----+        +-----+  +-----+        +-----+  +-----+
 Solo filas coincidentes   Todas las de A +       Absolutamente todas las
 en ambas tablas.          coincidentes de B.     filas de ambas tablas.
```

---

## 5. Índices: La Espada de Doble Filo

Un **índice** (comúnmente implementado como un árbol **B-Tree** balanceado) es una estructura auxiliar que permite a la base de datos encontrar registros en tiempo $O(\log n)$ en lugar de tener que escanear toda la tabla fila por fila (*Sequential Scan* $O(n)$).

* **Ventaja**: Las consultas con `WHERE`, `ORDER BY` y `JOIN` sobre columnas indexadas son órdenes de magnitud más rápidas.
* **Coste / Desventaja**: **Ralentiza las escrituras (`INSERT`, `UPDATE`, `DELETE`)** porque cada cambio obliga a rebalancear el árbol B-Tree del índice en disco, además de consumir espacio adicional de almacenamiento.
* **Regla**: Indexa columnas que se usen frecuentemente para filtrar o unir, pero nunca indexes a ciegas todas las columnas de una tabla.

---

## 6. Normalización de Bases de Datos (1FN, 2FN, 3FN)

El proceso de normalización busca **eliminar la redundancia de datos** y evitar anomalías de inserción, actualización o borrado:

* **Primera Forma Normal (1FN)**:
  * Cada celda debe contener un único valor atómico (no guardar listas de emails separadas por comas en un solo campo).
  * Cada fila debe tener una clave primaria identificable.
* **Segunda Forma Normal (2FN)**:
  * Cumplir 1FN.
  * Todas las columnas que no forman parte de la clave primaria deben depender de la **totalidad** de la clave primaria (evita dependencias parciales en claves compuestas).
* **Tercera Forma Normal (3FN)**:
  * Cumplir 2FN.
  * Ninguna columna que no sea clave debe depender de otra columna que tampoco sea clave (**eliminar dependencias transitivas**). Por ejemplo: si tienes `ciudad` y `codigo_postal`, el código postal determina la ciudad; debes extraer esa relación a una tabla propia.

---

## 7. Propiedades ACID en Transacciones

Una **transacción** es un conjunto de operaciones que deben ejecutarse como una sola unidad indivisible (ej. transferir dinero de la Cuenta A a la Cuenta B implica restar en A y sumar en B). Las bases de datos profesionales garantizan **ACID**:

* **A - Atomicidad (*Atomicity*)**: "Todo o nada". Si falla el segundo paso de la transacción, el sistema revierte automáticamente el primer paso (*Rollback*).
* **C - Consistencia (*Consistency*)**: La base de datos pasa de un estado válido a otro, respetando siempre todas las restricciones de tipos, llaves y checks.
* **I - Aislamiento (*Isolation*)**: Transacciones concurrentes se ejecutan sin interferir entre sí como si fueran secuenciales, evitando lecturas sucias (*Dirty Reads*).
* **D - Durabilidad (*Durability*)**: Una vez que la base de datos confirma el éxito (*Commit*), los cambios quedan grabados en disco y sobrevivirán incluso si el servidor se apaga violentamente por un corte de energía un milisegundo después.

---

## 📚 Recursos Recomendados del Tema

* **Curso en video para principiantes**: [freeCodeCamp – SQL for Beginners](https://www.youtube.com/watch?v=HXV3zeQKqGY)
* **Práctica interactiva en navegador**: [SQLZoo](https://sqlzoo.net) y [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/)
* **Certificación gratuita oficial**: [freeCodeCamp – Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/)
* **Documentación de referencia**: [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* **Guía visual de normalización (1FN, 2FN, 3FN)**: [freeCodeCamp – Database Normalization Explained](https://www.freecodecamp.org/news/database-normalization-1nf-2nf-3nf-table-examples/)

---

👉 **Siguiente paso:** **[Principios de Ingeniería de Software, SOLID y Patrones](../software-engineering/README.md)**
