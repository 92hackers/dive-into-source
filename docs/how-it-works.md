# How dive-into-source works?

Here, we will talk about the internals of dive-into-source.

The project is constructed as a monorepo project,  which contains:

1. dive-into-source: A Node.js app. the daemon server, the engine, used to analyze all data of target repo source code,
  and put analyzed data into SQLite database. It will provide RESTful apis for renderers.
2. dive-into-source-visual: A React webstie app. Default renderer for div-into-source, used to visualize all data generated
  by div-into-source engine.


## Architecture

The big map of dive-into-source architecture is similar to [docker](https://www.docker.com/), which is a Client/Server arch.


## Abstract Objects

### Language
