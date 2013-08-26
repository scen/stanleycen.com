# Facebook Messaging Analytics

A couple of days ago I had an urge to look at my activity over Facebook messaging, a service I use quite often. Facebook doesn't provide an interface to easily view information about my chats, nor do they provide a method to easily and quickly download your up-to-date chat data.

I wrote a open-source and purely client-side tool to download all my data through the Facebook Graph API and compute statistics on it to provide insights into my chatting activity (GitHub repository as well as installation instructions are available [here](/project/facebook-messaging-analytics)). Here are a few examples of what it can show right now:

### Word cloud
<photo cloudinary src="wordcloud_pardki.png">Word cloud</photo>





### Message distribution
<photo cloudinary src="distribution_cuk8tr.png">Message distribution</photo>


### Trends over time
<photo cloudinary src="trends_z0fvlo.png">Trends over time</photo>

### Most active time
<photo cloudinary src="mostactive_icmony.png">Most active time</photo>


In order to download all of the messages, I had to use the Facebook API. The Facebook Graph API is slow and generally hard to use. You have to traverse each conversation page-by-page, loading at most 25 messages per API call. Facebook also limits API calls to around 300 per 600 seconds for this specific table. In order to store the sheer amount (8 MB+) of text data, I store the collected data as a JSON string inside of a permanent sandboxed file system (it won't fit into `localStorage`). As a result, only Google Chrome is supported at this time. The user can download the collected data as a file into the actual filesystem and upload a backup data file into the tool.

The tool written in HTML, CSS, and Javascript. Anyone can easily deploy it by downloading the zip and starting a local file server. The tool uses my Facebook application to authenticate and acquire the `read_mailbox` permission needed to download messages. If you'd rather use your own application id (even though the source code is available) online, you can alter `visualizer.js`.

A copy of the `master` branch of the tool is hosted on my website [here](http://fbstats.stanleycen.com/fbstats). It is fully usable as the entire application does not rely on any server-side processing.

The tool is currently still in development. If you find any bugs, please let me know by [reporting an issue](http://github.com/scen/fbstats/issues) on GitHub.