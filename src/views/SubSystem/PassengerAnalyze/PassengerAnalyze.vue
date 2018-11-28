<template>
    <div class="PassengerAnalyze-container" style="padding-top: 0px;">
        <!--<vPassengerMap></vPassengerMap>-->
        <vEchartMap></vEchartMap>
    </div>
</template>

<script>
    // import vPassengerMap from './map/passengerMap';
    import vEchartMap from './map/echartMap';
    export default {
        name: 'PassengerAnalyze',  // 客流特征分析
        components: {
           // vPassengerMap,
            vEchartMap
        },
        data() {
            return {};
        }
    }
</script>

<style lang="scss" scoped>
    .PassengerAnalyze-container {
        width: 100%;
        height: 100%;
    }
</style>