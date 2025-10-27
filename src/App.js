import { Console, Random } from "@woowacourse/mission-utils";

const SINGLE_DIGIT = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

async function readCarNames() {
  return await Console.readLineAsync(
    "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
  );
}

async function readRoundCount() {
  return await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
}

function parseCarNames(input) {
  const carNames = input.split(",").map((name) => {
    if (name.trim().length > 5) {
      throw new Error("[ERROR]: 자동차 이름은 5자 이하만 가능합니다.");
    }
    return name.trim();
  });
  return carNames;
}

function parseRoundCount(input) {
  const roundCount = Number(input);
  if (isNaN(roundCount)) {
    throw new Error("[ERROR]: 시도 횟수는 숫자로 입력해주세요.");
  }
  return roundCount;
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

function printRoundResult(distances, carNames) {
  Console.print("");
  distances.map((distance, index) => {
    Console.print(`${carNames[index]} : ${"-".repeat(distance)}`);
  });
}

function runRace(roundCount, initialDistances, carNames) {
  Console.print("실행 결과");
  const finalDistances = Array.from({ length: roundCount }).reduce(
    (distances) => {
      const newDistances = updateDistances(distances);
      printRoundResult(newDistances, carNames);
      return newDistances;
    },
    initialDistances
  );

  return finalDistances;
}

function getWinners(finalDistances, carNames) {
  const maxDistance = Math.max(...finalDistances);
  const winners = carNames.filter(
    (_, index) => finalDistances[index] === maxDistance
  );
  return winners;
}

function printFinalResult(winners) {
  Console.print(`\n최종 우승자 : ${winners.join(", ")}`);
}
class App {
  async run() {
    const carNamesInput = await readCarNames();
    const carNames = parseCarNames(carNamesInput);

    const roundCountInput = await readRoundCount();
    const roundCount = parseRoundCount(roundCountInput);

    const initialDistances = initializeDistances(carNames);

    const finalDistances = runRace(roundCount, initialDistances, carNames);

    const winners = getWinners(finalDistances, carNames);

    printFinalResult(winners);
  }
}

export default App;
