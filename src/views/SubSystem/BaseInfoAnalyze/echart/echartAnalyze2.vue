<template>
    <div class="echartAnalyze2-container" ref="echart">
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart'
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze2',  // 用户增长趋势
        mixins: [echartMixin],
        data() {
            return {
                myOption: {
                    xAxis: [{
                        show: false,
                        boundaryGap: false,
                        data: ['6月','7月','8月','9月','10月','11月']
                    }],
                    series: [
                        {
                            name: 'ofo小黄车',
                            type: 'line',
                            //stack: '总量',
                            areaStyle: {normal: {}},
                            data: [127793,128435,129080,129729,130381,130642]
                        },
                        {
                            name: '摩拜单车',
                            type: 'line',
                            //stack: '总量',
                            areaStyle: {},
                            data: [196210,197196,198187,199183,200184,201190]
                        },
                        {
                            name: 'hello单车',
                            type: 'line',
                            //stack: '总量',
                            areaStyle: {},
                            data: [5121,5163,5204,5246,5289,5342]
                        },
                        {
                            name: '99单车',
                            type: 'line',
                           // stack: '总量',
                            areaStyle: {normal: {}},
                            data: [3060,3091,3122,3153,3185,3211]
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
                // TODO 赋值

                this.myOption = Merge.recursive(true, this.lineOption, this.myOption);
                this.setOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze2-container {
        height: 100%;
    }
</style>