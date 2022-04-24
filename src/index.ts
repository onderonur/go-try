export type GoTryResult<Data, E extends Error = Error> =
  | [null, Data]
  | [E, null];

export async function goTry<D, E extends Error = Error>(
  callback: () => Promise<D>,
): Promise<GoTryResult<D, E>> {
  try {
    const data = await callback();
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}

export function goTrySync<D, E extends Error = Error>(
  callback: () => D,
): GoTryResult<D, E> {
  try {
    const data = callback();
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}
