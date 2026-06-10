# Florida Gamer Festival 5 🎮

Sitio web oficial de la **5ª edición del Florida Gamer Festival** — el festival gamer más grande de Florida (Uruguay).

> *"Este mundial vivilo en Florida Gamer"*
> 📅 4 y 5 de julio · 📍 Estadio 10 de Julio de Florida · 🎟️ Entrada gratuita

## Contenido

- Cuenta regresiva en vivo hacia el evento
- Torneos: FIFA, Valorant, League of Legends, Fortnite, Minecraft, Rocket League, CS2 y Mortal Kombat
- Agenda de los dos días
- Atracciones (simuladores F1, zona retro, PS5, VR, robótica, streaming)
- Formulario de inscripción a torneos
- Ubicación con mapa

## Tecnología

Sitio estático: **HTML + CSS + JavaScript** (sin dependencias ni build). Se puede abrir directamente o publicar en cualquier hosting estático.

```
index.html      → estructura y contenido
styles.css      → diseño, animaciones y responsive
script.js       → countdown, menú, juegos, formulario
assets/         → logo e imágenes optimizadas
```

## Desarrollo local

Abrir `index.html` en el navegador, o levantar un servidor local:

```bash
python3 -m http.server 8000
# luego abrir http://localhost:8000
```

## Publicación en GitHub Pages

El sitio está listo para GitHub Pages. Una vez subido el repositorio:

1. Ir a **Settings → Pages**
2. En *Source*, elegir la rama `main` y carpeta `/ (root)`
3. Guardar — el sitio quedará disponible en `https://<usuario>.github.io/<repo>/`

---

Organizan: Team Evermeet · AORUS · Dirección de Cultura, Turismo y Juventud · Florida Departamento Abierto
