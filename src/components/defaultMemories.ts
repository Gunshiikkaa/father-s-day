export interface MemoryItem {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  category: string;
}

export const defaultMemories: MemoryItem[] = [
  // Row 1: Childhood Adventures
  {
    id: "childhood-1",
    category: "Childhood Adventures",
    title: "Learning to Ride",
    year: "2008",
    description: "Holding onto the seat, running behind me, and letting go. That was the day I learned to fly.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "childhood-2",
    category: "Childhood Adventures",
    title: "Campfire Chronicles",
    year: "2010",
    description: "Under a canopy of stars, listening to you spin tales of old adventures by the crackling fire.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "childhood-3",
    category: "Childhood Adventures",
    title: "Catching the First Fish",
    year: "2009",
    description: "Patiently showing me how to cast. The look of pure pride on your face was bigger than the catch.",
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=600&auto=format&fit=crop&q=80",
  },

  // Row 2: Dad's Best Lessons
  {
    id: "lessons-1",
    category: "Dad's Best Lessons",
    title: "The Art of Honesty",
    year: "2012",
    description: "When you showed me that doing the right thing, even when no one is looking, defines your true character.",
    image: "https://images.unsplash.com/photo-1490260400179-d656f04de422?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "lessons-2",
    category: "Dad's Best Lessons",
    title: "Unwavering Work Ethic",
    year: "2014",
    description: "Watching you wake up early every day, never complaining, always putting our family's dreams first.",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "lessons-3",
    category: "Dad's Best Lessons",
    title: "Rising After Failure",
    year: "2015",
    description: "Dusting me off after a tough defeat and saying: 'Winning is easy, but how we rise defines us.'",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80",
  },

  // Row 3: Family Vacations
  {
    id: "vacations-1",
    category: "Family Vacations",
    title: "The Endless Road Trip",
    year: "2011",
    description: "Driving across the country with a trunk full of snacks, singing along to classic rock tunes.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "vacations-2",
    category: "Family Vacations",
    title: "Summiting the Peak",
    year: "2013",
    description: "Pushing each other to reach the mountain peak. The hike was tough, but the view was unforgettable.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "vacations-3",
    category: "Family Vacations",
    title: "Sunset Shorelines",
    year: "2016",
    description: "Splashing in the waves all afternoon and watching the golden sun melt into the ocean together.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
  },

  // Row 4: Funny Dad Moments
  {
    id: "funny-1",
    category: "Funny Dad Moments",
    title: "The BBQ Smoke Out",
    year: "2017",
    description: "Trying to grill the perfect ribeye, setting off every alarm, and ending up laughing over delivery pizza.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "funny-2",
    category: "Funny Dad Moments",
    title: "The Groan-Worthy Jokes",
    year: "2018",
    description: "Cracking puns at the family dinner table that make everyone roll their eyes but ultimately smile.",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "funny-3",
    category: "Funny Dad Moments",
    title: "Retro Dance Moves",
    year: "2019",
    description: "Breaking out hilarious 80s choreography at a wedding reception, completely off-beat but full of spirit.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
  },

  // Row 5: Life's Greatest Hero
  {
    id: "hero-1",
    category: "Life's Greatest Hero",
    title: "My Protective Shield",
    year: "2015",
    description: "Being my shield when hard times came, teaching me how to stand up and face the storm.",
    image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "hero-2",
    category: "Life's Greatest Hero",
    title: "Late-Night Math tutor",
    year: "2016",
    description: "Staying up until 2 AM to help me with calculus homework, even when you had to open the shop at 6 AM.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "hero-3",
    category: "Life's Greatest Hero",
    title: "The Silent Anchor",
    year: "2020",
    description: "A tight, quiet hug when I felt lost, whispering without words that everything would be alright.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
  },

  // Row 6: Dad's Greatest Achievements
  {
    id: "achieve-1",
    category: "Dad's Greatest Achievements",
    title: "Tears at Graduation",
    year: "2021",
    description: "The pride in your eyes and the catch in your throat when they called my name. That success was yours.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "achieve-2",
    category: "Dad's Greatest Achievements",
    title: "The Backyard Fortress",
    year: "2011",
    description: "Building the world's best treehouse with your own hands, showing me how to measure twice and cut once.",
    image: "https://images.unsplash.com/photo-1602030028438-4cf153cabb9e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "achieve-3",
    category: "Dad's Greatest Achievements",
    title: "Golden Years of Devotion",
    year: "2023",
    description: "Decades of commitment and loving partnership, setting the ultimate gold standard for family unity.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&auto=format&fit=crop&q=80",
  },
];
