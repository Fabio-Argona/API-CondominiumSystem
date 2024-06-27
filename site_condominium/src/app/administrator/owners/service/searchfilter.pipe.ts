import { Resident } from './../../../pages/resident/model/resident';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter',
  standalone: true,
})
export class SearchfilterPipe implements PipeTransform {
  transform(resident: Resident[], searchValue: string): Resident[] {
    if (!resident || !searchValue) {
      return resident;
    } else {
      return resident.filter((resident) =>
        resident.nomeCompleto
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      );
    }
  }
}


