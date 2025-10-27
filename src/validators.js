function validateCarNameLength(name) {
  if (name.length > 5 || name.length == 0) {
    throw new Error("[ERROR]: 자동차 이름은 1자 이상 5자 이하만 가능합니다.");
  }
  return name;
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

function splitCarNames(input) {
  return input.split(",").map((name) => name.trim());
}

export function parseCarNames(input) {
  const carNames = splitCarNames(input);
  return carNames.map(validateCarNameLength);
}

export function parseRoundCount(input) {
  const roundCount = Number(input);
  return validateRoundCount(roundCount);
}
