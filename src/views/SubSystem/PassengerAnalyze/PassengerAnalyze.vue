<template>
    <div class="PassengerAnalyze-container" style="padding-top: 0px;">
        <!--<vPassengerMap></vPassengerMap>-->
        <vEchartMap></vEchartMap>

        <div class="left-panel">
            <vSxcBox title="OD流量分析">
                <vODAnalyze></vODAnalyze>
            </vSxcBox>
        </div>

        <div class="right-panel">
            <vSxcBox title="早高峰客流排行" style="height: 350px;">
                <vMorningRank></vMorningRank>
            </vSxcBox>

            <vSxcBox title="晚高峰客流排行" style="height: 350px;">
                <vNightRank></vNightRank>
            </vSxcBox>
        </div>
    </div>
</template>

<script>
    // import vPassengerMap from './map/passengerMap';
    import vEchartMap from './map/echartMap';
    import vSxcBox from '../../../components/sxcBox/sxcBox';
    import vODAnalyze from './module/ODAnalyze';
    import vMorningRank from './module/morningRank';
    import vNightRank from './module/nightRank';
    export default {
        name: 'PassengerAnalyze',  // 客流特征分析
        components: {
           // vPassengerMap,
            vEchartMap,
            vSxcBox,
            vODAnalyze,
            vMorningRank,
            vNightRank
        },
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .PassengerAnalyze-container {
        position: relative;
        width: 100%;
        height: 100%;

        .left-panel {
            position: absolute;
            left: 10px;
            top: 70px;
            width: 380px;
            z-index: 10;
        }

        .right-panel {
            position: absolute;
            right: 10px;
            top: 70px;
            width: 380px;
            z-index: 10;
        }
    }
</style>