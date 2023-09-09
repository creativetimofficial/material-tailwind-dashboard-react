import StudentContext from "@/context/students";
import Student from "@/entities/student.entity";
import { ReactNodeChildren } from "@/types";
import { useState } from "react";

export const StudentProvider = ({ children }: ReactNodeChildren) => {
  // State
  const [students, setStudents] = useState<Array<Student>>([]);
  const [student, setStudent] = useState<Student | null>(null);

  // Actions
  const addStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  const removeStudent = (student: Student) => {
    setStudents(students.filter((c) => c.id !== student.id));
  };

  const loadStudents = (students: Array<Student>) => {
    console.log(students);
    setStudents(students);
  };

  const updateStudent = (student: Student) => {
    setStudents(students.map((c) => (c.id === student.id ? student : c)));
  };

  const setCurrentStudent = (studentId: string) => {
    const student = students.find((c) => c.id === studentId);

    if (student) setStudent(student);
  };

  const contextValue = {
    // State
    students,
    student,

    // Actions
    addStudent,
    removeStudent,
    loadStudents,
    updateStudent,
    setCurrentStudent,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};
