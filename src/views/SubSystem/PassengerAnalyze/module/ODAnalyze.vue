<template>
    <div class="ODAnalyze-container">
        <div class="filter-from">
            <Form inline>
                <FormItem>
                    <Select placeholder="选择区域"
                            class="custom-input-style"
                            size="small">

                    </Select>
                </FormItem>
                <FormItem>
                    <DatePicker type="date"
                                class="custom-input-style"
                                placeholder="选择时间"
                                size="small"
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
    export default {
        name: 'ODAnalyze',
        mixins: [echartMixin],
        data() {
            return {
                echart_bar: null,
                myOption_bar: {
                    grid: {
                        bottom: 60
                    },
                    dataZoom: [{
                        type: 'inside'
                    }, {
                        type: 'slider'
                    }],
                    xAxis: [{
                        show: false,
                        type: 'category',
                        data: ['01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时','11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时','21时', '22时', '23时', '24时']
                    }],
                    series: [
                        {
                            name: '进入',
                            type: 'bar',
                            data: [12, 32,32,12,23,12,23,21,12,23,32,43,23,54,34,64,35,46,57,35,46,23,46,23],
                            large: true
                        },
                        {
                            name: '出去',
                            type: 'bar',
                            data: [32,32,12,23,12,23,21,12,23,32,43,23,54,34,64,35,46,57,35,46,23,46,23,35],
                            large: true
                        }
                    ]
                },

                echart_pie: null,
                myOption_pie: {}


            };
        },
        mounted() {
            this.initEchart('echart_bar', 'echart_bar');
            this.initEchart('echart_pie', 'echart_pie');

            this.handleOption();
        },
        methods: {
            handleOption() {
                // TODO 赋值
                this.myOption_bar = Merge.recursive(true, this.barOption, this.myOption_bar);
                this.setOption('echart_bar', this.myOption_bar);

                this.myOption_pie = Merge.recursive(true, this.pieOption, this.myOption_pie);
                this.setOption('echart_pie', this.myOption_pie);
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
    .ODAnalyze-container {
        position: relative;


        .echart {
            height: 380px;
        }
    }
</style>