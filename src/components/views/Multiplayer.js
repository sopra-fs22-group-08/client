import BaseContainer from "../ui/BaseContainer";
import {useLocation} from "react-router-dom";
import React from "react";


const Multiplayer = () => {

    const duel = useLocation();

    return (
        <BaseContainer>
            <h1> Here you wait until the other player has invited your invitation</h1>
        </BaseContainer>
    );
}

export default Multiplayer;