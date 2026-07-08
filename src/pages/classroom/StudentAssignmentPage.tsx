/**
 * 班级史馆 — 学生作业页
 * 学生查看分配给自己的作业，标记节点完成
 * 无后端，用 localStorage mock
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { STUDY_ROUTES } from '@/data/features/storyQuests';
import { useT } from '@/i18n/i18n';

interface Assignment {
  id: string;
  title: string;
  routeId: string;
  routeName: string;
  studentNames: string[];
  createdAt: string;
}

interface StudentProgress {
  studentName: string;
  assignmentId: string;
  completedNodes: string[];
  lastActiveAt: string;
}

const ASSIGNMENTS_KEY = 'classroom_assignments';
const PROGRESS_KEY = 'classroom_progress';
const CURRENT_STUDENT_KEY = 'classroom_current_student';

function loadAssignments(): Assignment[] {
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadProgress(): StudentProgress[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProgress(items: StudentProgress[]) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(items));
}

export default function StudentAssignmentPage() {
  const t = useT();
  const [studentName, setStudentName] = useState('');
  const [entered, setEntered] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [progress, setProgress] = useState<StudentProgress[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(CURRENT_STUDENT_KEY);
    if (saved) {
      setStudentName(saved);
      setEntered(true);
    }
    setAssignments(loadAssignments());
    setProgress(loadProgress());
  }, []);

  const handleEnter = () => {
    if (!studentName.trim()) return;
    localStorage.setItem(CURRENT_STUDENT_KEY, studentName.trim());
    setEntered(true);
  };

  const myAssignments = assignments.filter(a => a.studentNames.includes(studentName));

  const getMyProgress = (assignmentId: string): StudentProgress | undefined => {
    return progress.find(p => p.assignmentId === assignmentId && p.studentName === studentName);
  };

  const toggleNode = (assignmentId: string, nodeId: string) => {
    const existing = progress.find(p => p.assignmentId === assignmentId && p.studentName === studentName);
    let updated: StudentProgress[];
    if (existing) {
      const has = existing.completedNodes.includes(nodeId);
      const completedNodes = has
        ? existing.completedNodes.filter(n => n !== nodeId)
        : [...existing.completedNodes, nodeId];
      updated = progress.map(p =>
        p === existing ? { ...p, completedNodes, lastActiveAt: new Date().toISOString() } : p
      );
    } else {
      updated = [...progress, {
        studentName,
        assignmentId,
        completedNodes: [nodeId],
        lastActiveAt: new Date().toISOString(),
      }];
    }
    setProgress(updated);
    saveProgress(updated);
  };

  if (!entered) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white dark:bg-ink-900 rounded-xl shadow-md p-8 border border-ink-100 dark:border-ink-700">
          <h1 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">班级史馆 · 学生入口</h1>
          <p className="text-ink-500 dark:text-ink-400 mb-6 text-sm">输入你的姓名，查看老师分配的研学作业</p>
          <input
            value={studentName}
            onChange={e => setStudentName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleEnter()}
            placeholder="你的姓名"
            className="w-full px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-600 bg-transparent text-ink-800 dark:text-ink-200 mb-4"
            autoFocus
          />
          <button
            onClick={handleEnter}
            disabled={!studentName.trim()}
            className="w-full px-4 py-2 bg-accent text-white rounded-lg font-bold disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            进入
          </button>
          <div className="mt-6 text-center">
            <Link to="/classroom/teacher" className="text-sm text-ink-400 hover:text-accent">教师入口</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100">你好，{studentName}</h1>
            <p className="text-ink-500 dark:text-ink-400 text-sm">你的研学作业</p>
          </div>
          <button
            onClick={() => { localStorage.removeItem(CURRENT_STUDENT_KEY); setEntered(false); setStudentName(''); }}
            className="text-sm text-ink-400 hover:text-accent"
          >
            切换学生
          </button>
        </div>

        {myAssignments.length === 0 && (
          <div className="text-center py-20 text-ink-400">
            <p className="mb-4">老师还没有给你分配作业</p>
            <Link to="/classroom/teacher" className="text-accent text-sm">前往教师仪表板创建作业</Link>
          </div>
        )}

        <div className="space-y-6">
          {myAssignments.map(a => {
            const route = STUDY_ROUTES.find(r => r.id === a.routeId);
            if (!route) return null;
            const myProgress = getMyProgress(a.id);
            const completed = myProgress?.completedNodes.length ?? 0;
            const total = route.nodes.length;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
            return (
              <div key={a.id} className="bg-white dark:bg-ink-900 rounded-xl shadow-md p-6 border border-ink-100 dark:border-ink-700">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-ink-800 dark:text-ink-200">{a.title}</h2>
                  <p className="text-sm text-ink-400">{route.emoji} {route.name}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-ink-100 dark:bg-ink-700 rounded-full overflow-hidden">
                      <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-ink-400">{completed}/{total} ({pct}%)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {route.nodes.map(node => {
                    const done = myProgress?.completedNodes.includes(node.id) ?? false;
                    return (
                      <div key={node.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800">
                        <button
                          onClick={() => toggleNode(a.id, node.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            done
                              ? 'bg-accent border-accent text-white'
                              : 'border-ink-300 dark:border-ink-600'
                          }`}
                        >
                          {done && <span className="text-xs">✓</span>}
                        </button>
                        <div className="flex-1">
                          <div className={`text-sm font-bold ${done ? 'text-ink-400 line-through' : 'text-ink-700 dark:text-ink-300'}`}>
                            {node.title}
                          </div>
                          {node.description && (
                            <div className="text-xs text-ink-400">{node.description}</div>
                          )}
                        </div>
                        <Link
                          to={node.path}
                          className="text-xs text-accent hover:underline"
                        >
                          前往 →
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {pct === 100 && (
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-center">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      🎉 全部完成！获得印章：{route.seal.name}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="btn-secondary">{t('common.back_home')}</Link>
        </div>
      </div>
    </div>
  );
}
