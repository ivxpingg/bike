<template>
    <div class="echartAnalyze_complaint_0-container">
        <div class="echart" ref="echart"></div>
        <Form class="form" inline>
            <!--<FormItem>-->
                <!--<Select v-model="type"-->
                        <!--size="small"-->
                        <!--class="custom-input-style">-->
                    <!--<Option value="1">按年统计</Option>-->
                    <!--<Option value="2">按月统计</Option>-->
                <!--</Select>-->
            <!--</FormItem>-->
            <FormItem>
                <Select v-model="value"
                        size="small"
                        class="custom-input-style" >
                    <Option value="2018">2018</Option>
                    <Option value="2017">2017</Option>
                    <Option value="2016">2016</Option>
                </Select>
            </FormItem>
        </Form>
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
                type: '1',
                value: '2018',
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
                        name:'投诉量占比',
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
                            {value:41, name:'ofo小黄车'},
                            {value:7, name:'摩拜单车'},
                            {value:12, name:'hello单车'},
                            {value:16, name:'99单车'}
                        ]
                    }]
                }
            };
        },
        watch: {
            value(val) {
                switch (val) {
                    case '2018':
                        this.myOption.series[0].data[0].value = 41;
                        this.myOption.series[0].data[1].value = 7;
                        this.myOption.series[0].data[2].value = 12;
                        this.myOption.series[0].data[3].value = 16;
                        break;
                    case '2017':
                        this.myOption.series[0].data[0].value = 53;
                        this.myOption.series[0].data[1].value = 8;
                        this.myOption.series[0].data[2].value = 13;
                        this.myOption.series[0].data[3].value = 17;
                        break;
                    case '2016':
                        this.myOption.series[0].data[0].value = 16;
                        this.myOption.series[0].data[1].value = 3;
                        this.myOption.series[0].data[2].value = 4;
                        this.myOption.series[0].data[3].value = 5;
                        break;
                }
                this.setOption();
            }
        },
        mounted() {
            this.initEchart();
            this.handleOption();
        },
        methods: {
            handleOption() {
                // TODO 赋值
                this.myOption = Merge.recursive(true, this.pieOption, this.myOption);

                this.setOption();
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