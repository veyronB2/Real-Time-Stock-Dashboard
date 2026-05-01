import { motion } from 'motion/react';

const Header = () => {

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeIn' }}
    >
      <h1>Stock Dashboard</h1>
    </motion.header>
  )
}

export default Header