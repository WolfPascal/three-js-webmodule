import "./styles/main.scss"

import { InputManager } from "./js/input/InputManager";
import { GameCore } from "./js/core/GameCore";


var gameModules =
    [
        new GameCore(),
        new InputManager()
    ];


function loadGameModules() {
    var gameModulesCounter = 0;
    var gameModulesCounterSuccess = 0;
    var gameModulesCounterFailed = 0;
    gameModules.forEach(element => {
        gameModulesCounter++;
        try {
            element.init();
            console.log(`Gamemodule ${element.constructor.name} successful loaded.`);
            gameModulesCounterSuccess++;
        } catch (e) {
            console.log(`Gamemodule ${element} failed.`);
            gameModulesCounterFailed++;
        }
    });
    console.log(`${gameModulesCounter} Gamemodules loaded.`);
    console.log(`\tSuccessful: ${gameModulesCounterSuccess}`);
    console.log(`\tFailed: ${gameModulesCounterFailed}`);
}

loadGameModules();