<?php

declare(strict_types=1);

require __DIR__.'/../../../vendor/autoload.php';

function plainName(string $name): string
{
    preg_match('/([a-z0-9\*_-]+)/i', $name, $matches);

    return $matches[0];
}

function linkSource(string $source, string $name): string
{
    if (in_array(mb_strtolower($source), ['twig', 'forms'])) {
        $output = sprintf('[%s](https://twig.symfony.com/%s)', ucfirst($source), $name);
    } else {
        $output = ucfirst($source);
    }

    return $output;
}

$input = explode("\n", file_get_contents('twig_methods_data.txt'));
$twigData = [];
$list = [];

$stub = <<<EOM
# %s

`%s` is a Twig %s to ...


Source: %s
EOM;

// Parse data
foreach ($input as $line) {
    $line = explode('|', $line);
    $twigData[] = [
        'name' => trim($line[0]),
        'type' => trim($line[1]),
        'origin' => trim($line[2])
    ];
}

// Iterate data
foreach ($twigData as $method) {

    $plainName = plainName($method['name']);
    $source = linkSource($method['origin'], $plainName);

    $output = sprintf(
        $stub,
        $plainName,
        $method['name'],
        $method['type'],
        $source
    );

    if (!isset($list[$method['type']])) {
        $list[$method['type']] = sprintf("\n\n## %s\n\n", ucfirst($method['type']));
    }

    $list[$method['type']] .= sprintf("- [%s](twig-components/method/%s) <small>(%s)</small>\n", $method['name'], $plainName, $method['origin']);
    $links[] = sprintf("    - %s", $plainName);

    file_put_contents('docs/twig-components/method/' . $plainName . '.md', $output);
}

echo(implode("\n", $list));

echo "\n\n\n";

echo(implode("\n", $links));

echo "\n\n\n";