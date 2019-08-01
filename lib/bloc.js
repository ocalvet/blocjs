import { BehaviorSubject, Subject } from 'rxjs';

class Bloc {
  constructor() {
    this._events = new Subject();
    this.currentState = this.initialState;
    this._states = new BehaviorSubject(this.currentState);
    this.eventsSubscription = this.transform(this._events, async event => {
      if (this.mapEventsToState) {
        const generator = this.mapEventsToState(event);
        for await (let state of generator) {
          this._states.next(state);
        }
      }
    });
    this.statesSubscriptions = this._states.subscribe(
      state => (this.currentState = state)
    );
  }

  transform(events, next) {
    return events.subscribe(next);
  }

  dispatch(event) {
    this._events.next(event);
  }

  dispose() {
    this._events.complete();
    this._states.complete();
    this.eventsSubscription.unsubscribe();
    this.statesSubscriptions.unsubscribe();
  }
}

export default Bloc;
