import { RateLimiter } from './rate-limiter';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe("Test RateLimiter", () => {
  it("can send a message", () => {
    const limiter = new RateLimiter({bufferSize: 5, slidingWindowSeconds: 10});
    expect(limiter.isRequestAllowed()).toBe(true)
  });

  it("returns false when more messages are send within the sliding window", () => {
    const limiter = new RateLimiter({
      bufferSize: 5,
      slidingWindowSeconds: 10,
    });
    for(let i=0; i < 5; i++) {
      limiter.isRequestAllowed();
    }
    expect(limiter.isRequestAllowed()).toBe(false);
  });

  it("returns true when messages are send after the sliding window", async () => {
    const limiter = new RateLimiter({
      bufferSize: 5,
      slidingWindowSeconds: 1,
    });
    for(let i=0; i < 5; i++) {
      limiter.isRequestAllowed();
    }
    await sleep(1100);
    expect(limiter.isRequestAllowed()).toBe(true);
  });
});