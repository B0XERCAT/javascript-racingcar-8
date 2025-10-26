import { Console, Random } from "@woowacourse/mission-utils";

const SINGLE_DIGIT = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async function readCarsInput() {
  return await Console.readLineAsync(
    "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
  );
}

async function readCountInput() {
  return await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
}

function extractCars(input) {
  return input.split(",").map((name) => name.trim());
}

function moveCar() {
  const randomNumber = Random.pickNumberInList(SINGLE_DIGIT);
  return randomNumber >= 4 ? 1 : 0;
}

class App {
  async run() {
    const carsInput = await readCarsInput();
    const countInput = await readCountInput();

    const cars = extractCars(carsInput);
    const count = Number(countInput);
  }
}

export default App;
