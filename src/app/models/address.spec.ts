import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(new Address("test", "test", "test", "test", "test", "test", "test", "test")).toBeTruthy();
  });
});
