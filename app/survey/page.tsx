'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/navigation'
import ProgressBar from './components/ProgressBar'
import QuestionCard from './components/QuestionCard'
import ResultsPage from './components/ResultsPage'
import { questions } from './data/questions'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function SurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const router = useRouter()

  const handleAnswer = useCallback((answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }))
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }, [currentQuestion])

  const prevQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }, [currentQuestion])

  const handleReviewRecommendations = useCallback(() => {
    router.push('/portfolio-analysis')
  }, [router])

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentQuestion < questions.length - 1 && answers[currentQuestion]) {
        setCurrentQuestion(prev => prev + 1)
      }
    },
    onSwipedRight: prevQuestion,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <div {...handlers}>
              <ProgressBar progress={progress} />
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionCard
                  question={questions[currentQuestion]}
                  onAnswer={handleAnswer}
                  selectedAnswer={answers[currentQuestion]}
                />
              </motion.div>
              <div className="flex justify-start mt-8">
                <Button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  variant="ghost"
                  className="text-white hover:bg-white hover:bg-opacity-20 py-2 px-4 text-lg"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" /> Previous
                </Button>
              </div>
            </div>
          ) : (
            <ResultsPage 
              answers={answers} 
              onReviewRecommendations={handleReviewRecommendations}
              showConfetti={true}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
