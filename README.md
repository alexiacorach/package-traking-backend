#  Package Tracking API
Este proyecto es una API RESTful construida con **Node.js**, **Express** y **MongoDB**, utilizando **TypeScript** desde el inicio para garantizar escalabilidad y tipado seguro.
Es un sistema que permite gestionar los envíos de una empresa de paquetería, enfocado en implementar una arquitectura clara. 
Incluye autenticación por roles(cada uno tiene acceso solo a las funcionalidades que le corresponden), asignación de repartidores, actualizaciones de estado y panel administrativo para la gestión completa de usuarios y paquetes. 
Cada etapa fue diseñada cuidadosamente para cumplir con reglas de negocio coherentes
Actualmente el backend está completamente funcional, probado con Thunder Client y listo para integrarse con un frontend en desarrollo.

# Funcionalidades principales

- Registro y login de usuarios con JWT
- Roles diferenciados: `cliente`, `repartidor`, `administrador`
- Creación de envíos por parte de clientes
- Visualización y gestión de envíos según rol:
  - Clientes: ven solo sus paquetes
  - Repartidores: ven y actualizan sus entregas
  - Administradores: ven todos los paquetes y usuarios
- Transiciones válidas de estados de paquete (`pending → inTransit → delivered`)
- Asignación de paquetes a repartidores (por admin)
- Filtros por estado y repartidor

#  Roles de usuario

| Rol         | Permisos principales |
|-------------|----------------------|
| Cliente     | Crear y ver sus propios paquetes |
| Repartidor  | Ver paquetes asignados y actualizar estado |
| Administrador | Ver todos los paquetes y usuarios, asignar repartidores |

#  Tecnologías utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT** (Autenticación)
- **bcryptjs** (Encriptación de contraseñas)
- **dotenv** (Variables de entorno)
- **Postman** (para testing de endpoints)