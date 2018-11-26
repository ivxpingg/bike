<template>
    <div class="echartAnalyze_complaint_2-container">
        <div class="echart" ref="echart"></div>
        <!--<Form class="form" inline>-->
            <!--<FormItem>-->
                <!--<Select v-model="type"-->
                        <!--size="small"-->
                        <!--class="custom-input-style">-->
                    <!--<Option value="1">按年统计</Option>-->
                    <!--<Option value="2">按月统计</Option>-->
                <!--</Select>-->
            <!--</FormItem>-->
        <!--</Form>-->
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    import Echarts from 'echarts';
    export default {
        name: 'echartAnalyze_complaint_2',  // 投诉趋势
        mixins: [echartMixin],
        data() {
            return {
                type: '2',
                myOption: {
                    xAxis: [{
                        show: false,
                        boundaryGap: false,
                        data: ['6月','7月','8月','9月','10月','11月']
                    }],
                    series: [
                        {
                            name: '投诉趋势分析',
                            type: 'line',
                            smooth:true,
                            symbol: 'none',
                            sampling: 'average',
                            itemStyle: {
                                color: 'rgb(255, 70, 131)'
                            },
                            areaStyle: {
                                color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }])
                            },
                            data: [3,3,7,11,12,14]
                        }
                    ]
                }
            };
        },

        watch: {
            type(val) {
                if (val === '1') {
                    this.myOption.xAxis[0].data = ['2016年', '2017年', '2018年'];
                    this.myOption.series[0].data = [28,91,76];
                }
                else {
                    this.myOption.xAxis[0].data = ['6月','7月','8月','9月','10月','11月'];
                    this.myOption.series[0].data = [3,3,7,11,12,14];

                }
                this.setOption();
            }
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
    .echartAnalyze_complaint_2-container {
        position: relative;
        height: 100%;
        .echart {
            height: 100%;
        }

        .form {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
        }
    }
</style>