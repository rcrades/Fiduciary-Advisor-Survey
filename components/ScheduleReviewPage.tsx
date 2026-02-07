'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const priorities = [
  { id: 'retirement', label: 'Retirement Planning' },
  { id: 'investment', label: 'Investment Strategy' },
  { id: 'tax', label: 'Tax Optimization' },
  { id: 'estate', label: 'Estate Planning' },
  { id: 'risk', label: 'Risk Management' },
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
]

export default function ScheduleReviewPage() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined)
  const [duration, setDuration] = useState<string | undefined>(undefined)
  const [meetingFormat, setMeetingFormat] = useState<string | undefined>(undefined)
  const [virtualPlatform, setVirtualPlatform] = useState<string | undefined>(undefined)
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
  const [email, setEmail] = useState('user@example.com')
  const router = useRouter()

  const handlePriorityToggle = (priorityId: string) => {
    setSelectedPriorities(prev => 
      prev.includes(priorityId) 
        ? prev.filter(id => id !== priorityId)
        : [...prev, priorityId]
    )
  }

  const handleNext = () => {
    if (step < 5) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    // Here you would typically send this data to your backend
    console.log({
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      duration,
      meetingFormat,
      virtualPlatform,
      selectedPriorities,
      email
    })
    // For now, we'll just move to a confirmation step
    setStep(6)
  }

  useEffect(() => {
    if (step === 2 && duration) {
      handleNext()
    }
    if (step === 3 && meetingFormat) {
      if (meetingFormat === 'inPerson' || (meetingFormat === 'virtual' && virtualPlatform)) {
        handleNext()
      }
    }
  }, [duration, meetingFormat, virtualPlatform, step])

  const isNextDisabled = () => {
    switch (step) {
      case 1: return !selectedDate || !selectedTimeSlot
      case 2: return !duration
      case 3: return !meetingFormat || (meetingFormat === 'virtual' && !virtualPlatform)
      case 4: return selectedPriorities.length === 0
      case 5: return !email
      default: return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md sm:max-w-lg bg-white bg-opacity-10 backdrop-blur-lg text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Schedule Your Detailed Review</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Select a Date and Time</h3>
                <div className="mb-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                {selectedDate && (
                  <div className="mb-4">
                    <Label htmlFor="timeSlot" className="text-white mb-2 block">Select a Time Slot</Label>
                    <Select onValueChange={setSelectedTimeSlot} value={selectedTimeSlot}>
                      <SelectTrigger id="timeSlot" className="bg-white bg-opacity-20 border-white border-opacity-20 text-white">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Select Meeting Duration</h3>
                <RadioGroup onValueChange={setDuration} value={duration}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="1hour" id="1hour" />
                    <Label htmlFor="1hour" className="text-white">1 Hour</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2hours" id="2hours" />
                    <Label htmlFor="2hours" className="text-white">2 Hours</Label>
                  </div>
                </RadioGroup>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Select Meeting Format</h3>
                <RadioGroup onValueChange={setMeetingFormat} value={meetingFormat}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="inPerson" id="inPerson" />
                    <Label htmlFor="inPerson" className="text-white">In-Person</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="virtual" id="virtual" />
                    <Label htmlFor="virtual" className="text-white">Virtual</Label>
                  </div>
                </RadioGroup>
                {meetingFormat === 'virtual' && (
                  <div className="mt-4">
                    <Label htmlFor="virtualPlatform" className="text-white mb-2 block">Select Virtual Platform</Label>
                    <Select onValueChange={setVirtualPlatform} value={virtualPlatform}>
                      <SelectTrigger id="virtualPlatform" className="bg-white bg-opacity-20 border-white border-opacity-20 text-white">
                        <SelectValue placeholder="Select a platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="teams">Microsoft Teams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Select Your Priorities</h3>
                <p className="mb-2 text-sm text-white">Choose all that apply:</p>
                <div className="flex flex-wrap gap-2">
                  {priorities.map((priority) => (
                    <Badge
                      key={priority.id}
                      variant={selectedPriorities.includes(priority.id) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => handlePriorityToggle(priority.id)}
                    >
                      {priority.label}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4">Confirm Your Email</h3>
                <p className="mb-2 text-sm text-white">We'll send your meeting details to this email address:</p>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4 bg-white bg-opacity-20 border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50"
                />
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Appointment Scheduled!</h3>
                <p className="mb-4">
                  Your detailed review has been scheduled for {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTimeSlot}.
                  We've sent a confirmation email to {email} with all the details.
                </p>
                <Button onClick={() => router.push('/')} className="mt-4 bg-teal-500 hover:bg-teal-600 text-white">
                  Return to Homepage
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 6 && (
            <div className="flex justify-between mt-8">
              <Button onClick={handleBack} disabled={step === 1} variant="outline" className="bg-white bg-opacity-10 text-white border-white border-opacity-20 hover:bg-white hover:bg-opacity-20 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {step < 5 ? (
                <Button onClick={handleNext} disabled={isNextDisabled()} className="bg-teal-500 hover:bg-teal-600 text-white">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isNextDisabled()} className="bg-teal-500 hover:bg-teal-600 text-white">
                  Schedule Appointment
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
