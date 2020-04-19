export const fetchRandomJokes = (count: number, signal: AbortSignal) =>
  fetch(`http://api.icndb.com/jokes/random/${count}`, {signal}).then((res) =>
    res.json(),
  );
