<template>
    <div class="main-container" :class="bgClass">
        <vHeader class="vHeader" @callback="callback_header"></vHeader>
        <transition name="fade"><router-view class="router-view" /></transition>

        <img src="./img/mian-bg-0.png" alt="" style="display: none" />
        <img src="./img/mian-bg-1.png" alt="" style="display: none" />
        <img src="./img/mian-bg-2.png" alt="" style="display: none" />
        <img src="./img/mian-bg-3.png" alt="" style="display: none" />
    </div>
</template>

<script>
    import vHeader from './header/header';
    export default {
        name: 'bikeMain',
        components: {vHeader},
        data() {
            return {
                bgIdx: 1
            };
        },
        computed: {
            bgClass() {
                return 'bg-' + this.bgIdx;
            }
        },
        methods: {
            callback_header() {
                this.bgIdx = this.bgIdx >=3 ? 0 : ++this.bgIdx;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-container {
        position: relative;
        height: 100%;
        background: url(./img/mian-bg-0.png) no-repeat top center;
        &::before {
            position:absolute;
            display: block;
            content: " ";
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url(./img/mian-bg-1.png) no-repeat top center;
            opacity: 0.3;
        }

        &.bg-0 {
            background-image: url(./img/mian-bg-0.png);
        }
        &.bg-1 {
            background-image: url(./img/mian-bg-1.png);
        }
        &.bg-2 {
            background-image: url(./img/mian-bg-2.png);
        }
        &.bg-3 {
            background-image: url(./img/mian-bg-3.png);
        }

        .vHeader {
            position: absolute;
            top: 0;
            width: 100%;
            z-index: 10;
        }
        .router-view {
            padding-top: 75px;
        }
    }
</style>