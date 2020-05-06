package com.bsu;
import java.util.ArrayList;
import java.io.IOException;
import java.lang.NumberFormatException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

public class TweetServlet extends HttpServlet {

  public TweetCollection collection;

  public TweetServlet () {
    collection = new TweetCollection();
  }

  private void returnTweet(HttpServletResponse response, Tweet tweet) {
    try {
      JSONObject json = new JSONObject(tweet);
      response.setContentType("application/json");
      response.getOutputStream().println(json.toString());
    } catch (IOException e) {
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
  }

  private void returnMultiple(HttpServletResponse response, ArrayList<Tweet> tweets) {
    try {
      JSONArray json = new JSONArray();
      for (Tweet tweet : tweets) {
        JSONObject tweetJson = new JSONObject(tweet);
        json.put(tweetJson);
      }
      response.setContentType("application/json");
      response.getOutputStream().println(json.toString());
    } catch (IOException e) {
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
  }

  private int parseId(HttpServletRequest request) {
    String id = null;
    String endpoint = request.getPathInfo();

    if (endpoint == null) {
      id = request.getParameter("id");
    } else if (endpoint.matches("/\\d+")) {
      id = endpoint.substring(1);
    }

    if (id == null) return 0;

    try {
      return Integer.parseInt(id);
    } catch (NumberFormatException e) {
      return -1;
    }
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) {
    int id = parseId(request);

    if (id == 0) {
      returnMultiple(response, collection.getTweets());
    } else if (id == -1) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    } else {
      Tweet tweet = collection.get(id);
      if (tweet != null) returnTweet(response, tweet);
      else response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    }
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) {
    String author = request.getParameter("author");
    String content = request.getParameter("content");
    Tweet tweet = new Tweet(author, content);
    collection.register(tweet);

    response.setStatus(HttpServletResponse.SC_CREATED);
    returnTweet(response, tweet);
  }

  @Override
  protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
    int id = parseId(request);

    if (id == 0 || id == -1) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    } else {
      collection.delete(id);
      response.setStatus(HttpServletResponse.SC_NO_CONTENT);
    }
  }
}

