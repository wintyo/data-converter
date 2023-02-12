# Data Converter

Convert deeply object data by object path.

## Installation

### yarn

```
$ yarn add @wintyo/data-converter
```

### npm

```
$ npm install --save @wityo/data-converter
```

## Usage

### Convert every keys

```typescript
import { convert } from '@wintyo/data-converter';

const simpleObj = {
  num: 0,
  date: '2023-01-14T02:03:03.956Z',
};

const convertedData = convert(simpleObj, {
  date: (value) => new Date(value),
});
/*
 * equal to
 * {
 *   num: 0,
 *   date: new Date('2023-01-14T02:03:03.956Z')
 * }
 */
```

You can also convert array type and array object type.

```typescript
import { convert } from '@wintyo/data-converter';

const arrObj = {
  arrDate: ['2023-01-14T02:03:03.956Z', '2023-01-14T02:03:03.956Z'],
  arrObj: [
    {
      text: '',
      arrObjDate: '2023-01-14T02:03:03.956Z',
    },
  ],
  arrDoubleDate: [
    ['2023-01-14T02:03:03.956Z'],
    ['2023-01-14T02:03:03.956Z', '2023-01-14T02:03:03.956Z'],
  ],
};

const convertedData = convert(arrObj, {
  'arrDate[]': (value) => new Date(value),
  'arrObj[].arrObjDate': (value) => new Date(value),
  'arrDoubleDate[][]': (value) => new Date(value),
});
/**
 * equal to
 * {
 *   arrDate: [
 *     new Date('2023-01-14T02:03:03.956Z'),
 *     new Date('2023-01-14T02:03:03.956Z'),
 *   ],
 *   arrObj: [
 *     {
 *       text: '',
 *       arrObjDate: new Date('2023-01-14T02:03:03.956Z'),
 *     },
 *   ],
 *   arrDoubleDate: [
 *     [new Date('2023-01-14T02:03:03.956Z')],
 *     [
 *       new Date('2023-01-14T02:03:03.956Z'),
 *       new Date('2023-01-14T02:03:03.956Z'),
 *     ],
 *   ],
 * }
 */
```

In Addition, you can convert tuple type!

```typescript
import { convert } from '@wintyo/data-converter';

const tupleObj = {
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
      num: 0,
      tupleObjDate: '2023-01-14T02:03:03.956Z',
    },
  ] as [
    { text: string; tupleObjDate: string },
    { num: number; tupleObjDate: string }
  ],
};

const convertedData = convert(tupleObj, {
  // you can pick key of tuple value
  tupleDate: ([value1, value2]) =>
    [new Date(value1), new Date(value2)] as [Date, Date],
  'tupleObj[0].tupleObjDate': (value) => new Date(value),
});
/**
 * equal to
 * {
 *   tupleDate: [
 *     new Date('2023-01-14T02:03:03.956Z'),
 *     new Date('2023-01-14T02:03:03.956Z'),
 *   ],
 *   tupleObj: [
 *     {
 *       text: '',
 *       tupleObjDate: new Date('2023-01-14T02:03:03.956Z'),
 *     },
 *     {
 *       num: 0,
 *       tupleObjDate: '2023-01-14T02:03:03.956Z',
 *     },
 *   ],
 * };
 */
```

#### very deep object

This converter is up to 4 depth. If you want to convert more deeply object, You can use nest convert.

```typescript
const veryDeepObj = {
  depth1: {
    depth2: {
      depth3: {
        depth4: {
          depth5: {
            num: 0,
            date: '2023-01-14T02:03:03.956Z',
          },
        },
      },
    },
  },
  deepArr: [[[[['2023-01-14T02:03:03.956Z']]]]],
};

const convertedData = convert(veryDeepObj, {
  // you can pick up to 3 depth value
  'depth1.depth2.depth3': (obj) => {
    // reuse convert to more deeply path
    return convert(obj, {
      'depth4.depth5.date': (value) => new Date(value),
    });
  },
  // you can also array pattern
  'deepArr[][]': (arr) => {
    return convert(arr, {
      '[][][]': (value) => new Date(value),
    });
  },
});
```

### Convert specific type

If you want to convert only type (ex. string to date only), you can use specificConverter.

```typescript
import { createSpecificConverter } from '@wintyo/data-converter';

const convertDate = createSpecificConverter((value: string) => new Date(value));

// choose keys if you want convert date
const convertedSimpleObj = convertDate(simpleObj, ['date'] as const);
const convertedArrObj = convertDate(arrObj, [
  'arrDate[]',
  'arrObj[].arrObjDate',
  'arrDoubleDate[][]',
] as const);
const convertedTupleObj = convertDate(tupleObj, [
  'tupleDate[0]',
  'tupleObj[1].tupleObjDate',
] as const);
```

## License

MIT
