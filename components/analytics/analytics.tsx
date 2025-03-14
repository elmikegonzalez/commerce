'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Your analytics tracking code here
        const url = pathname + searchParams.toString()

        // Example for a custom tracking function
        trackPageView(url)
    }, [pathname, searchParams])

    return null
}

function trackPageView(url: string) {
    // Connect to your analytics service here
    console.log(`Page view: ${url}`)
}