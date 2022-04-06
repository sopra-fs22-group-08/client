/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.fistname = null;
    this.lastname = null;
    this.username = null;
    this.email = null;
    this.token = null;
    this.status = null;
    Object.assign(this, data);
  }
}
export default User;
