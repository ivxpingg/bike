<template>
    <div class="echartAnalyze_operation_2-container">
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
    export default {
        name: 'echartAnalyze_operation_2',  // 车辆营运统计
        mixins: [echartMixin],
        data() {
            return {
                type: 'year',
                myOption: {
                    grid: {
                        top: 60
                    },
                    xAxis: [{
                        show: false,
                        type: 'category',
                        data: ['ofo小黄车', '摩拜单车', 'hello单车', '99单车']
                    }],
                    yAxis: [
                        {
                            show: false,
                            name: '使用率',
                            min: 0,
                            max: 100,
                            type: 'value'
                        },
                        {
                            show: false,
                            min: 0,
                            max: 1200000,
                            name: '车里程',
                            position: 'right',
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '使用率',
                            type: 'bar',
                            data: [32, 40, 18, 22]
                        },
                        {
                            name: '车里程',
                            type: 'bar',
                            yAxisIndex: 1,
                            data: [591535.33, 1011211.80, 129644.10, 80621.20]
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
            this.handleOption();
            this.getData();
        },
        methods: {
            handleOption() {
                // TODO 赋值

                this.myOption = Merge.recursive(true, this.barOption, this.myOption);
                this.setOption();
            },
            getData() {
                this.$http({
                    method: 'get',
                    url: '/statistics/bikeOperateSum',
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
                let maxMileage = 0;

                this.myOption.xAxis[0].data = [];
                this.myOption.series[0].data = [];
                this.myOption.series[1].data = [];
                data.forEach(val => {
                    maxMileage = maxMileage > val.mileage ? maxMileage : val.mileage;

                    if (this.myOption.xAxis[0].data.indexOf(val.company) === -1) {
                        this.myOption.xAxis[0].data.push(val.company);
                    }

                    this.myOption.series[0].data.push(val.ratio);
                    this.myOption.series[1].data.push(val.mileage);
                });

                this.myOption.yAxis[1].max = maxMileage * 1.2;
                console.dir(this.myOption);

                this.handleOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze_operation_2-container {
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