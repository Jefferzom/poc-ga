import { TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataContractAdapter {
  constructor(private titlecasePipe: TitleCasePipe) {}

  adaptData(response: any) {
    if (response.hasOwnProperty('contracts')) {
      response.contracts = this.transformData(response.contracts)
    }
    return response
  }

  public transformSubstring(str: string) {
    return this.titlecasePipe.transform(str)
  }

  public transformData(constracts: any) {
    return constracts.map((contract: any) => ({
      ...contract,
      type: this.transformSubstring(contract.type),
      dateOfStart: this.transformData(contract.dateOfStart),
      dueDate: this.transformData(contract.dueDate),
      dateOfBlocking: this.transformData(contract.dateOfBlocking),
    }));
  }

  public transformDate(dateString: string): string {
    const formattedDate = moment(dateString).format('DD/MM/YYYY');
    return formattedDate
  }

}