# Contributing Guidelines

Thank you for contributing to this project! Please follow these guidelines to maintain code quality and consistency.

---

## Code Quality Standards

### Modern Syntax Only

- **Use the latest language features** available in the project's runtime environment
- Prefer modern async/await over callbacks or promise chains
- Use optional chaining (`?.`), nullish coalescing (`??`), and destructuring
- Leverage ES6+ features: arrow functions, template literals, spread operators

### For Svelte Projects

- **Svelte 5 Runes Syntax ONLY** - Legacy Svelte 4 patterns are not allowed
  - **USE:** `$state`, `$derived`, `$effect`, `$props`
  - **FORBIDDEN:** `let` (for reactive values), `$:`, `onMount`, `beforeUpdate`, `afterUpdate`, `onDestroy`

- **Lifecycle Migration**
  - **USE:** `$effect()` instead of `onMount()` (runs after DOM updates)
  - **USE:** `$effect.pre()` for rare cases needing pre-DOM-update logic (e.g., autoscroll)
  - **USE:** cleanup function return instead of `onDestroy()`
  - **USE:** `$derived` instead of reactive declarations (`$:`)
  - **USE:** `$state` for reactive variables instead of `let`

- **Prefer Runes Over Stores** - Use `$state` and `$derived` instead of `writable` and `derived`
  - **USE:** `let count = $state(0)` for component state
  - **AVOID:** `const count = writable(0)` unless needed for:
    - External event sources (WebSocket, Firebase)
    - Third-party library integration
    - Observable pattern requirements
  - When using stores, prefer `$state` wrappers over auto-subscription

- **Event Handlers** - Use properties instead of `on:` directive
  - **USE:** `<button onclick={handler}>` instead of `<button on:click={handler}>`
  - **USE:** `{onclick}` shorthand when passing callback props
  - **AVOID:** `createEventDispatcher()` - use callback props instead
  - **AVOID:** Event modifiers (`on:click|once|preventDefault`) - implement manually or use wrappers
  - Note: `capture` modifier becomes `onclickcapture={...}`

- **Slots → Snippets** - Use snippets instead of slots
  - **USE:** `{@render children?.()}` instead of `<slot />`
  - **USE:** `{@render header()}` instead of `<slot name="header" />`
  - **USE:** `{#snippet item(data)}<div>{/snippet}` instead of `<div slot="item" let:data>`
  - Slots still work for backwards compatibility but snippets are more powerful

- **Class Directives (Svelte 5.16+)** - Prefer `class` attribute over `class:` directive
  - **USE:** `<div class={{ active, disabled }}>` (object form)
  - **USE:** `<div class={[condition && 'tw-class-1 tw-class-2']}>` (array form)
  - **DISCOURAGED:** `<div class:active={active}>` (still works but less powerful)
  - Better composability with Tailwind CSS and props spreading

- **Component Instantiation** - Use functions instead of `new Component()`
  - **USE:** `mount(Component, {...})` instead of `new Component({...})`
  - **USE:** `unmount(component)` instead of `component.$destroy()`
  - **USE:** `render(Component, {...})` (SSR) instead of `Component.render({...})`
  - Component types: Use `Component<Props>` instead of `SvelteComponent<Props>`

### Svelte 5 Deprecated APIs - Complete List

**Reactivity:**

- **DEPRECATED:** `let count = 0` (reactive) → **USE:** `let count = $state(0)`
- **DEPRECATED:** `$: doubled = count * 2` → **USE:** `let doubled = $derived(count * 2)`
- **DEPRECATED:** `$: { sideEffect() }` → **USE:** `$effect(() => { sideEffect() })`
- **DEPRECATED:** `export let prop` → **USE:** `let { prop } = $props()`
- **DEPRECATED:** `export { klass as class }` → **USE:** `let { class: klass } = $props()`
- **DEPRECATED:** `$$restProps` → **USE:** `let { foo, ...rest } = $props()`
- **DEPRECATED:** `$$props` → **USE:** `let props = $props()`

**Lifecycle:**

- **DEPRECATED:** `onMount(() => {})` → **USE:** `$effect(() => {})`
- **DEPRECATED:** `onDestroy(() => {})` → **USE:** `$effect(() => { return () => {} })`
- **DEPRECATED:** `beforeUpdate(() => {})` → **USE:** `$effect.pre(() => {})`
- **DEPRECATED:** `afterUpdate(() => {})` → **USE:** `$effect(() => {})`
- **DEPRECATED:** `tick()` → **USE:** `await flushSync()` (from `svelte`)

**Events:**

- **DEPRECATED:** `createEventDispatcher()` → **USE:** Callback props
- **DEPRECATED:** `<Component on:event={handler} />` → **USE:** `<Component onevent={handler} />`
- **DEPRECATED:** `on:click|once` → **USE:** Manual implementation or wrapper function
- **DEPRECATED:** `on:click|preventDefault` → **USE:** `e.preventDefault()` inside handler
- **DEPRECATED:** `on:click|stopPropagation` → **USE:** `e.stopPropagation()` inside handler
- **DEPRECATED:** `on:clickcapture` → **USE:** `onclickcapture` (property)

**Slots:**

- **DEPRECATED:** `<slot />` → **USE:** `{@render children?.()}`
- **DEPRECATED:** `<slot name="header" />` → **USE:** `{@render header()}`
- **DEPRECATED:** `<slot prop={value} />` → **USE:** `{@render children?.(value)}`
- **DEPRECATED:** `<div slot="item" let:data>` → **USE:** `{#snippet item(data)}<div>{/snippet}`

**Class Directives (5.16+):**

- **DISCOURAGED:** `class:active={condition}` → **USE:** `class={{ active: condition }}`
- **DISCOURAGED:** `class:active` → **USE:** `class={{ active }}`

**Component API:**

- **DEPRECATED:** `new Component({target, props})` → **USE:** `mount(Component, {target, props})`
- **DEPRECATED:** `component.$set({prop})` → **USE:** `$state()` rune (automatic reactivity)
- **DEPRECATED:** `component.$on('event', handler)` → **USE:** Pass callback props
- **DEPRECATED:** `component.$destroy()` → **USE:** `unmount(component)`
- **DEPRECATED:** `Component.render(props)` (SSR) → **USE:** `render(Component, {props})`

**TypeScript:**

- **DEPRECATED:** `SvelteComponent<Props>` → **USE:** `Component<Props>`
- **DEPRECATED:** `SvelteComponentTyped<Props>` → **USE:** `Component<Props>`

**Context:**

- **STILL VALID:** `setContext()` and `getContext()` still work the same
- Consider using props or state management libraries for complex cases

**Stores:**

- **STILL VALID:** Stores still work but prefer runes for component state
- **DEPRECATED:** Auto-subscription (`$store`) inside `.svelte.js` modules → **USE:** Manual `store.subscribe()`
- Use stores only when necessary (external sources, observables, third-party integration)

### No Legacy Code

- Remove deprecated APIs, libraries, and patterns immediately
- Update dependencies regularly to avoid security vulnerabilities
- Refactor code using outdated patterns during routine maintenance
- Document migration paths when deprecating internal APIs

### No Duplicate Code (DRY Principle)

- Extract repeated logic into reusable functions or components
- Use composition over repetition
- Consolidate similar utilities into a single, well-documented function
- If code appears in 3+ places, it belongs in a shared module

---

## Skeleton UI Design System

This project uses **Skeleton UI v3** with the **Catppuccin** theme. Follow these guidelines for consistent styling.

### Theme System

Apply themes using the `data-theme` attribute. Themes use CSS custom properties (`--color-*`, `--text-*`, `--rounded-*`).

**This project uses:** `catppuccin` theme (cozy, pastel colors)

**Other available themes:** `cerberus`, `mona`, `vox`

**Custom themes:** Use [Skeleton Theme Generator](https://next.skeleton.dev/tools/theme-generator)

### Color Palette

**7 Semantic Colors** (each with 11 shades: 50-950):

- `primary` - Main brand color
- `secondary` - Supporting brand color
- `tertiary` - Accent color
- `success` - Positive actions/states (green)
- `warning` - Cautionary actions/states (yellow)
- `error` - Error states (red)
- `surface` - Backgrounds and surfaces (neutral)

**Color Pairings (Light/Dark automatic):**

Use pairings for automatic light/dark mode support:

- `bg-primary-300-700` - Light mode: 300, Dark mode: 700
- `text-surface-950-50` - Light mode: 950 (dark text), Dark mode: 50 (light text)
- `bg-surface-50-950` - Light mode: 50 (light bg), Dark mode: 950 (dark bg)

**Contrast Colors (Accessibility):**

- `text-on-primary-500` - Ensures readable contrast on `bg-primary-500`
- `text-on-secondary-500` - Ensures readable contrast on `bg-secondary-500`
- Use for WCAG AA compliance (4.5:1 contrast ratio)

**Transparency:** Add `/50` for 50% opacity (e.g., `bg-primary-500/50`)

### Preset Patterns

Presets provide consistent component styling:

**Filled:** `preset-filled-primary-500`, `preset-filled-success-500`

**Tonal:** `preset-tonal-secondary`, `preset-tonal-tertiary`

**Outlined:** `preset-outlined-error-500`, `preset-outlined-warning-500`

**Special:**

- `preset-glass` - Frosted glass effect with backdrop-filter
- `preset-gradient-primary-secondary` - Gradient backgrounds
- `preset-valid`, `preset-invalid` - Form validation states

### Typography

**Semantic Classes:**

- Headings: `.h1`, `.h2`, `.h3`, `.h4`, `.h5`, `.h6`
- Utilities: `.anchor`, `.code`, `.kbd`, `.blockquote`

**Typographic Presets:**

- Display: `preset-typo-display-1`, `preset-typo-display-2`
- Body: `preset-typo-body-sm`, `preset-typo-body-base`, `preset-typo-body-lg`
- Labels: `preset-typo-label-sm`, `preset-typo-label-base`

**Responsive Typography:**

Adjust global scale with `--text-scaling` CSS variable (default: 1)

### UI Components

**Buttons:** `.btn`, `.btn-icon`, `.btn-group`, sizes: `.btn-sm`, `.btn-base`, `.btn-lg`

**Badges:** `.badge`, `.badge-icon` (non-interactive, for status indicators)

**Cards:** `.card`, `.card-hover`, `.card-header`, `.card-body`, `.card-footer`

**Chips:** `.chip`, `.chip-icon` (interactive, for selections/filters)

**Forms:** Requires `@tailwindcss/forms` plugin

- Elements: `.label`, `.label-text`, `.input`, `.select`, `.checkbox`, `.radio`, `.progress`
- Input Groups: `.input-group`, `.ig-cell`, `.ig-input`, `.ig-select`, `.ig-btn`

**Tables:** `.table-wrap`, `.table`, `.caption-bottom`, hover rows: `[&>tr]:hover:preset-tonal-primary`

**Dividers:** `.hr` (horizontal), `.vr` (vertical)

**Placeholders:** `.placeholder`, `.placeholder-circle`, add `animate-pulse` for loading state

### Dark Mode

**Strategies:**

1. **Media** (default) - Follows OS settings automatically
2. **Selector** - Manual toggle with `.dark` class on `<html>`
3. **Data Attribute** - Manual toggle with `data-mode="dark"` on `<html>`

**Dark Variant:** `dark:bg-black`, `dark:text-white`

**Color Scheme (Scoped):** `.scheme-light`, `.scheme-dark`

### Best Practices

1. **Consistent Presets** - Use `preset-filled` for primary, `preset-tonal` for secondary, `preset-outlined` for tertiary
2. **Color Pairings** - Prefer `bg-primary-300-700` over `bg-primary-300 dark:bg-primary-700`
3. **Semantic Colors** - Use `success`/`warning`/`error` instead of `green`/`yellow`/`red`
4. **Accessibility** - Use contrast colors (`text-on-primary-500`), test WCAG AA compliance
5. **Forms** - Use validation presets (`preset-valid`, `preset-invalid`), pair labels with inputs
6. **Typography** - Leverage `--text-scaling` for responsive fonts, use semantic presets

---

## Migration Examples

### Example 1: Counter with Lifecycle

**Before (Svelte 4):**

```svelte
<script>
	import { onMount, onDestroy } from 'svelte';

	let count = 0;
	$: doubled = count * 2;

	onMount(() => {
		console.log('mounted');
		const interval = setInterval(() => count++, 1000);

		onDestroy(() => clearInterval(interval));
	});
</script>

<p>{count} × 2 = {doubled}</p>
```

**After (Svelte 5):**

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);

	$effect(() => {
		console.log('mounted - runs after DOM updates');
		const interval = setInterval(() => count++, 1000);

		// Cleanup function (replaces onDestroy)
		return () => clearInterval(interval);
	});
</script>

<p>{count} × 2 = {doubled}</p>
```

### Example 2: Props and Events

**Before (Svelte 4):**

```svelte
<script>
	import { createEventDispatcher } from 'svelte';

	export let name = 'World';
	export let count = 0;

	const dispatch = createEventDispatcher();

	function handleClick() {
		count++;
		dispatch('change', { count });
	}
</script>

<button on:click={handleClick}>
	Hello {name}! Clicked {count} times
</button>
```

**After (Svelte 5):**

```svelte
<script>
	let { name = 'World', count = $bindable(0), onchange } = $props();

	function handleClick() {
		count++;
		onchange?.({ count });
	}
</script>

<button onclick={handleClick}>
	Hello {name}! Clicked {count} times
</button>
```

### Example 3: Slots to Snippets

**Before (Svelte 4):**

```svelte
<!-- Parent.svelte -->
<script>
	export let items = [];
</script>

<div class="list">
	{#each items as item}
		<slot name="item" {item} />
	{/each}
</div>

<!-- Usage -->
<Parent {items}>
	<div slot="item" let:item>{item.name}</div>
</Parent>
```

**After (Svelte 5):**

```svelte
<!-- Parent.svelte -->
<script>
	let { items, itemSnippet } = $props();
</script>

<div class="list">
	{#each items as item}
		{@render itemSnippet(item)}
	{/each}
</div>

<!-- Usage -->
<Parent {items}>
	{#snippet itemSnippet(item)}
		<div>{item.name}</div>
	{/snippet}
</Parent>
```

### Example 4: Class Directives

**Before (Svelte 4 & early 5):**

```svelte
<script>
	export let active = false;
	export let disabled = false;
</script>

<button class="btn" class:active class:disabled>Button</button>
```

**After (Svelte 5.16+):**

```svelte
<script>
  let { active = false, disabled = false } = $props();
</script>

<button class="btn" class={{ active, disabled }}>Button</button>

<!-- Or with Tailwind CSS -->
<button class={['btn', active && 'bg-blue-500', disabled && 'opacity-50']}>
  Button
</button>
```

### Example 5: Stores to Runes

**Before (Svelte 4):**

```svelte
<script>
	import { writable, derived } from 'svelte/store';

	const count = writable(0);
	const doubled = derived(count, ($count) => $count * 2);

	function increment() {
		count.update((n) => n + 1);
	}
</script>

<p>{$count} × 2 = {$doubled}</p>
<button on:click={increment}>Increment</button>
```

**After (Svelte 5):**

```svelte
<script>
	let count = $state(0);
	let doubled = $derived(count * 2);

	function increment() {
		count++;
	}
</script>

<p>{count} × 2 = {doubled}</p>
<button onclick={increment}>Increment</button>
```

---

## Resources

### Svelte 5 Documentation

- [Svelte 5 Official Documentation](https://svelte.dev/docs/svelte)
- [Svelte 5 Runes Documentation](https://svelte.dev/docs/svelte/what-are-runes)
- [Svelte 5 Migration Guide](https://svelte.dev/docs/svelte/v5-migration-guide)
- [$state Rune](https://svelte.dev/docs/svelte/$state)
- [$derived Rune](https://svelte.dev/docs/svelte/$derived)
- [$effect Rune](https://svelte.dev/docs/svelte/$effect)
- [$props Rune](https://svelte.dev/docs/svelte/$props)
- [Class Attribute (5.16+)](https://svelte.dev/docs/svelte/class)
- [Snippets](https://svelte.dev/docs/svelte/snippet)

### Skeleton UI Documentation

- [Skeleton UI v3 Documentation](https://next.skeleton.dev/docs)
- [Theme System](https://next.skeleton.dev/docs/design/themes)
- [Color Palette](https://next.skeleton.dev/docs/design/colors)
- [Presets](https://next.skeleton.dev/docs/design/presets)
- [Typography](https://next.skeleton.dev/docs/design/typography)
- [Components](https://next.skeleton.dev/docs/tailwind)
- [Dark Mode Guide](https://next.skeleton.dev/docs/guides/mode)
- [Theme Generator](https://next.skeleton.dev/tools/theme-generator)

### Code Quality

- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)
- [DRY Principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

### Project-Specific Documentation

- See `AGENTS.md` for AI-assisted development guidelines
- See `CLAUDE.md` for architecture and technical details
- See `README.md` for project overview and setup

---

## Questions?

If you have questions about these guidelines or need clarification:

1. Check existing issues and PRs for examples
2. Open a discussion in the repository
3. Ask in PR comments during review

Thank you for helping maintain high code quality! 🎉
