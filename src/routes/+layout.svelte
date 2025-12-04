<script lang="ts">
	import '../app.css';
	import { currentTheme } from '$lib/stores';
	
	let { children } = $props();
	
	const themes = ['dracula', 'cupcake', 'synthwave', 'night'];
	
	function cycleTheme() {
		currentTheme.update(t => {
			const idx = themes.indexOf(t);
			return themes[(idx + 1) % themes.length];
		});
	}
</script>

<svelte:head>
	<title>사주팔자 - 四柱八字</title>
	<meta name="description" content="생년월일시로 알아보는 나의 사주팔자" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&family=Gowun+Batang:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<div data-theme={$currentTheme} class="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-300">
	<!-- 배경 장식 -->
	<div class="fixed inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-20 left-10 text-9xl opacity-5 rotate-12">☯</div>
		<div class="absolute bottom-20 right-10 text-9xl opacity-5 -rotate-12">卦</div>
		<div class="absolute top-1/2 left-1/4 text-7xl opacity-5">陰</div>
		<div class="absolute top-1/3 right-1/4 text-7xl opacity-5">陽</div>
	</div>
	
	<!-- 테마 토글 버튼 -->
	<button 
		onclick={cycleTheme}
		class="fixed top-4 right-4 btn btn-circle btn-ghost z-50"
		aria-label="테마 변경"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
		</svg>
	</button>
	
	<main class="relative z-10">
		{@render children()}
	</main>
	
	<!-- 푸터 -->
	<footer class="footer footer-center p-6 text-base-content relative z-10">
		<aside>
			<p class="opacity-60">
				☯ 사주팔자는 참고용이며, 개인의 노력과 선택이 가장 중요합니다 ☯
			</p>
		</aside>
	</footer>
</div>
