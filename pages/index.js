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
      </main>

    </div>
  )
}
