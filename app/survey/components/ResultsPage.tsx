"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { questions } from "../data/questions"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ResultsPageProps {
  answers: Record<string, string>
  showConfetti: boolean
}

export default function ResultsPage({ answers, showConfetti }: ResultsPageProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [showConfettiState, setShowConfettiState] = useState(showConfetti)

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)
    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfettiState(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      {showConfettiState && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
          colors={['#c9a84c', '#d4b65e', '#5a7fa5', '#7a9bb5', '#e8dcc8']}
        />
      )}

      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-3 text-balance">
        Thank you for completing the survey
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-md mx-auto text-pretty">
        Our team of expert advisors has analyzed your responses and prepared personalized recommendations.
      </p>

      <div className="flex flex-col gap-3 mb-8 w-full max-w-sm mx-auto">
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full text-sm sm:text-base py-3"
        >
          <Link href="/schedule-review">Schedule a Detailed Review</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-border text-foreground hover:bg-secondary w-full text-sm sm:text-base py-3 bg-transparent"
        >
          <Link href="/portfolio-analysis">Review Portfolio Analysis</Link>
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 text-left">
        <h3 className="font-serif text-lg text-foreground mb-4">Your Responses</h3>
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, index) => (
            <AccordionItem
              key={question.id}
              value={`question-${index}`}
              className="border-b border-border"
            >
              <AccordionTrigger className="text-left text-sm text-foreground hover:text-primary hover:no-underline py-3">
                <span>{question.text}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="text-sm pb-1">{answers[index] || "Not answered"}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.div>
  )
}
