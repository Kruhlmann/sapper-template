<script lang="typescript">
    export let count: number = 0;

    function add(): void {
        count++;
    }

    function subtract(): void {
        count--;
    }
</script>

<p>The current count inside Counter.svelte is {count}</p>
<button on:click="{add}">Add</button>
<button on:click="{subtract}">Subtract</button>

<style>

</style>
