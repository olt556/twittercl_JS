var data1 = [];
var data2 = [];
function twitter_init(){
   OAuth.initialize('cVK5AVWjoR62-CQAm2LJ_GUKpeI');
    OAuth.popup('twitter',function(err, res){
          localStorage.setItem("oauth_token", res.oauth_token); 
          localStorage.setItem("oauth_token_secret", res.oauth_token_secret); 
    }).then( function(){
             OAuth.callback('twitter',  "http://oldera.html.xdomain.jp");
    });
}
function getTwitterTL(){
    let options = {
        method: "GET",
        apiURL: "https://api.twitter.com/1.1/statuses/user_timeline.json",
        count: 10,
        consumerKey: "I4X0JdnGqT6YZLPfQk4jpB96U",
        consumerSecret: "wn39OMaZguKSnbLYcYwEeBdSyhG635Th1eLGKKEZficbOQZyAR",
        accessToken:  localStorage.getItem("oauth_token"),
        tokenSecret:   localStorage.getItem("oauth_token_secret")
    };
    let accessor = {
        consumerSecret: options.consumerSecret,
        tokenSecret: options.tokenSecret
    };
    let message = {
        method: options.method,
        action: options.apiURL,      
        parameters: {
            count: options.count,
            oauth_version: "1.0",
            oauth_signature_method: "HMAC-SHA1",
            oauth_consumer_key: options.consumerKey,
            oauth_token: options.accessToken,
            callback: "cbname1"
        }
    };
    OAuth1.setTimestampAndNonce(message);
    OAuth1.SignatureMethod.sign(message, accessor);
    var url = OAuth1.addToURL(message.action, message.parameters);
    $.ajax({
        type: options.method,
        url: url,
        dataType: "jsonp",
        jsonp: false,
        cache: true
    });
}
function SendTwitter(tweets_txt){
    let options = {
        method: "POST",
        apiURL: "https://api.twitter.com/1.1/statuses/update.json",
        consumerKey: "I4X0JdnGqT6YZLPfQk4jpB96U",
        consumerSecret: "wn39OMaZguKSnbLYcYwEeBdSyhG635Th1eLGKKEZficbOQZyAR",
        accessToken:  localStorage.getItem("oauth_token"),
        tokenSecret:   localStorage.getItem("oauth_token_secret")
    };   
    let accessor = {
        consumerSecret: options.consumerSecret,
        tokenSecret: options.tokenSecret
    };
    let message = {
        method: options.method,
        action: options.apiURL,
        parameters: {
            oauth_version: "1.0" ,
            oauth_signature_method:"HMAC-SHA1" ,
            oauth_consumer_key: options.consumerKey ,
            oauth_token: options.accessToken,
            status: tweets_txt + "",
            callback: "cbname2"
        }      
    };
    OAuth1.setTimestampAndNonce(message);
    OAuth1.SignatureMethod.sign(message, accessor);

    let url = OAuth1.addToURL(message.action, message.parameters);
    $.ajax({
        type: options.method,
        url: url
    });
}
function cbname1(data1){
    JSON.stringify(data1);
    let count=0;
    while(count<10){
        tweetsList.push(data1[count].text);
        let str_key = 'MyTL_tw' + count;
        localStorage.setItem(str_key ,tweetsList[count]);　
        count = count + 1;
    }
}
function cbname2(data2){
        JSON.stringify(data2);
}