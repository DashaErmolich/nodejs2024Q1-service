# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/DashaErmolich/nodejs2024Q1-service.git
```

## Go to the app folder

```
cd nodejs2024Q1-service
```

## Switch to feat-part-2

```
git checkout feat-part-2
```

## Installing NPM modules

```
npm ci --legacy-peer-deps
```

## Build app

```
npm run build
```

## Run docker container

```
npm run docker:up
```

## Scan docker image in separate terminal

```
npm run docker:scan
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing in separate terminal or via Docker Desktop

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### App image on Docker Hub

[dashaermolich/nodejs2024q1-service-app:latest](https://hub.docker.com/layers/dashaermolich/nodejs2024q1-service-app/latest/images/sha256:b38e5630d97b523447639e741c059ed2d762a86901c7b98a46f9e845c5315780?uuid=564c2a2a-84f0-46b4-a457-9c31748a393a%0A)
