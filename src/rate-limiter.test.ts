import { RateLimiter } from './rate-limiter';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe("Test RateLimiter", () => {
  it("can send a message", () => {
    const limiter = new RateLimiter({bufferSize: 5, slidingWindowSeconds: 10});
    expect(limiter.isMessageAllowed()).toBe(true)
  });

  it("returns false when more messages are send within the sliding window", () => {
    const limiter = new RateLimiter({
      bufferSize: 5,
      slidingWindowSeconds: 10,
    });
    for(let i=0; i < 5; i++) {
      limiter.isMessageAllowed();
    }
    expect(limiter.isMessageAllowed()).toBe(false);
  });

  it("returns true when messages are send after the sliding window", async () => {
    const limiter = new RateLimiter({
      bufferSize: 5,
      slidingWindowSeconds: 1,
    });
    for(let i=0; i < 5; i++) {
      limiter.isMessageAllowed();
    }
    await sleep(1100);
    expect(limiter.isMessageAllowed()).toBe(true);
  });
});