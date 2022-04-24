/**
 * Card model
 */
class Card {
  constructor(data = {}) {
    this.id = null;
    this.question = null;
    this.answer = null;
    this.options = null;
    Object.assign(this, data);
  }
}
export default Card;
