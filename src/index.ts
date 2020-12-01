export type GoTryResult<Data, E extends Error = Error> =
  | { data: Data; error: null }
  | { data: null; error: E };

export async function goTry<D, E extends Error = Error>(
  callback: () => Promise<D>,
): Promise<GoTryResult<D, E>> {
  try {
    const data = await callback();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export function goTrySync<D, E extends Error = Error>(
  callback: () => D,
): GoTryResult<D, E> {
  try {
    const data = callback();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
