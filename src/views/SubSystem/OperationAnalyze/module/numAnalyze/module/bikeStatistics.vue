<template>
    <div class="bikeStatistics-container">
        <Modal v-model="modalValue"
               size="small"
               class="custom-modal-style"
               :width="840"
               footer-hide>
            <p slot="header">
                <span>.车 辆 营 运 统 计</span>
            </p>

            <Form inline>
                <FormItem>
                    <Input v-model="searchParams.condition.searchKey"
                           size="small"
                           class="custom-input-style"
                           placeholder="请输入关键字查找" />
                </FormItem>
                <FormItem>
                    <Select size="small"
                            class="custom-input-style"
                            clearable
                            placeholder="选择企业名称">
                        <Option value="1">ofo小黄车</Option>
                        <Option value="2">摩拜单车</Option>
                        <Option value="3">hello单车</Option>
                        <Option value="4">99单车</Option>
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
        name: 'bikeStatistics',  // 车辆营运统计
        mixins: [modalMixin],
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
                    { title: '车辆编号', width: 100, align: 'center', key: '1' },
                    { title: '投入使用时间', width: 120, align: 'center', key: '2' },
                    { title: '所属平台', width: 100, align: 'center', key: '3' },
                    { title: '累计使用次', width: 100, align: 'center', key: '4' },
                    { title: '累计行驶里程', width: 110, align: 'center', key: '5' },
                    { title: '是否出现故障', width: 120, align: 'center', key: '6' },
                    { title: '车辆状态', width: 90, align: 'center', key: '7' }
                ],
                tableData: [
                    {
                        '1': 'DF120000',
                        '2': '2018年9月21日',
                        '3': 'ofo小黄车',
                        '4': '130',
                        '5': '100km',
                        '6': '否',
                        '7': '故障'
                    },
                    {
                        '1': 'DF120000',
                        '2': '2018年9月21日',
                        '3': 'ofo小黄车',
                        '4': '130',
                        '5': '100km',
                        '6': '否',
                        '7': '故障'
                    },
                    {
                        '1': 'DF120000',
                        '2': '2018年9月21日',
                        '3': 'ofo小黄车',
                        '4': '130',
                        '5': '100km',
                        '6': '否',
                        '7': '故障'
                    },
                    {
                        '1': 'DF120000',
                        '2': '2018年9月21日',
                        '3': 'ofo小黄车',
                        '4': '130',
                        '5': '100km',
                        '6': '否',
                        '7': '故障'
                    },
                    {
                        '1': 'DF120000',
                        '2': '2018年9月21日',
                        '3': 'ofo小黄车',
                        '4': '130',
                        '5': '100km',
                        '6': '否',
                        '7': '故障'
                    }
                ],
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
                    url: '/',
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
    .bikeStatistics-container {
    }
</style>