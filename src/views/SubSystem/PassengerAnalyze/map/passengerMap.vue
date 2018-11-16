<template>
    <div class="passengerMap-container">
        <div class="map"  id="passenger_map"></div>
        <Button class="btn" type="primary" icon="ios-eye" @click="onClick_switch">{{btnText}}</Button>
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
                    size: 50000,      // 每页几行
                    total: 0,     // 总行数
                },
                map: null,
                points: [],

                // 电子围栏
                searchParams_fence: {
                    current: 1,      // 当前第几页
                    size: 5000,      // 每页几行
                    total: 0,     // 总行数
                },

                mapvLayer_path: null,
                mapvLayer_fence: null,
                onSwitch: 'path',
                btnText: '查看电子围栏'  // 查看电子围栏 / 查看单车轨迹
            };
        },
        watch: {
            onSwitch(val) {
                this.btnText = val === 'path' ? '查看电子围栏' : '查看单车轨迹';

                if (val === 'path') {
                    this.mapvLayer_path.show();
                    this.mapvLayer_fence.hide();
                }
                else{
                    this.mapvLayer_path.hide();
                    this.mapvLayer_fence.show();
                }
            }
        },
        mounted() {
            initBMap('passenger_map').then((m) => {
                this.map = m;
                this.getData();
            });

        },
        methods: {
            onClick_switch() {
                this.onSwitch = this.onSwitch === 'path' ? 'fence' : 'path';
            },

            getData() {
                this.$http({
                    method: 'post',
                    url: '/bikeStatus/startAndEndPosition',
                    timeout: 1000000,
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.setPath(res.data.records || []);
                    this.getFence();
                })
            },
            setPath(list) {
                let data = [];

                list.forEach((v) => {
                    let p1 = v.pre_position.split(',');
                    let p2 = v.cur_position.split(',');

                    data.push({
                        geometry: {
                            type: 'LineString',
                            coordinates: [
                                [parseFloat(p1[1]), parseFloat(p1[0])],
                                [parseFloat(p2[1]), parseFloat(p2[0])]
                            ]
                        },
                        count: 30
                    });

                });


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

                this.mapvLayer_path = new mapv.baiduMapLayer(this.map, dataSet, options);

            },


            //
            getFence() {
                this.$http({
                    method: 'post',
                    url: '/fence/list',
                    timeout: 1000000,
                    data: JSON.stringify(this.searchParams_fence)
                }).then((res) => {
                    this.setFence(res.data.records || []);
                })
            },

            setFence(list) {
                let data = [];

                // data.push(
                //     {
                //         geometry: {
                //             type: 'Polygon',
                //             coordinates: [
                //                 [[118.173989,24.501325], [118.173629,24.500536], [118.173378,24.5007],[118.173055,24.501687]]
                //             ]
                //         },
                //         count: 30 * Math.random()
                //     }
                // );

                list.forEach((val) => {
                    let arr = [];

                    for(let k in val) {
                        let p = val[k].split(',').reverse();

                        arr.push([parseFloat(p[0]) + 0.011298, parseFloat(p[1]) + 0.003505]);
                    }

                    data.push({
                        geometry: {
                            type: 'Polygon',
                            coordinates: [arr]
                        },
                        count: 3000
                    });

                });

                let dataSet = new mapv.DataSet(data);

                let options = {
                    gradient: {
                        // 0: 'rgba(50, 50, 255, 0.8)',
                        // 0.5: 'rgba(255, 255, 50, 0.8)',
                        // 1: 'rgba(255, 55, 50, 0.8)'
                        1: 'rgba(23, 210, 0, 0.8)'
                    },
                    max: 30,
                    draw: 'intensity'
                }

                this.mapvLayer_fence = new mapv.baiduMapLayer(this.map, dataSet, options);
                this.mapvLayer_fence.hide();
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

        .btn {
            position: absolute;
            top:  70px;
            right: 20px;
            z-index: 10;
        }
    }
</style>
<style lang="scss">
    // 去掉百度地图Logo
    .anchorBL {
        display: none;
    }
</style>