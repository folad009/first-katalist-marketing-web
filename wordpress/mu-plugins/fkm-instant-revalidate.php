<?php
/**
 * Plugin Name: FKM Instant Revalidate
 * Description: Tells the Next.js site to refresh its cached WordPress content as soon as something is saved, trashed or deleted.
 *
 * Install: copy this file to wp-content/mu-plugins/ on the CMS server.
 *
 * Needs in wp-config.php (above "That's all, stop editing!"):
 *
 *   define( 'FKM_REVALIDATION_SECRET', 'same value as REVALIDATION_SECRET in Vercel' );
 *
 * Optional, if the public site moves:
 *
 *   define( 'FKM_FRONTEND_URL', 'https://www.firstkatalystmarketing.com' );
 *
 * Endpoint on the Next.js side: src/app/api/revalidate/route.js
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * WordPress post type → "type" understood by /api/revalidate
 * (CONTENT_TYPE_TO_TAG in src/lib/wordpress.js).
 */
function fkm_revalidate_post_types() {
	return array(
		'post'        => 'post',
		'service'     => 'service',
		'portfolio'   => 'portfolio',
		'team_member' => 'team_member',
		'testimonial' => 'testimonial',
		'career'      => 'career',
		'faq'         => 'faq',
		'fk_company'  => 'fk_company',
	);
}

/** Page slug → type. Only these pages feed the website. */
function fkm_revalidate_pages() {
	return array(
		'company-profile' => 'company_profile',
		'site-images'     => 'site_images',
	);
}

/** Types to refresh at the end of this request (deduplicated). */
$GLOBALS['fkm_revalidate_queue'] = array();

function fkm_revalidate_queue_post( $post ) {
	$post = get_post( $post );
	if ( ! $post || wp_is_post_revision( $post ) || wp_is_post_autosave( $post ) || 'auto-draft' === $post->post_status ) {
		return;
	}

	$type = null;
	if ( 'page' === $post->post_type ) {
		// Slug gets a "__trashed" suffix when a page is trashed.
		$slug  = preg_replace( '/__trashed$/', '', $post->post_name );
		$pages = fkm_revalidate_pages();
		$type  = isset( $pages[ $slug ] ) ? $pages[ $slug ] : null;
	} else {
		$types = fkm_revalidate_post_types();
		$type  = isset( $types[ $post->post_type ] ) ? $types[ $post->post_type ] : null;
	}

	if ( $type ) {
		$GLOBALS['fkm_revalidate_queue'][ $type ] = true;
	}
}

// Post saved, published, unpublished or trashed (fires after its meta is saved).
add_action( 'wp_after_insert_post', 'fkm_revalidate_queue_post', 10, 1 );
// ACF fields saved (the block editor saves ACF boxes in a second request).
add_action(
	'acf/save_post',
	function ( $post_id ) {
		if ( is_numeric( $post_id ) ) {
			fkm_revalidate_queue_post( (int) $post_id );
		}
	},
	20
);
// Permanently deleted.
add_action( 'before_delete_post', 'fkm_revalidate_queue_post', 10, 1 );

// Send once per request, after everything (including ACF) has been written.
add_action(
	'shutdown',
	function () {
		$queue = array_keys( $GLOBALS['fkm_revalidate_queue'] );
		if ( ! $queue ) {
			return;
		}

		if ( ! defined( 'FKM_REVALIDATION_SECRET' ) || ! FKM_REVALIDATION_SECRET ) {
			error_log( '[fkm-revalidate] FKM_REVALIDATION_SECRET is not defined in wp-config.php; website not refreshed.' );
			return;
		}

		$base = defined( 'FKM_FRONTEND_URL' ) ? FKM_FRONTEND_URL : 'https://www.firstkatalystmarketing.com';
		$url  = untrailingslashit( $base ) . '/api/revalidate';

		foreach ( $queue as $type ) {
			$response = wp_remote_post(
				$url,
				array(
					'timeout' => 5,
					'headers' => array(
						'Content-Type'           => 'application/json',
						'X-Revalidation-Secret'  => FKM_REVALIDATION_SECRET,
					),
					'body'    => wp_json_encode( array( 'type' => $type ) ),
				)
			);

			if ( is_wp_error( $response ) ) {
				error_log( "[fkm-revalidate] {$type}: " . $response->get_error_message() );
			} elseif ( 200 !== wp_remote_retrieve_response_code( $response ) ) {
				error_log( "[fkm-revalidate] {$type}: HTTP " . wp_remote_retrieve_response_code( $response ) . ' ' . wp_remote_retrieve_body( $response ) );
			}
		}
	}
);
