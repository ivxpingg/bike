<template>
    <div class="echartAnalyze_complaint_3-container" ref="echart">

    </div>
</template>

<script>
    import echartMixin from '../../../../lib/mixin/echart'
    import 'echarts-wordcloud';
    import Merge from 'merge';
    export default {
        name: 'echartAnalyze_complaint_3',  // 投诉舆情信息
        mixins: [echartMixin],
        data() {
            return {
                myOption:{
                    series: [{
                        name: '舆情信息',
                        type: 'wordCloud',
                        left: 'center',
                        top: 'center',
                        width: '100%',
                        height: '100%',
                        textRotation : [-90, 90],
                        shape: 'circle',
                        autoSize: {
                            enable: true,
                            minSize: 14
                        },

                        data:[
                            {
                                name: "OFO小黄车",
                                value: 224,
                                textStyle: this.createRandomItemStyle(0)
                            },{
                                name: "车锁坏",
                                value: 2142,
                                textStyle: this.createRandomItemStyle(1)
                            },{
                                name: "不好骑行",
                                value: 12,
                                textStyle: this.createRandomItemStyle(2)
                            },{
                                name: "踏板不灵",
                                value: 99,
                                textStyle: this.createRandomItemStyle(3)
                            },{
                                name: "押金不退",
                                value: 20,
                                textStyle: this.createRandomItemStyle(4)
                            },{
                                name: "摩拜单车",
                                value: 1230,
                                textStyle: this.createRandomItemStyle(5)
                            },{
                                name: "永安行",
                                value: 9,
                                textStyle: this.createRandomItemStyle(6)
                            },{
                                name: "时尚",
                                value: 20,
                                textStyle: this.createRandomItemStyle(7)
                            },{
                                name: "hello单车",
                                value: 123,
                                textStyle: this.createRandomItemStyle(8)
                            }
                        ]
                    }]
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
                // TODO 赋值

                this.myOption = Merge.recursive(true, this.wordCloudOption, this.myOption);
                this.setOption();
            },
            // 按类型分组
            getData() {
                this.$http({
                    methods: 'get',
                    url: '/violation/status'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.setData(res.data || []);
                    }
                })
            },
            // 赋值
            setData(data) {
                this.myOption.series[0].data = [];
                data.forEach((val, idx) => {
                    this.myOption.series[0].data.push({
                        name: val.status,
                        value: val.count,
                        textStyle: this.createRandomItemStyle(idx)
                    });

                });

                this.handleOption();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze_complaint_3-container {
        height: 100%;
        color: #c23531;
    }
</style>