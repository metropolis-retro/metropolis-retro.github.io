import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

describe('Card', () => {
  test('renders Card with all sub-components', () => {
    const html = renderToStaticMarkup(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description text</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Body content</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>,
    )
    expect(html).toMatchSnapshot()
  })

  test('renders Card alone', () => {
    const html = renderToStaticMarkup(<Card>Simple card</Card>)
    expect(html).toMatchSnapshot()
  })

  test('renders CardHeader alone', () => {
    const html = renderToStaticMarkup(
      <CardHeader>
        <CardTitle>My Title</CardTitle>
      </CardHeader>,
    )
    expect(html).toMatchSnapshot()
  })

  test('renders CardContent alone', () => {
    const html = renderToStaticMarkup(<CardContent>Content</CardContent>)
    expect(html).toMatchSnapshot()
  })

  test('renders CardFooter alone', () => {
    const html = renderToStaticMarkup(<CardFooter>Footer</CardFooter>)
    expect(html).toMatchSnapshot()
  })

  test('accepts custom className on Card', () => {
    const html = renderToStaticMarkup(<Card className="w-full max-w-sm">Card</Card>)
    expect(html).toMatchSnapshot()
  })
})
