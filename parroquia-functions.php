<?php
/**
 * ================================================================
 * PARROQUIA SANTA MARÍA DE LA ASUNCIÓN — functions.php / Plugin
 * ================================================================
 * Archivo: parroquia-functions.php
 * Descripción: Custom Post Types, endpoints AJAX y utilidades
 *              para el sitio WordPress de la parroquia.
 *
 * Instalación:
 *   Opción A) Agregar este contenido al functions.php del tema hijo.
 *   Opción B) Guardar como /wp-content/plugins/parroquia-core/parroquia-core.php
 *             y activar desde el panel de plugins.
 *
 * Dependencias: WordPress 6.x+, PHP 8.0+
 * ================================================================
 */

defined( 'ABSPATH' ) || exit; // Seguridad: bloquear acceso directo

/* ================================================================
   SECCIÓN 1 — CUSTOM POST TYPES (CPT)
   ================================================================ */

/**
 * Registrar todos los CPTs al iniciar WordPress.
 */
add_action( 'init', 'parroquia_registrar_cpts' );

function parroquia_registrar_cpts() {
    parroquia_cpt_misas();
    parroquia_cpt_intenciones();
    parroquia_cpt_grupos();
    parroquia_cpt_noticias();
}

/* ----------------------------------------------------------------
   CPT 1: MISAS
   Guarda los horarios de misa editables desde el panel.
   ---------------------------------------------------------------- */
function parroquia_cpt_misas() {
    $labels = array(
        'name'               => 'Misas',
        'singular_name'      => 'Misa',
        'menu_name'          => 'Misas',
        'add_new'            => 'Agregar Misa',
        'add_new_item'       => 'Agregar Nueva Misa',
        'edit_item'          => 'Editar Misa',
        'view_item'          => 'Ver Misa',
        'search_items'       => 'Buscar Misas',
        'not_found'          => 'No se encontraron misas',
        'not_found_in_trash' => 'No hay misas en la papelera',
    );

    $args = array(
        'labels'             => $labels,
        'description'        => 'Horarios y tipos de misa parroquial',
        'public'             => false,          // No necesita URL pública
        'show_ui'            => true,           // Visible en el panel WP
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-clock',
        'menu_position'      => 20,
        'supports'           => array( 'title', 'custom-fields' ),
        'show_in_rest'       => false,          // Sin exposición en la API REST
    );

    register_post_type( 'parroquia_misa', $args );
}

/* ----------------------------------------------------------------
   CPT 2: INTENCIONES DE MISA
   Almacena las intenciones enviadas por los fieles.
   ---------------------------------------------------------------- */
function parroquia_cpt_intenciones() {
    $labels = array(
        'name'               => 'Intenciones de Misa',
        'singular_name'      => 'Intención de Misa',
        'menu_name'          => 'Intenciones',
        'add_new_item'       => 'Agregar Intención',
        'edit_item'          => 'Editar Intención',
        'view_item'          => 'Ver Intención',
        'search_items'       => 'Buscar Intenciones',
        'not_found'          => 'No se encontraron intenciones',
        'not_found_in_trash' => 'No hay intenciones en la papelera',
    );

    $args = array(
        'labels'             => $labels,
        'description'        => 'Intenciones de misa enviadas por los feligreses',
        'public'             => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-heart',
        'menu_position'      => 21,
        'supports'           => array( 'title', 'custom-fields' ),
        'show_in_rest'       => false,
        // Publicar con estado personalizado
        'capability_type'    => 'post',
    );

    register_post_type( 'parroquia_intencion', $args );
}

/* ----------------------------------------------------------------
   CPT 3: GRUPOS PARROQUIALES
   Administra los grupos (Catequesis, Pastoral Juvenil, etc.)
   ---------------------------------------------------------------- */
function parroquia_cpt_grupos() {
    $labels = array(
        'name'               => 'Grupos Parroquiales',
        'singular_name'      => 'Grupo',
        'menu_name'          => 'Grupos',
        'add_new_item'       => 'Agregar Grupo',
        'edit_item'          => 'Editar Grupo',
        'view_item'          => 'Ver Grupo',
        'search_items'       => 'Buscar Grupos',
        'not_found'          => 'No se encontraron grupos',
    );

    $args = array(
        'labels'             => $labels,
        'description'        => 'Grupos y movimientos parroquiales',
        'public'             => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-groups',
        'menu_position'      => 22,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
        'has_archive'        => true,
        'rewrite'            => array( 'slug' => 'grupos' ),
        'show_in_rest'       => true,   // Permite edición con Gutenberg
    );

    register_post_type( 'parroquia_grupo', $args );
}

/* ----------------------------------------------------------------
   CPT 4: NOTICIAS / ACONTECER PARROQUIAL
   ---------------------------------------------------------------- */
function parroquia_cpt_noticias() {
    $labels = array(
        'name'               => 'Acontecer Parroquial',
        'singular_name'      => 'Noticia',
        'menu_name'          => 'Acontecer',
        'add_new_item'       => 'Agregar Noticia',
        'edit_item'          => 'Editar Noticia',
        'search_items'       => 'Buscar Noticias',
        'not_found'          => 'No se encontraron noticias',
    );

    $args = array(
        'labels'             => $labels,
        'description'        => 'Noticias y eventos de la parroquia',
        'public'             => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-megaphone',
        'menu_position'      => 23,
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'has_archive'        => true,
        'rewrite'            => array( 'slug' => 'acontecer' ),
        'show_in_rest'       => true,
    );

    register_post_type( 'parroquia_noticia', $args );

    // Taxonomía: Categoría de Noticia
    register_taxonomy(
        'tipo_noticia',
        'parroquia_noticia',
        array(
            'label'        => 'Tipo de Noticia',
            'rewrite'      => array( 'slug' => 'tipo-noticia' ),
            'hierarchical' => true,
            'show_in_rest' => true,
        )
    );
}


/* ================================================================
   SECCIÓN 2 — META BOXES (campos personalizados en el panel)
   ================================================================ */

add_action( 'add_meta_boxes', 'parroquia_agregar_meta_boxes' );

function parroquia_agregar_meta_boxes() {

    // Meta box para Misas
    add_meta_box(
        'parroquia_misa_detalles',
        'Detalles de la Misa',
        'parroquia_mb_misa',
        'parroquia_misa',
        'normal',
        'high'
    );

    // Meta box para Intenciones
    add_meta_box(
        'parroquia_intencion_detalles',
        'Datos de la Intención',
        'parroquia_mb_intencion',
        'parroquia_intencion',
        'normal',
        'high'
    );
}

/**
 * Renderiza el meta box de Misas.
 *
 * @param WP_Post $post El post actual.
 */
function parroquia_mb_misa( $post ) {
    // Nonce de seguridad
    wp_nonce_field( 'parroquia_misa_nonce', 'parroquia_misa_nonce_field' );

    $dia     = get_post_meta( $post->ID, '_misa_dia',     true );
    $hora    = get_post_meta( $post->ID, '_misa_hora',    true );
    $tipo    = get_post_meta( $post->ID, '_misa_tipo',    true );
    $notas   = get_post_meta( $post->ID, '_misa_notas',   true );
    ?>
    <table class="form-table">
        <tr>
            <th><label for="misa_dia">Día de la Semana</label></th>
            <td>
                <select name="misa_dia" id="misa_dia">
                    <?php
                    $dias = array('Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado');
                    foreach ( $dias as $d ) {
                        echo '<option value="' . esc_attr($d) . '"' . selected($dia, $d, false) . '>' . esc_html($d) . '</option>';
                    }
                    ?>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="misa_hora">Hora</label></th>
            <td><input type="time" name="misa_hora" id="misa_hora" value="<?php echo esc_attr($hora); ?>"/></td>
        </tr>
        <tr>
            <th><label for="misa_tipo">Tipo</label></th>
            <td>
                <select name="misa_tipo" id="misa_tipo">
                    <option value="regular"    <?php selected($tipo, 'regular');    ?>>Regular</option>
                    <option value="solemne"    <?php selected($tipo, 'solemne');    ?>>Solemne</option>
                    <option value="especial"   <?php selected($tipo, 'especial');   ?>>Especial</option>
                    <option value="quinceañera"<?php selected($tipo, 'quinceañera');?>>Quinceañera</option>
                    <option value="funeral"    <?php selected($tipo, 'funeral');    ?>>Funeral</option>
                    <option value="boda"       <?php selected($tipo, 'boda');       ?>>Boda</option>
                </select>
            </td>
        </tr>
        <tr>
            <th><label for="misa_notas">Notas Adicionales</label></th>
            <td><textarea name="misa_notas" id="misa_notas" rows="3" style="width:100%"><?php echo esc_textarea($notas); ?></textarea></td>
        </tr>
    </table>
    <?php
}

/**
 * Renderiza el meta box de Intenciones.
 *
 * @param WP_Post $post El post actual.
 */
function parroquia_mb_intencion( $post ) {
    wp_nonce_field( 'parroquia_intencion_nonce', 'parroquia_intencion_nonce_field' );

    $nombre      = get_post_meta( $post->ID, '_intencion_nombre',      true );
    $fecha       = get_post_meta( $post->ID, '_intencion_fecha',       true );
    $tipo        = get_post_meta( $post->ID, '_intencion_tipo',        true );
    $descripcion = get_post_meta( $post->ID, '_intencion_descripcion', true );
    $estatus     = get_post_meta( $post->ID, '_intencion_estatus',     true );
    $ip          = get_post_meta( $post->ID, '_intencion_ip',          true );
    ?>
    <table class="form-table">
        <tr>
            <th>Nombre del Solicitante</th>
            <td><strong><?php echo esc_html($nombre); ?></strong></td>
        </tr>
        <tr>
            <th>Fecha de la Misa</th>
            <td><?php echo esc_html($fecha); ?></td>
        </tr>
        <tr>
            <th>Tipo de Intención</th>
            <td><?php echo esc_html($tipo); ?></td>
        </tr>
        <tr>
            <th>Descripción</th>
            <td><?php echo nl2br(esc_html($descripcion)); ?></td>
        </tr>
        <tr>
            <th><label for="intencion_estatus">Estatus</label></th>
            <td>
                <select name="intencion_estatus" id="intencion_estatus">
                    <option value="pendiente"  <?php selected($estatus, 'pendiente');  ?>>⏳ Pendiente de aprobación</option>
                    <option value="aprobada"   <?php selected($estatus, 'aprobada');   ?>>✅ Aprobada</option>
                    <option value="rechazada"  <?php selected($estatus, 'rechazada');  ?>>❌ Rechazada</option>
                    <option value="completada" <?php selected($estatus, 'completada'); ?>>🙏 Completada</option>
                </select>
            </td>
        </tr>
        <tr>
            <th>IP del Solicitante</th>
            <td><code><?php echo esc_html($ip); ?></code></td>
        </tr>
    </table>
    <?php
}

/**
 * Guardar los meta boxes al hacer Save en el panel.
 */
add_action( 'save_post', 'parroquia_guardar_meta_boxes' );

function parroquia_guardar_meta_boxes( $post_id ) {
    // Evitar autoguardado
    if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) return;

    // ── Guardar Misa ───────────────────────────────────────────
    if ( isset($_POST['parroquia_misa_nonce_field'])
      && wp_verify_nonce($_POST['parroquia_misa_nonce_field'], 'parroquia_misa_nonce')
      && current_user_can('edit_post', $post_id) ) {

        update_post_meta($post_id, '_misa_dia',   sanitize_text_field($_POST['misa_dia']   ?? ''));
        update_post_meta($post_id, '_misa_hora',  sanitize_text_field($_POST['misa_hora']  ?? ''));
        update_post_meta($post_id, '_misa_tipo',  sanitize_text_field($_POST['misa_tipo']  ?? ''));
        update_post_meta($post_id, '_misa_notas', sanitize_textarea_field($_POST['misa_notas'] ?? ''));
    }

    // ── Guardar Estatus de Intención ──────────────────────────
    if ( isset($_POST['parroquia_intencion_nonce_field'])
      && wp_verify_nonce($_POST['parroquia_intencion_nonce_field'], 'parroquia_intencion_nonce')
      && current_user_can('edit_post', $post_id) ) {

        $estatus_validos = array('pendiente','aprobada','rechazada','completada');
        $estatus = sanitize_text_field($_POST['intencion_estatus'] ?? 'pendiente');

        if ( in_array($estatus, $estatus_validos, true) ) {
            update_post_meta($post_id, '_intencion_estatus', $estatus);
        }
    }
}


/* ================================================================
   SECCIÓN 3 — AJAX: REGISTRAR INTENCIÓN DE MISA
   ================================================================
   Endpoint:   /wp-admin/admin-ajax.php
   Action:     registrar_intencion
   Acceso:     Público (nopriv) y autenticado (priv)
   ================================================================ */

// Registrar handlers (usuarios logueados y no logueados)
add_action( 'wp_ajax_registrar_intencion',        'parroquia_ajax_registrar_intencion' );
add_action( 'wp_ajax_nopriv_registrar_intencion', 'parroquia_ajax_registrar_intencion' );

/**
 * Handler AJAX: Recibe los datos del formulario, los valida,
 * sanitiza y crea un nuevo post 'parroquia_intencion'.
 *
 * Retorna JSON { success: bool, data: { mensaje | error } }
 */
function parroquia_ajax_registrar_intencion() {

    // 1. Verificar nonce (CSRF protection)
    if ( ! check_ajax_referer( 'parroquia_intencion_nonce', 'intencion_nonce', false ) ) {
        wp_send_json_error( array( 'error' => 'Solicitud no autorizada. Por favor recarga la página e intenta de nuevo.' ), 403 );
    }

    // 2. Sanitizar campos de entrada
    $nombre      = sanitize_text_field( $_POST['nombre']      ?? '' );
    $fecha       = sanitize_text_field( $_POST['fecha']       ?? '' );
    $tipo        = sanitize_text_field( $_POST['tipo']        ?? '' );
    $descripcion = sanitize_textarea_field( $_POST['descripcion'] ?? '' );

    // 3. Validar campos requeridos
    $errores = array();

    if ( empty($nombre) || strlen($nombre) < 3 ) {
        $errores[] = 'El nombre debe tener al menos 3 caracteres.';
    }
    if ( strlen($nombre) > 100 ) {
        $errores[] = 'El nombre no puede superar los 100 caracteres.';
    }

    if ( empty($fecha) ) {
        $errores[] = 'La fecha es requerida.';
    } else {
        // Validar formato de fecha (YYYY-MM-DD)
        $fecha_obj = DateTime::createFromFormat('Y-m-d', $fecha);
        if ( ! $fecha_obj || $fecha_obj->format('Y-m-d') !== $fecha ) {
            $errores[] = 'El formato de fecha no es válido.';
        }
        // La fecha no puede ser en el pasado (más de 2 días)
        $hoy = new DateTime();
        $hoy->modify('-2 days');
        if ( $fecha_obj && $fecha_obj < $hoy ) {
            $errores[] = 'La fecha de la misa no puede ser anterior a hoy.';
        }
    }

    $tipos_validos = array('accion-gracias', 'difunto', 'enfermo', 'intencion-especial');
    if ( empty($tipo) || ! in_array($tipo, $tipos_validos, true) ) {
        $errores[] = 'El tipo de intención seleccionado no es válido.';
    }

    // Limitar descripción
    if ( strlen($descripcion) > 500 ) {
        $errores[] = 'La descripción no puede superar los 500 caracteres.';
    }

    // 4. Si hay errores, retornarlos
    if ( ! empty($errores) ) {
        wp_send_json_error( array( 'error' => implode(' ', $errores) ), 422 );
    }

    // 5. Rate limiting: máx 3 intenciones por IP en 24 horas
    $ip_solicitante  = parroquia_obtener_ip();
    $transient_key   = 'intencion_ip_' . md5($ip_solicitante);
    $intentos        = (int) get_transient($transient_key);

    if ( $intentos >= 3 ) {
        wp_send_json_error( array(
            'error' => 'Has alcanzado el límite de intenciones por día (3). Intenta mañana.'
        ), 429 );
    }

    // 6. Crear el post de Intención
    $mapa_tipos = array(
        'accion-gracias'    => 'Acción de Gracias',
        'difunto'           => 'Por un Difunto',
        'enfermo'           => 'Por un Enfermo',
        'intencion-especial'=> 'Intención Especial',
    );

    $post_title = sprintf(
        '%s — %s (%s)',
        $mapa_tipos[$tipo],
        $nombre,
        date('d/m/Y', strtotime($fecha))
    );

    $post_id = wp_insert_post( array(
        'post_type'   => 'parroquia_intencion',
        'post_title'  => $post_title,
        'post_status' => 'publish',  // Se filtra por meta _intencion_estatus
    ) );

    if ( is_wp_error($post_id) ) {
        wp_send_json_error( array(
            'error' => 'Ocurrió un error al guardar tu intención. Por favor intenta más tarde.'
        ), 500 );
    }

    // 7. Guardar metadatos de la intención
    update_post_meta( $post_id, '_intencion_nombre',      $nombre );
    update_post_meta( $post_id, '_intencion_fecha',       $fecha );
    update_post_meta( $post_id, '_intencion_tipo',        $tipo );
    update_post_meta( $post_id, '_intencion_descripcion', $descripcion );
    update_post_meta( $post_id, '_intencion_estatus',     'pendiente' );
    update_post_meta( $post_id, '_intencion_ip',          $ip_solicitante );
    update_post_meta( $post_id, '_intencion_fecha_envio', current_time('mysql') );

    // 8. Actualizar contador de rate limiting
    set_transient( $transient_key, $intentos + 1, DAY_IN_SECONDS );

    // 9. Notificar al párroco por correo (opcional)
    parroquia_notificar_nueva_intencion( $post_id, $nombre, $fecha, $tipo, $descripcion );

    // 10. Respuesta de éxito
    wp_send_json_success( array(
        'mensaje' => '¡Tu intención de misa ha sido registrada con éxito! ' .
                     'El párroco la revisará en breve. ¡Que Dios te bendiga! 🙏',
        'id'      => $post_id,
    ) );
}

/**
 * Obtiene la IP real del visitante, considerando proxies.
 *
 * @return string Dirección IP sanitizada.
 */
function parroquia_obtener_ip() {
    $posibles = array(
        'HTTP_CF_CONNECTING_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_REAL_IP',
        'REMOTE_ADDR',
    );

    foreach ( $posibles as $clave ) {
        if ( ! empty($_SERVER[$clave]) ) {
            $ip = explode(',', $_SERVER[$clave])[0];
            $ip = filter_var(trim($ip), FILTER_VALIDATE_IP);
            if ( $ip ) return $ip;
        }
    }

    return 'desconocida';
}

/**
 * Envía un correo al párroco cuando llega una nueva intención.
 *
 * @param int    $post_id     ID del post creado.
 * @param string $nombre      Nombre del solicitante.
 * @param string $fecha       Fecha de la misa (YYYY-MM-DD).
 * @param string $tipo        Clave del tipo de intención.
 * @param string $descripcion Descripción adicional.
 */
function parroquia_notificar_nueva_intencion( $post_id, $nombre, $fecha, $tipo, $descripcion ) {
    $correo_parroco = get_option('admin_email'); // Cambiar por el correo real del párroco
    $asunto         = sprintf('[Parroquia] Nueva Intención de Misa — %s', $nombre);
    $enlace_panel   = admin_url('post.php?post=' . $post_id . '&action=edit');

    $cuerpo = "Se ha recibido una nueva intención de misa:\n\n"
            . "Nombre:      $nombre\n"
            . "Fecha Misa:  " . date('d/m/Y', strtotime($fecha)) . "\n"
            . "Tipo:        $tipo\n"
            . "Descripción: $descripcion\n\n"
            . "Revísala en el panel de administración:\n$enlace_panel\n\n"
            . "— Sistema automático de la Parroquia Santa María de la Asunción";

    wp_mail( $correo_parroco, $asunto, $cuerpo );
}


/* ================================================================
   SECCIÓN 4 — AJAX: BUSCAR INTENCIÓN EXISTENTE
   ================================================================ */

add_action( 'wp_ajax_buscar_intencion',        'parroquia_ajax_buscar_intencion' );
add_action( 'wp_ajax_nopriv_buscar_intencion', 'parroquia_ajax_buscar_intencion' );

function parroquia_ajax_buscar_intencion() {

    if ( ! check_ajax_referer( 'parroquia_intencion_nonce', 'intencion_nonce', false ) ) {
        wp_send_json_error( array('error' => 'Solicitud no autorizada.'), 403 );
    }

    $nombre = sanitize_text_field( $_POST['nombre'] ?? '' );
    $fecha  = sanitize_text_field( $_POST['fecha']  ?? '' );
    $tipo   = sanitize_text_field( $_POST['tipo']   ?? '' );

    if ( empty($nombre) ) {
        wp_send_json_error( array('error' => 'El nombre es requerido para buscar.'), 422 );
    }

    // Construir query de búsqueda
    $meta_query = array(
        'relation' => 'AND',
        array(
            'key'     => '_intencion_nombre',
            'value'   => $nombre,
            'compare' => 'LIKE',
        ),
    );

    if ( ! empty($fecha) ) {
        $meta_query[] = array(
            'key'   => '_intencion_fecha',
            'value' => $fecha,
        );
    }

    if ( ! empty($tipo) ) {
        $meta_query[] = array(
            'key'   => '_intencion_tipo',
            'value' => $tipo,
        );
    }

    $query = new WP_Query( array(
        'post_type'      => 'parroquia_intencion',
        'post_status'    => 'publish',
        'posts_per_page' => 10,
        'meta_query'     => $meta_query,
    ) );

    if ( ! $query->have_posts() ) {
        wp_send_json_success( array(
            'resultados' => array(),
            'mensaje'    => 'No se encontraron intenciones con esos datos.',
        ) );
    }

    $resultados = array();
    while ( $query->have_posts() ) {
        $query->the_post();
        $post_id = get_the_ID();

        $estatus = get_post_meta($post_id, '_intencion_estatus', true);
        $etiquetas_estatus = array(
            'pendiente'  => '⏳ Pendiente',
            'aprobada'   => '✅ Aprobada',
            'rechazada'  => '❌ Rechazada',
            'completada' => '🙏 Completada',
        );

        $resultados[] = array(
            'id'      => $post_id,
            'nombre'  => get_post_meta($post_id, '_intencion_nombre', true),
            'fecha'   => date('d/m/Y', strtotime(get_post_meta($post_id, '_intencion_fecha', true))),
            'tipo'    => get_post_meta($post_id, '_intencion_tipo', true),
            'estatus' => $etiquetas_estatus[$estatus] ?? '⏳ Pendiente',
        );
    }
    wp_reset_postdata();

    wp_send_json_success( array( 'resultados' => $resultados ) );
}


/* ================================================================
   SECCIÓN 5 — ENCOLAR SCRIPTS Y ESTILOS EN EL FRONTEND
   ================================================================ */

add_action( 'wp_enqueue_scripts', 'parroquia_encolar_recursos' );

function parroquia_encolar_recursos() {

    // Hoja de estilos principal (en tu tema hijo crea /css/parroquia-frontend.css)
    wp_enqueue_style(
        'parroquia-frontend',
        get_stylesheet_directory_uri() . '/css/parroquia-frontend.css',
        array(),
        '1.0.0'
    );

    // Script frontend
    wp_enqueue_script(
        'parroquia-frontend',
        get_stylesheet_directory_uri() . '/js/parroquia-frontend.js',
        array(),   // Sin jQuery (usamos Fetch API nativa)
        '1.0.0',
        true       // Cargar al final del body para no bloquear render
    );

    /*
     * wp_localize_script inyecta variables PHP → JavaScript de forma segura.
     * El JS accede a parroquiaAjax.ajaxUrl y parroquiaAjax.nonce.
     */
    wp_localize_script(
        'parroquia-frontend',
        'parroquiaAjax',
        array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce'   => wp_create_nonce('parroquia_intencion_nonce'),
        )
    );
}


/* ================================================================
   SECCIÓN 6 — SHORTCODES ÚTILES
   ================================================================ */

/**
 * [parroquia_horarios_misa]
 *
 * Uso en Divi Text Module o cualquier área de contenido:
 *   [parroquia_horarios_misa dia="Domingo"]
 *
 * @param array $atts Atributos del shortcode.
 * @return string HTML con los horarios.
 */
add_shortcode( 'parroquia_horarios_misa', 'parroquia_sc_horarios_misa' );

function parroquia_sc_horarios_misa( $atts ) {
    $atts = shortcode_atts(
        array( 'dia' => 'Domingo' ),
        $atts,
        'parroquia_horarios_misa'
    );

    $dia_filtro = sanitize_text_field($atts['dia']);

    $misas = get_posts( array(
        'post_type'      => 'parroquia_misa',
        'post_status'    => 'publish',
        'posts_per_page' => 10,
        'meta_key'       => '_misa_dia',
        'meta_value'     => $dia_filtro,
        'orderby'        => 'meta_value',
        'order'          => 'ASC',
    ) );

    if ( empty($misas) ) {
        return '<p class="parroquia-sin-misas">No hay misas registradas para ' . esc_html($dia_filtro) . '.</p>';
    }

    $html = '<ul class="parroquia-horarios-lista">';
    foreach ( $misas as $misa ) {
        $hora  = get_post_meta($misa->ID, '_misa_hora',  true);
        $tipo  = get_post_meta($misa->ID, '_misa_tipo',  true);
        $notas = get_post_meta($misa->ID, '_misa_notas', true);

        $hora_fmt = $hora ? date('g:i A', strtotime($hora)) : esc_html($hora);

        $html .= '<li class="parroquia-horario-item">';
        $html .= '<span class="parroquia-hora">' . esc_html($hora_fmt) . '</span>';
        if ( $tipo ) $html .= ' <span class="parroquia-tipo">(' . esc_html($tipo) . ')</span>';
        if ( $notas ) $html .= '<small class="parroquia-notas">' . esc_html($notas) . '</small>';
        $html .= '</li>';
    }
    $html .= '</ul>';

    return $html;
}


/* ================================================================
   SECCIÓN 7 — WIDGET DE INTENCIONES PARA DIVI / SIDEBAR
   ================================================================

   Registra un widget que muestra el formulario de intenciones.
   En Divi: Appearance → Widgets → "Intenciones de Misa".
   ================================================================ */

add_action( 'widgets_init', function() {
    register_widget('Parroquia_Widget_Intenciones');
});

class Parroquia_Widget_Intenciones extends WP_Widget {

    public function __construct() {
        parent::__construct(
            'parroquia_intenciones',
            'Parroquia — Intenciones de Misa',
            array( 'description' => 'Formulario de intenciones de misa para el sidebar o áreas de widgets.' )
        );
    }

    public function widget( $args, $instance ) {
        echo $args['before_widget'];
        echo $args['before_title'] . esc_html( $instance['titulo'] ?? 'Intenciones de Misa' ) . $args['after_title'];

        // Incluir el template del formulario
        // En producción: get_template_part('template-parts/intenciones-form');
        echo '<p>Registra o busca tu intención de misa. <a href="' . esc_url(get_permalink(get_option('page_on_front'))) . '#intenciones">Ir al formulario →</a></p>';

        echo $args['after_widget'];
    }

    public function form( $instance ) {
        $titulo = esc_attr($instance['titulo'] ?? 'Intenciones de Misa');
        ?>
        <p>
          <label for="<?php echo $this->get_field_id('titulo'); ?>">Título:</label>
          <input class="widefat" id="<?php echo $this->get_field_id('titulo'); ?>"
                 name="<?php echo $this->get_field_name('titulo'); ?>"
                 type="text" value="<?php echo $titulo; ?>">
        </p>
        <?php
    }

    public function update( $new_instance, $old_instance ) {
        return array( 'titulo' => sanitize_text_field($new_instance['titulo']) );
    }
}


/* ================================================================
   SECCIÓN 8 — COLUMNAS PERSONALIZADAS EN EL LISTADO DEL PANEL
   ================================================================ */

// Columnas para Intenciones
add_filter( 'manage_parroquia_intencion_posts_columns',       'parroquia_columnas_intenciones' );
add_action( 'manage_parroquia_intencion_posts_custom_column', 'parroquia_contenido_columnas_intenciones', 10, 2 );

function parroquia_columnas_intenciones( $cols ) {
    $nuevas = array(
        'cb'                => $cols['cb'],
        'title'             => 'Título Generado',
        'intencion_nombre'  => 'Nombre',
        'intencion_fecha'   => 'Fecha de Misa',
        'intencion_tipo'    => 'Tipo',
        'intencion_estatus' => 'Estatus',
        'date'              => 'Fecha de Envío',
    );
    return $nuevas;
}

function parroquia_contenido_columnas_intenciones( $col, $post_id ) {
    switch ($col) {
        case 'intencion_nombre':
            echo esc_html(get_post_meta($post_id, '_intencion_nombre', true));
            break;
        case 'intencion_fecha':
            $f = get_post_meta($post_id, '_intencion_fecha', true);
            echo $f ? esc_html(date('d/m/Y', strtotime($f))) : '—';
            break;
        case 'intencion_tipo':
            echo esc_html(get_post_meta($post_id, '_intencion_tipo', true));
            break;
        case 'intencion_estatus':
            $est = get_post_meta($post_id, '_intencion_estatus', true);
            $iconos = array(
                'pendiente'  => '<span style="color:#f57c00">⏳ Pendiente</span>',
                'aprobada'   => '<span style="color:#388e3c">✅ Aprobada</span>',
                'rechazada'  => '<span style="color:#d32f2f">❌ Rechazada</span>',
                'completada' => '<span style="color:#1565c0">🙏 Completada</span>',
            );
            echo $iconos[$est] ?? '<span>—</span>';
            break;
    }
}


/* ================================================================
   SECCIÓN 9 — FLUSH REWRITE RULES (una sola vez al activar)
   ================================================================ */

register_activation_hook( __FILE__, 'parroquia_flush_rewrite_al_activar' );
register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );

function parroquia_flush_rewrite_al_activar() {
    parroquia_registrar_cpts();
    flush_rewrite_rules();
}


/* ================================================================
   FIN DEL ARCHIVO
   ================================================================ */
