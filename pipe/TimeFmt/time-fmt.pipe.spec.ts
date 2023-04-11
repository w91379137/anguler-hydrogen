import { TimeFmtPipe } from './time-fmt.pipe';

describe('TimeFmtPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFmtPipe();
    expect(pipe).toBeTruthy();
  });
});
