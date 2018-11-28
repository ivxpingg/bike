<template>
    <div class="echartAnalyze_complaint_1-container">
        <div class="echart" ref="echart"></div>
        <!--<Form class="form" inline>-->
            <!--<FormItem>-->
                <!--<Select v-model="type"-->
                        <!--size="small"-->
                        <!--placeholder="全部"-->
                        <!--class="custom-input-style">-->
                    <!--&lt;!&ndash;<Option value="1">按年统计</Option>&ndash;&gt;-->
                    <!--&lt;!&ndash;<Option value="2">按月统计</Option>&ndash;&gt;-->
                <!--</Select>-->
            <!--</FormItem>-->
            <!--<FormItem>-->
                <!--<Select v-model="value"-->
                        <!--size="small"-->
                        <!--class="custom-input-style" >-->
                    <!--<Option value="1">刹车不灵</Option>-->
                    <!--<Option value="2">车身损坏</Option>-->
                    <!--<Option value="3">无法开锁</Option>-->
                    <!--<Option value="4">押金不退</Option>-->
                    <!--<Option value="5">轮胎没气</Option>-->
                    <!--<Option value="6">其他</Option>-->
                <!--</Select>-->
            <!--</FormItem>-->
        <!--</Form>-->
    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart';
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze_complaint_1',  // 投诉类型分析
        mixins: [echartMixin],
        data() {
            return {
                myOption: {
                    legend: {
                        // show: false,
                        orient: 'vertical',
                        y: 'center',
                        left: 15,
                        // data:['ofo小黄车','摩拜单车','hello单车','99单车'],
                        data: [],
                        textStyle: {
                            color: '#FFF'
                        }
                    },
                    series: [{
                        name:'投诉类型',
                        type:'pie',
                        avoidLabelOverlap: false,
                        center: ['65%', '40%'],
                        radius: ['0%', '40%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: false,
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
                            // {value:2, name:'ofo小黄车'}
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
                this.myOption = Merge.recursive(true, this.pieOption, this.myOption);

                this.setOption();
            },
            // 按类型分组
            getData() {
                this.$http({
                    methods: 'get',
                    url: '/violation/type'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.setData(res.data || []);
                    }
                })
            },
            // 赋值
            setData(data) {
                this.myOption.legend.data = [];
                this.myOption.series[0].data = [];
                let otherCount = 0;
                data.forEach(val => {
                    if (val.TYPE) {
                        this.myOption.legend.data.push(val.TYPE);
                        this.myOption.series[0].data.push({
                            value: val.COUNT,
                            name: val.TYPE
                        });
                    }
                    else {
                        otherCount += (val.COUNT || 0);
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