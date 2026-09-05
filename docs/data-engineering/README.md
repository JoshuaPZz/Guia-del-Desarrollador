# 📊 Ruta de Especialización: Ingeniería de Datos (Data Engineering)

La Inteligencia Artificial y la Ciencia de Datos son imposibles sin la **Ingeniería de Datos**. Mientras los científicos de datos entrenan modelos y los analistas crean dashboards, el **Data Engineer diseña, construye, monitorea y escala las tuberías (*pipelines*) e infraestructura distribuida que transportan terabytes de datos brutos y los transforman en información limpia, confiable y accesible en tiempo real**.

---

## 🗺️ Roadmap Progresivo de Ingeniería de Datos

```
[ 1. Fundamentos: Programación (Python) + SQL Avanzado + Linux ]
                                │
                                ▼
[ 2. Arquitectura de Almacenamiento: Data Warehouse vs. Data Lake vs. Lakehouse ]
                                │
                                ▼
[ 3. Modelado Dimensional: Esquemas Estrella, Copo de Nieve y Hechos/Dimensiones ]
                                │
                                ▼
[ 4. Procesamiento Distribuido Batch (Apache Spark / PySpark) ]
                                │
                                ▼
[ 5. Orquestación y Flujos de Trabajo (Apache Airflow, Prefect) ]
                                │
                                ▼
[ 6. Transformación en el Warehouse (dbt - data build tool) ]
                                │
                                ▼
[ 7. Procesamiento en Streaming y Tiempo Real (Apache Kafka, Flink) ]
                                │
                                ▼
[ 8. Plataformas Modernas Cloud: Snowflake, BigQuery, Databricks ]
```

---

## 1. Fundamentos Nucleares

### A. SQL Avanzado para Análisis y Procesamiento
No basta con `SELECT * FROM tabla`. Un ingeniero de datos domina:
* **Funciones de Ventana (*Window Functions*)**: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LEAD()`, `LAG()` para calcular particiones analíticas sin subconsultas lentas:
  ```sql
  SELECT 
      empleado_id,
      departamento_id,
      salario,
      AVG(salario) OVER (PARTITION BY departamento_id) AS salario_medio_depto,
      RANK() OVER (PARTITION BY departamento_id ORDER BY salario DESC) AS ranking_salarial
  FROM empleados;
  ```
* **Expresiones de Tabla Comunes (CTEs / `WITH`)**: Para estructurar transformaciones complejas de forma legible y modular.
* **Formatos de Almacenamiento Columnares**: Comprender por qué los formatos como **Apache Parquet** u **ORC** son hasta 100 veces más eficientes que CSV/JSON para consultas analíticas masivas (compresión por columnas, *snappy compression*, y lectura selectiva de datos).

---

## 2. Paradigmas de Almacenamiento Masivo

| Concepto | Propósito | Formato de Almacenamiento | Motores Líderes |
|---|---|---|---|
| **Data Warehouse (DWH)** | Almacena datos limpios, altamente estructurados y modelados para consultas analíticas rápidas de negocio. | Tablas propietarias columnares optimizadas. | **Snowflake**, **Google BigQuery**, **Amazon Redshift**. |
| **Data Lake** | Repositorio centralizado para almacenar datos crudos en cualquier formato (estructurado, semi-estructurado JSON, no estructurado audio/video) a bajísimo coste. | Archivos en almacenamiento de objetos (`S3`, `GCS`, `Azure Blob`). | Amazon S3, MinIO, Azure ADLS Gen2. |
| **Data Lakehouse** | Lo mejor de ambos mundos: añade capas de transaccionalidad ACID, control de versiones de datos y esquemas sobre el almacenamiento barato del Data Lake. | Formatos de tabla abierta: **Delta Lake**, **Apache Iceberg**, **Apache Hudi**. | **Databricks**, Trino, Presto. |

---

## 3. De ETL a ELT

* **ETL Tradicional (*Extract, Transform, Load*)**: Extraer de la base de datos transaccional, transformar con servidores pesados dedicados, y cargar en el almacén de datos.
* **ELT Moderno (*Extract, Load, Transform*)**: Con la llegada de almacenes ultrarrápidos como Snowflake o BigQuery, la industria extrae los datos crudos, los carga directamente en el Data Lake/Warehouse, y las transformaciones se realizan **dentro del propio motor** utilizando herramientas como **dbt (*data build tool*)** mediante SQL declarativo.

---

## 4. Ecosistema de Herramientas Clave

1. **Apache Spark (PySpark)**: El motor estándar de la industria para procesamiento de datos a gran escala en memoria distribuida.
2. **Apache Airflow**: La plataforma líder para programar, orquestar y monitorear pipelines complejos como Grafos Acíclicos Dirigidos (DAGs) escritos en Python.
3. **Apache Kafka**: Plataforma de eventos distribuidos de alta velocidad para ingerir millones de eventos por segundo en arquitecturas de tiempo real (*streaming*).
4. **dbt (data build tool)**: Permite a los ingenieros modelar datos dentro del Data Warehouse aplicando buenas prácticas de ingeniería de software (control de versiones en Git, pruebas automáticas de datos, documentación y linaje).

---

## 🎓 Recursos, Cursos y Certificaciones de Ingeniería de Datos

### 📖 Documentación Oficial y Tutoriales
* **[Apache Airflow Official Documentation](https://airflow.apache.org/docs/)**: Guía oficial y tutorial de DAGs.
* **[Apache Spark Official Documentation](https://spark.apache.org/docs/latest/)**: Guía oficial y API de PySpark.
* **[dbt Learn](https://learn.getdbt.com)** *(100% Gratuito)*: Cursos oficiales para dominar transformaciones y pruebas con dbt.
* **[Apache Kafka Documentation](https://kafka.apache.org/documentation/)**: Manual oficial de arquitectura y configuración de eventos.
* **Libro**: *"Fundamentals of Data Engineering"* (Joe Reis & Matt Housley - O'Reilly): La lectura de referencia obligatoria para entender el ciclo de vida de los datos.
* **Libro**: *"The Data Warehouse Toolkit"* (Ralph Kimball): La biblia clásica del modelado dimensional (hechos y dimensiones).

### 📺 Canales de YouTube Recomendados
* **[Seattle Data Guy (Ben Rogojan)](https://www.youtube.com/@SeattleDataGuy)**: Explicaciones directas, comparativas de herramientas y consejos de carrera en Data Engineering.
* **[Data Engineering Zoomcamp (DataTalksClub)](https://www.youtube.com/@DataTalksClub)**: Curso completo gratuito paso a paso de ingeniería de datos.

### 💻 Cursos Gratuitos y de Pago
* **[Data Engineering Zoomcamp (DataTalks.Club)](https://github.com/DataTalksClub/data-engineering-zoomcamp)** *(100% Gratuito en GitHub)*: El mejor bootcamp abierto del mundo. Cubre Docker, Postgres, Terraform, GCP, Airflow, Spark, dbt y Kafka.
* **[Data Engineering on AWS (Coursera / AWS)](https://www.coursera.org/specializations/aws-data-engineering)** *(Freemium / Pago para certificado)*: Formación oficial impartida por Amazon Web Services sobre Redshift, Glue, EMR y Athena.
* **[Databricks Academy](https://www.databricks.com/learn/training/home)** *(Cursos gratuitos de autoestudio)*: Formación oficial sobre Lakehouse, Apache Spark y Delta Lake.

### 📜 Certificaciones de Alto Reconocimiento
1. **[AWS Certified Data Engineer – Associate (DEA-C01)](https://aws.amazon.com/certification/certified-data-engineer-associate/)**:
   * *Nivel*: Intermedio / Associate.
   * *Qué valida*: Ingesta, transformación, pipelines y seguridad en AWS (Kinesis, Glue, Redshift, Athena, S3).
2. **[Databricks Certified Associate Data Engineer](https://www.databricks.com/learn/certification/data-engineer-associate)**:
   * *Nivel*: Intermedio.
   * *Qué valida*: Procesamiento masivo con Apache Spark, orquestación con Lakehouse, transformaciones con Delta Live Tables.
3. **[Google Cloud Professional Data Engineer](https://cloud.google.com/learn/certification/data-engineer)**:
   * *Nivel*: Avanzado / Profesional.
   * *Qué valida*: Diseño de sistemas de datos a escala empresarial con BigQuery, Dataflow (Beam), Pub/Sub y Cloud Bigtable.

---

👉 **Siguiente paso:** Conoce la ruta complementaria de análisis y modelos: **[Ruta de Ciencia de Datos (Data Science)](../data-science/README.md)**
