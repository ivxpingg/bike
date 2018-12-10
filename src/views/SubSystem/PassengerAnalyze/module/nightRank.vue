<template>
    <div class="nightRank-container" ref="echart">
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    export default {
        name: 'nightRank',
        mixins: [echartMixin],
        data() {
            return {
                myOption: {
                    grid:{
                        left: 80
                    },
                    xAxis:  {
                        type: 'value',
                        show: false,
                        axisLabel: {
                            color: '#FFF'
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: ['古地石社','观音山','蔡塘','蔡塘BRT','明发园','软件园'],
                        axisLabel: {
                            color: '#FFF'
                        }
                    },
                    series: [
                        {
                            name: '进入',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: [23,17,65,63,78,12]
                        },
                        {
                            name: '离开',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: [6,67,28,34,65,187]
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
                this.myOption = Merge.recursive(true, this.barOption, this.myOption);
                this.setOption();
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/bikeOut/peak',
                    params: {
                        type: 'latePeak'
                    }
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.resetOptons(res.data);

                    }
                })
            },
            resetOptons(data) {
                this.myOption.yAxis.data = [];
                this.myOption.series[0].data = [];
                this.myOption.series[1].data = [];
                data.reverse().forEach(val => {
                    this.myOption.yAxis.data.push(val.areaName);
                    this.myOption.series[0].data.push(val.inCount);
                    this.myOption.series[1].data.push(val.outCount);
                });
                this.handleOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nightRank-container {
        height: 100%;
    }
</style>