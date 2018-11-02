<template>
    <div class="passengerMap-container" id="passenger_map">
    </div>
</template>

<script>
    import initBMap from './initBMap';
    export default {
        name: 'passengerMap',
        data() {
            return {
                searchParams: {
                    current: 1,      // 当前第几页
                    size: 200,      // 每页几行
                    total: 0,     // 总行数
                },
                map: null,
                points: []
            };
        },
        mounted() {
            initBMap('passenger_map').then((m) => {
                this.map = m;
                // this.getData();
                this.test();
            });

        },
        methods: {
            getData() {
                this.$http({
                    method: 'post',
                    url: '/bicyclestate/list',
                    timeout: 1000000,
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.test(res.data.records);
                })
            },
            test() {

                let randomCount = 5000;

                let data = [];

                let citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];

                // 构造数据
                while (randomCount--) {
                    let cityCenter1 = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
                    let cityCenter2 = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
                    data.push({
                        geometry: {
                            type: 'LineString',
                            coordinates: [
                                [cityCenter1.lng - 1 + Math.random() * 1, cityCenter1.lat - 1 + Math.random() * 1],
                                [cityCenter2.lng - 1 + Math.random() * 1, cityCenter2.lat - 1 + Math.random() * 1]
                            ]
                        },
                        count: 30
                    });
                };

                let dataSet = new mapv.DataSet(data);

                let options = {
                    gradient: {
                        0.25: "rgb(0,0,255)",
                        0.55: "rgb(0,255,0)",
                        0.85: "yellow",
                        1.0: "rgb(255,0,0)"
                    },
                    max: 50,
                    strokeStyle: 'rgba(255, 255, 255, 1)',
                    lineWidth: 3,
                    shadowColor: 'rgba(255, 255, 255, 1)',
                    shadowBlur: 20,
                    // strength: 0.4,
                    draw: 'heatmap'
                };

                let mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .passengerMap-container {
        position: relative;
        height: 100%;
        .map {
            height: 100%;
        }
    }
</style>
<style lang="scss">
    // 去掉百度地图Logo
    .anchorBL {
        display: none;
    }
</style>