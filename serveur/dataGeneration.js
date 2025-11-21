const TARGETS = ['W', 'M'];
const MAX_NUM = 5;
const MAX_ATTEMPTS_WITHIN_2_SEC = 10;

function rndInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function rndSuccess() {
  // p(SUCCESS) = .65
  return Math.random() < 0.65 ? true : false;
}

function rndNumber() {
  // the given chance to obtain Num+1 is half the chance to obtain Num
  // pick a random value btwn [0; 1[
  const rnd = Math.random();
  let minThreeshold = 0.5;
  let candidateValue = 1;
  while (rnd >= minThreeshold && candidateValue < MAX_NUM) {
    minThreeshold = minThreeshold + (1 - minThreeshold) / 2;
    candidateValue++;
  }
  return candidateValue;
}

function rndTarget() {
  // p(W) = 0,70
  const idx = Math.random() < 0.70 ? 0 : 1;
  return TARGETS[idx];
}

function createRndAttempt(tsDate) {
  return [
    tsDate.toISOString(), // timestamp
    rndSuccess(), // success
    rndNumber(), // number
    rndTarget(), // target
  ]
}

async function* generateRndAttempsFromStart(start) {
  const TIME_RANGE = 2000; // 2 secondes
  // get start and current timestamp in millis
  let tsCursorStart = start.getTime()
  const nowTs = Date.now();
  let tsCursorEnd;
  while (tsCursorStart < nowTs) {
    // calcule borne temp superior
    tsCursorEnd = Math.min(tsCursorStart + TIME_RANGE, nowTs);
    // calcule un tableau trié par timestamp
    // de 0 à MAX_ATTEMPTS_WITHIN_2_SEC timestamp entre
    // tsCursorStart et tsCursorEnd
    yield* Array.from({ length: rndInt(MAX_ATTEMPTS_WITHIN_2_SEC) },
      () => rndInt(tsCursorEnd, tsCursorStart))
      .sort()
      .map((ts) => createRndAttempt(new Date(ts)));
    // passe au ts start suivant
    tsCursorStart += TIME_RANGE;
  }
}

function createRndAttempsFromStart(start) {
  return Array.from(generateRndAttempsFromStart(start));
}

module.exports = {
  generateRndAttempsFromStart,
  createRndAttempsFromStart
};