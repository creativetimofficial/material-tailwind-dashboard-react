export interface FacultyData {
  name: string;
  description: string;
}

export class Faculty {
  private _name: string;
  private _description: string;

  constructor(data: FacultyData) {
    this._name = data.name;
    this._description = data.description;
  }

  // Getters

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  // Setters

  set setName(name: string) {
    this._name = name;
  }

  set setDescription(description: string) {
    this._description = description;
  }
}
