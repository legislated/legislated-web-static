# Hacking

## Table of Contents

- [Setup](#setup-)
- [Development](#development-)
- [Testing](#testing-)
- [Hosting / Deployment](#hosting--deployment-)
- [Architecture](#architecture-)

## Setup [↑](#table-of-contents)

Install any necessary global dependencies. Some packages may need to be installed using the package manager(s) appropriate for your system:

- yarn -> [installation](https://yarnpkg.com/en/docs/install)

Then install local dependencies with yarn:

```sh
$ yarn
```

## Development [↑](#table-of-contents)

Make **sure** your Rails server is [started](https://github.com/legislated/legislated-api/blob/master/HACKING.md). Then start the [webpack dev server](https://webpack.js.org/configuration/dev-server/) to serve the javascript app on http://localhost:8080/:

```sh
$ yarn start
```

We use [flow](https://flow.org/en/docs/getting-started/) to statically type-check our javascript. It's recommended that you use an editor that integrates with nicely with flow to get real time errors. Atom (with the Nuclide plugin) is a [good candidate](https://nuclide.io/docs/languages/flow/).

## Testing [↑](#table-of-contents)

Tests are written using [Jest](https://facebook.github.io/jest/docs/api.html), and live in a `__tests__` directory adjacent to the files they test. Please add specs for any new features.

Run all the tests using the yarn script:

```sh
$ yarn test
$ yarn test:watch # re-runs as files change
```

Running individual specs is easiest using Jest's path filter (hit `p`) in watch mode.

## Hosting / Deployment [↑](#table-of-contents)

The application is hosted using Amazon S3 [static website hosting](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html). When a commit is pushed to master, it is automatically deployed to our staging bucket. When a commit is pushed to production, it is automatically deployed to our production bucket.

## Architecture [↑](#table-of-contents)

If you've never worked with some of the technologies on this project, it may be worth reading up on them. Here's a rough breakdown the application architecture and major technologies:

#### [React](https://facebook.github.io/react/docs/hello-world.html)

React is a host unto itself. It's recommended that you read their docs, or pair-program with someone who already knows it, if you want to get up and running.

#### [Relay](https://facebook.github.io/relay/docs/getting-started.html)

Relay is a library that allows React components to declarative specify the data they depend on from a remote GraphQL API. It provides automatic data synchronization and caching.

#### [Flow](https://flow.org/en/docs/getting-started/)

Flow is a relatively unobtrusive static type checker for JavaScript. The reasons for using a type-checker are beyond the scope of this document. If you're familiar with static-typing, the linked intro should be enough to get you going. If you're not, the easiest way to get started is probably to pair program with someone who is.
