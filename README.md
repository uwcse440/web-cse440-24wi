# web-cse440-24wi

Course website for Winter 2024 offering of CSE 440.

## Installation of System Dependencies

Requires Node.js and the Yarn package manager.

- [Node.js](https://nodejs.org/)

  Installers: <https://nodejs.org/en/download/>

  Development requires version 20.x.  
  This requirement can be relaxed by removing `engines` from `package.json`.

- [Yarn](https://yarnpkg.com/)

  ```shell
  npm install --global yarn
  ```

## Installation of Javascript Dependencies

```shell
yarn install
```

Install dependencies from `yarn.lock`.

## Yarn Commands

```shell
yarn run
```

List available commands.

```shell
yarn dev
```

Serve a debug build on `http://localhost:3000`, with hot reloading.

```shell
yarn export
```

Build a production bundle and create static deployment files in `dist`.

```shell
yarn format
```

Apply code formatting.
