import { simpleObj, arrObj, tupleObj } from '../__mocks__/data';
import { createSpecificConverter } from '../../src/utils/createSpecificConverter';

describe('createSpecificConverter', () => {
  describe('convertDate', () => {
    const convertDate = createSpecificConverter(
      (value: string) => new Date(value)
    );

    it('simpleObj', () => {
      const result = convertDate(simpleObj, ['date'] as const);
      const expected: typeof result = {
        num: 0,
        date: new Date('2023-01-14T02:03:03.956Z'),
      };
      expect(result).toStrictEqual(expected);
    });

    it('arrObj', () => {
      const result = convertDate(arrObj, [
        'arrDate[]',
        'arrObj[].arrObjDate',
        'arrDoubleDate[][]',
      ] as const);
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
      const result = convertDate(tupleObj, [
        'tupleDate[0]',
        'tupleObj[1].tupleObjDate',
      ] as const);
      const expected: typeof result = {
        tupleDate: [
          new Date('2023-01-14T02:03:03.956Z'),
          '2023-01-14T02:03:03.956Z',
        ],
        tupleObj: [
          {
            text: '',
            tupleObjDate: '2023-01-14T02:03:03.956Z',
          },
          {
            num: 0,
            tupleObjDate: new Date('2023-01-14T02:03:03.956Z'),
          },
        ],
      };
      expect(result).toStrictEqual(expected);
    });
  });

  describe('convertNumberString', () => {
    const convertNumberString = createSpecificConverter((value: number) =>
      value.toLocaleString()
    );

    it('simpleObj', () => {
      const result = convertNumberString(simpleObj, ['num'] as const);
      const expected: typeof result = {
        num: '0',
        date: '2023-01-14T02:03:03.956Z',
      };
      expect(result).toStrictEqual(expected);
    });

    it('tupleObj', () => {
      const result = convertNumberString(tupleObj, [
        'tupleObj[1].num',
      ] as const);
      const expected: typeof result = {
        tupleDate: ['2023-01-14T02:03:03.956Z', '2023-01-14T02:03:03.956Z'] as [
          string,
          string
        ],
        tupleObj: [
          {
            text: '',
            tupleObjDate: '2023-01-14T02:03:03.956Z',
          },
          {
            num: '0',
            tupleObjDate: '2023-01-14T02:03:03.956Z',
          },
        ],
      };
      expect(result).toStrictEqual(expected);
    });
  });
});
