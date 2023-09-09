type StudentData = {
  id: string;
  firstname: string;
  lastname: string;
  birthday: Date;
  profession: string;
  birthplace: string;
  avatar: string;
  sex: string;
  height: string;
  fathername: string;
  mothername: string;
  address: string;
  uniqueId: string;
  identificationPost: string;
  deliveryDate: Date;
  expirationDate: Date;
  numericCode: number | null;
  qrcode: string;
};

export default class Student {
  private _id: string;
  private _firstname: string;
  private _lastname: string;
  private _birthday: Date;
  private _profession: string;
  private _birthplace: string;
  private _avatar: string;
  private _sex: string;
  private _height: string;
  private _fathername: string;
  private _mothername: string;
  private _address: string;
  private _uniqueId: string;
  private _identificationPost: string;
  private _deliveryDate: Date;
  private _expirationDate: Date;
  private _numericCode: number | null;
  private _qrcode: number | null;

  constructor(data: StudentData) {
    this._id = data.id;
    this._firstname = data.firstname;
    this._lastname = data.lastname;
    this._birthday = data.birthday;
    this._profession = data.profession;
    this._birthplace = data.birthplace;
    this._avatar = data.avatar ?? "";
    this._sex = data.sex;
    this._height = data.height;
    this._fathername = data.fathername ?? "";
    this._mothername = data.mothername ?? "";
    this._address = data.address;
    this._uniqueId = data.uniqueId;
    this._identificationPost = data.identificationPost || "CE02";
    this._deliveryDate = data.deliveryDate;
    this._expirationDate = data.expirationDate;
    this._numericCode = data.numericCode || null;
    this._qrcode = data.numericCode || null;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get firstname(): string {
    return `${this._firstname[0].toUpperCase()}${this._firstname.slice(1)}`;
  }

  get lastname(): string {
    return `${this._lastname[0].toUpperCase()}${this._lastname.slice(1)}`;
  }

  get fullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  get birthday(): Date {
    return this._birthday;
  }

  get profession(): string {
    return `${this._profession[0].toUpperCase()}${this._profession.slice(1)}`;
  }

  get birthplace(): string {
    return `${this._birthplace[0].toUpperCase()}${this._birthplace.slice(1)}`;
  }

  get avatar(): string | null {
    return this._avatar;
  }

  get sex(): string {
    return this._sex;
  }

  get height(): string {
    return this._height;
  }

  get fathername(): string {
    return `${this._fathername[0].toUpperCase()}${this._fathername.slice(1)}`;
  }

  get mothername(): string {
    return `${this._mothername[0].toUpperCase()}${this._mothername.slice(1)}`;
  }

  get address(): string {
    return `${this._address[0].toUpperCase()}${this._address.slice(1)}`;
  }

  get uniqueId(): string {
    return this._uniqueId;
  }

  get identificationPost(): string {
    return this._identificationPost;
  }

  get deliveryDate(): Date {
    return this._deliveryDate;
  }

  get expirationDate(): Date {
    return this._expirationDate;
  }

  get numericCode(): number | null {
    return this._numericCode;
  }

  get qrcode(): number | null {
    return this._qrcode;
  }
}
