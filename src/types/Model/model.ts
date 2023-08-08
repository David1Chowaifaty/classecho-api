export class Model {
  error?: any;
  success?: any;
  constructor(error?: any, success?: any) {
    this.error = error;
    this.success = success;
  }
}
