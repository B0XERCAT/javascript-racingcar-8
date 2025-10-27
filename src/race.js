import { SINGLE_DIGIT } from "./constants.js";
import { Console, Random } from "@woowacourse/mission-utils";

export function initializeDistances(cars) {
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

export function runRace(roundCount, initialDistances, carNames) {
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

export function getWinners(finalDistances, carNames) {
  const maxDistance = Math.max(...finalDistances);
  const winners = carNames.filter(
    (_, index) => finalDistances[index] === maxDistance
  );
  return winners;
}
