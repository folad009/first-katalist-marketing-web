<?php
/**
 * Plugin Name: CMS REST URL
 * Description: Headless setup: the Site Address is the Next.js site, but the REST API lives on the CMS domain. Without this the block editor saves to the Next.js site and fails ("Updating failed").
 *
 * Install: copy this file to wp-content/mu-plugins/ on the CMS server.
 */

add_filter( 'rest_url', function ( $url ) {
	return str_replace( untrailingslashit( home_url() ), untrailingslashit( site_url() ), $url );
} );
