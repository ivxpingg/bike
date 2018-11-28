<template>
    <div class="BaseInfoAnalyze-container">
        <Row :gutter="10" class="row-panel">
            <i-col span="6">
                <vSxcBox class="box" title="单车投放趋势">
                    <vEchartAnalyze0></vEchartAnalyze0>
                </vSxcBox>
                <vSxcBox class="box" title="企业市场份额">
                    <vEchartAnalyze1></vEchartAnalyze1>
                </vSxcBox>
            </i-col>
            <i-col span="12">
                <vNumAnalyze class="vNumAnalyze"></vNumAnalyze>
                <div class="map-box">
                    <vMap class="vMap"></vMap>
                    <div class="square square-1"></div>
                    <div class="square square-2"></div>
                    <div class="square square-3"></div>
                    <div class="square square-4"></div>
                </div>
            </i-col>
            <i-col span="6">
                <vSxcBox class="box" title="用户增长趋势">
                    <vEchartAnalyze2></vEchartAnalyze2>
                </vSxcBox>
                <vSxcBox class="box" title="区域分布统计">
                    <vEchartAnalyze3></vEchartAnalyze3>
                </vSxcBox>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import vSxcBox from '../../../components/sxcBox/sxcBox';
    import vEchartAnalyze0 from './echart/echartAnalyze0';
    import vEchartAnalyze1 from './echart/echartAnalyze1';
    import vEchartAnalyze2 from './echart/echartAnalyze2';
    import vEchartAnalyze3 from './echart/echartAnalyze3';
    import vNumAnalyze from './module/numAnalyze/numAnalyze';
    import vMap from './module/map/map';
    export default {
        name: 'BaseInfoAnalyze',  // 行业基本情况分析
        components: {
            vSxcBox,
            vEchartAnalyze0,
            vEchartAnalyze1,
            vEchartAnalyze2,
            vEchartAnalyze3,
            vNumAnalyze,
            vMap
        },
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .BaseInfoAnalyze-container {
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