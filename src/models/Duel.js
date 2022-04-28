/**
 * Duel model
 */
class Duel {
    constructor(data = {}) {
        this.id = null;
        this.deckid = null;
        this.playerOneId = null;
        this.playerTwoId = null;
        this.playerOneScore = null;
        this.playerTwoScore = null;
        this.playerOneStatus = null;
        this.playerTwoStatus = null;
        Object.assign(this, data);
    }
}
export default Duel;