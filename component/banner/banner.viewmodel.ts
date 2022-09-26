

export class BannerViewModel {

  lastChangeTime = new Date();

  timeLength = 10 * 1000; // ms

  index = -1;

  current = '';

  list = [];

  fire(): void {
    this.lastChangeTime.setMilliseconds(this.lastChangeTime.getMilliseconds() - this.timeLength);
  }
}


