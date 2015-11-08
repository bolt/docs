<?php

require_once './vendor/autoload.php';

use Symfony\Component\Finder\Finder;

$searcher = new search();
echo $searcher->find();

// --------

class Search
{

    private $results = array();
    private $titles = array();
    private $items = array();

    public function find()
    {

        // Set $q
        if (isset($_GET['q'])) {
            $q = $_GET['q'];
        } else {
            $q = "";
        }

        // Split on words.
        $q = preg_split("/(?<=\w)\b\s*/", $q);

        foreach ($q as $atom) {
            $this->searchWord($atom);
        }

        arsort($this->results);

        // \Dumper::dump($this->results);

        foreach ($this->results as $page => $score) {
            $this->items[] = array('id' => $page, 'text' => $this->titles[$page]);
        }

        return json_encode(array("items" => $this->items));

    }

    private function searchWord($q)
    {

        if (strlen($q) < 3) {
            return;
        }

        // Determine if we're on 'docs' or on 'manual'
        $hostname = $_SERVER['SERVER_NAME'];
        if (strpos($hostname, 'manual') !== false) {
            $sourcefolder = __DIR__ . '/source_manual';
        } else {
            $sourcefolder = __DIR__ . '/source_docs';
        }

        $finder = new Finder();
        $finder->files()->in($sourcefolder)->contains('/' . $q . '/i');

        foreach ($finder as $file) {

            $filename = str_replace(".md", "", $file->getRelativePathname());

            $contents = file_get_contents($file->getRealpath());
            $score = $this->weighQueryText($contents, $q, $filename);

            // Assume first line is the title.
            $title = strtok($contents, "\n");

            // Add the 'folder' to the title, perhaps
            if (!empty($file->getRelativePath())) {
                $title = ucfirst($file->getRelativePath()) . " - " . $title;
            }

            $this->titles[$filename] = $title;
        }

    }

    /**
     * Weight a text part relative to some other part
     *
     * @param  string  $subject  The subject to search in.
     * @param  string  $complete The complete search term (lowercased).
     * @return integer The weight
     */
    private function weighQueryText($contents, $q, $filename)
    {

        $contents = mb_strtolower(trim($contents));

        // echo "<br>filename: $filename - ";
        $score = $this->findScore($contents, $q);

        if (!isset($results[$filename])) {
            $this->results[$filename] = 0;
        }
        $this->results[$filename] += $score;

        return $score;

    }


    private function findScore($contents, $q)
    {

        $score = 0;

        $length = strlen($contents);

        while (strpos($contents, $q) !== false) {

            $pos = strpos($contents, $q);
            $score += pow( (($length - $pos) / $length), 2);

            // echo "[x]";

            $contents = $this->str_replace_once($q, "    ", $contents);

        }

        return $score;

    }

    private function str_replace_once($str_pattern, $str_replacement, $string){

        if (strpos($string, $str_pattern) !== false){
            $occurrence = strpos($string, $str_pattern);
            return substr_replace($string, $str_replacement, strpos($string, $str_pattern), strlen($str_pattern));
        }

        return $string;
    }

}
