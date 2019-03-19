<template>
    <div class="echartAnalyze_operation_0-container">
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
            <!--<FormItem>-->
                <!--<Select v-model="area"-->
                        <!--size="small"-->
                        <!--placeholder="全部"-->
                        <!--clearable-->
                        <!--class="custom-input-style" >-->
                    <!--<Option value="1">思明区</Option>-->
                    <!--<Option value="2">湖里区</Option>-->
                    <!--<Option value="3">同安区</Option>-->
                    <!--<Option value="4">集美区</Option>-->
                    <!--<Option value="5">海沧区</Option>-->
                    <!--<Option value="6">翔安区</Option>-->
                <!--</Select>-->
            <!--</FormItem>-->
        </Form>
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze_operation_0',  // 营运数据统计
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
                        data: ['6月','7月','8月','9月','10月','11月']
                    }],
                    series: [
                        {
                            name: 'ofo小黄车',
                            type: 'bar',
                            data: [62081,63347,	64640,65959,69431,70848]
                        },
                        {
                            name: '摩拜单车',
                            type: 'bar',
                            data: [89906,91741,93613,95523,100551,102603]
                        },
                        {
                            name: 'hello单车',
                            type: 'bar',
                            data: [49054,50055,51077,52119,54862,55982]
                        },
                        {
                            name: '99单车',
                            type: 'bar',
                            data: [28521,29103,29697,30303,31898,32549]
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
                    url: '/statistics/bikeOperate',
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
                this.myOption.xAxis[0].data = [];
                this.myOption.series = [];
                let company = [];
                data.forEach(val => {
                    if (this.myOption.xAxis[0].data.indexOf(val.datetime) === -1) {
                        this.myOption.xAxis[0].data.push(val.datetime);
                    }

                    let idx = company.indexOf(val.company);
                    if (idx === -1) {
                        company.push(val.company);
                        this.myOption.series.push({
                            name: val.company,
                            type: 'bar',
                            data: []
                        });

                        idx = company.length - 1;
                    }
                    this.myOption.series[idx].data.push(val.count);
                });

                this.handleOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze_operation_0-container {
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