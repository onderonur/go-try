# go-try
![Build status](https://img.shields.io/github/workflow/status/onderonur/go-try/CI)
![License](https://img.shields.io/npm/l/go-try)
![Version](https://img.shields.io/npm/v/go-try)  
go-try is a zero dependency npm package inspired by [Go](https://golang.org/) programming language (Golang). Its main goal is to reduce use of try-catch blocks in JavaScript/TypeScript code and make exception handling easier with a more flattened structure. It can be used with async or sync functions. It's compatible with both browser and server-side applications.

## Async Example
Let's say that we want to fetch some user and product data from an outer source (like a database, or an API etc) and create an order. To do that, we need to run an some async functions and continue if they succeed. And we need to handle the exceptions, if there are any.  
With try-cath blocks, you can do it like this:
```ts
async function main() {
  try {
    const userId = 123;
    const user = await getUser(userId);
    try {
      const productId = 456;
      const product = await getProduct(productId);
      try {
        const order = await createOrder(user, product);
        return order;
      } catch (err) {
        console.log('Create order failed');
      }
    } catch (err) {
      console.log('Fetch product failed');
    }
  } catch (err) {
    console.log('Fetch user failed');
  }
}

```
It's handy, but it can create some hard to read, pyramid style code. Sometimes flat code is easier to read and more clear.  
So, the code turns into this with go-try:
```ts
import { goTry } from 'go-try';

async function main() {
  const userId = 123;
  const userResult = await goTry(() => getUser(userId));
  if (userResult.error) {
    console.log('Get user failed');
    return;
  }
  const user = userResult.data;

  const productId = 456;
  const productResult = await goTry(() => getProduct(productId));
  if (productResult.error) {
    console.log('Get product failed');
    return;
  }
  const product = productResult.data;

  const orderResult = await goTry(() => createOrder(user, product));
  if (orderResult.error) {
    console.log('Create order failed');
    return;
  }
  return orderResult.data;
}

```
`go` function returns a promise that resolves with an object. The object has 2 fields.  
`result.data` is the response of your async function. If the function fails, it will be null. Otherwise, it's whatever the async function returns.  
`result.error` is the exception that your async function throws. If the function succeeds, it will be null.  
So basically, **if `result.error` is `null`, your async function didn't throw an error.** All we need to do is check it before running rest of our code.

## Sync Example
Everything above applies for sync functions too. The only difference is, you need to use `goTrySync` instead of `goTry`.
```ts
import { goTrySync } from "go-try";

const result = goTrySync(() => someSyncFunction());
if(result.error) {
  console.log("Failed");
}
// Rest of the code

```

## Desctructuring
You can also use destructuring like this:
```ts
const { data, error } = await go(() => getUser());
if(error) {
  console.log("Failed");
  return;
}
// At this point, TypeScript can't understand that the error is null,
// so data should be the type of what's resolved by promise returned by getUser function.
// But TypeScript thinks it can be null too. So if we use TypeScript, we need an extra check like:
if(!data) {
  return;
}
// Rest of the code

```

## With TypeScript
Basically, you don't need to specify type of your returned `data`. `goTry` and `goTrySync` are generic functions. So, they can understand what is your data type by themselves. But if you want to explicitly specify your `data` and `error` type, you can do that too.  
For example:
```ts
// Let's say that your function returns an array of some users.
// And it throws a custom error instance of a class that extends Error
// (like a NotFoundError, AxiosError etc)
interface User {
  id: string;
  firstName: string;
  lastName: string
}

// ...
const result = await goTry<User[], NotFoundError>(() => getUsers());
// or
const result = goTrySync<User[], NotFoundError>(() => getUsersSync());

// Or you can just specify your data type if your error is a classic Error instance
const result = await goTry<User[]>(() => getUsers());
// or
const result = goTrySync<User[]>(() => getUsersSync());

```

_(This package is created by using [TSDX](https://github.com/formium/tsdx).)_
