'use client';

import { motion } from 'framer-motion'

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
    <div className="text-center">
      <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-8 text-balance">
        {question.text}
      </h2>
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <motion.button
            key={option}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.25 }}
            onClick={() => onAnswer(option)}
            className={`w-full min-h-[3.25rem] text-sm sm:text-base py-3 px-4 rounded-lg border transition-all duration-200 text-left whitespace-normal break-words ${
              selectedAnswer === option
                ? 'bg-primary/15 border-primary text-foreground'
                : 'bg-card border-border text-foreground hover:border-primary/40 hover:bg-card/80'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
