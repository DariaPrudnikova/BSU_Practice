package com.bsu;
import java.util.Date;

public class Tweet {
    private int id;
    private String author;
    private String content;
    private Date createdAt;

    public Tweet(String author, String content){
        this.author = author;
        this.content = content;
        this.id = 0;
        this.createdAt = new Date();
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthor() {
        return author;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setId(int id) {
        if (this.id == 0) {
            this.id = id;
        }
    }

    public int getId() {
        return id;
    }

    public Date getCreatedAt() {
        return createdAt;
    }
}
