<template>
    <div class="rlMap-container" id="rl_map">
    </div>
</template>

<script>
    import initBMap from './initBMap';
    export default {
        name: 'rlMap',   // 热力图
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
            initBMap('rl_map').then((m) => {
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
            test(list) {
                list.forEach((val) => {

                    let p = val.latLon.split(',');
                    this.points.push({
                        "lng":p[1],
                        "lat":p[0],
                        "count": 20
                    });
                });

                let heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
                this.map.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({data:this.points, max:100});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rlMap-container {
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