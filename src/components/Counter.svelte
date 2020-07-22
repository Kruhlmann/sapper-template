<script lang="ts">
    export let count = 0;

    function add(): void {
        count++;
    }

    function subtract(): void {
        count--;
    }
</script>

<template lang="pug">
    p {count} button(on:click="{add}") Add button(on:click="{subtract}")
    Subtract
</template>
