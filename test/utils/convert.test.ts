import { simpleObj, arrObj, tupleObj } from '../__mocks__/data';
import { convert } from '../../src/utils/convert';

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

  it('arrObj', () => {
    const result = convert(arrObj, {
      'arrDate[]': (value) => new Date(value),
      'arrObj[].arrObjDate': (value) => new Date(value),
      'arrDoubleDate[][]': (value) => new Date(value),
    });
    const expected: typeof result = {
      arrDate: [
        new Date('2023-01-14T02:03:03.956Z'),
        new Date('2023-01-14T02:03:03.956Z'),
      ],
      arrObj: [
        {
          text: '',
          arrObjDate: new Date('2023-01-14T02:03:03.956Z'),
        },
      ],
      arrDoubleDate: [
        [new Date('2023-01-14T02:03:03.956Z')],
        [
          new Date('2023-01-14T02:03:03.956Z'),
          new Date('2023-01-14T02:03:03.956Z'),
        ],
      ],
    };
    expect(result).toStrictEqual(expected);
  });

  it('tupleObj', () => {
    const result = convert(tupleObj, {
      tupleDate: ([value1, value2]) =>
        [new Date(value1), new Date(value2)] as [Date, Date],
      'tupleObj[0].tupleObjDate': (value) => new Date(value),
    });
    const expected: typeof result = {
      tupleDate: [
        new Date('2023-01-14T02:03:03.956Z'),
        new Date('2023-01-14T02:03:03.956Z'),
      ],
      tupleObj: [
        {
          text: '',
          tupleObjDate: new Date('2023-01-14T02:03:03.956Z'),
        },
        {
          num: 0,
          tupleObjDate: '2023-01-14T02:03:03.956Z',
        },
      ],
    };
    expect(result).toStrictEqual(expected);
  });
});
