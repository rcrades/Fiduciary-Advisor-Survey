import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-3 bg-white bg-opacity-20 rounded-full mb-6 sm:mb-8">
      <motion.div
        className="h-full bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"
        style={{ width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
