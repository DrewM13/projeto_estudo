
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
            name: 'clientList',
            component: () => import('src/pages/Clients/List')
          },
          {
            path: 'add',
            name: 'addClient',
            component: () => import('src/pages/Clients/Add')
          },
          {
            path: ':id/edit',
            name: 'editClient',
            component: () => import('src/pages/Clients/Add')
          },
          {
            path: ':id/view',
            name: 'viewClient',
            component: () => import('src/pages/Clients/View')
          },
        ]
      },
      {
        path:'administrator',
        name:'administrator',
        component: () => import('src/pages/administrator/Index'),
        children:[
          {
            path: '/',
            name: 'administrator',
            component: () => import('src/pages/administrator/List')
          },
          {
            path: 'add',
            name: 'addAdministrator',
            component: () => import('src/pages/administrator/Add')
          },
          {
            path: ':id/edit',
            name: 'editAdministrator',
            component: () => import('src/pages/administrator/Add')
          },
          {
            path: ':id/view',
            name: 'viewAdministrator',
            component: () => import('src/pages/administrator/View')
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
