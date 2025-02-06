import { Component } from '@angular/core';
import { timer, Subject, Observable } from 'rxjs';
import { map, switchMap, takeWhile, tap, takeUntil } from 'rxjs/operators';
import { DeadlineService } from '../../../services/deadline/deadline.service';

@Component({
  selector: 'app-timer',
  standalone: false,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  countdown$!: Observable<string>;
  private destroy$ = new Subject<void>();

  constructor(private deadlineService: DeadlineService) {}

  ngOnInit(): void {
    this.countdown$ = this.deadlineService.getDeadline().pipe(
      takeUntil(this.destroy$),
      switchMap((apiSeconds: any) =>
        timer(0, 1000).pipe(
          map(tick => apiSeconds.secondsLeft - tick),
          takeWhile(remaining => remaining >= 0),
          // map(remaining => this.formatTime(remaining)),
          // uncomment this code if you want formatting like years : months : days : hours : minutes : seconds
          // **** Comment the line bellow with above one
          map(remaining => remaining < 10 ? remaining.toString().padStart(2, '0') : remaining.toString()),
          takeUntil(this.destroy$)
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private formatTime(seconds: number): string {
    const SECONDS_IN_MINUTE = 60;
    const SECONDS_IN_HOUR = 3600;
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_MONTH = 2628000; // Approximation: 30.44 days per month
    const SECONDS_IN_YEAR = 31536000; // Approximation: 365 days per year

    const years = Math.floor(seconds / SECONDS_IN_YEAR);
    seconds %= SECONDS_IN_YEAR;

    const months = Math.floor(seconds / SECONDS_IN_MONTH);
    seconds %= SECONDS_IN_MONTH;

    const days = Math.floor(seconds / SECONDS_IN_DAY);
    seconds %= SECONDS_IN_DAY;

    const hours = Math.floor(seconds / SECONDS_IN_HOUR);
    seconds %= SECONDS_IN_HOUR;

    const minutes = Math.floor(seconds / SECONDS_IN_MINUTE);
    seconds %= SECONDS_IN_MINUTE;

    const pad = (num: number) => num.toString().padStart(2, '0');

    return `${years} : ${pad(months)} : ${pad(days)} : ${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}



}
