//import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export class InputManager {

    constructor() {
        if(InputManager._instance) {
            return InputManager._instance;
        } else {
            InputManager._instance = this;
        }
    }

    init() {
        
    }

}