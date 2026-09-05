# 🧠 Fundamentos Técnicos de la Inteligencia Artificial y LLMs

Para interactuar con la Inteligencia Artificial como un ingeniero de software (y no como un simple usuario final que chatea con una interfaz web), es imprescindible comprender los mecanismos matemáticos y computacionales que operan debajo de los Modelos de Lenguaje Masivos (*LLMs*).

---

## 1. ¿Cómo Funciona un LLM por Dentro?

Un LLM (como GPT-4, Claude o Gemini) es una **red neuronal profunda basada en la arquitectura Transformer**, entrenada sobre billones de palabras para resolver una tarea matemática elemental: **predecir el token más probable que continúa a una secuencia de texto dada**.

Un modelo no "razona" como un ser humano; calcula probabilidades estadísticas condicionales sobre representaciones numéricas.

---

## 2. Conceptos Clave de la Arquitectura de IA

```
[ Texto de Entrada ] ──> [ Tokenizador ] ──> [ Tokens (IDs) ] ──> [ Modelo / Embeddings ]
                                                                            │
[ Salida en Lenguaje Natural ] <── [ Des-tokenizador ] <── [ Predicción de Siguiente Token ]
```

### A. Tokens y Ventana de Contexto (*Context Window*)
* **Token**: La unidad mínima de procesamiento de un modelo. En inglés, un token equivale aproximadamente a 4 caracteres o tres cuartas partes de una palabra; en español o código, las palabras suelen dividirse en más tokens.
* **Ventana de Contexto**: La cantidad máxima de tokens (de entrada + salida) que el modelo puede retener en su "memoria activa" durante una inferencia (ej. 128k, 1M o 2M tokens).

### B. Embeddings (Vectores Semánticos)
Un **Embedding** es una representación matemática de un texto en forma de vector de números de alta dimensión (ej. una lista de 1,536 números flotantes).
* Textos con significados conceptualmente similares quedan ubicados cerca unos de otros en el espacio vectorial.
* Permite calcular la **Similitud del Coseno** para saber si dos textos hablan de lo mismo, incluso si no comparten exactamente las mismas palabras.

### C. Bases de Datos Vectoriales
Bases de datos optimizadas para almacenar millones de embeddings y realizar búsquedas de similitud en milisegundos mediante algoritmos como HNSW:
* **Herramientas**: Qdrant, Pinecone, Milvus, o extensiones SQL como **`pgvector`** para PostgreSQL.

---

## 3. Arquitectura RAG (*Retrieval-Augmented Generation*)

Los modelos base tienen dos grandes limitaciones:
1. Tienen una **fecha de corte de conocimiento** (*Knowledge Cutoff*).
2. **No conocen los datos privados** de tu empresa o de tu código interno.

Para solucionar esto sin tener que re-entrenar el modelo (lo cual costaría millones de dólares), la industria utiliza **RAG**:

```
1. Consulta del Usuario: "¿Cómo configuro los pagos en nuestra API?"
                    │
                    ▼
2. Generar Embedding de la Consulta
                    │
                    ▼
3. Búsqueda Vectorial en Base de Datos de Documentos Internos
                    │
                    ▼
4. Recuperar los 3 fragmentos más relevantes del manual interno
                    │
                    ▼
5. Construir Prompt Aumentado:
   "Contexto: [Fragmentos recuperados]. 
    Pregunta: ¿Cómo configuro los pagos en nuestra API?
    Instrucción: Responde usando únicamente el contexto provisto."
                    │
                    ▼
6. LLM genera una respuesta precisa, actualizada y sin alucinaciones.
```

---

## 4. Function Calling (Tool Calling) y Agentes

Un LLM por sí solo solo genera texto. El **Function Calling** permite al modelo conectarse con el mundo exterior y actuar sobre sistemas reales:

1. Le entregas al modelo una lista de funciones en formato JSON Schema (ej. `consultarClima(ciudad: string)` o `ejecutarConsultaSQL(query: string)`).
2. El modelo analiza la petición del usuario y, en lugar de inventar una respuesta, devuelve un JSON estructurado indicando **qué función quiere llamar y con qué argumentos**.
3. Tu código en backend ejecuta la función real (hace la consulta a la base de datos o API externa) y le regresa el resultado al modelo.
4. El modelo lee el resultado y sintetiza una respuesta final amigable para el usuario.

### ¿Qué es un Agente de IA?
Un **Agente** es un sistema autónomo que utiliza un LLM como motor de razonamiento dentro de un bucle de **Pensar -> Planear -> Actuar (Llamar Herramienta) -> Observar Resultado (Loop ReAct)** hasta completar un objetivo complejo de múltiples pasos.

---

## 5. Model Context Protocol (MCP)

El **Model Context Protocol (MCP)** es un estándar abierto impulsado por la industria que desacopla los asistentes de IA de las fuentes de datos y herramientas:
* En lugar de que cada modelo o IDE tenga que programar conectores individuales para GitHub, Slack, Postgres o Jira, los servicios exponen servidores MCP estandarizados que cualquier cliente de IA compatible puede consultar e invocar de forma universal y segura.

---

## 📚 Recursos Recomendados del Tema

* **Documentación de LLMs, Tool Use y MCP**: [Anthropic Claude Official Docs](https://docs.claude.com)
* **Microcursos especializados gratuitos**: [DeepLearning.AI – Short Courses on LLMs and RAG](https://www.deeplearning.ai/short-courses/)
* **Framework para aplicaciones con LLMs**: [LangChain Documentation](https://python.langchain.com/docs/introduction/)
* **Especificación estándar de protocolo**: [Model Context Protocol (MCP) Official Spec](https://modelcontextprotocol.io)

---

👉 **Siguiente paso:** **[Cómo Usar IA Profesional y Responsablemente como Desarrollador](../ai-for-developers/README.md)**
