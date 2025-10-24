import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Sparkles, Loader2 } from 'lucide-react'
import { Question } from './QuizCard'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface QuizSetupProps {
  onStartQuiz: (topic: string, grade: string, questions: Question[]) => void
}

export function QuizSetup({ onStartQuiz }: QuizSetupProps) {
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (topic && grade) {
      setIsLoading(true)
      
      try {
        const { data, error } = await supabase.functions.invoke('generate-questions', {
          body: { topic, grade }
        })

        if (error) {
          console.error('Error generating questions:', error)
          toast({
            title: 'Error',
            description: 'Failed to generate questions. Please try again.',
            variant: 'destructive'
          })
          return
        }

        if (!data?.questions || !Array.isArray(data.questions)) {
          toast({
            title: 'Error',
            description: 'Invalid response from server. Please try again.',
            variant: 'destructive'
          })
          return
        }

        onStartQuiz(topic, grade, data.questions)
      } catch (err) {
        console.error('Unexpected error:', err)
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Card className="w-full max-w-lg shadow-[var(--shadow-card)] border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-secondary">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            AI Quiz Tutor
          </CardTitle>
          <CardDescription className="text-base">
            Learn smarter with personalized quizzes for grades 5-12
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-sm font-medium">
                What do you want to learn about?
              </Label>
              <Input
                id="topic"
                placeholder="e.g., Photosynthesis, Algebra, World War II"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="h-12 text-base border-2 focus-visible:ring-primary transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade" className="text-sm font-medium">
                Select your grade
              </Label>
              <Select value={grade} onValueChange={setGrade} required>
                <SelectTrigger className="h-12 text-base border-2">
                  <SelectValue placeholder="Choose your grade" />
                </SelectTrigger>
                <SelectContent>
                  {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                    <SelectItem key={g} value={g.toString()}>
                      Grade {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-[1.02]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Quiz
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
