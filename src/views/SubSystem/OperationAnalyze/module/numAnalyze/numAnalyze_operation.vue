<template>
    <div class="numAnalyze_operation-container">
        <div class="num-panel">
            <div class="title">日营运单车数量</div>
            <div class="value">{{bikeCount}}</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel" @click="modal_operationStatistics_open">
            <div class="title">日 营 运 里 程</div>
            <div class="value">{{dailyMileage}}km</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel" @click="modal_operationStatistics_open">
            <div class="title">总 营 运 次 数</div>
            <div class="value">{{countOperate}}</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel" @click="modal_bikeStatistics_open">
            <div class="title">单 车 使 用 率</div>
            <div class="value">{{bikeUseRatio}}</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>

        <vOperationStatistics ref="operationStatistics"></vOperationStatistics>
        <vBikeStatistics ref="bikeStatistics"></vBikeStatistics>
    </div>
</template>

<script>
    import vOperationStatistics from './module/operationStatistics';
    import vBikeStatistics from './module/bikeStatistics';
    export default {
        name: 'numAnalyze_operation',
        components: {vOperationStatistics, vBikeStatistics},
        data() {
            return {
                bikeCount: 0,
                dailyMileage: 0,
                countOperate: 0,
                bikeUseRatio: 0
            };
        },
        mounted() {
            this.getData_bikeCount();
            this.getData_dailyMileage();
            this.getData_countOperate();
            this.getData_bikeUseRatio();
        },
        methods: {
            modal_operationStatistics_open() {
                this.$refs.operationStatistics.modalValue = true;
            },
            modal_bikeStatistics_open() {
                this.$refs.bikeStatistics.modalValue = true;
            },

            getData_bikeCount() {
                this.$http({
                    method: 'get',
                    url: '/bikeStatus/countOperateBike'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.bikeCount = res.data || 0;
                    }
                });
            },
            getData_dailyMileage() {
                this.$http({
                    method: 'get',
                    url: '/bikeStatus/dailyMileage'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.dailyMileage = parseInt(res.data) || 0;
                    }
                });
            },
            getData_countOperate() {
                this.$http({
                    method: 'get',
                    url: '/bikeStatus/countOperate'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.countOperate = res.data || 0;
                    }
                });
            },
            getData_bikeUseRatio() {
                this.$http({
                    method: 'get',
                    url: '/bikeStatus/bikeUseRatio'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.bikeUseRatio = res.data || 0;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .numAnalyze_operation-container {
        position: relative;
        display: flex;
        height: 80px;
        .num-panel {
            position: relative;
            padding-top: 20px;
            flex: 1;
            margin-right: 12px;
            background-color: rgba(0,53,103, 0.2);
            cursor: pointer;

            &:last-child{
                margin: 0;
                cursor: default;
            }
            .angle {
                position: absolute;
                height: 12px;
                width: 12px;
                z-index: 1;
                &.angle-1 { top: 0; left: 0; background: url(img/angle1.png) no-repeat center; }
                &.angle-2 { top: 0; right: 0; background: url(img/angle2.png) no-repeat center;}
                &.angle-3 { bottom: 0; right: 0; background: url(img/angle3.png) no-repeat center;}
                &.angle-4 { bottom: 0; left: 0; background: url(img/angle4.png) no-repeat center;}
            }

            .title {
                color: #fff;
                font-size: 16px;
                line-height: 20px;
                text-align: center;
                font-weight: 700;
                letter-spacing: 2px;
            }
            .value {
                color: rgb(25,158,216);
                font-size: 20px;
                line-height: 30px;
                text-align: center;
                font-weight: 700;
                letter-spacing: 2px;
            }
        }
    }
</style>