import { simpleObj } from '~/__mocks__/data';
import { convert } from './convert';

describe('convert', () => {
  it('simpleObj', () => {
    const result = convert(simpleObj, {
      date: (value) => new Date(value),
    });
    const expected: typeof result = {
      num: 0,
      date: new Date('2023-01-14T02:03:03.956Z'),
    };
    expect(result).toStrictEqual(expected);
  });
});
