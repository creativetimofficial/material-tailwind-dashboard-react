export interface SectorData {
  name: string;
  description: string;
  idFaculty: string;
}

export class Sector {
  private _name: string;
  private _description: string;
  private _idFaculty: string;

  constructor(data: SectorData) {
    this._name = data.name;
    this._description = data.description;
    this._idFaculty = data.idFaculty;
  }

  // Getters

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get idFaculty(): string {
    return this._idFaculty;
  }

  // Setters

  set setName(name: string) {
    this._name = name;
  }

  set setDescription(description: string) {
    this._description = description;
  }

  set setIdFaculty(idFaculty: string) {
    this._idFaculty = idFaculty;
  }
}
