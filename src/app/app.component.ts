import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';

interface Rates {
  [key: string]: number;
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  amount = 1;
  toCurrency = 'AED';
  rates: Rates | undefined;
  convertedAmount: number | undefined;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.loadRates();
    this.convert();
  }

  loadRates(): void {
    const storedRates = localStorage.getItem('currencies');
    if (storedRates) {
      this.rates = JSON.parse(storedRates);
    } else {
      this.currencyService.getRates().subscribe((data) => {
        this.rates = data.rates;
        if(this.rates) {
          this.storeRates(this.rates);
        }
      });
    }
  }

  storeRates(rates: Rates): void {
    localStorage.setItem('currencies', JSON.stringify(rates));
  }

  convert(): void {
    if(this.rates) {
      this.convertedAmount = this.amount * this.rates[this.toCurrency];
    }
  }
}
