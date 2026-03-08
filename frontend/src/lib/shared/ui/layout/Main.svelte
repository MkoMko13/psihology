<script>
  const { children = () => null } = $props();
</script>

<main class="pt-[96px]">
  {@render children()}
</main>
