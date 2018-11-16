<template>
    <div class="spotMap-container" id="spot_map">
    </div>
</template>

<script>
    import initBMap from './initBMap';
    export default {
        name: 'spotMap',
        data() {
            return {
                searchParams: {
                    current: 1,      // 当前第几页
                    size: 1000,      // 每页几行
                    total: 0,     // 总行数
                },
                map: null,
                points: []
            };
        },
        mounted() {
            initBMap('spot_map').then((m) => {
                this.map = m;
                this.getData();
                this.searchParams.current++;
                setTimeout(() => {
                    this.getData();
                    this.searchParams.current++;
                }, 1000);
                setTimeout(() => {
                    this.getData();
                    this.searchParams.current++;
                }, 2000);
                setTimeout(() => {
                    this.getData();
                    this.searchParams.current++;
                }, 3000);
                setTimeout(() => {
                    this.getData();
                    this.searchParams.current++;
                }, 4000);
                // this.test2();
            });
        },
        methods: {
            getData() {
                this.$http({
                    method: 'post',
                    url: '/bikeStatus/list',
                    timeout: 1000000,
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.test(res.data.records);
                })
            },
            test(list) {
                list.forEach((val) => {

                    let p = val.cur_position.split(',');
                    this.points.push({
                        geometry: {
                            type: 'Point',
                            coordinates: [p[1], p[0]]
                        },
                        count: 20
                    });
                });

                var options = {
                    fillStyle: 'rgba(255, 50, 50, 0.6)',
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    methods: {
                        click: function (item) {
                            console.log(item);
                        }
                    },
                    size: 5,
                    draw: 'simple'
                };
                var dataSet = new mapv.DataSet(this.points);
                var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);

            },
            test2() {

                var randomCount =10000;

                var data = [];

                var citys = ["北京","天津","上海","重庆","石家庄","太原","呼和浩特","哈尔滨","长春","沈阳","济南","南京","合肥","杭州","南昌","福州","郑州","武汉","长沙","广州","南宁","西安","银川","兰州","西宁","乌鲁木齐","成都","贵阳","昆明","拉萨","海口"];

                // 构造数据
                while (randomCount--) {
                    var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
                    data.push({
                        geometry: {
                            type: 'Point',
                            coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
                        },
                        count: 30 * Math.random()
                    });
                }
                console.dir(data.length);

                var dataSet = new mapv.DataSet(data);

                var options = {
                    fillStyle: 'rgba(255, 50, 50, 0.6)',
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    methods: {
                        click: function (item) {
                            console.log(item);
                        }
                    },
                    size: 5,
                    draw: 'simple'
                }

                var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);

            }
        }
    }
</script>

<style lang="scss" scoped>
    .spotMap-container {
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