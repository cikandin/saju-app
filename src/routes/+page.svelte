<script lang="ts">
	import { 
		birthInfo, 
		isCalculated, 
		sajuResult, 
		dayMasterInterpretation,
		elementBalanceInterpretation,
		specialStarsInterpretation,
		daewoonResult,
		yearlyFortuneResult,
		monthlyFortuneResult,
		isLoading,
		performCalculation,
		resetCalculation
	} from '$lib/stores';
	import { 
		FIVE_ELEMENTS_KR, 
		FIVE_ELEMENTS_EMOJI, 
		getElementRelations,
		getZodiacCompatibility,
		EARTHLY_BRANCHES,
		EARTHLY_BRANCHES_KR,
		ZODIAC_ANIMALS,
		ZODIAC_EMOJI,
		HEAVENLY_STEMS_KR,
		interpretLifePeriods,
		getSibsinInfo,
		getFortuneInterpretation,
		type FiveElement
	} from '$lib/saju';
	import { CITIES, getCitiesByCountry, type City } from '$lib/cities';
	
	// 국가별 도시 그룹
	const citiesByCountry = getCitiesByCountry();
	
	// 도시 검색
	let citySearchQuery = $state('');
	let showCityDropdown = $state(false);
	
	const filteredCities = $derived(() => {
		if (!citySearchQuery) return [];
		const q = citySearchQuery.toLowerCase();
		return CITIES.filter(city => 
			city.name.toLowerCase().includes(q) || 
			city.nameKr.includes(citySearchQuery) ||
			city.countryKr.includes(citySearchQuery)
		).slice(0, 10);
	});
	
	function selectCity(city: City) {
		$birthInfo.city = city;
		citySearchQuery = '';
		showCityDropdown = false;
	}
	
	// 현재 연도
	const currentYear = new Date().getFullYear();
	
	// 시간 옵션 (시주 계산용)
	const hourOptions = [
		{ value: 0, label: '자시(子時) 23:00~01:00' },
		{ value: 2, label: '축시(丑時) 01:00~03:00' },
		{ value: 4, label: '인시(寅時) 03:00~05:00' },
		{ value: 6, label: '묘시(卯時) 05:00~07:00' },
		{ value: 8, label: '진시(辰時) 07:00~09:00' },
		{ value: 10, label: '사시(巳時) 09:00~11:00' },
		{ value: 12, label: '오시(午時) 11:00~13:00' },
		{ value: 14, label: '미시(未時) 13:00~15:00' },
		{ value: 16, label: '신시(申時) 15:00~17:00' },
		{ value: 18, label: '유시(酉時) 17:00~19:00' },
		{ value: 20, label: '술시(戌時) 19:00~21:00' },
		{ value: 22, label: '해시(亥時) 21:00~23:00' },
	];
	
	function handleSubmit(e: Event) {
		e.preventDefault();
		performCalculation();
	}
	
	function getElementColorClass(element: FiveElement): string {
		const colors: Record<FiveElement, string> = {
			wood: 'text-green-500',
			fire: 'text-red-500',
			earth: 'text-yellow-600',
			metal: 'text-gray-300',
			water: 'text-blue-500'
		};
		return colors[element];
	}
	
	function getElementBgClass(element: FiveElement): string {
		const colors: Record<FiveElement, string> = {
			wood: 'bg-green-500/20 border-green-500/50',
			fire: 'bg-red-500/20 border-red-500/50',
			earth: 'bg-yellow-600/20 border-yellow-600/50',
			metal: 'bg-gray-300/20 border-gray-300/50',
			water: 'bg-blue-500/20 border-blue-500/50'
		};
		return colors[element];
	}
	
	function getRatingStars(rating: number): string {
		return '★'.repeat(rating) + '☆'.repeat(5 - rating);
	}
	
	function getBranchKr(branch: string): string {
		const idx = EARTHLY_BRANCHES.indexOf(branch as typeof EARTHLY_BRANCHES[number]);
		return idx >= 0 ? EARTHLY_BRANCHES_KR[idx] : branch;
	}
</script>

<div class="container mx-auto px-4 py-8 max-w-6xl">
	{#if !$isCalculated}
		<!-- 입력 폼 -->
		<div class="animate-fade-in-up">
			<header class="text-center mb-12">
				<h1 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
					四柱八字
				</h1>
				<p class="text-xl opacity-80">사주팔자로 알아보는 나의 운명</p>
				<div class="mt-4 text-6xl">☯</div>
			</header>
			
			<form onsubmit={handleSubmit} class="card bg-base-100/80 backdrop-blur-sm shadow-2xl max-w-md mx-auto">
				<div class="card-body gap-0">
					<h2 class="card-title justify-center text-2xl mb-6">생년월일시 입력</h2>
					
					<!-- 양력/음력 선택 -->
					<div class="flex justify-center mb-6">
						<label class="flex items-center gap-3 cursor-pointer">
							<span class="text-base font-medium opacity-70">양력</span>
							<input 
								type="checkbox" 
								class="toggle toggle-primary toggle-sm" 
								bind:checked={$birthInfo.isLunar}
							/>
							<span class="text-base font-medium opacity-70">음력</span>
						</label>
					</div>
					
					<!-- 생년월일 그리드 -->
					<div class="grid grid-cols-3 gap-3 mb-4">
						<div class="form-control">
							<label class="label py-1" for="year">
								<span class="label-text text-xs opacity-70">연도</span>
							</label>
							<input 
								type="number" 
								id="year"
								class="input input-bordered input-primary input-sm w-full text-center"
								bind:value={$birthInfo.year}
								min="1930"
								max="2049"
								required
							/>
						</div>
						
						<div class="form-control">
							<label class="label py-1" for="month">
								<span class="label-text text-xs opacity-70">월</span>
							</label>
							<select 
								id="month"
								class="select select-bordered select-primary select-sm w-full text-center"
								bind:value={$birthInfo.month}
							>
								{#each Array(12) as _, i}
									<option value={i + 1}>{i + 1}월</option>
								{/each}
							</select>
						</div>
						
						<div class="form-control">
							<label class="label py-1" for="day">
								<span class="label-text text-xs opacity-70">일</span>
							</label>
							<input 
								type="number" 
								id="day"
								class="input input-bordered input-primary input-sm w-full text-center"
								bind:value={$birthInfo.day}
								min="1"
								max="31"
								required
							/>
						</div>
					</div>
					
					<!-- 시간 -->
					<div class="form-control mb-4">
						<label class="label py-1" for="hour">
							<span class="label-text text-xs opacity-70">출생 시간</span>
						</label>
						<select 
							id="hour"
							class="select select-bordered select-primary select-sm w-full"
							bind:value={$birthInfo.hour}
						>
							{#each hourOptions as opt}
								<option value={opt.value}>{opt.label}</option>
							{/each}
						</select>
					</div>
					
					<!-- 성별 -->
					<div class="form-control mb-4">
						<label class="label py-1">
							<span class="label-text text-xs opacity-70">성별</span>
						</label>
						<div class="flex justify-center gap-6">
							<label class="flex items-center gap-2 cursor-pointer">
								<input 
									type="radio" 
									name="gender" 
									class="radio radio-primary radio-sm" 
									value="male"
									bind:group={$birthInfo.gender}
								/>
								<span class="text-sm">남성 ♂</span>
							</label>
							<label class="flex items-center gap-2 cursor-pointer">
								<input 
									type="radio" 
									name="gender" 
									class="radio radio-primary radio-sm" 
									value="female"
									bind:group={$birthInfo.gender}
								/>
								<span class="text-sm">여성 ♀</span>
							</label>
						</div>
					</div>
					
					<!-- 출생지 -->
					<div class="form-control mb-6">
						<label class="label py-1">
							<span class="label-text text-xs opacity-70">출생지</span>
						</label>
						<div class="relative">
							<div class="join w-full">
								<input 
									type="text"
									class="input input-bordered input-primary input-sm join-item flex-1"
									placeholder="도시 검색..."
									bind:value={citySearchQuery}
									onfocus={() => showCityDropdown = true}
								/>
								<div class="btn btn-primary btn-sm join-item pointer-events-none">
									📍 {$birthInfo.city.nameKr}
								</div>
							</div>
							
							{#if showCityDropdown && (citySearchQuery || filteredCities().length > 0)}
								<div class="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
									{#if citySearchQuery && filteredCities().length > 0}
										<!-- 검색 결과 -->
										{#each filteredCities() as city}
											<button
												type="button"
												class="w-full px-3 py-2 text-left hover:bg-base-200 flex justify-between items-center"
												onclick={() => selectCity(city)}
											>
												<span>{city.nameKr} ({city.name})</span>
												<span class="text-xs opacity-50">{city.countryKr}</span>
											</button>
										{/each}
									{:else if citySearchQuery}
										<div class="px-3 py-2 text-sm opacity-50">검색 결과가 없습니다</div>
									{:else}
										<!-- 주요 국가별 도시 -->
										{#each ['한국', '중국', '일본', '미국'] as country}
											<div class="px-3 py-1 bg-base-200 text-xs font-bold opacity-70">{country}</div>
											{#each citiesByCountry.get(country)?.slice(0, 5) || [] as city}
												<button
													type="button"
													class="w-full px-3 py-2 text-left hover:bg-base-200 text-sm"
													onclick={() => selectCity(city)}
												>
													{city.nameKr}
												</button>
											{/each}
										{/each}
									{/if}
								</div>
							{/if}
						</div>
						<div class="label py-1">
							<span class="label-text-alt opacity-50">
								시간대: UTC{$birthInfo.city.utcOffset >= 0 ? '+' : ''}{$birthInfo.city.utcOffset} | 
								경도: {$birthInfo.city.longitude.toFixed(2)}°
							</span>
						</div>
					</div>
					
					<button 
						type="submit" 
						class="btn btn-primary btn-block gap-2 animate-pulse-glow"
						disabled={$isLoading}
					>
						{#if $isLoading}
							<span class="loading loading-spinner loading-sm"></span>
							분석 중...
						{:else}
							<span>🔮</span>
							사주 보기
						{/if}
					</button>
				</div>
			</form>
		</div>
	{:else if $sajuResult}
		<!-- 결과 화면 -->
		<div class="space-y-8">
			<!-- 헤더 -->
			<header class="text-center animate-fade-in-up">
				<button 
					onclick={() => resetCalculation()}
					class="btn btn-ghost btn-sm mb-4"
				>
					← 다시 보기
				</button>
				<h1 class="text-4xl font-bold mb-2">사주팔자 분석 결과</h1>
				<p class="opacity-70">
					{$birthInfo.isLunar ? '음력' : '양력'} {$birthInfo.year}년 {$birthInfo.month}월 {$birthInfo.day}일
					({$birthInfo.gender === 'male' ? '남' : '여'})
				</p>
				<p class="text-sm opacity-50 mt-1">
					📍 {$birthInfo.city.nameKr}, {$birthInfo.city.countryKr}
					(UTC{$birthInfo.city.utcOffset >= 0 ? '+' : ''}{$birthInfo.city.utcOffset})
				</p>
				{#if $birthInfo.isLunar === false}
					<p class="text-sm opacity-50 mt-1">
						음력: {$sajuResult.lunarDate.year}년 {$sajuResult.lunarDate.month}월 {$sajuResult.lunarDate.day}일
						{$sajuResult.lunarDate.isLeapMonth ? '(윤달)' : ''}
					</p>
				{/if}
			</header>
			
			<!-- 사주 팔자 (4개의 기둥) -->
			<section class="animate-fade-in-up delay-100">
				<h2 class="text-2xl font-bold text-center mb-6">📜 사주팔자 (四柱八字)</h2>
				<div class="grid grid-cols-4 gap-2 md:gap-4">
					{#each [
						{ name: '시주(時柱)', pillar: $sajuResult.hour, tenGod: $sajuResult.tenGods.hour },
						{ name: '일주(日柱)', pillar: $sajuResult.day, highlight: true },
						{ name: '월주(月柱)', pillar: $sajuResult.month, tenGod: $sajuResult.tenGods.month },
						{ name: '연주(年柱)', pillar: $sajuResult.year, tenGod: $sajuResult.tenGods.year }
					] as { name, pillar, highlight, tenGod }}
						<div class="card {highlight ? 'bg-primary/20 ring-2 ring-primary' : 'bg-base-100/80'} backdrop-blur-sm shadow-xl">
							<div class="card-body items-center text-center p-3 md:p-6">
								<span class="text-xs md:text-sm opacity-70">{name}</span>
								{#if highlight}
									<span class="badge badge-primary badge-sm">일간</span>
								{:else if tenGod}
									<span class="badge badge-ghost badge-sm">{tenGod.name}</span>
								{/if}
								
								<!-- 천간 -->
								<div class="tooltip" data-tip="{FIVE_ELEMENTS_KR[pillar.stemElement]} {FIVE_ELEMENTS_EMOJI[pillar.stemElement]}">
									<span class="text-3xl md:text-5xl font-bold {getElementColorClass(pillar.stemElement)}">
										{pillar.stem}
									</span>
								</div>
								<span class="text-sm opacity-70">{pillar.stemKr}</span>
								
								<div class="divider my-1"></div>
								
								<!-- 지지 -->
								<div class="tooltip" data-tip="{pillar.zodiac} {pillar.zodiacEmoji}">
									<span class="text-3xl md:text-5xl font-bold {getElementColorClass(pillar.branchElement)}">
										{pillar.branch}
									</span>
								</div>
								<span class="text-sm opacity-70">{pillar.branchKr}</span>
								<span class="text-2xl">{pillar.zodiacEmoji}</span>
								
								<!-- 지장간 표시 -->
								{#if pillar.hiddenStems && pillar.hiddenStems.length > 0}
									<div class="text-xs opacity-50 mt-1">
										지장간: {pillar.hiddenStems.join(', ')}
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</section>
			
			<!-- 일간(본인) 해석 -->
			<section class="animate-fade-in-up delay-200">
				<div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
					<div class="card-body">
						<h2 class="card-title text-2xl justify-center">
							🌟 일간(日干) - 나의 본성
						</h2>
						<div class="text-center my-4">
							<span class="text-6xl font-bold {getElementColorClass($sajuResult.dayMaster.element)}">
								{$sajuResult.dayMaster.stem}
							</span>
							<p class="mt-2">
								<span class="badge {getElementBgClass($sajuResult.dayMaster.element)} badge-lg">
									{FIVE_ELEMENTS_EMOJI[$sajuResult.dayMaster.element]} {FIVE_ELEMENTS_KR[$sajuResult.dayMaster.element]}
								</span>
								<span class="badge badge-outline badge-lg ml-2">
									{$sajuResult.dayMaster.yinYang === 'yang' ? '☀️ 양(陽)' : '🌙 음(陰)'}
								</span>
							</p>
						</div>
						<p class="text-center text-lg leading-relaxed">
							{$dayMasterInterpretation}
						</p>
					</div>
				</div>
			</section>
			
			<!-- 초년/청년/중년/말년운 -->
			<section class="animate-fade-in-up">
				<div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
					<div class="card-body">
						<h2 class="card-title text-2xl justify-center">
							🌅 시기별 운세 (초년~말년)
						</h2>
						<p class="text-center text-sm opacity-70 mb-4">사주 사기둥으로 보는 인생 각 시기의 운세</p>
						
						<div class="grid md:grid-cols-2 gap-4 mt-4">
							{#each interpretLifePeriods($sajuResult) as period}
								<div class="p-4 rounded-xl border {getElementBgClass(period.element)}">
									<div class="flex justify-between items-start mb-3">
										<div>
											<h3 class="font-bold text-lg">{period.period}</h3>
											<p class="text-xs opacity-70">{period.ageRange}</p>
										</div>
										<div class="text-right">
											<span class="text-2xl font-bold {getElementColorClass(period.element)}">{period.pillar}</span>
											<p class="text-xs opacity-70">{period.pillarKr}</p>
										</div>
									</div>
									<p class="text-sm leading-relaxed mb-3">{period.interpretation}</p>
									<div class="flex flex-wrap gap-1">
										{#each period.keywords as keyword}
											<span class="badge badge-sm badge-ghost">{keyword}</span>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</section>
			
			<!-- 신살(神殺) - 귀인/문창/도화/역마/화개 -->
			<section class="animate-fade-in-up">
				<div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
					<div class="card-body">
						<h2 class="card-title text-2xl justify-center">
							✨ 신살(神殺) 분석
						</h2>
						
						<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
							<!-- 귀인 -->
							<div class="p-4 bg-gradient-to-br from-yellow-500/20 to-amber-500/10 rounded-xl border border-yellow-500/30">
								<h3 class="font-bold text-yellow-500 mb-2">🌟 귀인 (貴人)</h3>
								<p class="text-sm mb-2">도움을 주는 귀한 인연</p>
								<div class="flex gap-2">
									{#each $sajuResult.specialStars.nobleman as branch}
										<span class="badge badge-warning">{getBranchKr(branch)}({branch})</span>
									{/each}
								</div>
							</div>
							
							<!-- 문창 -->
							<div class="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-xl border border-blue-500/30">
								<h3 class="font-bold text-blue-500 mb-2">📚 문창 (文昌)</h3>
								<p class="text-sm mb-2">학업/지적 능력</p>
								<span class="badge badge-info">{getBranchKr($sajuResult.specialStars.intelligence)}({$sajuResult.specialStars.intelligence})</span>
							</div>
							
							<!-- 도화 -->
							<div class="p-4 bg-gradient-to-br from-pink-500/20 to-rose-500/10 rounded-xl border border-pink-500/30">
								<h3 class="font-bold text-pink-500 mb-2">🌸 도화 (桃花)</h3>
								<p class="text-sm mb-2">연애/매력/인기</p>
								<span class="badge badge-secondary">{getBranchKr($sajuResult.specialStars.peachBlossom)}({$sajuResult.specialStars.peachBlossom})</span>
							</div>
							
							<!-- 역마 -->
							<div class="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl border border-green-500/30">
								<h3 class="font-bold text-green-500 mb-2">🐎 역마 (驛馬)</h3>
								<p class="text-sm mb-2">이동/변화/해외운</p>
								<span class="badge badge-success">{getBranchKr($sajuResult.specialStars.skyHorse)}({$sajuResult.specialStars.skyHorse})</span>
							</div>
							
							<!-- 화개 -->
							<div class="p-4 bg-gradient-to-br from-purple-500/20 to-violet-500/10 rounded-xl border border-purple-500/30">
								<h3 class="font-bold text-purple-500 mb-2">🎭 화개 (華蓋)</h3>
								<p class="text-sm mb-2">예술/종교적 재능</p>
								<span class="badge badge-primary">{getBranchKr($sajuResult.specialStars.flowerCanopy)}({$sajuResult.specialStars.flowerCanopy})</span>
							</div>
							
							<!-- 팔택풍수 -->
							<div class="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-xl border border-orange-500/30">
								<h3 class="font-bold text-orange-500 mb-2">🧭 팔택풍수</h3>
								<p class="text-sm mb-2">생명괘: {$sajuResult.eightMansions.lifeGua}괘 ({$sajuResult.eightMansions.group})</p>
								<div class="text-xs">
									<span class="text-success">길방: {$sajuResult.eightMansions.luckyDirections.join(', ')}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			<!-- 대운 (10년 운세) -->
			{#if $daewoonResult && $daewoonResult.length > 0}
				<section class="animate-fade-in-up">
					<div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
						<div class="card-body">
							<h2 class="card-title text-2xl justify-center">
								🌊 대운 (大運) - 10년 주기 운세
							</h2>
							<p class="text-center text-sm opacity-70 mb-4">인생의 큰 흐름을 나타내는 10년 단위 운세</p>
							
							<div class="overflow-x-auto">
								<div class="flex gap-3 pb-4">
									{#each $daewoonResult as dw, i}
										{@const isCurrentDaewoon = currentYear >= dw.startYear && currentYear <= dw.endYear}
										<div class="flex-shrink-0 w-28 p-3 rounded-xl text-center {isCurrentDaewoon ? 'bg-primary/30 ring-2 ring-primary' : 'bg-base-200'}">
											{#if isCurrentDaewoon}
												<span class="badge badge-primary badge-sm mb-2">현재 대운</span>
											{/if}
											<p class="text-xs opacity-70">{dw.age}세 ~</p>
											<p class="text-xs opacity-50">{dw.startYear}-{dw.endYear}</p>
											<p class="text-2xl font-bold {getElementColorClass(dw.element)} my-2">
												{dw.stem}{dw.branch}
											</p>
											<p class="text-xs">{dw.stemKr}{dw.branchKr}</p>
											<span class="badge badge-ghost badge-sm mt-2">{dw.tenGod}</span>
										</div>
									{/each}
								</div>
							</div>
							
							<!-- 현재 대운 해설 -->
							{#each $daewoonResult.filter(dw => currentYear >= dw.startYear && currentYear <= dw.endYear).slice(0, 1) as currentDw}
								{@const sibsinInfo = getSibsinInfo(currentDw.tenGod)}
								<div class="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/30">
									<div class="flex items-center gap-2 mb-3">
										<span class="badge badge-primary">현재 대운 해설</span>
										<span class="font-bold">{currentDw.tenGod} ({sibsinInfo.hanja})</span>
										<span class="text-xs opacity-70">- {sibsinInfo.category}</span>
									</div>
									<p class="text-sm leading-relaxed mb-3">{getFortuneInterpretation(currentDw.tenGod, 'daewoon')}</p>
									<div class="grid md:grid-cols-2 gap-4 mt-4">
										<div>
											<p class="text-xs font-bold text-success mb-1">✅ 긍정적 기운</p>
											<div class="flex flex-wrap gap-1">
												{#each sibsinInfo.positiveTraits as trait}
													<span class="badge badge-success badge-sm badge-outline">{trait}</span>
												{/each}
											</div>
										</div>
										<div>
											<p class="text-xs font-bold text-warning mb-1">⚠️ 주의할 점</p>
											<div class="flex flex-wrap gap-1">
												{#each sibsinInfo.negativeTraits as trait}
													<span class="badge badge-warning badge-sm badge-outline">{trait}</span>
												{/each}
											</div>
										</div>
									</div>
									<p class="text-sm mt-3 p-3 bg-base-300/50 rounded-lg">💡 {sibsinInfo.advice}</p>
								</div>
							{/each}
						</div>
					</div>
				</section>
			{/if}
			
			<!-- 세운 (연간 운세) -->
			{#if $yearlyFortuneResult && $yearlyFortuneResult.length > 0}
				<section class="animate-fade-in-up">
					<div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
						<div class="card-body">
							<h2 class="card-title text-2xl justify-center">
								📅 세운 (歲運) - 연간 운세
							</h2>
							
							<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
								{#each $yearlyFortuneResult as fortune}
									{@const isCurrentYear = fortune.year === currentYear}
									{@const sibsinInfo = getSibsinInfo(fortune.tenGod)}
									<div class="p-4 rounded-xl {isCurrentYear ? 'bg-primary/20 ring-2 ring-primary' : 'bg-base-200'}">
										<div class="flex justify-between items-center mb-2">
											<span class="font-bold text-lg">{fortune.year}년</span>
											{#if isCurrentYear}
												<span class="badge badge-primary">올해</span>
											{/if}
										</div>
										<div class="flex items-center gap-2 mb-2">
											<span class="text-2xl {getElementColorClass(fortune.element)}">{fortune.stem}{fortune.branch}</span>
											<span class="text-xl">{fortune.zodiacEmoji}</span>
										</div>
										<div class="flex items-center gap-2 mb-2">
											<span class="badge badge-ghost">{fortune.tenGod}</span>
											<span class="text-yellow-500">{getRatingStars(fortune.rating)}</span>
										</div>
										<p class="text-sm opacity-80 leading-relaxed mb-2">{getFortuneInterpretation(fortune.tenGod, 'yearly')}</p>
										<div class="flex flex-wrap gap-1 mt-2">
											{#each sibsinInfo.positiveTraits.slice(0, 3) as trait}
												<span class="badge badge-xs badge-success badge-outline">{trait}</span>
											{/each}
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</section>
			{/if}
			
			<!-- 월운 -->
			{#if $monthlyFortuneResult && $monthlyFortuneResult.length > 0}
				<section class="animate-fade-in-up">
					<div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
						<div class="card-body">
							<h2 class="card-title text-2xl justify-center">
								🗓️ {currentYear}년 월운 (月運)
							</h2>
							
							<div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mt-4">
								{#each $monthlyFortuneResult as mf}
									{@const isCurrentMonth = mf.month === new Date().getMonth() + 1}
									<div class="p-2 rounded-lg text-center {isCurrentMonth ? 'bg-primary/30 ring-2 ring-primary' : 'bg-base-200'}">
										<p class="text-xs font-bold">{mf.month}월</p>
										<p class="text-lg font-bold">{mf.stem}{mf.branch}</p>
										<p class="text-xs opacity-70">{mf.tenGod}</p>
										<p class="text-xs text-yellow-500">{getRatingStars(mf.rating)}</p>
									</div>
								{/each}
							</div>
							
							<!-- 이번 달 해설 -->
							{#each $monthlyFortuneResult.filter(mf => mf.month === new Date().getMonth() + 1).slice(0, 1) as currentMf}
								{@const sibsinInfo = getSibsinInfo(currentMf.tenGod)}
								<div class="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/30">
									<div class="flex items-center gap-2 mb-2">
										<span class="badge badge-primary badge-sm">이번 달 ({currentMf.month}월)</span>
										<span class="font-bold">{currentMf.tenGod}</span>
										<span class="text-yellow-500 text-sm">{getRatingStars(currentMf.rating)}</span>
									</div>
									<p class="text-sm leading-relaxed">{getFortuneInterpretation(currentMf.tenGod, 'monthly')}</p>
								</div>
							{/each}
						</div>
					</div>
				</section>
			{/if}
			
			<!-- 오행 분포 -->
			<section class="animate-fade-in-up delay-300">
				<div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
					<div class="card-body">
						<h2 class="card-title text-2xl justify-center">
							🔮 오행(五行) 분포
						</h2>
						
						<div class="grid grid-cols-5 gap-2 md:gap-4 my-6">
							{#each Object.entries($sajuResult.elementCounts) as [element, count]}
								{@const el = element as FiveElement}
								<div class="text-center">
									<div class="radial-progress {getElementColorClass(el)}" 
										style="--value:{count * 12.5}; --size:4rem; --thickness:4px;"
										role="progressbar">
										<span class="text-2xl">{FIVE_ELEMENTS_EMOJI[el]}</span>
									</div>
									<p class="mt-2 font-bold">{FIVE_ELEMENTS_KR[el]}</p>
									<p class="text-sm opacity-70">{count}개</p>
								</div>
							{/each}
						</div>
						
						<div class="divider"></div>
						
						<div class="grid md:grid-cols-2 gap-4">
							<div class="p-4 rounded-lg {getElementBgClass($sajuResult.dominantElement)} border">
								<h3 class="font-bold mb-2">💪 가장 강한 오행</h3>
								<p class="text-lg">
									{FIVE_ELEMENTS_EMOJI[$sajuResult.dominantElement]} {FIVE_ELEMENTS_KR[$sajuResult.dominantElement]}
								</p>
							</div>
							<div class="p-4 rounded-lg {getElementBgClass($sajuResult.weakestElement)} border">
								<h3 class="font-bold mb-2">🌱 보완이 필요한 오행</h3>
								<p class="text-lg">
									{FIVE_ELEMENTS_EMOJI[$sajuResult.weakestElement]} {FIVE_ELEMENTS_KR[$sajuResult.weakestElement]}
								</p>
							</div>
						</div>
						
						<div class="mt-6 p-4 bg-base-200 rounded-lg">
							<p class="leading-relaxed whitespace-pre-line">
								{$elementBalanceInterpretation}
							</p>
						</div>
					</div>
				</div>
			</section>
			
			<!-- 오행 상생상극 -->
			<section class="animate-fade-in-up delay-400">
				<div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
					<div class="card-body">
						<h2 class="card-title text-2xl justify-center">
							⚖️ 오행 상생상극 관계
						</h2>
						
						{#if $sajuResult}
						{@const relations = getElementRelations($sajuResult.dayMaster.element)}
						<div class="overflow-x-auto">
							<table class="table table-zebra">
								<thead>
									<tr>
										<th>관계</th>
										<th>오행</th>
										<th>설명</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>🔄 상생 (나를 생함)</td>
										<td class="{getElementColorClass(relations.generatedBy)}">
											{FIVE_ELEMENTS_EMOJI[relations.generatedBy]} {FIVE_ELEMENTS_KR[relations.generatedBy]}
										</td>
										<td>나를 돕고 지원해주는 기운</td>
									</tr>
									<tr>
										<td>🌱 상생 (내가 생함)</td>
										<td class="{getElementColorClass(relations.generates)}">
											{FIVE_ELEMENTS_EMOJI[relations.generates]} {FIVE_ELEMENTS_KR[relations.generates]}
										</td>
										<td>내가 키우고 발전시키는 기운</td>
									</tr>
									<tr>
										<td>⚔️ 상극 (내가 극함)</td>
										<td class="{getElementColorClass(relations.controls)}">
											{FIVE_ELEMENTS_EMOJI[relations.controls]} {FIVE_ELEMENTS_KR[relations.controls]}
										</td>
										<td>내가 제어하고 통제하는 기운</td>
									</tr>
									<tr>
										<td>🛡️ 상극 (나를 극함)</td>
										<td class="{getElementColorClass(relations.controlledBy)}">
											{FIVE_ELEMENTS_EMOJI[relations.controlledBy]} {FIVE_ELEMENTS_KR[relations.controlledBy]}
										</td>
										<td>나를 제어하고 도전하는 기운</td>
									</tr>
								</tbody>
							</table>
						</div>
						{/if}
					</div>
				</div>
			</section>
			
			<!-- 띠 궁합 -->
			<section class="animate-fade-in-up">
				<div class="card bg-base-100/80 backdrop-blur-sm shadow-xl">
					<div class="card-body">
						<h2 class="card-title text-2xl justify-center">
							{$sajuResult.year.zodiacEmoji} 띠 궁합
						</h2>
						<p class="text-center opacity-70 mb-4">
							{$sajuResult.year.zodiac}띠 ({$sajuResult.year.branch})
						</p>
						
						{#if $sajuResult}
						{@const compatibility = getZodiacCompatibility($sajuResult.year.branch)}
						<div class="grid md:grid-cols-3 gap-4">
							<div class="p-4 bg-success/20 rounded-lg border border-success/50">
								<h3 class="font-bold text-success mb-2">💕 최고의 궁합</h3>
								<div class="flex flex-wrap gap-2">
									{#each compatibility.best as branch}
										{@const idx = EARTHLY_BRANCHES.indexOf(branch as typeof EARTHLY_BRANCHES[number])}
										<span class="badge badge-lg">{ZODIAC_EMOJI[idx]} {ZODIAC_ANIMALS[idx]}</span>
									{/each}
								</div>
							</div>
							<div class="p-4 bg-info/20 rounded-lg border border-info/50">
								<h3 class="font-bold text-info mb-2">👍 좋은 궁합</h3>
								<div class="flex flex-wrap gap-2">
									{#each compatibility.good as branch}
										{@const idx = EARTHLY_BRANCHES.indexOf(branch as typeof EARTHLY_BRANCHES[number])}
										<span class="badge badge-lg">{ZODIAC_EMOJI[idx]} {ZODIAC_ANIMALS[idx]}</span>
									{/each}
								</div>
							</div>
							<div class="p-4 bg-warning/20 rounded-lg border border-warning/50">
								<h3 class="font-bold text-warning mb-2">⚠️ 주의할 궁합</h3>
								<div class="flex flex-wrap gap-2">
									{#each compatibility.bad as branch}
										{@const idx = EARTHLY_BRANCHES.indexOf(branch as typeof EARTHLY_BRANCHES[number])}
										<span class="badge badge-lg">{ZODIAC_EMOJI[idx]} {ZODIAC_ANIMALS[idx]}</span>
									{/each}
								</div>
							</div>
						</div>
						{/if}
					</div>
				</div>
			</section>
		</div>
	{/if}
</div>
