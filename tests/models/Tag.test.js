import Tag from '../../src/models/Tag'

test('creates Tag with correct name', () => {
  const tag = new Tag('dog')
  expect(tag.name).toBe('dog')
})
