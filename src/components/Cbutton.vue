<template>
    <div class="Cbutton">
        <button :disabled="disabled">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    props: ['disabled'],
}
</script>

<style lang="scss">
.Cbutton {
    > button {
        border-radius: 5px;
        border: none;
        padding: 10px 20px;
        width: 100%;
        color: #fff;
        background: var(--pink);
        transition: all 300ms;
        outline: var(--pink);
        &:hover{
            opacity: 0.8;
        }
    }
}
</style>
