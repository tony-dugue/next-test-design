import {useState, useRef, useEffect} from "react";
import styled from 'styled-components'
import { TransitionGroup, CSSTransition  } from "react-transition-group";
import gsap from 'gsap';

const PageTransitionsGsapGrid = ({ children, route, routingPageOffset }) => {

  const [transitioning, setTransitioning] = useState(false)

  const tl = useRef()
  const transitionRef = useRef()

  const playTransition = () => {
    tl.current.play(0)
    setTransitioning(true)
  }

  const stopTransition = () => setTransitioning(false)

  useEffect(() => {
    if (!transitionRef.current) {
      return
    }

    const squares = transitionRef.current.children  // les 100 divs crée dans le <Grid>

    gsap.set(squares, { autoAlpha: 1})

    tl.current = gsap.timeline({
      repeat: 1,
      repeatDelay: 0.2,
      yoyo: true,
      paused: true
    })
      .fromTo(
        squares,
        { scale: 0, borderRadius: '100%'},
        { scale: 1, borderRadius: 0, stagger: {
            grid: 'auto',
            from: 'edges',
            ease: 'sine',
            amount: 0.5
          }})

    return () => {
      tl.current.kill()
    };
  }, []);


  return (
    <>
      <TransitionGroup className={transitioning ? "transitioning" : ""}>
        <CSSTransition key={route} classNames="page" timeout={1000} onEnter={playTransition} onExited={stopTransition}>
          <MainComponent routingPageOffset={routingPageOffset}>
            <SecondaryComponent className='page-transition-inner'>
              { children }
            </SecondaryComponent>
          </MainComponent>
        </CSSTransition>
      </TransitionGroup>

      <Grid ref={transitionRef}>
        {/* create 100 divs */}
        {[...Array(100)].map( (_, i) => (
          <div key={i} />
        ))}
      </Grid>
    </>
  )
}

export default PageTransitionsGsapGrid

const Grid = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  
  div {
    background: #444;
    visibility: hidden;
  }
`

const SecondaryComponent = styled.div`
  position: relative;
`

const MainComponent = styled.div`
  transform-style: preserve-3d;
  
  &.page-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    z-index: 4;
  
    backface-visibility: hidden;
  }
  
  &.page-enter-active, &.page-exit-active {
    .page-transition-inner {
      height: 100vh;
      overflow: hidden;
      background: white;
    }
  }
  
  &.page-exit {}
  
  &.page-exit-active {
    main {
      transform: translateY(-${props => props.routingPageOffset}px)
    }
    backface-visibility: hidden;
  }

  &.page-enter-done {

  }
`
