<template>
    <div class="bInfo-container">
        <!--<div class="text-panel text-bg-1">正在使用：4587</div>-->
        <!--<div class="text-panel text-bg-2">正常停放：89719</div>-->
        <!--<div class="text-panel text-bg-3">故障车辆：200</div>-->
        <!--<div class="text-panel text-bg-4">违规停放：3210</div>-->
        <template v-for="(item, idx) in count">
            <div class="text-panel" :class="`text-bg-${idx}`">
                {{item.status}}：{{item.count}}</div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'bInfo',
        data() {
            return {
                count: []

            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/bicycleInfo/bicycleCountByStatus'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        if (res.data) {
                            this.count = res.data.filter(v => v.status !== '未知');
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bInfo-container {
        min-width: 150px;

        .text-panel{
            margin-bottom: 6px;
            padding: 2px 4px;
            color: #FFF;
            font-size: 12px;
            line-height: 20px;

            &.text-bg-0 {
                background:linear-gradient(to right,rgba(12,193,200,1), rgba(255,255,255,0.1));
            }
            &.text-bg-1 {
                background:linear-gradient(to right,rgba(11,169,80,1), rgba(255,255,255,0.1));
            }
            &.text-bg-2 {
                background:linear-gradient(to right,rgba(255,51,0,1), rgba(255,255,255,0.1));
            }
            &.text-bg-3 {
                background:linear-gradient(to right,rgba(187,23,63,1), rgba(255,255,255,0.1));
            }
        }
    }
</style>