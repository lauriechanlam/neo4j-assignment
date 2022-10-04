const { makePyramid } = require('./index')

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
