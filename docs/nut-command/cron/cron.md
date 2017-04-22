---
title: cron
level: intermediate
---
cron
====

Nut's `cron` command is responsible for triggering Bolt's scheduled task
running service, Cron.

For details on setting up Cron, see the [Task Scheduler][task-scheduler]
section of the documentation

## Usage

```bash
    php ./app/nut cron [options]
```


## Options

| Option | Description |
|--------|-------------|
| --run=RUN | Run a particular interim's jobs

The optional interim names you can use with `--run` are:
    - cron.Hourly
    - cron.Daily
    - cron.Weekly
    - cron.Monthly
    - cron.Yearly

## Example

### Run tasks scheduled hourly

```bash
$ php ./app/nut cron --run=cron.Hourly
Running Cron Hourly Jobs

Cron run!
```


[task-scheduler]: ../../internals/task-scheduler






