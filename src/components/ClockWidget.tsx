import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, BellRing, Clock, Timer, Flag, X } from 'lucide-react';
import { playNotificationSound } from '../utils/audio';

interface ClockWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClockWidget({ isOpen, onClose }: ClockWidgetProps) {
  const [activeTab, setActiveTab] = useState<'pomodoro' | 'clock' | 'stopwatch'>('pomodoro');

  // Real-time Clock state
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Pomodoro Timer state
  const [pomodoroMode, setPomodoroMode] = useState<'study' | 'shortBreak' | 'longBreak'>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pomodoroCycles, setPomodoroCycles] = useState(0);

  // Stopwatch state
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Pomodoro countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      playNotificationSound();
      setIsTimerRunning(false);
      if (pomodoroMode === 'study') {
        setPomodoroCycles((c) => c + 1);
        setPomodoroMode('shortBreak');
        setTimeLeft(5 * 60);
      } else {
        setPomodoroMode('study');
        setTimeLeft(25 * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft, pomodoroMode]);

  // Stopwatch effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStopwatchRunning]);

  const setTimerDuration = (mode: 'study' | 'shortBreak' | 'longBreak') => {
    setIsTimerRunning(false);
    setPomodoroMode(mode);
    if (mode === 'study') setTimeLeft(25 * 60);
    else if (mode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    if (pomodoroMode === 'study') setTimeLeft(25 * 60);
    else if (pomodoroMode === 'shortBreak') setTimeLeft(5 * 60);
    else setTimeLeft(15 * 60);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatStopwatch = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addLap = () => {
    if (stopwatchSeconds > 0) {
      setLaps([stopwatchSeconds, ...laps]);
    }
  };

  const resetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchSeconds(0);
    setLaps([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120a06]/85 backdrop-blur-xs" dir="rtl">
      <div className="bg-[#faf5ed] rounded-3xl border border-[#decbb7] p-6 sm:p-8 max-w-lg w-full text-[#2c190e] shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#8f5424]" />
            <h2 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-[#201007] to-[#754019] bg-clip-text text-transparent">
                لوحة توقيت جلسات البرمجة والتركيز
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7c5b43] hover:text-[#2c190e] hover:bg-[#ede0ce] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-[#ede0ce] rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('pomodoro')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'pomodoro'
                ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs'
                : 'text-[#6a4c35] hover:text-[#2c190e]'
            }`}
          >
            مؤقت بومودورو
          </button>
          <button
            onClick={() => setActiveTab('clock')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'clock'
                ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs'
                : 'text-[#6a4c35] hover:text-[#2c190e]'
            }`}
          >
            الساعة الحية
          </button>
          <button
            onClick={() => setActiveTab('stopwatch')}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'stopwatch'
                ? 'bg-[#faf5ed] text-[#2c190e] shadow-xs'
                : 'text-[#6a4c35] hover:text-[#2c190e]'
            }`}
          >
            ساعة إيقاف الجلسة
          </button>
        </div>

        {/* TAB 1: POMODORO TIMER */}
        {activeTab === 'pomodoro' && (
          <div className="space-y-6 text-center">
            {/* Mode selection buttons */}
            <div className="flex justify-center gap-2 text-xs font-bold">
              <button
                onClick={() => setTimerDuration('study')}
                className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  pomodoroMode === 'study'
                    ? 'bg-[#8f5424] text-[#faf3e8]'
                    : 'bg-[#ede0ce] text-[#553723] hover:bg-[#e4d3bf]'
                }`}
              >
                جلسة تركيز برمجي (25د)
              </button>
              <button
                onClick={() => setTimerDuration('shortBreak')}
                className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  pomodoroMode === 'shortBreak'
                    ? 'bg-[#8f5424] text-[#faf3e8]'
                    : 'bg-[#ede0ce] text-[#553723] hover:bg-[#e4d3bf]'
                }`}
              >
                استراحة قصيرة (5د)
              </button>
              <button
                onClick={() => setTimerDuration('longBreak')}
                className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  pomodoroMode === 'longBreak'
                    ? 'bg-[#8f5424] text-[#faf3e8]'
                    : 'bg-[#ede0ce] text-[#553723] hover:bg-[#e4d3bf]'
                }`}
              >
                استراحة طويلة (15د)
              </button>
            </div>

            {/* Huge timer display */}
            <div className="py-8 bg-[#f5ece0] rounded-3xl border border-[#e2d2bf]">
              <span className="font-mono text-6xl sm:text-7xl font-black tabular-nums tracking-wider bg-gradient-to-r from-[#201007] via-[#522b14] to-[#804b22] bg-clip-text text-transparent">
                {formatTimer(timeLeft)}
              </span>
              <p className="text-xs text-[#7d5c43] mt-2 font-medium">
                {pomodoroMode === 'study' ? '💻 طور التركيز على كتابة وحل الخوارزميات' : '☕ خذ استراحة وقم بتمارين التمدد'}
              </p>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isTimerRunning
                    ? 'bg-[#d98b48] hover:bg-[#e49b5c] text-[#1a0e07]'
                    : 'bg-gradient-to-r from-[#8a5223] to-[#693b16] hover:from-[#9c5f2b] hover:to-[#7b461c] text-[#faf3e8]'
                }`}
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>إيقاف مؤقت</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>بدء المؤقت</span>
                  </>
                )}
              </button>

              <button
                onClick={resetTimer}
                className="p-3 bg-[#ede0ce] hover:bg-[#e4d3bf] text-[#3e2413] rounded-xl transition-colors cursor-pointer"
                title="إعادة ضبط المؤقت"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-[#7d5c43] flex items-center justify-center gap-4 pt-2 border-t border-[#ebd8c4]">
              <span>الجلسات المكتملة اليوم: <strong className="font-mono text-[#2b180d]">{pomodoroCycles}</strong></span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <BellRing className="w-3.5 h-3.5 text-[#8f5424]" />
                <span>تنبيه صوتي تلقائي عند الانتهاء</span>
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE DIGITAL CLOCK */}
        {activeTab === 'clock' && (
          <div className="space-y-6 text-center py-4">
            <div className="py-10 bg-[#f5ece0] rounded-3xl border border-[#e2d2bf]">
              <span className="font-mono text-5xl sm:text-6xl font-black tabular-nums tracking-widest bg-gradient-to-r from-[#201007] via-[#522b14] to-[#804b22] bg-clip-text text-transparent">
                {currentTime.toLocaleTimeString('ar-EG', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })}
              </span>
              <p className="text-sm font-bold text-[#5e3e27] mt-3">
                {currentTime.toLocaleDateString('ar-EG', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>

            <p className="text-xs text-[#7d5c43] leading-relaxed">
              «الوقت هو المورد الأكثر قيمة لمهندس البرمجيات؛ إدارة فترات التركيز بعناية تصنع الفارق بين الكود العشوائي والمعمارية المتينة.»
            </p>
          </div>
        )}

        {/* TAB 3: STOPWATCH */}
        {activeTab === 'stopwatch' && (
          <div className="space-y-6 text-center">
            <div className="py-8 bg-[#f5ece0] rounded-3xl border border-[#e2d2bf]">
              <span className="font-mono text-5xl sm:text-6xl font-black tabular-nums tracking-wider bg-gradient-to-r from-[#201007] via-[#522b14] to-[#804b22] bg-clip-text text-transparent">
                {formatStopwatch(stopwatchSeconds)}
              </span>
              <p className="text-xs text-[#7d5c43] mt-2 font-medium">
                تتبع الزمن المستغرق في حل مسألة خوارزمية أو كتابة موديول
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isStopwatchRunning
                    ? 'bg-[#d98b48] text-[#1a0e07]'
                    : 'bg-gradient-to-r from-[#8a5223] to-[#693b16] text-[#faf3e8]'
                }`}
              >
                {isStopwatchRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isStopwatchRunning ? 'إيقاف مؤقت' : 'بدء التوقيت'}</span>
              </button>

              <button
                onClick={addLap}
                disabled={!isStopwatchRunning}
                className="p-3 bg-[#ede0ce] hover:bg-[#e4d3bf] disabled:opacity-50 text-[#3e2413] rounded-xl transition-colors cursor-pointer"
                title="تسجيل دورة / شوط"
              >
                <Flag className="w-5 h-5" />
              </button>

              <button
                onClick={resetStopwatch}
                className="p-3 bg-[#ede0ce] hover:bg-[#e4d3bf] text-[#3e2413] rounded-xl transition-colors cursor-pointer"
                title="إعادة ضبط"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Laps List */}
            {laps.length > 0 && (
              <div className="max-h-36 overflow-y-auto space-y-1.5 p-3 bg-[#f5ede0] rounded-xl border border-[#e2d2bf] text-xs">
                {laps.map((lap, index) => (
                  <div key={index} className="flex justify-between items-center text-[#553723] font-mono">
                    <span>الجولة #{laps.length - index}</span>
                    <span className="font-bold">{formatStopwatch(lap)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
