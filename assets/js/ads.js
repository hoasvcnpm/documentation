/** 
 * ads
 */
(function(){

	// if(location.hostname.indexOf('photoboxcom.com') == -1) return;

	let script = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5261703613038425" crossorigin="anonymous"></script>';
	
	document.querySelector('head').innerHTML += script;

	function scroll(){
		section.forEach(e => {
			if(e.getAttribute('data-added') != 1 && window.scrollY + window.innerHeight >= e.offsetTop ) {
				e.setAttribute('data-added', 1);

				e.innerHTML = html;

				count++;

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

	var section = document.querySelectorAll('.ads-section'),
		count = 0,
		html = '';
	
	if(section.length>0) {

		// html = '<img src="https://ps.w.org/cf7-preview/assets/icon-128x128.png?rev=3007867" alt="" />';

		html = script + '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-5261703613038425" data-ad-slot="8088219191" data-ad-format="auto"></ins>';

		window.addEventListener('scroll', scroll, false);
		scroll();
	}
    
})();