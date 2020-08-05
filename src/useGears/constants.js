// step for a gear of 1 teeth
// gears for more steps will be calculated with this formula:
// realRotationStep = rotationStep / numberOfTeeth
export const rotationStep = 0.2;

const x1 = 0.1;
const y1 = -0.2;

const x2 = -0.42;
const y2 = 0.41;

const x3 = 0.56;
const y3 = 0.28;

export const gears = [
  {
    center: [x1, y1],
    direction: 'counterclockwise',
    numberOfTeeth: 20,
    radius: 0.45,
    fillColor: [0.878, 0.878, 0.878],
    children: [
      {
        center: [x1, y1],
        radius: 0.4,
        strokeColor: [0.682, 0.682, 0.682],
      },
      {
        center: [x1, y1],
        radius: 0.07,
        fillColor: [0.741, 0.741, 0.741],
        strokeColor: [0.682, 0.682, 0.682],
      },
      {
        center: [x1 - 0.23, y1],
        radius: 0.12,
        fillColor: [1, 1, 1],
        strokeColor: [0.682, 0.682, 0.682],
      },
      {
        center: [x1, y1 - 0.23],
        radius: 0.12,
        fillColor: [1, 1, 1],
        strokeColor: [0.682, 0.682, 0.682],
      },
      {
        center: [x1 + 0.23, y1],
        radius: 0.12,
        fillColor: [1, 1, 1],
        strokeColor: [0.682, 0.682, 0.682],
      },
      {
        center: [x1, y1 + 0.23],
        radius: 0.12,
        fillColor: [1, 1, 1],
        strokeColor: [0.682, 0.682, 0.682],
      },
    ],
  },
  {
    center: [x2, y2],
    direction: 'clockwise',
    numberOfTeeth: 12,
    radius: 0.3,
    fillColor: [0.741, 0.741, 0.741],
    children: [
      {
        center: [x2, y2],
        radius: 0.25,
        strokeColor: [0.682, 0.682, 0.682],
      },
      {
        center: [x2, y2],
        radius: 0.1,
        fillColor: [0.682, 0.682, 0.682],
        strokeColor: [0.6, 0.6, 0.6],
      },
    ],
  },
  {
    center: [x3, y3],
    direction: 'clockwise',
    numberOfTeeth: 6,
    radius: 0.15,
    fillColor: [0.741, 0.741, 0.741],
    children: [
      {
        center: [x3, y3],
        radius: 0.1,
        strokeColor: [0.682, 0.682, 0.682],
      },
      {
        center: [x3, y3],
        radius: 0.02,
        fillColor: [0.682, 0.682, 0.682],
        strokeColor: [0.6, 0.6, 0.6],
      },
    ],
  },
];
