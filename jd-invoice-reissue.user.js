// ==UserScript==
// @name         京东换开发票
// @namespace    https://liasica.com/
// @version      0.1
// @description  一键填充发票信息
// @author       liasica
// @match        https://myivc.jd.com/fpzz/hkfpReqForIvcCenter.action*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    const company = '';
    const companySn = '';

    if (document.URL.indexOf('fpzz') > 0) {
        const btn = document.createElement('button');

        btn.innerHTML = '换开发票'
        btn.style.cssText = 'margin-left: 20px;'

        btn.addEventListener('click',function(){
            doChange();
        });

        document.querySelector('#ivcContentDiv').appendChild(btn);

        setTimeout(() => {
            doChange();
        }, 200);
    }

    function doChange() {
        if (document.querySelector('#company').value == company && document.querySelector('#taxNo').value == companySn) {
            history.back();
            return;
        }
        saveIvcContent(100);
        const select = document.querySelector('#ivcTitleType');
        select.value = 5;
        select.dispatchEvent(new Event('change'));
        document.querySelector('#company').value = company;
        document.querySelector('#taxNo').value = companySn;
        document.querySelector('.btn-1.mr20').click();
        const interval = setInterval(() => {
          if (document.querySelector('.ui-dialog .title-main')) {
            clearInterval(interval);
            history.back();
            // window.location.reload(history.back());
          }
        }, 100);
    }
})();
