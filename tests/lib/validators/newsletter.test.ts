import { describe, expect, test } from 'bun:test'
import { newsletterSchema } from '@/lib/validators/newsletter'

describe('newsletterSchema', () => {
  test('parses valid email', () => {
    const result = newsletterSchema.parse({ email: 'subscriber@example.com' })
    expect(result).toMatchSnapshot()
  })

  test('trims whitespace from email', () => {
    const result = newsletterSchema.parse({ email: '  trimmed@example.com  ' })
    expect(result).toMatchSnapshot()
  })

  test('rejects invalid email', () => {
    const result = newsletterSchema.safeParse({ email: 'not-valid' })
    expect(result.success).toBe(false)
    expect(result.error?.issues.map((i) => i.path)).toMatchSnapshot()
  })

  test('rejects empty email', () => {
    const result = newsletterSchema.safeParse({ email: '' })
    expect(result.success).toBe(false)
    expect(result.error?.issues.map((i) => i.path)).toMatchSnapshot()
  })
})
