"use strict";

/* ====== Define JS Constants ====== */
const sidebarToggler = document.getElementById('docs-sidebar-toggler');
const sidebar = document.getElementById('docs-sidebar');
const sidebarLinks = document.querySelectorAll('#docs-sidebar .scrollto');

/* ===== Responsive Sidebar ====== */
window.onload=function() 
{ 
    responsiveSidebar();

    documentation();
};
window.onresize=function() 
{ 
    responsiveSidebar(); 
};

function responsiveSidebar() {
    let w = window.innerWidth;
	if(w >= 1200) {
	    // if larger 
	    // console.log('larger');
		sidebar.classList.remove('sidebar-hidden');
		sidebar.classList.add('sidebar-visible');
		
	} else {
	    // if smaller
	    // console.log('smaller');
	    sidebar.classList.remove('sidebar-visible');
		sidebar.classList.add('sidebar-hidden');
	}
};
sidebarToggler.addEventListener('click', () => {
	if (sidebar.classList.contains('sidebar-visible')) {
		// console.log('visible');
		sidebar.classList.remove('sidebar-visible');
		sidebar.classList.add('sidebar-hidden');
		
	} else {
		// console.log('hidden');
		sidebar.classList.remove('sidebar-hidden');
		sidebar.classList.add('sidebar-visible');
	}
});

/* ===== Smooth scrolling ====== */
/*  Note: You need to include smoothscroll.min.js (smooth scroll behavior polyfill) on the page to cover some browsers */
/* Ref: https://github.com/iamdustan/smoothscroll */
sidebarLinks.forEach((sidebarLink) => {
	
	sidebarLink.addEventListener('click', (e) => {
		
		e.preventDefault();
		
		var target = sidebarLink.getAttribute("href").replace('#', '');
		
		//console.log(target);
		
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
        
        
        //Collapse sidebar after clicking
		if (sidebar.classList.contains('sidebar-visible') && window.innerWidth < 1200){
			
			sidebar.classList.remove('sidebar-visible');
		    sidebar.classList.add('sidebar-hidden');
		} 
		
    });
	
});

/* ===== Gumshoe SrollSpy ===== */
/* Ref: https://github.com/cferdinandi/gumshoe  */
// Initialize Gumshoe
var spy = new Gumshoe('#docs-nav a', {
	offset: 69, //sticky header height
});

/* ====== SimpleLightbox Plugin ======= */
/*  Ref: https://github.com/andreknieriem/simplelightbox */
var lightbox = new SimpleLightbox('.simplelightbox a', {/* options */});

/* ====== My documentation ======= */
function documentation(){

	// The slug plugin in the WordPress
	let slug = location.href.indexOf('.html'),
		website = document.querySelector('#website-url');

	if(slug > -1) {
		slug = location.href.split('/').pop().split('.html').shift();
		
		document.querySelectorAll('.docs-section a[href*="http"]').forEach((e) => {
			let href = e.getAttribute('href');
	
			e.setAttribute('href', href + (href.indexOf('?') > -1 ? '&' : '?') + 'utm_term=' + slug + '&utm_medium=' + slug + '&utm_source=' + location.hostname);
		});
	}
	
	document.querySelectorAll('.website-url').forEach( e => {
		e.setAttribute('data-href', e.getAttribute('href'));
	});
	
	if(website != null) {
		website.addEventListener('change', function(){
			setUrl( this.value );
		}, false);
		
		if(website.value != '') {
			setUrl( website.value );
		}
	}

	loadYoutubeScript()
}

function setUrl( url )
{
	let n = url.length;

	if(url!='' && url.substring(0,4) == 'http') {
		if(url.substring(n-1, n) == '/') {
			url = url.substring(0, n-1);
		}
	} else {
		url = '';
	}
	
	document.querySelectorAll('.website-url').forEach( e => {
		e.setAttribute('href', url + e.getAttribute('data-href'));
	});
}

function loadYoutubeScript()
{
	window.yt_players = document.querySelectorAll('.yt-player');

	if(yt_players.length == 0) return ;
	
	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	window.addEventListener('message', e => {
		console.log('message', e.origin);
	}, false);
}

function onYouTubeIframeAPIReady() 
{
	yt_players.forEach(item => {
		item.player = new YT.Player(item, {
			height: '390',
			width: '640',
			videoId: item.id,
			playerVars: {
				'playsinline': 1
			},
			events: {
				'onReady': function(){
					// console.log('onReady');
				},
				'onStateChange': function(){
					// console.log('onStateChange');
				}
			}
		});
	})
}