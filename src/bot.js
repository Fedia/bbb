function sleep(sec) {
  return new Promise((wakeup) => setTimeout(wakeup, sec * 1000));
}

function waitFor(w, selector, sec = 10) {
  return (
    w.document.querySelector(selector) ||
    new Promise((resolve) => {
      const mo = new MutationObserver(() => {
        const el = w.document.querySelector(selector);
        if (el) {
          mo.disconnect();
          resolve(el);
        }
      });
      mo.observe(w.document.body, { childList: true, subtree: true });
      setTimeout(() => {
        mo.disconnect();
        resolve();
      }, sec * 1000);
    })
  );
}

const AsyncFunction = async function () {}.constructor;

export function runBot(code) {
  const fn = AsyncFunction('sleep,waitFor,window,document', code);
  const win = window.open(location.href, '_bbb');
  return fn(sleep, waitFor, win, win.document);
}
