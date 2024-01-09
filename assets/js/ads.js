/** 
 * ads
 */
(function(){

	if(location.hostname.indexOf('photoboxone') == -1) return;

	function add_adsbygoogle(){
		let script = document.createElement('script');
		
		script.async = 1;
		script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5261703613038425";
		script.setAttribute('crossorigin', 'anonymous');

		document.querySelector('head').appendChild(script);
	}

	function add_ampjs(){
		let script = document.createElement('script');
		
		script.async = 1;
		script.src = "https://cdn.ampproject.org/v0/amp-ad-0.1.js";
		script.setAttribute('custom-element', 'amp-ad');

		document.querySelector('head').appendChild(script);
	}
	
	function scroll(){
		let count = 0;
		
		section.forEach(e => {
			if(e.getAttribute('data-added') != 1) {
				e.setAttribute('data-added', 1);

				// e.appendChild(script);

				e.innerHTML = html;

				// count++;

				e.classList.remove('d-none');

				// (adsbygoogle = window.adsbygoogle || []).push({});
				if(typeof window.adsbygoogle == 'undefined') window.adsbygoogle = [];
				window.adsbygoogle.push({});
			}
		});
		
		if(count >= section.length) {
			window.removeEventListener('scroll',function(){});
		}
	}

	function is_mobile(){
		var win = window,
			doc = document,
			docElem = doc.documentElement,
			body = doc.getElementsByTagName('body')[0];

		return parseInt(win.innerWidth || docElem.clientWidth || body.clientWidth)<=768;
	}

	// add_adsbygoogle();
	
	if(is_mobile()){
		add_ampjs();
	}

	var section = document.querySelectorAll('.ads-section'),		
		html = '';
	
	if(section.length>0) {

		// html = '<img src="https://ps.w.org/cf7-preview/assets/icon-128x128.png?rev=3007867" alt="" />';

		if(is_mobile()){
			html = '<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-5261703613038425" data-ad-slot="8088219191" data-auto-format="rspv" data-full-width=""><div overflow=""></div></amp-ad>';
		} else {
			html = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-5261703613038425" data-ad-slot="8088219191" data-ad-format="auto"></ins>';
		}
		
		// window.addEventListener('scroll', scroll, false);
		scroll();
	}
    
})();