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

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)
    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center text-white px-4 sm:px-0"
    >
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />
      )}
      <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-teal-400 mx-auto mb-4" />
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-balance">Thank you for completing the survey!</h2>
      <p className="text-base sm:text-lg mb-6 sm:mb-8 text-white text-opacity-80">
        Our team of expert advisors has analyzed your responses and prepared personalized recommendations.
      </p>
      <div className="flex flex-col gap-3 mb-6 sm:mb-8 w-full max-w-sm sm:max-w-md mx-auto">
        <Button
          asChild
          size="lg"
          className="bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-lg py-3 px-4 sm:px-6 w-full"
        >
          <Link href="/schedule-review">Schedule a Detailed Review</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="bg-white bg-opacity-10 text-white border-white border-opacity-20 hover:bg-white hover:bg-opacity-20 text-sm sm:text-lg py-3 px-4 sm:px-6 w-full"
        >
          <Link href="/portfolio-analysis">Review Portfolio Analysis</Link>
        </Button>
      </div>
      <div className="bg-indigo-800 bg-opacity-40 p-3 sm:p-6 rounded-lg border border-white border-opacity-10">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">Your Responses</h3>
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, index) => (
            <AccordionItem
              key={question.id}
              value={`question-${index}`}
              className="border-b border-white border-opacity-30"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base text-white hover:text-white hover:no-underline">
                <span className="font-medium">{question.text}</span>
              </AccordionTrigger>
              <AccordionContent className="text-white text-opacity-80">
                <p className="text-sm sm:text-base">{answers[index] || "Not answered"}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.div>
  )
}
