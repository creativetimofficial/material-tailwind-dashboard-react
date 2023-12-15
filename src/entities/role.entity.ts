export const RoleEnum = {
  ADMIN: "admin",
  AGENT: "agent",
} as const;

export type RoleEnum = typeof RoleEnum[keyof typeof RoleEnum];

export interface RoleData {
  label: RoleEnum;
  description: string;
}

export class Role {
  private _label: RoleEnum;
  private _description: string;

  constructor(data: RoleData) {
    this._label = data.label;
    this._description = data.description;
  }

  // Getters

  get label(): RoleEnum {
    return this._label;
  }

  get description(): string {
    return this._description;
  }

  // Setters

  set label(label: RoleEnum) {
    this._label = label;
  }

  set description(description: string) {
    this._description = description;
  }
}
