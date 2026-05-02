import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { Skeleton } from '@/components/ui/skeleton'

describe('Skeleton', () => {
  test('renders with default props', () => {
    const html = renderToStaticMarkup(<Skeleton />)
    expect(html).toMatchSnapshot()
  })

  test('renders with height and width classes', () => {
    const html = renderToStaticMarkup(<Skeleton className="h-4 w-[250px]" />)
    expect(html).toMatchSnapshot()
  })

  test('renders as a circular avatar placeholder', () => {
    const html = renderToStaticMarkup(<Skeleton className="size-12 rounded-full" />)
    expect(html).toMatchSnapshot()
  })

  test('renders multiple skeletons as a group', () => {
    const html = renderToStaticMarkup(
      <div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>,
    )
    expect(html).toMatchSnapshot()
  })
})
