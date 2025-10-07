<script>
	let {
		variant = 'info',
		class: className,
		children
	} = $props();
	
	const variantClasses = {
		info: 'preset-filled-primary-200-800 divide-primary-300-700',
		success: 'preset-filled-success-200-800 divide-success-300-700',
		warning: 'preset-filled-warning-200-800 divide-warning-300-700',
		error: 'preset-filled-error-200-800 divide-error-300-700'
	};
</script>

<div class={['overflow-hidden card divide-y', variantClasses[variant], className]} data-variant={variant}>
	{@render children()}
</div>
