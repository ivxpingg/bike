<template>
    <div class="sxcBox-container">
        <div class="sxc-box-title">{{title}}</div>
        <div class="sxc-box-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sxcBox',
        props: {
          title: {
              type: String,
              default: '标题'
          }
        },
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .sxcBox-container {
        .sxc-box-title {
            padding: 0px 2px 10px;
            height: 38px;
            background: url(./img/box-title-bg.png) no-repeat left bottom;
            background-size: 100% auto;
            background-origin: content-box;
            color: #FFF;
            font-size: 14px;
            line-height: 30px;
        }

        .sxc-box-body {
            height: calc(100% - 38px);
            background-color: rgba(3,88,113,0.2);
        }
    }
</style>