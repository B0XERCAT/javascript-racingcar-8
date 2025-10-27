import { Console } from "@woowacourse/mission-utils";
import { parseCarNames, parseRoundCount } from "./validators.js";
import { initializeDistances, runRace, getWinners } from "./race.js";

async function readCarNames() {
  return await Console.readLineAsync(
    "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
  );
}

async function readRoundCount() {
  return await Console.readLineAsync("시도할 횟수는 몇 회인가요?\n");
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
