export const simpleObj = {
  num: 0,
  date: '2023-01-14T02:03:03.956Z',
};

export const arrObj = {
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

export const tupleObj = {
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

export const veryDeepObj = {
  depth1: {
    depth2: {
      depth3: {
        depth4: {
          depth5: {
            depth6: {
              num: 0,
              date: '2023-01-14T02:03:03.956Z',
            },
          },
        },
      },
    },
  },
  deepArr: [[[[[['2023-01-14T02:03:03.956Z']]]]]],
};

export const mergedObj = {
  ...simpleObj,
  ...arrObj,
  ...tupleObj,
};
