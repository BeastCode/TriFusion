type Reducer<S, A> = (state: S, action: A) => S;

export class Store<S, A> {
  private state: S;
  private listeners: (() => void)[] = [];

  constructor(private reducer: Reducer<S, A>, initialState: S) {
    this.state = initialState;
  }

  getState(): S {
    return this.state;
  }

  dispatch(action: A): void {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export function createStore<S, A>(reducer: Reducer<S, A>, initialState: S): Store<S, A> {
  return new Store(reducer, initialState);
}