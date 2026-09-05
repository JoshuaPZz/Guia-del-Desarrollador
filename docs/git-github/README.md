# 🐙 Git y GitHub: Control de Versiones Profesional

Git no es una herramienta para guardar copias de seguridad en la nube; es un **grafo acíclico dirigido (DAG) de instantáneas criptográficas de tu proyecto**. Dominar Git es la diferencia entre trabajar como un aficionado y colaborar fluidamente en equipos de ingeniería de clase mundial.

---

## 1. Git vs. GitHub: La Distinción Fundamental

* **Git**: Es un software de control de versiones distribuido que corre localmente en tu máquina (sin necesidad de conexión a Internet). Se encarga de rastrear qué líneas cambiaron, quién las cambió y cuándo.
* **GitHub**: Es una plataforma de alojamiento en la nube para repositorios Git. Proporciona una interfaz web, herramientas de revisión de código (*Pull Requests*), gestión de incidencias (*Issues*) y pipelines de automatización (*GitHub Actions*). Otras alternativas equivalentes son GitLab y Bitbucket.

---

## 2. El Modelo Mental de los 4 Estados de Git

Para nunca más temerle a Git, memoriza el ciclo de vida de un cambio:

```
    ÁREA DE TRABAJO             STAGING AREA              REPOSITORIO LOCAL            REPOSITORIO REMOTO
   (Working Directory)             (Index)                 (Commit History)             (GitHub / GitLab)
  +-------------------+       +-----------------+       +--------------------+       +--------------------+
  | Archivos en tu    |       | Archivos listos |       | Instantánea en la  |       | Servidor central   |
  | editor (disco)    |       | para el commit  |       | base de datos Git  |       | en la nube         |
  +-------------------+       +-----------------+       +--------------------+       +--------------------+
            |                          |                          |                             |
            |-------- git add -------->|                          |                             |
            |                          |------- git commit ------>|                             |
            |                                                     |---------- git push -------->|
            |                                                     |<--------- git fetch --------|
            |<----------------------- git pull (fetch + merge) ---------------------------------|
```

---

## 3. Guía de Comandos Esenciales para el Día a Día

### Configuración Inicial (Solo una vez en tu máquina)
```bash
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu_email@ejemplo.com"
git config --global init.defaultBranch main
```

### Inicializar y Conectar un Repositorio
```bash
# Iniciar un repositorio nuevo en la carpeta actual
git init

# O clonar un repositorio existente desde GitHub
git clone https://github.com/usuario/nombre-repo.git

# Vincular un repositorio local a uno remoto en GitHub
git remote add origin https://github.com/usuario/nombre-repo.git
```

### El Ciclo Diario: Inspeccionar, Preparar y Registrar
```bash
# Ver qué archivos fueron modificados o no están rastreados
git status

# Agregar archivos específicos al Staging Area (preparación)
git add src/index.js src/estilos.css

# O agregar todos los archivos modificados respetando el .gitignore
git add .

# Registrar la instantánea definitiva con un mensaje descriptivo
git commit -m "feat(auth): add JWT token verification middleware"
```

### Sincronización con el Repositorio Remoto
```bash
# Descargar cambios remotos y fusionarlos con tu rama actual
git pull origin main

# Enviar tus commits locales al servidor remoto
git push -u origin main
```

---

## 4. Estrategia de Ramas (*Branching*), Merge y Rebase

Nunca programes directamente sobre la rama `main` en un entorno profesional. Toda nueva funcionalidad o corrección debe vivir en una rama aislada.

```bash
# Crear y cambiarte a una rama nueva para una funcionalidad
git checkout -b feat/recuperacion-contrasena
# O con la sintaxis moderna:
git switch -c feat/recuperacion-contrasena

# Listar todas las ramas locales
git branch

# Volver a la rama principal
git switch main
```

### Merge vs. Rebase: ¿Cuál Usar?

```
MERGE (Crea un commit de fusión explícito; preserva la historia exacta tal cual ocurrió)
        A---B---C (feat)
       /         \
  D---E-----------F (main con commit de merge)

REBASE (Reescribe la historia linealmente, colocando tus commits sobre la punta de main)
  D---E---A'---B'---C' (main lineal y limpio)
```

* **Usa `git merge`**: Cuando finalizas una rama de feature y la integras a `main` (usualmente mediante un Pull Request en GitHub).
* **Usa `git rebase`**: Para mantener tu rama de trabajo actualizada con los últimos cambios de `main` antes de abrir tu PR, evitando commits de merge innecesarios:
  ```bash
  git switch feat/mi-feature
  git fetch origin
  git rebase origin/main
  ```

---

## 5. Cómo Resolver Conflictos de Fusión sin Pánico

Un **conflicto** ocurre cuando dos desarrolladores modificaron exactamente las mismas líneas de un mismo archivo en ramas distintas y Git no puede adivinar cuál versión es la correcta.

1. Al intentar hacer `merge` o `rebase`, Git pausará el proceso e indicará qué archivos tienen conflicto.
2. Abre el archivo en tu editor (VS Code mostrará resaltadores visuales). Verás marcas como estas:
   ```text
   <<<<<<< HEAD (Tu código actual)
   const timeout = 5000;
   =======
   const timeout = 10000;
   >>>>>>> origin/main (El código entrante)
   ```
3. Edita el archivo manualmente: borra los delimitadores (`<<<<<<<`, `=======`, `>>>>>>>`) y deja la versión final deseada.
4. Guarda el archivo, prepáralo y continúa el proceso:
   ```bash
   git add ruta/al/archivo_en_conflicto.js
   git rebase --continue
   # O si estabas haciendo merge:
   git commit -m "fix(merge): resolve timeout collision in network client"
   ```

---

## 6. Convención de Mensajes: Conventional Commits

En equipos de ingeniería serios no se aceptan mensajes como `"cambios"`, `"arreglos varios"` o `"subiendo archivos"`. Se utiliza la convención estandarizada **Conventional Commits**:

Formato: `<tipo>(<alcance opcional>): <descripción concisa en imperativo>`

### Tipos Oficiales:
* `feat`: Una nueva funcionalidad para el usuario (ej. `feat(cart): add one-click checkout`).
* `fix`: Corrección de un bug o comportamiento erróneo (ej. `fix(auth): prevent session expiration on refresh`).
* `docs`: Cambios exclusivos en documentación (ej. `docs(readme): update installation steps`).
* `refactor`: Cambio de código que no arregla un bug ni añade una función nueva (ej. `refactor(db): extract query builder class`).
* `test`: Adición o corrección de pruebas unitarias o de integración (ej. `test(api): add negative test cases for login`).
* `chore`: Tareas de mantenimiento, dependencias o tooling (ej. `chore(deps): bump typescript from 5.2 to 5.3`).

---

## 7. El Archivo `.gitignore`: Protege tus Secretos

El archivo `.gitignore` le dice a Git qué archivos o carpetas deben ser ignorados y nunca rastreados en el repositorio.

```gitignore
# Dependencias masivas descargables (nunca deben subirse)
node_modules/
venv/
target/

# Secretos y credenciales críticas (PELIGRO DE SEGURIDAD)
.env
.env.production
*.pem
*.key

# Archivos de configuración del sistema operativo o editor
.DS_Store
Thumbs.db
.vscode/
.idea/

# Compilados y artefactos temporales
dist/
build/
*.log
```

---

## 8. Anatomía de un Repositorio Profesional en GitHub

Para que un repositorio demuestre calidad técnica ante cualquier reclutador o colega debe contar con:
1. **`README.md` impecable**: Qué hace el proyecto, tecnologías usadas, capturas/demostración y cómo levantarlo localmente en 3 pasos.
2. **`LICENSE`**: Claridad legal sobre los derechos de uso (ej. MIT para código abierto permisivo).
3. **`.gitignore` bien configurado**: Cero archivos temporales ni librerías de terceros en el árbol de Git.
4. **Historial de Commits limpio**: Commits atómicos y descriptivos siguiendo Conventional Commits.
5. **Issues y Pull Requests estructurados**: Uso de plantillas claras para reportar errores o solicitar revisiones de código.

---

## 📚 Recursos Recomendados del Tema

* **Cursos interactivos oficiales**: [GitHub Skills](https://github.com/skills)
* **Libro oficial gratuito**: [Pro Git (Scott Chacon & Ben Straub)](https://git-scm.com/book/en/v2)
* **Curso completo en video**: [freeCodeCamp – Git and GitHub for Beginners](https://www.youtube.com/watch?v=RGOj5yH7evk)
* **Simulador visual de ramas y rebase**: [Learn Git Branching](https://learngitbranching.js.org)

---

👉 **Siguiente paso:** **[Fundamentos del Desarrollo Web y Arquitectura HTTP](../web-development/README.md)**
