<template>
    <div class="OperationAnalyze-container">
        <Row :gutter="10" class="row-panel">
            <i-col span="6">
                <vSxcBox class="box" title="运营数据统计">
                    <vEchartAnalyze_operation_0></vEchartAnalyze_operation_0>
                </vSxcBox>
                <vSxcBox class="box" title="企业营运对比">
                    <vEchartAnalyze_operation_1></vEchartAnalyze_operation_1>
                </vSxcBox>
            </i-col>
            <i-col span="12">
                <vNumAnalyze_operation class="vNumAnalyze"></vNumAnalyze_operation>
                <div class="map-box">
                    <vMap class="vMap"></vMap>
                    <div class="square square-1"></div>
                    <div class="square square-2"></div>
                    <div class="square square-3"></div>
                    <div class="square square-4"></div>
                </div>
            </i-col>
            <i-col span="6">
                <vSxcBox class="box" title="车辆营运统计">
                    <vEchartAnalyze_operation_2></vEchartAnalyze_operation_2>
                </vSxcBox>
                <vSxcBox class="box" title="车辆营运对比">
                    <vEchartAnalyze_operation_3></vEchartAnalyze_operation_3>
                </vSxcBox>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import vSxcBox from '../../../components/sxcBox/sxcBox';
    import vEchartAnalyze_operation_0 from './echart/echartAnalyze_operation_0';
    import vEchartAnalyze_operation_1 from './echart/echartAnalyze_operation_1';
    import vEchartAnalyze_operation_2 from './echart/echartAnalyze_operation_2';
    import vEchartAnalyze_operation_3 from './echart/echartAnalyze_operation_3';
    import vNumAnalyze_operation from './module/numAnalyze/numAnalyze_operation';

    import vMap from '../BaseInfoAnalyze/module/map/map';

    export default {
        name: 'OperationAnalyze',  // 运营效率专题分析
        components: {
            vSxcBox,
            vEchartAnalyze_operation_0,
            vEchartAnalyze_operation_1,
            vEchartAnalyze_operation_2,
            vEchartAnalyze_operation_3,
            vNumAnalyze_operation,
            vMap
        },
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .OperationAnalyze-container {
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