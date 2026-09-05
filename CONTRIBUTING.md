# Guía de Contribución (Contributing Guidelines)

¡Gracias por tu interés en contribuir a la **Guía del Desarrollador**! Este proyecto es un esfuerzo colaborativo y de código abierto para proporcionar una ruta de aprendizaje clara, honesta y técnicamente rigurosa para aspirantes a ingenieros de software.

Para mantener la máxima calidad pedagógica y técnica, solicitamos a todos los colaboradores seguir estas pautas.

---

## 1. Principios Editoriales y Filosofía

Antes de proponer un cambio, ten en cuenta nuestros principios fundamentales:
1. **Criterio antes que volumen**: No buscamos recopilar "todos los recursos de internet", sino los **mejores**, más claros y actualizados.
2. **Prioridad a documentación oficial**: Siempre que exista una documentación oficial bien redactada y mantenida (ej. MDN, Python Docs, React Docs), dale prioridad frente a artículos de blogs o tutoriales de terceros.
3. **Honestidad técnica**: Hablamos con sinceridad de lo que la industria realmente exige a un perfil junior frente a mitos de marketing de bootcamps o redes sociales.
4. **Sin autopromoción no solicitada**: No se aceptan enlaces a cursos de pago propios, canales personales sin trayectoria comprobada, o servicios comerciales sin previa discusión.

---

## 2. Convenciones de Commits (Conventional Commits)

Este repositorio utiliza el estándar **Conventional Commits** en inglés con el formato:

```text
type(scope): summary
```

### Tipos permitidos (`type`):
- `docs`: Modificaciones, correcciones o adiciones en la documentación.
- `feat`: Nuevos módulos, secciones completas o guías de especialización.
- `fix`: Corrección de errores tipográficos, explicaciones técnicas erróneas o enlaces rotos.
- `chore`: Tareas de mantenimiento, actualización de `.gitignore`, licencias o configuraciones.
- `refactor`: Reorganización de carpetas o reestructuración de documentos sin cambiar el sentido del contenido.

### Alcances recomendados (`scope`):
- `docs`, `fundamentals`, `programming`, `web`, `backend`, `frontend`, `databases`, `devops`, `cloud`, `security`, `ai`, `career`, `resources`, `repo`.

### Reglas estrictas:
- El resumen debe escribirse en **inglés**, en minúsculas y en modo imperativo (ej. `docs(git): fix diagram of rebase command`).
- **Sin trailers o firmas de IA** (ej. evitar `Co-authored-by: AI`, o marcas publicitarias en el mensaje).

---

## 3. Criterios de Inclusión de Recursos y Enlaces

Cualquier recurso sugerido para `docs/resources/` o guías individuales debe cumplir con la **ficha técnica estándar**:

```markdown
### [Nombre del Recurso](https://ejemplo.com/recurso)
- **Para qué sirve**: Descripción concisa (1 o 2 oraciones) de su propósito.
- **Nivel recomendado**: Principiante / Intermedio / Avanzado.
- **Qué aprenderás**: Conceptos clave que domina el estudiante al finalizar.
- **Formato y Coste**: Gratuito / Freemium / Libro / Video / Interactivo.
```

### Criterios de exclusión y eliminación (Link Rot & Obsolescencia):
- **Enlaces caídos o rotos**: Serán eliminados o sustituidos inmediatamente en cuanto se detecten.
- **Tecnologías deprecadas**: Recursos que enseñen versiones obsoletas (ej. Python 2, React con clases para principiantes, PHP 5) serán retirados.
- **Paywalls agresivos**: Se prefieren recursos gratuitos, abiertos o con acceso comunitario generoso.

---

## 4. Estilo y Formato de Markdown

- **Encabezados**: Respeta la jerarquía semántica (`#` para título único, `##` para secciones, `###` para subsecciones).
- **Bloques de código**: Especifica siempre el lenguaje en el bloque (` ```python `, ` ```bash `, ` ```json `).
- **Alertas de GitHub**: Utiliza sintaxis estándar (`> [!NOTE]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!TIP]`).
- **Diagramas**: Utiliza diagramas de texto ASCII o bloques Mermaid limpios y bien comentados.
- **Tono**: Profesional, didáctico, directo, libre de clichés y modismos excesivos.

---

## 5. Proceso para Enviar un Pull Request

1. **Haz un Fork** del repositorio en tu cuenta de GitHub.
2. **Clona** tu fork localmente:
   ```bash
   git clone https://github.com/tu-usuario/developer-roadmap-guide.git
   cd developer-roadmap-guide
   ```
3. **Crea una rama descriptiva**:
   ```bash
   git checkout -b docs/add-system-design-resources
   ```
4. **Realiza tus cambios** asegurándote de validar que todos los enlaces relativos y externos funcionen.
5. **Haz commit** siguiendo Conventional Commits:
   ```bash
   git commit -m "docs(resources): add system design primer link and review summary"
   ```
6. **Envía tus cambios** a tu fork:
   ```bash
   git push origin docs/add-system-design-resources
   ```
7. **Abre un Pull Request** hacia la rama `main` de este repositorio describiendo claramente la motivación del cambio.
