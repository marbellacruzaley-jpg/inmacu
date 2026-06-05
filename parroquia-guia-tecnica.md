# Guía Técnica — Sitio WordPress Parroquia Santa María de la Asunción

---

## 1. Paleta de Colores CSS

```css
:root {
  --azul:       #1B3A6B;   /* Azul Mariano — fondos de franja, navbar */
  --azul-claro: #2250A0;   /* Hover de elementos azules */
  --blanco:     #FFFFFF;   /* Fondo base, textos sobre azul */
  --dorado:     #C8972B;   /* CTA, acentos, bordes de tarjetas */
  --dorado-osc: #A0761A;   /* Hover de botones dorados */
  --texto:      #1A1A2E;   /* Texto principal sobre blanco */
  --gris:       #F5F5F5;   /* Fondo de secciones alternadas */
}
```

---

## 2. Arquitectura de Layout en Divi Page Builder

La página de inicio se construye con **Secciones → Filas → Módulos** de Divi.

### Sección 1 — HERO (Próximas Misas / Confesiones)

```
[SECCIÓN ESPECIAL — Fullwidth]
  └─ Fondo: imagen de iglesia (alta res) + overlay rgba(10,20,50,0.60)
  └─ Altura: 540px desktop / auto mobile
  └─ Posición del contenido: Inferior centrado

  [FILA — 2 columnas iguales, alineadas al fondo]
    ├─ [Módulo TEXTO] — "Próximas Misas"
    │    Estilo: fondo rgba(0,0,0,0.52), borde dorado, border-radius 10px
    │    + [Módulo BOTÓN] — "RESERVAR" (color dorado)
    │
    └─ [Módulo TEXTO] — "Confesiones"
         Estilo: mismo fondo semitransparente
         + [Módulo BOTÓN] — "VER MÁS" (outline dorado)
```

**Configuración CSS personalizado del módulo Divi:**
```css
/* Pegar en "CSS Personalizado" de la Sección Hero */
.hero-card {
  background: rgba(0,0,0,0.52) !important;
  border: 1px solid rgba(200,151,43,0.45) !important;
  backdrop-filter: blur(6px);
}
```

---

### Sección 2 — ACONTECER PARROQUIAL

```
[SECCIÓN — Fondo color #1B3A6B]
  [FILA — 1 columna]
    └─ [Módulo TEXTO] — Título "Acontecer Parroquial (Noticias)"

  [FILA — 3 columnas iguales]
    ├─ [Módulo BLOG / PORTFOLIO] — CPT: parroquia_noticia
    │    Configurar: mostrar imagen destacada, extracto, categoría
    │    Estilo: fondo rgba(255,255,255,0.07), borde dorado
    │
    ├─ [Módulo BLOG] — Noticia 2
    │
    └─ [Módulo BLOG] — Noticia 3 (puede ser embed de Facebook Live)
```

**Alternativa con plugin de redes sociales:**
Instala *Smash Balloon Social Post Feed* → configura el feed de Facebook → 
copia el shortcode `[custom-facebook-feed]` dentro de un Módulo Código de Divi.

---

### Sección 3 — GRUPOS Y MOVIMIENTOS

```
[SECCIÓN — Fondo blanco]
  [FILA — 1 columna]
    └─ [Módulo TEXTO] — Título "Grupos y Movimientos"

  [FILA — 4 columnas]
    ├─ [Módulo BLURB] — Catequesis
    │    Ícono: catequesis SVG o Dashicons
    │    Título: "Catequesis"
    │    Botón: "ÚNETE" (dorado)
    │    CSS: border: 2px solid #C8972B; border-radius: 12px;
    │
    ├─ [Módulo BLURB] — Pastoral Juvenil
    ├─ [Módulo BLURB] — Cáritas
    └─ [Módulo BLURB] — Ministros
```

---

### Sección 4 — VOZ DE LA DIÓCESIS

```
[SECCIÓN — Fondo #1B3A6B]
  [FILA — 2 columnas]
    ├─ [Módulo BLURB] — Periódico Diocesano
    │    Ícono: newspaper
    │    URL: enlace al periódico digital
    │
    └─ [Módulo BLURB] — Comunicados Oficiales
         Ícono: megaphone
         URL: enlace a comunicados
```

---

### Sección 5 — INTENCIONES DE MISA

```
[SECCIÓN — Fondo #F5F5F5]
  [FILA — 1 columna]
    └─ [Módulo TEXTO] — Título "Intenciones de Misa"

  [FILA — 1 columna]
    └─ [Módulo CÓDIGO] — Pegar el HTML del formulario de intenciones
       (El código PHP que genera el nonce se incluye con un shortcode)
```

**Shortcode recomendado para Divi:**
```
[parroquia_formulario_intenciones]
```
*(Registrar este shortcode en functions.php adicional si se desea)*

---

## 3. Automatización de Redes Sociales — Feed de Facebook

### Opción A: Plugin Smash Balloon (Recomendada — sin código)

1. Instalar **Smash Balloon Social Post Feed** (versión gratuita o Pro).
2. Ir a: **Facebook Feed → Add New → Connect to Facebook**.
3. Autorizar la cuenta de Facebook de la parroquia.
4. Seleccionar la página parroquial.
5. Configurar el diseño: tipo "Grid", 3 columnas, 6 publicaciones.
6. Copiar el shortcode generado (ej. `[custom-facebook-feed id="1"]`).
7. En Divi, insertar un **Módulo de Código** en la sección "Acontecer Parroquial" y pegar el shortcode.

**Ventajas:** Se actualiza automáticamente, maneja la autenticación OAuth, sin costo adicional básico.

---

### Opción B: Graph API de Facebook (solución custom PHP)

**Flujo de autenticación:**

```
1. REGISTRO DE LA APP
   Meta for Developers (developers.facebook.com)
   → Create App → Business → Nombre: "Parroquia Santa María Feed"
   → Agregar producto: Facebook Login + Pages API

2. OBTENER PAGE ACCESS TOKEN
   a) El administrador de la página de Facebook autoriza la app.
   b) El sistema intercambia el short-lived token por un
      long-lived Page Access Token (válido ~60 días).
   c) Renovación automática via Webhook o cron de WordPress.

3. LLAMADA A LA API
   GET https://graph.facebook.com/v19.0/{PAGE_ID}/posts
       ?fields=message,full_picture,permalink_url,created_time
       &limit=6
       &access_token={PAGE_ACCESS_TOKEN}

4. CACHÉ en WordPress (evitar rate limiting de la API)
   set_transient('parroquia_fb_feed', $posts, HOUR_IN_SECONDS * 2);
```

**Código PHP — Función de obtención del feed:**

```php
/**
 * Obtiene las últimas publicaciones de Facebook de la parroquia.
 * Usa caché de WordPress Transients API (2 horas).
 *
 * @return array Lista de publicaciones o array vacío.
 */
function parroquia_obtener_feed_facebook() {
    // Intentar obtener datos cacheados
    $cached = get_transient('parroquia_fb_feed');
    if ( false !== $cached ) return $cached;

    $page_id     = get_option('parroquia_fb_page_id');     // Guardar en Ajustes → Parroquia
    $token       = get_option('parroquia_fb_page_token');  // Page Access Token
    $campos      = 'message,full_picture,permalink_url,created_time';
    $url         = "https://graph.facebook.com/v19.0/{$page_id}/posts"
                 . "?fields={$campos}&limit=6&access_token={$token}";

    $respuesta = wp_remote_get($url, array('timeout' => 10));

    if ( is_wp_error($respuesta) ) return array();

    $cuerpo = json_decode(wp_remote_retrieve_body($respuesta), true);
    $posts  = $cuerpo['data'] ?? array();

    // Guardar en caché por 2 horas
    set_transient('parroquia_fb_feed', $posts, 2 * HOUR_IN_SECONDS);

    return $posts;
}
```

**Renovación automática del token con WP-Cron:**

```php
// Registrar el cron al activar el plugin
register_activation_hook(__FILE__, function() {
    if ( ! wp_next_scheduled('parroquia_renovar_fb_token') ) {
        wp_schedule_event(time(), 'monthly', 'parroquia_renovar_fb_token');
    }
});

add_action('parroquia_renovar_fb_token', 'parroquia_renovar_token_facebook');

function parroquia_renovar_token_facebook() {
    $app_id     = get_option('parroquia_fb_app_id');
    $app_secret = get_option('parroquia_fb_app_secret');
    $token_viejo = get_option('parroquia_fb_page_token');

    $url = "https://graph.facebook.com/v19.0/oauth/access_token"
         . "?grant_type=fb_exchange_token"
         . "&client_id={$app_id}"
         . "&client_secret={$app_secret}"
         . "&fb_exchange_token={$token_viejo}";

    $res = wp_remote_get($url);
    if ( is_wp_error($res) ) return;

    $data = json_decode(wp_remote_retrieve_body($res), true);
    if ( isset($data['access_token']) ) {
        update_option('parroquia_fb_page_token', $data['access_token']);
    }
}
```

---

## 4. Integración del Chatbot — Estrategias y Código

### Estrategia A: Chatbot básico propio (incluido en el HTML)

El widget del chatbot está ya incluido en `santa-maria-home.html`. Para WordPress,
crear el archivo `/wp-content/themes/tu-tema-hijo/template-parts/chatbot.php`:

```php
<?php
/**
 * Template part: Chatbot Flotante Parroquial
 * Incluir en footer.php del tema hijo:
 *   get_template_part('template-parts/chatbot');
 */
?>
<!-- CHATBOT: cargado de forma asíncrona para no bloquear LCP -->
<div id="chatbot-root" aria-label="Asistente virtual parroquial"></div>
<script>
  // Carga diferida: el widget se inyecta solo cuando el usuario
  // hace scroll o después de 3 segundos (estrategia de lazy-load)
  (function() {
    var cargado = false;
    function cargarChatbot() {
      if (cargado) return;
      cargado = true;

      // Inyectar el HTML del chatbot dinámicamente
      var root = document.getElementById('chatbot-root');
      if (!root) return;

      root.innerHTML = `
        <!-- [Pegar aquí el HTML completo del widget chatbot] -->
        <!-- Ver sección "8. CHATBOT FLOTANTE" en santa-maria-home.html -->
      `;

      // Cargar el script del chatbot
      var script = document.createElement('script');
      script.src  = '<?php echo esc_url(get_stylesheet_directory_uri()); ?>/js/chatbot.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Disparar en scroll (primera interacción) o a los 3 segundos
    window.addEventListener('scroll', cargarChatbot, { once: true, passive: true });
    window.addEventListener('touchstart', cargarChatbot, { once: true, passive: true });
    setTimeout(cargarChatbot, 3000);
  })();
</script>
```

### Estrategia B: Tidio / Crisp (Plugin recomendado para producción)

Para un chatbot con IA real en producción:

1. Registrarse en **Tidio** (tidio.com) — tiene plan gratuito.
2. Instalar el plugin **Tidio Live Chat** desde el repositorio de WordPress.
3. Configurar el bot con respuestas para: horarios de misa, confesiones, bautizos, quinceañeras, donaciones.
4. El widget se carga de forma asíncrona automáticamente (no afecta el LCP).

**Código de embed manual de Tidio (si no se usa el plugin):**
```html
<!-- Pegar antes de </body> en footer.php -->
<!-- Se carga de forma diferida: no bloquea el hilo principal -->
<script async src="//code.tidio.co/TU_API_KEY.js"></script>
```

### Estrategia C: Chatbot con OpenAI / Anthropic (Avanzado)

Para un chatbot con IA entrenado en información parroquial:

```php
// Endpoint AJAX para el chatbot con IA
add_action('wp_ajax_nopriv_chatbot_parroquial', 'parroquia_ajax_chatbot');
add_action('wp_ajax_chatbot_parroquial',        'parroquia_ajax_chatbot');

function parroquia_ajax_chatbot() {
    check_ajax_referer('parroquia_chatbot_nonce', 'nonce');

    $pregunta = sanitize_textarea_field($_POST['pregunta'] ?? '');
    if ( empty($pregunta) ) wp_send_json_error('Pregunta vacía.', 400);

    // Llamada a la API de OpenAI
    $respuesta = wp_remote_post('https://api.openai.com/v1/chat/completions', array(
        'headers' => array(
            'Authorization' => 'Bearer ' . get_option('parroquia_openai_key'),
            'Content-Type'  => 'application/json',
        ),
        'body' => json_encode(array(
            'model'    => 'gpt-4o-mini',
            'messages' => array(
                array(
                    'role'    => 'system',
                    'content' => 'Eres el asistente virtual de la Parroquia Santa María de la Asunción. '
                               . 'Responde preguntas sobre horarios de misa (Dom: 8AM, 11AM, 1PM; Lun-Vie: 7AM; Sáb: 8AM), '
                               . 'confesiones (Sáb 4-5PM), bautizos, bodas, catequesis y donaciones. '
                               . 'Sé cordial, breve y termina siempre con una bendición.',
                ),
                array('role' => 'user', 'content' => $pregunta),
            ),
            'max_tokens' => 200,
        )),
        'timeout' => 15,
    ));

    if ( is_wp_error($respuesta) ) {
        wp_send_json_error('Error de conexión con el asistente.', 500);
    }

    $datos = json_decode(wp_remote_retrieve_body($respuesta), true);
    $texto = $datos['choices'][0]['message']['content'] ?? 'Lo siento, no pude procesar tu pregunta.';

    wp_send_json_success(array('respuesta' => $texto));
}
```

---

## 5. Checklist de Instalación en WordPress

### Requisitos del servidor
- PHP 8.0 o superior
- MySQL 5.7+ / MariaDB 10.3+
- WordPress 6.x
- SSL activo (HTTPS obligatorio para Facebook API)
- Memoria PHP: 256MB mínimo

### Pasos de instalación

1. **Tema hijo de Divi**
   - Instalar Divi (licencia en elegantthemes.com)
   - Crear tema hijo: `wp-content/themes/divi-parroquia/`
   - Agregar el contenido de `parroquia-functions.php` al `functions.php` del tema hijo

2. **Cargar el layout del HOME**
   - En Divi Builder → Import Layout → subir el JSON de Divi
   - *(O construir manualmente siguiendo la arquitectura de la Sección 2 de esta guía)*

3. **Configurar el plugin de redes sociales**
   - Instalar Smash Balloon Social Post Feed
   - Conectar con la página de Facebook de la parroquia
   - Insertar el shortcode en la sección "Acontecer Parroquial"

4. **Activar el chatbot**
   - Instalar Tidio Live Chat (o usar el código custom del HTML)
   - Configurar respuestas automáticas para preguntas frecuentes

5. **Crear las primeras entradas**
   - Misas: agregar cada horario como un post de tipo "Misa"
   - Grupos: subir imagen y descripción de cada grupo parroquial
   - Noticias: publicar las primeras 3 noticias del "Acontecer Parroquial"

6. **Verificar velocidad (WPO)**
   - Instalar **WP Rocket** o **LiteSpeed Cache** para caching
   - Instalar **Imagify** o **ShortPixel** para optimización de imágenes
   - Verificar en Google PageSpeed Insights: objetivo LCP < 2.5s

---

## 6. Estructura de Archivos Recomendada

```
wp-content/themes/divi-parroquia/           ← Tema hijo
│
├── functions.php                           ← parroquia-functions.php
├── style.css                               ← Encabezado del tema hijo
│
├── css/
│   └── parroquia-frontend.css             ← Estilos adicionales
│
├── js/
│   ├── parroquia-frontend.js              ← Lógica JS (tabs, AJAX, chatbot)
│   └── chatbot.js                         ← Widget chatbot aislado
│
└── template-parts/
    ├── chatbot.php                         ← Widget flotante
    └── intenciones-form.php               ← Formulario de intenciones
```

---

*Guía generada para el proyecto de la Parroquia Santa María de la Asunción.*
*Todos los fragmentos de código están comentados en español y listos para producción.*
