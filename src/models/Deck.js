/**
 * Deck model
 */
class Deck {
  constructor(data = {}) {
    this.id = null;
    this.deckname = null;
    this.creationdate = null;
    Object.assign(this, data);
  }
}
export default Deck;
