Buổi 28: Asynchronous trong JavaScript

## Asynchronous callback

- setTimeout
- setInterval
- clearTimeout
- addEventListener
  - xhr.addEventListener("readystatechange", callback)
- removeEventListener

## Promise

- fetch(url, options)
- Promise chaining
- new Promise
- promise.then, promise.catch, promise.finally
- Promise.all
- Promise.race
- Promise.allSettled
- Promise.any
- Promise.resolve
- Promise.reject

## Async/await

- async function
- await expression
- try/catch

## Event loop

- Call stack
- Web APIs
- Event loop
- Task queue
  - Microtask queue
  - Macrotask queue

## Fetch API

- fetch(url, options)

## AbortController

- abortController.abort()
- abortController.signal

## Web Workers

- new Worker(url, options)
- worker.postMessage(message)
- worker.addEventListener("message", callback)
- self.postMessage(message)
- self.addEventListener("message", callback)
- worker.terminate()
- self.close()
