
import React, { useState, useMemo } from 'react';
import Box3D from './components/Box3D';
import QuestionModal from './components/QuestionModal';
import { QUESTIONS } from './data/questions';
import { GameState, Question, Group } from './types';

const GROUP_COLORS = ['bg-rose-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500'];
const GROUP_NAMES = ['Kelompok A', 'Kelompok B', 'Kelompok C', 'Kelompok D'];

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    groups: [],
    currentGroupIndex: 0,
    openedBoxes: [],
    currentQuestion: null,
    status: 'setup',
    maxTurnsPerGroup: 6
  });

  const setupGame = (numGroups: number) => {
    const initialGroups: Group[] = Array.from({ length: numGroups }, (_, i) => ({
      id: i,
      name: GROUP_NAMES[i],
      score: 0,
      turnsUsed: 0,
      color: GROUP_COLORS[i]
    }));

    setState(prev => ({
      ...prev,
      groups: initialGroups,
      status: 'playing',
      openedBoxes: [],
      currentGroupIndex: 0
    }));
  };

  const handleOpenBox = (question: Question) => {
    if (state.status !== 'playing') return;
    if (state.openedBoxes.includes(question.id)) return;
    
    setState(prev => ({
      ...prev,
      currentQuestion: question
    }));
  };

  const handleCloseModal = (correct: boolean, customPoints?: number) => {
    if (!state.currentQuestion) return;

    const pointsToAdd = customPoints !== undefined 
      ? customPoints 
      : (correct ? state.currentQuestion.points : 0);

    const updatedGroups = [...state.groups];
    const currentGroup = updatedGroups[state.currentGroupIndex];
    
    currentGroup.score += pointsToAdd;
    currentGroup.turnsUsed += 1;

    const newOpenedBoxes = [...state.openedBoxes, state.currentQuestion.id];
    
    // Check if all groups have finished their turns
    const allFinished = updatedGroups.every(g => g.turnsUsed >= state.maxTurnsPerGroup);
    
    // Find next group that still has turns
    let nextGroupIndex = (state.currentGroupIndex + 1) % state.groups.length;
    let loops = 0;
    while (updatedGroups[nextGroupIndex].turnsUsed >= state.maxTurnsPerGroup && loops < state.groups.length) {
      nextGroupIndex = (nextGroupIndex + 1) % state.groups.length;
      loops++;
    }

    setState(prev => ({
      ...prev,
      groups: updatedGroups,
      openedBoxes: newOpenedBoxes,
      currentQuestion: null,
      currentGroupIndex: nextGroupIndex,
      status: allFinished ? 'gameover' : 'playing'
    }));
  };

  const winners = useMemo(() => {
    if (state.status !== 'gameover') return [];
    const maxScore = Math.max(...state.groups.map(g => g.score));
    return state.groups.filter(g => g.score === maxScore);
  }, [state.groups, state.status]);

  if (state.status === 'setup') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-2xl text-center space-y-8 animate-in zoom-in duration-500">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
              Persiapan Game
            </h1>
            <p className="text-blue-400 font-bold tracking-widest uppercase text-sm">Pilih Jumlah Kelompok</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {[2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => setupGame(num)}
                className="group relative overflow-hidden bg-slate-800 hover:bg-blue-600 p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/5"
              >
                <div className="text-4xl font-black text-white">{num}</div>
                <div className="text-[10px] text-slate-400 group-hover:text-blue-100 font-bold uppercase mt-1">Kelompok</div>
              </button>
            ))}
          </div>

          <div className="p-6 bg-black/30 rounded-2xl border border-white/5 text-left space-y-2">
            <h4 className="text-yellow-500 font-bold uppercase text-xs">Aturan Main:</h4>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>• Tiap kelompok bergantian memilih kotak.</li>
              <li>• Jatah menjawab tiap kelompok: <b>6 kali</b>.</li>
              <li>• Poin tertinggi di akhir jatah akan menang!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const activeGroup = state.groups[state.currentGroupIndex];

  return (
    <div className="min-h-screen text-slate-100 flex flex-col items-center">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-slate-950">
        <div className="absolute top-1/4 -left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-7xl px-4 py-8">
        {/* Leaderboard & Turn Status */}
        <header className="sticky top-4 z-40 space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center">
            {state.groups.map((group, idx) => (
              <div 
                key={group.id}
                className={`flex-1 transition-all duration-500 p-4 rounded-3xl border-2 flex flex-col items-center relative overflow-hidden ${
                  state.currentGroupIndex === idx 
                    ? `${group.color} border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-105 z-10` 
                    : 'bg-slate-900/80 border-white/5 opacity-80'
                }`}
              >
                {state.currentGroupIndex === idx && (
                  <div className="absolute top-2 right-3 animate-bounce">
                    <span className="bg-white text-slate-900 px-2 py-0.5 rounded-full text-[10px] font-black uppercase">GILIRANMU!</span>
                  </div>
                )}
                <span className={`text-[10px] font-black uppercase tracking-widest ${state.currentGroupIndex === idx ? 'text-white/70' : 'text-slate-500'}`}>
                  {group.name}
                </span>
                <div className="text-3xl font-black tabular-nums">{group.score}</div>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: state.maxTurnsPerGroup }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-4 rounded-full ${i < group.turnsUsed ? 'bg-white/90' : 'bg-white/20'}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center py-2">
             <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-slate-300 font-bold uppercase tracking-widest text-xs">
                <span>Total Kotak Terbuka: {state.openedBoxes.length}</span>
                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                <span>Max Giliran: {state.maxTurnsPerGroup}x per tim</span>
             </div>
          </div>
        </header>

        {/* Grid Area */}
        <main className="pb-32">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 place-items-center">
            {QUESTIONS.map((q) => (
              <Box3D 
                key={q.id}
                id={q.id}
                isOpen={state.currentQuestion?.id === q.id}
                isCompleted={state.openedBoxes.includes(q.id)}
                onClick={() => handleOpenBox(q)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Floating Action Hint */}
      {state.status === 'playing' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className={`px-10 py-4 rounded-full border-2 border-white/20 shadow-2xl text-white font-black text-xl tracking-tight flex items-center gap-4 animate-bounce ${activeGroup.color}`}>
               <span>{activeGroup.name}, SILAHKAN PILIH KOTAK!</span>
            </div>
        </div>
      )}

      {/* Question Modal */}
      {state.currentQuestion && (
        <QuestionModal 
          question={state.currentQuestion}
          onClose={handleCloseModal}
        />
      )}

      {/* Game Over Screen */}
      {state.status === 'gameover' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/98 backdrop-blur-2xl p-4 animate-in fade-in duration-500">
           <div className="text-center p-8 md:p-12 max-w-2xl w-full bg-slate-900 rounded-[3rem] border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <div className="space-y-2">
                <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter">FINISH!</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest">Pertandingan Berakhir</p>
              </div>

              <div className="grid gap-4">
                {state.groups.sort((a,b) => b.score - a.score).map((g, idx) => {
                  const isWinner = winners.some(w => w.id === g.id);
                  return (
                    <div key={g.id} className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all ${isWinner ? `${g.color} border-white scale-105 shadow-xl` : 'bg-black/20 border-white/5 opacity-60'}`}>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-black text-white/50">#{idx + 1}</span>
                        <div className="text-left">
                          <p className="font-black text-2xl text-white uppercase italic">{g.name}</p>
                          <p className="text-xs font-bold text-white/60">Tuntas 6 Giliran</p>
                        </div>
                      </div>
                      <div className="text-4xl font-black text-white">{g.score}</div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => setState(prev => ({ ...prev, status: 'setup' }))}
                className="w-full py-6 bg-white text-slate-900 text-2xl font-black rounded-[2rem] hover:bg-slate-200 transition-all active:scale-95 uppercase tracking-tighter italic"
              >
                MULAI PERTANDINGAN BARU
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
