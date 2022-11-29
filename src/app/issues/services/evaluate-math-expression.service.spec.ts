import { TestBed } from '@angular/core/testing';

import { EvaluateMathExpressionService } from './evaluate-math-expression.service';

describe('EvaluateMathExpressionService', () => {
  let service: EvaluateMathExpressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluateMathExpressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('replaceMathExpression', () => {
    it('should replace math expression with <code>math expression = result</code>', () => {
      const expected = '<code>1+2+5-1=8</code>';
      const input = '1+2+5-1';

      expect(service.replaceMathExpression(input)).toEqual(expected);
    });

    it('should replace only math expression part', () => {
      const expected =
        'Some text starts here <code>1+2+5-1=8</code> and ends here.';
      const input = 'Some text starts here 1+2+5-1 and ends here.';

      expect(service.replaceMathExpression(input)).toEqual(expected);
    });

    it('should do nothing for text-only input values', () => {
      const expected = 'Regular text';
      const input = 'Regular text';

      expect(service.replaceMathExpression(input)).toEqual(expected);
    });
  });
});
