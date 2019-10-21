import { discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';

import { CountdownService } from './countdown.service';

describe('CountdownService', () => {
    let service: CountdownService;

  beforeEach(() => {
      service = new CountdownService();
  });

    it('should set countdown', fakeAsync(() => {
        service.setCount(1);
        let countdown: number = 0;
        service.count$.subscribe(t => countdown = t);
        tick(1000);
        expect(countdown).toBe(0);
        discardPeriodicTasks();
    }));

    it('should return always the remaining time', fakeAsync(() => {
        service.setCount(5);
        let timeLeft = 0;
        service.count$.subscribe(t => timeLeft = t);
        tick(7000);
        service.setCount(2);
        tick(1000);
        expect(timeLeft).toBe(1);
        clearInterval(service.handler);
    }));

    it('should stop when reached to 0', fakeAsync(() => {
        const result: number[] = [];
        service.setCount(5);
        let timeLeft = 0;
        service.count$.subscribe(t => timeLeft = t);
        tick(6000);
        result.push(timeLeft);
        tick(1000);
        result.push(timeLeft);
        tick(1000);
        result.push(timeLeft);
        expect(result).toEqual([0, 0, 0]);
        clearInterval(service.handler);
    }));

    it('should not get negative', fakeAsync(() => {
        service.setCount(0);
        let timeLeft = 0;
        service.count$.subscribe(t => timeLeft = t);
        tick(1000);
        expect(timeLeft).toBe(0);
        clearInterval(service.handler);
    }));

});
