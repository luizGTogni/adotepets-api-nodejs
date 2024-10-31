export class OrgsAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists.');
  }
}
