<?php

if (PHP_SAPI === 'cli-server') {
    if (is_file($_SERVER['DOCUMENT_ROOT'] . preg_replace('#(\?.*)$#', '', $_SERVER['REQUEST_URI']))) {
        return false;
    }
}

if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    echo "<p>The file <tt>vendor/autoload.php</tt> doesn't exist. Make sure you've installed the Silex components with Composer. See the README.md file.</p>";
    die();
}

require_once __DIR__ . '/../vendor/autoload.php';

$app = new Bolt\Docs\Application();

$app->run();
