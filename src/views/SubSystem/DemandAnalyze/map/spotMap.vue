<template>
    <div class="spotMap-container">
        <div class="map"  id="spot_map"></div>

        <div class="btn-icon cus-btn-icon" @click="onClick_search"><Icon type="ios-search" /></div>

        <Modal v-model="modal_hotArea"
               class="custom-modal-style"
               :width="900"
               footer-hide>
            <p slot="header">
                <span>.热点区域</span>
            </p>
            <Form inline>
                <FormItem>
                    <Input v-model="searchParams.condition.searchKey"
                           size="small"
                           class="custom-input-style"
                           placeholder="请输入关键字查找" />
                </FormItem>
                <FormItem>
                    <Button type="info" icon="ios-eye" size="small" @click="onClick_open_param">分析</Button>
                </FormItem>
            </Form>
            <div class="ivx-table-box">
                <Table class="custom-table-style"
                       size="small"
                       :height="350"
                       :columns="tableColumns"
                       :data="tableData"></Table>
                <Page prev-text="上一页"
                      next-text="下一页"
                      size="small"
                      show-total
                      class="custom-page-style"
                      :current="searchParams.current"
                      :page-size="searchParams.size"
                      :total="searchParams.total"
                      @on-change="onPageChange"></Page>
            </div>
        </Modal>

        <Modal v-model="modal_param"
               class="custom-modal-style"
               :width="350">
            <p slot="header">
                <span>.分析</span>
            </p>
            <Form ref="form"
                  class="my-form"
                  :model="formData"
                  :rules="rules"
                  :label-width="80">
                <FormItem label="选择时间:" prop="recordTime">
                    <!--<Input v-model="formData.time" size="small" class="custom-input-style" />-->
                    <DatePicker :value="formData.recordTime" type="datetime" class="custom-input-style" style="width: 200px"
                                @on-change="onChange_time"
                                format="yyyy-MM-dd HH:00:00" placeholder="请选择日期和时间" ></DatePicker>
                </FormItem>
                <FormItem label="分析半径:" prop="radius">
                    <Input v-model="formData.radius" number size="small" style="width: 200px" placeholder="输入分析半径(米)" class="custom-input-style" />
                </FormItem>
                <FormItem label="车辆数量:" prop="minpts">
                    <Input v-model="formData.minpts" number size="small" style="width: 200px" placeholder="请输入车数辆" class="custom-input-style" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="small" @click="add_search">确定</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import initBMap from './initBMap';
    import MOMENT from 'moment';
    export default {
        name: 'spotMap',
        data() {
            return {
                searchParams: {
                    current: 1,      // 当前第几页
                    size: 7,      // 每页几行
                    total: 0,     // 总行数
                    condition: {
                        searchKey: ''
                    }
                },
                map: null,
                points: [],

                tableColumns: [
                    { title: '序号', width: 60, type: 'index', },
                    { title: '时间', width: 160, align: 'center', key: 'recordTime',
                        render: (h, params) => {
                            return h ('span', MOMENT(params.row.recordTime).format('YYYY-MM-DD HH:mm'));
                        }
                    },
                    { title: '分析半径(米)', width: 120, align: 'center', key: 'radius' },
                    { title: '车辆数(辆)', width: 120, align: 'center', key: 'minpts' },
                    { title: '分析结果(个)', width: 120, align: 'center', key: 'totalNum' },
                    { title: '状态', width: 120, align: 'center',
                        render: (h, params) => {
                            let color, text;

                            switch (params.row.status) {
                                case '0': color = 'rgb(0, 102, 255)'; text = '计算中...'; break;
                                case '1': color = 'rgb(0, 255,153)'; text = '已完成'; break;
                                case '2': color = '#ed4014'; text = '失败'; break;
                            }

                            return h('span', {
                                style: {
                                    color: color
                                }
                            }, text)
                        }
                    },
                    { title: '操作', width: 160, align: 'center',
                        render: (h, params) => {
                            let list = [];
                            if (params.row.status === 'complete') {
                                list.push(h('a', {
                                    style: {
                                        color: '#FFF',
                                        'text-decoration': 'underline',
                                        'padding-left': '7px',
                                        'padding-right': '7px'
                                    },
                                    on: {
                                        click() {
                                            if (!this.map) {
                                                this.$Message.info('地图初始化中,请稍后...');
                                            }
                                            this.getData_for_map(params.rows.id);
                                            this.modal_hotArea = false;
                                        }
                                    }
                                }, '地图查看'));
                                // list.push(h('a', {
                                //     style: {
                                //         color: '#FFF',
                                //         'text-decoration': 'underline',
                                //         'padding-left': '7px',
                                //         'padding-right': '7px'
                                //     },
                                //     on: {
                                //         click() {
                                //
                                //         }
                                //     }
                                // }, '导出坐标'));
                            }

                            return h('div', list);
                        }
                    },
                ],
                tableData: [
                    {
                        '1': '2018-9-1 18:00',
                        '2': '20000',
                        '3': '200',
                        '4': '112',
                        'status': '0'
                    },
                    {
                        '1': '2018-9-1 18:00',
                        '2': '20000',
                        '3': '200',
                        '4': '112',
                        'status': '1'
                    },
                    {
                        '1': '2018-9-1 18:00',
                        '2': '20000',
                        '3': '200',
                        '4': '112',
                        'status': '2'
                    },
                    { '1': '2018-9-1 18:00', '2': '20000',  '3': '200', '4': '112', 'status': '34' },
                    { '1': '2018-9-1 18:00', '2': '20000',  '3': '200', '4': '112', 'status': '34' },
                    { '1': '2018-9-1 18:00', '2': '20000',  '3': '200', '4': '112', 'status': '34' },
                    { '1': '2018-9-1 18:00', '2': '20000',  '3': '200', '4': '112', 'status': '34' },

                ],

                // 新

                modal_hotArea: false,

                modal_param: false,
                formData: {
                    recordTime: '',
                    radius: null,
                    minpts: null
                },
                rules: {
                    recordTime: [{ required: true, message: '日期不能为空！', trigger: 'blur' }],
                    radius: [
                        { required: true, type: 'number', message: '分析半径不能为空！', trigger: 'blur' },
                        { type: 'number', message: '分析半径必须是数值！', trigger: 'blur'}],
                    minpts: [{ required: true, type: 'number', message: '车辆数量不能为空！', trigger: 'blur' },
                        {type: 'number', message: '车辆数量必须是数值！', trigger: 'blur'}]
                }
            };
        },
        mounted() {
            initBMap('spot_map').then((m) => {
                this.map = m;
                // this.getData();
            });

            this.getTableData();
        },
        methods: {
            /**
             * 分页控件-切换页面
             * @param current
             */
            onPageChange(current) {
                this.searchParams.current = current;
            },
            onChange_time(value) {
                this.formData.recordTime = value;
            },
            // 旧
            getData() {
                this.$http({
                    method: 'post',
                    url: '/bikeStatus/list',
                    timeout: 1000000,
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.test(res.data.records);
                })
            },
            test(list) {
                list.forEach((val) => {

                    let p = val.cur_position.split(',');
                    this.points.push({
                        geometry: {
                            type: 'Point',
                            coordinates: [p[1], p[0]]
                        },
                        count: 20
                    });
                });

                var options = {
                    fillStyle: 'rgba(255, 50, 50, 0.6)',
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    methods: {
                        click: function (item) {
                            console.log(item);
                        }
                    },
                    size: 15,
                    draw: 'simple'
                };
                var dataSet = new mapv.DataSet(this.points);
                var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);

            },
            test2() {

                var randomCount =10000;

                var data = [];

                var citys = ["北京","天津","上海","重庆","石家庄","太原","呼和浩特","哈尔滨","长春","沈阳","济南","南京","合肥","杭州","南昌","福州","郑州","武汉","长沙","广州","南宁","西安","银川","兰州","西宁","乌鲁木齐","成都","贵阳","昆明","拉萨","海口"];

                // 构造数据
                while (randomCount--) {
                    var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
                    data.push({
                        geometry: {
                            type: 'Point',
                            coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
                        },
                        count: 30 * Math.random()
                    });
                }
                console.dir(data.length);

                var dataSet = new mapv.DataSet(data);

                var options = {
                    fillStyle: 'rgba(255, 50, 50, 0.6)',
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    methods: {
                        click: function (item) {
                            console.log(item);
                        }
                    },
                    size: 5,
                    draw: 'simple'
                }

                var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);

            },

            // 新
            onClick_search() {
                this.modal_hotArea = true;
            },
            onClick_open_param() {
                this.modal_param = true;
            },

            // 获取表格数据
            getTableData() {
                this.$http({
                    method: 'post',
                    url: '/hotAreaStatus/list',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data.records;
                        this.searchParams.total = res.data.total;
                    }
                })
            },
            // 添加分析
            add_search() {
                this.$refs.form.validate(valide => {
                    if (valide) {
                        this.$Spin.show();
                        this.$http({
                            method: 'post',
                            url: '/orbit/getHotArea',
                            data: JSON.stringify(this.formData)
                        }).then((res) => {
                            this.$Spin.hide();
                            this.modal_param = false;
                            if (res.code === 'SUCCESS') {
                                this.getTableData();
                            }
                        }).catch(err => {
                           this.$Spin.hide();
                        })
                    }
                    else {

                    }
                })
            },

            // 获取表格单条数据结果，用于地图展示
            getData_for_map(id) {
                this.$http({
                    method: 'get',
                    url: '/hotArea/list',
                    params: {
                        id: id
                    }

                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.renderPoint(res.data);
                    }
                })
            },

            // 渲染地图结果
            renderPoint(list) {
                list.forEach((val) => {

                    let p = [val.latitude, val.longitude];
                    this.points.push({
                        geometry: {
                            type: 'Point',
                            coordinates: [p[1], p[0]]
                        },
                        count: 20
                    });
                });

                var options = {
                    fillStyle: 'rgba(255, 50, 50, 0.6)',
                    shadowColor: 'rgba(255, 50, 50, 1)',
                    shadowBlur: 30,
                    globalCompositeOperation: 'lighter',
                    methods: {
                        click: function (item) {

                        }
                    },
                    size: 15,
                    draw: 'simple'
                };
                var dataSet = new mapv.DataSet(this.points);
                var mapvLayer = new mapv.baiduMapLayer(this.map, dataSet, options);

            }
        }
    }
</script>

<style lang="scss" scoped>
    .spotMap-container {
        position: relative;
        height: 100%;
        .map {
            height: 100%;
        }

        .cus-btn-icon {
            position: absolute;
            top: 0;
            left: 120px;
            z-index: 999;
            &.btn-icon {
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
    }
</style>

<style lang="scss">
    .my-form {
        &.ivu-form .ivu-form-item-label {
            color: #33CCFF;
        }
    }
    // 去掉百度地图Logo
    .anchorBL {
        display: none;
    }
</style>