import Echarts from 'echarts';
const baseOption = {
    // color: [
    //     '#37a2da',
    //     '#32c5e9',
    //     '#67e0e3',
    //     '#9fe6b8',
    //     '#ffdb5c',
    //     '#ff9f7f',
    //     '#fb7293',
    //     '#e062ae',
    //     '#e690d1',
    //     '#e7bcf3',
    //     '#9d96f5',
    //     '#8378ea',
    //     '#96bfff'
    // ],
    color: ['#3bc9e8', '#ffd366','#ade5ae','#fe9685','#f67199','#6be0df','#e26eb6','#8378ea','#e691d1','#e1baf3','#9f98f4','#38a5db','#97b8fc'],
    grid: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
    }

};


export default {
    data() {
        return {
            chart: null,
            barOption: {
                color: baseOption.color,
                tooltip: {
                    trigger: 'axis'
                },
                grid: baseOption.grid,
                xAxis: [{
                    show: false,
                    type: 'category',
                    data: []
                }],
                yAxis: [{
                    show: false,
                    type: 'value'
                }]
            },

            lineOption: {
                color: baseOption.color,
                tooltip: {
                    trigger: 'axis'
                },
                grid: baseOption.grid,
                xAxis: [{
                    show: false,
                    type: 'category',
                    data: []
                }],
                yAxis: [{
                    show: false,
                    type: 'value'
                }]
            },

            pieOption: {
                color: baseOption.color,
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                grid: baseOption.grid
            },

            wordCloudOption: {
                tooltip: {
                    show: true
                }
            }
        };
    },
    methods: {
        initEchart() {
            this.chart = Echarts.init(this.$refs.echart);
        },
        setOption() {
            this.chart.setOption(this.myOption);
        },
        createRandomItemStyle(idx) {

            let k = idx % baseOption.color.length;

            return {
                normal: {
                    color: baseOption.color[k]
                }
            };
        }
    }
}