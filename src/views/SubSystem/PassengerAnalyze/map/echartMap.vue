<template>
    <div class="echartMap-container">
        <div ref="echart_map" class="map"  id="echart_map"></div>

        <div class="slider">
            <div class="label">时间轴：</div>
            <div style="width: 300px;">
                <Slider v-model="slider.value"
                        range
                        :min="1"
                        :max="24"
                        :tip-format="slider.format"
                        @on-change="onChange_slider"></Slider>
            </div>

            <div style="padding: 6px; margin-left: 30px;">
                <i-switch v-model="searchParams.type" :true-value="'in'" :false-value="'out'">
                    <span slot="open">进</span>
                    <span slot="close">出</span>
                </i-switch>
            </div>

        </div>
        <div class="switch">
            <!--<i-switch>-->
                <!--<span slot="open">开</span>-->
                <!--<span slot="close">关</span>-->
            <!--</i-switch>-->

        </div>
    </div>
</template>

<script>
    import initBMap from './initBMap';
    import data from './json';
    import MOMENT from 'moment';
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

                // 当前点击的热点区域信息
                areaInfo: {
                    id: '',
                    centerPointer: []
                },
                searchParams: {
                    areaCode: '',
                    startTime: MOMENT().subtract(1, 'days').format('YYYY-MM-DD') + ' 00:00:00',
                    endTime: MOMENT().subtract(1, 'days').format('YYYY-MM-DD') + ' 23:59:59',
                    type: 'out'  // 获取热点区域单车进入或者出去   'out' || 'in'
                },

                // 时间阀值
                slider:{
                    value: [1, 24],
                    format(val) {
                        return val + '时';
                    }
                }
            };
        },
        watch: {
            searchParams: {
                deep: true,
                handler() {
                    this.getLineData();
                }
            }
        },
        mounted() {

            initBMap('echart_map').then((m) => {
                this.map = m;
                this.getAreaData();


                // this.setName();
            });
        },
        methods: {
            onChange_slider(value) {
                let s_hour = (value[0]-1) > 9 ? '' + value[0] : '0' + (value[0]-1);
                let e_hour = (value[1]-1) > 9 ? '' + value[1] : '0' + (value[1]-1);

                this.searchParams.startTime = MOMENT().subtract(1, 'days').format('YYYY-MM-DD') + ' ' + s_hour + ':00:00';
                this.searchParams.endTime = MOMENT().subtract(1, 'days').format('YYYY-MM-DD') + ' ' + e_hour + ':59:59';
            },

            //获取热点区域列表
            getAreaData() {
                this.$http({
                    method: 'get',
                    url: '/area/list'
                }).then(res => {
                    if (res.code === 'SUCCESS') {
                        this.resetAreaData(res.data || []);

                    }
                })
            },
            // 重新解析热点区域数据
            resetAreaData(data) {
                data.forEach(val => {
                    val.list = [];
                    let count = 0;
                    let lng = 0;
                    let lat = 0;

                    for(let key in val){
                        if (key !== 'id' && key !== 'name' && key !== 'list' && key !== 'centerPosition') {
                            count++;
                            lng += parseFloat(val[key].split(',')[0]);
                            lat += parseFloat(val[key].split(',')[1]);
                            val.list.push([parseFloat(val[key].split(',')[0]), parseFloat(val[key].split(',')[1])]);
                        }
                    }
                    lng = lng / count;
                    lat = lat / count;

                    val.centerPosition = [lng, lat];
                });

                this.setTitle(data);
            },
            // 绘制热点区域名称 \ 绘制区域多边形
            setTitle(data) {
                let that = this;

                let textData = []; // 名称

                let polygonData = [];  // 面
                data.forEach(val => {
                    textData.push({
                        geometry: {
                            type: 'Point',
                            coordinates: val.centerPosition
                        },
                        text: val.name
                    });

                    polygonData.push({
                        geometry: {
                            type: 'Polygon',
                            coordinates: [val.list]
                        },
                        id: val.id,
                        centerPosition: val.centerPosition
                        // text: val.name
                    });

                });

                // 名称
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


                // 面
                let polygonDataSet = new mapv.DataSet(polygonData);
                let polygonOptions = {
                    fillStyle: 'rgba(36,254,65,0.5)',
                    shadowColor: 'rgba(55, 50, 250, 0.5)',
                    shadowBlur: 10,
                    cursor: 'pointer',
                    size: 25,
                    zIndex: 10,
                    draw: 'simple',
                    methods: {
                        click: function (item) { // 点击事件，返回对应点击元素的对象值
                            that.searchParams.areaCode = item.id;
                            that.areaInfo.id = item.id;
                            that.areaInfo.centerPosition = item.centerPosition;
                            // that.getLineData();
                        }
                    }
                };
                new mapv.baiduMapLayer(this.map, polygonDataSet, polygonOptions);
            },

            // 根据热点区域获取单车出去的数量
            getLineData() {

                this.$http({
                    method: 'get',
                    url: '/bikeOut/list',
                    params: this.searchParams
                }).then(res => {
                    if (res.code === 'SUCCESS') {

                        if (this.searchParams.type === 'in'){
                            this.setInLine(res.data);
                        }
                        else {
                            this.setOutLine(res.data);
                        }
                    }
                })
            },
            setOutLine(data) {
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

                let count = 0;


                data.forEach(val => {
                    count++;
                    let curve = mapv.utilCurve.getPoints([
                        {   lng: this.areaInfo.centerPosition[0],
                            lat: this.areaInfo.centerPosition[1]
                        },
                        {
                            lng: parseFloat(val.longitude),
                            lat: parseFloat(val.latitude)
                        }]);

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
                        },
                        count: 1
                    });

                });

                countData.push({
                    geometry: {
                        type: 'Point',
                        coordinates: this.areaInfo.centerPosition
                    },
                    text: count
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
                        duration: 3,
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
            },

            setInLine(data) {
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

                let count = 0;


                data.forEach(val => {
                    count++;
                    let curve = mapv.utilCurve.getPoints([
                        {
                            lng: parseFloat(val.longitude),
                            lat: parseFloat(val.latitude)
                        },
                        {   lng: this.areaInfo.centerPosition[0],
                            lat: this.areaInfo.centerPosition[1]
                        }
                        ]);

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
                        },
                        count: 1
                    });

                });

                countData.push({
                    geometry: {
                        type: 'Point',
                        coordinates: this.areaInfo.centerPosition
                    },
                    text: count
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
                        duration: 3,
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

        .slider {
            position: absolute;
            bottom: 10px;
            left: 50%;
            right: 0;
            margin-left: -240px;
            width: 480px;
            z-index: 100;
            display: flex;

            .label {
                font-size: 14px;
                color: #2d8cf0;
                line-height: 36px;
                margin-right: 20px;
            }
        }
    }
</style>
<style lang="scss">
    // 去掉百度地图Logo
    .anchorBL {
        display: none;
    }
</style>
