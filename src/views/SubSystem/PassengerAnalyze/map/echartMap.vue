<template>
    <div class="echartMap-container">
        <div ref="echart_map" class="map"  id="echart_map"></div>
    </div>
</template>

<script>
    import initBMap from './initBMap';
    import data from './json';
    export default {
        name: 'echartMap',
        data() {
            return {
                map: null,

                textMapvLayer: null,
                pointLayer: null,

                lineLayer: null,
                timeMapvLayer: null,
                countLayer: null,
            };
        },
        mounted() {

            initBMap('echart_map').then((m) => {
                this.map = m;
                // this.test();
                this.setName();
            });
        },
        methods: {
            setName() {
                let that = this;

                let textData = [];
                let pointData = [];
                data.forEach(val => {
                    textData.push({
                        geometry: {
                            type: 'Point',
                            coordinates: val.from
                        },
                        text: val.name
                    });

                    pointData.push(
                        {
                            geometry: {
                                type: 'Point',
                                coordinates: val.from
                            },
                            name: val.name
                        }
                    );
                });

                let textDataSet = new mapv.DataSet(textData);
                let textOptions = {
                    draw: 'text',
                    font: '12px Arial',
                    fillStyle: 'white',
                    shadowColor: 'yellow',
                    shadowBlue: 10,
                    zIndex: 11,
                    shadowBlur: 10
                };
                this.textMapvLayer = new mapv.baiduMapLayer(this.map, textDataSet, textOptions);

                let pointDataSet = new mapv.DataSet(pointData);
                let pointOptions = {
                    fillStyle: 'rgba(36,254,65,0.5)',
                    shadowColor: 'rgba(55, 50, 250, 0.5)',
                    shadowBlur: 10,
                    cursor: 'pointer',
                    size: 25,
                    zIndex: 10,
                    draw: 'simple',
                    methods: {
                        click: function (item) { // 点击事件，返回对应点击元素的对象值

                            that.setLine(item.name);
                        }
                    }
                }

                this.pointLayer = new mapv.baiduMapLayer(this.map, pointDataSet, pointOptions);
            },

            setLine(name) {
                if (this.lineLayer) {
                    this.lineLayer.destroy();
                }
                if (this.timeMapvLayer) {
                    this.timeMapvLayer.destroy();
                }
                if (this.countLayer) {
                    this.countLayer.destroy();
                }

                let lineData = [];
                let timeData = [];
                let countData = [];

                data.forEach(val => {
                    if (val.name === name) {
                        val.to.forEach(v => {
                            let curve = mapv.utilCurve.getPoints([{lng: val.from[0], lat: val.from[1]}, {lng: v.lngLot[0], lat: v.lngLot[1]}]);

                            for (let j = 0; j < curve.length; j++) {
                                timeData.push({
                                    geometry: {
                                        type: 'Point',
                                        coordinates: curve[j]
                                    },
                                    count: 1,
                                    time: j
                                });
                            }

                            lineData.push({
                                geometry: {
                                    type: 'LineString',
                                    coordinates: curve
                                    //coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
                                },
                                count: v.count
                            });

                            countData.push({
                                geometry: {
                                    type: 'Point',
                                    coordinates: v.lngLot
                                },
                                text: v.count
                            })

                        });
                    }

                });

                let lineDataSet = new mapv.DataSet(lineData);

                let lineOptions = {
                    strokeStyle: 'rgba(253,252,71, 1)',
                    shadowColor: 'rgba(253,252,71, 1)',
                    shadowBlur: 20,
                    lineWidth: 2,
                    zIndex: 100,
                    draw: 'simple'
                };

                this.lineLayer = new mapv.baiduMapLayer(this.map, lineDataSet, lineOptions);

                let timeDataSet = new mapv.DataSet(timeData);
                let timeOptions = {
                    fillStyle: 'rgba(255, 250, 250, 0.5)',
                    zIndex: 101,
                    size: 2.5,
                    animation: {
                        type: 'time',
                        stepsRange: {
                            start: 0,
                            end: 50
                        },
                        trails: 10,
                        duration: 2,
                    },
                    draw: 'simple'
                };
                this.timeMapvLayer = new mapv.baiduMapLayer(this.map, timeDataSet, timeOptions);


                let countDataSet = new mapv.DataSet(countData);
                let textOptions = {
                    offset: {
                        x: 0,
                        y: -20
                    },
                    draw: 'text',
                    font: '16px Arial',
                    fillStyle: 'white',
                    shadowColor: 'white',
                    shadowBlue: 10,
                    zIndex: 102,
                    shadowBlur: 10
                };

                this.countLayer = new mapv.baiduMapLayer(this.map, countDataSet, textOptions);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartMap-container {
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