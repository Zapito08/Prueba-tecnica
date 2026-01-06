Módulo de Gestión de Asistentes IA - Prueba Técnica Funnelhot

Este proyecto es una aplicación web desarrollada para gestionar y entrenar asistentes virtuales orientados a la automatización de leads. Se utilizó Next.js 15 (App Router) y TypeScript para asegurar una estructura moderna, tipada y eficiente.

Configuración y Ejecución

1.  Instalación:
    npm install

2.  Entorno de desarrollo:
    npm run dev

3.  Acceso:
    Abre (http://localhost:3000) en tu navegador.

Decisiones Técnicas

- Persistencia Local: Se utilizó LocalStorage para cumplir con el requisito de persistencia sin backend. Esto permite que los asistentes y sus configuraciones se mantengan al recargar la página.
- Arquitectura de Componentes: Desarrollo modular con componentes reutilizables (tarjetas, modales) para facilitar el mantenimiento.
- Gestión de Estados: Manejo de estados locales robusto para flujos complejos (como el modal de dos pasos), priorizando validaciones antes de la persistencia.
- Simulación de IA: Se integró un setTimeout de 1.5 segundos en el chat para replicar la latencia real de una API y mejorar la UX.

Características Implementadas

- CRUD de Asistentes: Creación, edición, eliminación y listado dinámico.
- Validaciones de Negocio:
    - Nombre del asistente: Mínimo 3 caracteres.
    - Configuración de respuestas: La suma de porcentajes (cortas, medias, largas) debe ser exactamente 100%.
- Panel de Entrenamiento: Área para definir prompts y probar el comportamiento en un chat simulado en tiempo real.
- Seguridad: Confirmación obligatoria antes de eliminar registros.
- Diseño Responsive: Adaptable a móviles y escritorio.

Priorización y Trade-offs

Debido al tiempo límite, se tomaron las siguientes decisiones:

- Frontend First: Se omitió un backend real (PostgreSQL/MongoDB) para cumplir estrictamente con el requisito de persistencia local y enfocar el esfuerzo en la UI/UX y lógica de cliente.
- Chat Simulado: Las respuestas son predefinidas para centrar el desarrollo en la funcionalidad del panel de entrenamiento y la gestión de prompts.
- Estado: Se evitó el uso de librerías globales complejas (Redux/Zustand) para mantener el proyecto ligero.

Dedicación

- Tiempo total: Aproximadamente 7 horas.