import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import{ gsap } from 'gsap'
import styles from '../styles/gsap-animation-basic.module.scss'
import Link from 'next/link'

export default function Home() {

  const [toggle, setToggle] = useState(false)

  const changeState = () => {
    setToggle(!toggle)
  }

  const cardRef = useRef(null)

  useEffect(() => {
    toggle
      ? gsap.to(cardRef.current, { scale: 1.5, rotate: 360, duration: 1.2 })
      : gsap.to(cardRef.current, { scale: 1, rotate: 0, duration: 1.2 })
  }, [toggle])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="next app test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className={styles.card} onClick={changeState} ref={cardRef}>
          AMSTERDAM
        </div>

        <Link href="/">
          <div className={styles.back}>
            <img src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
            Accueil
          </div>
        </Link>
      </main>

    </div>
  )
}
