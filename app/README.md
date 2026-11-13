# Match Verbal (v2.0 - React + Vite + Tailwind CSS)

Aplicación educativa para el repaso y práctica de verbos en francés (*Infinitif*, *Passé composé*, *Futur simple* y su significado en español), desarrollada originalmente por **GESPRO - MEP**.

## Estructura del Repositorio

- `app/`: Código fuente de la aplicación web en React + Vite + Tailwind CSS.
- `documentacion/`: Insumos de análisis, diseño y documentación del área de francés.

## Stack Tecnológico

- **React 19** (JavaScript)
- **Vite 6**
- **Tailwind CSS v4**
- **Lucide React** (iconografía complementaria)
- **JSON** (`app/src/data/contenidos.json` y `app/public/data/contenidos.json`) + `localStorage` para persistencia del progreso.

## Scripts Disponibles

```bash
cd app

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo (http://localhost:8080)
npm run dev

# Compilar versión de producción (carpeta app/dist/)
npm run build

# Previsualizar versión compilada
npm run preview
```
