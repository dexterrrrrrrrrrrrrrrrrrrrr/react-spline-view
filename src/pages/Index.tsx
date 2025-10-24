import { useState } from 'react'
import { QuizSetup } from '@/components/QuizSetup'
import { QuizCard } from '@/components/QuizCard'
import type { Question } from '@/components/QuizCard'

const Index = () => {
  const [quizStarted, setQuizStarted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState('')

  const handleStartQuiz = (selectedTopic: string, selectedGrade: string, generatedQuestions: Question[]) => {
    setTopic(selectedTopic)
    setGrade(selectedGrade)
    setQuestions(generatedQuestions)
    setQuizStarted(true)
  }

  const handleReset = () => {
    setQuizStarted(false)
    setQuestions([])
    setTopic('')
    setGrade('')
  }

  if (!quizStarted) {
    return <QuizSetup onStartQuiz={handleStartQuiz} />
  }

  return (
    <QuizCard 
      questions={questions} 
      topic={topic}
      grade={grade}
      onReset={handleReset}
    />
  )
}

export default Index
