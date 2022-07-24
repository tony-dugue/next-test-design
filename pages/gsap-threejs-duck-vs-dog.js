import {useEffect} from "react";
import Link from "next/link";
import styles from '../styles/gsap-threejs-duck-vs-dog.module.scss'
import * as THREE from "three"
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//  --- CONSTS

const COLORS = {
  background: 'white',
  light: '#ffffff',
  sky: '#aaaaff',
  ground: '#88ff88',
  blue: 'steelblue'
}

const PI = Math.PI;

const GsapThreejsDuckVsDog = () => {

  gsap.registerPlugin(ScrollTrigger)

  const threeRender =  () => {

    // --- MODELS

    const toLoad =  [
      { name: "duck", group: new THREE.Group(), file: "/models/duck.gltf"},
      { name: "dog", group: new THREE.Group(), file: "/models/dog.gltf"}
    ]

    const models = {}
    const clones = {}
    let cameras = null
    let dogs = null
    let ducks


    const setupAnimation = () => {

      cameras = { position: [views[0].camera.position, views[1].camera.position]}
      dogs = { position: [models.dog.position, clones.dog.position], rotation: [models.dog.rotation, clones.dog.rotation] }
      ducks = { position: [models.duck.position, clones.duck.position], rotation: [models.duck.rotation, clones.duck.rotation] }

      gsap.set(ducks.position, {x: 5})
      gsap.set(dogs.position, {x: -5})

      ScrollTrigger.matchMedia({"(prefers-reduced-motion: no-preference)": desktopAnimation})
    }

    const desktopAnimation = () => {

      let section = 0

      const tl = gsap.timeline({
        default: {
          duration: 1,
          ease: "power2.inOut"
        },
        scrollTrigger: {
          trigger: ".content",
          start: "top top",
          end: "bottom bottom",
          scrub: .1,
          markers: true
        }
      })

      tl.to(ducks.position, { x: 1 }, section)
      tl.to(dogs.position, { x: -1 }, section)
      tl.to(cameraTarget, { y: 1 }, section)
      tl.to(cameras.position, { z: 5, ease: 'power2.out' }, section)

      // section 2
      section +=1

      tl.to(ducks.position, { x: 5, ease: "power4.in" }, section)
      tl.to(dogs.position, { z: 1 }, section)
      tl.to(views[1], { height: 1, ease: 'none'}, section)

      // section 3
      section +=1

      tl.to(ducks.position, { x: 1, z: 1, ease: "power4.out" }, section)
      tl.to(dogs.position, { z: 0, x: -5, ease: "power4.in" }, section)

      // section 4
      section +=1

      tl.to(ducks.position, { x: 1, z: 0 }, section)
      tl.to(dogs.position, { x: -1, z: 0 }, section)
      tl.to(views[1], {height: 0, bottom: 1, ease:'none'}, section)
    }

    const manager = new THREE.LoadingManager( setupAnimation)

    const loader = new GLTFLoader(manager)

    toLoad.forEach( item => {
      loader.load(item.file, model => {
        model.scene.traverse( child => {
          if (child instanceof THREE.Mesh) {
            child.receiveShadow = true
            child.castShadow = true
          }
        })
        item.group.add(model.scene)
        scenes.real.add(item.group)
        models[item.name] = item.group

        const clone = item.group.clone()
        clones[item.name] = clone
        scenes.wire.add(clone)
      })
    })

    // --- MATERIAL

    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 'white', wireframe: true })

    // --- SCENE

    const scenes = {
      real: new THREE.Scene(),
      wire: new THREE.Scene()
    }

    scenes.wire.overrideMaterial = wireframeMaterial

    let size = { width: 0, height: 0 }

    scenes.real.background = new THREE.Color(COLORS.background)
    scenes.real.fog = new THREE.Fog(COLORS.background, 15, 20)
    scenes.wire.background = new THREE.Color(COLORS.blue)

    const views = [
      { height: 1, bottom: 0, scene: scenes.real, camera: null },
      { height: 0, bottom: 0, scene: scenes.wire, camera: null },
    ]

    // --- RENDERER

    const renderer = new THREE.WebGLRenderer({ antialias: true })

    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 5;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const container = document.getElementById('canvas-container');
    container.appendChild( renderer.domElement );

    // --- CAMERA

    let cameraTarget = new THREE.Vector3(0, 3, 0);

    views.forEach( view => {
      view.camera = new THREE.PerspectiveCamera(40, size.width / size.height, 0.1, 100);
      view.camera.position.set(0, 1, 1);
      view.scene.add(view.camera);
    })

    // --- LIGHTS

    const directionalLight = new THREE.DirectionalLight(COLORS.light, 2);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.far = 10;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.normalBias = 0.05;
    directionalLight.position.set(2, 5, 3);

    scenes.real.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight( COLORS.sky, COLORS.ground, 0.5 );
    scenes.real.add(hemisphereLight)

    // --- FLOOR

    const plane = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: COLORS.ground })
    const floor = new THREE.Mesh(plane, floorMaterial);
    floor.receiveShadow = true;
    floor.rotateX(-Math.PI * 0.5)

    scenes.real.add(floor);

    // --- ON RESIZE

    const onResize = () => {
      size.width = container.clientWidth;
      size.height = container.clientHeight;

      views.forEach( view => {
        view.camera.aspect = size.width / size.height
        view.camera.updateProjectionMatrix()
      })

      renderer.setSize(size.width, size.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', onResize)
    onResize();

    // --- TICK

    const tick = () => {

      views.forEach( view => {
        view.camera.lookAt(cameraTarget);

        // on converti un % en pixel
        let bottom = size.height * view.bottom
        let height = size.height * view.height

        renderer.setViewport(0, 0, size.width, size.height)
        renderer.setScissor(0, bottom, size.width, height)
        renderer.setScissorTest(true)
        renderer.render(view.scene, view.camera);
      })

      window.requestAnimationFrame(() => tick())
    }

    tick();
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      threeRender()
    }
  }, [])

  return (
    <main className={styles.container}>

      <div className={styles.canvasContainer} id="canvas-container"></div>

      <div className={`${styles.content} content`}>

        <section className={styles.section}>
          <Link href="/">
            <div className={styles.back}>
              <img src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
              Accueil
            </div>
          </Link>
          Scroll Down
        </section>

        <section className={styles.section}>
          Duck vs. Dog
        </section>

        <section className={`${styles.section} duck-stats`}>
          Duck Stats
        </section>

        <section className={`${styles.section} dog-stats`}>
          Dog Stats
        </section>

        <section className={`${styles.section} winner`}>
          Winner
        </section>

      </div>
    </main>
  )
}

export default GsapThreejsDuckVsDog

