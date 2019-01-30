import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld';
import About from '../views/about';
import Form from '../views/form';
import Table from '../views/table';
import TableSlot from '../views/table-slot';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/form',
      component: Form,
    },
    {
      path: '/table',
      component: Table,
    },
    {
      path: '/table/slot',
      component: TableSlot,
    },
  ],
});
