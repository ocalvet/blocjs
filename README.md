# Bloc implementation for javascript

## How to use

1. Install package `$ npm install blocjs`
2. Inherit from the Bloc class:

```javascript
import Bloc from 'blocjs';

class TestBloc extends Bloc {
  get initialState() {
    return {
      state: 'initial'
    };
  }
  async *mapEventsToState(event) {
    if (event === 'test:event') {
      yield new TestState();
    }
  }
}
```

3. Use your bloc class and dispatch events to generate state changes:

```javascript
const bloc = new TestBloc();
bloc.dispatch('test:event');
```

## How to contribute
