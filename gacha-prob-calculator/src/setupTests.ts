import '@testing-library/jest-dom/vitest';

if (typeof globalThis.clearImmediate === 'undefined') {
  globalThis.clearImmediate = ((id: ReturnType<typeof setTimeout>) =>
    clearTimeout(id as number)) as typeof clearImmediate;
}

if (typeof globalThis.setImmediate === 'undefined') {
  globalThis.setImmediate = ((callback: (...args: unknown[]) => void, ...args: unknown[]) =>
    setTimeout(callback, 0, ...args)) as typeof setImmediate;
}
