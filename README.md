# Browser Bot Bookmarklet

BBB is a framework for website automation and content scraping. It lives in a bookmarklet and runs Javascript bots.

**Warning!** Back up your scripts manually! Bookmarklet doesn't have a persistent storage.

## Bookmarklet

1. [Visit the bookmarklet editor](https://www.taosdev.com/bookmarklet-devkit/#EQZwvAJg9gxgrgWwKYDsAuA6GAnJBDNJAUQBsll0AKAHVBwEsAHNWgSgG4QMRsYxaAFmjSMQALgD0EgGZII9PBgDm9NALgAjDPSgSN+vfowArELXbR4FTBqgQAnhjyNGqCAGEB9EhEohWwEA)
2. Locate <u>Drag me to bookmark bar</u> link on the right
3. Drag this link to the bookmark bar (`Ctrl+Shift+B` in Chrome)


## Bot API

```javascript
main.window // main browser window controlled by a bot
main.document // current document
main.location // same as main.window.location

await sleep(3) // wait for 3 seconds

let el = await main.waitFor(".selector") // behaves like querySelector(), but waits for the element to appear in DOM
let el = await main.waitFor(".selector", 5) // wait for 5 seconds (10 by default)

// querySelector shortcuts
main.$(".selector") // same as main.document.querySelector
main.$$(".selector") // main.document.querySelectorAll as Array

// Open new windows/tabs if one main window is not enough
// Same-origin policy prevents your bot from visiting other domains!
let tab2 = open("https://...") // behaves like native window.open()
let el2 = await tab.waitFor(".selector") // same API as for the main window
```

## Debugging

Use developer tools to debug your bot's anonymous function: `console.log()` and `debugger;` work perfectly fine.

## Examples

```javascript
// Run on finance.yahoo.com
main.location.href = "https://finance.yahoo.com/most-active?offset=0&count=100";

await main.waitFor("#scr-res-table") // wait for DOM element

let elements = main.$$("#scr-res-table [data-field=regularMarketChangePercent]"); // same as querySelectorAll

// scrape data
let data = elements.map(el => [el.dataset.symbol, el.getAttribute("value")]);

// convert to csv and download
let csv = "symbol;change\n" + data.map(row => row.join(";")).join("\n");
const link = document.createElement("a");
link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
link.download = "finance.csv";
link.target = "_blank";
document.body.appendChild(link);
link.click();
```