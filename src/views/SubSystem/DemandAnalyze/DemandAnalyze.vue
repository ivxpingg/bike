<template>
    <div class="DemandAnalyze-container" style="padding-top: 0px;">
        <vRlMap v-if="type"></vRlMap>

        <vSpotMap v-if="!type"></vSpotMap>

        <Button type="info"
                class="btn"
                icon="md-repeat"
                @click="onClick_switch"
                ghost>{{type === 0 ? '热力图': '分析模式'}}</Button>
    </div>
</template>

<script>
    import vRlMap from './map/rlMap';
    import vSpotMap from './map/spotMap';
    export default {
        name: 'DemandAnalyze',  // 需求特征分析
        components: {vRlMap, vSpotMap},
        data() {
            return {
                type: 0
            };
        },
        methods: {
            onClick_switch() {
                this.type = this.type ? 0 : 1;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .DemandAnalyze-container {
        width: 100%;
        height: 100%;

        .btn {
            position: absolute;
            top: 80px;
            right: 20px;
            z-index: 11;
        }
    }
</style>