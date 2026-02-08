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
import Link from 'next/link'

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
    console.log({ date: selectedDate, timeSlot: selectedTimeSlot, duration, meetingFormat, virtualPlatform, selectedPriorities, email })
    setStep(6)
  }

  useEffect(() => {
    if (step === 2 && duration) {
      setStep(prev => Math.min(prev + 1, 5))
    }
    if (step === 3 && meetingFormat) {
      if (meetingFormat === 'inPerson' || (meetingFormat === 'virtual' && virtualPlatform)) {
        setStep(prev => Math.min(prev + 1, 5))
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

  const stepLabels = ['Date & Time', 'Duration', 'Format', 'Priorities', 'Confirm']

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      {/* Background pattern */}
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
          {step < 6 && (
            <span className="text-xs text-muted-foreground">Step {step} of 5</span>
          )}
        </div>
      </header>

      {/* Main */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-lg">
          {/* Step indicator */}
          {step < 6 && (
            <div className="flex gap-1 mb-8">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex-1">
                  <div className={`h-1 rounded-full transition-colors ${i + 1 <= step ? 'bg-primary' : 'bg-border'}`} />
                  <p className={`text-[10px] mt-1.5 text-center hidden sm:block ${i + 1 <= step ? 'text-primary' : 'text-muted-foreground'}`}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          )}

          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              {step < 6 && (
                <CardTitle className="font-serif text-xl sm:text-2xl text-foreground text-center">
                  Schedule Your Detailed Review
                </CardTitle>
              )}
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.25 }}>
                    <h3 className="text-base font-medium text-foreground mb-4">Select a Date and Time</h3>
                    <div className="mb-4 overflow-x-auto flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border border-border"
                      />
                    </div>
                    {selectedDate && (
                      <div className="mb-4">
                        <Label htmlFor="timeSlot" className="text-sm text-muted-foreground mb-2 block">Select a Time Slot</Label>
                        <Select onValueChange={setSelectedTimeSlot} value={selectedTimeSlot}>
                          <SelectTrigger id="timeSlot" className="bg-secondary border-border text-foreground">
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
                  <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.25 }}>
                    <h3 className="text-base font-medium text-foreground mb-4">Select Meeting Duration</h3>
                    <RadioGroup onValueChange={setDuration} value={duration} className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
                        <RadioGroupItem value="1hour" id="1hour" />
                        <Label htmlFor="1hour" className="text-foreground cursor-pointer flex-1">1 Hour</Label>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
                        <RadioGroupItem value="2hours" id="2hours" />
                        <Label htmlFor="2hours" className="text-foreground cursor-pointer flex-1">2 Hours</Label>
                      </div>
                    </RadioGroup>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.25 }}>
                    <h3 className="text-base font-medium text-foreground mb-4">Select Meeting Format</h3>
                    <RadioGroup onValueChange={setMeetingFormat} value={meetingFormat} className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
                        <RadioGroupItem value="inPerson" id="inPerson" />
                        <Label htmlFor="inPerson" className="text-foreground cursor-pointer flex-1">In-Person</Label>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
                        <RadioGroupItem value="virtual" id="virtual" />
                        <Label htmlFor="virtual" className="text-foreground cursor-pointer flex-1">Virtual</Label>
                      </div>
                    </RadioGroup>
                    {meetingFormat === 'virtual' && (
                      <div className="mt-4">
                        <Label htmlFor="virtualPlatform" className="text-sm text-muted-foreground mb-2 block">Select Virtual Platform</Label>
                        <Select onValueChange={setVirtualPlatform} value={virtualPlatform}>
                          <SelectTrigger id="virtualPlatform" className="bg-secondary border-border text-foreground">
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
                  <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.25 }}>
                    <h3 className="text-base font-medium text-foreground mb-2">Select Your Priorities</h3>
                    <p className="mb-4 text-xs text-muted-foreground">Choose all that apply:</p>
                    <div className="flex flex-wrap gap-2">
                      {priorities.map((priority) => (
                        <button
                          key={priority.id}
                          type="button"
                          onClick={() => handlePriorityToggle(priority.id)}
                          className={`py-2 px-3 rounded-lg text-sm border transition-colors select-none ${
                            selectedPriorities.includes(priority.id)
                              ? 'bg-primary/15 border-primary text-primary'
                              : 'bg-secondary border-border text-foreground hover:border-primary/30'
                          }`}
                        >
                          {priority.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.25 }}>
                    <h3 className="text-base font-medium text-foreground mb-2">Confirm Your Email</h3>
                    <p className="mb-4 text-xs text-muted-foreground">{"We'll send your meeting details to this email address:"}</p>
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div key="step6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center py-4">
                    <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">Appointment Scheduled</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      Your detailed review has been scheduled for{' '}
                      <span className="text-foreground font-medium">{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</span> at{' '}
                      <span className="text-foreground font-medium">{selectedTimeSlot}</span>.
                      {"We've sent a confirmation email to "}
                      <span className="text-foreground font-medium">{email}</span>.
                    </p>
                    <Button onClick={() => router.push('/')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full sm:w-auto px-8">
                      Return to Homepage
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {step < 6 && (
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handleBack}
                    disabled={step === 1}
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary disabled:opacity-30 bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  {step < 5 ? (
                    <Button onClick={handleNext} disabled={isNextDisabled()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isNextDisabled()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Schedule Appointment
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
