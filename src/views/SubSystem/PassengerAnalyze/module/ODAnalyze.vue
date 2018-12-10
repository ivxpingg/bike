<template>
    <div class="ODAnalyze-container">
        <div class="filter-from">
            <Form inline>
                <FormItem>
                    <Select placeholder="选择区域"
                            v-model="searchParams.areaCode"
                            class="custom-input-style"
                            size="small">
                        <Option v-for="item in areaList"
                                :key="item.id"
                                :value="item.id"
                                :label="item.name"></Option>

                    </Select>
                </FormItem>
                <FormItem>
                    <DatePicker :value="searchParams.time"
                                type="date"
                                class="custom-input-style"
                                placeholder="选择时间"
                                size="small"
                                @on-change="onChange_time"
                                style="width: 110px"></DatePicker>
                </FormItem>
            </Form>
        </div>
        <div class="echart" ref="echart_bar">

        </div>
        <div class="echart" ref="echart_pie">

        </div>
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    import MOMENT from 'moment';
    export default {
        name: 'ODAnalyze',
        mixins: [echartMixin],
        data() {
            return {
                areaList: [],
                searchParams: {
                    areaCode:'',
                    time: ''
                },

                echart_bar: null,
                myOption_bar: {
                    legend: {
                        data: ['进入', '离开'],
                        textStyle: {
                            color: '#FFF'
                        }
                    },
                    grid: {
                        bottom: 60
                    },
                    dataZoom: [{
                        type: 'inside'
                    }, {
                        type: 'slider'
                    }],
                    xAxis: [{
                        show: true,
                        type: 'category',
                        axisLabel: {
                            color: '#FFF'
                        },
                        data: ['01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时','11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时','21时', '22时', '23时', '24时']
                    }],
                    series: [
                        {
                            name: '进入',
                            type: 'bar',
                            data: [],
                            large: true
                        },
                        {
                            name: '离开',
                            type: 'bar',
                            data: [],
                            large: true
                        }
                    ]
                },

                echart_pie: null,
                myOption_pie: {
                    tooltip: {
                        trigger: 'item',
                    },
                    legend: {
                        orient: 'vertical',
                        y: 'center',
                        right: 15,
                        data:['软件园','蔡塘','明发园','观音山', '古地石社'],
                        textStyle: {
                            color: '#FFF'
                        }
                    },
                    series: [{
                        name:'前5名排名',
                        type:'pie',
                        center: ['35%', '50%'],
                        radius: ['0%', '50%'],
                        label: {
                            normal: {
                                show: true,
                                formatter: '{c}',
                                position: 'inside'
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data:[
                            {value:70848, name:'软件园'},
                            {value:102603, name:'蔡塘'},
                            {value:55982, name:'明发园'},
                            {value:32549, name:'观音山'},
                            {value:32549, name:'古地石社'}
                        ]
                    }]
                }


            };
        },
        watch: {
            searchParams: {
                deep: true,
                handler() {
                    this.getData();
                }
            }
        },
        mounted() {
            this.searchParams.time = MOMENT().subtract(1, 'days').format('YYYY-MM-DD');
            this.initEchart('echart_bar', 'echart_bar');
            this.initEchart('echart_pie', 'echart_pie');

            this.handleOption();
            this.getAreaData();

            this.getData_pie();
        },
        methods: {
            onChange_time(value) {
                this.searchParams.time = value;
            },
            handleOption() {
                this.myOption_bar = Merge.recursive(true, this.barOption, this.myOption_bar);
                this.setOption('echart_bar', this.myOption_bar);

                this.myOption_pie = Merge.recursive(true, this.pieOption, this.myOption_pie);
                this.setOption('echart_pie', this.myOption_pie);
            },
            //获取热点区域列表
            getAreaData() {
                this.$http({
                    method: 'get',
                    url: '/area/list'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.areaList = res.data || [];
                        if (res.data.length > 0) {
                            this.searchParams.areaCode = res.data[0].id;
                        }
                    }
                })
            },

            // 获取
            getData() {
                this.$http({
                    method: 'get',
                    url: '/bikeOut/hourCount',
                    params: this.searchParams
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.resetOption(res.data);
                    }
                })
            },

            resetOption(data) {
                this.myOption_bar.series[0].data = [];
                this.myOption_bar.series[1].data = [];
                data.forEach(val => {
                    this.myOption_bar.series[0].data.push(val.inCount);
                    this.myOption_bar.series[1].data.push(val.outCount);
                });
                this.handleOption();
            },

            getData_pie() {
                this.$http({
                    method: 'get',
                    url: '/bikeOut/rank'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.resetOption_pie(res.data);
                    }
                })
            },
            resetOption_pie(data) {
                this.myOption_pie.legend.data = [];
                this.myOption_pie.series[0].data = [];

                data.forEach(val => {
                    this.myOption_pie.legend.data.push(val.areaName);
                    this.myOption_pie.series[0].data.push({
                        value: val.count,
                        name: val.areaName
                    });
                });
                this.handleOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ODAnalyze-container {
        position: relative;
        padding-top: 40px;

        .filter-from {
            position: absolute;
            top: 0;
            left: 10px;
        }

        .echart {
            height: 300px;
        }
    }
</style>