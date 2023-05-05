import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export default React.memo(Transition);

const config = {
  dissolve: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideLeft: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5 },
  },
  slideRight: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5 },
  },
};

type Props = {
  controlKey: number | string;
  children?: React.ReactNode;
  animate: 'dissolve' | 'slide';
};

//| "slideDown" | "slideUp" | "pop" | "popIn" | "popOut" | "push" | "pushIn" | "pushOut" | "revealIn" | "revealOut" | "fadeIn" | "fadeOut" | "flipX" | "flipY" | "flip" | "none" | undefined;

function Transition(props: Props) {
  const { controlKey, children, animate } = props;
  const prevControlKey = useRef(controlKey);
  const [direction, setDirection] = useState<'slideLeft' | 'slideRight'>(
    'slideLeft'
  );

  const selectedType = useMemo(
    () => (animate === 'slide' ? config[direction] : config[animate]),
    [animate, direction]
  );

  useEffect(() => {
    if (prevControlKey.current === controlKey) return;
    if (prevControlKey.current > controlKey) setDirection('slideLeft');
    else setDirection('slideRight');

    prevControlKey.current = controlKey;
  }, [controlKey, selectedType]);

  return (
    <motion.div
      style={{ height: '100%', flex: 1 }}
      initial={selectedType.initial}
      animate={selectedType.animate}
      transition={selectedType.transition}
      key={controlKey}
    >
      {children}
    </motion.div>
  );
}
