## Tests

> `Compatibility matrix` tested with [Render API Wrapper](https://github.com/app-generator/deploy-automation-render).

| NodeJS    | NPM | YARN |
| --------- | --- | ---- |
| `v14.0.0` | ✅  | ✅   |
| `v16.0.0` | ✅  | ✅   |
| `v18.0.0` | ✅  | ✅   |

<br />

<br >

## How to use it

To use the product Node JS (>= 12.x) is required and GIT to clone/download the project from the public repository.

**Step 1** - Clone the project

```bash
$ git clone https://github.com/app-generator/react-horizon-ui-chakra.git
$ cd react-horizon-ui-chakra
```

<br >

**Step 2** - Install dependencies via NPM or yarn

```bash
$ npm i
// OR
$ yarn
```

<br />

**Step 3** - Start in development mode

```bash
$ npm run start
// OR
$ yarn start
```

<br />

## Configure the backend server

The product comes with a usable JWT Authentication flow that provides only the basic requests: login/logout/register.

**API Server URL** - `src/config/constant.js`

```javascript
const config = {
    ...
    API_SERVER: 'http://localhost:5000/api/'  // <-- The magic line
};
```

<br />
