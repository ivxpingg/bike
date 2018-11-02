<template>
    <div class="numAnalyze_complaint-container">
        <div class="num-panel" @click="modal_complaintList_open">
            <div class="title">总 投 诉 量</div>
            <div class="value">1023</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel">
            <div class="title">已 处 理 投 诉</div>
            <div class="value">689</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel">
            <div class="title">平 均 响 应 时 间</div>
            <div class="value">2小时</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel">
            <div class="title">平 均 处 理 时 间</div>
            <div class="value">3小时</div>
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
            return {};
        },
        methods: {
            modal_complaintList_open() {
                this.$refs.complaintList.modalValue = true;
            }
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