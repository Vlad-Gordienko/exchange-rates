import {Component, OnInit} from '@angular/core';
import {ExchangeRatesService} from '../services/exchange-rates.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(public exchangeRates: ExchangeRatesService) {
  }

  ngOnInit() {
    setTimeout(() => {
      console.log('UAHtoUSD', this.exchangeRates.UAHtoUSD(3.5));
      console.log('USDtoUAH', this.exchangeRates.USDtoUAH(3.5));
      console.log('UAHtoEUR', this.exchangeRates.UAHtoEUR(3.5));
      console.log('EURtoUAH', this.exchangeRates.EURtoUAH(3.5));
      console.log('USDtoEUR', this.exchangeRates.USDtoEUR(3.5));
      console.log('EURtoUSD', this.exchangeRates.EURtoUSD(3.5));
    }, 1000);
  }

}
