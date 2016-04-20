<?php

if (PHP_SAPI === 'cli-server') {
    if (is_file($_SERVER['DOCUMENT_ROOT'] . preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']))) {
        return false;
    }
}

if (!file_exists(__DIR__ . '/../app/config.yml')) {
    echo "<p>The file <tt>app/config.yml</tt> doesn't exist. Copy <tt>config.yml.dist</tt> to <tt>config.yml</tt> and add the correct settings.</p>";
    die();
}
if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    echo "<p>The file <tt>vendor/autoload.php</tt> doesn't exist. Make sure you've installed the Silex components with Composer. See the README.md file.</p>";
    die();
}

require_once __DIR__ . '/../vendor/autoload.php';

$app = new Bolt\Docs\Application();

$app->run();

/*

// Setup the parser and read the versions
$yaml = new Parser();
$versions = $yaml->parse(file_get_contents('versions.yml'));


// Determine if we're on 'docs' or on 'manual'
$hostname = $_SERVER['SERVER_NAME'];
if (strpos($hostname, 'manual') !== false) {
    $sourcefolder = './source_manual/';
    $menufile = 'menu_manual.yml';
    $sitetitle = 'Bolt user manual';
} else {
    if (in_array(ltrim($prefix, '/'), $versions)) {
        $sourcefolder = './version'.$prefix.'/source_docs/';
        $menufile = './version'.$prefix.'/menu_docs.yml';
        $sitetitle = 'Bolt documentation';
        $prefix = '';
    } else {
        $sourcefolder = './source_docs/';
        $menufile = 'menu_docs.yml';
        $sitetitle = 'Bolt documentation';
    }

}

if (!file_exists($sourcefolder . $request . ".md")) {
    header("HTTP/1.0 404 Not Found");
    echo "No proper name for a page in the docs. Bye!";
    die();
}





// Let's see if there's a 'q' to highlight..
/* ----- This is broken: it also replaces _inside_ image tags. Not what we want.
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
----  * /


$loader = new Twig_Loader_Filesystem('./view');
$twig = new Twig_Environment($loader, array(
/ *    'cache' => './cache', * /
));


// Add Dumper function to twig.
$dumper = new Twig_SimpleFunction(
    'dump',
    function ($var) { return dump($var); },
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
    'sitetitle' => $sitetitle,
	'source' => $source,
	'menu' => $menu,
	'submenu' => $submenu,
	'current' => $request,
	'version' => $version,
    'requested_page' => $request,
    'prefix' => ($prefix == "/" ? "" : $prefix)
));



// ----------





/**
 * Modify a string, so that we can use it for slugs. Like
 * safeString, but using hyphens instead of underscores.
 *
 * @param string $str
 * @param string $type
 * @return string
 * /
function makeSlug($str) {

    return \URLify::filter(strip_tags($str));

}

*/
