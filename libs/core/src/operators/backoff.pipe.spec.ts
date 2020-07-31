import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { hot } from 'jasmine-marbles';
import { switchMap, map } from 'rxjs/operators';

import { backoff } from './backoff.pipe';
declare var somethingThrowsError;

describe('Core | Operators | Backoff', () => {
  let actions$: Observable<Action>;
	const action1: Action = {type: 'type1'};

	it(`should retry the observable when the observable throws an error
	    should pass through when the observable does not throw an error`, () => {
		actions$ = hot('a', { a: action1 });
		const streamThatThrowsAnError4Times$ = actions$.pipe(
			map(() => 0),
			switchMap((count) => of(null).pipe(
				map(() => count++),
				map((count1) => count1 < 4 ? somethingThrowsError : count1),
				backoff(10, 0),
				map((count2) => expect(count2).toEqual(4))
			))
		);
		
		streamThatThrowsAnError4Times$.subscribe();

		expect(true).toBeTruthy();
	});

	it('should retry the observable until the max number of retries is reached', () => {
		actions$ = hot('a', { a: action1 });
		const streamThatThrowsAnErrorInfinitely$ = actions$.pipe(
			switchMap(() => of(null).pipe(
				map(() => somethingThrowsError),
				backoff(10, 0),
				map(() => fail('This point in the test should not be reached'))
			)
		));
		
		streamThatThrowsAnErrorInfinitely$.subscribe();

		expect(true).toBeTruthy();
	});
});
