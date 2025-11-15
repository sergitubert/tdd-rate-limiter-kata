
export class RateLimiter {
  
  private readonly bufferSize: number;
  private readonly slidingWindowSeconds: number;
  private readonly buffer: number[];
  private writePointer: number;
  private isFilled: boolean;

  constructor({bufferSize, slidingWindowSeconds}: {bufferSize: number, slidingWindowSeconds: number}) {
    this.bufferSize=bufferSize;
    this.slidingWindowSeconds=slidingWindowSeconds;
    this.buffer = Array(bufferSize).fill(0);
    this.writePointer=0;
    this.isFilled = false;
  }

  isMessageAllowed() {
    const now = Date.now();
    const oldestTimestamp = this.buffer[this.writePointer];
    if(this.isFilled && (now - oldestTimestamp) < (this.slidingWindowSeconds * 1000)) {
      return false;
    }
    this.buffer[this.writePointer] = now;
    this.writePointer = (this.writePointer + 1) % this.bufferSize;
    if(this.writePointer === 0) {
      this.isFilled = true;
    }
    return true;
  }
 
}