<template>
    <div class="bicycleList-container">
        <Modal v-model="modalValue"
               size="small"
               class="custom-modal-style"
               :width="820"
               footer-hide>
            <p slot="header">
                <span>.市场投放单车</span>
            </p>

            <Form inline>
                <FormItem>
                    <Input v-model="searchParams.condition.searchKey"
                           size="small"
                           class="custom-input-style"
                           placeholder="请输入关键字查找" />
                </FormItem>
                <FormItem>
                    <Select v-model="searchParams.condition.companyId"
                            size="small"
                            class="custom-input-style"
                            clearable
                            placeholder="选择企业名称">
                        <Option v-for="item in companyList"
                                :value="item._id"
                                :label="item.name"
                                :key="item._id"></Option>

                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="info" icon="md-cloud-download" :to="toDownUrl" target="_blank" size="small">导出</Button>
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
        name: 'bicycleList',   // 市场投放单车
        mixins: [modalMixin],
        computed: {
            toDownUrl() {
                return  Config[Config.env].origin + Config[Config.env].ajaxUrl + '/bicycleInfo/exportExcel';
            }
        },
        data() {
            return {
                searchParams: {
                    current: 1,
                    size: 7,
                    total: 0,
                    condition: {
                        searchKey: '',
                        companyId: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 60, type: 'index', },
                    { title: '企业名称', width: 90, align: 'center', key: 'companyName' },
                    { title: '车辆编号', width: 100, align: 'center', key: '' },
                    { title: '车锁编号', width: 120, align: 'center', key: 'lockId' },
                    { title: '牌照号码', width: 100, align: 'center', key: '' },
                    { title: '合格证编码', width: 100, align: 'center', key: '' },
                    { title: '投放日期', width: 120, align: 'center', key: 'launchDate' },
                    { title: '运行状态', width: 90, align: 'center', key: 'status' }
                ],
                tableData: [

                ],
                tableLoading: false,

                companyList: []
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
            this.getCompany();
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
            getCompany() {
                this.$http({
                    method: 'post',
                    url: '/companyInfo/list'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.companyList = res.data.records || [];
                    }
                });
            },
            // 获取表格数据
            getData() {
                this.tableLoading = true;
                this.$http({
                    method: 'post',
                    url: '/bicycleInfo/list',
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bicycleList-container {
    }
</style>