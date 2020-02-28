import { Component, OnDestroy, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { Item } from '../../core/checkout/logic';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  items$ = this.checkout.items.asObservable();

  products: Item[] = [
    {
      id: 1,
      name: 'nice snikers',
      price: 100,
      quantity: 1
    },
    {
      id: 2,
      name: 'addidas snikers',
      price: 200,
      quantity: 1
    },
    {
      id: 3,
      name: 'puma snikers',
      price: 300,
      quantity: 1
    }
  ];

  constructor(
    private checkout: CheckoutService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.checkout.unsubscribe();
  }

  disable(): boolean {
    return !this.checkout.can();
  }

  add(item: Item): void {
    this.checkout.add(item);
  }

  remove(item: Item): void {
    this.checkout.remove(item);
  }

  buy(): void {
    this.checkout.payment();
  }

}
