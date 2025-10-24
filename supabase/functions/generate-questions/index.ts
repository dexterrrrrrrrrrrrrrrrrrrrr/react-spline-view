import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, grade } = await req.json();
    
    if (!topic || !grade) {
      return new Response(
        JSON.stringify({ error: 'Topic and grade are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are a friendly AI tutor for students from grade 5 to 12. Generate exactly 10 multiple-choice questions (MCQs) on the requested topic for the specified grade level.

For each question, provide:
1. A clear question appropriate for the grade level
2. Four options labeled A, B, C, D
3. The correct answer (just the letter: A, B, C, or D)
4. A simple, age-appropriate explanation

Keep language simple, conceptual, and appropriate for the student's grade.

Return the response as a JSON array with this exact structure:
[
  {
    "id": 1,
    "question": "Question text here?",
    "options": [
      { "label": "A", "text": "Option A text" },
      { "label": "B", "text": "Option B text" },
      { "label": "C", "text": "Option C text" },
      { "label": "D", "text": "Option D text" }
    ],
    "correctAnswer": "B",
    "explanation": "Explanation text here"
  }
]`;

    const userPrompt = `Generate 10 multiple-choice questions about "${topic}" suitable for Grade ${grade} students. Make sure the questions are relevant to the topic and appropriate for the grade level.`;

    console.log('Calling Lovable AI for topic:', topic, 'grade:', grade);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires additional credits.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to generate questions' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('AI Response received');
    
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI service' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let questions;
    try {
      const parsed = JSON.parse(content);
      // Handle both array and object with questions property
      questions = Array.isArray(parsed) ? parsed : parsed.questions;
      
      if (!Array.isArray(questions) || questions.length === 0) {
        console.error('Invalid questions format:', parsed);
        return new Response(
          JSON.stringify({ error: 'Invalid questions format from AI' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Successfully generated', questions.length, 'questions');

    return new Response(
      JSON.stringify({ questions }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in generate-questions function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
