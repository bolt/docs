Bolt docs (version 2.x)
================================

These are the docs for [Bolt](http://bolt.cm/). This repository is the
documentation counterpart of the [Bolt repository](https://github.com/bolt/bolt).

Installation
------------

Create a new folder, and clone from github. Then use composer to get the rest of
the components:

	git clone git://github.com/bolt/docs.git bolt-docs
	cd bolt-docs
	curl -s http://getcomposer.org/installer | php
	php composer.phar install

The documentation uses the [markdown](http://daringfireball.net/projects/markdown/) format.
There is no need to build anything to generate HTML. We parse the markdown with PHP.
Just serve it directly e.g. with the builtin PHP web server: 

	php -S localhost:8888

