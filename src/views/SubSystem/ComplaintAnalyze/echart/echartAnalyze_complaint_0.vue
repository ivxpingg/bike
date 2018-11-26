<template>
    <div class="echartAnalyze_complaint_0-container">
        <div class="echart" ref="echart"></div>

    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze_complaint_0',  // 投诉量占比
        mixins: [echartMixin],
        data() {
            return {
                myOption: {
                    legend: {
                        orient: 'vertical',
                        y: 'center',
                        right: 15,
                        data:[],
                        textStyle: {
                            color: '#FFF'
                        }
                    },
                    series: [{
                        name:'地区占比',
                        type:'pie',
                        center: ['35%', '56%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,

                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            // {value:41, name:'ofo小黄车'},

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
                // TODO 赋值
                this.myOption = Merge.recursive(true, this.pieOption, this.myOption);


                this.setOption();
            },

            // 按地区分组
            getData() {
                this.$http({
                    methods: 'get',
                    url: '/violation/area'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.setData(res.data || []);
                    }
                })
            },
            setData(data) {
                this.myOption.legend.data = [];
                this.myOption.series[0].data = [];
                let otherCount = 0;
                data.forEach(val => {
                    if (val.AREA === '其它') {
                        otherCount += val.COUNT;
                    }
                    else {
                        this.myOption.legend.data.push(val.AREA);
                        this.myOption.series[0].data.push({
                            value: val.COUNT,
                            name: val.AREA
                        });
                    }


                });

                if (otherCount > 0) {
                    this.myOption.legend.data.push('其它');
                    this.myOption.series[0].data.push({
                        value: otherCount,
                        name: '其它'
                    });
                }

                this.handleOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze_complaint_0-container {
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