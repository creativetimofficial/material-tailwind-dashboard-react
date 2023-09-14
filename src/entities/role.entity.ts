export interface RoleData {
  label: string;
  description: string;
}

export class Role {
  private _label: string;
  private _description: string;

  constructor(data: RoleData) {
    this._label = data.label;
    this._description = data.description;
  }

  // Getters

  get label(): string {
    return this._label;
  }

  get description(): string {
    return this._description;
  }

  // Setters

  set setLabel(label: string) {
    this._label = label;
  }

  set setDescription(description: string) {
    this._description = description;
  }
}
