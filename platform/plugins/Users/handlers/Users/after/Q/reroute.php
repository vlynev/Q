<?php

function Users_after_Q_reroute($params, &$stop_dispatch)
{
	$uri = Q_Dispatcher::uri();
	$app = Q_Config::expect('Q', 'app');
	$ma = $uri->module.'/'.$uri->action;
	$requireLogin = Q_Config::get('Users', 'requireLogin', array());
	if (!isset($requireLogin[$ma])) {
		return; // We don't have to require login here
	}
	$user = Users::loggedInUser();
	if ($requireLogin[$ma] === true and !$user) {
		// require login
	} else if ($requireLogin[$ma] === 'facebook' and !Users::facebook($app)) {
		// require facebook
	} else {
		return; // We don't have to require login here
	}
	$redirect_action = Q_Config::get('Users', 'uris', "$app/login", "$app/welcome");
	if ($redirect and $ma != $redirect_action) {
		Q_Response::redirect($redirect_action);
		$stop_dispatch = true;
		return;
	}
}
