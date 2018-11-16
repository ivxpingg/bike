<template>
    <div class="operationStatistics-container">
        <Modal v-model="modalValue"
               size="small"
               class="custom-modal-style"
               :width="1120"
               footer-hide>
            <p slot="header">
                <span>.运 营 数 据 统 计</span>
            </p>

            <Form inline>
                <FormItem>
                    <Input v-model="searchParams.condition.searchKey"
                           size="small"
                           class="custom-input-style"
                           placeholder="请输入关键字查找" />
                </FormItem>
                <!--<FormItem>-->
                    <!--<Select size="small"-->
                            <!--class="custom-input-style"-->
                            <!--clearable-->
                            <!--placeholder="选择区域">-->
                        <!--<Option value="1">思明区</Option>-->
                        <!--<Option value="2">湖里区</Option>-->
                        <!--<Option value="3">同安区</Option>-->
                        <!--<Option value="4">集美区</Option>-->
                        <!--<Option value="5">海沧区</Option>-->
                        <!--<Option value="6">翔安区</Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->
                <!--<FormItem>-->
                    <!--<Select size="small"-->
                            <!--class="custom-input-style"-->
                            <!--clearable-->
                            <!--placeholder="选择企业名称">-->
                        <!--<Option value="1">ofo小黄车</Option>-->
                        <!--<Option value="2">摩拜单车</Option>-->
                        <!--<Option value="3">hello单车</Option>-->
                        <!--<Option value="4">99单车</Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->
                <FormItem>
                    <Button type="info" :to="toDownUrl" icon="md-cloud-download" size="small" target="_blank">导出</Button>
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
    </div>
</template>

<script>
    import modalMixin from '../../../../../../lib/mixin/modalMixin';
    import Config from '../../../../../../config';
    export default {
        name: 'operationStatistics',  // 运 营 数 据 统 计
        mixins: [modalMixin],
        computed: {
            toDownUrl() {
                return  Config[Config.env].origin + Config[Config.env].ajaxUrl + '/statistics/exportExcel';
            }
        },
        data() {
            return {
                searchParams: {
                    current: 1,
                    size: 10,
                    total: 120,
                    condition: {
                        searchKey: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 60, type: 'index', },
                    { title: '时间', width: 120, align: 'center', key: 'record_date' },
                    { title: 'ofo', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = `${params.row.ofobikecount}车次，${params.row.ofobikemileage}km`;
                            return h('div', str);
                        }
                    },
                    { title: '摩拜单车', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = `${params.row.mobikecount}车次，${params.row.mobikemileage}km`;
                            return h('div', str);
                        }
                    },
                    { title: 'hello单车', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = `${params.row.hellobikecount}车次，${params.row.hellobikemileage}km`;
                            return h('div', str);
                        }
                    },
                    { title: '99单车', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = `${params.row['99bikecount']}车次，${params.row['99bikemileage']}km`;
                            return h('div', str);
                        }
                    },
                    { title: '合计', width: 180, align: 'center',
                        render: (h, params) => {
                            let str = `${params.row['allbikecount']}车次，${params.row['allmileage']}km`;
                            return h('div', str);
                        }
                    },
                ],
                tableData: [],
                tableLoading: false
            };
        },
        watch: {
            'searchParams.current'() {
                this.getData();
            },
            'searchParams.condition': {
                deep: true,
                handler() {
                    this.getData();
                }
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            /**
             * 分页控件-切换页面
             * @param current
             */
            onPageChange(current) {
                this.searchParams.current = current;
            },
            // 获取表格数据
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/statistics/list',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        this.tableData = res.data.records;
                        this.searchParams.total = res.data.total;
                    }
                }).catch(() => {
                    this.tableLoading = false;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .operationStatistics-container {
    }
</style>