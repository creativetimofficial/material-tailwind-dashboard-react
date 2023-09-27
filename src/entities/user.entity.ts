export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  sexe: string;
  idSector: string;
  idRole: string;
}

export class User {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _password: string;
  private _email: string;
  private _phone: string;
  private _avatar: string;
  private _sexe: string;
  private _idSector: string;
  private _idRole: string;

  constructor(data: UserData) {
    this._id = data.id;
    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._password = data.password;
    this._email = data.email;
    this._password = data.password;
    this._phone = data.phone;
    this._avatar = data.avatar;
    this._sexe = data.sexe;
    this._idSector = data.idSector;
    this._idRole = data.idRole;
  }

  // Getters

  get id(): string {
    return this._id;
  }

  get idSector(): string {
    return this._idSector;
  }

  get idRole(): string {
    return this._idRole;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get password(): string {
    return this._password;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get sexe(): string {
    return this._sexe;
  }

  get avatar(): string {
    return this._avatar;
  }

  // Setters

  set setId(id: string) {
    this._id = id;
  }

  set setIdSector(idSector: string) {
    this._idSector = idSector;
  }

  set setIdRole(idRole: string) {
    this._idRole = idRole;
  }

  set setFirstName(firstName: string) {
    this._firstName = firstName;
  }

  set setLastName(lastName: string) {
    this._lastName = lastName;
  }

  set setPassword(password: string) {
    this._password = password;
  }

  set setEmail(email: string) {
    this._email = email;
  }

  set setPhone(phone: string) {
    this._phone = phone;
  }

  set setSexe(sexe: string) {
    this._sexe = sexe;
  }

  set setAvatar(avatar: string) {
    this._avatar = avatar;
  }
}
