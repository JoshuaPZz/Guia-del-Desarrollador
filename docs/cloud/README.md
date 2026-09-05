# ☁️ Computación en la Nube (Cloud Computing)

La nube no es más que la computadora de otra persona conectada a Internet bajo un modelo de facturación por uso. Comprender cómo desplegar, conectar y asegurar recursos en la nube es un requisito fundamental para llevar cualquier software del entorno local a usuarios reales en el mundo.

---

## 1. Modelos de Servicio en la Nube

```
      IaaS (Infraestructura)             PaaS (Plataforma)                   SaaS (Software)
    [ Servidores Virtuales ]          [ Despliegue de Código ]            [ Aplicaciones Listas ]
┌──────────────────────────────┐  ┌──────────────────────────────┐  ┌──────────────────────────────┐
│ Tú gestionas:                │  │ Tú gestionas:                │  │ Tú gestionas:                │
│ - Sistema Operativo y parches│  │ - Solo tu código y datos     │  │ - Solo tus configuraciones   │
│ - Configuración de red       │  │                              │  │   y usuarios                  │
│ - Runtimes y dependencias    │  │ El proveedor gestiona:       │  │                              │
│                              │  │ - Servidores, SO, parches    │  │ El proveedor gestiona:       │
│ Ejemplos:                    │  │                              │  │ - TODO                       │
│ - AWS EC2, Azure VMs,        │  │ Ejemplos:                    │  │                              │
│   GCP Compute Engine         │  │ - AWS Lambda, Vercel, Render │  │ Ejemplos: Google Workspace,  │
│                              │  │   GCP Cloud Run              │  │   Slack, GitHub              │
└──────────────────────────────┘  └──────────────────────────────┘  └──────────────────────────────┘
```

---

## 2. El Modelo de Responsabilidad Compartida

Un concepto crítico evaluado en certificaciones y en la práctica: **el proveedor de nube no asegura tu aplicación automáticamente**.

* **Responsabilidad DE la Nube (Proveedor - AWS/Azure/GCP)**: Seguridad física de los centros de datos, hardware, discos rotos, cableado y la capa de virtualización.
* **Responsabilidad EN la Nube (Tú como Ingeniero)**: Parches de seguridad en tu sistema operativo (si usas IaaS), permisos de acceso de usuarios (IAM), cifrado de datos, llaves secretas y la prevención de vulnerabilidades en tu propio código.

---

## 3. Los Tres Grandes Proveedores y Servicios Equivalentes

| Categoría | AWS (Amazon Web Services) | Microsoft Azure | Google Cloud (GCP) |
|---|---|---|---|
| **Cómputo Virtual (IaaS)** | EC2 | Virtual Machines | Compute Engine |
| **Contenedores Administrados** | ECS / EKS | AKS / Container Apps | Cloud Run / GKE |
| **Serverless (Funciones FaaS)** | AWS Lambda | Azure Functions | Cloud Functions |
| **Almacenamiento de Objetos** | Amazon S3 | Blob Storage | Cloud Storage |
| **Bases de Datos Relacionales** | Amazon RDS | Azure SQL Database | Cloud SQL |
| **Caché en Memoria** | ElastiCache (Redis) | Azure Cache for Redis | Memorystore |
| **Gestión de Identidad y Accesos**| AWS IAM | Entra ID (Azure AD) | Cloud IAM |

---

## 4. Almacenamiento de Objetos: S3 y Equivalentes

El almacenamiento de archivos en la nube **nunca debe hacerse en el disco duro efímero del servidor web**. Si el servidor se reinicia o se crea una segunda réplica, esos archivos desaparecerán o no estarán sincronizados.

* **Almacenamiento de Objetos (S3)**: Guarda imágenes, videos, PDFs y backups con 99.999999999% de durabilidad. Se accede mediante URLs HTTP seguras y *presigned URLs* temporales.

---

## 5. Cuidado Crítico con los Costes (FinOps y Seguridad)

Es común ver historias de principiantes que reciben facturas inesperadas de miles de dólares por descuidos de configuración. Sigue estas tres reglas estrictas:

1. **Configura una Alarma de Presupuesto (AWS Budgets / Azure Cost Alerts)**: En el minuto 1 de crear tu cuenta, configura una alerta para que te envíe un email si el gasto mensual proyectado supera los **$5 USD**.
2. **Habilita Autenticación Multifactor (MFA)**: Protege la cuenta raíz con una app de autenticación (Google Authenticator). Si hackers roban tus credenciales de nube, desplegarán granjas de minería de criptomonedas en cuestión de minutos.
3. **Destruye Recursos al Terminar de Practicar**: Si creas una base de datos RDS o una máquina virtual para una prueba de fin de semana, elimínala (`Terminate / Delete`) cuando termines.

---

## 📚 Recursos Recomendados del Tema

* **Cursos oficiales gratuitos de AWS**: [AWS Skill Builder](https://skillbuilder.aws)
* **Rutas oficiales gratuitas de Microsoft Azure**: [Microsoft Learn for Azure](https://learn.microsoft.com/en-us/training/azure/)
* **Plataforma de capacitación de Google Cloud**: [Google Cloud Skills Boost](https://www.cloudskillsboost.google)
* **Comparativas de servicios y arquitectura**: [roadmap.sh – DevOps / Cloud Roadmap](https://roadmap.sh)
* **Certificaciones fundacionales de entrada**:
  * [AWS Certified Cloud Practitioner (CLF-C02)](https://aws.amazon.com/certification/certified-cloud-practitioner/)
  * [Microsoft Certified: Azure Fundamentals (AZ-900)](https://learn.microsoft.com/credentials/certifications/azure-fundamentals/)
  * [Google Cloud Digital Leader](https://cloud.google.com/learn/certification/cloud-digital-leader)

---

👉 **Siguiente paso:** **[Ciberseguridad para Desarrolladores y AppSec](../security/README.md)**
