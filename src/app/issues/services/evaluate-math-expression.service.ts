import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EvaluateMathExpressionService {
  replaceMathExpression(input: string) {
    // split input value by spaces
    const partials = input.split(' ');
    return partials
      .map(partial => {
        // check if partial match number operators string: e.g. 1+3-2
        if (partial.match(/[0-9+-]*/)?.[0]) {
          partial = `<code>${partial}=${this.calculate(partial)}</code>`;
        }
        return partial;
      })
      .join(' ');
  }

  private calculate(input: string): number {
    // split input by plus sign into sub arrays
    const plusArr = input.split(/[x^+]/);
    plusArr.forEach(partial => {
      // split partials by minus sign and calculate the result
      partial.split(/[x^-]/).reduce((prev, next) => prev - parseInt(next), 0);
    });
    // calculate sum of precalculated sub arrays
    return plusArr.reduce((prev, next) => prev + parseInt(next), 0);
  }
}
