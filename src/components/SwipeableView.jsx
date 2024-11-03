// src/components/SwipeableView.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SwipeableView = ({ children, onSwipe, className = '' }) => {
  return (
    <motion.div
      className={className}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = offset.x + velocity.x;
        if (swipe < -50) onSwipe('left');
        if (swipe > 50) onSwipe('right');
      }}
    >
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </motion.div>
  );
};

export default SwipeableView;