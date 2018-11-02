<template>
    <div class="echartAnalyze3-container">
        <div class="area-xmd">
            <Tooltip word-wrap
                     placement="top"
                     content="60万">
                <Icon class="icon-ionic" type="ios-ionic" />
            </Tooltip>
        </div>

        <div class="area-hc">
            <Tooltip word-wrap
                     placement="top"
                     content="60万">
                <Icon class="icon-ionic" type="ios-ionic" />
            </Tooltip>
        </div>

        <div class="area-jm">
            <Tooltip word-wrap
                     placement="top"
                     content="60万">
                <Icon class="icon-ionic" type="ios-ionic" />
            </Tooltip>
        </div>

        <div class="area-ta">
            <Tooltip word-wrap
                     placement="top"
                     content="60万">
                <Icon class="icon-ionic" type="ios-ionic" />
            </Tooltip>
        </div>

        <div class="area-xa">
            <Tooltip word-wrap
                     placement="top"
                     content="60万">
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

            };
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze3-container {
        position: relative;
        height: 100%;
        background: url("./img/xm-map.png") no-repeat center;
        background-size: auto 85%;

        /*.icon-ionic {*/
            /*font-size: 40px;*/
            /*opacity: 0.1;*/
        /*}*/

        .area-xmd {
            position: absolute;
            top: 80%;
            left: 48%;
            cursor: pointer;
            text-align: center;
        }

        .area-hc {
            position: absolute;
            top: 75%;
            left: 32%;
            cursor: pointer;
            text-align: center;
        }

        .area-jm {
            position: absolute;
            top: 50%;
            left: 35%;
            cursor: pointer;
            text-align: center;
        }

        .area-ta {
            position: absolute;
            top: 30%;
            left: 48%;
            cursor: pointer;
            text-align: center;
        }

        .area-xa {
            position: absolute;
            top: 50%;
            left: 65%;
            cursor: pointer;
            text-align: center;
        }
    }
</style>