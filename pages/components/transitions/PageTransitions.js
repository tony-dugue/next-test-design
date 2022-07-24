import {useState, useRef} from "react";
import styled from 'styled-components'
import { TransitionGroup, CSSTransition  } from "react-transition-group";
import gsap from 'gsap';

const PageTransitions = ({ children, route, routingPageOffset }) => {

  const [transitioning, setTransitioning] = useState(false)

  const tl = useRef()
  const transitionRef = useRef()

  const onExitStart = (element) => {
    gsap.timeline({})
      .fromTo(
        element,
        { clipPath: "polygon(0% 0%, 28% 0%, 64% 0%, 100% 0%, 100% 30%, 100% 66%, 100% 100%, 67% 100%, 34% 100%, 0% 100%, 0% 67%, 0% 29%)"},
        {
          clipPath: "polygon(49% 9%, 77% 17%, 78% 36%, 91% 68%, 71% 78%, 56% 96%, 23% 91%, 8% 69%, 16% 43%, 15% 15%)",
          rotation: -10,
          scale: 0.85
        }
      )
      .to(element, {yPercent: 100})
    setTransitioning(true)
  }
  const stopTransition = () => setTransitioning(false)

  return (
    <>
      <TransitionGroup className={transitioning ? "transitioning" : ""}>
        <CSSTransition key={route} classNames="page" timeout={1000} onExit={onExitStart} onExited={stopTransition}>
          <MainComponent routingPageOffset={routingPageOffset}>
            <SecondaryComponent className='page-transition-inner'>
              { children }
            </SecondaryComponent>
          </MainComponent>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

export default PageTransitions

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
    //opacity: 0;
    z-index: 0;
  
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
    z-index: 1;
    backface-visibility: hidden;
  }

  &.page-enter-done {

  }
`

