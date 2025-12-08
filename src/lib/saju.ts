// 정확한 만세력 데이터 기반 사주 계산
// dates_mapping.json: 1930~2049년까지의 모든 날짜별 정확한 간지 데이터

import datesMapping from './dates_mapping.json';

// ==================== 기본 상수 ====================

// 천간 (Heavenly Stems) - 10개
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
export const HEAVENLY_STEMS_KR = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const;

// 지지 (Earthly Branches) - 12개
export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;
export const EARTHLY_BRANCHES_KR = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const;

// 60갑자
export const SIXTY_JIAZI = [
	'甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉',
	'甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未',
	'甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
	'甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸卯',
	'甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑',
	'甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'
] as const;

// 십이지신 동물
export const ZODIAC_ANIMALS = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'] as const;
export const ZODIAC_EMOJI = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐑', '🐒', '🐓', '🐕', '🐗'] as const;

// 오행 (Five Elements)
export type FiveElement = 'wood' | 'fire' | 'earth' | 'metal' | 'water';
export const FIVE_ELEMENTS_KR: Record<FiveElement, string> = {
	wood: '목(木)',
	fire: '화(火)',
	earth: '토(土)',
	metal: '금(金)',
	water: '수(水)'
};

export const FIVE_ELEMENTS_EMOJI: Record<FiveElement, string> = {
	wood: '🌳',
	fire: '🔥',
	earth: '🌍',
	metal: '⚙️',
	water: '💧'
};

// 천간 → 오행 매핑
export const STEM_TO_ELEMENT: Record<string, FiveElement> = {
	'甲': 'wood', '乙': 'wood',
	'丙': 'fire', '丁': 'fire',
	'戊': 'earth', '己': 'earth',
	'庚': 'metal', '辛': 'metal',
	'壬': 'water', '癸': 'water'
};

// 지지 → 오행 매핑
export const BRANCH_TO_ELEMENT: Record<string, FiveElement> = {
	'寅': 'wood', '卯': 'wood',
	'巳': 'fire', '午': 'fire',
	'辰': 'earth', '丑': 'earth', '戌': 'earth', '未': 'earth',
	'申': 'metal', '酉': 'metal',
	'亥': 'water', '子': 'water'
};

// 음양 (Yin-Yang)
export type YinYang = 'yang' | 'yin';
const STEM_YIN_YANG: Record<string, YinYang> = {
	'甲': 'yang', '乙': 'yin',
	'丙': 'yang', '丁': 'yin',
	'戊': 'yang', '己': 'yin',
	'庚': 'yang', '辛': 'yin',
	'壬': 'yang', '癸': 'yin'
};

// 지장간 (Hidden Stems) - 지지 안에 숨어있는 천간
export const HIDDEN_STEMS: Record<string, string[]> = {
	'子': ['癸'],
	'丑': ['己', '癸', '辛'],
	'寅': ['甲', '丙', '戊'],
	'卯': ['乙'],
	'辰': ['戊', '乙', '癸'],
	'巳': ['丙', '庚', '戊'],
	'午': ['丁', '己'],
	'未': ['己', '丁', '乙'],
	'申': ['庚', '壬', '戊'],
	'酉': ['辛'],
	'戌': ['戊', '辛', '丁'],
	'亥': ['壬', '甲']
};

// 시간 → 지지 매핑
const HOUR_MAP: [number, number, number][] = [
	[23, 1, 0],  // 子時 23:00-01:00
	[1, 3, 1],   // 丑時 01:00-03:00
	[3, 5, 2],   // 寅時 03:00-05:00
	[5, 7, 3],   // 卯時 05:00-07:00
	[7, 9, 4],   // 辰時 07:00-09:00
	[9, 11, 5],  // 巳時 09:00-11:00
	[11, 13, 6], // 午時 11:00-13:00
	[13, 15, 7], // 未時 13:00-15:00
	[15, 17, 8], // 申時 15:00-17:00
	[17, 19, 9], // 酉時 17:00-19:00
	[19, 21, 10], // 戌時 19:00-21:00
	[21, 23, 11], // 亥時 21:00-23:00
];

// ==================== 신살(神殺) 매핑 ====================

// 귀인(貴人) - 도움을 주는 사람/시기
const NOBLEMAN_MAP: Record<string, string[]> = {
	'甲': ['丑', '未'], '戊': ['丑', '未'],
	'乙': ['子', '申'], '己': ['子', '申'],
	'丙': ['亥', '酉'], '丁': ['亥', '酉'],
	'庚': ['丑', '未'], '辛': ['寅', '午'],
	'壬': ['卯', '巳'], '癸': ['卯', '巳']
};

// 문창(文昌) - 학업/지적 능력
const INTELLIGENCE_MAP: Record<string, string> = {
	'甲': '巳', '乙': '午', '丙': '申', '丁': '酉',
	'戊': '申', '己': '酉', '庚': '亥', '辛': '子',
	'壬': '寅', '癸': '卯'
};

// 도화(桃花) - 연애/인기운 (일지 기준)
const PEACH_BLOSSOM_MAP: Record<string, string> = {
	'寅': '卯', '午': '卯', '戌': '卯',  // 인오술 → 묘
	'申': '酉', '子': '酉', '辰': '酉',  // 신자진 → 유
	'巳': '午', '酉': '午', '丑': '午',  // 사유축 → 오
	'亥': '子', '卯': '子', '未': '子'   // 해묘미 → 자
};

// 역마(驛馬) - 이동/변화 (일지 기준)
const SKY_HORSE_MAP: Record<string, string> = {
	'寅': '申', '午': '申', '戌': '申',  // 인오술 → 신
	'申': '寅', '子': '寅', '辰': '寅',  // 신자진 → 인
	'巳': '亥', '酉': '亥', '丑': '亥',  // 사유축 → 해
	'亥': '巳', '卯': '巳', '未': '巳'   // 해묘미 → 사
};

// 화개(華蓋) - 예술/종교적 재능 (일지 기준)
const FLOWER_CANOPY_MAP: Record<string, string> = {
	'寅': '戌', '午': '戌', '戌': '戌',
	'申': '辰', '子': '辰', '辰': '辰',
	'巳': '丑', '酉': '丑', '丑': '丑',
	'亥': '未', '卯': '未', '未': '未'
};

// 팔택풍수 방위
const GUA_DIRECTIONS: Record<number, { lucky: string[]; unlucky: string[] }> = {
	1: { lucky: ['동남', '동', '남', '북'], unlucky: ['서북', '서', '서남', '동북'] },
	2: { lucky: ['동북', '서', '서북', '서남'], unlucky: ['동남', '동', '남', '북'] },
	3: { lucky: ['남', '동', '동남', '북'], unlucky: ['서북', '서', '서남', '동북'] },
	4: { lucky: ['동남', '동', '남', '북'], unlucky: ['서북', '서', '서남', '동북'] },
	6: { lucky: ['서', '동북', '서남', '서북'], unlucky: ['동남', '동', '북', '남'] },
	7: { lucky: ['서북', '서', '동북', '서남'], unlucky: ['동남', '동', '남', '북'] },
	8: { lucky: ['서', '동북', '서남', '서북'], unlucky: ['동남', '동', '남', '북'] },
	9: { lucky: ['남', '동', '동남', '북'], unlucky: ['서북', '서', '서남', '동북'] }
};

// ==================== 십신(十神) ====================

export type TenGod = '비견' | '겁재' | '식신' | '상관' | '편재' | '정재' | '편관' | '정관' | '편인' | '정인';

const TEN_GOD_DESCRIPTIONS: Record<TenGod, { meaning: string; positive: string; negative: string }> = {
	'비견': { meaning: '나와 같은 오행, 같은 음양', positive: '독립심, 자존심, 동료', negative: '경쟁, 고집, 분쟁' },
	'겁재': { meaning: '나와 같은 오행, 다른 음양', positive: '추진력, 사교성, 활동력', negative: '다툼, 손재, 배신' },
	'식신': { meaning: '내가 생하는 오행, 같은 음양', positive: '표현력, 창의력, 여유', negative: '게으름, 방종' },
	'상관': { meaning: '내가 생하는 오행, 다른 음양', positive: '재능, 예술성, 언변', negative: '반항, 불안정, 구설' },
	'편재': { meaning: '내가 극하는 오행, 같은 음양', positive: '사업수완, 재물복', negative: '투기, 낭비, 색정' },
	'정재': { meaning: '내가 극하는 오행, 다른 음양', positive: '안정된 재물, 성실', negative: '인색, 소심' },
	'편관': { meaning: '나를 극하는 오행, 같은 음양', positive: '권위, 통솔력, 명예', negative: '압박, 재난, 질병' },
	'정관': { meaning: '나를 극하는 오행, 다른 음양', positive: '명예, 직장, 승진', negative: '구속, 책임감 과다' },
	'편인': { meaning: '나를 생하는 오행, 같은 음양', positive: '학문, 창의성, 영감', negative: '고독, 편벽' },
	'정인': { meaning: '나를 생하는 오행, 다른 음양', positive: '학업, 자격증, 어머니', negative: '의존, 나태' }
};

// ==================== 인터페이스 ====================

export interface Pillar {
	stem: string;
	stemKr: string;
	branch: string;
	branchKr: string;
	zodiac: string;
	zodiacEmoji: string;
	stemElement: FiveElement;
	branchElement: FiveElement;
	yinYang: YinYang;
	hiddenStems: string[];
}

export interface TenGodAnalysis {
	name: TenGod;
	element: FiveElement;
	description: typeof TEN_GOD_DESCRIPTIONS[TenGod];
}

export interface SpecialStars {
	nobleman: string[];        // 귀인
	intelligence: string;      // 문창
	peachBlossom: string;      // 도화
	skyHorse: string;          // 역마
	flowerCanopy: string;      // 화개
}

export interface EightMansions {
	lifeGua: number;
	group: '동사명' | '서사명';
	luckyDirections: string[];
	unluckyDirections: string[];
}

export interface DaewoonPillar {
	age: number;
	startYear: number;
	endYear: number;
	stem: string;
	stemKr: string;
	branch: string;
	branchKr: string;
	element: FiveElement;
	tenGod: TenGod;
}

export interface YearlyFortune {
	year: number;
	stem: string;
	stemKr: string;
	branch: string;
	branchKr: string;
	zodiac: string;
	zodiacEmoji: string;
	tenGod: TenGod;
	element: FiveElement;
	rating: number;  // 1-5
	description: string;
}

export interface MonthlyFortune {
	month: number;
	stem: string;
	stemKr: string;
	branch: string;
	branchKr: string;
	tenGod: TenGod;
	rating: number;
}

export interface SajuResult {
	year: Pillar;
	month: Pillar;
	day: Pillar;
	hour: Pillar;
	lunarDate: {
		year: number;
		month: number;
		day: number;
		isLeapMonth: boolean;
	};
	elementCounts: Record<FiveElement, number>;
	dominantElement: FiveElement;
	weakestElement: FiveElement;
	dayMaster: {
		stem: string;
		stemKr: string;
		element: FiveElement;
		yinYang: YinYang;
	};
	tenGods: {
		year: TenGodAnalysis;
		month: TenGodAnalysis;
		hour: TenGodAnalysis;
	};
	specialStars: SpecialStars;
	eightMansions: EightMansions;
}

interface DateMapping {
	HYear: string;
	EYear: string;
	HMonth: string;
	EMonth: string;
	HDay: string;
	EDay: string;
	season?: string;
}

// ==================== 유틸리티 함수 ====================

function getDateMapping(year: number, month: number, day: number): DateMapping | null {
	const yearStr = year.toString();
	const monthStr = month.toString();
	const dayStr = day.toString();
	
	const yearData = (datesMapping as Record<string, Record<string, Record<string, DateMapping>>>)[yearStr];
	if (!yearData) return null;
	
	const monthData = yearData[monthStr];
	if (!monthData) return null;
	
	return monthData[dayStr] || null;
}

function getHourBranchIndex(hour: number): number {
	for (const [start, end, branchIndex] of HOUR_MAP) {
		if (start === 23) {
			if (hour >= 23 || hour < end) return branchIndex;
		} else if (hour >= start && hour < end) {
			return branchIndex;
		}
	}
	return 0;
}

function getHourStemIndex(dayStemIndex: number, hourBranchIndex: number): number {
	const dayGroup = dayStemIndex % 5;
	const baseHourStems = [0, 2, 4, 6, 8];
	const ziHourStemIndex = baseHourStems[dayGroup];
	return (ziHourStemIndex + hourBranchIndex) % 10;
}

function createPillar(stemIndex: number, branchIndex: number): Pillar {
	const stem = HEAVENLY_STEMS[stemIndex];
	const branch = EARTHLY_BRANCHES[branchIndex];
	
	return {
		stem,
		stemKr: HEAVENLY_STEMS_KR[stemIndex],
		branch,
		branchKr: EARTHLY_BRANCHES_KR[branchIndex],
		zodiac: ZODIAC_ANIMALS[branchIndex],
		zodiacEmoji: ZODIAC_EMOJI[branchIndex],
		stemElement: STEM_TO_ELEMENT[stem],
		branchElement: BRANCH_TO_ELEMENT[branch],
		yinYang: STEM_YIN_YANG[stem],
		hiddenStems: HIDDEN_STEMS[branch] || []
	};
}

// ==================== 십신 계산 ====================

function calculateTenGod(dayMasterStem: string, targetStem: string): TenGod {
	const dayElement = STEM_TO_ELEMENT[dayMasterStem];
	const targetElement = STEM_TO_ELEMENT[targetStem];
	const dayYinYang = STEM_YIN_YANG[dayMasterStem];
	const targetYinYang = STEM_YIN_YANG[targetStem];
	const sameYinYang = dayYinYang === targetYinYang;
	
	// 오행 관계 결정
	const elements: FiveElement[] = ['wood', 'fire', 'earth', 'metal', 'water'];
	const dayIndex = elements.indexOf(dayElement);
	const targetIndex = elements.indexOf(targetElement);
	const diff = (targetIndex - dayIndex + 5) % 5;
	
	// diff: 0=같음(비겁), 1=내가생함(식상), 2=내가극함(재성), 3=나를극함(관성), 4=나를생함(인성)
	switch (diff) {
		case 0: return sameYinYang ? '비견' : '겁재';
		case 1: return sameYinYang ? '식신' : '상관';
		case 2: return sameYinYang ? '편재' : '정재';
		case 3: return sameYinYang ? '편관' : '정관';
		case 4: return sameYinYang ? '편인' : '정인';
		default: return '비견';
	}
}

function getTenGodAnalysis(dayMasterStem: string, targetStem: string): TenGodAnalysis {
	const tenGod = calculateTenGod(dayMasterStem, targetStem);
	return {
		name: tenGod,
		element: STEM_TO_ELEMENT[targetStem],
		description: TEN_GOD_DESCRIPTIONS[tenGod]
	};
}

// ==================== 신살 계산 ====================

function calculateSpecialStars(dayMasterStem: string, dayBranch: string): SpecialStars {
	return {
		nobleman: NOBLEMAN_MAP[dayMasterStem as keyof typeof NOBLEMAN_MAP] || [],
		intelligence: INTELLIGENCE_MAP[dayMasterStem as keyof typeof INTELLIGENCE_MAP] || '',
		peachBlossom: PEACH_BLOSSOM_MAP[dayBranch as keyof typeof PEACH_BLOSSOM_MAP] || '',
		skyHorse: SKY_HORSE_MAP[dayBranch as keyof typeof SKY_HORSE_MAP] || '',
		flowerCanopy: FLOWER_CANOPY_MAP[dayBranch as keyof typeof FLOWER_CANOPY_MAP] || ''
	};
}

// ==================== 팔택풍수 ====================

function calculateEightMansions(birthYear: number, gender: 'male' | 'female'): EightMansions {
	// 생명괘 계산
	const yearSum = birthYear.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
	let gua: number;
	
	if (gender === 'male') {
		gua = 11 - (yearSum % 9);
		if (gua === 11) gua = 2;
		if (gua === 10) gua = 1;
	} else {
		gua = (yearSum % 9) + 4;
		if (gua > 9) gua -= 9;
	}
	
	if (gua === 5) gua = gender === 'male' ? 2 : 8;
	
	const isWestGroup = [2, 6, 7, 8].includes(gua);
	const directions = GUA_DIRECTIONS[gua] || GUA_DIRECTIONS[1];
	
	return {
		lifeGua: gua,
		group: isWestGroup ? '서사명' : '동사명',
		luckyDirections: directions.lucky,
		unluckyDirections: directions.unlucky
	};
}

// ==================== 대운 계산 ====================

export function calculateDaewoon(
	saju: SajuResult,
	birthYear: number,
	birthMonth: number,
	birthDay: number,
	gender: 'male' | 'female'
): DaewoonPillar[] {
	const yearStemIndex = (HEAVENLY_STEMS as readonly string[]).indexOf(saju.year.stem);
	const isYangYear = yearStemIndex % 2 === 0;
	
	// 순행/역행 결정: 남자+양년=순행, 남자+음년=역행, 여자는 반대
	const isForward = (gender === 'male') === isYangYear;
	
	// 월주에서 시작
	const monthStemIndex = (HEAVENLY_STEMS as readonly string[]).indexOf(saju.month.stem);
	const monthBranchIndex = (EARTHLY_BRANCHES as readonly string[]).indexOf(saju.month.branch);
	
	// 대운 시작 나이 계산 (간단화: 5세로 고정, 실제로는 절기 기준 계산 필요)
	const startAge = 5;
	
	const daewoonList: DaewoonPillar[] = [];
	
	for (let i = 0; i < 10; i++) {
		const offset = isForward ? i + 1 : -(i + 1);
		const newStemIndex = ((monthStemIndex + offset) % 10 + 10) % 10;
		const newBranchIndex = ((monthBranchIndex + offset) % 12 + 12) % 12;
		
		const age = startAge + (i * 10);
		const stem = HEAVENLY_STEMS[newStemIndex];
		const branch = EARTHLY_BRANCHES[newBranchIndex];
		
		daewoonList.push({
			age,
			startYear: birthYear + age,
			endYear: birthYear + age + 9,
			stem,
			stemKr: HEAVENLY_STEMS_KR[newStemIndex],
			branch,
			branchKr: EARTHLY_BRANCHES_KR[newBranchIndex],
			element: STEM_TO_ELEMENT[stem],
			tenGod: calculateTenGod(saju.day.stem, stem)
		});
	}
	
	return daewoonList;
}

// ==================== 세운 계산 ====================

export function calculateYearlyFortune(saju: SajuResult, year: number): YearlyFortune {
	const mapping = getDateMapping(year, 6, 15); // 해당 연도 중간쯤 날짜로 년주 가져오기
	if (!mapping) {
		throw new Error(`연도 데이터를 찾을 수 없습니다: ${year}년`);
	}
	
	const stemIndex = parseInt(mapping.HYear) - 1;
	const branchIndex = parseInt(mapping.EYear) - 1;
	const stem = HEAVENLY_STEMS[stemIndex];
	const branch = EARTHLY_BRANCHES[branchIndex];
	const tenGod = calculateTenGod(saju.day.stem, stem);
	
	// 운세 등급 계산 (십신 기반)
	const goodTenGods: TenGod[] = ['정인', '편인', '식신', '정재'];
	const neutralTenGods: TenGod[] = ['비견', '겁재', '정관'];
	const rating = goodTenGods.includes(tenGod) ? 4 : neutralTenGods.includes(tenGod) ? 3 : 2;
	
	// 설명 생성
	const description = generateYearlyDescription(tenGod, stem, branch);
	
	return {
		year,
		stem,
		stemKr: HEAVENLY_STEMS_KR[stemIndex],
		branch,
		branchKr: EARTHLY_BRANCHES_KR[branchIndex],
		zodiac: ZODIAC_ANIMALS[branchIndex],
		zodiacEmoji: ZODIAC_EMOJI[branchIndex],
		tenGod,
		element: STEM_TO_ELEMENT[stem],
		rating,
		description
	};
}

function generateYearlyDescription(tenGod: TenGod, stem: string, branch: string): string {
	const descriptions: Record<TenGod, string> = {
		'비견': '자신감이 높아지고 독립적인 기운이 강해지는 해입니다. 새로운 시작에 좋지만 주변과의 경쟁에 주의하세요.',
		'겁재': '활동적이고 사교적인 해입니다. 재물 관리에 신경 쓰고, 투자나 보증은 신중하게 결정하세요.',
		'식신': '창의력과 표현력이 빛나는 해입니다. 건강과 여유를 즐기며 자기 계발에 좋은 시기입니다.',
		'상관': '재능이 발휘되고 말솜씨가 좋아지는 해입니다. 직장에서 상사와의 관계에 주의하세요.',
		'편재': '재물운이 활발한 해입니다. 사업이나 투자 기회가 있지만 무리한 확장은 피하세요.',
		'정재': '안정적인 재물 수입이 있는 해입니다. 저축하기 좋고 가정의 안정을 누릴 수 있습니다.',
		'편관': '변화와 도전의 해입니다. 승진이나 직위 변동이 있을 수 있으며, 건강 관리가 중요합니다.',
		'정관': '명예와 인정을 받는 해입니다. 직장 생활이 안정되고 책임감 있는 역할을 맡게 됩니다.',
		'편인': '학업이나 자격증 취득에 좋은 해입니다. 내면의 성장과 영적 발전이 있습니다.',
		'정인': '학문과 지식 습득에 유리한 해입니다. 어른의 도움을 받고 좋은 스승을 만납니다.'
	};
	
	return descriptions[tenGod];
}

// ==================== 월운 계산 ====================

export function calculateMonthlyFortune(saju: SajuResult, year: number): MonthlyFortune[] {
	const monthlyFortunes: MonthlyFortune[] = [];
	
	for (let month = 1; month <= 12; month++) {
		const mapping = getDateMapping(year, month, 15);
		if (!mapping) continue;
		
		const stemIndex = parseInt(mapping.HMonth) - 1;
		const branchIndex = parseInt(mapping.EMonth) - 1;
		const stem = HEAVENLY_STEMS[stemIndex];
		const tenGod = calculateTenGod(saju.day.stem, stem);
		
		const goodTenGods: TenGod[] = ['정인', '편인', '식신', '정재'];
		const neutralTenGods: TenGod[] = ['비견', '겁재', '정관'];
		const rating = goodTenGods.includes(tenGod) ? 4 : neutralTenGods.includes(tenGod) ? 3 : 2;
		
		monthlyFortunes.push({
			month,
			stem,
			stemKr: HEAVENLY_STEMS_KR[stemIndex],
			branch: EARTHLY_BRANCHES[branchIndex],
			branchKr: EARTHLY_BRANCHES_KR[branchIndex],
			tenGod,
			rating
		});
	}
	
	return monthlyFortunes;
}

// ==================== 메인 계산 함수 ====================

import { Solar, Lunar } from 'lunar-javascript';

export function calculateSaju(
	year: number,
	month: number,
	day: number,
	hour: number,
	isLunar: boolean = false,
	gender: 'male' | 'female' = 'male'
): SajuResult {
	let solarYear = year;
	let solarMonth = month;
	let solarDay = day;
	let lunarYear = year;
	let lunarMonth = month;
	let lunarDay = day;
	let isLeapMonth = false;
	
	if (isLunar) {
		const lunar = Lunar.fromYmd(year, month, day);
		const solar = lunar.getSolar();
		solarYear = solar.getYear();
		solarMonth = solar.getMonth();
		solarDay = solar.getDay();
		isLeapMonth = (lunar as any)._p?.leap === true || false;
	} else {
		const solar = Solar.fromYmd(year, month, day);
		const lunar = solar.getLunar();
		lunarYear = lunar.getYear();
		lunarMonth = lunar.getMonth();
		lunarDay = lunar.getDay();
		isLeapMonth = (lunar as any)._p?.leap === true || false;
	}
	
	const mapping = getDateMapping(solarYear, solarMonth, solarDay);
	
	if (!mapping) {
		throw new Error(`날짜 데이터를 찾을 수 없습니다: ${solarYear}년 ${solarMonth}월 ${solarDay}일`);
	}
	
	// 년주: dates_mapping.json 사용
	const yearStemIndex = parseInt(mapping.HYear) - 1;
	const yearBranchIndex = parseInt(mapping.EYear) - 1;
	const yearPillar = createPillar(yearStemIndex, yearBranchIndex);
	
	// 월주: dates_mapping.json 사용 (절기 기준)
	const monthStemIndex = parseInt(mapping.HMonth) - 1;
	const monthBranchIndex = parseInt(mapping.EMonth) - 1;
	const monthPillar = createPillar(monthStemIndex, monthBranchIndex);
	
	// 일주: dates_mapping.json 사용 (한국 만세력과 일치)
	const dayStemIndex = parseInt(mapping.HDay) - 1;
	const dayBranchIndex = parseInt(mapping.EDay) - 1;
	const dayPillar = createPillar(dayStemIndex, dayBranchIndex);
	
	// 시주: 일간 기준 계산 (일상기시법)
	const hourBranchIndex = getHourBranchIndex(hour);
	const hourStemIndex = getHourStemIndex(dayStemIndex, hourBranchIndex);
	const hourPillar = createPillar(hourStemIndex, hourBranchIndex);
	
	// 오행 카운트
	const elementCounts: Record<FiveElement, number> = {
		wood: 0, fire: 0, earth: 0, metal: 0, water: 0
	};
	
	const allElements = [
		yearPillar.stemElement, yearPillar.branchElement,
		monthPillar.stemElement, monthPillar.branchElement,
		dayPillar.stemElement, dayPillar.branchElement,
		hourPillar.stemElement, hourPillar.branchElement
	];
	
	for (const elem of allElements) {
		elementCounts[elem]++;
	}
	
	let dominantElement: FiveElement = 'wood';
	let weakestElement: FiveElement = 'wood';
	let maxCount = 0;
	let minCount = Infinity;
	
	for (const [elem, count] of Object.entries(elementCounts) as [FiveElement, number][]) {
		if (count > maxCount) { maxCount = count; dominantElement = elem; }
		if (count < minCount) { minCount = count; weakestElement = elem; }
	}
	
	const dayMaster = {
		stem: dayPillar.stem,
		stemKr: dayPillar.stemKr,
		element: dayPillar.stemElement,
		yinYang: dayPillar.yinYang
	};
	
	// 십신 계산
	const tenGods = {
		year: getTenGodAnalysis(dayPillar.stem, yearPillar.stem),
		month: getTenGodAnalysis(dayPillar.stem, monthPillar.stem),
		hour: getTenGodAnalysis(dayPillar.stem, hourPillar.stem)
	};
	
	// 신살 계산
	const specialStars = calculateSpecialStars(dayPillar.stem, dayPillar.branch);
	
	// 팔택풍수
	const eightMansions = calculateEightMansions(solarYear, gender);
	
	return {
		year: yearPillar,
		month: monthPillar,
		day: dayPillar,
		hour: hourPillar,
		lunarDate: { year: lunarYear, month: lunarMonth, day: lunarDay, isLeapMonth },
		elementCounts,
		dominantElement,
		weakestElement,
		dayMaster,
		tenGods,
		specialStars,
		eightMansions
	};
}

// ==================== 해석 함수 ====================

export function interpretDayMaster(dayMaster: SajuResult['dayMaster']): string {
	const interpretations: Record<string, string> = {
		'甲': '갑목(甲木)은 큰 나무와 같습니다. 정직하고 곧은 성격으로 리더십이 있으며, 성장과 발전을 추구합니다. 때로는 고집이 셀 수 있지만 믿음직한 사람입니다.',
		'乙': '을목(乙木)은 풀이나 덩굴과 같습니다. 유연하고 적응력이 뛰어나며, 예술적 감각이 있습니다. 부드러운 외모 속에 강한 생명력을 가지고 있습니다.',
		'丙': '병화(丙火)는 태양과 같습니다. 밝고 활발한 성격으로 주변을 환하게 만듭니다. 열정적이고 낙천적이며, 리더십과 카리스마가 있습니다.',
		'丁': '정화(丁火)는 촛불과 같습니다. 따뜻하고 섬세한 성격으로 지적이며 예술적입니다. 내면에 열정을 품고 있으며 통찰력이 뛰어납니다.',
		'戊': '무토(戊土)는 산과 같습니다. 신뢰감 있고 든든한 성격으로 책임감이 강합니다. 안정적이고 포용력이 있으며, 중심을 잡아주는 역할을 합니다.',
		'己': '기토(己土)는 논밭과 같습니다. 부드럽고 수용적인 성격으로 실용적입니다. 인내심이 강하고 다른 이를 잘 도우며 현실적인 사고를 합니다.',
		'庚': '경금(庚金)은 철이나 바위와 같습니다. 강직하고 결단력 있는 성격으로 의리가 있습니다. 정의감이 강하고 추진력이 뛰어납니다.',
		'辛': '신금(辛金)은 보석과 같습니다. 섬세하고 예민한 성격으로 미적 감각이 뛰어납니다. 완벽주의 성향이 있으며 품위를 중시합니다.',
		'壬': '임수(壬水)는 강이나 바다와 같습니다. 지혜롭고 활동적인 성격으로 창의력이 풍부합니다. 자유로운 영혼으로 새로운 것을 탐구합니다.',
		'癸': '계수(癸水)는 비나 이슬과 같습니다. 침착하고 신중한 성격으로 직관력이 뛰어납니다. 내면이 깊고 영적인 감수성이 있습니다.'
	};
	
	return interpretations[dayMaster.stem] || '';
}

export function getElementRelations(element: FiveElement): { generates: FiveElement; generatedBy: FiveElement; controls: FiveElement; controlledBy: FiveElement } {
	const relations: Record<FiveElement, { generates: FiveElement; generatedBy: FiveElement; controls: FiveElement; controlledBy: FiveElement }> = {
		wood: { generates: 'fire', generatedBy: 'water', controls: 'earth', controlledBy: 'metal' },
		fire: { generates: 'earth', generatedBy: 'wood', controls: 'metal', controlledBy: 'water' },
		earth: { generates: 'metal', generatedBy: 'fire', controls: 'water', controlledBy: 'wood' },
		metal: { generates: 'water', generatedBy: 'earth', controls: 'wood', controlledBy: 'fire' },
		water: { generates: 'wood', generatedBy: 'metal', controls: 'fire', controlledBy: 'earth' }
	};
	
	return relations[element];
}

export function interpretElementBalance(elementCounts: Record<FiveElement, number>, dominantElement: FiveElement, weakestElement: FiveElement): string {
	const dominantKr = FIVE_ELEMENTS_KR[dominantElement];
	const weakestKr = FIVE_ELEMENTS_KR[weakestElement];
	
	let interpretation = `사주에서 ${dominantKr}이(가) ${elementCounts[dominantElement]}개로 가장 강하고, ${weakestKr}이(가) ${elementCounts[weakestElement]}개로 가장 약합니다.\n\n`;
	
	const balanceAdvice: Record<FiveElement, string> = {
		wood: '목(木)이 부족할 때는 푸른색 계열의 옷을 입거나, 식물을 가까이 하면 좋습니다. 동쪽 방향이 길합니다.',
		fire: '화(火)가 부족할 때는 붉은색 계열을 활용하고, 밝은 조명이 있는 곳이 좋습니다. 남쪽 방향이 길합니다.',
		earth: '토(土)가 부족할 때는 황토색이나 베이지 계열이 좋고, 안정적인 환경을 만드세요. 중앙이 길합니다.',
		metal: '금(金)이 부족할 때는 흰색이나 금색 계열이 좋고, 금속 액세서리를 착용하면 좋습니다. 서쪽 방향이 길합니다.',
		water: '수(水)가 부족할 때는 검정색이나 파란색 계열이 좋고, 물 근처에서 휴식하면 좋습니다. 북쪽 방향이 길합니다.'
	};
	
	interpretation += balanceAdvice[weakestElement];
	
	return interpretation;
}

export function getZodiacCompatibility(branch: string): { best: string[]; good: string[]; bad: string[] } {
	const compatibilityMap: Record<string, { best: string[]; good: string[]; bad: string[] }> = {
		'子': { best: ['丑', '辰', '申'], good: ['子', '午'], bad: ['卯', '未'] },
		'丑': { best: ['子', '巳', '酉'], good: ['丑', '未'], bad: ['午', '戌'] },
		'寅': { best: ['亥', '卯', '午'], good: ['寅', '申'], bad: ['巳', '申'] },
		'卯': { best: ['戌', '亥', '未'], good: ['卯', '酉'], bad: ['子', '辰'] },
		'辰': { best: ['酉', '子', '申'], good: ['辰', '戌'], bad: ['卯', '戌'] },
		'巳': { best: ['申', '丑', '酉'], good: ['巳', '亥'], bad: ['寅', '亥'] },
		'午': { best: ['未', '寅', '戌'], good: ['午', '子'], bad: ['丑', '酉'] },
		'未': { best: ['午', '卯', '亥'], good: ['未', '丑'], bad: ['子', '戌'] },
		'申': { best: ['巳', '辰', '子'], good: ['申', '寅'], bad: ['寅', '亥'] },
		'酉': { best: ['辰', '巳', '丑'], good: ['酉', '卯'], bad: ['午', '戌'] },
		'戌': { best: ['卯', '寅', '午'], good: ['戌', '辰'], bad: ['丑', '酉'] },
		'亥': { best: ['寅', '卯', '未'], good: ['亥', '巳'], bad: ['巳', '申'] }
	};
	
	return compatibilityMap[branch] || { best: [], good: [], bad: [] };
}

// 신살 해석
export function interpretSpecialStars(stars: SpecialStars): Record<string, string> {
	const branchToKr: Record<string, string> = {
		'子': '자(子)', '丑': '축(丑)', '寅': '인(寅)', '卯': '묘(卯)',
		'辰': '진(辰)', '巳': '사(巳)', '午': '오(午)', '未': '미(未)',
		'申': '신(申)', '酉': '유(酉)', '戌': '술(戌)', '亥': '해(亥)'
	};
	
	return {
		nobleman: `귀인이 ${stars.nobleman.map(b => branchToKr[b]).join(', ')}에 있습니다. 이 띠를 가진 사람이나 해당 시간/방위에서 도움을 받을 수 있습니다.`,
		intelligence: `문창이 ${branchToKr[stars.intelligence]}에 있습니다. 학업운과 지적 능력이 뛰어나며, 시험이나 자격증에 유리합니다.`,
		peachBlossom: `도화가 ${branchToKr[stars.peachBlossom]}에 있습니다. 이성에게 인기가 있고 매력적이며, 예술적 감각이 뛰어납니다.`,
		skyHorse: `역마가 ${branchToKr[stars.skyHorse]}에 있습니다. 이동과 변화가 많고, 해외나 출장과 관련된 일이 있을 수 있습니다.`,
		flowerCanopy: `화개가 ${branchToKr[stars.flowerCanopy]}에 있습니다. 예술적 재능과 종교/철학적 관심이 있으며, 고독을 즐깁니다.`
	};
}

// ==================== 초년/중년/말년운 해석 ====================

export interface LifePeriodFortune {
	period: string;
	pillar: string;
	pillarKr: string;
	ageRange: string;
	element: FiveElement;
	interpretation: string;
	keywords: string[];
}

export function interpretLifePeriods(saju: SajuResult): LifePeriodFortune[] {
	const periods: LifePeriodFortune[] = [];
	
	// 년주 - 초년운 (1-20세): 조상, 부모, 어린시절
	const yearInterpretation = getLifePeriodInterpretation('year', saju.year.stemElement, saju.year.branchElement, saju.dayMaster.element);
	periods.push({
		period: '초년운',
		pillar: `${saju.year.stem}${saju.year.branch}`,
		pillarKr: `${saju.year.stemKr}${saju.year.branchKr}`,
		ageRange: '1~20세',
		element: saju.year.stemElement,
		interpretation: yearInterpretation.interpretation,
		keywords: yearInterpretation.keywords
	});
	
	// 월주 - 청년운 (20-40세): 부모, 형제, 사회생활 초기
	const monthInterpretation = getLifePeriodInterpretation('month', saju.month.stemElement, saju.month.branchElement, saju.dayMaster.element);
	periods.push({
		period: '청년운',
		pillar: `${saju.month.stem}${saju.month.branch}`,
		pillarKr: `${saju.month.stemKr}${saju.month.branchKr}`,
		ageRange: '20~40세',
		element: saju.month.stemElement,
		interpretation: monthInterpretation.interpretation,
		keywords: monthInterpretation.keywords
	});
	
	// 일주 - 중년운 (40-60세): 본인, 배우자, 사업/직장
	const dayInterpretation = getLifePeriodInterpretation('day', saju.day.stemElement, saju.day.branchElement, saju.dayMaster.element);
	periods.push({
		period: '중년운',
		pillar: `${saju.day.stem}${saju.day.branch}`,
		pillarKr: `${saju.day.stemKr}${saju.day.branchKr}`,
		ageRange: '40~60세',
		element: saju.day.stemElement,
		interpretation: dayInterpretation.interpretation,
		keywords: dayInterpretation.keywords
	});
	
	// 시주 - 말년운 (60세 이후): 자녀, 제자, 노년기
	const hourInterpretation = getLifePeriodInterpretation('hour', saju.hour.stemElement, saju.hour.branchElement, saju.dayMaster.element);
	periods.push({
		period: '말년운',
		pillar: `${saju.hour.stem}${saju.hour.branch}`,
		pillarKr: `${saju.hour.stemKr}${saju.hour.branchKr}`,
		ageRange: '60세 이후',
		element: saju.hour.stemElement,
		interpretation: hourInterpretation.interpretation,
		keywords: hourInterpretation.keywords
	});
	
	return periods;
}

function getLifePeriodInterpretation(
	period: 'year' | 'month' | 'day' | 'hour',
	stemElement: FiveElement,
	branchElement: FiveElement,
	dayMasterElement: FiveElement
): { interpretation: string; keywords: string[] } {
	const periodNames = {
		year: { name: '초년', desc: '어린 시절', relation: '조상과 부모' },
		month: { name: '청년', desc: '사회 진출기', relation: '부모와 형제' },
		day: { name: '중년', desc: '인생의 전성기', relation: '본인과 배우자' },
		hour: { name: '말년', desc: '노년기', relation: '자녀와 후손' }
	};
	
	const info = periodNames[period];
	const relation = getElementRelation(dayMasterElement, stemElement);
	
	const interpretations: Record<string, { interpretation: string; keywords: string[] }> = {
		same: {
			interpretation: `${info.name}기에 자아가 강하고 독립적인 성향을 보입니다. ${info.relation}과의 관계에서 자기주장이 강하며, 스스로의 힘으로 일어서려는 경향이 있습니다. 경쟁심이 강하고 리더십을 발휘할 수 있지만, 고집이 센 면도 있습니다.`,
			keywords: ['독립심', '자존심', '경쟁', '리더십']
		},
		generates: {
			interpretation: `${info.name}기에 재능과 표현력이 빛납니다. ${info.relation}의 지원을 받아 창의적인 활동을 펼칠 수 있습니다. 식복이 있고 건강하며, 베푸는 것을 좋아합니다. 예술적 감각이 뛰어나고 대인관계가 원만합니다.`,
			keywords: ['창의력', '식복', '표현력', '예술']
		},
		generatedBy: {
			interpretation: `${info.name}기에 학문과 지식 습득에 유리합니다. ${info.relation}의 도움과 가르침을 받을 수 있습니다. 어른의 덕이 있고, 교육이나 문서 관련 일에서 좋은 결과를 얻습니다. 정신적인 성장이 두드러집니다.`,
			keywords: ['학업', '어른덕', '문서운', '지혜']
		},
		controls: {
			interpretation: `${info.name}기에 재물운과 사업운이 있습니다. ${info.relation}을 통해 경제적 기회를 만날 수 있습니다. 실용적이고 현실적인 성향으로, 돈을 벌고 관리하는 능력이 뛰어납니다. 이성과의 인연도 좋습니다.`,
			keywords: ['재물운', '사업', '현실감각', '이성운']
		},
		controlledBy: {
			interpretation: `${info.name}기에 직장운과 명예운이 작용합니다. ${info.relation}과의 관계에서 책임감과 의무감을 느끼게 됩니다. 사회적 지위 상승의 기회가 있지만, 스트레스나 압박감도 따를 수 있습니다. 성실함으로 인정받습니다.`,
			keywords: ['명예', '직장운', '책임감', '사회적 인정']
		}
	};
	
	return interpretations[relation] || interpretations.same;
}

function getElementRelation(dayMaster: FiveElement, target: FiveElement): string {
	if (dayMaster === target) return 'same';
	
	const relations: Record<FiveElement, { generates: FiveElement; generatedBy: FiveElement; controls: FiveElement; controlledBy: FiveElement }> = {
		wood: { generates: 'fire', generatedBy: 'water', controls: 'earth', controlledBy: 'metal' },
		fire: { generates: 'earth', generatedBy: 'wood', controls: 'metal', controlledBy: 'water' },
		earth: { generates: 'metal', generatedBy: 'fire', controls: 'water', controlledBy: 'wood' },
		metal: { generates: 'water', generatedBy: 'earth', controls: 'wood', controlledBy: 'fire' },
		water: { generates: 'wood', generatedBy: 'metal', controls: 'fire', controlledBy: 'earth' }
	};
	
	const rel = relations[dayMaster];
	if (rel.generates === target) return 'generates';
	if (rel.generatedBy === target) return 'generatedBy';
	if (rel.controls === target) return 'controls';
	if (rel.controlledBy === target) return 'controlledBy';
	
	return 'same';
}

// ==================== 십신 해설 ====================

export interface SibsinInfo {
	name: string;
	hanja: string;
	category: string;
	description: string;
	positiveTraits: string[];
	negativeTraits: string[];
	advice: string;
}

export function getSibsinInfo(sibsin: string): SibsinInfo {
	const sibsinData: Record<string, SibsinInfo> = {
		'비견': {
			name: '비견',
			hanja: '比肩',
			category: '비겁(比劫)',
			description: '나와 같은 오행, 같은 음양. 어깨를 나란히 하는 형제, 친구, 동료를 의미합니다.',
			positiveTraits: ['자립심', '독립성', '경쟁력', '리더십', '동료애'],
			negativeTraits: ['고집', '분쟁', '재물손실', '경쟁과다'],
			advice: '협력과 경쟁의 균형을 맞추세요. 고집을 버리고 타인의 의견을 수용하면 더 좋은 결과를 얻을 수 있습니다.'
		},
		'겁재': {
			name: '겁재',
			hanja: '劫財',
			category: '비겁(比劫)',
			description: '나와 같은 오행, 다른 음양. 경쟁자이자 협력자로, 재물을 빼앗기도 하고 도와주기도 합니다.',
			positiveTraits: ['추진력', '사교성', '활동성', '모험심'],
			negativeTraits: ['재물손실', '투기', '충동', '변덕'],
			advice: '투자나 보증은 신중하게 결정하세요. 활동적인 에너지를 건설적인 방향으로 사용하면 큰 성과를 거둘 수 있습니다.'
		},
		'식신': {
			name: '식신',
			hanja: '食神',
			category: '식상(食傷)',
			description: '내가 생하는 오행, 같은 음양. 먹을 복, 창의력, 표현력을 의미합니다.',
			positiveTraits: ['창의력', '식복', '여유', '낙천성', '예술성'],
			negativeTraits: ['게으름', '방종', '안일함'],
			advice: '창의적인 활동에 집중하세요. 건강관리와 적절한 휴식이 행운을 불러옵니다. 여유를 즐기되 나태해지지 않도록 주의하세요.'
		},
		'상관': {
			name: '상관',
			hanja: '傷官',
			category: '식상(食傷)',
			description: '내가 생하는 오행, 다른 음양. 관을 상하게 한다는 뜻으로, 재능과 반항심을 의미합니다.',
			positiveTraits: ['재능', '언변', '비판력', '예술성', '창조성'],
			negativeTraits: ['반항', '구설수', '상사충돌', '불안정'],
			advice: '말조심과 겸손함이 필요합니다. 뛰어난 재능을 인정받되, 윗사람과의 관계에서 예의를 지키세요.'
		},
		'정재': {
			name: '정재',
			hanja: '正財',
			category: '재성(財星)',
			description: '내가 극하는 오행, 다른 음양. 정당한 재물, 안정적인 수입을 의미합니다.',
			positiveTraits: ['안정재물', '성실', '저축', '가정운', '이성운'],
			negativeTraits: ['인색', '물질집착', '보수적'],
			advice: '꾸준한 노력이 재물로 돌아옵니다. 저축과 안정적인 투자를 추천하며, 가정의 평화가 재물운의 기반입니다.'
		},
		'편재': {
			name: '편재',
			hanja: '偏財',
			category: '재성(財星)',
			description: '내가 극하는 오행, 같은 음양. 예상치 못한 재물, 투자, 사업을 의미합니다.',
			positiveTraits: ['사업수완', '투자', '융통성', '대인관계'],
			negativeTraits: ['투기', '낭비', '바람기', '불안정'],
			advice: '새로운 사업 기회를 검토해보세요. 단, 무리한 투자나 투기는 금물이며, 재물관리에 신경 써야 합니다.'
		},
		'정관': {
			name: '정관',
			hanja: '正官',
			category: '관성(官星)',
			description: '나를 극하는 오행, 다른 음양. 정당한 명예, 직장, 직위를 의미합니다.',
			positiveTraits: ['명예', '승진', '직장운', '책임감', '신용'],
			negativeTraits: ['스트레스', '구속', '압박감'],
			advice: '직장에서 인정받고 승진 기회가 있습니다. 책임감 있는 행동이 명예를 높이며, 규칙과 원칙을 지키세요.'
		},
		'편관': {
			name: '편관',
			hanja: '偏官',
			category: '관성(官星)',
			description: '나를 극하는 오행, 같은 음양. 칠살이라고도 하며, 도전과 시련을 의미합니다.',
			positiveTraits: ['결단력', '추진력', '권위', '카리스마'],
			negativeTraits: ['압박', '스트레스', '갈등', '사고'],
			advice: '도전과 시련이 있지만, 이를 극복하면 큰 성장이 있습니다. 건강관리와 안전에 유의하고, 스트레스 해소법을 찾으세요.'
		},
		'정인': {
			name: '정인',
			hanja: '正印',
			category: '인성(印星)',
			description: '나를 생하는 오행, 다른 음양. 어머니, 학문, 자격증, 문서를 의미합니다.',
			positiveTraits: ['학업', '자격증', '문서운', '어른덕', '지혜'],
			negativeTraits: ['의존성', '우유부단', '현실도피'],
			advice: '학문과 자기계발에 좋은 시기입니다. 자격증 취득이나 공부에 매진하면 좋은 결과가 있으며, 어른의 도움을 받을 수 있습니다.'
		},
		'편인': {
			name: '편인',
			hanja: '偏印',
			category: '인성(印星)',
			description: '나를 생하는 오행, 같은 음양. 효신이라고도 하며, 특수한 학문, 종교, 예술을 의미합니다.',
			positiveTraits: ['직관력', '영성', '특수재능', '연구', '창의성'],
			negativeTraits: ['고독', '외로움', '식복감소', '변덕'],
			advice: '내면의 성장과 영적 발전이 있는 시기입니다. 명상이나 종교활동, 특수한 분야의 공부가 도움이 됩니다.'
		}
	};
	
	return sibsinData[sibsin] || {
		name: sibsin,
		hanja: '',
		category: '알 수 없음',
		description: '해당 십신에 대한 정보가 없습니다.',
		positiveTraits: [],
		negativeTraits: [],
		advice: ''
	};
}

// 운세 해설 (대운/세운/월운용)
export function getFortuneInterpretation(sibsin: string, context: 'daewoon' | 'yearly' | 'monthly'): string {
	const contextName = {
		daewoon: '이 대운 기간',
		yearly: '올해',
		monthly: '이번 달'
	};
	
	const interpretations: Record<string, Record<string, string>> = {
		'비견': {
			daewoon: '독립적인 활동이 많아지는 대운입니다. 동업이나 협력보다는 단독으로 진행하는 일이 유리합니다. 경쟁자가 많아질 수 있으니 자기 실력을 키우는 데 집중하세요.',
			yearly: '자신감이 높아지고 독립적인 기운이 강해지는 해입니다. 새로운 시작에 좋지만 주변과의 경쟁에 주의하세요.',
			monthly: '주체성이 강해지는 달입니다. 자기주장을 펼치되 타인과의 조화를 잊지 마세요.'
		},
		'겁재': {
			daewoon: '활동적이고 변화가 많은 대운입니다. 새로운 인연과 기회가 많지만, 재물 손실에 주의해야 합니다. 투자나 보증은 신중하게 결정하세요.',
			yearly: '활동적이고 사교적인 해입니다. 재물 관리에 신경 쓰고, 투자나 보증은 신중하게 결정하세요.',
			monthly: '사교활동이 활발해지는 달입니다. 지출이 늘어날 수 있으니 예산 관리에 신경 쓰세요.'
		},
		'식신': {
			daewoon: '여유롭고 풍요로운 대운입니다. 건강하고 식복이 있으며, 창의적인 활동에서 성과를 거둘 수 있습니다. 예술, 요리, 글쓰기 등에 재능을 발휘해보세요.',
			yearly: '창의력과 표현력이 빛나는 해입니다. 건강과 여유를 즐기며 자기 계발에 좋은 시기입니다.',
			monthly: '맛있는 음식과 즐거운 시간이 가득한 달입니다. 취미활동이나 창작에 몰두해보세요.'
		},
		'상관': {
			daewoon: '재능이 빛나지만 구설수에 주의해야 하는 대운입니다. 언변과 표현력이 뛰어나지만, 윗사람과의 관계에서 마찰이 생길 수 있습니다. 겸손함을 유지하세요.',
			yearly: '재능이 발휘되고 말솜씨가 좋아지는 해입니다. 직장에서 상사와의 관계에 주의하세요.',
			monthly: '표현욕구가 강해지는 달입니다. 말 한마디에 신중을 기하고, 비판보다 건설적인 제안을 하세요.'
		},
		'정재': {
			daewoon: '안정적인 재물운이 지속되는 대운입니다. 꾸준한 수입과 저축이 가능하며, 가정의 평화와 안정을 누릴 수 있습니다. 성실함이 재물로 돌아옵니다.',
			yearly: '안정적인 재물 수입이 있는 해입니다. 저축하기 좋고 가정의 안정을 누릴 수 있습니다.',
			monthly: '수입이 안정적인 달입니다. 저축을 시작하거나 가계부를 정리하기 좋은 시기입니다.'
		},
		'편재': {
			daewoon: '사업운과 투자운이 작용하는 대운입니다. 예상치 못한 수입이 있을 수 있지만, 지출도 많을 수 있습니다. 새로운 사업 기회를 검토하되 무리한 투자는 피하세요.',
			yearly: '예상치 못한 재물운이 따르거나 큰 지출이 있을 수 있습니다. 새로운 투자 기회를 신중하게 검토하세요.',
			monthly: '돈의 흐름이 활발한 달입니다. 횡재수가 있을 수 있지만, 충동구매는 자제하세요.'
		},
		'정관': {
			daewoon: '명예와 직장운이 상승하는 대운입니다. 승진이나 사회적 인정을 받을 기회가 많으며, 책임감 있는 자리에 오를 수 있습니다. 원칙을 지키는 것이 성공의 열쇠입니다.',
			yearly: '명예와 책임감이 따르는 해입니다. 직장에서 인정을 받거나 승진 기회가 있을 수 있습니다.',
			monthly: '직장에서 인정받는 달입니다. 맡은 바 책임을 다하면 좋은 평가를 받습니다.'
		},
		'편관': {
			daewoon: '도전과 변화가 많은 대운입니다. 시련을 극복하면 큰 성장이 있지만, 건강과 안전에 주의해야 합니다. 스트레스 관리가 중요하며, 끈기를 가지세요.',
			yearly: '도전과 변화가 많은 해입니다. 스트레스 관리에 유의하고, 끈기를 가지고 목표를 달성하세요.',
			monthly: '긴장과 압박이 있는 달입니다. 무리하지 말고 건강을 챙기며, 차분하게 대처하세요.'
		},
		'정인': {
			daewoon: '학문과 자기계발에 최적의 대운입니다. 자격증 취득, 진학, 문서 관련 일에서 좋은 결과를 얻습니다. 어른의 도움을 받을 수 있으며, 지혜가 깊어집니다.',
			yearly: '학문과 지식 습득에 유리한 해입니다. 어른의 도움을 받고 좋은 스승을 만납니다.',
			monthly: '공부하기 좋은 달입니다. 책을 읽거나 새로운 것을 배우면 큰 도움이 됩니다.'
		},
		'편인': {
			daewoon: '내면의 성장과 영적 발전이 있는 대운입니다. 특수한 분야나 예술, 종교에 관심이 깊어지며, 직관력이 발달합니다. 고독을 즐기고 자신을 돌아보는 시간이 필요합니다.',
			yearly: '학업이나 자격증 취득에 좋은 해입니다. 내면의 성장과 영적 발전이 있습니다.',
			monthly: '직관이 발달하는 달입니다. 명상이나 독서로 마음을 다스리면 좋은 아이디어가 떠오릅니다.'
		}
	};
	
	return interpretations[sibsin]?.[context] || '운세에 대한 일반적인 조언입니다.';
}
