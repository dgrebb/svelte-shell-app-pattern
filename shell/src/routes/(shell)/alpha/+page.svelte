<script lang="ts">
  import LazyFeature from '$lib/LazyFeature.svelte';
  let { data } = $props();
</script>

<LazyFeature appId={data.appId} />
