export class User {
  id: number;
  firstName: string;
  lastName: string;
  gender: boolean;
  birthday: Date;
  phone: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.phone = user.phone;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getGender(): string {
    return this.gender ? 'Male' : 'Female';
  }
}
