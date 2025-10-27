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

function splitCarNames(input) {
  return input.split(",").map((name) => name.trim());
}

function validateCarNameLength(name) {
  if (name.length > 5 || name.length == 0) {
    throw new Error("[ERROR]: 자동차 이름은 1자 이상 5자 이하만 가능합니다.");
  }
  return name;
}

function parseCarNames(input) {
  const carNames = splitCarNames(input);
  return carNames.map(validateCarNameLength);
}

function validateRoundCount(count) {
  if (isNaN(count)) {
    throw new Error("[ERROR]: 시도 횟수는 숫자만 가능합니다.");
  }
  if (count < 0) {
    throw new Error("[ERROR]: 시도 횟수에 음수는 입력할 수 없습니다.");
  }
  return count;
}

function parseRoundCount(input) {
  const roundCount = Number(input);
  return validateRoundCount(roundCount);
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
