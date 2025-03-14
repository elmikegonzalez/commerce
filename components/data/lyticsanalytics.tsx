'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Extend window type to include jstag
declare global {
    interface Window {
        jstag?: {
            init: (config: any) => any;
            pageView: () => void;
            send: (...args: any[]) => void;
            mock: (...args: any[]) => void;
            identify: (...args: any[]) => void;
            unblock: (...args: any[]) => void;
            getid: (...args: any[]) => void;
            setid: (...args: any[]) => void;
            loadEntity: (...args: any[]) => void;
            getEntity: (...args: any[]) => void;
            on: (...args: any[]) => void;
            once: (...args: any[]) => void;
            call: (...args: any[]) => void;
            loadScript: (src: string, onLoad?: () => void, onError?: () => void) => any;
            config?: any;
        };
    }
}

export default function LyticsAnalytics() {
    useEffect(() => {
        // This ensures we only track page views on route changes after initial load
        if (window.jstag) {
            window.jstag.pageView();
        }
    }, []);

    return (
        <Script
            id="lytics-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
                !function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();

                // Initialize Lytics tracking tag
                jstag.init({
                src: 'https://c.lytics.io/api/tag/9e6f65b2f8466e575ef5eda79f90c496/latest.min.js',
                pageAnalysis: {
                    dataLayerPull: {
                        disabled: true
                        }
                    }
                });
        
            // Initial page view tracking
            jstag.pageView();
            `
            }}
    />
);
}