import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {IUAHRate} from '../models/rate.interface';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  private _UAHRete: IUAHRate = {
    USD: NaN,
    EUR: NaN,
  };

  get UAHRate(): IUAHRate {
    return this._UAHRete;
  }

  constructor(private http: HttpClient) {
    this.getUAHRate$().subscribe((UAHRate: IUAHRate) => {
      this._UAHRete = UAHRate;
    });
  }

  UAHtoUSD(UAH: number): number {
    return UAH * this._UAHRete.USD;
  }

  USDtoUAH(USD: number): number {
    return USD / this._UAHRete.USD;
  }

  UAHtoEUR(UAH: number): number {
    return UAH * this._UAHRete.EUR;
  }

  EURtoUAH(EUR: number): number {
    return EUR / this._UAHRete.EUR;
  }

  USDtoEUR(USD: number): number {
    return USD * (1 / this._UAHRete.USD * this._UAHRete.EUR);
  }

  EURtoUSD(EUR: number): number {
    return EUR * (1 / this._UAHRete.EUR * this._UAHRete.USD);
  }

  getUAHRate$(): Observable<IUAHRate> {
    return this.http.get<{ results: IUAHRate }>('https://api.fastforex.io/fetch-multi?from=UAH&to=USD,%20EUR&api_key=demo').pipe(
      map(data => data.results)
    );
  }

}
