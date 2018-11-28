<template>
    <div class="echartAnalyze_complaint_2-container">
        <div class="echart" ref="echart"></div>
        <Form class="form" inline>
            <FormItem>
                <Select v-model="type"
                        size="small"
                        class="custom-input-style">
                    <Option value="year">按年统计</Option>
                    <Option value="month">按月统计</Option>
                </Select>
            </FormItem>
        </Form>
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
                type: 'month',
                myOption: {
                    xAxis: [{
                        show: false,
                        boundaryGap: false,
                        // data: ['6月','7月','8月','9月','10月','11月']
                        data: []
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
                            // data: [3,3,7,11,12,14]
                            data: []
                        }
                    ]
                }
            };
        },
        watch: {
            type(val) {
                this.getData();
            }
        },
        mounted() {
            this.initEchart();
            this.getData();
            // this.handleOption();
        },
        methods: {
            handleOption() {
                // TODO 赋值
                this.myOption = Merge.recursive(true, this.lineOption, this.myOption);
                this.setOption();
            },

            // 获取投诉趋势
            getData() {
                this.$http({
                    methods: 'get',
                    url: '/violation/trend',
                    params: {
                        type: this.type
                    }
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.setData(res.data || []);
                    }
                })
            },

            setData(data) {
                this.myOption.xAxis[0].data = [];
                this.myOption.series[0].data = [];
                data.forEach(val => {
                    this.myOption.xAxis[0].data.push(val.DATETIME);
                    this.myOption.series[0].data.push(val.COUNT);
                });
                this.handleOption();
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