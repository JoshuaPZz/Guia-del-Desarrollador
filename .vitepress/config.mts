import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Guía del Desarrollador",
  description: "De Cero a Ingeniero de Software: Roadmap, Fundamentos, Proyectos y Carrera",
  base: '/Guia-del-Desarrollador/',
  lang: 'es-ES',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  srcExclude: ['README.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'LICENSE'],
  rewrites: {
    'docs/:folder/README.md': 'docs/:folder/index.md'
  },

  themeConfig: {
    logo: '🚀',
    siteTitle: 'Guía del Desarrollador',

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Buscar en la guía...',
                buttonAriaLabel: 'Buscar'
              },
              modal: {
                noResultsText: 'No se encontraron resultados para',
                resetButtonTitle: 'Limpiar búsqueda',
                footer: {
                  selectText: 'para seleccionar',
                  navigateText: 'para navegar',
                  closeText: 'para cerrar'
                }
              }
            }
          }
        }
      }
    },

    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Primeros Pasos', link: '/docs/getting-started/' },
      {
        text: 'Especializaciones',
        items: [
          { text: '🎨 Frontend', link: '/docs/frontend/' },
          { text: '⚙️ Backend', link: '/docs/backend/' },
          { text: '🗄️ Bases de Datos', link: '/docs/databases/' },
          { text: '📊 Ingeniería de Datos', link: '/docs/data-engineering/' },
          { text: '🧠 Ciencia de Datos & ML', link: '/docs/data-science/' },
          { text: '🤖 Inteligencia Artificial', link: '/docs/artificial-intelligence/' },
          { text: '🐳 DevOps & Linux', link: '/docs/devops/' },
          { text: '☁️ Cloud Computing', link: '/docs/cloud/' },
          { text: '🛡️ Ciberseguridad', link: '/docs/security/' }
        ]
      },
      { text: '📁 Proyectos', link: '/docs/projects/' },
      { text: '📜 Certificaciones', link: '/docs/certifications/' },
      { text: '📚 Recursos (25 Temas)', link: '/docs/resources/topic-resources' },
      { text: '💼 Carrera', link: '/docs/career/' }
    ],

    sidebar: [
      {
        text: '🚀 Fase 1: Cimientos y Lógica',
        collapsed: false,
        items: [
          { text: '1. Primeros Pasos', link: '/docs/getting-started/' },
          { text: '2. 12 Errores Comunes', link: '/docs/getting-started/common-errors' },
          { text: '3. Fundamentos de Computación', link: '/docs/fundamentals/' },
          { text: '   ├ Arquitectura & Memoria', link: '/docs/fundamentals/computer-science' },
          { text: '4. ├ Conceptos sin Jerga', link: '/docs/fundamentals/software-concepts' },
          { text: '5. Ruta de Programación', link: '/docs/programming/' },
          { text: '6. └ Elección de Lenguaje', link: '/docs/programming/language-selection' }
        ]
      },
      {
        text: '🛠️ Fase 2: Entorno Profesional',
        collapsed: false,
        items: [
          { text: '7. Git & GitHub Profesional', link: '/docs/git-github/' },
          { text: '8. Fundamentos Web & HTTP', link: '/docs/web-development/' }
        ]
      },
      {
        text: '💻 Fase 3: Desarrollo de Aplicaciones',
        collapsed: false,
        items: [
          { text: '9. Especialización Frontend', link: '/docs/frontend/' },
          { text: '10. Especialización Backend', link: '/docs/backend/' },
          { text: '11. Bases de Datos & SQL', link: '/docs/databases/' }
        ]
      },
      {
        text: '📊 Fase 4: Datos e Inteligencia Artificial',
        collapsed: false,
        items: [
          { text: '12. Ingeniería de Datos', link: '/docs/data-engineering/' },
          { text: '13. Ciencia de Datos & ML', link: '/docs/data-science/' },
          { text: '19. Fundamentos Técnicos de IA', link: '/docs/artificial-intelligence/' },
          { text: '20. IA para Desarrolladores', link: '/docs/ai-for-developers/' }
        ]
      },
      {
        text: '⚙️ Fase 5: Ingeniería, Arquitectura y Cloud',
        collapsed: false,
        items: [
          { text: '14. Clean Code & SOLID', link: '/docs/software-engineering/' },
          { text: '15. Diseño de Sistemas (System Design)', link: '/docs/system-design/' },
          { text: '16. DevOps, Docker & CI/CD', link: '/docs/devops/' },
          { text: '17. Cloud Computing (AWS/Azure/GCP)', link: '/docs/cloud/' },
          { text: '18. Ciberseguridad (AppSec)', link: '/docs/security/' }
        ]
      },
      {
        text: '🎯 Fase 6: Práctica, Certificaciones y Carrera',
        collapsed: false,
        items: [
          { text: '21. Guía Oficial de Certificaciones', link: '/docs/certifications/' },
          { text: '22. Proyectos para Portfolio', link: '/docs/projects/' },
          { text: '23. Preparación de Carrera & Empleo', link: '/docs/career/' },
          { text: '24. Directorio de Recursos', link: '/docs/resources/' },
          { text: '   ├ Recursos por Tema (25 Temas)', link: '/docs/resources/topic-resources' },
          { text: '25. └ Repositorios Open Source', link: '/docs/resources/external-repos' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JoshuaPZz/Guia-del-Desarrollador' }
    ],

    footer: {
      message: 'Guía del Desarrollador: De Cero a Ingeniero de Software',
      copyright: 'Copyright © 2026 Joshua PZ. Licencia MIT.'
    },

    docFooter: {
      prev: 'Página anterior',
      next: 'Siguiente página'
    },

    outline: {
      level: [2, 3],
      label: 'En esta página'
    }
  }
})
