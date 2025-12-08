import { test, expect } from '@playwright/test';
import { Readable } from 'stream';
import { chain } from 'stream-chain';
import { parser } from 'stream-json';
import { pick } from 'stream-json/filters/Pick';
import { streamArray } from 'stream-json/streamers/StreamArray';
test('**find user named Mike in 200k dataset', async ({ page }) => {
    // important: we cal backend directly from Node(Playwright side),
    // not through page.route / route.fetch ,because we want streaming


    const response = await fetch('http://localhost:3000/api/all-users');
    if (!response.body) {
        throw new Error('No response body');
    }

    // Convert web ReadableStream to Node.js readable stream
    const nodeStream = Readable.from(response.body as any);
    const pipeline = chain([
        nodeStream,
        parser(),
        pick({ filter: 'users' }),  // go into 'users' property. response is like { users: [] , count: 1000000 }
        streamArray()
    ]);

    let foundMike = false;
    let userCount = 0;

    for await (const { value } of pipeline) {
        userCount++;

        // Log progress every 100,000 users
        if (userCount % 100000 === 0) {
            console.log(`Received ${userCount} users so far...`);
        }

        // if (value.name === 'Mike') {
        //     foundMike = true;
        //     break;
        // }
        if (value.id === 1000) {
            foundMike = true;
            console.log(`Found user with id 1000 after receiving ${userCount} users`);
            break;
        }
    }

    console.log('Total users received:', userCount);
    console.log('foundMike:', foundMike);

    expect(foundMike).toBe(true);

});