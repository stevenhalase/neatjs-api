"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostModel = require("../models/PostModel.js");
module.exports = {
    list: function (req, res) {
        PostModel.find(function (err, Posts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });
            }
            return res.json(Posts);
        });
    },
    show: function (req, res) {
        var id = req.params.id;
        PostModel.findOne({ _id: id }, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post.',
                    error: err
                });
            }
            if (!Post) {
                return res.status(404).json({
                    message: 'No such Post'
                });
            }
            return res.json(Post);
        });
    },
    create: function (req, res) {
        var Post = new PostModel({
            title: req.body.title,
            createdon: req.body.createdon,
            createdby: req.body.createdby,
            modifiedon: req.body.modifiedon,
            modifiedby: req.body.modifiedby,
            status: req.body.status,
            visibility: req.body.visibility,
            publishedon: req.body.publishedon,
            publishedby: req.body.publishedby,
            categories: req.body.categories,
            tags: req.body.tags,
            media: req.body.media,
            fields: req.body.fields
        });
        Post.save(function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Post',
                    error: err
                });
            }
            return res.status(201).json(Post);
        });
    },
    update: function (req, res) {
        var id = req.params.id;
        PostModel.findOne({ _id: id }, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Post',
                    error: err
                });
            }
            if (!Post) {
                return res.status(404).json({
                    message: 'No such Post'
                });
            }
            Post.title = req.body.title ? req.body.title : Post.title;
            Post.createdon = req.body.createdon ? req.body.createdon : Post.createdon;
            Post.createdby = req.body.createdby ? req.body.createdby : Post.createdby;
            Post.modifiedon = req.body.modifiedon ? req.body.modifiedon : Post.modifiedon;
            Post.modifiedby = req.body.modifiedby ? req.body.modifiedby : Post.modifiedby;
            Post.status = req.body.status ? req.body.status : Post.status;
            Post.visibility = req.body.visibility ? req.body.visibility : Post.visibility;
            Post.publishedon = req.body.publishedon ? req.body.publishedon : Post.publishedon;
            Post.publishedby = req.body.publishedby ? req.body.publishedby : Post.publishedby;
            Post.categories = req.body.categories ? req.body.categories : Post.categories;
            Post.tags = req.body.tags ? req.body.tags : Post.tags;
            Post.media = req.body.media ? req.body.media : Post.media;
            Post.fields = req.body.fields ? req.body.fields : Post.fields;
            Post.save(function (err, Post) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Post.',
                        error: err
                    });
                }
                return res.json(Post);
            });
        });
    },
    remove: function (req, res) {
        var id = req.params.id;
        PostModel.findByIdAndRemove(id, function (err, Post) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Post.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
