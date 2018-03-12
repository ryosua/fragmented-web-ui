pragma solidity ^0.4.18;

contract Curation {
    
    struct Post {
        string id;
        uint upVotes;
        uint downVotes;
        address[] upVoters;
        address[] downVoters;
    }
    
    Post[] public posts;
    mapping (string => Post) idToPost;
    
    function createPost(string _id) external {
        // todo - Check to see that a post with the id has not yet been created.
        
        // Create the post.
        Post memory newPost = Post(_id, 0, 0, new address[](0), new address[](0));
        posts.push(newPost);
        idToPost[_id] = newPost;
    }
}