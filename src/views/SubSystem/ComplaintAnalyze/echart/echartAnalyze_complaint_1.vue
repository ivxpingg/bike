<template>
    <div class="echartAnalyze_complaint_1-container">
        <div class="echart" ref="echart"></div>
        <Form class="form" inline>
            <FormItem>
                <Select v-model="type"
                        size="small"
                        placeholder="全部"
                        class="custom-input-style">
                    <!--<Option value="1">按年统计</Option>-->
                    <!--<Option value="2">按月统计</Option>-->
                </Select>
            </FormItem>
            <FormItem>
                <Select v-model="value"
                        size="small"
                        class="custom-input-style" >
                    <Option value="1">刹车不灵</Option>
                    <Option value="2">车身损坏</Option>
                    <Option value="3">无法开锁</Option>
                    <Option value="4">押金不退</Option>
                    <Option value="5">轮胎没气</Option>
                    <Option value="6">其他</Option>
                </Select>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze_complaint_1',  // 投诉类型分析
        mixins: [echartMixin],
        data() {
            return {type: '1',
                value: '1',
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
                        avoidLabelOverlap: false,
                        center: ['35%', '56%'],
                        radius: ['50%', '70%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
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
                            {value:2, name:'ofo小黄车'},
                            {value:0, name:'摩拜单车'},
                            {value:1, name:'hello单车'},
                            {value:2, name:'99单车'}
                        ]
                    }]
                }
            };
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
    .echartAnalyze_complaint_1-container {
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