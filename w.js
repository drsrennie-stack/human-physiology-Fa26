const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('http://localhost:8765/week-02.html');await p.waitForTimeout(500);await p.screenshot({path:'shots/week02_full.png',fullPage:true});
await p.goto('http://localhost:8765/lecture-week.html?week=1');await p.waitForTimeout(500);await p.screenshot({path:'shots/lw1.png',fullPage:true});
await b.close();})();
