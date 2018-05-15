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
    
    function containsAddress(address searchAddress, address[] addressArray) internal pure returns(bool) {
        for (uint i = 0; i < addressArray.length; i++) {
            address addressI = addressArray[i];
            if (searchAddress == addressI) {
                return true;
            }
        }
        return false;
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
            Post memory newPost = Post(_id, new address[](0), new address[](0));
            posts.push(newPost);
            idToPost[_id] = newPost;
            return true;
        }
        return false;
    }

    function upVotePost(string _id) external returns(bool) {
        if (postExists(_id) ) {
            Post storage post = idToPost[_id];
            if (!containsAddress(msg.sender, post.upVoters)) {
                post.upVoters.push(msg.sender);
                return true;
            }
        }
        return false;
    }

    function downVotePost(string _id) external returns(bool) {
        if (postExists(_id) ) {
            Post storage post = idToPost[_id];
            if (!containsAddress(msg.sender, post.downVoters)) {
                post.downVoters.push(msg.sender);
                return true;
            }
        }
        return false;
    }
}