import {Currency} from "./currency.interface";
import {FormControl} from "@angular/forms";

export interface ExchangeForm {
  currencyLeft: FormControl<Currency>;
  valueLeft: FormControl<number>;
  currencyRight: FormControl<Currency>;
  valueRight: FormControl<number>;
}
