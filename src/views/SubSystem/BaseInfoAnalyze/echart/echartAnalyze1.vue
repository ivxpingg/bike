<template>
    <div class="echartAnalyze1-container" ref="echart">
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart'
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze1',  // 企业市场份额
        mixins: [echartMixin],
        data() {
            return {
                myOption: {
                    legend: {
                        orient: 'vertical',
                        y: 'center',
                        right: 15,
                        data:['ofo小黄车','摩拜单车','hello单车','99单车'],
                        textStyle: {
                            color: '#FFF'
                        }
                    },
                    series: [{
                        name:'企业市场份额',
                        type:'pie',
                        center: ['35%', '50%'],
                        radius: ['0%', '50%'],
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
                            // {value:70848, name:'ofo小黄车'},
                            // {value:102603, name:'摩拜单车'},
                            // {value:55982, name:'hello单车'},
                            // {value:32549, name:'99单车'}
                        ]
                    }]
                }
            };
        },
        mounted() {
            this.initEchart();
            this.handleOption();
            this.getBikeCount();
        },
        methods: {
            handleOption() {
                // TODO 赋值
                this.myOption = Merge.recursive(true, this.pieOption, this.myOption);

                this.setOption();
            },
            getBikeCount() {
                this.$http({
                    method: 'post',
                    url: '/bicycleInfo/companyPercent'
                }).then((res) => {

                    if (res.code === 'SUCCESS') {
                        // this.bikeCountList = res.data || [];
                        this.resetOption(res.data || []);
                    }
                });
            },
            resetOption(data) {
                this.myOption.legend.data = [];
                this.myOption.series[0].data = [];

                data.forEach(val => {
                    this.myOption.legend.data.push(val.name);
                    this.myOption.series[0].data.push({
                        value: val.bicycleCount,
                        name: val.name
                    });
                });

                this.handleOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze1-container {
        height: 100%;
    }
</style>