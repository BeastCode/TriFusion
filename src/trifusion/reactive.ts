type Subscriber = () => void;

class Dep {
  private subscribers: Set<Subscriber> = new Set();

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber());
  }
}

let activeEffect: Subscriber | null = null;

export function reactive<T extends object>(target: T): T {
  const deps = new Map<string | symbol, Dep>();

  return new Proxy(target, {
    get(target, key, receiver) {
      const dep = deps.get(key) || new Dep();
      deps.set(key, dep);
      dep.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      const dep = deps.get(key);
      if (dep) {
        dep.notify();
      }
      return result;
    }
  });
}

export function effect(fn: Subscriber) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}