ASISTENTE VIRTUAL DE TRÁMITES ACADÉMICOS — DERECHO UAC
Versión técnica inicial 1.0

QUÉ INCLUYE
- Web responsive en public/index.html.
- Preguntas por texto y reconocimiento de voz del navegador (Chrome/Edge, HTTPS).
- Lectura de respuestas en voz alta mediante las voces instaladas en el navegador.
- Backend Node.js que conserva la clave de IA fuera del navegador.
- Recuperación documental básica por coincidencia de términos.
- Fuentes listadas en respuestas.
- Carga administrativa de PDF/DOCX con token.
- Importador de documentos locales.
- Semillas de conocimiento para el flujo de designación compartido y el resumen de modalidades.
  Las semillas están marcadas PENDIENTE_DE_VALIDACION y no equivalen a haber indexado los PDF/Word completos.

REQUISITOS
- Node.js 18 o posterior.
- Cuenta y clave API del proveedor de IA.
- Servidor con HTTPS para uso público del micrófono.
- Aprobación institucional antes de publicación.

PROBAR EN LOCAL
1. Instala Node.js 18+.
2. Descomprime el paquete.
3. En la carpeta del proyecto ejecuta: npm install
4. Copia .env.example a .env.
5. En .env completa OPENAI_API_KEY, OPENAI_MODEL si corresponde y cambia ADMIN_TOKEN por un token largo y aleatorio.
6. Ejecuta: npm start
7. Abre http://localhost:3000

CARGAR PDF/DOCX
Opción A (local): copia documentos oficiales a la carpeta documentos/ y ejecuta npm run ingest.
Opción B (panel de integración): POST /api/admin/upload con multipart/form-data campo "documents", encabezado X-Admin-Token, y campos opcionales category y version.
La API deja todo documento nuevo como PENDIENTE_DE_VALIDACION. El estado no se cambia automáticamente; revisar manualmente la vigencia y exactitud. En producción, proteger también la red, límites, registros, acceso administrativo y revisión de documentos.

SEGURIDAD
- Nunca coloques la clave API en public/.
- No subas expedientes personales o información sensible a la base pública.
- Usa HTTPS, control de abuso y límites de coste.
- El token administrativo es una protección básica; para producción se recomienda autenticación institucional y almacenamiento seguro.
- Revisa obligaciones de privacidad, contratación y tratamiento de datos de la UAC.
- No se conecta al ERP ni presenta solicitudes en nombre del estudiante.
- La voz femenina/peruana depende de las voces instaladas en el dispositivo/navegador. Para garantizar una voz peruana específica se deberá elegir un proveedor TTS con esa voz y verificar su disponibilidad.

LIMITACIONES ACTUALES
- No está desplegado en el servidor UAC.
- No se han cargado aquí todos los archivos PDF/Word originales a este paquete; incluye una base semilla basada en el flujo de trabajo compartido y en los resúmenes visibles de conversación.
- La búsqueda documental es léxica y básica, no un sistema RAG vectorial avanzado.
- El sistema requiere revisión de TI y del área administrativa antes de uso real.
