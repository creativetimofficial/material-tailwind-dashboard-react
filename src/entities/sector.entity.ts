export interface SectorData {
  id: string;
  name: string;
  createdAt: Date;
  idFaculty: string;
}

export class Sector {
  private _id: string;
  private _name: string;
  private _createdAt: Date;
  private _idFaculty: string;

  constructor(data: SectorData) {
    this._id = data.id;
    this._name = data.name;
    this._createdAt = data.createdAt;
    this._idFaculty = data.idFaculty;
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

  get idFaculty(): string {
    return this._idFaculty;
  }

  // Setters

  set setName(name: string) {
    this._name = name;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  set setIdFaculty(idFaculty: string) {
    this._idFaculty = idFaculty;
  }
}
