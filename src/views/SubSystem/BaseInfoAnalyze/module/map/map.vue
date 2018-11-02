<template>
    <div class="map-container">
        <div class="map" id="baidu_map"></div>
        <vBInfo class="vBInfo"></vBInfo>
    </div>
</template>

<script>
    import initBMap from './initBMap';
    import vBInfo from './bInfo';
    export default {
        name: 'baiduMap',
        components: {vBInfo},
        data() {
            return {
                searchParams: {
                    current: 1,      // 当前第几页
                    size: 1000,      // 每页几行
                    total: 0,     // 总行数
                },
                map: null,

                markers: [],

                markerClusterer: null
            };
        },
        mounted() {
            initBMap('baidu_map').then((m) => {
                this.map = m;

                this.getData();

            });
        },
        methods: {
            getData() {
                this.$http({
                    method: 'post',
                    url: '/position/list',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.test(res.data.records);
                })
            },
            test(list) {
                let that =this;

                // this.map.addEventListener("zoomend", function () {
                //    console.dir(that.map.getZoom());
                //    console.dir(that.markerClusterer.getGridSize());
                // });

                list.forEach((val) => {

                    let p = val.latLon.split(',');
                    this.markers.push(new BMap.Marker(new BMap.Point(p[1], p[0])));
                });

                this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
                    markers:this.markers,
                    gridSize: 10,
                    maxZoom: 18,
                    isAverageCenter: true,
                    // minClusterSize: 5
                });
            }
        }

    }
</script>

<style lang="scss" scoped>
    .map-container {
        position: relative;
        height: 100%;
        .map {
            height: 100%;
        }

        .vBInfo {
            position: absolute;
            top: 10px;
            left: 10px;
        }
    }
</style>
<style lang="scss">
    // 去掉百度地图Logo
    .anchorBL {
        display: none;
    }
</style>