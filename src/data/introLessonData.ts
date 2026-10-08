import { LessonContent } from '../types';

export const INTRO_LESSON_DATA: LessonContent = {
  id: 'intro',
  chapterId: 'intro',
  title: 'Chapter 1: Using Literature in the Language Classroom: Reasons and Approaches',
  subtitle: 'Master\'s Foundations in ELT Literature Pedagogy',
  pageRange: 'Pages 1–22',
  estimatedMinutes: 25,

  // Dual-mode content
  plainEnglish: {
    summary: 'Why do we bring literature into English language classes? In simple terms, literature gives students real, meaningful English to read, talk about, and reflect on—rather than just repetitive grammar rules or artificial dialogs. Gillian Lazar breaks down why we use literature into 3 key reasons and shows us 3 practical ways to teach it.',
    coreConcepts: [
      {
        title: '1. High Student Motivation & Emotional Connection',
        explanation: 'Literary texts deal with fundamental human struggles—love, loss, courage, identity. When students care about the story, they naturally focus on understanding the English language behind it.',
        practicalTip: 'Choose short stories or poems that connect to your students\' real life struggles or current interests.'
      },
      {
        title: '2. Exposure to Authentic, Natural Language',
        explanation: 'Language in literature isn\'t artificially created just to teach a grammar point. Students encounter rich vocabulary, varied sentence lengths, and natural rhythm.',
        practicalTip: 'Use short literary excerpts to show how real authors break rigid grammar rules for artistic effect.'
      },
      {
        title: '3. Cultural and Personal Growth',
        explanation: 'Reading literature encourages students to step into someone else\'s shoes, building empathy, cross-cultural understanding, and critical thinking skills.',
        practicalTip: 'Ask open-ended personal opinion questions like "What would you do if you were in the main character\'s situation?"'
      }
    ],
    realWorldScenario: 'Scenario: A secondary school teacher in Hanoi notices students are bored with textbook grammar worksheets. She introduces a short poem by Robert Frost. Instead of lecturing about grammar, she asks students to underline action verbs and share how the poem makes them feel. Student participation instantly increases because they feel respected as active thinkers.'
  },

  academicEnglish: {
    abstract: 'Chapter 1 of Gillian Lazar\'s landmark text "Literature and Language Teaching" (1993) provides a critical pedagogical framework for integrating literary texts within Second Language Acquisition (SLA) environments. Lazar critiques purely structuralist approaches to language pedagogy, advocating for literature as an authentic medium that reconciles linguistic input, cultural literacy, and reader response.',
    theoreticalFrameworks: [
      {
        title: 'I. The Language-Based Approach (Carter & Long, 1991; Lazar, 1993)',
        analysis: 'Prioritizes stylistic and linguistic examination of the text. Students analyze syntax, lexical collocation, foregrounding, and linguistic deviance to discern how grammatical forms construct aesthetic meaning.',
        citations: [
          {
            pageNumber: 5,
            bookTitle: 'Literature and Language Teaching',
            author: 'Gillian Lazar',
            year: 1993,
            excerpt: 'The Language-based Approach emphasizes detailed analysis of stylistic and linguistic features (grammar, vocabulary, syntax) within literary texts. Learners pay close attention to how language constructs meaning, bridging language learning and literary appreciation.',
            verificationHash: 'sha256_77fa21c0099ab834'
          }
        ]
      },
      {
        title: 'II. Literature as Content / The Cultural Approach',
        analysis: 'Examines the literary text as a socio-historical document. Focuses on authorial biography, historical background, political context, and ideological values embedded within the work.',
        citations: [
          {
            pageNumber: 8,
            bookTitle: 'Literature and Language Teaching',
            author: 'Gillian Lazar',
            year: 1993,
            excerpt: 'Literature as Content (or the Cultural Approach) views literary texts as historical and cultural artifacts. It requires learners to understand the socio-cultural context, ideological assumptions, and historical background of the text.',
            verificationHash: 'sha256_90f142c129845ad3'
          }
        ]
      },
      {
        title: 'III. The Personal Growth Approach (Rosenblatt, 1978)',
        analysis: 'Grounded in Reader-Response Theory (Louise Rosenblatt), this paradigm views reading as an aesthetic transaction. It encourages L2 learners to generate personal interpretations, aligning text themes with individual life experiences.',
        citations: [
          {
            pageNumber: 12,
            bookTitle: 'Literature and Language Teaching',
            author: 'Gillian Lazar',
            year: 1993,
            excerpt: 'The Personal Growth Approach focuses on helping learners relate literary texts to their own personal experiences, values, and emotions. Drawing from Reader-Response Theory (Rosenblatt), it aims to make literature personally transformative for the student.',
            verificationHash: 'sha256_661bc89a7102e33a'
          }
        ]
      }
    ],
    pedagogicalImplications: 'Effective ELT pedagogy avoids relying exclusively on any single approach. Master\'s level practitioners are encouraged to integrate linguistic scaffolding (Language-based) with contextual grounding (Cultural) and student-centered discussion (Personal Growth).'
  },

  verifiedCitations: [
    {
      pageNumber: 1,
      bookTitle: 'Literature and Language Teaching: A Guide for Teachers and Trainers',
      author: 'Gillian Lazar',
      year: 1993,
      excerpt: 'Literature provides a rich context in which language is used in an authentic, meaningful way. Using literature in the ELT classroom encourages language acquisition through exposure to complex, varied linguistic structures and cultural nuances.',
      verificationHash: 'sha256_e9a184f9821a0091'
    },
    {
      pageNumber: 3,
      bookTitle: 'Literature and Language Teaching: A Guide for Teachers and Trainers',
      author: 'Gillian Lazar',
      year: 1993,
      excerpt: 'One of the primary reasons for introducing literary texts is motivation. Literature deals with themes that touch upon universal human experiences—love, conflict, identity, survival—which spark genuine personal involvement and affective responses from learners.',
      verificationHash: 'sha256_b720091c440a1122'
    },
    {
      pageNumber: 5,
      bookTitle: 'Literature and Language Teaching: A Guide for Teachers and Trainers',
      author: 'Gillian Lazar',
      year: 1993,
      excerpt: 'The Language-based Approach emphasizes detailed analysis of stylistic and linguistic features (grammar, vocabulary, syntax) within literary texts. Learners pay close attention to how language constructs meaning, bridging language learning and literary appreciation.',
      verificationHash: 'sha256_77fa21c0099ab834'
    },
    {
      pageNumber: 8,
      bookTitle: 'Literature and Language Teaching: A Guide for Teachers and Trainers',
      author: 'Gillian Lazar',
      year: 1993,
      excerpt: 'Literature as Content (or the Cultural Approach) views literary texts as historical and cultural artifacts. It requires learners to understand the socio-cultural context, ideological assumptions, and historical background of the text.',
      verificationHash: 'sha256_90f142c129845ad3'
    },
    {
      pageNumber: 12,
      bookTitle: 'Literature and Language Teaching: A Guide for Teachers and Trainers',
      author: 'Gillian Lazar',
      year: 1993,
      excerpt: 'The Personal Growth Approach focuses on helping learners relate literary texts to their own personal experiences, values, and emotions. Drawing from Reader-Response Theory (Rosenblatt), it aims to make literature personally transformative for the student.',
      verificationHash: 'sha256_661bc89a7102e33a'
    }
  ],

  flashcards: [
    {
      id: 'card-1',
      front: 'What is the Language-Based Approach in ELT literature teaching?',
      back: 'An approach focusing on detailed analysis of stylistic and linguistic features (grammar, vocabulary, syntax) to show how language creates meaning.',
      academicTerm: 'Stylistic Analysis & Scaffolding'
    },
    {
      id: 'card-2',
      front: 'What is the Cultural Approach (Literature as Content)?',
      back: 'An approach treating literary texts as socio-historical artifacts, requiring students to study historical context, author background, and cultural values.',
      academicTerm: 'Cultural & Historical Contextualization'
    },
    {
      id: 'card-3',
      front: 'What is the Personal Growth Approach?',
      back: 'An approach based on Reader-Response Theory, helping students relate literary themes to their personal lives, values, and emotional experiences.',
      academicTerm: 'Reader-Response Transaction'
    },
    {
      id: 'card-4',
      front: 'According to Lazar (1993, p. 3), what is the key affective benefit of literature?',
      back: 'High motivation stemming from universal human themes (conflict, love, identity) that generate genuine personal involvement.',
      academicTerm: 'Affective Engagement'
    }
  ],

  quizQuestions: [
    {
      id: 'q1',
      question: 'Which teaching approach in Lazar (1993, p. 5) focuses primarily on student analysis of vocabulary patterns, syntactic choices, and stylistic devices?',
      options: [
        'A. The Personal Growth Approach',
        'B. The Language-Based Approach',
        'C. The Literature as Content (Cultural) Approach',
        'D. The Structural Grammar Drill Approach'
      ],
      correctIndex: 1,
      explanation: 'The Language-Based Approach explicitly uses linguistic and stylistic tools to examine how text structures create literary meaning.',
      citedPage: 5
    },
    {
      id: 'q2',
      question: 'According to Reader-Response Theory incorporated into the Personal Growth Approach (Lazar p. 12), what is the primary role of the student reader?',
      options: [
        'A. To passively memorize the author\'s biography',
        'B. To generate personal interpretations by connecting text themes with their own life experiences',
        'C. To count the number of irregular verbs in each stanza',
        'D. To translate the passage word-for-word into their native language'
      ],
      correctIndex: 1,
      explanation: 'Reader-Response Theory treats reading as an active transaction where the reader\'s personal background shapes textual interpretation.',
      citedPage: 12
    },
    {
      id: 'q3',
      question: 'What potential drawback does Lazar (1993, p. 8) note regarding relying exclusively on the Literature as Content (Cultural) Approach?',
      options: [
        'A. Students might spend all their time studying historical lectures rather than engaging directly with the language of the text',
        'B. Literature contains no cultural information',
        'C. Poems are too short to have cultural background',
        'D. It requires no teacher preparation'
      ],
      correctIndex: 0,
      explanation: 'Over-reliance on the Cultural Approach can transform language class into a teacher-centered history lecture, reducing active student language use.',
      citedPage: 8
    }
  ],

  writingPrompt: {
    id: 'prompt-ch1',
    title: 'Master\'s Academic Essay Prompt: Evaluating Pedagogical Approaches',
    description: 'Critically evaluate how a secondary ELT teacher in Vietnam can integrate the Language-Based Approach and the Personal Growth Approach when teaching short stories. Cite Gillian Lazar (1993, pp. 5-14) to support your arguments.',
    suggestedOutline: [
      '1. Introduction: Define literature pedagogy in ELT and state your thesis statement.',
      '2. Theoretical Analysis: Synthesize the Language-Based Approach (Lazar p. 5) and its benefits for L2 vocabulary/grammar acquisition.',
      '3. Affective Dimension: Examine the Personal Growth Approach (Lazar p. 12) through Louise Rosenblatt\'s Reader-Response framework.',
      '4. Practical Pedagogical Integration: Propose a sample 45-minute lesson plan combining stylistic activities (cloze tasks, vocabulary hunting) with personal reflective discussion.',
      '5. Conclusion: Summarize how combining both approaches avoids purely structural or overly abstract teaching.'
    ],
    academicKeywords: [
      'Stylistic Analysis', 'Reader-Response Theory', 'Affective Engagement', 'Scaffolding', 'Linguistic Deviance', 'Lazar (1993)', 'Authentic Input'
    ]
  }
};
