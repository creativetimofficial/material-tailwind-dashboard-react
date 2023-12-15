export interface RoleData {
  id: string;
  label: string;
  description: string;
}

export class Role {
  private _id: string;
  private _label: string;
  private _description: string;

  constructor(data: RoleData) {
    this._id = data.id;
    this._label = data.label;
    this._description = data.description;
  }

  // Getters

  get id(): string {
    return this._id;
  }

  get label(): string {
    return this._label;
  }

  get description(): string {
    return this._description;
  }

  // Setters

  set id(id: string) {
    this._id = id;
  }

  set label(label: string) {
    this._label = label;
  }

  set description(description: string) {
    this._description = description;
  }
}
