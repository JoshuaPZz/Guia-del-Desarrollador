# 🔬 Ruta de Especialización: Ciencia de Datos y Machine Learning

La **Ciencia de Datos (Data Science)** es el campo interdisciplinario que combina el rigor del método científico, las matemáticas, la estadística aplicada y la programación para **extraer conocimiento, descubrir patrones ocultos y construir modelos predictivos capaces de tomar decisiones automatizadas a partir de los datos**.

---

## 🗺️ Roadmap Progresivo de Data Science & Machine Learning

```
[ 1. Fundamentos Matemáticos: Álgebra Lineal, Cálculo y Estadística ]
                                │
                                ▼
[ 2. Stack Científico en Python: NumPy, Pandas, Matplotlib & Seaborn ]
                                │
                                ▼
[ 3. Análisis Exploratorio de Datos (EDA) y Limpieza de Datos ]
                                │
                                ▼
[ 4. Machine Learning Clásico (Scikit-Learn, XGBoost, LightGBM) ]
                                │
                                ▼
[ 5. Evaluación Rigurosa de Modelos y Ajuste de Hiperparámetros ]
                                │
                                ▼
[ 6. Deep Learning & Redes Neuronales (PyTorch) ]
                                │
                                ▼
[ 7. Introducción a MLOps: Registro con MLflow y Despliegue con FastAPI ]
```

---

## 1. Cimientos Matemáticos y Estadísticos

No necesitas un doctorado en matemáticas para construir modelos aplicados, pero ignorar la estadística te llevará a entrenar modelos engañosos o sobreajustados (*overfitted*):

* **Álgebra Lineal**: Vectores, matrices, operaciones de producto punto (*dot product*), autovalores y autovectores (la base de cómo los algoritmos procesan datos multidimensionales).
* **Cálculo Multivariable**: Derivadas parciales y gradientes (el algoritmo de **Descenso del Gradiente** es el motor con el que aprenden casi todos los modelos de ML y redes neuronales).
* **Probabilidad y Estadística**:
  * Distribuciones estadísticas (Normal/Gaussiana, Binomial, Poisson).
  * Medidas de tendencia central y dispersión (Media, Mediana, Varianza, Desviación Estándar).
  * Prueba de hipótesis, intervalos de confianza y valores $p$ (*p-values*).
  * Teorema de Bayes y probabilidad condicional.

---

## 2. El Stack Nuclear de Python para Datos

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Cargar y explorar un dataset tabular
df = pd.read_csv("datos_ventas.csv")

# 2. Limpieza y filtrado
df['fecha'] = pd.to_datetime(df['fecha'])
df_limpio = df.dropna(subset=['monto']).copy()

# 3. Agrupación y métricas
resumen = df_limpio.groupby('categoria')['monto'].agg(['mean', 'sum', 'count'])
print(resumen)
```

1. **NumPy**: Manipulación ultrarrápida de matrices y arreglos multidimensionales en memoria contigua en C.
2. **Pandas**: Estructuras `DataFrame` y `Series` para cargar, filtrar, transformar y limpiar datos tabulares.
3. **Matplotlib & Seaborn**: Generación de histogramas, diagramas de dispersión (*scatter plots*), mapas de calor de correlación (*heatmaps*) y diagramas de caja (*box plots*).

---

## 3. Algoritmos de Machine Learning Fundamentales

### A. Aprendizaje Supervisado (Con etiquetas objetivo)
* **Regresión (Predecir un número continuo)**: Regresión Lineal, Ridge/Lasso, Random Forest Regressor, **XGBoost**.
* **Clasificación (Predecir una categoría)**: Regresión Logística, Árboles de Decisión, Random Forest, Máquinas de Soporte Vectorial (SVM), **LightGBM**.

### B. Aprendizaje No Supervisado (Descubrir estructura oculta sin etiquetas)
* **Clustering (Agrupamiento)**: **K-Means**, DBSCAN (segmentación de clientes o detección de anomalías).
* **Reducción de Dimensionalidad**: **PCA (*Principal Component Analysis*)** para comprimir cientos de variables en unos pocos componentes principales reteniendo la mayor varianza.

---

## 4. Métricas de Evaluación: No te Dejes Engañar por el "Accuracy"

En problemas desbalanceados (ej. detección de fraudes donde el 99.9% de las transacciones son legítimas), un modelo inútil que prediga siempre "legítimo" tendrá un 99.9% de precisión (*accuracy*), pero dejará pasar todos los fraudes.

```
                  MATRIZ DE CONFUSIÓN
                   Real Positivo      Real Negativo
 Predicho Positivo [ Verdadero Positivo (TP)  | Falso Positivo (FP)   ]
 Predicho Negativo [ Falso Negativo (FN)      | Verdadero Negativo (TN) ]
```

* **Precisión (*Precision*)**: De todos los que el modelo predijo como positivos, ¿cuántos eran reales? (Crítico para evitar falsas alarmas).
* **Exhaustividad (*Recall / Sensibilidad*)**: De todos los positivos reales que existían, ¿cuántos logró capturar el modelo? (Crítico en diagnósticos médicos o fraudes).
* **F1-Score**: La media armónica entre Precisión y Recall.
* **Curva ROC-AUC**: Medida de la capacidad del modelo para discriminar entre clases en diferentes umbrales.

---

## 5. De la Experimentación a Producción: MLOps Básico

Un modelo en un Jupyter Notebook (`.ipynb`) no aporta valor comercial hasta que se despliega:
1. **Seguimiento de Experimentos con MLflow**: Registra hiperparámetros, métricas y artefactos de cada ejecución.
2. **Exposición como API con FastAPI**: Empaqueta el modelo entrenado (`modelo.pkl` o `modelo.onnx`) en una API REST ligera.
3. **Contenedor Docker**: Garantiza que las versiones de Scikit-Learn o PyTorch sean idénticas en producción.

---

## 🎓 Recursos, Cursos y Certificaciones de Data Science & ML

### 📖 Libros Clásicos de Referencia
* **[An Introduction to Statistical Learning (ISLR)](https://www.statlearning.com/)** *(PDF Oficial 100% Gratuito)*: El libro de texto por excelencia de Machine Learning con ejemplos en Python y R.
* **Libro**: *"Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow"* (Aurélien Géron - O'Reilly): La guía más completa y práctica para programar modelos de principio a fin.

### 📺 Canales de YouTube Imprescindibles
* **[StatQuest with Josh Starmer](https://www.youtube.com/@statquest)**: Las explicaciones visuales más claras y pedagógicas de la historia sobre algoritmos de ML, árboles de decisión y redes neuronales.
* **[3Blue1Brown - Neural Networks & Linear Algebra](https://www.youtube.com/@3blue1brown)**: Animaciones matemáticas magistrales para entender qué es una red neuronal, el descenso del gradiente y el álgebra de matrices.

### 💻 Cursos de Formación (Gratis y de Pago)
* **[Machine Learning Specialization - Andrew Ng (Coursera / DeepLearning.AI)](https://www.coursera.org/specializations/machine-learning-introduction)** *(Freemium / Opción de pago para certificado)*: El curso fundacional más aclamado del mundo, impartido por el profesor pionero de Stanford Andrew Ng.
* **[Kaggle Learn](https://www.kaggle.com/learn)** *(100% Gratuito e Interactivo)*: Microcursos prácticos en navegador sobre Python, Pandas, Machine Learning e ingeniería de características.
* **[freeCodeCamp – Machine Learning with Python](https://www.freecodecamp.org/learn/machine-learning-with-python/)** *(100% Gratuito)*: Certificación práctica cubriendo TensorFlow y modelos de clasificación.
* **[Harvard CS50's Introduction to AI with Python](https://cs50.harvard.edu/ai/)** *(100% Gratuito)*: Algoritmos de búsqueda, grafos, probabilidad, redes neuronales y procesamiento de lenguaje natural.
* **[Practical Deep Learning for Coders (fast.ai)](https://course.fast.ai/)** *(100% Gratuito)*: Enfoque *top-down* revolucionario que enseña a entrenar redes neuronales de vanguardia desde la primera clase usando PyTorch.
* **Documentación oficial del stack**: [Pandas Documentation](https://pandas.pydata.org/docs/) y [Scikit-learn Documentation](https://scikit-learn.org/stable/).

### 📜 Certificaciones Oficiales Valiosas
1. **[AWS Certified Machine Learning – Specialty (MLS-C01)](https://aws.amazon.com/certification/certified-machine-learning-specialty/)**:
   * *Nivel*: Avanzado / Especialidad.
   * *Qué valida*: Ingeniería de datos para ML, modelado, despliegue y afinamiento en Amazon SageMaker.
2. **[Microsoft Certified: Azure Data Scientist Associate (DP-100)](https://learn.microsoft.com/credentials/certifications/azure-data-scientist/)**:
   * *Nivel*: Intermedio / Associate.
   * *Qué valida*: Experimentación, entrenamiento, optimización y puesta en producción con Azure Machine Learning.
3. **[TensorFlow Developer Certificate](https://www.tensorflow.org/certificate)**:
   * *Nivel*: Intermedio / Práctico.
   * *Qué valida*: Construcción de modelos de Deep Learning con TensorFlow (visión por computadora, NLP).

---

👉 **Siguiente paso:** Revisa la lista consolidada de certificaciones: **[Guía Oficial de Certificaciones](../certifications/README.md)**
