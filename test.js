const fs = require('fs')
const { makePyramid, getFastestPath } = require('./index')

describe('read pyramid from string', () => {
  test('should throw for invalid string', () => {
    expect(() => makePyramid('')).toThrow()
    expect(() => makePyramid('abc\ndef')).toThrow()
    expect(() => makePyramid('0\n\n')).toThrow()
    expect(() => makePyramid('1\n1 2')).toThrow()
  })
  test('should create a valid pyramid for a valid string', () => {
    expect(makePyramid('0\n')).toMatchObject([])
    expect(makePyramid('1\n4')).toMatchObject([[4]])
    expect(makePyramid('2\n5\n10 -6')).toMatchObject([[5], [10, -6]])
    expect(makePyramid('1\n3\n')).toMatchObject([[3]])
  })
})

describe('fatest path', () => {
  test('should match expectations from assignment', () => {
    const examples = [
      { filename: 'example1.txt', expectation: 14 },
      { filename: 'exampleA.txt', expectation: 16 },
      { filename: 'exampleB.txt', expectation: 447 }
    ]
    examples.forEach(({ filename, expectation }) => {
      const content = fs.readFileSync(filename, 'utf-8')
      const pyramid = makePyramid(content)
      expect(getFastestPath(pyramid)).toBe(expectation)
    })
  })

  test('should match expectations', () => {
    const examples = [
      { pyramid: [], expectation: 0 },
      { pyramid: [[3]], expectation: 3 },
      { pyramid: [[2], [-2, 3], [0, 0, 2]], expectation: 0 }
    ]

    examples.forEach(({ pyramid, expectation }) => {
      expect(getFastestPath(pyramid)).toBe(expectation)
    })
  })
})
