# Hacking

## Setup

Install any necessary global dependencies. Some packages may need to be installed using the package manager(s) appropriate for your system:

- yarn -> [installation](https://yarnpkg.com/en/docs/install)

Then install local dependencies with yarn:

```sh
$ yarn
```

## Development

Make sure your Rails server is [started](https://github.com/engage-il/engage-api/blob/master/HACKING.md).

```sh
$ yarn start
```

You should then be able to find the application at http://localhost:8080/.

## Testing

Tests are written using [Jest](https://facebook.github.io/jest/docs/api.html), and live in a `__tests__` directory adjacent to the files they test. Please add specs for any new features.

Run all the tests using the yarn script:

```sh
$ yarn test
$ yarn test:watch # re-runs as files change
```

Running individual specs is easiest using Jest's path filter (hit `p`) in watch mode.

## Hosting / Deployment

TODO

## Architecture

If you've never worked with some of the technologies on this project, it may be worth reading up on them. Here's a rough breakdown the application architecture and major technologies:

#### [React](https://facebook.github.io/react/docs/hello-world.html)

TODO

#### [Relay](wiki/relay.md)

TODO
