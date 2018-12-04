<template>
    <div class="echartAnalyze0-container" ref="echart">
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze0',  // 单车投放趋势
        mixins: [echartMixin],
        data() {
            return {
                myOption: {
                    xAxis: [{
                        data: ['6月','7月','8月','9月','10月','11月'],
                        axisLabel: {
                            color: '#FFF'
                        }
                    }],
                    series: [
                        {
                            name: 'ofo小黄车',
                            type: 'bar',
                            data: [62081,63347,	64640,65959,69431,70848]
                        },
                        {
                            name: '摩拜单车',
                            type: 'bar',
                            data: [89906,91741,93613,95523,100551,102603]
                        },
                        {
                            name: 'hello单车',
                            type: 'bar',
                            data: [49054,50055,51077,52119,54862,55982]
                        },
                        {
                            name: '99单车',
                            type: 'bar',
                            data: [28521,29103,29697,30303,31898,32549]
                        }
                    ]
                }
            };
        },
        mounted() {
            this.initEchart();
            this.handleOption();
        },
        methods: {
            handleOption() {
                this.myOption = Merge.recursive(true, this.barOption, this.myOption);
                this.setOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze0-container {
        height: 100%;
    }
</style>