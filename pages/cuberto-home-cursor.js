import {useEffect, useRef, useState} from "react";
import gsap from 'gsap'
import styles from '../styles/cuberto-home-cursor.module.scss'
import Link from "next/link";
import {lerp, getSiblings} from "./utils/utils";

const CubertoHomeCursor = () => {

  const cursorRef = useRef(null)
  const linksRef = useRef(null)

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const [cursorConfigs, setCursorConfigs] = useState({
    x: { previous: 0, current: 0, amt: 0.2 },
    y: { previous: 0, current: 0, amt: 0.2 }
  })

  // Define mouse move function
  const handleMouseMove = e => {
    setMouse({ x: e.clientX, y: e.clientY })

    setCursorConfigs({
      x: { previous: mouse.x, current: e.clientX, amt: 0.8 },
      y: { previous: mouse.y, current: e.clientY, amt: 0.8 }
    })

    // Set cursor opacity to 1 when hovered on screen
    gsap.to(cursorRef.current, {
      duration: 1,
      ease: "Power3.easeOut",
      opacity: 1
    })

    for (const key in cursorConfigs) {
      cursorConfigs[key].previous = lerp(
        cursorConfigs[key].previous,
        cursorConfigs[key].current,
        cursorConfigs[key].amt
      )
    }

    // Setting the cursor x and y to our html element
    cursorRef.current.style.transform = `translateX(${cursorConfigs.x.previous}px) translateY(${cursorConfigs.y.previous}px)`
  }

  const onScaleMouse = (linkItems) => {
    linkItems.forEach( link => {

      if (link.matches(':hover')) {
        setVideo(link)
        scaleAnimation(cursorRef.current.children[0], 0.8)
      }

      link.addEventListener("mouseenter", () => {
        setVideo(link)
        scaleAnimation(cursorRef.current.children[0], 0.8)
      })

      link.addEventListener("mouseleave", () => {
        scaleAnimation(cursorRef.current.children[0], 0)
      })

      // Hover on a tag to expand to 1.2
      link.children[1].addEventListener("mouseenter", () => {
        cursorRef.current.classList.add("media-blend")
        scaleAnimation(cursorRef.current.children[0], 1.2)
      })

      // Off hover scale to .8
      link.children[1].addEventListener("mouseleave", () => {
        cursorRef.current.classList.remove("media-blend")
        scaleAnimation(cursorRef.current.children[0], 0.8)
      })
    })
  }

  const scaleAnimation = (el, amt) => {
    gsap.to(cursorRef.current.children[0], {
      duration: 0.6,
      scale: amt,
      ease: "Power3.easeOut"
    })
  }

  const setVideo = el => {
    // Grab the data-video-src and make sure it matches the video that should be displayed
    let src = el.getAttribute("data-video-src")
    let video = document.querySelector(`#${src}`)
    let siblings = getSiblings(video)

    if (video.id === src) {
      gsap.set(video, { zIndex: 4, opacity: 1 })
      siblings.forEach( i => {
        gsap.set(i, { zIndex: 1, opacity: 0 })
      })
    }
  }

  useEffect(() => {
    // ====== modification du DOM ==================
    cursorRef.current.style.opacity = '0'
    const linkItems = linksRef.current.querySelectorAll('.hero__inner__link__item')
    onScaleMouse(linkItems)
    // =============================================

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorRef, linksRef, mouse]);

  return (
      <div className={styles.container}>

        {/* ======= HEADER ======== */}

        <div className={styles.header}>
          <div className={styles.header__inner}>

            <div className={styles.header__inner__col__left}>
              <div className={styles.header__logo}>
                <Link href="/"><h2 style={{ cursor: 'pointer'}}>Mon logo</h2></Link>
              </div>
            </div>

            <div className={styles.header__inner__col__right}>
              <div className={styles.header__inner__nav}>

                <span className={styles.header__inner__nav__link}>showreel</span>

                <div className={styles.header__inner__nav__menu}>

                  <span className={styles.header__inner__nav__link}>menu</span>

                  <div className={styles.header__inner__nav__menu__hamburger}>
                    <span></span>
                    <span></span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        <div className={styles.hero}>
          <div className={styles.hero__container}>
            <div className={styles.hero__inner}>
              <div className="hero__inner__banner">
                <div className={styles.hero_inner__col__left}></div>
                <div className="hero-inner-col right">

                  <div className={styles.hero__inner__title}>
                    <h1>We make it happen</h1>
                  </div>

                  <div className={styles.hero__inner__links} ref={linksRef}>

                    <div data-video-src="websites" className={`${styles.hero__inner__link__item} hero__inner__link__item`}>
                      <div className={styles.hero__inner__link__item__padding}></div>
                      <a href="http://localhost:3000/"><span>Websites</span></a>
                    </div>

                    <div data-video-src="apps" className={`${styles.hero__inner__link__item} hero__inner__link__item`}>
                      <div className={styles.hero__inner__link__item__padding}></div>
                      <a href="http://localhost:3000/"><span>Apps</span></a>
                    </div>

                    <div data-video-src="branding" className={`${styles.hero__inner__link__item} hero__inner__link__item`}>
                      <div className={styles.hero__inner__link__item__padding}></div>
                      <a href="http://localhost:3000/"><span>Branding</span></a>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className={styles.hero__inner__footer}>
              <div className={styles.hero__inner__footer__text}>
                <p>
                  Leading digital agency with solid design and development
                  expertise. We build readymade websites, mobile applications, and
                  elaborate online business services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======= CHAT ======== */}
        <div className={styles.chat}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30" id="chat">
            <path
              d="M16 26c8.84 0 16-5.82 16-13S24.84 0 16 0 0 5.82 0 13a11.72 11.72 0 004.12 8.71L3.33 30l7.53-4.69A19.11 19.11 0 0016 26z"
            ></path>
          </svg>
        </div>

        {/* ======= CURSOR ======== */}
        <div className="cursor" ref={cursorRef}>
          <div className="cursor-media">
            <video src="videos/websites.mp4" preload="auto" autoPlay muted loop id="websites" />
            <video src="videos/apps.mp4" preload="auto" autoPlay muted loop id="apps" />
            <video src="videos/branding.mp4" preload="auto" autoPlay muted loop id="branding" />
          </div>
        </div>

      </div>
  )
}

export default CubertoHomeCursor






