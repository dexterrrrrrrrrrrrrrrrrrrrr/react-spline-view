import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Check, X, ChevronRight, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Question {
  id: number
  question: string
  options: { label: string; text: string }[]
  correctAnswer: string
  explanation: string
}

interface QuizCardProps {
  questions: Question[]
  topic: string
  grade: string
  onReset: () => void
}

export function QuizCard({ questions, topic, grade, onReset }: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isQuizComplete = currentQuestion === questions.length - 1 && showExplanation

  const handleAnswerSelect = (answer: string) => {
    if (showExplanation) return
    setSelectedAnswer(answer)
    setShowExplanation(true)
    
    if (answer === question.correctAnswer && !answeredQuestions.includes(currentQuestion)) {
      setScore(score + 1)
      setAnsweredQuestions([...answeredQuestions, currentQuestion])
    }
  }

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setAnsweredQuestions([])
  }

  if (isQuizComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <Card className="w-full max-w-2xl shadow-[var(--shadow-card)] border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className={cn(
              "mx-auto w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white",
              percentage >= 70 ? "bg-gradient-to-br from-success to-accent" : "bg-gradient-to-br from-primary to-secondary"
            )}>
              {percentage}%
            </div>
            <CardTitle className="text-3xl font-bold">
              {percentage >= 90 ? "Outstanding! 🌟" : percentage >= 70 ? "Great Job! 🎉" : "Keep Learning! 💪"}
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              You scored {score} out of {questions.length} on {topic}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const wasCorrect = answeredQuestions.includes(idx)
                return (
                  <div key={q.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      wasCorrect ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                    )}>
                      {wasCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                    <p className="text-sm flex-1">Question {idx + 1}</p>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleRestart}
                variant="outline"
                size="lg"
                className="flex-1 h-12"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={onReset}
                size="lg"
                className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary"
              >
                New Topic
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Card className="w-full max-w-3xl shadow-[var(--shadow-card)] border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="font-medium">{topic} • Grade {grade}</span>
            <span className="font-medium">Score: {score}/{questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <CardTitle className="text-2xl leading-relaxed">
            {currentQuestion + 1}. {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option.label
              const isCorrectOption = option.label === question.correctAnswer
              const showStatus = showExplanation && (isSelected || isCorrectOption)
              
              return (
                <button
                  key={option.label}
                  onClick={() => handleAnswerSelect(option.label)}
                  disabled={showExplanation}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-300 border-2",
                    "hover:shadow-[var(--shadow-card)] hover:scale-[1.01]",
                    !showExplanation && "border-border hover:border-primary/50 bg-card",
                    showExplanation && isCorrectOption && "border-success bg-success/10",
                    showExplanation && isSelected && !isCorrectOption && "border-destructive bg-destructive/10",
                    showExplanation && !isSelected && !isCorrectOption && "border-border bg-muted/30 opacity-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center font-semibold flex-shrink-0 transition-colors",
                      !showExplanation && "bg-muted text-foreground",
                      showExplanation && isCorrectOption && "bg-success text-success-foreground",
                      showExplanation && isSelected && !isCorrectOption && "bg-destructive text-destructive-foreground"
                    )}>
                      {showStatus ? (
                        isCorrectOption ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />
                      ) : (
                        option.label
                      )}
                    </div>
                    <span className="text-base">{option.text}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {showExplanation && (
            <div className={cn(
              "p-4 rounded-xl border-2 animate-in fade-in slide-in-from-bottom-4 duration-500",
              isCorrect ? "bg-success/5 border-success/30" : "bg-primary/5 border-primary/30"
            )}>
              <p className="font-semibold mb-2 flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <Check className="w-5 h-5 text-success" />
                    <span className="text-success">Correct!</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-destructive" />
                    <span className="text-destructive">Not quite!</span>
                  </>
                )}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <Button
              onClick={handleNext}
              size="lg"
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--shadow-hover)] transition-all duration-300"
            >
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
