# browser-devtools-detector

Detect if browser devtools is opened.

## Install

install via npm:

```sh
# via npm
$ npm i --save browser-devtools-detector
# or yarn
$ yarn add browser-devtools-detector
# or pnpm
$ pnpm add browser-devtools-detector
```

## Usage

- basic example:

```js
import devtools from 'browser-devtools-detector'

devtools.on('change', (isOpen, detail) => {
  console.log('devtools is opened?', isOpen)
})

devtools.launch()
```

- or you can create your own instance:

```js
import { DevtoolsDetector } from 'browser-devtools-detector'

const devtools = new DevtoolsDetector({
  threshold: 100, // default
})

// same as basic usage
```

- set detect delay (*default to 500ms*):

```js
devtools.setDetectDelay(300)
```

## License

[MIT](LICENSE)
