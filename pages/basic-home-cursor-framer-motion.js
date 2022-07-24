import {useEffect, useState} from "react";
import { motion } from 'framer-motion'
import styles from '../styles/basic-home-cursor-framer-motion.module.scss'
import Link from "next/link";

const BasicHomeCursorFramerMotion = () => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  const handleMouseMove = e => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
      backgroundColor: "rgb(3,150, 166)",
      mixBlendMode: "difference"
    },
    description: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgb(3,73, 85)",
      mixBlendMode: "difference"
    }
  }

  const textEnter = () => setCursorVariant("text")
  const textLeave = () => setCursorVariant("default")

  const descriptionEnter = () => setCursorVariant("description")
  const descriptionLeave = () => setCursorVariant("default")

  return (
    <main className="main">

      <Link href="/">
        <div className={styles.back}>
          <img src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
          Accueil
        </div>
      </Link>

      <div className={styles.container}>
        <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} className={styles.title}>Hello World</h1>

        <p  className={styles.description}>
          Leading <span onMouseEnter={descriptionEnter} onMouseLeave={descriptionLeave}>digital agency</span> with solid design and development
          expertise. We build readymade websites, mobile applications, and
          elaborate online <span onMouseEnter={descriptionEnter} onMouseLeave={descriptionLeave}>business services</span>.
        </p>

        <motion.div className={styles.cursor} variants={variants} animate={cursorVariant} />
      </div>
    </main>
  )
}

export default BasicHomeCursorFramerMotion
