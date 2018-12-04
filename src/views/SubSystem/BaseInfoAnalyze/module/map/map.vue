<template>
    <div class="map-container">
        <div class="map" id="baidu_map"></div>
        <!--<vBInfo class="vBInfo"></vBInfo>-->

        <div>

        </div>
    </div>
</template>

<script>
    import initBMap from './initBMap';
    import vBInfo from './bInfo';
    import img_ofo from './images/ofo.png';
    import img_hellobike from './images/hellobike.png';
    import img_nine from './images/nine.png';
    import img_mobai from './images/mobai.png';
    export default {
        name: 'baiduMap',
        components: {vBInfo},
        data() {
            return {
                searchParams: {
                    current: 1,      // 当前第几页
                    size: 2000,      // 每页几行
                    total: 0,     // 总行数
                },
                searchParams2:{
                    longitude: '',
                    latitude: '',
                    km: 0.5,
                    zoom: 15
                },
                map: null,
                mapIcons: [],

                markers: [],
                markerClusterer: null
            };
        },
        watch: {
            // searchParams2: {
            //     deep: true,
            //     handler(val, oldVal) {
            //         if (val.zoom >= 14) {
            //             this.getData2();
            //         }
            //     }
            // }
        },
        mounted() {
            initBMap('baidu_map').then((m) => {
                this.map = m;
                this.getData();
                //
                // this.searchParams2.longitude = this.map.getCenter().lng;
                // this.searchParams2.latitude = this.map.getCenter().lat;
                // this.setMapEvent();
                //
                // this.getData2();

            });
        },
        methods: {
            getData() {
                this.$http({
                    method: 'post',
                    url: '/bikeStatus/list',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    // this.test(res.data.records);
                    this.setPoint_icon(res.data.records);
                })
            },
            setPoint_icon(list) {
                list.forEach((val) => {
                    let p = val.cur_position.split(',');
                    let pt = new BMap.Point(p[1], p[0]);
                    let myIcon;
                    switch (val.companyName) {
                        case 'ofo单车': myIcon = new BMap.Icon(img_ofo, new BMap.Size(16,16)); break;
                        case 'hello单车': myIcon = new BMap.Icon(img_hellobike, new BMap.Size(16,16)); break;
                        case '摩拜单车': myIcon = new BMap.Icon(img_mobai, new BMap.Size(16,16)); break;
                        case '99单车': myIcon = new BMap.Icon(img_nine, new BMap.Size(16,16)); break;
                    }

                    myIcon.setImageSize(new BMap.Size(16,16));
                    let icon = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
                    this.map.addOverlay(icon);
                });
            },

            test(list) {
                let that =this;

                list.forEach((val) => {

                    let p = val.cur_position.split(',');
                    this.markers.push(new BMap.Marker(new BMap.Point(p[1], p[0])));
                });

                this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
                    markers:this.markers,
                    gridSize: 10,
                    maxZoom: 18,
                    isAverageCenter: true,
                    // minClusterSize: 5
                });

            },


            setMapEvent() {
                let that = this;
                this.map.addEventListener('dragend', () => {
                    this.searchParams2.longitude = this.map.getCenter().lng;
                    this.searchParams2.latitude = this.map.getCenter().lat;
                    this.getData2();
                    // if (this.searchParams2.zoom > 15) {
                    //     this.getData2();
                    // }
                });

                this.map.addEventListener('zoomend', () => {
                    this.searchParams2.zoom = this.map.getZoom();

                });
            },
            getData2() {
                this.$http({
                    method: 'get',
                    url: '/orbit/getNear',
                    params: {
                        longitude: this.searchParams2.longitude,
                        latitude: this.searchParams2.latitude,
                        km: this.searchParams2.km
                    }
                }).then((res) => {
                    // this.test(res.data.records);
                    this.test2(res.data || []);
                })
            },
            // 分车企
            test2(list) {
                this.removeIcons();
                list.forEach((val) => {
                    let pt = new BMap.Point(parseFloat(val.longitude), parseFloat(val.latitude));
                    let myIcon;
                    switch (val.companyName) {
                        case 'ofo单车': myIcon = new BMap.Icon(img_ofo, new BMap.Size(16,16)); break;
                        case 'hello单车': myIcon = new BMap.Icon(img_hellobike, new BMap.Size(16,16)); break;
                        case '摩拜单车': myIcon = new BMap.Icon(img_mobai, new BMap.Size(16,16)); break;
                        case '99单车': myIcon = new BMap.Icon(img_nine, new BMap.Size(16,16)); break;
                    }

                    myIcon.setImageSize(new BMap.Size(16,16));
                    let icon = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
                    this.map.addOverlay(icon);
                    this.mapIcons.push(icon);
                });
            },

            removeIcons() {
                this.mapIcons.forEach(v => {
                    this.map.removeOverlay(v);
                });

                this.mapIcons = [];
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