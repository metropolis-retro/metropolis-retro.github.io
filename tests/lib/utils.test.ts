import { describe, expect, test } from 'bun:test'
import { cn } from '@/lib/utils'

describe('cn', () => {
  test('merges class names', () => {
    expect(cn('foo', 'bar')).toMatchSnapshot()
  })

  test('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toMatchSnapshot()
  })

  test('deduplicates tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toMatchSnapshot()
  })

  test('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toMatchSnapshot()
  })

  test('returns empty string for no inputs', () => {
    expect(cn()).toMatchSnapshot()
  })
})
