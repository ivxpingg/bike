<template>
    <div class="userList-container">
        <Modal v-model="modalValue"
               size="small"
               class="custom-modal-style"
               :width="800"
               footer-hide>
            <p slot="header">
                <span>.平台用户</span>
            </p>

            <Form inline>
                <FormItem>
                    <Input v-model="searchParams.condition.searchKey"
                           size="small"
                           class="custom-input-style"
                           placeholder="请输入关键字查找" />
                </FormItem>
                <FormItem>
                    <Select  v-model="searchParams.condition.companyId"
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
    export default {
        name: 'userList',  // 平台用户
        mixins: [modalMixin],
        data() {
            return {
                searchParams: {
                    current: 1,
                    size: 10,
                    total: 120,
                    condition: {
                        searchKey: '',
                        companyId: ''
                    }
                },
                tableColumns: [
                    { title: '序号', width: 60, type: 'index', },
                    { title: '企业名称', width: 90, align: 'center', key: 'companyName' },
                    { title: '用户名称', width: 100, align: 'center', key: '2' },
                    { title: '用户账号', width: 100, align: 'center', key: '3' },
                    { title: '白鹭分', width: 100, align: 'center', key: '4' },
                    { title: '押金', width: 100, align: 'center', key: '5' },
                    { title: '投放日期', width: 120, align: 'center', key: '6' },
                    { title: '用户状态', width: 90, align: 'center', key: '7' }
                ],
                tableData: [],
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
                    url: '/bicycleUser/list',
                    data: JSON.stringify(this.searchParams)
                }).then((res) => {
                    this.tableLoading = false;
                    if (res.code === 'SUCCESS') {
                        debugger
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
    .userList-container {
    }
</style>