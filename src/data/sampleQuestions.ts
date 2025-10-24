import { Question } from '@/components/QuizCard'

export const generateSampleQuestions = (topic: string, grade: string): Question[] => {
  // Sample questions for demonstration
  // In production, this would be replaced with AI-generated questions
  
  const mathQuestions: Question[] = [
    {
      id: 1,
      question: "What is 15% of 200?",
      options: [
        { label: "A", text: "20" },
        { label: "B", text: "30" },
        { label: "C", text: "25" },
        { label: "D", text: "35" }
      ],
      correctAnswer: "B",
      explanation: "To find 15% of 200, multiply 200 by 0.15: 200 × 0.15 = 30"
    },
    {
      id: 2,
      question: "If x + 7 = 15, what is the value of x?",
      options: [
        { label: "A", text: "6" },
        { label: "B", text: "7" },
        { label: "C", text: "8" },
        { label: "D", text: "9" }
      ],
      correctAnswer: "C",
      explanation: "Subtract 7 from both sides: x + 7 - 7 = 15 - 7, so x = 8"
    },
    {
      id: 3,
      question: "What is the area of a rectangle with length 8 cm and width 5 cm?",
      options: [
        { label: "A", text: "13 cm²" },
        { label: "B", text: "26 cm²" },
        { label: "C", text: "40 cm²" },
        { label: "D", text: "45 cm²" }
      ],
      correctAnswer: "C",
      explanation: "The area of a rectangle is length × width: 8 × 5 = 40 cm²"
    },
    {
      id: 4,
      question: "Which of these numbers is a prime number?",
      options: [
        { label: "A", text: "12" },
        { label: "B", text: "15" },
        { label: "C", text: "17" },
        { label: "D", text: "18" }
      ],
      correctAnswer: "C",
      explanation: "17 is a prime number because it can only be divided by 1 and itself without a remainder."
    },
    {
      id: 5,
      question: "What is 3² + 4²?",
      options: [
        { label: "A", text: "25" },
        { label: "B", text: "24" },
        { label: "C", text: "49" },
        { label: "D", text: "12" }
      ],
      correctAnswer: "A",
      explanation: "3² = 9 and 4² = 16. Adding them together: 9 + 16 = 25"
    },
    {
      id: 6,
      question: "If a triangle has angles of 60°, 60°, and x°, what is x?",
      options: [
        { label: "A", text: "30°" },
        { label: "B", text: "45°" },
        { label: "C", text: "60°" },
        { label: "D", text: "90°" }
      ],
      correctAnswer: "C",
      explanation: "The sum of angles in a triangle is always 180°. So: 60 + 60 + x = 180, which means x = 60°"
    },
    {
      id: 7,
      question: "What is the value of 2³?",
      options: [
        { label: "A", text: "6" },
        { label: "B", text: "8" },
        { label: "C", text: "9" },
        { label: "D", text: "12" }
      ],
      correctAnswer: "B",
      explanation: "2³ means 2 × 2 × 2 = 8"
    },
    {
      id: 8,
      question: "Which fraction is equivalent to 0.75?",
      options: [
        { label: "A", text: "1/2" },
        { label: "B", text: "2/3" },
        { label: "C", text: "3/4" },
        { label: "D", text: "4/5" }
      ],
      correctAnswer: "C",
      explanation: "0.75 = 75/100 = 3/4 when simplified"
    },
    {
      id: 9,
      question: "What is the perimeter of a square with side length 6 cm?",
      options: [
        { label: "A", text: "12 cm" },
        { label: "B", text: "18 cm" },
        { label: "C", text: "24 cm" },
        { label: "D", text: "36 cm" }
      ],
      correctAnswer: "C",
      explanation: "A square has 4 equal sides, so perimeter = 4 × 6 = 24 cm"
    },
    {
      id: 10,
      question: "If y = 2x + 3 and x = 5, what is y?",
      options: [
        { label: "A", text: "10" },
        { label: "B", text: "11" },
        { label: "C", text: "13" },
        { label: "D", text: "15" }
      ],
      correctAnswer: "C",
      explanation: "Substitute x = 5 into the equation: y = 2(5) + 3 = 10 + 3 = 13"
    }
  ]

  const scienceQuestions: Question[] = [
    {
      id: 1,
      question: "What is the process by which plants make their own food?",
      options: [
        { label: "A", text: "Respiration" },
        { label: "B", text: "Photosynthesis" },
        { label: "C", text: "Digestion" },
        { label: "D", text: "Fermentation" }
      ],
      correctAnswer: "B",
      explanation: "Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar."
    },
    {
      id: 2,
      question: "What is the chemical symbol for water?",
      options: [
        { label: "A", text: "O₂" },
        { label: "B", text: "CO₂" },
        { label: "C", text: "H₂O" },
        { label: "D", text: "NaCl" }
      ],
      correctAnswer: "C",
      explanation: "Water is made up of two hydrogen atoms and one oxygen atom, giving it the chemical formula H₂O."
    },
    {
      id: 3,
      question: "Which planet is known as the Red Planet?",
      options: [
        { label: "A", text: "Venus" },
        { label: "B", text: "Mars" },
        { label: "C", text: "Jupiter" },
        { label: "D", text: "Saturn" }
      ],
      correctAnswer: "B",
      explanation: "Mars is called the Red Planet because of its reddish appearance, which is caused by iron oxide (rust) on its surface."
    },
    {
      id: 4,
      question: "What type of energy does a moving object have?",
      options: [
        { label: "A", text: "Potential energy" },
        { label: "B", text: "Kinetic energy" },
        { label: "C", text: "Thermal energy" },
        { label: "D", text: "Chemical energy" }
      ],
      correctAnswer: "B",
      explanation: "Kinetic energy is the energy of motion. Any object that is moving has kinetic energy."
    },
    {
      id: 5,
      question: "What is the smallest unit of life?",
      options: [
        { label: "A", text: "Atom" },
        { label: "B", text: "Molecule" },
        { label: "C", text: "Cell" },
        { label: "D", text: "Organ" }
      ],
      correctAnswer: "C",
      explanation: "The cell is the smallest unit of life that can function independently and perform all necessary functions of life."
    },
    {
      id: 6,
      question: "What do we call animals that eat only plants?",
      options: [
        { label: "A", text: "Carnivores" },
        { label: "B", text: "Herbivores" },
        { label: "C", text: "Omnivores" },
        { label: "D", text: "Decomposers" }
      ],
      correctAnswer: "B",
      explanation: "Herbivores are animals that eat only plants. Examples include cows, deer, and rabbits."
    },
    {
      id: 7,
      question: "At what temperature does water boil at sea level?",
      options: [
        { label: "A", text: "0°C" },
        { label: "B", text: "50°C" },
        { label: "C", text: "100°C" },
        { label: "D", text: "150°C" }
      ],
      correctAnswer: "C",
      explanation: "At sea level, water boils at 100°C (212°F). This temperature can change at different altitudes."
    },
    {
      id: 8,
      question: "What is the center of an atom called?",
      options: [
        { label: "A", text: "Electron" },
        { label: "B", text: "Proton" },
        { label: "C", text: "Neutron" },
        { label: "D", text: "Nucleus" }
      ],
      correctAnswer: "D",
      explanation: "The nucleus is the center of an atom and contains protons and neutrons. Electrons orbit around the nucleus."
    },
    {
      id: 9,
      question: "Which gas do plants absorb from the atmosphere during photosynthesis?",
      options: [
        { label: "A", text: "Oxygen" },
        { label: "B", text: "Nitrogen" },
        { label: "C", text: "Carbon dioxide" },
        { label: "D", text: "Hydrogen" }
      ],
      correctAnswer: "C",
      explanation: "Plants absorb carbon dioxide (CO₂) from the atmosphere and use it, along with water and sunlight, to make food through photosynthesis."
    },
    {
      id: 10,
      question: "What is the force that pulls objects toward the Earth?",
      options: [
        { label: "A", text: "Friction" },
        { label: "B", text: "Magnetism" },
        { label: "C", text: "Gravity" },
        { label: "D", text: "Inertia" }
      ],
      correctAnswer: "C",
      explanation: "Gravity is the force that attracts objects with mass toward each other. On Earth, gravity pulls everything toward the center of the planet."
    }
  ]

  // Return science questions if topic contains science-related keywords
  const topicLower = topic.toLowerCase()
  if (topicLower.includes('science') || topicLower.includes('biology') || 
      topicLower.includes('chemistry') || topicLower.includes('physics') ||
      topicLower.includes('photosynthesis') || topicLower.includes('cell') ||
      topicLower.includes('planet') || topicLower.includes('energy')) {
    return scienceQuestions
  }

  // Default to math questions
  return mathQuestions
}
