export const fetchRandomJokes = (count: number, signal: AbortSignal) =>
  fetch(`http://api.icndb.com/jokes/random/${count}`, {signal}).then((res) =>
    res.json(),
  );

export const sendJoke = async (
  emails: string[],
  joke: string,
  signal: AbortSignal,
) => {
  return await new Promise((res, rej) => {
    const timeOut = setTimeout(() => {
      res('success!');
    }, 1500);

    signal.onabort = () => {
      clearTimeout(timeOut);
      rej('Aborted!');
    };
  });
};
