import React, {useEffect} from "react";
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

const Scroll = () => {

  const overscrollOptions = {
    enable: true,
    effect: 'bounce',
    damping: 0.15,
    maxOverscroll: 150
  }

  const options = {
    damping: 0.07,
    plugins: {
      overscroll: { ...overscrollOptions }
    }
  }

  useEffect(() => {
    Scrollbar.use(OverscrollPlugin);
    Scrollbar.init(document.body, options);
  }, []);

  return null
}

export default Scroll
