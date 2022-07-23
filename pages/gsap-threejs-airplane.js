import {useEffect, useLayoutEffect} from "react";
import Link from "next/link";
import styled from "styled-components";
import loadModel from '../threejs/Airplane'

import sunsetImg from '../public/images/end.jpg'
import cloudsImg from '../public/images/clouds.webp'
import sanFranciscoImg from '../public/images/san-francisco.jpg'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const GsapThreejsAirplane = () => {

  useIsomorphicLayoutEffect(() => {
    loadModel()
  }, []);

  return (
    <Content id="canvas-container" className="content">

      <Link href="/">
        <Back>
          <img src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
          Accueil
        </Back>
      </Link>

      <Loading className="loading">Loading</Loading>

      <div className="trigger"></div>

      <Section>
        <h1>Breizh Logistics</h1>
        <h3>Transport de fret aérien</h3>
        <p>Besoin d&apos;un colis volumineux ?</p>

        <div className="scroll-cta">Scroll</div>

      </Section>

      <Section className="right">
        <h2>Une proximité avec le monde...</h2>
      </Section>

      <div className="ground-container">

        <div className="parallax ground"></div>

        <Section className="right">
          <h2>... une multitude de destinations</h2>
          <p>Et oui, partout partout !!</p>
        </Section>

        <Section>
          <h2>Nous volons à travers le ciel.</h2>
          <p>Pour vous!</p>
        </Section>

        <Section className="right">
          <h2>Et venons à votre rencontre.</h2>
          <p>24h/24 et 7 jours/7</p>
        </Section>

        <div className="parallax clouds"></div>

      </div>

      <Blueprint className="blueprint">

        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <line id="line-length" x1="10" y1="80" x2="90" y2="80" strokeWidth="0.5"></line>
          <path id="line-wingspan" d="M10 50, L40 35, M60 35 L90 50" strokeWidth="0.5"></path>
          <circle id="circle-phalange" cx="60" cy="60" r="15" fill="transparent" strokeWidth="0.5"></circle>
        </svg>

        <Section className="dark">
          <h2>Le Compressor A768</h2>
          <p>Découvrer notre appareil...</p>
        </Section>

        <Section className="dark length">
          <h2>Envergure</h2>
          <p>60.30 m</p>
        </Section>

        <Section className="dark wingspan">
          <h2>Vitesse</h2>
          <p>880 km/h</p>
        </Section>

        <Section className="dark phalange">
          <h2>Capacité de fret</h2>
          <p>entre 30-50 tonnes de chargement</p>
        </Section>

        <Section className="dark">
          <h2>Moteurs</h2>
          <p>Biréacteur</p>
          <p>moteurs General Electric</p>
          <p>242 tonnes de masse maximale</p>
        </Section>

      </Blueprint>

      <div className="sunset">
        <Section></Section>
        <Section className="end">
          <h2>Contactez-nous</h2>
          <p>Breizh logistics</p>
          <p>423, rue de l&apos;aéroport</p>
          <p>35000 Rennes</p>
          <ul className="credits">
            <li>Animated using <a href="https://greensock.com/scrolltrigger/" target="_blank" rel="noreferrer">GSAP ScrollTrigger</a></li>
          </ul>
        </Section>
      </div>

    </Content>
  )
}

export default GsapThreejsAirplane

export const Content = styled.div`
  position: relative;
  z-index: 1;
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  font-family: 'Orbitron', sans-serif;
  background-color: #E3D5C7;
  font-weight: 400;
  font-size: 2vw;
  overflow-x: hidden;

  @media only screen and (min-width: 800px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 500px) {
    font-size: 14px;
  }

  svg {
    z-index: 100;
  }

  a {
    color: white;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    margin-top: 10px;
  }

  canvas {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    z-index: 2;
    pointer-events: none;

    visibility: hidden;
    opacity: 0;
  }
  
  .trigger {
    position: absolute;
    top: 0;
    height: 100%;
  }

  .ground-container {
    position: relative;
    overflow: hidden;
    // perspective: 2px;

    .parallax {
      position:absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: -100px;
      background-repeat: no-repeat;
      background-position: top center;
      background-size: cover;
      transform-origin: top center;
    }

    .ground {
      z-index: -1;
      background-image: url(${sanFranciscoImg});
      opacity: 0.8;
    }

    .clouds {
      z-index: 2;
      background-image: url(${cloudsImg});
    }
  }
  
  .scroll-cta, .credits {
    position: absolute;
    bottom: 10vmin;
  }

  .scroll-cta {
    font-size: 4vw;
    opacity: 0;

    @media only screen and (min-width: 800px) {
      font-size: 32px;
    }

    @media only screen and (max-width: 500px) {
      font-size: 20px;
    }
  }

  .sunset {
    background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${sunsetImg}) no-repeat top center;
    background-size: cover;
    transform-origin: top center;
  }

  h1, h2 {
    font-size: 8vw;
    margin: 0vmin 0 2vmin 0 ;
    font-weight: 700;
    display: inline;

    @media only screen and (min-width: 800px) {
      font-size: 64px;
    }

    @media only screen and (max-width: 500px) {
      font-size: 40px;
    }
  }

  h3 {
    font-size: 4vw;
    font-weight: 400;
    margin: 0;

    @media only screen and (min-width: 800px) {
      font-size: 32px;
    }

    @media only screen and (max-width: 500px) {
      font-size: 20px;
    }
  }

  .end h2 {
    margin-bottom: 50vh;
  }

  .solid {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }

  .wireframe {
    clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  }
`

export const Back = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  margin: 20px;
  display: flex;
  align-items: center;
  z-index: 999;
`

export const Loading = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4vw;

  @media only screen and (min-width: 800px) {
    font-size: 32px;
  }

  @media only screen and (max-width: 500px) {
    font-size: 20px;
  }
`

export const Section = styled.div`
  position: relative;
  padding: 10vmin;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  z-index: 2;

  &.dark {
    color: white;
    background-color: black;
  }

  &.right {
    text-align: right;
  }
`

export const Blueprint = styled.div`
  position: relative;
  background-color: #131C2A;
  background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
  linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size:100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position:-2px -2px, -2px -2px, -1px -1px, -1px -1px;
  background-attachment: fixed;

  svg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    stroke: white;
    pointer-events: none;
    visibility: hidden;
  }

.dark {
    background-color: transparent;
  }
`
