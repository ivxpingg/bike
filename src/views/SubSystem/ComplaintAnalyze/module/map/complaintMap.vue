<template>
    <div class="complaintMap-container">
        <div class="map" id="complaint_map"></div>
    </div>
</template>

<script>
    import initBMap from './initBMap';
    import img from './img/complaint.png';
    import MOMENT from 'moment';
    export default {
        name: 'complaintMap',
        data() {
            return {
                searchParams: {
                    current: 2,      // 当前第几页
                    size: 100,      // 每页几行
                    total: 0,     // 总行数
                },
                map: null,

                mapLayer: {}
            };
        },
        mounted() {
            initBMap('complaint_map').then((m) => {
                this.map = m;

                this.getData();

            });
        },
        methods: {
            getData() {
                this.$http({
                    method: 'post',
                    // url: '/bicyclestate/list', //
                    url: '/violation/list',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    if(res.code === 'SUCCESS'){
                        this.setPoint2(res.data.records);
                    }
                })
            },
            setPoint2(list) {
                let that  = this;
                let opts = {
                    width : 250,     // 信息窗口宽度
                    // height: 80,     // 信息窗口高度
                    // title : "信息窗口" , // 信息窗口标题
                    enableMessage:true//设置允许信息窗发送短息
                };


                list.forEach((val) => {

                    if (val.XLATITUDE && val.YLATITUDE) {

                        let p = [val.XLATITUDE, val.YLATITUDE];


                        // let p = [val.XLATITUDE, val.YLATITUDE];

                        let pt = new BMap.Point(p[1], p[0]);
                        let myIcon = new BMap.Icon(img, new BMap.Size(30, 30));
                        myIcon.setImageSize(new BMap.Size(30, 30));
                        let marker = new BMap.Marker(pt, {icon: myIcon});  // 创建标注

                        marker.info = val;

                        marker.addEventListener("click", function (e) {
                            let p = e.target;

                            let time = MOMENT(p.info.CREATEDON).format('YYYY年MM月DD日')

                            let html = `<div>投诉时间: ${time}</div>
                                    <div>投诉地点: ${p.info.AREANAME}</div>
                                    <div>投诉状态: ${p.info.STATUS}</div>
                                    <div>投诉内容: ${p.info.CONTENT}</div>`;


                            let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                            let infoWindow = new BMap.InfoWindow(html, opts);  // 创建信息窗口对象
                            that.map.openInfoWindow(infoWindow, point); //开启信息窗口
                        });

                        this.map.addOverlay(marker);              // 将标注添加到地图中
                    }

                });
            },

            setPoint(list) {
                let that  = this;
                let opts = {
                    width : 250,     // 信息窗口宽度
                    height: 80,     // 信息窗口高度
                    // title : "信息窗口" , // 信息窗口标题
                    enableMessage:true//设置允许信息窗发送短息
                };


                list.forEach((val) => {
                    let p = val.latLon.split(',');
                    let pt = new BMap.Point(p[1],p[0]);
                    let myIcon = new BMap.Icon(img, new BMap.Size(30,30));
                    myIcon.setImageSize(new BMap.Size(30,30));
                    let marker = new BMap.Marker(pt ,{icon:myIcon});  // 创建标注

                    marker.info = val;

                    marker.addEventListener("click",function(e){
                        let p = e.target;

                        let html = `<div>投诉时间: 2018年9月31日</div>
                                    <div>投诉地点: 厦门市湖里区观日西二里</div>
                                    <div>投诉状态: 已受理</div>
                                    <div>投诉内容: 共享单车损坏了，无法使用</div>`;


                        let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                        let infoWindow = new BMap.InfoWindow(html,opts);  // 创建信息窗口对象
                        that.map.openInfoWindow(infoWindow,point); //开启信息窗口
                    });

                    this.map.addOverlay(marker);              // 将标注添加到地图中

                });

            }
        }
    }
</script>

<style lang="scss" scoped>
    .complaintMap-container {
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