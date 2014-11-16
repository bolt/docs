<?php

require_once './vendor/autoload.php';

$version = "2.0.0 beta";


// Let's see if there's a search-parameter.
$parseurl = parse_url($_SERVER['REQUEST_URI']);

$request = basename($parseurl['path']);
$prefix = dirname($parseurl['path']);

if ($prefix == "/") {
    $prefix = "";
}

if (empty($request) || $request == "v20" ) {
    $prefix = "/v20";
	$request = "about";
}

if (!file_exists("./source/".$request.".md")) {
    echo "No proper name for a page in the docs. Bye!";
    die();
}

use Symfony\Component\Yaml\Parser;

$yaml = new Parser();

$menu = $yaml->parse(file_get_contents('menu.yml'));

$source = file_get_contents("./source/".$request.".md");
$source = \ParsedownExtra::instance()->text($source);
$source = Michelf\SmartyPants::defaultTransform($source);


preg_match("/<h1>(.*)<\/h1>/i", $source, $maintitle);

$maintitle = $maintitle[1];

preg_match_all("/<h2>(.*)<\/h2>/i", $source, $matches);
$submenu = array();
foreach ($matches[1] as $key => $title) {
	$submenu[ makeSlug(strip_tags($title)) ] = strip_tags($title);
}


// Let's see if there's a 'q' to highlight..
if (!empty($_GET['q'])) {

    $q = makeSlug($_GET['q']);

    $source = preg_replace_callback("/" . $q . "/i", function($matches) {
        $output = sprintf("<mark id='%s'>%s</mark>", 
            makeSlug($matches[0]), 
            $matches[0]
        );
        return $output;
    }, $source);
}

// Markup for <h1> and <h2>..
$source = preg_replace_callback("/<h([234])>(.*)<\/h([234])>/i", function($matches) {
    $output = sprintf("<h%s id='%s'>%s<a href='#%s' class='anchor'>¶</a></h%s>", 
                    $matches[1], 
                    makeSlug($matches[2]), 
                    $matches[2], 
                    makeSlug($matches[2]), 
                    $matches[1]
                );
    return $output;
}, $source);


$loader = new Twig_Loader_Filesystem('./view');
$twig = new Twig_Environment($loader, array(
/*    'cache' => './cache', */
));


// Add Dumper function to twig. 
$dumper = new Twig_SimpleFunction(
    'dump', 
    function ($var) { return \Dumper::dump($var, DUMPER_CAPTURE); }, 
    array('is_safe' => array('html')
));
$twig->addFunction($dumper);


// Add markdown to twig. 
$markdown = new Twig_SimpleFilter(
    'markdown', 
    function ($content) { return \ParsedownExtra::instance()->text($content); }, 
    array('is_safe' => array('html')
));
$twig->addFilter($markdown);

// Add slug filter to twig. 
$slug = new Twig_SimpleFilter(
    'slug', 
    function ($name) { return \URLify::filter($name); }, 
    array('is_safe' => array('html')
));
$twig->addFilter($slug);

echo $twig->render('index.twig', array(
	'title' => $maintitle,
	'source' => $source,
	'menu' => $menu,
	'submenu' => $submenu,
	'current' => $request,
	'version' => $version, 
    'prefix' => $prefix
));



// ----------





/**
 * Modify a string, so that we can use it for slugs. Like
 * safeString, but using hyphens instead of underscores.
 *
 * @param string $str
 * @param string $type
 * @return string
 */
function makeSlug($str) {

    return \URLify::filter(strip_tags($str));

}

