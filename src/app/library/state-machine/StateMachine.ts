export interface TransitionType<Transition, Vertex, State> {
  type: Transition;
  from: Vertex;
  to: Vertex;
  condition?: (state: State) => boolean;
}

export type Reducer<State, Action> = (state: State, action: Action) => State;

export interface StateForAction<Transition, Payload> {
  type: Transition;
  payload: Payload;
}

export const configureActionCreator = <Transition>() =>
  <T extends Transition, P>(
    type: T,
    payload: P
  ): StateForAction<T, P> => ({type, payload});

type SubscribeCallback<Transition, State, Vertex> = (transition: Transition, state: State, vertex: Vertex) => void;
export type UnsubscribeCallback = () => void;

export class Machine<Vertex, Transition, State, Action> {
  private state: State;
  private vertex: Vertex;
  private subscribers: SubscribeCallback<Transition, State, Vertex>[] = [];

  constructor(
    private initialState: State,
    private initialVertex: Vertex,
    private transitions: Array<TransitionType<Transition, Vertex, State>>,
    private reducer?: Reducer<State, Action>
  ) {
    this.state = initialState;
    this.vertex = initialVertex;
  }

  private getTransitionItem(transitionType: Transition): TransitionType<Transition, Vertex, State> {
    return this.transitions.find((tran: TransitionType<Transition, Vertex, State>) =>
      tran.type === transitionType &&
      tran.from === this.vertex &&
      (typeof tran.condition !== 'undefined' ? tran.condition(this.state) : true)
    );
  }

  can(transition: Transition): boolean {
    const tran = this.getTransitionItem(transition);

    return typeof tran !== 'undefined';
  }

  dispatch(action: Action & { type: Transition }): void {
    const transition = this.getTransitionItem(action.type);

    try {
      this.vertex = transition.to;

      if (this.reducer) {
        this.state = this.reducer(this.state, action);
      }

      this.subscribers.forEach((subs: SubscribeCallback<Transition, State, Vertex>) => {
        subs(action.type, this.state, this.vertex);
      });
    } catch (e) {
      throw new Error(`Finite State Machine: You try do incorrect transition (${action.type}).`);
    }
  }

  subscribe(callback: SubscribeCallback<Transition, State, Vertex>): UnsubscribeCallback {
    this.subscribers.push(callback);

    return () => {
      const index = this.subscribers.findIndex((sub: SubscribeCallback<Transition, State, Vertex>) => sub === callback);

      this.subscribers.splice(index, 1);
    };
  }

  getVertex(): Vertex {
    return this.vertex;
  }

  getState(): State {
    return this.state;
  }
}
