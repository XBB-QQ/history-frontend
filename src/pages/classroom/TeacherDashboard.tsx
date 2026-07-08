/**
 * 班级史馆 — 教师仪表板
 * 教师创建作业（关联研学线）、查看学生进度
 * 无后端，用 localStorage mock
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { STUDY_ROUTES } from '@/data/features/storyQuests';
import { useT } from '@/i18n/i18n';

/** 作业数据 */
interface Assignment {
  id: string;
  title: string;
  routeId: string;
  routeName: string;
  studentNames: string[];
  createdAt: string;
}

/** 学生进度 */
interface StudentProgress {
  studentName: string;
  assignmentId: string;
  completedNodes: string[];
  lastActiveAt: string;
}

const ASSIGNMENTS_KEY = 'classroom_assignments';
const PROGRESS_KEY = 'classroom_progress';

function loadAssignments(): Assignment[] {
  try {
    const raw = localStorage.getItem(ASSIGNMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAssignments(items: Assignment[]) {
  localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(items));
}

function loadProgress(): StudentProgress[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function TeacherDashboard() {
  const t = useT();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [title, setTitle] = useState('');
  const [routeId, setRouteId] = useState(STUDY_ROUTES[0]?.id ?? '');
  const [studentNames, setStudentNames] = useState('');

  useEffect(() => {
    setAssignments(loadAssignments());
    setProgress(loadProgress());
  }, []);

  const handleCreate = () => {
    if (!title.trim() || !routeId) return;
    const route = STUDY_ROUTES.find(r => r.id === routeId);
    if (!route) return;
    const names = studentNames.split(/[，,\n]/).map(s => s.trim()).filter(Boolean);
    const newAssignment: Assignment = {
      id: `asg-${Date.now()}`,
      title: title.trim(),
      routeId,
      routeName: route.name,
      studentNames: names,
      createdAt: new Date().toISOString(),
    };
    const updated = [...assignments, newAssignment];
    setAssignments(updated);
    saveAssignments(updated);
    setTitle('');
    setStudentNames('');
  };

  const handleDelete = (id: string) => {
    const updated = assignments.filter(a => a.id !== id);
    setAssignments(updated);
    saveAssignments(updated);
  };

  const getProgressFor = (assignmentId: string, studentName: string): StudentProgress | undefined => {
    return progress.find(p => p.assignmentId === assignmentId && p.studentName === studentName);
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 mb-2">班级史馆 · 教师仪表板</h1>
        <p className="text-ink-500 dark:text-ink-400 mb-8">创建研学作业，分配给学生，追踪完成进度</p>

        {/* 创建作业 */}
        <div className="bg-white dark:bg-ink-900 rounded-xl shadow-md p-6 mb-8 border border-ink-100 dark:border-ink-700">
          <h2 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-4">创建新作业</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-ink-500 dark:text-ink-400 block mb-1">作业标题</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="例：第三单元·唐宋变革研学"
                className="w-full px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-600 bg-transparent text-ink-800 dark:text-ink-200"
              />
            </div>
            <div>
              <label className="text-sm text-ink-500 dark:text-ink-400 block mb-1">关联研学线</label>
              <select
                value={routeId}
                onChange={e => setRouteId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-600 bg-transparent text-ink-800 dark:text-ink-200"
              >
                {STUDY_ROUTES.map(r => (
                  <option key={r.id} value={r.id}>{r.emoji} {r.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-ink-500 dark:text-ink-400 block mb-1">学生名单（逗号或换行分隔）</label>
              <textarea
                value={studentNames}
                onChange={e => setStudentNames(e.target.value)}
                placeholder="张三, 李四, 王五"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-600 bg-transparent text-ink-800 dark:text-ink-200"
              />
            </div>
            <button
              onClick={handleCreate}
              disabled={!title.trim() || !routeId}
              className="px-4 py-2 bg-accent text-white rounded-lg font-bold disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              发布作业
            </button>
          </div>
        </div>

        {/* 作业列表 + 进度 */}
        <div className="space-y-4">
          {assignments.length === 0 && (
            <div className="text-center py-12 text-ink-400">暂无作业，请先创建</div>
          )}
          {assignments.map(a => {
            const route = STUDY_ROUTES.find(r => r.id === a.routeId);
            const totalNodes = route?.nodes.length ?? 0;
            return (
              <div key={a.id} className="bg-white dark:bg-ink-900 rounded-xl shadow-md p-5 border border-ink-100 dark:border-ink-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-ink-800 dark:text-ink-200">{a.title}</h3>
                    <p className="text-sm text-ink-400">{route?.emoji} {a.routeName} · {totalNodes} 个节点</p>
                  </div>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    删除
                  </button>
                </div>
                <div className="space-y-1">
                  {a.studentNames.map(name => {
                    const p = getProgressFor(a.id, name);
                    const completed = p?.completedNodes.length ?? 0;
                    const pct = totalNodes > 0 ? Math.round((completed / totalNodes) * 100) : 0;
                    return (
                      <div key={name} className="flex items-center gap-3 text-sm">
                        <span className="w-20 text-ink-600 dark:text-ink-400">{name}</span>
                        <div className="flex-1 h-2 bg-ink-100 dark:bg-ink-700 rounded-full overflow-hidden">
                          <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-24 text-right text-ink-400 text-xs">{completed}/{totalNodes} ({pct}%)</span>
                      </div>
                    );
                  })}
                  {a.studentNames.length === 0 && (
                    <div className="text-xs text-ink-400">未分配学生</div>
                  )}
                </div>
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
