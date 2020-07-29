import router from "../router";
import NProgress from "nprogress";

router.beforeEach((to, from, next) => {
  console.log("beforeEach:to=" + to.path, " from=" + from.path);
  NProgress.start();
  next();
});

router.afterEach(to => {
  NProgress.done();
  document.title = to.meta.title;
});

router.onError(error => {
  console.error("【router error】:", JSON.stringify(error));
  // 源代码： Loading chunk "+e+" failed.
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
    location.reload();
    // const targetPath = $router.history.pending.fullPath;
    // $router.replace(targetPath);
  } else {
    window.location.href =
      `${window.location.protocol}` + "//" + `${window.location.host}`;
  }
});
