import { describe, expect, test } from 'bun:test'
import { events, getEventBySlug } from '@/lib/content/events'

describe('events', () => {
  test('events list matches snapshot', () => {
    expect(events).toMatchSnapshot()
  })

  test('all events have required fields', () => {
    const fields = events.map(({ id, slug, title, category, format, location }) => ({
      id,
      slug,
      title,
      category,
      format,
      location,
    }))
    expect(fields).toMatchSnapshot()
  })
})

describe('getEventBySlug', () => {
  test('returns event for valid slug', () => {
    expect(getEventBySlug('thursday-cbd-meetup')).toMatchSnapshot()
  })

  test('returns event for saturday-rapid-arena', () => {
    expect(getEventBySlug('saturday-rapid-arena')).toMatchSnapshot()
  })

  test('returns undefined for unknown slug', () => {
    expect(getEventBySlug('nonexistent')).toBeUndefined()
  })
})
