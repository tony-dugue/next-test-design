import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { DrawSVGPlugin } from "./DrawSVGPlugin"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// there are 3 parts to this
//
// Scene:           Setups and manages threejs rendering
// loadModel:       Loads the 3d obj file
// setupAnimation:  Creates all the GSAP
//                  animations and scroll triggers
//
// first we call loadModel, once complete we call
// setupAnimation which creates a new Scene

class Scene {
  constructor(model) {
    this.views = [
      { bottom: 0, height: 1 },
      { bottom: 0, height: 0 },
    ];

    this.renderer = new THREE.WebGLRenderer({ antialias: true,   alpha: true, });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    const container = document.getElementById('canvas-container');
    container.appendChild( this.renderer.domElement );

    // scene

    this.scene = new THREE.Scene();

    for (let ii = 0; ii < this.views.length; ++ii) {
      const view = this.views[ii];
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,  1, 2000 );
      camera.position.fromArray([0, 0, 180]);
      camera.layers.disableAll();
      camera.layers.enable(ii);
      view.camera = camera;
      camera.lookAt(new THREE.Vector3(0, 5, 0));
    }

    //light

    this.light = new THREE.PointLight(0xffffff, 0.75);
    this.light.position.z = 500;
    this.light.position.x = 70;
    this.light.position.y = -20;
    this.scene.add(this.light);

    this.softLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(this.softLight);

    // group

    this.onResize();
    window.addEventListener("resize", this.onResize, false);

    const edges = new THREE.EdgesGeometry(model.children[0].geometry);
    let line = new THREE.LineSegments(edges);
    line.material.depthTest = false;
    line.material.opacity = 0.5;
    line.material.transparent = true;
    line.position.x = 0.5;
    line.position.z = -1;
    line.position.y = 0.2;

    this.modelGroup = new THREE.Group();

    model.layers.set(0);
    line.layers.set(1);

    this.modelGroup.add(model);
    this.modelGroup.add(line);
    this.scene.add(this.modelGroup);
  }

  render = () => {
    for (let ii = 0; ii < this.views.length; ++ii) {
      const view = this.views[ii];
      const camera = view.camera;

      const bottom = Math.floor(this.h * view.bottom);
      const height = Math.floor(this.h * view.height);

      this.renderer.setViewport(0, 0, this.w, this.h);
      this.renderer.setScissor(0, bottom, this.w, height);
      this.renderer.setScissorTest(true);

      camera.aspect = this.w / this.h;
      this.renderer.render(this.scene, camera);
    }
  };

  onResize = () => {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    for (let ii = 0; ii < this.views.length; ++ii) {
      const view = this.views[ii];
      const camera = view.camera;
      camera.aspect = this.w / this.h;
      let camZ = (screen.width - this.w * 1) / 6;
      camera.position.z = camZ < 180 ? 180 : camZ;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(this.w, this.h);
    this.render();
  };
}

function loadModel() {
  gsap.registerPlugin(ScrollTrigger);
  //gsap.registerPlugin(DrawSVGPlugin);
  //gsap.set('#line-length', {drawSVG: 0})
  //gsap.set('#line-wingspan', {drawSVG: 0})
  //gsap.set('#circle-phalange', {drawSVG: 0})

  let object;

  function onModelLoaded() {
    object.traverse(function (child) {
      let mat = new THREE.MeshPhongMaterial({
        color: 0x2a261f,
        specular: 0xffffff,
        shininess: 5,
        flatShading: true,
      });
      child.material = mat;
    });

    setupAnimation(object);
  }

  const manager = new THREE.LoadingManager(onModelLoaded);

  manager.onProgress = (item, loaded, total) =>
    console.log(item, loaded, total);

  const loader = new OBJLoader(manager);
  loader.load("models/plane.obj", function (obj) {
    object = obj;
  });
}

function setupAnimation(model) {
  let scene = new Scene(model);
  let plane = scene.modelGroup;

  gsap.fromTo(
    "canvas",
    { x: "50%", autoAlpha: 0 },
    { duration: 1, x: "0%", autoAlpha: 1 }
  );
  gsap.to(".loading", { autoAlpha: 0 });
  gsap.to(".scroll-cta", { opacity: 1 });
  //gsap.set('svg', {autoAlpha: 1})

  let tau = Math.PI * 2;

  gsap.set(plane.rotation, { y: tau * -0.25 });
  gsap.set(plane.position, { x: 20, y: -20, z: 250 });

  scene.render();

  let sectionDuration = 1;

  gsap.fromTo(
    scene.views[1],
    { height: 1, bottom: 0 },
    {
      height: 0,
      bottom: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".blueprint",
        scrub: true,
        start: "bottom bottom",
        end: "bottom top",
      },
    }
  );

  gsap.fromTo(
    scene.views[1],
    { height: 0, bottom: 0 },
    {
      height: 1,
      bottom: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".blueprint",
        scrub: true,
        start: "top bottom",
        end: "top top",
      },
    }
  );

  gsap.to(".ground", {
    y: "30%",
    scrollTrigger: {
      trigger: ".ground-container",
      scrub: true,
      start: "top bottom",
      end: "bottom top",
    },
  });

  gsap.from(".clouds", {
    y: "25%",
    scrollTrigger: {
      trigger: ".ground-container",
      scrub: true,
      start: "top bottom",
      end: "bottom top",
    },
  });

  gsap.to("#line-length", {
    drawSVG: 100,
    scrollTrigger: {
      trigger: ".length",
      scrub: true,
      start: "top bottom",
      end: "top top",
    },
  });

  gsap.to("#line-wingspan", {
    drawSVG: 100,
    scrollTrigger: {
      trigger: ".wingspan",
      scrub: true,
      start: "top 25%",
      end: "bottom 50%",
    },
  });

  gsap.to("#circle-phalange", {
    drawSVG: 100,
    scrollTrigger: {
      trigger: ".phalange",
      scrub: true,
      start: "top 50%",
      end: "bottom 100%",
    },
  });

  gsap.to("#line-length", {
    opacity: 0,
    drawSVG: 0,
    scrollTrigger: {
      trigger: ".length",
      scrub: true,
      start: "top top",
      end: "bottom top",
    },
  });

  gsap.to("#line-wingspan", {
    opacity: 0,
    drawSVG: 0,
    scrollTrigger: {
      trigger: ".wingspan",
      scrub: true,
      start: "top top",
      end: "bottom top",
    },
  });

  gsap.to("#circle-phalange", {
    opacity: 0,
    drawSVG: 0,
    scrollTrigger: {
      trigger: ".phalange",
      scrub: true,
      start: "top top",
      end: "bottom top",
    },
  });

  let tl = new gsap.timeline({
    onUpdate: scene.render,
    scrollTrigger: {
      trigger: ".content",
      scrub: true,
      start: "top top",
      end: "bottom bottom",
    },
    defaults: { duration: sectionDuration, ease: "power2.inOut" },
  });

  let delay = 0;

  tl.to(".scroll-cta", { duration: 0.25, opacity: 0 }, delay);
  tl.to(plane.position, { x: -10, ease: "power1.in" }, delay);

  delay += sectionDuration;

  tl.to(
    plane.rotation,
    { x: tau * 0.25, y: 0, z: -tau * 0.05, ease: "power1.inOut" },
    delay
  );
  tl.to(plane.position, { x: -40, y: 0, z: -60, ease: "power1.inOut" }, delay);

  delay += sectionDuration;

  tl.to(
    plane.rotation,
    { x: tau * 0.25, y: 0, z: tau * 0.05, ease: "power3.inOut" },
    delay
  );
  tl.to(plane.position, { x: 40, y: 0, z: 60, ease: "power2.inOut" }, delay);

  delay += sectionDuration;

  tl.to(
    plane.rotation,
    { x: tau * 0.2, y: 0, z: -tau * 0.1, ease: "power3.inOut" },
    delay
  );
  tl.to(plane.position, { x: -40, y: 0, z: 0, ease: "power2.inOut" }, delay);

  delay += sectionDuration;

  tl.to(plane.rotation, { x: 0, z: 0, y: tau * 0.25 }, delay);
  tl.to(plane.position, { x: 20, y: -10, z: 200 }, delay);

  delay += sectionDuration;
  delay += sectionDuration;

  tl.to(
    plane.rotation,
    { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" },
    delay
  );
  tl.to(plane.position, { z: 120, x: 20, y: 0, ease: "power4.inOut" }, delay);

  delay += sectionDuration;

  tl.to(
    plane.rotation,
    { x: tau * 0.25, y: tau * 0.5, z: 0, ease: "power4.inOut" },
    delay
  );
  tl.to(plane.position, { z: 180, x: 60, y: 0, ease: "power4.inOut" }, delay);

  delay += sectionDuration;

  tl.to(
    plane.rotation,
    { x: tau * 0.35, y: tau * 0.75, z: tau * 0.6, ease: "power4.inOut" },
    delay
  );
  tl.to(plane.position, { z: 180, x: 20, y: 0, ease: "power4.inOut" }, delay);

  delay += sectionDuration;

  tl.to(
    plane.rotation,
    { x: tau * 0.15, y: tau * 0.85, z: -tau * 0, ease: "power1.in" },
    delay
  );
  tl.to(plane.position, { z: 0, x: 0, y: 0, ease: "power1.inOut" }, delay);

  delay += sectionDuration;

  tl.to(
    plane.rotation,
    {
      duration: sectionDuration,
      x: -tau * 0.05,
      y: tau,
      z: -tau * 0.1,
      ease: "none",
    },
    delay
  );
  tl.to(
    plane.position,
    { duration: sectionDuration, x: 0, y: 70, z: 320, ease: "power1.in" },
    delay
  );

  tl.to(
    scene.light.position,
    { duration: sectionDuration, x: 0, y: 0, z: 0 },
    delay
  );
}

export default loadModel
