export class OrgNotFoundError extends Error {
  constructor() {
    super('Org Not Found.');
  }
}
