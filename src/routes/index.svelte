<script lang="typescript">
    import Counter from "../components/Counter.svelte";

    let count = 5;
</script>

<main>
    <h1>Count outside is {count}!</h1>
    <Counter count="{count}" />
</main>

<style>
    main {
        text-align: center;
        width: 100%;
        margin: 0 auto;
    }
</style>
