import { Console } from "@woowacourse/mission-utils";

async function readUserInput() {
  return await Console.readLineAsync(
    "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
  );
}

function extractCars(input) {
  return input.split(",").map((name) => name.trim());
}

class App {
  async run() {
    const userInput = await readUserInput();
    const cars = extractCars(userInput);
  }
}

export default App;
