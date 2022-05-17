/**
 * Deck model
 */
class deck {
    constructor(data = {}) {
        this.id = null;
        this.deckname = null;
        this.creationdate = null;
        Object.assign(this, data);
    }
}
export default deck;