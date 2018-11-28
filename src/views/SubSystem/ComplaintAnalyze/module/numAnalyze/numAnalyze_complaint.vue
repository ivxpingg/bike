<template>
    <div class="numAnalyze_complaint-container">
        <div class="num-panel" @click="modal_complaintList_open">
            <div class="title">总 投 诉 量</div>
            <div class="value">{{numPanel.count}}</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel">
            <div class="title">已 处 理 投 诉</div>
            <div class="value">{{numPanel.disposedCount}}</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel">
            <div class="title">投诉处理率</div>
            <div class="value">{{numPanel.disponsedRate}}%</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel">
            <div class="title">平均处理时间</div>
            <div class="value">{{numPanel.disposedTime}}天</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <vComplaintList ref="complaintList"></vComplaintList>
    </div>
</template>

<script>
    import vComplaintList from './module/complaintList';
    export default {
        name: 'numAnalyze_complaint',   //
        components: {vComplaintList},
        data() {
            return {
                numPanel: {
                    count: 0,  // 投诉总数
                    disposedCount: 0,
                    disponsedRate: 0,
                    disposedTime: 0
                }
            };
        },
        mounted() {
            this.getCount();
            this.getDisposedCount();
            this.getDisponsedRate();
            this.getDisposedTime();
        },
        methods: {
            modal_complaintList_open() {
                this.$refs.complaintList.modalValue = true;
            },

            // 投诉总数
            getCount() {
                this.$http({
                    methods: 'get',
                    url: '/violation/count'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.numPanel.count = res.data || 0;
                    }
                })
            },
            // 已处理投诉
            getDisposedCount() {
                this.$http({
                    methods: 'get',
                    url: '/violation/disposedCount'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.numPanel.disposedCount = res.data || 0;
                    }
                })
            },

            // 投诉处理率
            getDisponsedRate() {
                this.$http({
                    methods: 'get',
                    url: '/violation/disponsedRate'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.numPanel.disponsedRate = res.data || 0;
                    }
                })
            },

            // 平均处理时间
            getDisposedTime() {
                this.$http({
                    methods: 'get',
                    url: '/violation/disposedTime'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.numPanel.disposedTime = res.data ? res.data.toFixed(2) : 0;
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .numAnalyze_complaint-container {
        position: relative;
        display: flex;
        height: 80px;
        .num-panel {
            position: relative;
            padding-top: 20px;
            flex: 1;
            margin-right: 12px;
            background-color: rgba(0,53,103, 0.2);

            &:first-child{
                cursor: pointer;
            }

            &:last-child{
                margin: 0;
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