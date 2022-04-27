/**
 * Invitation model -> Is this right? Unused fields -> Backend only return normal Invitation...
 */

class Invitation {

    constructor(data = {}) {
        this.user = null;
        this.id = null;
        this.duelId = null;
        this.senderId = null;
        this.receiverId = null;

        Object.assign(this, data);
    }
}

export default Invitation;