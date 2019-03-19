<template>
    <div class="numAnalyze-container">
        <div class="num-panel" @click="modal_marketShares_open">
            <div class="title">单车运营企业数量</div>
            <div class="value">5</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel" @click="modal_bicycleList_open">
            <div class="title">共计投放车辆</div>
            <div class="value">{{bikeCount}}</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel" @click="modal_userList_open">
            <div class="title">用户数量</div>
            <div class="value">{{userCount}}</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>
        <div class="num-panel">
            <div class="title">用户增长率</div>
            <div class="value">2%</div>
            <div class="angle angle-1"></div>
            <div class="angle angle-2"></div>
            <div class="angle angle-3"></div>
            <div class="angle angle-4"></div>
        </div>

        <vMarketShares ref="marketShares"></vMarketShares>
        <vBicycleList ref="bicycleList"></vBicycleList>
        <vUserList ref="userList"></vUserList>
    </div>
</template>

<script>
    import vMarketShares from './module/marketShares';
    import vBicycleList from './module/bicycleList';
    import vUserList from './module/userList';
    export default {
        name: 'numAnalyze',
        components: {vMarketShares, vBicycleList, vUserList},
        data() {
            return {
                bikeCount: 0,
                userCount: 0
            };
        },
        mounted() {
            this.getBikeCount();
            this.getUserCount();
        },
        methods: {
            modal_marketShares_open() {
                this.$refs.marketShares.modalValue = true;
            },
            modal_bicycleList_open() {
                this.$refs.bicycleList.modalValue = true;
            },
            modal_userList_open() {
                this.$refs.userList.modalValue = true;
            },
            getBikeCount() {
                this.$http({
                    method: 'post',
                    url: '/bicycleInfo/getCount'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.bikeCount = res.data;
                    }
                });
            },
            getUserCount() {
                this.$http({
                    method: 'post',
                    url: '/bicycleUser/count'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.userCount = res.data;
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .numAnalyze-container {
        position: relative;
        display: flex;
        height: 80px;
        .num-panel {
            position: relative;
            padding-top: 20px;
            flex: 1;
            margin-right: 12px;
            background-color: rgba(0,53,103, 0.2);
            cursor: pointer;

            &:last-child{
                margin: 0;
                cursor: default;
            }
            .angle {
                position: absolute;
                height: 12px;
                width: 12px;
                z-index: 1;
                &.angle-1 { top: 0; left: 0; background: url(img/angle1.png) no-repeat center; }
                &.angle-2 { top: 0; right: 0; background: url(img/angle2.png) no-repeat center;}
                &.angle-3 { bottom: 0; right: 0; background: url(img/angle3.png) no-repeat center;}
                &.angle-4 { bottom: 0; left: 0; background: url(img/angle4.png) no-repeat center;}
            }

            .title {
                color: #fff;
                font-size: 16px;
                line-height: 20px;
                text-align: center;
                font-weight: 700;
                letter-spacing: 2px;
            }
            .value {
                color: rgb(25,158,216);
                font-size: 20px;
                line-height: 30px;
                text-align: center;
                font-weight: 700;
                letter-spacing: 2px;
            }
        }
    }
</style>