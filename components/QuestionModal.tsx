
import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuestionModalProps {
  question: Question;
  onClose: (correct: boolean, customPoints?: number) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ question, onClose }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // For non-questions (Zonk/Bonus), show result immediately
    if (question.type !== 'question') {
      setShowResult(true);
    }
  }, [question.type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.type === 'question') {
      const isCorrect = String(answer).trim() === String(question.answer);
      setFeedback(isCorrect ? 'correct' : 'wrong');
      setShowResult(true);
    }
  };

  const handleFinish = () => {
    if (question.type === 'question') {
      onClose(feedback === 'correct');
    } else {
      onClose(true, question.points);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${showResult ? 'scale-100' : 'scale-95'}`}>
        
        {/* Header decoration */}
        <div className={`h-4 ${question.type === 'zonk' ? 'bg-red-500' : question.type === 'bonus' ? 'bg-green-500' : 'bg-blue-600'}`}></div>

        <div className="p-8 md:p-12">
          {!showResult ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-sm uppercase tracking-wider">Tantangan Matematika</span>
                <span className="text-slate-400 font-bold">+{question.points} Poin</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-800 leading-tight">
                {question.description}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  autoFocus
                  type="text"
                  placeholder="Masukkan jawabanmu..."
                  className="w-full text-3xl p-6 bg-slate-50 border-4 border-slate-200 rounded-2xl focus:border-blue-500 focus:outline-none text-center font-bold text-slate-700 transition-all"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button 
                  type="submit"
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-bold rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
                >
                  JAWAB SEKARANG!
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center space-y-6 py-4 animate-in zoom-in duration-500">
              {question.type === 'question' ? (
                <>
                  <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${feedback === 'correct' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {feedback === 'correct' ? (
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                  </div>
                  <h2 className={`text-4xl md:text-6xl font-bold ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback === 'correct' ? 'BENAR!' : 'SALAH!'}
                  </h2>
                  <p className="text-xl text-slate-600">
                    {feedback === 'correct' 
                      ? `Hebat! Kamu mendapatkan ${question.points} poin.` 
                      : `Yah... jawaban yang benar adalah ${question.answer}. Tetap semangat!`}
                  </p>
                </>
              ) : (
                <>
                  <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${question.type === 'bonus' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600 animate-bounce'}`}>
                    {question.type === 'bonus' ? (
                        <span className="text-6xl">🎁</span>
                    ) : (
                        <span className="text-6xl">💥</span>
                    )}
                  </div>
                  <h2 className={`text-4xl md:text-6xl font-bold ${question.type === 'bonus' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {question.title}
                  </h2>
                  <p className="text-2xl text-slate-600 font-medium">
                    {question.description}
                  </p>
                  <div className="text-3xl font-black text-slate-800">
                    {question.points > 0 ? `+${question.points}` : question.points} POIN
                  </div>
                </>
              )}
              
              <button 
                onClick={handleFinish}
                className="w-full mt-8 py-5 bg-slate-800 hover:bg-slate-900 text-white text-xl font-bold rounded-2xl shadow-xl transition-all active:scale-95"
              >
                LANJUTKAN GAME
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
