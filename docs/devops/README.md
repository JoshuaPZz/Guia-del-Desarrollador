# 🚀 DevOps: Linux, Docker, CI/CD y Automatización

DevOps no es un puesto de trabajo aislado; es una **cultura de ingeniería y un conjunto de prácticas técnicas** que derriban la barrera entre quienes escriben el software (Desarrollo) y quienes garantizan que funcione de forma continua y segura en servidores reales (Operaciones).

---

## 1. El Sistema Operativo del Servidor: Linux Esencial

El 95% de los servidores y contenedores del mundo corren sobre distribuciones de Linux (Ubuntu, Debian, Alpine). Si no dominas la terminal, serás incapaz de diagnosticar problemas en producción.

```bash
# 1. Navegación y Archivos
pwd                     # Muestra la ruta absoluta del directorio actual
ls -lah                 # Lista archivos detallados (permisos, tamaño, ocultos)
mkdir -p app/src        # Crea directorios anidados de una sola vez
cp -r origen/ destino/  # Copia directorios recursivamente
mv archivo.txt nuevo.txt # Mueve o renombra archivos
rm -rf carpeta_temporal # Borra recursiva y forzosamente (usar con extrema cautela)

# 2. Inspección de Procesos y Recursos del Sistema
htop                    # Monitor interactivo de CPU, memoria RAM y procesos
ps aux | grep "node"    # Busca si un proceso específico está corriendo
kill -9 <PID>           # Termina forzosamente un proceso por su ID numérico
df -h                   # Muestra espacio libre en discos duros
free -m                 # Muestra consumo de memoria RAM en Megabytes

# 3. Inspección de Logs, Tuberías (Pipes) y Redirecciones
cat app.log             # Vuelca todo el archivo en la consola
tail -n 50 -f app.log   # Muestra las últimas 50 líneas y sigue cambios en tiempo real
grep -rn "ERROR" ./logs # Busca la palabra "ERROR" en todos los logs con número de línea
curl -I https://api.com # Inspecciona cabeceras HTTP de un endpoint remoto
```

---

## 2. Docker: Contenedores vs. Máquinas Virtuales

```
     MÁQUINAS VIRTUALES (Pesadas)                 CONTENEDORES DOCKER (Ligeros)
┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
│ App 1         │ App 2                │     │ App 1         │ App 2                │
├───────────────┼──────────────────────┤     ├───────────────┼──────────────────────┤
│ Guest OS 1    │ Guest OS 2 (Gigas)   │     │ Dependencias  │ Dependencias         │
├───────────────┴──────────────────────┤     ├───────────────┴──────────────────────┤
│ Hypervisor (VirtualBox, VMware)      │     │ Motor Docker (Comparte Kernel)       │
├──────────────────────────────────────┤     ├──────────────────────────────────────┤
│ Sistema Operativo Host (Anfitrión)   │     │ Sistema Operativo Host (Linux)       │
└──────────────────────────────────────┘     └──────────────────────────────────────┘
```

* **Máquina Virtual**: Virtualiza hardware completo e instala un sistema operativo huésped completo (pesa gigabytes y tarda minutos en arrancar).
* **Contenedor Docker**: Es un proceso aislado en el espacio de usuario que **comparte el mismo Kernel del sistema operativo anfitrión** (pesa megabytes y arranca en milisegundos).

### Ejemplo de `Dockerfile` Profesional para Node.js / TypeScript
```dockerfile
# 1. Etapa de Construcción (Build)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Etapa de Producción (Imagen limpia y mínima)
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist

USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

---

## 3. Orquestación Local con Docker Compose

Para levantar tu aplicación conectada a una base de datos PostgreSQL y Redis con un solo comando sin tener que instalar Postgres en tu máquina local:

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:secreto123@postgres_db:5432/tienda_db
      - REDIS_URL=redis://redis_cache:6379
    depends_on:
      - postgres_db
      - redis_cache

  postgres_db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secreto123
      POSTGRES_DB: tienda_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis_cache:
    image: redis:7-alpine
    restart: always
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Comandos de Docker Compose:
```bash
docker compose up -d    # Inicia todos los servicios en segundo plano
docker compose logs -f  # Revisa los logs combinados de todos los contenedores
docker compose down     # Detiene y limpia los contenedores
```

---

## 4. CI/CD Automatizado con GitHub Actions

Un flujo de Integración Continua garantiza que **ningún código roto entre a la rama principal**:

```yaml
# .github/workflows/ci.yml
name: Pipeline de Integración Continua

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  verificacion-calidad:
    runs-on: ubuntu-latest

    steps:
      - name: Descargar Código del Repositorio
        uses: actions/checkout@v4

      - name: Configurar Entorno Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Instalar Dependencias Exactas
        run: npm ci

      - name: Ejecutar Linter y Formato
        run: npm run lint

      - name: Ejecutar Pruebas Automatizadas
        run: npm test -- --coverage
```

---

## 📚 Recursos Recomendados del Tema

* **Curso de Linux para principiantes**: [freeCodeCamp – Linux for Beginners](https://www.youtube.com/@freecodecamp)
* **Tutorial oficial paso a paso**: [Docker – Get Started Guide](https://docs.docker.com/get-started/)
* **Curso de Docker en video**: [freeCodeCamp – Docker Course for Beginners](https://www.youtube.com/watch?v=fqMOX6JJhGo)
* **Automatización CI/CD**: [GitHub Actions Official Documentation](https://docs.github.com/en/actions)
* **Orquestación de contenedores**: [Kubernetes Official Documentation](https://kubernetes.io/docs/home/)
* **Certificaciones oficiales de contenedores**: [CNCF CKA (Administrator)](https://www.cncf.io/certification/cka/) y [CNCF CKAD (Application Developer)](https://www.cncf.io/certification/ckad/)
* **Plataforma de laboratorios interactivos**: [KodeKloud](https://kodekloud.com)

---

👉 **Siguiente paso:** **[Computación en la Nube y Proveedores Cloud](../cloud/README.md)**
