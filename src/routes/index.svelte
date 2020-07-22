<script lang="ts">
    import Counter from "../components/Counter.svelte";
    let value = 14;
    const initial_value = value;
</script>

<Counter bind:count="{value}" />

<p>My counter is at {value}</p>
<p>It started at {initial_value}</p>

<style>

</style>
