import React, { useState } from 'react';
import { BookOpen, Sparkles, GraduationCap, ShieldCheck, Bookmark, HelpCircle, CheckCircle2, RotateCcw, ArrowRight, Lightbulb, ExternalLink, HelpCircle as HelpIcon, FileEdit, Award } from 'lucide-react';
import { Citation, LearningMode } from '../types';
import { INTRO_LESSON_DATA } from '../data/introLessonData';
import { StorageService } from '../services/storageService';
import { AnalyticsService } from '../services/analyticsService';

interface IntroLessonViewProps {
  learningMode: LearningMode;
  setLearningMode: (mode: LearningMode) => void;
  onViewCitation: (citation: Citation) => void;
  onOpenNoteDrawer: () => void;
  onOpenAiAssistant: () => void;
  onNavigateToWritingStudio: () => void;
}

export const IntroLessonView: React.FC<IntroLessonViewProps> = ({
  learningMode,
  setLearningMode,
  onViewCitation,
  onOpenNoteDrawer,
  onOpenAiAssistant,
  onNavigateToWritingStudio,
}) => {
  const lesson = INTRO_LESSON_DATA;

  // Flashcards state
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleOptionSelect = (qId: string, optIdx: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleQuizSubmit = () => {
    setSubmittedQuiz(true);
    let correct = 0;
    lesson.quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correct++;
    });

    const user = StorageService.getUser();
    StorageService.addReviewAttempt({
      userId: user.id,
      lessonId: lesson.id,
      type: 'quiz',
      score: correct,
      maxScore: lesson.quizQuestions.length,
      confidence: correct === lesson.quizQuestions.length ? 'high' : 'medium'
    });

    AnalyticsService.logActivity(
      user.id,
      user.name,
      'quiz_completed',
      `Completed Chapter 1 Concept Quiz (Score: ${correct}/${lesson.quizQuestions.length})`,
      { score: correct, total: lesson.quizQuestions.length }
    );
  };

  const activeFlashcard = lesson.flashcards[currentCardIdx];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-r from-pink-700 via-rose-700 to-pink-800 text-white p-6 sm:p-10 rounded-3xl shadow-pink-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="bg-pink-100 text-pink-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              FEATURED COMPLETE LESSON
            </span>
            <span className="text-xs text-pink-200 font-mono">
              Gillian Lazar (1993) • {lesson.pageRange}
            </span>
          </div>

          {/* Quick Action Drawer Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenNoteDrawer}
              className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center space-x-1.5 backdrop-blur-sm border border-white/20 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-pink-200" />
              <span>Add Private Note</span>
            </button>
            <button
              onClick={onOpenAiAssistant}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-amber-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-sm hover:bg-amber-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Bot</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight">
          {lesson.title}
        </h1>
        <p className="text-sm sm:text-base text-pink-100 max-w-3xl font-sans">
          {lesson.subtitle} — Est. Study Time: {lesson.estimatedMinutes} mins
        </p>

        {/* Mode Switcher Pill Banner */}
        <div className="pt-2 flex items-center justify-between bg-black/20 p-3 rounded-2xl border border-white/10 flex-wrap gap-3">
          <div className="flex items-center space-x-2 text-xs text-pink-100 font-medium">
            <span>Reading View Mode:</span>
            <span className="font-bold text-white uppercase">{learningMode} English</span>
          </div>

          <div className="flex items-center bg-white/20 p-1 rounded-xl">
            <button
              onClick={() => setLearningMode('plain')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                learningMode === 'plain'
                  ? 'bg-white text-pink-900 shadow-sm'
                  : 'text-pink-100 hover:text-white'
              }`}
            >
              Plain English Mode
            </button>
            <button
              onClick={() => setLearningMode('academic')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                learningMode === 'academic'
                  ? 'bg-pink-900 text-white shadow-sm'
                  : 'text-pink-100 hover:text-white'
              }`}
            >
              Academic English Mode
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: Dual-Mode Lesson Explanations */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-pink-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center">
            <BookOpen className="w-5 h-5 text-pink-600 mr-2" />
            1. Core Lesson Content ({learningMode === 'academic' ? 'Academic English' : 'Plain English'})
          </h2>
          <span className="text-xs text-pink-700 font-semibold bg-pink-100 px-3 py-1 rounded-full">
            Lazar (1993) Chapter 1 Breakdown
          </span>
        </div>

        {/* Plain English Render */}
        {learningMode === 'plain' ? (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-pink-50 border border-pink-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center">
                <Sparkles className="w-4 h-4 text-pink-600 mr-2" />
                Lesson Summary (Plain English)
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {lesson.plainEnglish.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lesson.plainEnglish.coreConcepts.map((concept, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-pink-200 shadow-sm space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 font-serif">
                    {concept.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {concept.explanation}
                  </p>
                  <div className="pt-2 border-t border-pink-100">
                    <p className="text-[11px] font-semibold text-pink-700 flex items-start">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mr-1 mt-0.5" />
                      Tip: {concept.practicalTip}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200 space-y-2 text-slate-800">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 flex items-center">
                <CheckCircle2 className="w-4 h-4 text-amber-600 mr-1.5" />
                Practical Classroom Scenario Example
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic">
                {lesson.plainEnglish.realWorldScenario}
              </p>
            </div>
          </div>
        ) : (
          /* Academic English Render */
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 text-pink-50 border border-slate-800 space-y-3 shadow-lg">
              <h3 className="font-bold text-pink-300 text-base flex items-center font-serif">
                <GraduationCap className="w-5 h-5 text-pink-400 mr-2" />
                Scholarly Abstract & Theoretical Position
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-pink-100 font-sans">
                {lesson.academicEnglish.abstract}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900 font-serif">
                Taxonomy of Pedagogical Paradigms (Lazar 1993, pp. 5–14)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lesson.academicEnglish.theoreticalFrameworks.map((fw, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-white border border-pink-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-slate-900 font-serif">
                        {fw.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {fw.analysis}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-pink-100 space-y-2">
                      <p className="text-[11px] font-bold text-slate-500">Verified Page Citations:</p>
                      {fw.citations.map((cit, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => onViewCitation(cit)}
                          className="w-full text-left bg-pink-50 hover:bg-pink-100 p-2.5 rounded-xl border border-pink-200 transition-colors flex items-center justify-between text-xs"
                        >
                          <span className="font-bold text-pink-800">
                            Lazar (1993) Page {cit.pageNumber}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-pink-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-pink-50 border border-pink-200 text-xs text-pink-950 font-medium">
              <strong className="font-bold text-pink-800">Pedagogical Synthesis:</strong> {lesson.academicEnglish.pedagogicalImplications}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: Verified Source References Carousel/List */}
      <div className="space-y-4 bg-white p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-pink-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mr-2" />
              Verified Page Citations & Textbook Excerpts
            </h2>
            <p className="text-xs text-slate-500">
              Authenticated chunks from Gillian Lazar (1993) Cambridge original edition
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
            5 Verified Passages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lesson.verifiedCitations.map((cit, idx) => (
            <div
              key={idx}
              onClick={() => onViewCitation(cit)}
              className="p-4 rounded-2xl bg-pink-50/50 hover:bg-pink-100/60 border border-pink-200 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-pink-800 bg-white px-2 py-0.5 rounded border border-pink-200">
                  Page {cit.pageNumber}
                </span>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-pink-600">
                  Click to View Full Hash →
                </span>
              </div>
              <p className="text-xs text-slate-700 italic font-serif line-clamp-3">
                "{cit.excerpt}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: Interactive Review Activity A - Active Recall Flashcards */}
      <div className="space-y-4 bg-gradient-to-br from-pink-50 to-rose-50 p-6 sm:p-8 rounded-3xl border border-pink-300 shadow-pink-soft">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-pink-700 bg-white px-2.5 py-1 rounded-full border border-pink-200 uppercase tracking-wider">
              REVIEW ACTIVITY A
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-serif mt-1">
              Active Recall Flashcards ({currentCardIdx + 1}/{lesson.flashcards.length})
            </h2>
          </div>
          <button
            onClick={() => {
              setIsFlipped(false);
              setCurrentCardIdx((currentCardIdx + 1) % lesson.flashcards.length);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-pink-100 text-pink-800 text-xs font-bold border border-pink-200 transition-colors"
          >
            Next Card →
          </button>
        </div>

        {/* Flashcard Component */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="min-h-[220px] p-8 rounded-3xl bg-white border-2 border-pink-300 shadow-md cursor-pointer flex flex-col justify-between items-center text-center transition-all hover:scale-[1.01]"
        >
          <span className="text-[11px] font-mono font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            {activeFlashcard.academicTerm} • Click Card to {isFlipped ? 'Show Question' : 'Flip Answer'}
          </span>

          <div className="my-auto py-4 max-w-xl">
            {isFlipped ? (
              <div className="space-y-2 animate-in fade-in duration-200">
                <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">Answer Breakdown</span>
                <p className="text-sm sm:text-base text-slate-900 font-serif leading-relaxed">
                  {activeFlashcard.back}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-pink-500 tracking-wider">Flashcard Prompt</span>
                <p className="text-base sm:text-lg text-slate-900 font-bold font-serif leading-relaxed">
                  {activeFlashcard.front}
                </p>
              </div>
            )}
          </div>

          <div className="text-xs text-slate-400 font-medium">
            {isFlipped ? '💡 Self-Assessment: Rate how well you recalled this concept' : 'Tap to reveal full answer'}
          </div>
        </div>
      </div>

      {/* SECTION 4: Interactive Review Activity B - Concept Mastery Quiz */}
      <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-sm">
        <div className="flex items-center justify-between border-b border-pink-100 pb-3">
          <div>
            <span className="text-[11px] font-bold text-pink-700 bg-pink-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              REVIEW ACTIVITY B
            </span>
            <h2 className="text-xl font-bold text-slate-900 font-serif mt-1">
              Chapter 1 Concept Mastery Quiz
            </h2>
          </div>
          {submittedQuiz && (
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
              Attempt Saved to Analytics
            </span>
          )}
        </div>

        <div className="space-y-6">
          {lesson.quizQuestions.map((q, idx) => (
            <div key={q.id} className="p-5 rounded-2xl bg-pink-50/40 border border-pink-200 space-y-3">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 font-serif">
                {idx + 1}. {q.question}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[q.id] === optIdx;
                  const isCorrect = optIdx === q.correctIndex;
                  let btnStyle = 'bg-white text-slate-800 border-pink-200 hover:border-pink-400';

                  if (submittedQuiz) {
                    if (isCorrect) btnStyle = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold';
                    else if (isSelected) btnStyle = 'bg-red-100 text-red-950 border-red-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-pink-600 text-white border-pink-600 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(q.id, optIdx)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submittedQuiz && (
                <div className="p-3.5 rounded-xl bg-white border border-pink-200 text-xs space-y-1">
                  <p className="font-bold text-pink-800">
                    Explanation: {q.explanation}
                  </p>
                  <p className="text-slate-500 font-mono text-[11px]">
                    Verified Source: Gillian Lazar (1993), Page {q.citedPage}
                  </p>
                </div>
              )}
            </div>
          ))}

          {!submittedQuiz ? (
            <button
              onClick={handleQuizSubmit}
              disabled={Object.keys(selectedAnswers).length < lesson.quizQuestions.length}
              className="w-full py-3.5 rounded-2xl bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-extrabold text-sm shadow-md transition-colors"
            >
              Submit Quiz & Record Score
            </button>
          ) : (
            <button
              onClick={() => {
                setSubmittedQuiz(false);
                setSelectedAnswers({});
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-pink-200 font-bold text-xs flex items-center space-x-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          )}
        </div>
      </div>

      {/* SECTION 5: Interactive Review Activity C - Master's Academic Essay Practice */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="bg-pink-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            REVIEW ACTIVITY C: WRITING STUDIO
          </span>
          <span className="text-xs text-pink-300 font-mono">
            Academic Essay Outline Generator
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold font-serif text-pink-200">
          {lesson.writingPrompt.title}
        </h2>
        <p className="text-xs sm:text-sm text-pink-100 leading-relaxed font-sans">
          {lesson.writingPrompt.description}
        </p>

        <div className="space-y-2 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-xs">
          <h4 className="font-bold text-pink-300 uppercase tracking-wider">Suggested Essay Outline:</h4>
          <ul className="space-y-1 text-slate-300 list-disc pl-4 font-mono">
            {lesson.writingPrompt.suggestedOutline.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {lesson.writingPrompt.academicKeywords.map((kw, idx) => (
              <span key={idx} className="bg-pink-950 text-pink-300 border border-pink-800 text-[10px] px-2 py-0.5 rounded font-mono">
                #{kw}
              </span>
            ))}
          </div>

          <button
            onClick={onNavigateToWritingStudio}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs flex items-center space-x-2 shadow-lg transition-transform hover:scale-105"
          >
            <FileEdit className="w-4 h-4" />
            <span>Open in Writing Studio Drafts →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
