import { describe, expect, test } from 'bun:test'
import { getUpdateBySlug, updates } from '@/lib/content/updates'

describe('updates', () => {
  test('updates list matches snapshot', () => {
    expect(updates).toMatchSnapshot()
  })

  test('all updates have required fields', () => {
    const fields = updates.map(({ id, slug, title, date, readTime }) => ({
      id,
      slug,
      title,
      date,
      readTime,
    }))
    expect(fields).toMatchSnapshot()
  })
})

describe('getUpdateBySlug', () => {
  test('returns update for valid slug', () => {
    expect(getUpdateBySlug('first-club-meetup-prep-guide')).toMatchSnapshot()
  })

  test('returns update for rapid-vs-classical-guide', () => {
    expect(getUpdateBySlug('rapid-vs-classical-guide')).toMatchSnapshot()
  })

  test('returns undefined for unknown slug', () => {
    expect(getUpdateBySlug('nonexistent')).toBeUndefined()
  })
})
