import { pipe, zip, range, timer } from 'rxjs';
import { retryWhen, map, mergeMap } from 'rxjs/operators';

/**
 * Retries failed Observables
 * @param maxTries The maximum number of tries the observable will be tried
 * @param ms The initial amount of time 
 */
export function backoff(maxTries: number, ms: number) {
	return pipe(
		retryWhen(attempts => zip(range(1, maxTries), attempts)
			.pipe(
				map(([i]) => i * i),
				mergeMap(i =>  timer(i * ms))
			)
		)
	);
}
