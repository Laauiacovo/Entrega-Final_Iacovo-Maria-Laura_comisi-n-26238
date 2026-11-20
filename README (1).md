# Raíz Viva · Sitio web de una ONG ambiental

Sitio web de una organización ambiental, creado como **proyecto final** del curso **Front-End JavaScript** (Talento Tech).

## Propósito

El sitio presenta a Raíz Viva, una ONG dedicada a la conservación y restauración de ecosistemas. Permite conocer sus proyectos, leer sus noticias ambientales y sumarse como voluntario o voluntaria a través de un formulario.

## Páginas

| Página | Archivo | Contenido |
|---|---|---|
| Inicio | `index.html` | Portada con carrusel de imágenes, proyectos y noticias destacados |
| Proyectos | `pages/proyectos.html` | Todos los proyectos, con filtros por categoría |
| Noticias | `pages/noticias.html` | Todas las noticias, con opción de guardar las favoritas |
| Sumate | `pages/contacto.html` | Formulario de inscripción para voluntariado |

## Funcionalidades

- **Contenido dinámico:** los proyectos, las noticias y las imágenes del carrusel se generan con JavaScript a partir de arreglos de objetos (`js/data.js`). Para agregar un proyecto o una noticia alcanza con sumar un objeto al arreglo.
- **Filtros por categoría:** en la página de proyectos, los botones de categoría se crean automáticamente y filtran las tarjetas.
- **Noticias guardadas:** cada noticia puede marcarse con ★ y se recuerda en el navegador. Hay un filtro para ver solo las guardadas. Las noticias se ordenan de la más reciente a la más antigua.
- **Modo oscuro:** botón en el menú que cambia el tema y lo mantiene al navegar y al recargar.
- **Carrusel de portada:** cambia solo cada 5 segundos, con flechas y puntos de navegación. Se detiene al pasar el mouse y respeta la preferencia de reducir animaciones.
- **Formulario de inscripción:** el selector de proyectos se arma desde el arreglo de datos y cada inscripción se guarda en el navegador, con un mensaje de confirmación.
- **Diseño adaptable:** se ve bien en computadora, tablet y celular.

## Tecnologías

- HTML5 con etiquetas semánticas
- CSS3 en un archivo externo, con Flexbox, variables y media queries
- JavaScript (sin librerías), organizado en archivos separados
- `localStorage` para guardar el tema, las noticias favoritas y las inscripciones

## Estructura del proyecto

```
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── data.js        (arreglos de proyectos, noticias y portada)
│   ├── ui.js          (renderizado, filtros, favoritas y modo oscuro)
│   ├── carrusel.js    (carrusel de la portada)
│   └── contacto.js    (formulario de inscripción)
├── img/
│   └── (fotografías del sitio)
└── pages/
    ├── proyectos.html
    ├── noticias.html
    └── contacto.html
```

## Ver el sitio

Sitio publicado: 

## Autoría

Proyecto realizado por **María Laura Iacovo** como parte del curso Front-End JavaScript de Talento Tech.
