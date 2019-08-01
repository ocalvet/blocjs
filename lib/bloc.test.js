import Bloc from './bloc';

describe('Bloc', () => {
  it('should create a test bloc with default methods', () => {
    const bloc = new Bloc();
    expect(bloc).toBeDefined();
    expect(bloc.transform).toBeDefined();
    expect(bloc.dispose).toBeDefined();
  });

  it('should initialize the current state with return from initialState', () => {
    const initialState = { initial: true };
    class TestBloc extends Bloc {
      get initialState() {
        return initialState;
      }
    }
    const bloc = new TestBloc();
    expect(bloc.currentState).toBe(initialState);
  });

  it('should cleanup when dispose is called', () => {
    const bloc = new Bloc();
    bloc.dispose();
    expect(bloc._events.isStopped).toBeTruthy();
    expect(bloc._states.isStopped).toBeTruthy();
  });

  it('should map the test event', done => {
    const testEvent = { type: 'test:event' };
    const initialState = { state: 'initial' };
    class TestBloc extends Bloc {
      get initialState() {
        return initialState;
      }
      async *mapEventsToState(event) {
        expect(event).toBe(testEvent);
        done();
      }
    }
    const bloc = new TestBloc();
    bloc.dispatch(testEvent);
  });
});
