<template>
    <div class="ComplaintAnalyze-container">
        <Row :gutter="10" class="row-panel">
            <i-col span="6">
                <vSxcBox class="box" title="地区占比">
                    <vEchartAnalyze_complaint_0></vEchartAnalyze_complaint_0>
                </vSxcBox>
                <vSxcBox class="box" title="投诉类型分析">
                    <vEchartAnalyze_complaint_1></vEchartAnalyze_complaint_1>
                </vSxcBox>
            </i-col>
            <i-col span="12">
                <vNumAnalyze_complaint class="vNumAnalyze"></vNumAnalyze_complaint>
                <div class="map-box">
                    <vComplaintMap class="vMap"></vComplaintMap>
                    <div class="square square-1"></div>
                    <div class="square square-2"></div>
                    <div class="square square-3"></div>
                    <div class="square square-4"></div>
                </div>
            </i-col>
            <i-col span="6">
                <vSxcBox class="box" title="投诉趋势分析">
                    <vEchartAnalyze_complaint_2></vEchartAnalyze_complaint_2>
                </vSxcBox>
                <vSxcBox class="box" title="舆情信息">
                    <vEchartAnalyze_complaint_3></vEchartAnalyze_complaint_3>
                </vSxcBox>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import vSxcBox from '../../../components/sxcBox/sxcBox';
    import vEchartAnalyze_complaint_0 from './echart/echartAnalyze_complaint_0';
    import vEchartAnalyze_complaint_1 from './echart/echartAnalyze_complaint_1';
    import vEchartAnalyze_complaint_2 from './echart/echartAnalyze_complaint_2';
    import vEchartAnalyze_complaint_3 from './echart/echartAnalyze_complaint_3';
    import vNumAnalyze_complaint from './module/numAnalyze/numAnalyze_complaint';
    import vComplaintMap from './module/map/complaintMap';
    export default {
        name: 'ComplaintAnalyze',  // 投诉统计分析
        components: {
            vSxcBox,
            vEchartAnalyze_complaint_0,
            vEchartAnalyze_complaint_1,
            vEchartAnalyze_complaint_2,
            vEchartAnalyze_complaint_3,
            vNumAnalyze_complaint,
            vComplaintMap
        },
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .ComplaintAnalyze-container {
        height: 600px;
        padding: 20px 50px;

        .vNumAnalyze {
            margin-top: 20px;
        }
        .map-box {
            margin-top: 20px;
            height: 480px;
            position: relative;
            border: 1px solid rgb(0,198,255);
            .square {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: rgb(0,198,255);
                z-index: 1;

                &.square-1 { top: -5px; left: -5px; }
                &.square-2 { top: -5px; right: -5px;}
                &.square-3 { bottom: -5px; right: -5px;}
                &.square-4 { bottom: -5px; left: -5px;}
            }
            .vMap {
                height: 100%;
            }
        }

        .row-panel {
            height: 750px;
        }
        .box {
            height: 300px;
        }
    }
</style>