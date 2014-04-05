youtube-playlist-reader
=======================

Forked from http://fotis.co/projects/youtube-playlist-reader/.  This is just a copy, I did not create any of the files.

~ Cristos 2014-04-04

## Introduction

YouTube Playlist Reader was written to cover a specific need: To fetch the videos of specific playlists on YouTube for JoomlaDay Greece. Most things in life tend to come from real needs, right?

To summarize things:
* You can use it to fetch multiple YouTube playlists on the same page (requires multiple script init blocks of course)
* It's simple to implement, small in size and fast to load.
* It's non-blocking (asynchronous). This means that the browser will continue to load the rest of the page while feeds are loading.
* You can skin the output of the video gallery
* It works on all modern browsers: Firefox, Chrome, Safari, Opera and IE 7+ (should normally work in IE6 too).

I built the script cause I wanted a simple way to embed the videos from JoomlaDay Greece (an event we organize) on joomladay.gr, having just switched from Vimeo which offered a similar widget. I hated to look around for some crappy jQuery widget to do that, so I just built a new one - and why not share it? Enjoy!

## Setup
Grab the zip file and extract its contents. The base setup is calling the ypr.js file and initiating the script in your page using this code block:

    <script type="text/javascript" src="path/to/ypr.js"></script>
    <script type="text/javascript">
    
      ypr.ready(function(){

        ypr.load({

          'playlistID':'DCAE41611AFA0993', // this is your playlist ID (it's the part after PL in http://www.youtube.com/playlist?list=PLDCAE41611AFA0993

          'containerID':'play', // the ID of the container tag

          'count':12, // how many videos do you wanna show?

          'theme':'<li><a class="fancybox.iframe" href="{iframeURL}"><img src="{img_m_url}" alt="{title}" width="{img_m_width}" height="{img_m_height}" class="yprVideoThumb" /><span>{title}</span></a></li>' // A theme to pass on and overwrite the default layout. See available content options by exploring the "ytpl" function in the ypr.js file.

        });

      });

    </script>
		  
Finally you need a placeholder element, aka the html tag in which the script will render the video gallery inside an unordered list. In the case above it's the html element with the id "play" (the same as in the source of this document - a div element).
