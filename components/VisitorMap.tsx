import * as React from 'react'

import * as config from '@/lib/config'

import styles from './VisitorMap.module.css'

const MAP_SCRIPT_URL = 'https://mapmyvisitors.com/map.js'
const MAP_IMAGE_URL = 'https://mapmyvisitors.com/map.png'
const DEFAULT_STATS_URL = 'https://mapmyvisitors.com'

export function VisitorMap() {
  const widgetId = config.mapMyVisitorsId?.trim()
  const statsUrl = config.mapMyVisitorsStatsUrl ?? DEFAULT_STATS_URL
  const scriptSrc = React.useMemo(
    () =>
      widgetId
        ? `${MAP_SCRIPT_URL}?d=${encodeURIComponent(widgetId)}&cl=ffffff&w=a`
        : null,
    [widgetId]
  )
  const fallbackImgSrc = React.useMemo(
    () =>
      widgetId
        ? `${MAP_IMAGE_URL}?d=${encodeURIComponent(widgetId)}&cl=ffffff`
        : null,
    [widgetId]
  )
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!scriptSrc || !containerRef.current) {
      return
    }

    const container = containerRef.current
    container.innerHTML = ''

    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    script.id = 'mapmyvisitors'
    container.append(script)

    return () => {
      container.innerHTML = ''
    }
  }, [scriptSrc])

  if (!widgetId) {
    return null
  }

  return (
    <section className={styles.visitorMap} aria-label='Visitor map'>
      <h2 className={styles.heading}>Visitor Map</h2>
      <div className={styles.mapShell} ref={containerRef}>
        <noscript>
          <a
            className={styles.mapLink}
            href={statsUrl}
            rel='noopener noreferrer'
            target='_blank'
          >
            {fallbackImgSrc ? (
              <img
                src={fallbackImgSrc}
                alt='Visitor map showing recent site traffic'
              />
            ) : (
              'View the visitor map on MapMyVisitors.com'
            )}
          </a>
        </noscript>
      </div>
    </section>
  )
}
