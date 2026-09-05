# 🛡️ Seguridad Aplicada para Desarrolladores (AppSec)

La seguridad no es una capa decorativa que se agrega al final del proyecto antes de salir a producción; **es una propiedad arquitectónica que debe estar presente en cada línea de código, consulta a base de datos y configuración de red**.

---

## 1. El Principio Fundamental: Defensa en Profundidad

Nunca dependas de una sola barrera de protección. Si un atacante burla el firewall de red, debe toparse con autenticación estricta; si burla la autenticación, debe toparse con autorización por roles; si burla la autorización, debe toparse con datos cifrados en reposo.

---

## 2. Los Riesgos Más Comunes: OWASP Top 10

El proyecto abierto **OWASP (*Open Web Application Security Project*)** clasifica periódicamente los 10 riesgos de seguridad más críticos en aplicaciones web:

### A. Inyecciones (SQLi, NoSQLi, Command Injection)
* **El riesgo**: El atacante envía datos maliciosos que el intérprete de base de datos o el sistema operativo confunde con comandos legítimos.
* **Mitigación**: **Consultas Parametrizadas (*Prepared Statements*)** y validación estricta de tipos. Nunca concatenes cadenas de texto para armar queries.

### B. Pérdida de Control de Acceso (*Broken Access Control*)
* **El riesgo**: El usuario `Alice` con ID `10` cambia la URL a `/api/pedidos/11` y puede ver o editar los pedidos del usuario `Bob`.
* **Mitigación**: Comprueba siempre en el servidor que el usuario autenticado en la sesión sea el legítimo dueño del recurso que solicita modificar (autorización a nivel de registro).

### C. Falla Criptográfica y Exposición de Datos Sensibles
* **El riesgo**: Transmitir datos confidenciales por HTTP sin cifrar o almacenar contraseñas en texto plano o con hashes obsoletos (MD5, SHA1).
* **Mitigación**: HTTPS obligatorio con TLS 1.3 y hashing de contraseñas mediante **Bcrypt o Argon2id**.

### D. Vulnerabilidades en Dependencias de Terceros
* **El riesgo**: Tu código es seguro, pero utilizas un paquete de npm o Python que contiene una vulnerabilidad conocida o código malicioso.
* **Mitigación**: Ejecuta auditorías automatizadas regularmente en tu pipeline de CI/CD:
  ```bash
  npm audit
  # o para Python:
  pip-audit
  ```

### E. Cross-Site Scripting (XSS)
* **El riesgo**: El atacante inyecta código JavaScript malicioso en un comentario o formulario, y dicho código se ejecuta en el navegador de otros usuarios, robando sus tokens de sesión.
* **Mitigación**: Escapar y sanitizar cualquier entrada no confiable antes de renderizarla en el DOM. Frameworks modernos como React escapan variables automáticamente por defecto.

---

## 3. Gestión Segura de Secretos

El error más común del programador novato es subir por descuido un archivo con API Keys de OpenAI, credenciales de AWS o contraseñas de bases de datos a un repositorio público de GitHub. Existen bots que escanean commits públicos en tiempo real para robar esas credenciales en menos de 60 segundos.

### Reglas de Protección:
1. **Configura `.gitignore` antes de crear el primer archivo `.env`**.
2. **Utiliza `.env.example`**: Sube al repositorio únicamente un archivo de plantilla con valores ficticios:
   ```env
   # .env.example
   PORT=3000
   DATABASE_URL=postgres://usuario:contrasena@localhost:5432/mibase
   JWT_SECRET=tu_clave_secreta_super_larga_aqui
   ```
3. **Escaneo Local de Secretos**: Usa herramientas como `gitleaks` en tus hooks de pre-commit para bloquear commits que contengan patrones de llaves privadas o tokens.

---

## 📚 Recursos Recomendados del Tema

* **Estándar mundial de seguridad web**: [OWASP Top 10 Web Application Vulnerabilities](https://owasp.org/www-project-top-ten/)
* **Curso completo de introducción**: [freeCodeCamp – Cybersecurity for Beginners](https://www.youtube.com/@freecodecamp)
* **Laboratorios prácticos gratuitos**: [PortSwigger – Web Security Academy](https://portswigger.net/web-security)
* **Certificado profesional práctico**: [Google Cybersecurity Certificate (Coursera)](https://www.coursera.org/professional-certificates/google-cybersecurity)
* **Cursos oficiales de redes y seguridad**: [Cisco Networking Academy](https://www.netacad.com)

---

👉 **Siguiente paso:** **[Fundamentos Técnicos de la Inteligencia Artificial](../artificial-intelligence/README.md)**
