import devtools, { DevtoolsDetector } from 'browser-devtools-detector'

it('devtools should be an instance of DevtoolsDetector', () => {
  expect(devtools).toBeInstanceOf(DevtoolsDetector)
})
