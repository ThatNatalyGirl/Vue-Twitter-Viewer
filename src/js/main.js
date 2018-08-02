"use strict";

// this uses greg haygood's simple twitter API proxy
// https://github.com/greghaygood/wd4-ajax-twitter
// with an added CORS fix.

var TWITTER_API_BASE = "http://circuslabs.net/~chris.silich/twitter-proxy/twitter-proxy.php";

var router = new VueRouter({
	routes: [{ path: '', component: HomeComponent }, { path: '/tweets', component: TweetFeedComponent }, { path: '/about', component: AboutComponent }]
});

var app = new Vue({
	el: "#app",
	router: router,
	data: function data() {
		// dont need to do this, but why not be uniform with components
		return {
			hashtag: "#cats",
			countdown: 20,
			tweets: []
		};
	},

	created: function created() {
		// use created to do initial AJAX lookups
		console.log("app created");
		this.getTweets();
		setInterval(this.tickCountdown, 1000);
	},
	methods: {
		hashtagChange: function hashtagChange(newHashtag) {
			this.hashtag = newHashtag;
		},
		getTweets: function getTweets() {
			var _this = this;

			if (!this.hashtag) {
				this.tweets = [];
			}
			var uri = TWITTER_API_BASE + '?op=search_tweets&q=' + encodeURIComponent(this.hashtag);
			console.log('getTweets', uri);
			axios.get(uri).then(function (response) {
				console.log(response);
				if (response && response.data && response.data.statuses) {
					_this.tweets = response.data.statuses;
				} else {
					console.warn("Valid response from twitter api/proxy, but bad data");
					_this.tweets = [];
				}
			}).catch(function (error) {
				console.warn(error);
			});
		},
		tickCountdown: function tickCountdown() {
			this.countdown--;
			if (!this.countdown) {
				this.getTweets();
				this.restartCountdown();
			}
		},
		restartCountdown: function restartCountdown() {
			this.countdown = 20;
		}
	},
	watch: {
		hashtag: function hashtag() {
			console.log("watch hashtag tripped", this);
			this.getTweets();
			this.restartCountdown();
		}
	}
});
//# sourceMappingURL=app.js.map