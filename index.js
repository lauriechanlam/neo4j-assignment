const fs = require('fs')

const makePyramid = (str) => {
  const layers = str.split('\n')
  if (layers.length === 0) {
    throw new Error('pyramid should be initialized with at least 1 line, got 0')
  }
  if (layers[layers.length - 1] === '') {
    layers.pop()
  }
  const layerCount = parseInt(layers[0])
  const pyramid = layers.slice(1).map((layer) => layer.split(' ').map((friction) => parseInt(friction)))
  if (layers.length - 1 !== layerCount) {
    throw new Error(`actual pyramid layer count (${layers.length - 1}) should be match declared layer count (${layerCount})`)
  }

  if (!isValidPyramid(pyramid)) {
    throw new Error('pyramid should be initialized with a valid pyramid')
  }
  return pyramid
}

const isValidPyramid = (pyramid) => {
  try {
    return pyramid.every((layer, index) => layer.length === index + 1)
  } catch {
    return false
  }
}

module.exports = { makePyramid }

if (process.env.NODE_ENV !== 'test') {
  const filename = process.env.FILENAME
  if (!filename) {
    throw new Error('please set the environment variable FILENAME in order to run this script')
  }
  const content = fs.readFileSync(filename, 'utf-8')
  makePyramid(content)
}
