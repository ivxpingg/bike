<template>
    <div class="echartAnalyze_complaint_1-container">
        <div class="echart" ref="echart"></div>
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze_complaint_1',  // 投诉类型分析
        mixins: [echartMixin],
        data() {
            return {
                myOption: {
                    legend: {
                        // show: false,
                        orient: 'vertical',
                        y: 'center',
                        left: 15,
                        // data:['ofo小黄车','摩拜单车','hello单车','99单车'],
                        data: [],
                        textStyle: {
                            color: '#FFF'
                        }
                    },
                    series: [{
                        name:'投诉类型',
                        type:'pie',
                        avoidLabelOverlap: false,
                        center: ['65%', '40%'],
                        radius: ['0%', '40%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            // {value:2, name:'ofo小黄车'}
                        ]
                    }]
                }
            };
        },
        mounted() {
            this.initEchart();
            this.getData();
        },
        methods: {
            handleOption() {
                this.myOption = Merge.recursive(true, this.pieOption, this.myOption);

                this.setOption();
            },
            // 按类型分组
            getData() {
                this.$http({
                    methods: 'get',
                    url: '/violation/path'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.setData(res.data || []);
                    }
                })
            },
            // 赋值
            setData(data) {
                this.myOption.legend.data = [];
                this.myOption.series[0].data = [];
                data.forEach(val => {
                    this.myOption.legend.data.push(val.sourcewaypath);
                    this.myOption.series[0].data.push({
                        value: val.count,
                        name: val.sourcewaypath
                    });

                });

                this.handleOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze_complaint_1-container {
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