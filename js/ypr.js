/**
 * @version		1.0.0
 * @package		YPR - YouTube Playlist Reader
 * @author    Fotis Evangelou - http://nuevvo.gr
 * @copyright	Copyright (c) 2010 - 2012 Nuevvo Webware Ltd. All rights reserved.
 * @license		GNU/GPL license: http://www.gnu.org/copyleft/gpl.html
 */

var ypr = {

	containerID: '',
	theme: '<li><a href="{link}"><img src="{img_s_url}" alt="{title}" width="{img_s_width}" height="{img_s_height}" class="yprVideoThumb" /><span>{title}</span></a></li>',

	ready: function(cb) {
		/in/.test(document.readyState) ? setTimeout('ypr.ready('+cb+')', 9) : cb();
	},

	getRemoteJson: function(playlistID,count) {
		var head = document.getElementsByTagName('head')[0];
		var jsonurl = document.location.protocol + '//gdata.youtube.com/feeds/api/playlists/'+playlistID+'?v=2&alt=json-in-script&format=5&max-results='+count+'&callback=ypr.ytpl';
		var jsonfeedscript = document.createElement('script');
		jsonfeedscript.setAttribute('charset', 'utf-8');
		jsonfeedscript.setAttribute('type', 'text/javascript');
		jsonfeedscript.setAttribute('src', jsonurl);
		head.appendChild(jsonfeedscript);
	},

	ytpl: function(data){
	  var feed = data.feed;
	  var entries = feed.entry || [];
	  var entriesCount = entries.length;

	  var html = ['<ul class="yprList">'];

	  for (var i=0; i<entriesCount; i++) {
	    var entry = entries[i];
	    var title = entry.title.$t;
	    var link = entry.link[0].href;
	    var thumb_s = entry.media$group.media$thumbnail[0];
	    var thumb_m = entry.media$group.media$thumbnail[1];
	    var thumb_l = entry.media$group.media$thumbnail[2];
	    var iframeURL = entry.media$group.yt$videoid.$t;

	    var output = this.theme
	    	.replace(/{iframeURL}/g,'http://www.youtube.com/embed/'+iframeURL+'?autoplay=1')
	    	.replace(/{link}/g,link)
	    	.replace(/{img_s_url}/g,thumb_s.url)
	    	.replace(/{img_s_width}/g,thumb_s.width) 			// 120
	    	.replace(/{img_s_height}/g,thumb_s.height) 		// 90
	    	.replace(/{img_m_url}/g,thumb_m.url)
	    	.replace(/{img_m_width}/g,thumb_m.width) 			// 320
	    	.replace(/{img_m_height}/g,thumb_m.height) 		// 180
	    	.replace(/{img_l_url}/g,thumb_l.url)
	    	.replace(/{img_l_width}/g,thumb_l.width) 			// 480
	    	.replace(/{img_l_height}/g,thumb_l.height) 		// 360
	    	.replace(/{title}/g,title);

	    html.push(output);
	  }

	  html.push('</ul>');

	  document.getElementById(this.containerID).innerHTML = html.join('');
	},

	load: function(el) {
		this.containerID = el.containerID;
		if(el.theme!='') {
			this.theme=el.theme;
		}
		this.getRemoteJson(el.playlistID,el.count);
	}

}
