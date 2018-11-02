<template>
    <div class="echartAnalyze_operation_3-container swiper-container" ref="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="slide-panel">
                    <div class="item">
                        <div class="item-bike">
                            <vCommonIcon type="_zihangche" :size="50"></vCommonIcon>
                        </div>
                        <div class="item-text">单车使用率 <span>80%</span></div>
                        <div></div>
                    </div>
                    <div class="item">
                        <div class="item-bike">
                            <vCommonIcon type="_zihangche" :size="50"></vCommonIcon>
                        </div>
                        <div class="item-text">单车使用率 <span>80%</span></div>
                        <div></div>
                    </div>

                    <div class="item">
                        <div class="item-bike">
                            <vCommonIcon type="_zihangche" :size="50"></vCommonIcon>
                        </div>
                        <div class="item-text">单车使用率 <span>80%</span></div>
                        <div></div>
                    </div>

                </div>
            </div>
            <div class="swiper-slide">

            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    import vCommonIcon from '../../../../components/commonIcon/commonIcon';
    export default {
        name: 'echartAnalyze_operation_3',
        components: {vCommonIcon},
        data() {
            return {
                mySwiper: null
            };
        },
        mounted() {
            this.initSwiper();
        },
        methods: {
            initSwiper() {
                this.mySwiper = new Swiper (this.$refs.swiper, {
                    loop: true, // 循环模式选项

                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .echartAnalyze_operation_3-container {
        height: 100%;

        .slide-panel {

            .item {
                display: flex;
                height: 60px;
                padding: 10px 20px;
                line-height: 60px;
                .item-bike{
                    position: relative;
                    margin-right: 20px;

                    .iconfont {
                        color: red;
                    }
                }
                .item-text {
                    flex: 1;
                    color: #FFF;
                    font-size: 16px;
                    > span  {
                        padding-left: 5px;
                        font-size: 20px;
                        color: #199ed8;
                    }
                }
            }

        }
    }
</style>