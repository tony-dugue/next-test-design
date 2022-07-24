import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export default function Home() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>

        <main className={styles.main}>
          <Link href="/gsap-animation-basic"><p className={styles.link}>GSAP Animation (basic)</p></Link>
          <Link href="/smooth-scrolling"><p  className={styles.link}>Smooth scrolling (with Smooth-scrollbar library)</p></Link>
          <Link href="/cuberto-home-cursor"><p  className={styles.link}>Cuberto home cursor (with GSAP)</p></Link>
          <Link href="/basic-home-cursor-framer-motion"><p  className={styles.link}>Basic home cursor (with framer motion)</p></Link>
          <Link href="/gsap-threejs-duck-vs-dog"><p  className={styles.link}>Duck vs Dog (with gsap & threejs)</p></Link>
          <Link href="/gsap-threejs-airplane"><p  className={styles.link}>Airplane (with gsap & threejs)</p></Link>
        </main>

      </div>
    </>
  )
}
