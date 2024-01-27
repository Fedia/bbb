function open(url, target, params) {
  const w = window.open(url, target, params);
  return {
    window: w,
    $: (sel) => w.document.querySelector(sel),
    $$: (sel) => Array.from(w.document.querySelectorAll(sel)),
    get document() {
      return w.document;
    },
    get location() {
      return w.location
    },
    async waitFor(sel, sec = 10) {
      for (let i = 0; i < sec; i++) {
        let el = this.$(sel);
        if (el) return el;
        await sleep(1);
      }
      return this.$(sel);
    }
  }
}

function sleep(sec) {
  return new Promise((wakeup) => setTimeout(wakeup, sec * 1000));
}

const AsyncFunction = async function () {}.constructor;

export function runBot(code) {
  const fn = AsyncFunction('sleep,open,main', code);
  return fn(sleep, open, open(location.href, '_bbb'));
}
