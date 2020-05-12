package com.bsu;

import java.util.List;
import java.util.ArrayList;

public class TweetCollection {
    
    private List<Tweet> tweets;
    private int nextId;

    public TweetCollection() {
        tweets = new ArrayList<>();
        nextId = 1;
    }

    public void register(Tweet tweet) {
        tweet.setId(nextId);
        tweets.add(tweet);
        nextId += 1;
    }

    public Tweet get(int id) {
        for (Tweet tweet : tweets) {
            if (tweet.getId() == id) {
                return tweet;
            }
        }
        return null;
    }

    public List<Tweet> getTweets() {
        return this.tweets;
    }

    public void delete(int id) {
        for (int i = 0; i < tweets.size(); i++) {
            if (tweets.get(i).getId() == id) tweets.remove(i);
        }
    }
}
