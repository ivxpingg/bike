<template>
    <div class="marketShares-container">
        <Modal v-model="modalValue"
               class="custom-modal-style"
               :width="800"
               footer-hide>
            <p slot="header">
                <span>.企业市场份额</span>
            </p>

            <div class="set-height">
                <Row :gutter="10">
                    <i-col span="8">
                        <div class="company-info">
                            <div class="logo">
                                <img src="./img/ofo.png" alt="">
                            </div>
                            <div class="text-panel">
                                <div>ofo小黄车</div>
                                <div>接入时间：{{baseInfo.ofobike.date}}</div>
                                <div>车辆数：{{baseInfo.ofobike.bikeCount}}</div>
                                <div>注册用户数：{{baseInfo.ofobike.userCount}}</div>
                            </div>
                        </div>
                    </i-col>
                    <i-col span="8">
                        <div class="company-info">
                            <div class="logo">
                                <img src="./img/mobai.png" alt="">
                            </div>
                            <div class="text-panel">
                                <div>摩拜单车</div>
                                <div>接入时间：{{baseInfo.mobike.date}}</div>
                                <div>车辆数：{{baseInfo.mobike.bikeCount}}</div>
                                <div>注册用户数：{{baseInfo.mobike.userCount}}</div>
                            </div>
                        </div>
                    </i-col>
                    <i-col span="8">
                        <div class="company-info">
                            <div class="logo">
                                <img src="./img/hello2.png" alt="">
                            </div>
                            <div class="text-panel">
                                <div>hello单车</div>
                                <div>接入时间：{{baseInfo.hellobike.date}}</div>
                                <div>车辆数：{{baseInfo.hellobike.bikeCount}}</div>
                                <div>注册用户数：{{baseInfo.hellobike.userCount}}</div>
                            </div>
                        </div>
                    </i-col>
                    <i-col span="8">
                        <div class="company-info">
                            <div class="logo">
                                <img src="./img/99.png" alt="">
                            </div>
                            <div class="text-panel">
                                <div>99单车</div>
                                <div>接入时间：{{baseInfo.nnbike.date}}</div>
                                <div>车辆数：{{baseInfo.nnbike.bikeCount}}</div>
                                <div>注册用户数：{{baseInfo.nnbike.userCount}}</div>
                            </div>
                        </div>
                    </i-col>

                    <i-col span="8">
                        <div class="company-info">
                            <div class="logo">
                                <img src="./img/qingju.png" alt="">
                            </div>
                            <div class="text-panel">
                                <div>青桔单车</div>
                                <div>接入时间：{{baseInfo.qjbike.date}}</div>
                                <div>车辆数：{{baseInfo.qjbike.bikeCount}}</div>
                                <div>注册用户数：{{baseInfo.qjbike.userCount}}</div>
                            </div>
                        </div>
                    </i-col>
                </Row>
            </div>
        </Modal>
    </div>
</template>

<script>
    import modalMixin from '../../../../../../lib/mixin/modalMixin';
    import MOMENT from 'moment';
    export default {
        name: 'marketShares',  // 企业市场份额
        mixins: [modalMixin],
        data() {
            return {
                baseInfo: {
                    ofobike: {
                        date: '',
                        bikeCount: 0,
                        userCount: 0
                    },
                    mobike: {
                        date: '',
                        bikeCount: 0,
                        userCount: 0
                    },
                    hellobike: {
                        date: '',
                        bikeCount: 0,
                        userCount: 0
                    },
                    nnbike: {
                        date: '',
                        bikeCount: 0,
                        userCount: 0
                    },
                    qjbike: {
                        date: '',
                        bikeCount: 0,
                        userCount: 0
                    }
                },

                companyList: [],
                bikeCountList: [],
                userCountList: []
            };
        },
        watch: {
            companyList(val) {
                val.forEach(v => {

                    switch (v.name) {
                        case 'ofo单车':
                            this.baseInfo.ofobike.date = MOMENT(v.updateTime).format('YYYY年MM月DD日');
                            break;
                        case '摩拜单车':
                            this.baseInfo.mobike.date = MOMENT(v.updateTime).format('YYYY年MM月DD日');
                            break;
                        case 'hello单车':
                            this.baseInfo.hellobike.date = MOMENT(v.updateTime).format('YYYY年MM月DD日');
                            break;
                        case '99单车':
                            this.baseInfo.nnbike.date = MOMENT(v.updateTime).format('YYYY年MM月DD日');
                            break;
                        case '青桔单车':
                            this.baseInfo.qjbike.date = MOMENT(v.updateTime).format('YYYY年MM月DD日');
                            break;
                    }
                });
            },
            bikeCountList(val) {
                this.companyList.forEach(v => {

                    switch (v.name) {
                        case 'ofo单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.ofobike.bikeCount = val[i].bicycleCount;
                                    break;
                                }
                            }
                            break;
                        case '摩拜单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.mobike.bikeCount = val[i].bicycleCount;
                                    break;
                                }
                            }
                            break;
                        case 'hello单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.hellobike.bikeCount = val[i].bicycleCount;
                                    break;
                                }
                            }
                            break;
                        case '99单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.nnbike.bikeCount = val[i].bicycleCount;
                                    break;
                                }
                            }
                            break;
                        case '青桔单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.qjbike.bikeCount = val[i].bicycleCount;
                                    break;
                                }
                            }
                            break;
                    }
                });
            },
            userCountList(val) {
                this.companyList.forEach(v => {
                    switch (v.name) {
                        case 'ofo单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.ofobike.userCount = val[i].peopleCount;
                                    break;
                                }
                            }
                            break;
                        case '摩拜单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.mobike.userCount = val[i].peopleCount;
                                    break;
                                }
                            }
                            break;
                        case 'hello单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.hellobike.userCount = val[i].peopleCount;
                                    break;
                                }
                            }
                            break;
                        case '99单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.nnbike.userCount = val[i].peopleCount;
                                    break;
                                }
                            }
                            break;
                        case '青桔单车':
                            for (let i = 0; i < val.length; i++) {
                                if (v.id === val[i].id) {
                                    this.baseInfo.qjbike.userCount = val[i].peopleCount;
                                    break;
                                }
                            }
                            break;
                    }
                });
            }
        },
        mounted() {
            this.getCompany();
        },
        methods: {
            getCompany() {
                this.$http({
                    method: 'post',
                    url: '/companyInfo/list'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.companyList = res.data.records || [];
                        this.getBikeCount();
                    }
                });
            },
            getBikeCount() {
                this.$http({
                    method: 'post',
                    url: '/bicycleInfo/companyPercent'
                }).then((res) => {

                    if (res.code === 'SUCCESS') {
                        this.bikeCountList = res.data || [];
                        this.getUserCount();
                    }
                });
            },
            getUserCount() {
                this.$http({
                    method: 'post',
                    url: '/bicycleUser/userPercent'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.userCountList = res.data || [];
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .marketShares-container {
    }

    .set-height {
        height: 400px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .company-info {
        display: flex;
        margin-bottom: 10px;
        padding: 10px;
        background-color: rgba(51,204,255, 0.2);
        border: 1px solid rgba(0,198,255, 0.2);
        border-radius: 5px;
        .logo {
            padding-right: 10px;
            > img {
                width: 60px;
                height: 60px;
                border: 0;
                border-image: none;
            }
        }
        .text-panel {
            flex: 1;
            color: #FFF;
            > div:first-child {
                font-weight: 700;
            }
        }
    }
</style>