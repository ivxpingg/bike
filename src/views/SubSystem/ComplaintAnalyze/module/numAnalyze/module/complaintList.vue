<template>
    <div class="complaintList-container">
        <Modal v-model="modalValue"
               size="small"
               class="custom-modal-style"
               :width="840"
               footer-hide>
            <p slot="header">
                <span>.投诉事件列表</span>
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
                            <!--placeholder="选择企业名称">-->
                        <!--<Option value="1">ofo小黄车</Option>-->
                        <!--<Option value="2">摩拜单车</Option>-->
                        <!--<Option value="3">hello单车</Option>-->
                        <!--<Option value="4">99单车</Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->
                <FormItem>
                    <Button type="info" icon="md-cloud-download" size="small">导出</Button>
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
    import MOMENT from 'moment';
    export default {
        name: 'complaintList',  // 投述事件列表
        mixins: [modalMixin],
        data() {
            return {
                searchParams: {
                    current: 1,
                    size: 10,
                    total: 0,
                    condition: {
                        searchKey: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 60, type: 'index', },
                    { title: '时间', width: 120, align: 'center', key: 'createdon',
                        render:(h, params) => {
                            return h('div', params.row.createdon ? MOMENT(params.row.createdon).format('YYYY-MM-DD') : '');
                        }
                    },
                    { title: '区域', minWidth: 120, align: 'center', key: 'areaname' },
                    // { title: '投诉编号', width: 100, align: 'center', key: 'PETITIONID' },
                    { title: '投诉地点', width: 100, align: 'center', key: 'eventaddress' },
                    { title: '投诉电话', width: 110, align: 'center', key: 'tel' },
                    { title: '投诉来源', width: 100, align: 'center', key: 'sourcewaypath' },
                    { title: '投诉状态', width: 90, align: 'center', key: 'status' }
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
                    url: '/violation/list',
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
    .complaintList-container {
    }
</style>