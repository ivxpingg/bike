<template>
    <div class="header-container">
        <div class="left-panel">
            <div class="btn-icon"
                 v-show="$route.name !== 'home'" @click="onClick_back"><Icon type="ios-arrow-dropleft" /></div>
            <div class="btn-icon" @click="onClick_switch_bg"><Icon type="ios-browsers-outline" /></div>
        </div>
        <div class="center-panel">{{title}}</div>
        <div class="right-panel">
            <span>{{year}}</span>年<span>{{month}}</span>月<span>{{day}}</span>日
            <span style="paddingLeft: 20px;"></span>星期<span>{{week}}</span>
            <span style="paddingLeft: 20px;">{{time}}</span>
        </div>
    </div>
</template>

<script>
    import MOMENT from 'moment';
    export default {
        name: 'mainHeader',
        destroyed() {
            if (this.setTime) {
                clearInterval(this.setTime);
            }
        },
        data() {
            return {
                title: this.$route.meta.title || '',
                d: MOMENT(),
                time: MOMENT().format('HH:mm'),
                setTime: null
            };
        },
        watch: {
            '$route.meta': {
                deep: true,
                handler(val) {
                    if (val) {
                        this.title = val.title;
                    }
                }
            }
        },
        computed: {
            year() {
                return this.d.format('YYYY');
            },
            month() {
                return this.d.format('MM');
            },
            day() {
                return this.d.format('DD');
            },
            week() {
                switch (this.d.format('E')) {
                    case '1': return '一';
                    case '2': return '二';
                    case '3': return '三';
                    case '4': return '四';
                    case '5': return '五';
                    case '6': return '六';
                    case '7': return '七';
                }
            }
        },
        mounted() {
            this.setTime = setInterval(() => {
                this.time = MOMENT().format('HH:mm');
            }, 10000);
        },
        methods: {
            onClick_back() {
                this.$router.push({
                    name: 'home'
                })
            },
            onClick_switch_bg() {
                this.$emit('callback');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header-container {
        position: relative;
        background: url(./img/header-bg.png) no-repeat top center;
        height: 65px;

        .left-panel {
            position: absolute;
            left: 10px;
            top: 0;
            z-index: 2;
            .btn-icon {
                display: inline-block;
                padding: 12px 10px;
                cursor: pointer;
                .ivu-icon {
                    color: #FFF;
                    font-size: 28px;
                    &:hover {
                        color: #5cadff;
                    }
                }
            }
        }
        .center-panel {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            line-height: 63px;
            color: #FFF;
            font-size: 26px;
            font-weight: 700;
            text-align: center;
            letter-spacing: 6px;
        }
        .right-panel {
            position: absolute;
            top: 0;
            right: 10px;
            color: #FFF;
            font-size: 16px;
            line-height: 53px;
            letter-spacing: 1px;
            > span {
                padding: 0 4px;
                color: rgb(0,198,255);
            }
        }
    }
</style>