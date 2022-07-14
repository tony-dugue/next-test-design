import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/gsap-animation-basic"><p className={styles.link}>GSAP Animation (basic)</p></Link>
        <Link href="/smooth-scrolling"><p  className={styles.link}>Smooth scrolling (with Smooth-scrollbar library)</p></Link>
        <Link href="/cuberto-home-cursor"><p  className={styles.link}>Cuberto home cursor</p></Link>
        <Link href="/basic-home-cursor-framer-motion"><p  className={styles.link}>Basic home cursor (with framer motion)</p></Link>
      </main>

    </div>
  )
}
