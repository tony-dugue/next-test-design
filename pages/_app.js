import '../styles/globals.scss'
import {useEffect, useState} from "react";
import { useRouter } from "next/router"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import PageTransitions from './components/transitions/PageTransitions'
import PageTransitionsBasic from './components/transitions/PageTransitionsBasic'
import PageTransitionsKeyframes from './components/transitions/PageTransitionsKeyframes'
import PageTransitionsGsapGrid from './components/transitions/PageTransitionsGsapGrid'

const MyApp = ({ Component, pageProps }) => {

  const [routingPageOffset, setRoutingPageOffset] = useState(0)

  const router = useRouter()

  useEffect( () => {

    const pageChange = () => {
      setRoutingPageOffset(window.scrollY)

      // KILL all ScrollTrigger Instance
      let allTrigger = ScrollTrigger.getAll()
      allTrigger.forEach( trigger => {
        trigger.kill(true)
      })
    }
    router.events.on('routeChangeStart', pageChange)
  }, [router.events])

  return (
    <>

      {/*<PageTransitions route={router.asPath} routingPageOffset={routingPageOffset}>*/}
      {/*  <Component  {...pageProps} />*/}
      {/*</PageTransitions>*/}

      {/*<PageTransitionsGsapGrid route={router.asPath} routingPageOffset={routingPageOffset}>*/}
      {/*  <Component  {...pageProps} />*/}
      {/*</PageTransitionsGsapGrid>*/}

      {/*<PageTransitionsBasic route={router.asPath} routingPageOffset={routingPageOffset}>*/}
      {/*  <Component  {...pageProps} />*/}
      {/*</PageTransitionsBasic>*/}

      <PageTransitionsKeyframes route={router.asPath} routingPageOffset={routingPageOffset}>
        <Component  {...pageProps} />
      </PageTransitionsKeyframes>
    </>
  )
}

export default MyApp
