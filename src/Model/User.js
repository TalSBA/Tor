export default class User {
  constructor(plainUser) {
    this.id = plainUser.id;
    this.fullName = plainUser.fullName;
    this.email = plainUser.email;
    this.password = plainUser.password;
  }

  login(email, pwd) {
    return (
      email.toLowerCase() === this.email.toLowerCase() && pwd === this.password
    );
  }
}
