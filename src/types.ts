export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: any;
}

export interface Student {
  id?: string;
  name: string;
  grade: string;
  score: number;
  attendance: number;
  assignments: number;
  riskLevel: 'LOW' | 'MED' | 'HIGH';
  addedBy: string;
  createdAt: any;
}

export interface QuestionPaper {
  id?: string;
  title: string;
  subject: string;
  fileUrl: string;
  questions: string[];
  answerKey: string;
  answerKeyUrl?: string;
  isSet: boolean;
  uploadedBy: string;
  createdAt: any;
}

export interface AnswerSheet {
  id?: string;
  studentId: string;
  studentName: string;
  paperId: string;
  subject: string;
  fileUrl: string;
  aiFeedback: string;
  score: number;
  maxScore: number;
  percentage: number;
  checkedAt: any;
  createdAt: any;
}
