export interface FacultyData {
  id: string;
  name: string;
  createdAt: Date;
}

export class Faculty {
  private _id: string;
  private _name: string;
  private _createdAt: Date;

  constructor(data: FacultyData) {
    this._id = data.id;
    this._name = data.name;
    this._createdAt = data.createdAt;
  }

  // Getters

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  // Setters

  set setName(name: string) {
    this._name = name;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }
}
