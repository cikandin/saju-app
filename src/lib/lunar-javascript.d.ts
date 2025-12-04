declare module 'lunar-javascript' {
	export class Solar {
		static fromYmd(year: number, month: number, day: number): Solar;
		static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): Solar;
		getYear(): number;
		getMonth(): number;
		getDay(): number;
		getHour(): number;
		getMinute(): number;
		getSecond(): number;
		getLunar(): Lunar;
		getJulianDay(): number;
	}

	export class Lunar {
		static fromYmd(year: number, month: number, day: number): Lunar;
		static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): Lunar;
		getYear(): number;
		getMonth(): number;
		getDay(): number;
		getSolar(): Solar;
		getYearGan(): string;
		getYearZhi(): string;
		getMonthGan(): string;
		getMonthZhi(): string;
		getMonthGanExact(): string;
		getMonthZhiExact(): string;
		getDayGan(): string;
		getDayZhi(): string;
	}
}

