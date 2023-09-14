export interface AcademicYearData {
  date: string;
}

export class AcademicYear {
  private _date: string;

  constructor(data: AcademicYearData) {
    this._date = data.date;
  }

  // Getters

  get date(): string {
    return this._date;
  }

  // Setters

  set setLabel(date: string) {
    this._date = date;
  }
}
