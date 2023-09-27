import Student from "@/entities/student.entity";
import { createContext } from "react";

export type StudentContextType = {
  // State
  students: Array<Student>;
  student: Student | null;

  // Actions
  addStudent: (student: Student) => void;
  loadStudents: (students: Array<Student>) => void;
  removeStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  setCurrentStudent: (studentId: string) => void;
};

const StudentContext = createContext<StudentContextType>({
  // State
  students: [],
  student: null,

  // Actions
  loadStudents: () => {},
  addStudent: () => {},
  removeStudent: () => {},
  updateStudent: () => {},
  setCurrentStudent: () => {},
});

export default StudentContext;
