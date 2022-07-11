import {useEffect, useState} from "react";
import Head from 'next/head'
import styles from '../styles/smooth-scrolling.module.scss'
import Link from 'next/link'

// Dynamic Component
import dynamic from 'next/dynamic'
const Scroll = dynamic(import ("./components/SmoothScroll"), { ssr: false })

export default function SmoothScrolling() {

  const [images, setImages] = useState();

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?limit=10')
      .then(res => res.json())
      .then(data => setImages(data))
  }, []);

  const random = () => Math.floor(Math.random() * 50)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="smooth scrolling" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} other-class`}>

        <Link href="/">
          <div className={styles.back}>
            <img src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
            Accueil
          </div>
        </Link>

        <h1 className={styles.title}>React Smooth Scroll</h1>

        <Scroll />

        { images && images.map(image => (
          <div className={styles.imageContainer} key={image.id} style={{ marginLeft: `${random()}rem` }}>
            <img className={styles.image} src={image.download_url} alt={image.author} width={200} height={200} />
          </div>
        ))}

      </main>

    </div>
  )
}
