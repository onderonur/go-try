import { goTry, goTrySync, GoTryResult } from '../src';

describe('index', () => {
  it('should return correct data and error should be null when succeeded (sync)', () => {
    const syncData: string = 'some sync data';
    const result = goTrySync<string>(() => {
      return syncData;
    });
    const expectedResult: GoTryResult<string> = [null, syncData];
    expect(result).toEqual(expectedResult);
  });

  it('should resolve a promise with correct data and error should be null when succeeded (async)', async () => {
    const asyncData: string = 'some async data';
    const result = await goTry<string>(async () => {
      return asyncData;
    });
    const expectedResult: GoTryResult<string> = [null, asyncData];
    expect(result).toEqual(expectedResult);
  });

  it('should return correct error and data should be null when failed (sync)', () => {
    const syncError = new Error('some sync error');
    const result = goTrySync(() => {
      throw syncError;
    });
    const expectedResult: GoTryResult<null, typeof syncError> = [
      syncError,
      null,
    ];
    expect(result).toEqual(expectedResult);
  });

  it('should resolve a promise with correct error and data should be null when failed (async)', async () => {
    const asyncError = new Error('some async error');
    const result = await goTry(async () => {
      throw asyncError;
    });
    const expectedResult: GoTryResult<null, typeof asyncError> = [
      asyncError,
      null,
    ];
    expect(result).toEqual(expectedResult);
  });
});
