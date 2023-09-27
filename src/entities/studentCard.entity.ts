export interface StudentCardData {
  id: string;
  matricule: string;
  code: string;
  status: string;
  firstName: string;
  sex: string;
  avatar: string;
  birthDate: Date;
  birthPlace: string;
  nationality: string;
  email: string;
  paymentReceipt: string;
  sendedAt: Date;
  createdAt: Date;
  academicYear: string;
  sectorId: string;
}

export class StudentCard {}
