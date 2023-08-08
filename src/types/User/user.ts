export class User {
  email: string;
  password: string;
  profile: string | null;
  constructor(email: string, password: string, profile: string | null) {
    this.email = email;
    this.password = password;
    this.profile = profile;
  }
}
