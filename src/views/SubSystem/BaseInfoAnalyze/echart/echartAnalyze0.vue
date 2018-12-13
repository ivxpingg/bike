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
                    series: [
                        {
                            name:'单车状态',
                            type:'pie',
                            selectedMode: 'single',
                            radius: [0, '30%'],

                            label: {
                                normal: {
                                    show: false,
                                    position: 'inner'
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                // {value:335, name:'正常', selected:true},
                                // {value:679, name:'非运营'},
                                // {value:1548, name:'搜索引擎'}
                            ]
                        },
                        {
                            name:'单车状态',
                            type:'pie',
                            radius: ['40%', '55%'],

                            data:[
                                // {value:335, name:'直达'}
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
                this.myOption = Merge.recursive(true, this.pieOption, this.myOption);
                this.setOption();
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/bicycleInfo/bicycleCountByStatus',
                    params: {
                        type: 'company'
                    }
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.resetOption(res.data || []);
                    }
                });
            },
            resetOption(data) {
                this.myOption.series[0].data = [];
                this.myOption.series[1].data = [];

                let statusAttr = [];
                let series1_data = {

                };


                data.forEach(val => {
                    if (statusAttr.indexOf(val.status) === -1) {
                        statusAttr.push(val.status);

                        series1_data[val.status] = val.count;
                    }
                    else {
                        series1_data[val.status] += val.count;
                    }

                    this.myOption.series[1].data.push({
                        value: val.count,
                        name: `${val.companyName}(${val.status})`
                    });
                });

                for (let key in series1_data) {
                    this.myOption.series[0].data.push({
                        value: series1_data[key],
                        name: key
                    });
                }

                this.handleOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze0-container {
        height: 100%;
    }
</style>