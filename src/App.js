import { Console, Random } from "@woowacourse/mission-utils";

const SINGLE_DIGIT = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async function readCarNames() {
  return await Console.readLineAsync(
    "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
  );
}

async function readRoundCount() {
  return await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
}

function parseCarNames(input) {
  return input.split(",").map((name) => name.trim());
}

function initializeDistances(cars) {
  return Array.from({ length: cars.length }, () => 0);
}

function moveCar() {
  const randomNumber = Random.pickNumberInList(SINGLE_DIGIT);
  return randomNumber >= 4 ? 1 : 0;
}

function updateDistances(distances) {
  return distances.map((distance) => distance + moveCar());
}

function runRace(roundCount, initialDistances) {
  const finalDistances = Array.from({ length: roundCount }).reduce(
    (distances) => {
      const newDistances = updateDistances(distances);
      // TODO: print each round
      return newDistances;
    },
    initialDistances
  );

  return finalDistances;
}

class App {
  async run() {
    const carNamesInput = await readCarNames();
    const roundCountInput = await readRoundCount();

    const carNames = parseCarNames(carNamesInput);
    const roundCount = Number(roundCountInput);

    const initialDistances = initializeDistances(carNames);

    const finalDistances = runRace(roundCount, initialDistances);

    // TODO: determin winner and print
  }
}

export default App;
