/**
 * 班级史馆 localStorage 存储
 * 用于无后端环境或 API 降级模式
 */

export interface Assignment {
  id: string;
  title: string;
  routeId: string;
  routeName: string;
  studentNames: string[];
  createdAt: string;
  teacherName?: string;
}

export interface StudentProgress {
  studentName: string;
  assignmentId: string;
  completedNodes: string[];
  lastActiveAt: string;
}

const ASSIGNMENTS_KEY = 'classroom_assignments';
const PROGRESS_KEY = 'classroom_progress';
const CURRENT_STUDENT_KEY = 'classroom_current_student';

export const classroomStorage = {
  loadAssignments(): Assignment[] {
    try {
      const raw = localStorage.getItem(ASSIGNMENTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveAssignments(items: Assignment[]): void {
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(items));
  },

  loadProgress(): StudentProgress[] {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveProgress(items: StudentProgress[]): void {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(items));
  },

  getCurrentStudent(): string | null {
    return localStorage.getItem(CURRENT_STUDENT_KEY);
  },

  setCurrentStudent(name: string): void {
    localStorage.setItem(CURRENT_STUDENT_KEY, name);
  },

  clearCurrentStudent(): void {
    localStorage.removeItem(CURRENT_STUDENT_KEY);
  },
};
