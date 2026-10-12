import dayCareImage from "../assets/images/day-care-homepage.png";
import preNurseryImage from "../assets/images/pre-nursery-homepage.png";
import nurseryImage from "../assets/images/nursery-homepage.png";
import juniorLkgImage from "../assets/images/junior-lkg-homepage.jpg";
import seniorUkgImage from "../assets/images/senior-ukg-homepage.png";
import heroCollage1 from "../assets/images/hero-collage-1.jpeg";

export const programs = [
  {
    id: "day-care",
    title: "Day Care",
    age: "1.5 - 6 years",
    detail: "A calm, supervised care routine with creative play, rest time, personal attention, and safe daily engagement.",
    image: dayCareImage,
    highlights: [
      "Flexible hourly & full-day care routines",
      "Nutritious snack time and peaceful rest area",
      "Interactive indoor play & sensory toys",
      "Continuous caregiver supervision & hygiene standards"
    ],
    description: "Our Day Care program provides a warm, safe, and home-like atmosphere for children aged 1.5 to 6 years. Designed with working parents in mind, we offer structured play, guided resting periods, story time, and engaging activity corners. Our trained caregivers ensure personalized attention, routine hygiene, and a positive environment where every child feels nurtured."
  },
  {
    id: "pre-nursery",
    title: "Pre Nursery",
    age: "1 - 3 years",
    detail: "Gentle first-school experiences through sensory play, rhymes, stories, movement, and joyful social habits.",
    image: preNurseryImage,
    highlights: [
      "Sensory integration & fine motor activities",
      "Rhymes, music, and rhythmic movement",
      "Social sharing & gentle classroom adaptation",
      "Color, shape, and object recognition"
    ],
    description: "Pre Nursery is your child’s first step into structured group learning. We focus on gentle socialization, curiosity, motor skill development, and verbal expression. Through colorful play materials, nursery rhymes, storytelling sessions, and guided free-play, children develop confidence and joy in coming to school every day."
  },
  {
    id: "nursery",
    title: "Nursery",
    age: "3 - 4 years",
    detail: "Early literacy, number sense, fine motor work, spoken language, music, dance, and confidence-building activities.",
    image: nurseryImage,
    highlights: [
      "Phonetic sound awareness & pre-writing skills",
      "Number identification & counting games",
      "Creative arts, craft, and expressional drawing",
      "Stage exposure & verbal speech readiness"
    ],
    description: "In Nursery, children step into foundational academic concepts in a fun, pressure-free environment. We introduce early language patterns, phonics, basic mathematical concepts, and structured physical activities. Daily interactive group discussions, storytelling, and creative art sessions encourage independence, logical thinking, and clear communication."
  },
  {
    id: "junior-kg",
    title: "Junior KG / LKG",
    age: "4 - 5 years",
    detail: "Structured readiness with phonics, writing practice, number concepts, creative projects, and classroom independence.",
    image: juniorLkgImage,
    highlights: [
      "Letter formation & word blending (Phonics)",
      "Basic addition concepts & number sequencing",
      "Science exploration & environmental awareness",
      "Group collaboration & task discipline"
    ],
    description: "Our Junior KG program bridges early exploration with formal primary education readiness. Children learn structured reading, stroke-guided handwriting, basic numeracy concepts, environmental science, and public speaking confidence. Through team activities and thematic projects, kids develop strong focus and collaborative problem-solving skills."
  },
  {
    id: "senior-kg",
    title: "Senior KG / UKG",
    age: "5 - 6 years",
    detail: "Primary-school preparation with reading, writing, math confidence, stage exposure, and social skill development.",
    image: seniorUkgImage,
    highlights: [
      "Fluent reading, sentence building & creative writing",
      "Analytical math concepts & mental arithmetic readiness",
      "Public speaking, drama & stage confidence",
      "Grade 1 transition readiness"
    ],
    description: "Senior KG is the capstone of our preschool curriculum. We prepare children for a smooth transition into Grade 1 by instilling fluent reading abilities, clear sentence writing, mathematical logic, and independent study habits. Children participate in theatrical recitals, science demonstrations, and leadership roles in class."
  },
  {
    id: "evening-classes",
    title: "Evening Classes",
    age: "Skill support",
    detail: "After-school learning support for children who need extra practice, activity time, or guided revision.",
    image: heroCollage1,
    highlights: [
      "Phonics & handwriting improvement",
      "Drawing, craft & creative skill workshops",
      "Guided homework assistance",
      "Small-group personalized attention"
    ],
    description: "Our Evening Classes offer specialized skill enhancement and after-school guidance. Whether a child needs extra help in reading, handwriting, art, or homework practice, our dedicated teachers provide individual focus in a calm, encouraging environment."
  },
];
