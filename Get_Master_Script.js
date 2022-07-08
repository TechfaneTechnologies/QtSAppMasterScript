function delay(time) {
   return new Promise(function(resolve) {
       setTimeout(resolve, time)
   });
}


(async () => {
    require('dotenv').config()
    const path = require('path')
    const downloadPath = path.resolve('./')
    // console.log(downloadPath)
    const puppeteer = require('puppeteer')
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     args: [
    //         '--incognito',
    //     ],
    // })
    // const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const context = await browser.CreateIncognitoBrowserContextAsync();
    const page = await context.newPage();
    console.log(browser.defaultBrowserContext().isIncognito())
    await page.goto('https://web.quantsapp.com/signin')

    await page.setViewport({ width: 1517, height: 773 })

    await page.waitForSelector('#mat-input-1')
    await page.click('#mat-input-1')
    await page.focus('#mat-input-1')
    await page.type("#mat-input-1", process.env.USER_NAME, {delay: 100})

    await page.waitForSelector('#mat-input-2')
    await page.click('#mat-input-2')
    await page.focus('#mat-input-2')
    await page.type("#mat-input-2", process.env.PASSWORD, {delay: 100})

    await page.waitForSelector('.ng-star-inserted > #slide > .login-form > .ng-dirty > .login-btn')
    await page.click('.ng-star-inserted > #slide > .login-form > .ng-dirty > .login-btn')
    await page._client().send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: downloadPath})

    await page.waitForTimeout(20000)
    // await delay(4000);
    await page.evaluate(() => {
            function download(content, fileName, contentType) {
                var a = document.createElement("a");
                var file = new Blob([content], {type: contentType});
                a.href = URL.createObjectURL(file);
                a.download = fileName;
                a.click();
            }
            download(localStorage.masterScript, 'masterScript.json', 'text/plain');
            download(localStorage.rawMS, 'rawMS.json', 'text/plain');
            download(localStorage.masterScriptVersion, 'masterScriptVersion.json', 'text/plain');
            download(localStorage.marketTimings, 'marketTimings.json', 'text/plain');
            // download(localStorage.lastExpiry, 'lastExpiry.json', 'text/plain');
        })
    // await page.waitForSelector('#profileMenuBtn')
    // await page.click('#profileMenuBtn')

    // await page.waitForSelector('#mat-menu-panel-0 > div')
    // await page.click('#mat-menu-panel-0 > div')

    // await page.waitForSelector('#mat-menu-panel-0 > div > button:nth-child(9)')
    // await page.click('#mat-menu-panel-0 > div > button:nth-child(9)')

    await page.waitForTimeout(10000)
    // await browser.closeAsync()
})()

