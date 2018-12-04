<template>
    <div class="morningRank-container" ref="echart">
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    export default {
        name: 'morningRank',
        mixins: [echartMixin],
        data() {
            return {
                myOption: {
                    grid:{
                      left: 60
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
                        data: ['古地石社','观音山','蔡塘','明发园','蔡塘BRT','软件园'],
                        axisLabel: {
                            color: '#FFF'
                        }
                    },
                    series: [
                        {
                            name: '进入',
                            type: 'bar',
                            data: [3,42,12,19,23,214]
                        },
                        {
                            name: '离开',
                            type: 'bar',
                            data: [19,0,32,41,53,36]
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
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '',
                    params: {

                    }
                }).then(res => {
                    if (res.code === 'SUCCESS') {

                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .morningRank-container {
        height: 100%;
    }
</style>