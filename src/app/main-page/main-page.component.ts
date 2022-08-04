import {Component, OnInit} from '@angular/core';
import {ExchangeRatesService} from '../services/exchange-rates.service';
import {Currency} from "../models/currency.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {ExchangeForm} from "../models/exchange-form.interface";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  currencyList: Currency[] = [Currency.USD, Currency.EUR, Currency.UAH];
  group: FormGroup = new FormGroup<ExchangeForm>({
    currencyLeft: new FormControl(Currency.UAH, {nonNullable: true}),
    valueLeft: new FormControl(0, {nonNullable: true}),
    currencyRight: new FormControl(Currency.USD, {nonNullable: true}),
    valueRight: new FormControl(0, {nonNullable: true}),
  });

  constructor(public exchangeRates: ExchangeRatesService) {
  }

  ngOnInit() {
    this.group.get('valueLeft')?.valueChanges.subscribe(() => {
      this.exchangeLeftRight();
    });

    this.group.get('valueRight')?.valueChanges.subscribe(() => {
      this.exchangeRightLeft();
    })

    this.group.get('currencyLeft')?.valueChanges.subscribe(() => {
      this.exchangeLeftRight();
    })

    this.group.get('currencyRight')?.valueChanges.subscribe(() => {
      this.exchangeRightLeft();
    })
  }

  exchangeLeftRight() {
    this.group.get('valueRight')?.setValue(
      this.exchangeRates.exchange(
        `${this.group.get('currencyLeft')?.value}to${this.group.get('currencyRight')?.value}`,
        this.group.get('valueLeft')?.value
      ),
      { emitEvent: false }
    );
  }

  exchangeRightLeft() {
    this.group.get('valueLeft')?.setValue(
      this.exchangeRates.exchange(
        `${this.group.get('currencyRight')?.value}to${this.group.get('currencyLeft')?.value}`,
        this.group.get('valueRight')?.value
      ),
      { emitEvent: false }
    );
  }

}
