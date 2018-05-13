pragma solidity ^0.4.18;

contract Curation {
    
    struct Post {
        string id;
        address[] upVoters;
        address[] downVoters;
    }
    
    Post[] public posts;
    mapping (string => Post) idToPost;

    function compareStrings(string string1, string string2) internal pure returns(bool) {
        return keccak256(string1) == keccak256(string2);
    } 
    
    function postExists(string _id) internal view returns(bool) {
        for (uint i = 0; i < posts.length; i++) {
            string memory id = posts[i].id;
            if (compareStrings(id, _id)) {
                return true;
            }
        }
        return false;
    }
    
    function createPost(string _id) external returns(bool) {
        if (!postExists(_id)) {
            Post memory newPost = Post(_id, 0, 0, new address[](0), new address[](0));
            posts.push(newPost);
            idToPost[_id] = newPost;
            return true;
        }
        return false;
    }

}