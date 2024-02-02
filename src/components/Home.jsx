import coin from '../assets/bitcoin.png'
import {motion} from 'framer-motion'
function Home() {
  return (
    <div className="w-full h-[85vh] bg-neutral-900 flex flex-col justify-center items-center">
      <motion.div
      style={{
        height : "90%"
      }}
       animate={{
        translateY : "20px",
      }} 
      transition={{
        duration : 1.5, 
        repeat : Infinity,
        repeatType : 'reverse'
      }}
      >
      <img className=' w-full h-[90%]  object-contain grayscale ' src={coin} alt="" />
      </motion.div>
      <h2 className='text-5xl text-white font-serif font-bold mb-8 '>Crypto</h2>
    </div>
  )
}

export default Home