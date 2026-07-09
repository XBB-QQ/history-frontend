/**
 * 班级史馆 API 客户端
 * 优先调用后端 API，失败时降级到 localStorage
 * 通过 VITE_CLASSROOM_MODE 控制：'api'（默认）| 'local'
 */

import { classroomStorage, type Assignment, type StudentProgress } from './classroomStorage';

const BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const MODE: 'api' | 'local' =
  (import.meta.env.VITE_CLASSROOM_MODE as 'api' | 'local') || 'api';

export interface AssignmentCreateInput {
  title: string;
  routeId: string;
  routeName: string;
  studentNames: string[];
  teacherName: string;
}

export interface ProgressUpsertInput {
  studentName: string;
  completedNodes: string[];
}

interface BackendAssignmentDTO {
  id: number;
  uid: string;
  title: string;
  routeId: string;
  routeName: string;
  studentNames: string[];
  teacherName: string;
  createdAt: string;
}

interface BackendProgressDTO {
  assignmentId: number;
  studentName: string;
  completedNodes: string[];
  lastActiveAt: string;
}

function toAssignment(dto: BackendAssignmentDTO): Assignment {
  return {
    id: dto.uid,
    title: dto.title,
    routeId: dto.routeId,
    routeName: dto.routeName,
    studentNames: dto.studentNames ?? [],
    createdAt: dto.createdAt,
    teacherName: dto.teacherName,
  };
}

function toProgress(dto: BackendProgressDTO, assignmentUid: string): StudentProgress {
  return {
    studentName: dto.studentName,
    assignmentId: assignmentUid,
    completedNodes: dto.completedNodes ?? [],
    lastActiveAt: dto.lastActiveAt,
  };
}

function localCreateAssignment(input: AssignmentCreateInput): Assignment {
  const item: Assignment = {
    id: `asg-${Date.now()}`,
    title: input.title,
    routeId: input.routeId,
    routeName: input.routeName,
    studentNames: input.studentNames,
    createdAt: new Date().toISOString(),
    teacherName: input.teacherName,
  };
  const all = classroomStorage.loadAssignments();
  classroomStorage.saveAssignments([...all, item]);
  return item;
}

function localDeleteAssignment(id: string): void {
  const all = classroomStorage.loadAssignments();
  classroomStorage.saveAssignments(all.filter(a => a.id !== id));
  const progress = classroomStorage.loadProgress();
  classroomStorage.saveProgress(progress.filter(p => p.assignmentId !== id));
}

function localUpsertProgress(
  assignmentId: string,
  input: ProgressUpsertInput
): StudentProgress {
  const all = classroomStorage.loadProgress();
  const idx = all.findIndex(
    p => p.assignmentId === assignmentId && p.studentName === input.studentName
  );
  const now = new Date().toISOString();
  const nodes = Array.from(new Set(input.completedNodes));
  let result: StudentProgress;
  if (idx >= 0) {
    result = { ...all[idx], completedNodes: nodes, lastActiveAt: now };
    all[idx] = result;
  } else {
    result = {
      studentName: input.studentName,
      assignmentId,
      completedNodes: nodes,
      lastActiveAt: now,
    };
    all.push(result);
  }
  classroomStorage.saveProgress(all);
  return result;
}

export const classroomApi = {
  async listAssignments(
    filter?: { teacherName?: string; studentName?: string }
  ): Promise<Assignment[]> {
    if (MODE === 'local') return classroomStorage.loadAssignments();
    try {
      const params = new URLSearchParams();
      if (filter?.teacherName) params.set('teacherName', filter.teacherName);
      if (filter?.studentName) params.set('studentName', filter.studentName);
      const query = params.toString();
      const url = `${BASE}/classroom/assignments${query ? '?' + query : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: BackendAssignmentDTO[] = await res.json();
      return data.map(toAssignment);
    } catch (e) {
      console.warn('[Classroom] API 不可用，降级到 localStorage', e);
      return classroomStorage.loadAssignments();
    }
  },

  async createAssignment(input: AssignmentCreateInput): Promise<Assignment> {
    if (MODE === 'local') return localCreateAssignment(input);
    try {
      const res = await fetch(`${BASE}/classroom/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: BackendAssignmentDTO = await res.json();
      return toAssignment(data);
    } catch (e) {
      console.warn('[Classroom] API 不可用，降级到 localStorage', e);
      return localCreateAssignment(input);
    }
  },

  async deleteAssignment(id: string): Promise<void> {
    if (MODE === 'local') {
      localDeleteAssignment(id);
      return;
    }
    try {
      const res = await fetch(`${BASE}/classroom/assignments/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      console.warn('[Classroom] API 不可用，降级到 localStorage', e);
      localDeleteAssignment(id);
    }
  },

  async listProgress(assignmentId: string): Promise<StudentProgress[]> {
    if (MODE === 'local') {
      return classroomStorage
        .loadProgress()
        .filter(p => p.assignmentId === assignmentId);
    }
    try {
      const res = await fetch(
        `${BASE}/classroom/assignments/${assignmentId}/progress`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: BackendProgressDTO[] = await res.json();
      return data.map(d => toProgress(d, assignmentId));
    } catch (e) {
      console.warn('[Classroom] API 不可用，降级到 localStorage', e);
      return classroomStorage
        .loadProgress()
        .filter(p => p.assignmentId === assignmentId);
    }
  },

  async upsertProgress(
    assignmentId: string,
    input: ProgressUpsertInput
  ): Promise<StudentProgress> {
    if (MODE === 'local') return localUpsertProgress(assignmentId, input);
    try {
      const res = await fetch(
        `${BASE}/classroom/assignments/${assignmentId}/progress`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: BackendProgressDTO = await res.json();
      return toProgress(data, assignmentId);
    } catch (e) {
      console.warn('[Classroom] API 不可用，降级到 localStorage', e);
      return localUpsertProgress(assignmentId, input);
    }
  },
};
