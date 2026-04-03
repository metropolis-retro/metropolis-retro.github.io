import { describe, expect, test } from 'bun:test'
import { contactFormSchema } from '@/lib/validators/contact'

describe('contactFormSchema', () => {
  test('parses valid data', () => {
    const result = contactFormSchema.parse({
      name: 'Alice Smith',
      email: 'alice@example.com',
      message: 'Hello, I would like to join the chess club!',
    })
    expect(result).toMatchSnapshot()
  })

  test('trims whitespace from inputs', () => {
    const result = contactFormSchema.parse({
      name: '  Bob  ',
      email: '  bob@example.com  ',
      message: '  Looking forward to the next event.  ',
    })
    expect(result).toMatchSnapshot()
  })

  test('rejects name that is too short', () => {
    const result = contactFormSchema.safeParse({
      name: 'A',
      email: 'alice@example.com',
      message: 'Valid message here.',
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues.map((i) => i.path)).toMatchSnapshot()
  })

  test('rejects invalid email', () => {
    const result = contactFormSchema.safeParse({
      name: 'Alice Smith',
      email: 'not-an-email',
      message: 'Valid message here.',
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues.map((i) => i.path)).toMatchSnapshot()
  })

  test('rejects message that is too short', () => {
    const result = contactFormSchema.safeParse({
      name: 'Alice Smith',
      email: 'alice@example.com',
      message: 'Short',
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues.map((i) => i.path)).toMatchSnapshot()
  })
})
