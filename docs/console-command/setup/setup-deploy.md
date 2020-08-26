---
title: setup:deploy
level: intermediate
---
setup:deploy
============

<p class="note"><strong>Note:</strong> The command is provided by a separate
package called <code>bolt/simple-deploy</code> that is installed by default
with archive distributions. If you've installed Bolt using a different method,
it needs to manually be included with Composer project installs using
<code>composer require bolt/simple-deploy:^1.0</code>.</p>

Nut's `setup:deploy` is a simple tool to deploy a build of the current site
from a local workstation to a (S)FTP enabled destination host.

To use this tool on your development machine **only** you can create a file
named `.deploy.yaml`.

Each key in the `.deploy.yaml` represents a deployment target that can be
uploaded to the remote destination via either FTP or SFTP (secure FTP).

Every deployment configuration you add to `.deploy.yaml` must set the `protocol`
to either `ftp` or `sftp`, and an `options` array. It is strongly recommended to
use SFTP, if your host supports it.

## Usage

```bash
    php bin/console setup:deploy [options] <target>
```

<p class="note"><strong>Note:</strong> This command will not appear in the list
of available commands if the <code>.deploy.yaml</code> file is not present.</p>



## Arguments

| Argument | Description |
|----------|-------------|
| target   | Name of the deployment setting to use from .deploy.yaml


## Options

| Option  | Description |
|---------|-------------|
| --check | Only check the connection settings for a given deployment
| --edit  | Interactively create or edit a deployment configuration
| --force | Update files & permissions even if unchanged


### Example: Checking a connection

```
    php bin/console setup:deploy --check production
```

Using this command will allow you to verify the connection and destination
connections are configured correctly, before running the actual deployment. This
will help prevent the accidental removal of files on the destination environment.

### Example: Running a deployment

```
    php bin/console setup:deploy production
```

This will run the actual deployment: Uploading and/or updating the files on the
destination environment.

View this short screencast, to see it in action:

<script type="text/javascript" src="https://asciinema.org/a/146516.js" id="asciicast-146516" async></script>


## Configuration File

Configuration is done in the `.deploy.yaml` file in the site's root directory on
your development environment, with the following format:

```
staging:
    protocol: ftp-or-sftp
    options:
        host: hostname.example.org
        root: root/folder/name
        username: your-username
        …
```

The `protocol` should be set as lowercase `ftp` or `sftp`.

<p class="note"><strong>Note:</strong> If your host provides SFTP, it is the
preferred upload method. It is both faster and more secure than FTP alone, and
supports more functionality.</p>

## SFTP Options

If you've set `sftp` as the protocol, the following options are available.

### Options

| Key             | Description |
| --------------- | ----------- |
| host            | DNS host name to upload to
| root            | The root directory of the remote site. Can be an absolute path, or if missing a trailing `/` it will be assumed to be a subdirectory of the remote user's home directory
| username        | User name to login to the remote host with
| password        | (optional) Password to login to the remote host with
| privateKey      | (optional) Full path to private key file to for key exchange if **not** using password authentication
| useAgent        | (optional) Set to `true` if using a private key, and you don't want to use the system SSH agent
| port            | (optional) Port number to connect to if the target is not listening on the default
| timeout         | (optional) Time in seconds to wait for a connection attempt
| hostFingerprint | (optional) The public key fingerprint of the deployment target

**NOTE:** Either a `password` or `privateKey` **must** be set.

### Example: Password Login

```
production:
    protocol: sftp
    options:
        host: example.com
        username: deploy
        password: 'your password goes here'
        root: /var/www/sites/example.com
```

### Example: Key-Based Login

```
production:
    protocol: sftp
    options:
        host: example.com
        username: deploy
        privateKey: /home/your_home_dir/.ssh/id_rsa
        root: /var/www/sites/example.com
```

## FTP Options

If you've set `ftp` as the protocol, the following options are available.

### Options

| Key          | Description |
| ------------ | ----------- |
| host         | DNS host name to upload to
| root         | The root directory of the remote site. Can be an absolute path, or if missing a trailing `/` it will be assumed to be a subdirectory of the remote user's home directory
| username     | User name to login to the remote host with
| password     | Password to login to the remote host with
| port         | (optional) Port number to connect to if the target is not listening on the default
| ssl          | (optional) Connect to the FTP target host over a secure SSL-FTP connection
| timeout      | (optional) Time in seconds to wait for a connection attempt
| transferMode | (optional) The transfer mode. Must be either ASCII or BINARY
| utf8         | (optional) Set the connection to UTF-8 mode
| passive      | (optional) Force FTP to use "passive" mode
| ignorePassiveAddress | (optional) Ignore the IP address returned when setting up a passive connection. Useful if a server is behind a NAT device. Requires PHP >= 5.6.18

### Example

```
staging:
    protocol: ftp
    options:
        host: example.com
        root: my-site
        username: deploy
        password: 'your password goes here'
```

**NOTE:** In the above example, the root directory is a subdirectory of the
remote user's home directory called `my-site/`, e.g. `/home/deploy/my-site/`.

## Setting Permissions

You can control the permissions of **newly created** files and directories by
adding a `permissions` key under `options`.

By default, Simple Deploy will set files to `0664` and directories to `0775`,
but if you need less restricted permissions (not recommended) you can set
them like:

```
    options:
        permissions:
            file: 0666
            dir: 0777
```

Of course more secure values are also possible and recommended.

## Editing

A very simple editor is also available by adding the `--edit` option to the
command.

```
php bin/console setup:deploy --edit <target>
```

### Example: Editing the configuration for the "production" target

```
php bin/console setup:deploy --edit production
```

This will allow you to interactively review and modify the settings in your
`.deploy.yaml` file.

<a href="/files/nut-deploy.png" class="popup"><img src="/files/nut-deploy.png" width="590"></a>

