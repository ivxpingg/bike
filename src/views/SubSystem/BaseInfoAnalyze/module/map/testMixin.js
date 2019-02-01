// 聚合地图测试

export default {
    data() {
        return {
            markerClusterer_test: null
        }
    },
    methods: {
        getData_test() {
            this.$http({
                method: 'get',
                url: '/orbit/getCoordinateList',
                params: {
                    startTime: '2019-01-16 08:00:00'
                }
            }).then((res) => {
                this.test(res.data);
                // this.setPoint_icon(res.data.records);
            })
        },
        test(list) {
            let that =this;

            list.forEach((val) => {

                let p = [val.latitude, val.longitude];
                this.markers.push(new BMap.Marker(new BMap.Point(p[1], p[0])));
            });

            this.markerClusterer_test = new BMapLib.MarkerClusterer(this.map, {
                markers:this.markers,
                gridSize: 1000,
                maxZoom: 100,
                isAverageCenter: true,
                minClusterSize: 10
            });

        },
    }
}