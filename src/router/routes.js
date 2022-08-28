
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'credentials', component: () => import('src/pages/UserPage.vue') },
      {
        path:'clientList',
        name:'clientList',
        component: () => import('src/pages/Clients/Index'),
        children:[
          {
            path: '/',
            name: 'list',
            component: () => import('src/pages/Clients/List')
          },
          {
            path: 'add',
            name: 'add',
            component: () => import('src/pages/Clients/Add')
          },
          {
            path: ':id/edit',
            name: 'edit',
            component: () => import('src/pages/Clients/Add')
          },
          {
            path: ':id/view',
            name: 'view',
            component: () => import('src/pages/Clients/View')
          },
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
