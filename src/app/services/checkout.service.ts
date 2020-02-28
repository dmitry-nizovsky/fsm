import { Injectable } from '@angular/core';
import { genericCheckoutMachine, CheckoutMachine } from '../core/checkout/configuration';
import {
  Item,
  add,
  remove,
  startPayment,
  pendingPayment,
  successPayment,
  failPayment,
  T,
  State,
  V
} from '../core/checkout/logic';
import { BehaviorSubject, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { UnsubscribeCallback } from '../library/state-machine/StateMachine';


@Injectable({providedIn: 'root'})
export class CheckoutService {
  private machine: CheckoutMachine;
  private unsubs: UnsubscribeCallback;

  items: BehaviorSubject<Array<Item>> = new BehaviorSubject([]);

  constructor() {
    this.machine = genericCheckoutMachine();
    this.unsubs = this.machine.subscribe((transition: T, state: State, vertex: V) => {
      if (transition === T.ADD_ITEM || transition === T.REMOVE_ITEM) {
        this.items.next(state.items);
      }
    });
  }

  unsubscribe(): void {
    this.unsubs();
  }

  can(): boolean {
    return this.machine.can(T.ADD_ITEM);
  }

  add(item: Item): void {
    this.machine.dispatch(add(item));
  }

  remove(item: Item): void {
    this.machine.dispatch(remove(item));
  }

  payment(): void {
    this.machine.dispatch(startPayment());
    this.machine.dispatch(pendingPayment());

    // look a like rest query ^_^
    timer(5000).pipe(
      take(1)
    ).subscribe(() => {
      this.machine.dispatch(successPayment());
    }, () => {
      this.machine.dispatch(failPayment());
    });
  }

}
