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

        $finder = new Finder();
        $finder->files()->in(__DIR__."/source")->contains('/' . $q . '/i');

        foreach ($finder as $file) {

            $info = pathinfo($file->getRelativePathname());
            $filename = $info['filename'];

            $contents = file_get_contents($file->getRealpath());
            $score = $this->weighQueryText($contents, $q, $filename);

            // Assume first line is the title. 
            $this->titles[$filename] = strtok($contents, "\n");

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

        while (strpos($contents, $q) > 0) {

            $pos = strpos($contents, $q);
            $score += ( ($length - $pos) / $length);

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
