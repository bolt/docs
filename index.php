<?php

require_once('lib/markdown.php');
require_once('lib/smartypants.php');
require_once './vendor/autoload.php';

if (!isset($_GET['s'])) {
    echo "No source given. Bye!";
    die();
}

if (!file_exists("./source/".basename($_GET['s'].".md"))) {
    echo "No proper name for a page in the docs. Bye!";
    die();
}

$source = file_get_contents("./source/".basename($_GET['s'].".md"));
$source = SmartyPants(Markdown($source));

error_reporting(E_ALL);

$loader = new Twig_Loader_Filesystem('./view');
$twig = new Twig_Environment($loader, array(
/*    'cache' => './cache', */
));

echo $twig->render('index.twig', array(
	'title' => 'Pilex docs',
	'source' => $source
));

