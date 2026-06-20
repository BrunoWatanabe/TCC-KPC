// @model: specs/001-login-component/model/login-classes.puml
// RF: RF-001, RF-006 — Entidade User (escopo mínimo modelado)

/**
 * Entidade User — representa um usuário autenticado.
 * Atributos e métodos limitados ao que está modelado em login-classes.puml:105-109.
 * CONST-R2: zero over-engineering — nada além do modelado.
 */
export class User {
  /**
   * @param {string} username - Nome de usuário
   * @param {string} token - Token JWT de autenticação
   */
  constructor(username, token) {
    this.username = username;
    this.token = token;
  }

  /**
   * Factory: cria User a partir da resposta da API de login.
   * @param {string} username - Nome de usuário
   * @param {string} accessToken - Token JWT
   * @returns {User}
   */
  static fromApiResponse(username, accessToken) {
    return new User(username, accessToken);
  }
}