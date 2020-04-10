---
title: Amazon S3
level: advanced
---
Amazon S3
=========

__Notice:__
__Things described on this page can be implemented easier using [Amazon Bolt Extension](https://market.bolt.cm/view/jarjak/amazon)__

Configuring Bolt to use Amazon Simple Storage Service (Amazon S3) requires the
addition of Flysystem and caching libraries, as well as custom service provider
code to your project.

1. Set-up, configure, and confirm operational your Amazon S3 bucket
1. Update `composer.json` in your project root
1. Creating service providers
1. Bootstrap your providers

Prerequisites
-------------

<p class="warning"><strong>Warning:</strong> This documentation, and examples,
assume you have a fully configured and working Amazon S3 bucket.
</p>



### Required Libraries
----------------------

You need to add the following libraries to your project:

  * `league/flysystem-aws-s3-v3:^1.0`
  * `league/flysystem-cached-adapter:^1.0`

This can simply be achieved by running:

```bash
$ composer require league/flysystem-aws-s3-v3:^1.0 league/flysystem-cached-adapter:^1.0
```


### Caching Libraries
----------------------

While other cache targets are optional, right now this example will be based on
Redis. Alternatively any PSR-6 can be used, as well as Doctrine Cache.

To use Redis, you will need a configured and running Redis instance, and need
to install `predis/predis:^1.1`, which can be achieved by running:


```bash
$ composer require predis/predis:^1.1
```

The cache needs to be shared between servers caching for the same site, else
cache results will be inconsistent, unreliable, and self-defeating of the aim
of caching.

We recommend using [Amazon ElastiCache][elasticache] for a shared Redis
instance, and using the Predis library to connect to it.


Autoloading
------------

Autoloading of your service providers can be set-up in the same way as
[Extension Bundles][bundles], by adding your base namespace and source
directory to the `psr-4` section of your project root `composer.json` file,
e.g.

```json
    "autoload": {
        "psr-4": {
            "MySiteApp\\": "src"
        }
    }
```


<p class="note"><strong>Note:</strong> If you change anything in the
<code>psr-4</code> section of your <code>composer.json</code> file, remember to
re-run <code>composer dump-autoload</code> to update the cached autoloading
files.
</p>


Service Providers
-----------------

### Amazon AWS

The provider for Amazon AWS services needs to define `app['aws.s3']`, that
returns an `\Aws\S3\S3Client` used to interact with Amazon Simple Storage
Service (Amazon S3).

For detailed information on constructing these classes, and the options
provided see the [Amazon S3 documentation][s3-docs], and specifically the
[S3 SDK documentation][s3-sdk] and [S3 ApiGen documentation][s3-api].


#### Amazon Credentials

This credential provider first checks in order:
  * Amazon `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables
  * "default" profile in ~/.aws/credentials, or the profile specified by the
    `AWS_PROFILE` environment variable
  * "profile default" profile in ~/.aws/config (which is the default profile of
    AWS CLI)
  * Fetch credentials from the ECS environment variables
  * Fetches credentials for the EC2 instance's IAM Role
    * If you are using EC2 instances then this is the recommended way to
      provide credentials

For information on the `Aws\Credentials` classes, see Amazon's ApiGen
documentation for [AWS Credentials][s3-api-creds].

If using an IAM policy, you'll need to attach the follwoing to the IAM user
role:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:HeadBucket",
                "s3:GetBucketAcl"
                "s3:HeadObject",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:GetObjectVersion",
                "s3:GetObjectVersionAcl",
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:PutObjectVersionAcl",
                "s3:DeleteObject",
                "s3:DeleteObjectVersion"
            ],
            "Resource": "arn:aws:s3:::bucket-name/*"
        }
    ]
}
```


### Filesystem

#### Filesystem Cache Factory

Create a protected callable `$app['filesystem.cache_factory']` that when
invoked returns an instance of `\Bolt\Filesystem\Adapter\Cached`.


#### S3 Filesystem Service

Create a protected callable `$app['filesystem.s3']` that when invoked will
return an a class implementing `Bolt\Filesystem\FilesystemInterface`.

If using `\Bolt\Filesystem\Filesystem` as your `FilesystemInterface` object,
you first need to construct an `\Bolt\Filesystem\Adapter\S3` adapter class.

Your adapter can then be passed to the `$app['filesystem.cache_factory']`
callable, and the return value used as the adpater parameter to construct
`Filesystem`.


#### Extend Filesystem

Next, you must extend `$app['filesystem']`, and call `mountFilesystems()` using
an associative array of the filesystem(s) you want to override using the S3
filesystem callable you define.


### Assets

In order for functionality, like Twig's `{{ asset() }}` function to know about
the variation in location of assets that is return to the requesting client,
you need to next override the desired package in the package group with a
`Symfony\Component\Asset\UrlPackage` object that defines your base Amazon S3
bucket URL.

This is achived by extending `$app['asset.packages']`, and adding your specific
`UrlPackage` object to he desired package pool name.


### Example Provider

This is an example of the `src/Provider/AwsServiceProvider.php` file.

```php
<?php

namespace MySiteApp\Provider;

use Aws\Credentials\CredentialProvider;
use Aws\Credentials\Credentials;
use Aws\S3\S3Client;
use Bolt\Filesystem\Adapter;
use Bolt\Filesystem\Adapter\Cached;
use Bolt\Filesystem\Cached\DoctrineCache;
use Bolt\Filesystem\Filesystem;
use Doctrine\Common\Cache\PredisCache;
use Predis;
use Silex\Application;
use Silex\ServiceProviderInterface;
use Symfony\Component\Asset\UrlPackage;

class AwsServiceProvider implements ServiceProviderInterface
{
    /**
     * {@inheritdoc}
     */
    public function register(Application $app)
    {
        /*
         * Amazon S3 provider.
         */
        $app['aws.s3'] = $app->share(function ($app) {
            return new S3Client([
                // The bucket's region name, e.g. 'eu-central-1'
                'region' => 'my-bucket-location',
                'version' => '2006-03-01',
            ]);
        });

        /*
         * Filesystem.
         */
        $app['filesystem'] = $app->share($app->extend(
            'filesystem',
            function ($filesystem, $app) {
                $bucketName = 'your S3 bucket name';
                $prefix = '';

                $filesystems = [
                    'files' => $app['filesystem.s3']('files', $bucketName, $prefix)
                ];
                $filesystem->mountFilesystems($filesystems);

                return $filesystem;
            }
        ));
        // The S3 filesystem protected callable.
        $app['filesystem.s3'] = $app->protect(
            function ($name, $bucket, $prefix = '') use ($app) {
                $adapter = new Adapter\S3($app['aws.s3'], $bucket, $prefix);
                $adapter = $app['filesystem.cache_factory']($adapter, 'flysystem-' . $name, 3600);

                return new Filesystem($adapter);
            })
        ;
        // Cache factory
        $app['filesystem.cache_factory'] = $app->protect(
            function ($adapter, $name, $expire = null) {
                // Note: Predis is use here as an example
                $cache = new DoctrineCache(new PredisCache(new Predis\Client()), $name, $expire);

                return new Cached($adapter, $cache);
            }
        );

        /*
         * Assets.
         */
        $app['asset.packages'] = $app->share($app->extend(
            'asset.packages',
            function ($packages, $app) {
                $package = new UrlPackage(
                    // CloudFront CDN url can also be used here
                    'http://example.s3-website.eu-central-1.amazonaws.com',
                    $app['asset.version_strategy']('files'),
                    $app['asset.context']
                );
                $packages->addPackage('files', $package);

                return $packages;
            }
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function boot(Application $app)
    {
    }
}
```


A note on the parameters passed to `UrlPackage`:
  - First parameter for `UrlPackage` is the base URL or your Amazon S3 bucket
  - Second parameter is the version strategy applicable to the package
  - Third parameter is the **must** be the name of the package you're
    replacing, and **must** be the mount point of the filesystem you are
    changing. This also applies to the first parameter used in `addPackage()`
    as well.

In this example, 'files' is package name, that is package that is responsible
for the contents of your project's `files/` mount point.

Optionally, you may with to construct your own `\Aws\Credentials\Credentials`
object, and pass that to `CredentialProvider::fromCredentials()`, e.g.

```php
    $app['aws.s3'] = $app->share(function ($app) {
        $accessKey = 'your access key from Amazon';
        $secretKey = 'your secret key from Amazon';
        $credentials = CredentialProvider::fromCredentials(new Credentials($accessKey, $secretKey));
        return new S3Client([
            // The bucket's region name, e.g. 'eu-central-1'
            'region' => 'my-bucket-location',
            'version' => '2006-03-01',
            'credentials' => $credentials,
        ]);
    });
```


Bootstrap Configuration
-----------------------

Finally, to load your services, add them to your `services:` key in the site's
`.bolt.yml` or `.bolt.php` files.

Example using `.bolt.yml`:

```yaml
services:
  - MySiteApp\Provider\FilesystemServiceProvider
  - MySiteApp\Provider\AwsServiceProvider
  - MySiteApp\Provider\AssetServiceProvider
```

Example using `.bolt.php` instead:

```php
return [
    'services' => [
        new MySiteApp\Provider\FilesystemServiceProvider(),
        new MySiteApp\Provider\AwsServiceProvider(),
        new MySiteApp\Provider\AssetServiceProvider(),
    ]
];
```


[bundles]: ../../extensions/bundled/autoloading
[s3-docs]: https://aws.amazon.com/documentation/s3/
[s3-sdk]: https://aws.amazon.com/documentation/sdk-for-php/
[s3-api]: http://docs.aws.amazon.com/aws-sdk-php/v3/api/namespace-Aws.html
[s3-api-creds]: http://docs.aws.amazon.com/aws-sdk-php/v3/api/namespace-Aws.Credentials.html
[elasticache]: https://aws.amazon.com/elasticache/
