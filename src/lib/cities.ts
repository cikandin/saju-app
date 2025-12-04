// 출생지 도시 데이터베이스
// 경도 보정: 실제 태양시 = 표준시 + (경도 - 기준경도) × 4분/도

export interface City {
	name: string;
	nameKr: string;
	country: string;
	countryKr: string;
	latitude: number;
	longitude: number;
	timezone: string;
	utcOffset: number; // 표준 UTC 오프셋 (시간)
	standardMeridian: number; // 해당 시간대의 기준 경도
}

// 주요 도시 데이터
export const CITIES: City[] = [
	// 한국
	{ name: 'Seoul', nameKr: '서울', country: 'KR', countryKr: '한국', latitude: 37.5665, longitude: 126.9780, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Busan', nameKr: '부산', country: 'KR', countryKr: '한국', latitude: 35.1796, longitude: 129.0756, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Daegu', nameKr: '대구', country: 'KR', countryKr: '한국', latitude: 35.8714, longitude: 128.6014, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Incheon', nameKr: '인천', country: 'KR', countryKr: '한국', latitude: 37.4563, longitude: 126.7052, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Gwangju', nameKr: '광주', country: 'KR', countryKr: '한국', latitude: 35.1595, longitude: 126.8526, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Daejeon', nameKr: '대전', country: 'KR', countryKr: '한국', latitude: 36.3504, longitude: 127.3845, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Ulsan', nameKr: '울산', country: 'KR', countryKr: '한국', latitude: 35.5384, longitude: 129.3114, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Sejong', nameKr: '세종', country: 'KR', countryKr: '한국', latitude: 36.4800, longitude: 127.2890, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Jeju', nameKr: '제주', country: 'KR', countryKr: '한국', latitude: 33.4996, longitude: 126.5312, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Suwon', nameKr: '수원', country: 'KR', countryKr: '한국', latitude: 37.2636, longitude: 127.0286, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Changwon', nameKr: '창원', country: 'KR', countryKr: '한국', latitude: 35.2280, longitude: 128.6811, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Goyang', nameKr: '고양', country: 'KR', countryKr: '한국', latitude: 37.6584, longitude: 126.8320, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Yongin', nameKr: '용인', country: 'KR', countryKr: '한국', latitude: 37.2411, longitude: 127.1776, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Seongnam', nameKr: '성남', country: 'KR', countryKr: '한국', latitude: 37.4201, longitude: 127.1265, timezone: 'Asia/Seoul', utcOffset: 9, standardMeridian: 135 },
	
	// 북한
	{ name: 'Pyongyang', nameKr: '평양', country: 'KP', countryKr: '북한', latitude: 39.0392, longitude: 125.7625, timezone: 'Asia/Pyongyang', utcOffset: 9, standardMeridian: 135 },
	
	// 중국
	{ name: 'Beijing', nameKr: '베이징', country: 'CN', countryKr: '중국', latitude: 39.9042, longitude: 116.4074, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Shanghai', nameKr: '상하이', country: 'CN', countryKr: '중국', latitude: 31.2304, longitude: 121.4737, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Guangzhou', nameKr: '광저우', country: 'CN', countryKr: '중국', latitude: 23.1291, longitude: 113.2644, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Shenzhen', nameKr: '선전', country: 'CN', countryKr: '중국', latitude: 22.5431, longitude: 114.0579, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Chengdu', nameKr: '청두', country: 'CN', countryKr: '중국', latitude: 30.5728, longitude: 104.0668, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Chongqing', nameKr: '충칭', country: 'CN', countryKr: '중국', latitude: 29.4316, longitude: 106.9123, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Xian', nameKr: '시안', country: 'CN', countryKr: '중국', latitude: 34.3416, longitude: 108.9398, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Hangzhou', nameKr: '항저우', country: 'CN', countryKr: '중국', latitude: 30.2741, longitude: 120.1551, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Nanjing', nameKr: '난징', country: 'CN', countryKr: '중국', latitude: 32.0603, longitude: 118.7969, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Harbin', nameKr: '하얼빈', country: 'CN', countryKr: '중국', latitude: 45.8038, longitude: 126.5350, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Shenyang', nameKr: '선양', country: 'CN', countryKr: '중국', latitude: 41.8057, longitude: 123.4315, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Dalian', nameKr: '다롄', country: 'CN', countryKr: '중국', latitude: 38.9140, longitude: 121.6147, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Qingdao', nameKr: '칭다오', country: 'CN', countryKr: '중국', latitude: 36.0671, longitude: 120.3826, timezone: 'Asia/Shanghai', utcOffset: 8, standardMeridian: 120 },
	
	// 일본
	{ name: 'Tokyo', nameKr: '도쿄', country: 'JP', countryKr: '일본', latitude: 35.6762, longitude: 139.6503, timezone: 'Asia/Tokyo', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Osaka', nameKr: '오사카', country: 'JP', countryKr: '일본', latitude: 34.6937, longitude: 135.5023, timezone: 'Asia/Tokyo', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Nagoya', nameKr: '나고야', country: 'JP', countryKr: '일본', latitude: 35.1815, longitude: 136.9066, timezone: 'Asia/Tokyo', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Fukuoka', nameKr: '후쿠오카', country: 'JP', countryKr: '일본', latitude: 33.5904, longitude: 130.4017, timezone: 'Asia/Tokyo', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Sapporo', nameKr: '삿포로', country: 'JP', countryKr: '일본', latitude: 43.0618, longitude: 141.3545, timezone: 'Asia/Tokyo', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Kyoto', nameKr: '교토', country: 'JP', countryKr: '일본', latitude: 35.0116, longitude: 135.7681, timezone: 'Asia/Tokyo', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Kobe', nameKr: '고베', country: 'JP', countryKr: '일본', latitude: 34.6901, longitude: 135.1956, timezone: 'Asia/Tokyo', utcOffset: 9, standardMeridian: 135 },
	{ name: 'Yokohama', nameKr: '요코하마', country: 'JP', countryKr: '일본', latitude: 35.4437, longitude: 139.6380, timezone: 'Asia/Tokyo', utcOffset: 9, standardMeridian: 135 },
	
	// 대만
	{ name: 'Taipei', nameKr: '타이베이', country: 'TW', countryKr: '대만', latitude: 25.0330, longitude: 121.5654, timezone: 'Asia/Taipei', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Kaohsiung', nameKr: '가오슝', country: 'TW', countryKr: '대만', latitude: 22.6273, longitude: 120.3014, timezone: 'Asia/Taipei', utcOffset: 8, standardMeridian: 120 },
	
	// 홍콩, 마카오
	{ name: 'Hong Kong', nameKr: '홍콩', country: 'HK', countryKr: '홍콩', latitude: 22.3193, longitude: 114.1694, timezone: 'Asia/Hong_Kong', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Macau', nameKr: '마카오', country: 'MO', countryKr: '마카오', latitude: 22.1987, longitude: 113.5439, timezone: 'Asia/Macau', utcOffset: 8, standardMeridian: 120 },
	
	// 싱가포르, 말레이시아
	{ name: 'Singapore', nameKr: '싱가포르', country: 'SG', countryKr: '싱가포르', latitude: 1.3521, longitude: 103.8198, timezone: 'Asia/Singapore', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Kuala Lumpur', nameKr: '쿠알라룸푸르', country: 'MY', countryKr: '말레이시아', latitude: 3.1390, longitude: 101.6869, timezone: 'Asia/Kuala_Lumpur', utcOffset: 8, standardMeridian: 120 },
	
	// 태국, 베트남
	{ name: 'Bangkok', nameKr: '방콕', country: 'TH', countryKr: '태국', latitude: 13.7563, longitude: 100.5018, timezone: 'Asia/Bangkok', utcOffset: 7, standardMeridian: 105 },
	{ name: 'Ho Chi Minh', nameKr: '호치민', country: 'VN', countryKr: '베트남', latitude: 10.8231, longitude: 106.6297, timezone: 'Asia/Ho_Chi_Minh', utcOffset: 7, standardMeridian: 105 },
	{ name: 'Hanoi', nameKr: '하노이', country: 'VN', countryKr: '베트남', latitude: 21.0285, longitude: 105.8542, timezone: 'Asia/Ho_Chi_Minh', utcOffset: 7, standardMeridian: 105 },
	
	// 필리핀, 인도네시아
	{ name: 'Manila', nameKr: '마닐라', country: 'PH', countryKr: '필리핀', latitude: 14.5995, longitude: 120.9842, timezone: 'Asia/Manila', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Jakarta', nameKr: '자카르타', country: 'ID', countryKr: '인도네시아', latitude: -6.2088, longitude: 106.8456, timezone: 'Asia/Jakarta', utcOffset: 7, standardMeridian: 105 },
	
	// 인도
	{ name: 'Mumbai', nameKr: '뭄바이', country: 'IN', countryKr: '인도', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata', utcOffset: 5.5, standardMeridian: 82.5 },
	{ name: 'Delhi', nameKr: '델리', country: 'IN', countryKr: '인도', latitude: 28.7041, longitude: 77.1025, timezone: 'Asia/Kolkata', utcOffset: 5.5, standardMeridian: 82.5 },
	{ name: 'Bangalore', nameKr: '방갈로르', country: 'IN', countryKr: '인도', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata', utcOffset: 5.5, standardMeridian: 82.5 },
	
	// 중동
	{ name: 'Dubai', nameKr: '두바이', country: 'AE', countryKr: 'UAE', latitude: 25.2048, longitude: 55.2708, timezone: 'Asia/Dubai', utcOffset: 4, standardMeridian: 60 },
	{ name: 'Tel Aviv', nameKr: '텔아비브', country: 'IL', countryKr: '이스라엘', latitude: 32.0853, longitude: 34.7818, timezone: 'Asia/Jerusalem', utcOffset: 2, standardMeridian: 30 },
	
	// 러시아
	{ name: 'Moscow', nameKr: '모스크바', country: 'RU', countryKr: '러시아', latitude: 55.7558, longitude: 37.6173, timezone: 'Europe/Moscow', utcOffset: 3, standardMeridian: 45 },
	{ name: 'Vladivostok', nameKr: '블라디보스토크', country: 'RU', countryKr: '러시아', latitude: 43.1332, longitude: 131.9113, timezone: 'Asia/Vladivostok', utcOffset: 10, standardMeridian: 150 },
	
	// 유럽
	{ name: 'London', nameKr: '런던', country: 'GB', countryKr: '영국', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London', utcOffset: 0, standardMeridian: 0 },
	{ name: 'Paris', nameKr: '파리', country: 'FR', countryKr: '프랑스', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Berlin', nameKr: '베를린', country: 'DE', countryKr: '독일', latitude: 52.5200, longitude: 13.4050, timezone: 'Europe/Berlin', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Frankfurt', nameKr: '프랑크푸르트', country: 'DE', countryKr: '독일', latitude: 50.1109, longitude: 8.6821, timezone: 'Europe/Berlin', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Munich', nameKr: '뮌헨', country: 'DE', countryKr: '독일', latitude: 48.1351, longitude: 11.5820, timezone: 'Europe/Berlin', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Amsterdam', nameKr: '암스테르담', country: 'NL', countryKr: '네덜란드', latitude: 52.3676, longitude: 4.9041, timezone: 'Europe/Amsterdam', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Rome', nameKr: '로마', country: 'IT', countryKr: '이탈리아', latitude: 41.9028, longitude: 12.4964, timezone: 'Europe/Rome', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Milan', nameKr: '밀라노', country: 'IT', countryKr: '이탈리아', latitude: 45.4642, longitude: 9.1900, timezone: 'Europe/Rome', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Madrid', nameKr: '마드리드', country: 'ES', countryKr: '스페인', latitude: 40.4168, longitude: -3.7038, timezone: 'Europe/Madrid', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Barcelona', nameKr: '바르셀로나', country: 'ES', countryKr: '스페인', latitude: 41.3851, longitude: 2.1734, timezone: 'Europe/Madrid', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Vienna', nameKr: '비엔나', country: 'AT', countryKr: '오스트리아', latitude: 48.2082, longitude: 16.3738, timezone: 'Europe/Vienna', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Zurich', nameKr: '취리히', country: 'CH', countryKr: '스위스', latitude: 47.3769, longitude: 8.5417, timezone: 'Europe/Zurich', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Stockholm', nameKr: '스톡홀름', country: 'SE', countryKr: '스웨덴', latitude: 59.3293, longitude: 18.0686, timezone: 'Europe/Stockholm', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Copenhagen', nameKr: '코펜하겐', country: 'DK', countryKr: '덴마크', latitude: 55.6761, longitude: 12.5683, timezone: 'Europe/Copenhagen', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Oslo', nameKr: '오슬로', country: 'NO', countryKr: '노르웨이', latitude: 59.9139, longitude: 10.7522, timezone: 'Europe/Oslo', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Helsinki', nameKr: '헬싱키', country: 'FI', countryKr: '핀란드', latitude: 60.1699, longitude: 24.9384, timezone: 'Europe/Helsinki', utcOffset: 2, standardMeridian: 30 },
	{ name: 'Warsaw', nameKr: '바르샤바', country: 'PL', countryKr: '폴란드', latitude: 52.2297, longitude: 21.0122, timezone: 'Europe/Warsaw', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Prague', nameKr: '프라하', country: 'CZ', countryKr: '체코', latitude: 50.0755, longitude: 14.4378, timezone: 'Europe/Prague', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Budapest', nameKr: '부다페스트', country: 'HU', countryKr: '헝가리', latitude: 47.4979, longitude: 19.0402, timezone: 'Europe/Budapest', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Athens', nameKr: '아테네', country: 'GR', countryKr: '그리스', latitude: 37.9838, longitude: 23.7275, timezone: 'Europe/Athens', utcOffset: 2, standardMeridian: 30 },
	{ name: 'Istanbul', nameKr: '이스탄불', country: 'TR', countryKr: '터키', latitude: 41.0082, longitude: 28.9784, timezone: 'Europe/Istanbul', utcOffset: 3, standardMeridian: 45 },
	
	// 미국
	{ name: 'New York', nameKr: '뉴욕', country: 'US', countryKr: '미국', latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York', utcOffset: -5, standardMeridian: -75 },
	{ name: 'Los Angeles', nameKr: '로스앤젤레스', country: 'US', countryKr: '미국', latitude: 34.0522, longitude: -118.2437, timezone: 'America/Los_Angeles', utcOffset: -8, standardMeridian: -120 },
	{ name: 'Chicago', nameKr: '시카고', country: 'US', countryKr: '미국', latitude: 41.8781, longitude: -87.6298, timezone: 'America/Chicago', utcOffset: -6, standardMeridian: -90 },
	{ name: 'Houston', nameKr: '휴스턴', country: 'US', countryKr: '미국', latitude: 29.7604, longitude: -95.3698, timezone: 'America/Chicago', utcOffset: -6, standardMeridian: -90 },
	{ name: 'Dallas', nameKr: '댈러스', country: 'US', countryKr: '미국', latitude: 32.7767, longitude: -96.7970, timezone: 'America/Chicago', utcOffset: -6, standardMeridian: -90 },
	{ name: 'San Francisco', nameKr: '샌프란시스코', country: 'US', countryKr: '미국', latitude: 37.7749, longitude: -122.4194, timezone: 'America/Los_Angeles', utcOffset: -8, standardMeridian: -120 },
	{ name: 'Seattle', nameKr: '시애틀', country: 'US', countryKr: '미국', latitude: 47.6062, longitude: -122.3321, timezone: 'America/Los_Angeles', utcOffset: -8, standardMeridian: -120 },
	{ name: 'Boston', nameKr: '보스턴', country: 'US', countryKr: '미국', latitude: 42.3601, longitude: -71.0589, timezone: 'America/New_York', utcOffset: -5, standardMeridian: -75 },
	{ name: 'Washington DC', nameKr: '워싱턴 DC', country: 'US', countryKr: '미국', latitude: 38.9072, longitude: -77.0369, timezone: 'America/New_York', utcOffset: -5, standardMeridian: -75 },
	{ name: 'Miami', nameKr: '마이애미', country: 'US', countryKr: '미국', latitude: 25.7617, longitude: -80.1918, timezone: 'America/New_York', utcOffset: -5, standardMeridian: -75 },
	{ name: 'Atlanta', nameKr: '애틀랜타', country: 'US', countryKr: '미국', latitude: 33.7490, longitude: -84.3880, timezone: 'America/New_York', utcOffset: -5, standardMeridian: -75 },
	{ name: 'Denver', nameKr: '덴버', country: 'US', countryKr: '미국', latitude: 39.7392, longitude: -104.9903, timezone: 'America/Denver', utcOffset: -7, standardMeridian: -105 },
	{ name: 'Phoenix', nameKr: '피닉스', country: 'US', countryKr: '미국', latitude: 33.4484, longitude: -112.0740, timezone: 'America/Phoenix', utcOffset: -7, standardMeridian: -105 },
	{ name: 'Las Vegas', nameKr: '라스베가스', country: 'US', countryKr: '미국', latitude: 36.1699, longitude: -115.1398, timezone: 'America/Los_Angeles', utcOffset: -8, standardMeridian: -120 },
	{ name: 'Honolulu', nameKr: '호놀룰루', country: 'US', countryKr: '미국', latitude: 21.3069, longitude: -157.8583, timezone: 'Pacific/Honolulu', utcOffset: -10, standardMeridian: -150 },
	
	// 캐나다
	{ name: 'Toronto', nameKr: '토론토', country: 'CA', countryKr: '캐나다', latitude: 43.6532, longitude: -79.3832, timezone: 'America/Toronto', utcOffset: -5, standardMeridian: -75 },
	{ name: 'Vancouver', nameKr: '밴쿠버', country: 'CA', countryKr: '캐나다', latitude: 49.2827, longitude: -123.1207, timezone: 'America/Vancouver', utcOffset: -8, standardMeridian: -120 },
	{ name: 'Montreal', nameKr: '몬트리올', country: 'CA', countryKr: '캐나다', latitude: 45.5017, longitude: -73.5673, timezone: 'America/Toronto', utcOffset: -5, standardMeridian: -75 },
	{ name: 'Calgary', nameKr: '캘거리', country: 'CA', countryKr: '캐나다', latitude: 51.0447, longitude: -114.0719, timezone: 'America/Edmonton', utcOffset: -7, standardMeridian: -105 },
	
	// 호주, 뉴질랜드
	{ name: 'Sydney', nameKr: '시드니', country: 'AU', countryKr: '호주', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney', utcOffset: 10, standardMeridian: 150 },
	{ name: 'Melbourne', nameKr: '멜버른', country: 'AU', countryKr: '호주', latitude: -37.8136, longitude: 144.9631, timezone: 'Australia/Melbourne', utcOffset: 10, standardMeridian: 150 },
	{ name: 'Brisbane', nameKr: '브리즈번', country: 'AU', countryKr: '호주', latitude: -27.4698, longitude: 153.0251, timezone: 'Australia/Brisbane', utcOffset: 10, standardMeridian: 150 },
	{ name: 'Perth', nameKr: '퍼스', country: 'AU', countryKr: '호주', latitude: -31.9505, longitude: 115.8605, timezone: 'Australia/Perth', utcOffset: 8, standardMeridian: 120 },
	{ name: 'Auckland', nameKr: '오클랜드', country: 'NZ', countryKr: '뉴질랜드', latitude: -36.8485, longitude: 174.7633, timezone: 'Pacific/Auckland', utcOffset: 12, standardMeridian: 180 },
	
	// 남미
	{ name: 'Sao Paulo', nameKr: '상파울루', country: 'BR', countryKr: '브라질', latitude: -23.5505, longitude: -46.6333, timezone: 'America/Sao_Paulo', utcOffset: -3, standardMeridian: -45 },
	{ name: 'Rio de Janeiro', nameKr: '리우데자네이루', country: 'BR', countryKr: '브라질', latitude: -22.9068, longitude: -43.1729, timezone: 'America/Sao_Paulo', utcOffset: -3, standardMeridian: -45 },
	{ name: 'Buenos Aires', nameKr: '부에노스아이레스', country: 'AR', countryKr: '아르헨티나', latitude: -34.6037, longitude: -58.3816, timezone: 'America/Argentina/Buenos_Aires', utcOffset: -3, standardMeridian: -45 },
	{ name: 'Santiago', nameKr: '산티아고', country: 'CL', countryKr: '칠레', latitude: -33.4489, longitude: -70.6693, timezone: 'America/Santiago', utcOffset: -4, standardMeridian: -60 },
	{ name: 'Lima', nameKr: '리마', country: 'PE', countryKr: '페루', latitude: -12.0464, longitude: -77.0428, timezone: 'America/Lima', utcOffset: -5, standardMeridian: -75 },
	{ name: 'Mexico City', nameKr: '멕시코시티', country: 'MX', countryKr: '멕시코', latitude: 19.4326, longitude: -99.1332, timezone: 'America/Mexico_City', utcOffset: -6, standardMeridian: -90 },
	
	// 아프리카
	{ name: 'Cairo', nameKr: '카이로', country: 'EG', countryKr: '이집트', latitude: 30.0444, longitude: 31.2357, timezone: 'Africa/Cairo', utcOffset: 2, standardMeridian: 30 },
	{ name: 'Johannesburg', nameKr: '요하네스버그', country: 'ZA', countryKr: '남아공', latitude: -26.2041, longitude: 28.0473, timezone: 'Africa/Johannesburg', utcOffset: 2, standardMeridian: 30 },
	{ name: 'Cape Town', nameKr: '케이프타운', country: 'ZA', countryKr: '남아공', latitude: -33.9249, longitude: 18.4241, timezone: 'Africa/Johannesburg', utcOffset: 2, standardMeridian: 30 },
	{ name: 'Lagos', nameKr: '라고스', country: 'NG', countryKr: '나이지리아', latitude: 6.5244, longitude: 3.3792, timezone: 'Africa/Lagos', utcOffset: 1, standardMeridian: 15 },
	{ name: 'Nairobi', nameKr: '나이로비', country: 'KE', countryKr: '케냐', latitude: -1.2921, longitude: 36.8219, timezone: 'Africa/Nairobi', utcOffset: 3, standardMeridian: 45 },
];

// 국가별 도시 그룹화
export function getCitiesByCountry(): Map<string, City[]> {
	const map = new Map<string, City[]>();
	for (const city of CITIES) {
		const key = city.countryKr;
		if (!map.has(key)) {
			map.set(key, []);
		}
		map.get(key)!.push(city);
	}
	return map;
}

// 도시 검색
export function searchCities(query: string): City[] {
	const q = query.toLowerCase();
	return CITIES.filter(city => 
		city.name.toLowerCase().includes(q) || 
		city.nameKr.includes(query) ||
		city.countryKr.includes(query)
	);
}

// 도시 이름으로 찾기
export function findCityByName(name: string): City | undefined {
	return CITIES.find(city => city.name === name || city.nameKr === name);
}

/**
 * 경도 보정 시간 계산 (분 단위)
 * 실제 태양시 = 표준시 + longitudeCorrection
 * 
 * @param city 도시 정보
 * @returns 보정 시간 (분), 양수면 태양이 더 일찍 뜸
 */
export function getLongitudeCorrection(city: City): number {
	// 경도 1도 = 4분 차이
	// 동쪽으로 갈수록 태양이 더 일찍 뜸
	const correction = (city.longitude - city.standardMeridian) * 4;
	return correction;
}

/**
 * 주어진 도시와 시간에 대해 dates_mapping.json 조회용 UTC 기준 날짜/시간 계산
 * 
 * @param city 도시 정보
 * @param year 출생 연도
 * @param month 출생 월
 * @param day 출생 일
 * @param hour 출생 시 (0-23)
 * @param minute 출생 분 (0-59)
 * @returns 보정된 날짜/시간 (한국 표준시 기준)
 */
export function convertToKST(
	city: City,
	year: number,
	month: number,
	day: number,
	hour: number,
	minute: number = 0
): { year: number; month: number; day: number; hour: number; minute: number } {
	// 1. 현지 시간 → UTC 변환
	// 현지 시간에서 UTC 오프셋을 빼면 UTC 시간
	const localMinutes = hour * 60 + minute;
	const utcMinutes = localMinutes - (city.utcOffset * 60);
	
	// 2. UTC → KST 변환 (UTC + 9시간)
	const kstMinutes = utcMinutes + (9 * 60);
	
	// 3. 경도 보정 적용 (선택적 - 더 정확한 태양시)
	// 서울 기준 경도 보정: (126.978 - 135) * 4 = -32.088분
	// 즉, 서울의 실제 태양시는 KST보다 약 32분 느림
	// const longitudeCorrection = getLongitudeCorrection(city);
	// const correctedMinutes = kstMinutes + longitudeCorrection;
	
	// 일단 경도 보정 없이 시간대만 변환 (대부분의 사주 프로그램 방식)
	const correctedMinutes = kstMinutes;
	
	// 4. 날짜/시간 계산
	let totalMinutes = correctedMinutes;
	let newDay = day;
	let newMonth = month;
	let newYear = year;
	
	// 음수 처리 (전날)
	while (totalMinutes < 0) {
		totalMinutes += 24 * 60;
		newDay--;
		if (newDay < 1) {
			newMonth--;
			if (newMonth < 1) {
				newMonth = 12;
				newYear--;
			}
			// 해당 월의 마지막 날 계산
			newDay = new Date(newYear, newMonth, 0).getDate();
		}
	}
	
	// 24시간 초과 처리 (다음날)
	while (totalMinutes >= 24 * 60) {
		totalMinutes -= 24 * 60;
		newDay++;
		const daysInMonth = new Date(newYear, newMonth, 0).getDate();
		if (newDay > daysInMonth) {
			newDay = 1;
			newMonth++;
			if (newMonth > 12) {
				newMonth = 1;
				newYear++;
			}
		}
	}
	
	const newHour = Math.floor(totalMinutes / 60);
	const newMinute = totalMinutes % 60;
	
	return {
		year: newYear,
		month: newMonth,
		day: newDay,
		hour: newHour,
		minute: newMinute
	};
}

// 기본 도시 (서울)
export const DEFAULT_CITY = CITIES.find(c => c.name === 'Seoul')!;

