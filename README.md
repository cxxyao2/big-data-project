# Experimental big data test in playwright

## Level 0: less than 10,000 objects (by default)

```
const response = await page.waitResponse('/api/data');
const data = await response.json();
expect(data.length).toBe(10000);
```

## Level 1: less than 100,000 objects

- **Issue**: "content evicted from cache" error when using `page.waitForResponse()`
- **Root cause**: Response body is a stream - once consumed, can't be re-read. Playwright clears internal buffers for large responses.
- **Solution**: Use `page.route()` to intercept BEFORE stream is consumed

```
let responseResolver: (data:any) => void;
const intercepted = new Promise(resolve => responseResolver = resolve);

test('Handle large response', async ({ page }) => {
  await page.route('**/api/all-users', async (route) => {
    try{
        const response = await route.fetch();
        const text = await response.text();
        const responseData = JSON.parse(text);
        responseResolver(responseData);

        // Fulfill with original response
        await route.fulfill({
            response,
            body: JSON.stringify(responseData)
        });
    } catch(err){
        console.error(err);
        responseResolver(null);
    }finally{
        route.continue();
    });

    await page.goto('/users');
    // Wait for response to be intercepted
    const response = await intercepted;

    if(!response || !response.users){
        throw new Error('No response');
    }

    const users = response.users;
    expect(users.length).toBe(100000);

  });
```

- key improvements:
  - `responseResolver` - store the resolve function outside the test
  - `intercepted` Promise - created before route handler, waits for response
  - `try-catch-finally` - proper error handling (remove invalid finally)
  - `Jons.parse(text)` - Parses after reading as text
  - `responseResolver(responseData)` - Resolves promise when data is ready
  - `await intercepted;` - Wait for promise to resolve before accessing data

## Level 2: less than 1,000,000 objects

- 1 million objects, 1000000 \* 100 bytes = 100MB

- **issue**: In playwright `response.text();` gets timeout error;
- **root cause**: 100MB is too large for `response.text()`
- **solution**: Use `stream-json` to parse the response stream

```
npm install --save-dev stream-json
```

we use `stream-json` to parse the response stream, and use `async/await` to wait for the stream to finish parsing.

```
import { Readable} from 'stream';
import {chain} from 'stream-chain';
improt {parser} from 'stream-json';
improt {pick} from 'stream-json/filters/Pick';
import { streamArray } from 'stream-json/streamers/StreamArray';

test('stream 1M users and check if Mike is there', async ({ page }) => {
    // important: we cal backend directly from Node(Playwright side),
    // not through page.route / route.fetch ,because we want streaming


    const response = await fetch('http://localhost:3000/api/all-users');
    if(!response.body){
        throw new Error('No response body');
    }

  // Convert web ReadableStream to Node.js readable stream
    const nodeStream = Readable.from(response.body as any);
    const pipeline = chain([
        nodeStream,
        parser(),
        pick({filter: 'users'}),  // go into 'users' property. response is like { users: [] , count: 1000000 }
        streamArray()
    ]);

    let foundMike = false;
    for await (const {value} of pipeline){
        if(value.name === 'Mike'){
            foundMike = true;
            break;
        }
    }

    expect(foundMike).toBe(true);


})

```

## Level 3: more than 10,000,000 objects status:not implemented

- Generate 10 million objects with pagination on backend (batch streaming); if no pagination, node.js has issue when allocating 10 million objects to memory
- Frontend: Use CDK virtual scrolling to render only visible rows
- Solutions to be implemented:
  - Backend: Async batch generation with garbage collection yields
  - Frontend: Virtual scroll viewport (renders only ~20-30 DOM nodes)
  - Testing: Stream-based JSON parsing for large responses
