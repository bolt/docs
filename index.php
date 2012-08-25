<?php

require_once('lib/markdown.php');
require_once('lib/smartypants.php');
require_once './vendor/autoload.php';

$request = basename($_SERVER['REQUEST_URI']);

//echo "<pre>";
//var_dump($request);
//echo "</pre>";

if (empty($request)) {
	$request = "about";
}

if (!file_exists("./source/".$request.".md")) {
    echo "No proper name for a page in the docs. Bye!";
    die();
}

$source = file_get_contents("./source/".$request.".md");
$source = SmartyPants(Markdown($source));

$loader = new Twig_Loader_Filesystem('./view');
$twig = new Twig_Environment($loader, array(
/*    'cache' => './cache', */
));

$menu = array(
	'about' => "About",
	'screenshots' => "Screenshots",
	'setup' => "Installing Pilex",
	'using' => "Using Pilex",
	'content' => "Working with Content and Content types",
	'templates' => "Building templates",
	'credits' => "Credits and Contributing",
	);

echo $twig->render('index.twig', array(
	'title' => 'Pilex docs',
	'source' => $source,
	'menu' => $menu
));

