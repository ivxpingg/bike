<template>
    <div class="echartAnalyze3-container">
        <div class="detail-panel">
            <div v-for="(item, idx) in areaList.detail" :key="idx" :style="{ color: color[areaList.area]}">
                <span>{{item.companyName}}: </span>
                <span>{{item.count}}</span>
            </div>
        </div>
        <div class="area-xmd" @click="onClick_area('岛内')">
            <Tooltip word-wrap
                     placement="top"
                     :content="`${obj['岛内'].count}万`">
                <Icon class="icon-ionic" type="ios-ionic" />
                <!--{{obj['岛内'].count}}-->
            </Tooltip>
        </div>

        <div class="area-hc" @click="onClick_area('海沧区')">
            <Tooltip word-wrap
                     placement="top"
                     :content="`${obj['海沧区'].count}万`">
                <Icon class="icon-ionic" type="ios-ionic" />
            </Tooltip>
        </div>

        <div class="area-jm" @click="onClick_area('集美区')">
            <Tooltip word-wrap
                     placement="top"
                     :content="`${obj['集美区'].count}万`">
                <Icon class="icon-ionic" type="ios-ionic" />
            </Tooltip>
        </div>

        <div class="area-ta" @click="onClick_area('同安区')">
            <Tooltip word-wrap
                     placement="top"
                     :content="`${obj['同安区'].count}万`">
                <Icon class="icon-ionic" type="ios-ionic" />
            </Tooltip>
        </div>

        <div class="area-xa" @click="onClick_area('翔安区')">
            <Tooltip word-wrap
                     placement="top"
                     :content="`${obj['翔安区'].count}万`">
                <Icon class="icon-ionic" type="ios-ionic" />
            </Tooltip>
        </div>


    </div>
</template>

<script>
    export default {
        name: 'echartAnalyze3',  // 区域分布统计
        data() {
            return {
                obj: {
                    '翔安区': {area: '', count: 0, detail: []},
                    '集美区': {area: '', count: 0, detail: []},
                    '海沧区': {area: '', count: 0, detail: []},
                    '同安区': {area: '', count: 0, detail: []},
                    '思明区': {area: '', count: 0, detail: []},
                    '湖里区': {area: '', count: 0, detail: []},
                    '岛内': {area: '', count: 0,  detail: []}
                },
                areaList: [],
                color: {
                    '翔安区': 'rgb(159,230,184)',
                    '集美区': 'rgb(103,224,227)',
                    '海沧区': 'rgb(255,159,127)',
                    '同安区': 'rgb(255,219,92)',
                    '岛内': 'rgb(55,162,218)'
                }
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/orbit/getArea'
                }).then((res) => {

                    this.dataCleaning(res.data || []);
                })
            },
            dataCleaning(list) {
                list.forEach(val => {
                    Object.assign(this.obj[val.area], val);
                    this.obj[val.area].count = (this.obj[val.area].count / 10000).toFixed(2);
                });

                this.obj['岛内'].area = '岛内';

                this.obj['岛内'].count = (parseFloat(this.obj['思明区'].count) + parseFloat(this.obj['湖里区'].count)).toFixed(2);


                this.obj['思明区'].detail.forEach((v, idx) => {
                    this.obj['岛内'].detail.push({
                        companyName: v.companyName, count: v.count + this.obj['湖里区'].detail[idx].count
                    });
                });
            },
            onClick_area(key) {
                this.areaList = this.obj[key];
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze3-container {
        position: relative;
        padding-left: 20%;
        height: 100%;
        background: url("./img/xm-map.png") no-repeat center;
        background-origin: content-box;
        background-size: auto 85%;

        /*.icon-ionic {*/
            /*font-size: 40px;*/
            /*opacity: 0.1;*/
        /*}*/

        .detail-panel {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 99;
            font-size: 14px;
            color: #FFF;
            line-height: 20px;
            font-weight: 700;
        }

        .area-xmd {
            position: absolute;
            top: 80%;
            left: 48%;
            margin-left: 10%;
            cursor: pointer;
            text-align: center;
        }

        .area-hc {
            position: absolute;
            top: 75%;
            left: 32%;
            margin-left: 10%;
            cursor: pointer;
            text-align: center;
        }

        .area-jm {
            position: absolute;
            top: 50%;
            left: 35%;
            margin-left: 10%;
            cursor: pointer;
            text-align: center;
        }

        .area-ta {
            position: absolute;
            top: 30%;
            left: 48%;
            margin-left: 10%;
            cursor: pointer;
            text-align: center;
        }

        .area-xa {
            position: absolute;
            top: 50%;
            left: 65%;
            margin-left: 10%;
            cursor: pointer;
            text-align: center;
        }
    }
</style>