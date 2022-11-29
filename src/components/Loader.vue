<template>
	<div class="loader">
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
	</div>
</template>
<style scoped>

.loader {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	--delay: -0.24s;
}
.loader .line {
	display: block;
	width: 1rem;
	height: 3rem;
	background: var(--light-blue);
	animation: loading calc(var(--delay) * -5) ease-in-out infinite;
	&:not(:last-child) {
		margin-right: 1rem;
	}
	&:nth-child(1) {
		animation-delay: var(--delay);
	}
	&:nth-child(2) {
		animation-delay: calc(var(--delay)/ 2);
	}
	&:nth-child(3) {
		animation-delay: 0;
	}
}
@keyframes loading {
	0% {
		transform: scaleY(2.5);
		background-color: rgba(0, 0, 0, 0.5);
	}
	50%, 100% {
		transform: scaleY(1);
	}
}

</style>