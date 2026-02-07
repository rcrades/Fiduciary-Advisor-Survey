import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface QuestionCardProps {
  question: {
    id: number
    text: string
    options: string[]
  }
  onAnswer: (answer: string) => void
  selectedAnswer: string | undefined
}

export default function QuestionCard({ question, onAnswer, selectedAnswer }: QuestionCardProps) {
  return (
    <div className="text-center px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-white">{question.text}</h2>
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              className={`w-full min-h-[4rem] text-base sm:text-lg py-4 px-3 text-white border border-white border-opacity-30 hover:bg-white hover:bg-opacity-20 transition-all duration-200 whitespace-normal break-words ${
                selectedAnswer === option ? 'bg-white bg-opacity-20' : 'bg-transparent'
              }`}
              onClick={() => onAnswer(option)}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
