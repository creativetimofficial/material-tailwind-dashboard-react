export type AdminAccountData = {
  id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  data: string | null;
};

export class Admin {
  private _id: string;
  private _username: string;
  private _password: string;
  private _email: string;
  private _role: string;
  private _data: string | null;

  constructor(data: AdminAccountData) {
    this._id = data.id;
    this._username = data.username;
    this._password = data.password;
    this._email = data.email;
    this._role = data.role;

    // User data
    this._data = data.data || null;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get email(): string {
    return this._email;
  }

  get role(): string {
    return this._role;
  }

  get data(): string | null {
    return this._data;
  }
}
