import '../styles/globals.scss'
import {useEffect, useState} from "react";
import PageTransitions from './components/transitions/PageTransitions'
import { useRouter } from "next/router"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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
    <PageTransitions route={router.asPath} routingPageOffset={routingPageOffset}>
        <Component {...pageProps} />
    </PageTransitions>
  )
}

export default MyApp
