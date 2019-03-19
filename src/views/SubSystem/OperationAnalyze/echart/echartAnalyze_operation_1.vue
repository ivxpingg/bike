<template>
    <div class="echartAnalyze_operation_1-container">
        <div class="echart" ref="echart"></div>
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze_operation_1', //
        mixins: [echartMixin],
        data() {
            return {
                myOption: {
                    legend: {
                        x : 'center',
                        bottom: 10,
                        textStyle: {
                            color: '#FFF'
                        },
                        data:['ofo小黄车','摩拜单车','hello单车','99单车']
                    },
                    calculable : true,
                    series : [
                        {
                            name:'按月',
                            type:'pie',
                            radius : [0, '40%'],
                            center : ['25%', '50%'],
                            roseType : 'radius',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                // {value:55261, name:'ofo小黄车'},
                                // {value:86187, name:'摩拜单车'},
                                // {value:13436, name:'hello单车'},
                                // {value:7812, name:'99单车'}
                            ]
                        },
                        {
                            name:'按年',
                            type:'pie',
                            radius : ['35%', '50%'],
                            center : ['75%', '50%'],
                            // roseType : 'area',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '16',
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
                                // {value:394357, name:'ofo小黄车'},
                                // {value:674141, name:'摩拜单车'},
                                // {value:86429, name:'hello单车'},
                                // {value:53747, name:'99单车'}
                            ]
                        }
                    ]
                }
            };
        },
        mounted() {
            this.initEchart();
            this.handleOption();
            this.getData();
        },
        methods: {
            handleOption() {
                // TODO 赋值
                this.myOption = Merge.recursive(true, this.pieOption, this.myOption);

                this.setOption();
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/statistics/companyOperate',
                    params: {
                        type: this.type
                    }
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.resetOption(res.data);
                    }
                })
            },
            resetOption(data) {
                this.myOption.legend.data = [];
                this.myOption.series[0].data = [];
                this.myOption.series[1].data = [];

                let company = [];
                data.month.forEach(val => {

                    let idx = this.myOption.legend.data.indexOf(val.company);
                    if (idx === -1) {
                        this.myOption.legend.data.push(val.company);
                    }

                    this.myOption.series[0].data.push({
                        value: val.count,
                        name: val.company
                    });
                });

                data.year.forEach(val => {

                    let idx = company.indexOf(val.company);
                    if (idx === -1) {
                        this.myOption.legend.data.push(val.company);
                    }

                    this.myOption.series[1].data.push({
                        value: val.count,
                        name: val.company
                    });
                });

                this.handleOption();
            }

        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze_operation_1-container {
        position: relative;
        height: 100%;
        .echart {
            height: 100%;
        }
    }
</style>