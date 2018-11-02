<template>
    <div class="home-container">
        <Row :gutter="30">
            <i-col span="8">
                <div class="sub-box">
                    <div class="mask" @click="goto('BaseInfoAnalyze')"></div>
                    <div class="box-title">行业基本情况分析</div>
                    <div class="box-content">
                        <img src="./img/sub-bg-1.png" alt="">
                    </div>
                </div>
            </i-col>
            <i-col span="8">
                <div class="sub-box">
                    <div class="mask" @click="goto('OperationAnalyze')"></div>
                    <div class="box-title">运营效率专题分析</div>
                    <div class="box-content"><img src="./img/sub-bg-2.png" alt=""></div>
                </div>
            </i-col>
            <i-col span="8">
                <div class="sub-box">
                    <div class="mask" @click="goto('PassengerAnalyze')"></div>
                    <div class="box-title">客流特征分析</div>
                    <div class="box-content"><img src="./img/sub-bg.png" alt=""></div>
                </div>
            </i-col>
            <i-col span="8">
                <div class="sub-box">
                    <div class="mask" @click="goto('ComplaintAnalyze')"></div>
                    <div class="box-title">投诉统计分析</div>
                    <div class="box-content"><img src="./img/sub-bg.png" alt=""></div>
                </div>
            </i-col>
            <i-col span="8">
                <div class="sub-box" @click="goto('DemandAnalyze')">
                    <div class="mask"></div>
                    <div class="box-title">需求特征分析</div>
                    <div class="box-content"><img src="./img/sub-bg.png" alt=""></div>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'bikeHome',
        data() {
            return {};
        },
        methods: {
            goto(name) {
                this.$router.push({
                    name: name
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-container {
        padding: 0 50px;
    }

    .sub-box {
        position: relative;
        margin-top: 30px;
        /*min-height: 300px;*/
        background-color: rgba(0,53,103, 0.2);
        border: 1px solid rgba(0,198,255, 0.2);
        border-radius: 5px;

        .mask {
            position: absolute;
            display: block;
            content: " ";
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            background-color: rgba(255,255,255,0);
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.6s;
            &:hover{
                background-color: rgba(255,255,255,0.1);
            }
        }

        .box-title {
            padding-left: 40px;
            letter-spacing: 2px;
            font-size: 16px;
            color: #FFF;
            text-align: left;
            line-height: 40px;
            background: url(./img/sys-title-bg.png) no-repeat 10px 14px;
        }

        .box-content {
            padding: 0 5px 10px;
            > img {
                width: 100%;
            }
        }
        
    }
</style>