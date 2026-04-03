import { describe, expect, test } from 'bun:test'
import { BASE_KEYWORDS, BLOG_TITLE_BASE, CLUB_NAME, SITE_URL, TITLE_BASE, pageKeywords } from '@/lib/seo'

describe('seo constants', () => {
  test('SITE_URL', () => {
    expect(SITE_URL).toMatchSnapshot()
  })

  test('CLUB_NAME', () => {
    expect(CLUB_NAME).toMatchSnapshot()
  })

  test('TITLE_BASE', () => {
    expect(TITLE_BASE).toMatchSnapshot()
  })

  test('BLOG_TITLE_BASE', () => {
    expect(BLOG_TITLE_BASE).toMatchSnapshot()
  })

  test('BASE_KEYWORDS', () => {
    expect(BASE_KEYWORDS).toMatchSnapshot()
  })
})

describe('pageKeywords', () => {
  test('returns base keywords when no extras provided', () => {
    expect(pageKeywords()).toMatchSnapshot()
  })

  test('appends extra keywords', () => {
    expect(pageKeywords(['tactics', 'endgame'])).toMatchSnapshot()
  })

  test('deduplicates keywords already in base list', () => {
    expect(pageKeywords(['chess club', 'unique keyword'])).toMatchSnapshot()
  })
})
