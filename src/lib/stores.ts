import { writable, derived, get } from 'svelte/store';
import type { SajuResult, DaewoonPillar, YearlyFortune, MonthlyFortune } from './saju';
import { 
	calculateSaju, 
	interpretDayMaster, 
	interpretElementBalance,
	calculateDaewoon,
	calculateYearlyFortune,
	calculateMonthlyFortune,
	interpretSpecialStars
} from './saju';
import type { City } from './cities';
import { DEFAULT_CITY, convertToKST } from './cities';

// 사용자 입력 정보
export interface BirthInfo {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number; // 분 추가 (더 정확한 시간 보정을 위해)
	isLunar: boolean;
	gender: 'male' | 'female';
	city: City; // 출생지 추가
}

// 기본값 설정
const defaultBirthInfo: BirthInfo = {
	year: 1990,
	month: 1,
	day: 1,
	hour: 12,
	minute: 0,
	isLunar: false,
	gender: 'male',
	city: DEFAULT_CITY
};

// 생년월일 정보 스토어
export const birthInfo = writable<BirthInfo>(defaultBirthInfo);

// 사주 계산 여부
export const isCalculated = writable<boolean>(false);

// 현재 테마
export const currentTheme = writable<string>('dracula');

// 사주 결과 (derived store)
export const sajuResult = derived<typeof birthInfo, SajuResult | null>(
	birthInfo,
	($birthInfo, set) => {
		try {
			// 출생지 시간대 보정 → KST 변환
			const kst = convertToKST(
				$birthInfo.city,
				$birthInfo.year,
				$birthInfo.month,
				$birthInfo.day,
				$birthInfo.hour,
				$birthInfo.minute
			);
			
			const result = calculateSaju(
				kst.year,
				kst.month,
				kst.day,
				kst.hour,
				$birthInfo.isLunar,
				$birthInfo.gender
			);
			set(result);
		} catch (error) {
			console.error('사주 계산 오류:', error);
			set(null);
		}
	}
);

// 대운 (derived store)
export const daewoonResult = derived<[typeof sajuResult, typeof birthInfo], DaewoonPillar[]>(
	[sajuResult, birthInfo],
	([$sajuResult, $birthInfo], set) => {
		if (!$sajuResult) {
			set([]);
			return;
		}
		try {
			// KST 변환된 날짜 사용
			const kst = convertToKST(
				$birthInfo.city,
				$birthInfo.year,
				$birthInfo.month,
				$birthInfo.day,
				$birthInfo.hour,
				$birthInfo.minute
			);
			
			const result = calculateDaewoon(
				$sajuResult,
				kst.year,
				kst.month,
				kst.day,
				$birthInfo.gender
			);
			set(result);
		} catch (error) {
			console.error('대운 계산 오류:', error);
			set([]);
		}
	}
);

// 세운 (올해 + 전후 2년)
export const yearlyFortuneResult = derived<typeof sajuResult, YearlyFortune[]>(
	sajuResult,
	($sajuResult, set) => {
		if (!$sajuResult) {
			set([]);
			return;
		}
		try {
			const currentYear = new Date().getFullYear();
			const fortunes: YearlyFortune[] = [];
			for (let y = currentYear - 1; y <= currentYear + 3; y++) {
				try {
					fortunes.push(calculateYearlyFortune($sajuResult, y));
				} catch {
					// 범위 밖 연도는 스킵
				}
			}
			set(fortunes);
		} catch (error) {
			console.error('세운 계산 오류:', error);
			set([]);
		}
	}
);

// 월운 (올해)
export const monthlyFortuneResult = derived<typeof sajuResult, MonthlyFortune[]>(
	sajuResult,
	($sajuResult, set) => {
		if (!$sajuResult) {
			set([]);
			return;
		}
		try {
			const currentYear = new Date().getFullYear();
			const result = calculateMonthlyFortune($sajuResult, currentYear);
			set(result);
		} catch (error) {
			console.error('월운 계산 오류:', error);
			set([]);
		}
	}
);

// 일간 해석 (derived store)
export const dayMasterInterpretation = derived<typeof sajuResult, string>(
	sajuResult,
	($sajuResult) => {
		if (!$sajuResult) return '';
		return interpretDayMaster($sajuResult.dayMaster);
	}
);

// 오행 균형 해석 (derived store)
export const elementBalanceInterpretation = derived<typeof sajuResult, string>(
	sajuResult,
	($sajuResult) => {
		if (!$sajuResult) return '';
		return interpretElementBalance(
			$sajuResult.elementCounts,
			$sajuResult.dominantElement,
			$sajuResult.weakestElement
		);
	}
);

// 신살 해석 (derived store)
export const specialStarsInterpretation = derived<typeof sajuResult, Record<string, string>>(
	sajuResult,
	($sajuResult) => {
		if (!$sajuResult) return {};
		return interpretSpecialStars($sajuResult.specialStars);
	}
);

// 로딩 상태
export const isLoading = writable<boolean>(false);

// 계산 실행 함수
export function performCalculation() {
	isLoading.set(true);
	setTimeout(() => {
		isCalculated.set(true);
		isLoading.set(false);
	}, 800);
}

// 리셋 함수
export function resetCalculation() {
	isCalculated.set(false);
	birthInfo.set(defaultBirthInfo);
}
