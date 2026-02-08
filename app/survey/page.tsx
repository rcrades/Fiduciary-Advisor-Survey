'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/navigation'
import ProgressBar from './components/ProgressBar'
import QuestionCard from './components/QuestionCard'
import ResultsPage from './components/ResultsPage'
import { questions } from './data/questions'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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
    trackMouse: true,
    delta: 30,
    swipeDuration: 500,
  })

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(40 60% 64%) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      {/* Header */}
      <header className="relative z-10 w-full px-4 sm:px-6 py-4 border-b border-border">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-xs">S</span>
            </div>
            <span className="font-serif text-base text-foreground">SCV Wealth</span>
          </Link>
          <span className="text-xs text-muted-foreground font-sans">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <div {...handlers}>
                <ProgressBar progress={progress} />
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <QuestionCard
                    question={questions[currentQuestion]}
                    onAnswer={handleAnswer}
                    selectedAnswer={answers[currentQuestion]}
                  />
                </motion.div>
                {currentQuestion > 0 && (
                  <button
                    onClick={prevQuestion}
                    type="button"
                    className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous question
                  </button>
                )}
              </div>
            ) : (
              <ResultsPage
                answers={answers}
                showConfetti={true}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
