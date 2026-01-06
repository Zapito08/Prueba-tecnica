Modulo de Gestion de Asistentes IA - Prueba Técnica Funnelhot
Este proyecto es una aplicación web desarrollada para gestionar y entrenar asistentes virtuales orientados a la automatizacion de leads. Se utilizo Next.js 15 (App Router) y TypeScript para asegurar una estructura moderna, tipada y eficiente.


Configuración y Ejecución
Instalación: npm install

Entorno de desarrollo: npm run dev

Acceso: http://localhost:3000

Decisiones Técnicas

Persistencia: Se utilizó LocalStorage para cumplir con el requisito de persistencia local. Esto permite que los asistentes y sus reglas de entrenamiento se mantengan al recargar la página.

Arquitectura de Componentes: Se crearon componentes reutilizables para las tarjetas y modales, facilitando el mantenimiento del código.

Simulación de IA: Para el chat simulado, se integró un setTimeout de 1.5 segundos. El objetivo es replicar la latencia real de una API de inteligencia artificial y mejorar la experiencia de usuario (UX).

Características Implementadas

CRUD de Asistentes: Creación, edición, eliminación y listado dinámico en formato de tarjetas.

Validaciones de Negocio: * El nombre del asistente requiere un mínimo de 3 caracteres.

En la configuración de respuestas, el sistema valida que la suma de porcentajes (cortas, medias y largas) sea exactamente 100%.

Panel de Entrenamiento: Área dedicada para definir el comportamiento de la IA mediante prompts y un chat de prueba en tiempo real.

Seguridad de Datos: Confirmación obligatoria antes de eliminar cualquier registro para evitar errores accidentales.

Priorización y Trade-offs

Debido al tiempo de entrega, se priorizaron las siguientes tareas:

Enfoque en Frontend: Se dejó fuera la implementación de un backend con base de datos real (PostgreSQL/MongoDB) en favor de LocalStorage, priorizando la lógica de negocio y las validaciones del lado del cliente solicitadas.

Simplificación del Chat: Las respuestas del chat son simuladas mediante un array predefinido para centrar el desarrollo en la funcionalidad del panel de entrenamiento y la persistencia de los prompts.

Dedicación:

Tiempo total: Aproximadamente 7 horas.