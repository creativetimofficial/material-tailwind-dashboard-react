import { Role } from "./role.entity";

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  sexe: string;
  createdAt: Date;
  role: Role;
}

export class User {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _phone: string;
  private _avatar: string;
  private _sexe: string;
  private _createdAt: Date;
  private _role: Role;

  constructor(data: UserData) {
    this._id = data.id;
    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._email = data.email;
    this._phone = data.phone;
    this._avatar = data.avatar;
    this._sexe = data.sexe;
    this._createdAt = data.createdAt;
    this._role = data.role;
  }

  // Getters

  get id(): string {
    return this._id;
  }

  get role(): Role {
    return this._role;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
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

  get createdAt(): Date {
    return this._createdAt;
  }

  get avatar(): string {
    return this._avatar;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  // Setters

  set id(id: string) {
    this._id = id;
  }

  set idRole(role: Role) {
    this._role = role;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }

  set email(email: string) {
    this._email = email;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  set sexe(sexe: string) {
    this._sexe = sexe;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  set avatar(avatar: string) {
    this._avatar = avatar;
  }
}
