export class LifeCycle {

    constructor() {
        if(LifeCycle._instance) {
            return LifeCycle._instance;
        } else {
            LifeCycle._instance = this;
            LifeCycle._startObservers = [];
            LifeCycle._updateObservers = [];
            LifeCycle._slowUpdateObservers = [];
        }
    }

    addStartListener(observer) {
        LifeCycle._startObservers.push(observer)
    }

    addUpdateListener(observer) {
        LifeCycle._updateObservers.push(observer)
    }

    addSlowUpdateListener(observer) {
        LifeCycle._slowUpdateObservers.push(observer)
    }

    onStart() {
        LifeCycle._startObservers.forEach(observer => {
            observer();
        });
    }

    onUpdate() {
        LifeCycle._updateObservers.forEach(observer => {
            observer();
        });
    }

    onSlowUpdate() {
        LifeCycle._slowUpdateObservers.forEach(observer => {
            observer();
        });
    }

}