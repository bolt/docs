---
title: Overview of Bolt Storage
level: advanced
---
The Bolt Storage Interface
==========================

The internals of the Bolt storage system have been significantly refactored for
the 3.x series of releases. This section gives an overview of the
responsibilities of each component. Note that this section will only be of
interest to you if you need to interact with the storage internals, either when
writing application code or perhaps in developing an extension.

If you are just interested in fetching content records then you can continue to
refer to the <a href="../../templating/content-fetching">content fetching pages</a>.

Hierarchy of Storage in Bolt
----------------------------

There is a single point of entry for all storage interactions within Bolt and
this is usually accessible with a call to `$app['storage']`. If you implement
your own controllers, which is normally recommended when you want control over
content fetching, then any queries that you would like to make can be accessed
through this object.

The basic hierarchy of the storage layer is described below, and clicking
through gives a much more indepth description of the functionality of each
layer.

<a class="button large expand docsintro layer" href="./entity-manager">
Entity Manager
</a>

<a class="button large expand docsintro layer" href="./repositories">
Repositories
</a>

<a class="button large expand docsintro layer" href="./entities">
Entity
</a>

<a class="button large expand docsintro layer" href="./entity-metadata">
Metadata
</a>

<a class="button large expand docsintro layer" href="./entity-transforms">
Hydration & Persistence
</a>

Whilst there are individual responsibilities for each of these layers, in
practice you can perform most normal search, insert, update and delete
operations by interacting only with the `EntityManager` which within Bolt is
accessed with a call to `$app['storage']`.
