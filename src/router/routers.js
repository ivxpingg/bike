

// 首页
const Home = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home/home.vue'),
        meta: {
            title: '可视化分析系统'
        },
    }
];

const System = [
    {
        path: '/BaseInfoAnalyze',
        name: 'BaseInfoAnalyze',
        component: () => import('../views/SubSystem/BaseInfoAnalyze/BaseInfoAnalyze.vue'),
        meta: {
            title: '行业基本情况分析'
        }
    },
    {
        path: '/ComplaintAnalyze',
        name: 'ComplaintAnalyze',
        component: () => import('../views/SubSystem/ComplaintAnalyze/ComplaintAnalyze.vue'),
        meta: {
            title: '投诉统计分析'
        }
    },
    {
        path: '/DemandAnalyze',
        name: 'DemandAnalyze',
        component: () => import('../views/SubSystem/DemandAnalyze/DemandAnalyze.vue'),
        meta: {
            title: '需求特征分析'
        }
    },
    {
        path: '/OperationAnalyze',
        name: 'OperationAnalyze',
        component: () => import('../views/SubSystem/OperationAnalyze/OperationAnalyze.vue'),
        meta: {
            title: '运营效率专题分析'
        }
    },
    {
        path: '/PassengerAnalyze',
        name: 'PassengerAnalyze',
        component: () => import('../views/SubSystem/PassengerAnalyze/PassengerAnalyze.vue'),
        meta: {
            title: '客流特征分析'
        }
    }
];

const App = [
    {
        path: '/',
        name: 'main',
        redirect: '/home',
        component: () => import('../views/Main/main.vue'),
        meta: {},
        children: [
            ...Home,
            ...System
        ]
    }
];



export default App;