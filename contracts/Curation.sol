pragma solidity ^0.4.18;

contract Curation {
    
    struct Post {
        string id;
        address[] upVoters;
        address[] downVoters;
    }
    
    Post[] public posts;

    mapping (string => Post) idToPost;

    event PostCreated(address _from, string _id);
    event PostUpVoted(address _from, string _id);
    event PostDownVoted(address _from, string _id);

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
    
    function createPost(string _id) external returns(string) {
        require(!postExists(_id), "Cannot create a post with exsiting id.");
        Post memory newPost = Post(_id, new address[](0), new address[](0));
        posts.push(newPost);
        idToPost[_id] = newPost;
        emit PostCreated(msg.sender, _id);
        return newPost.id;
    }

    function upVotePost(string _id) external returns(string) {
        require(postExists(_id), "Cannot upVote a post that does not exsist.");
        Post storage post = idToPost[_id];
        require(!containsAddress(msg.sender, post.upVoters));
        post.upVoters.push(msg.sender);
        emit PostUpVoted(msg.sender, _id);
        return post.id;
    }

    function downVotePost(string _id) external returns(string) {
        require(postExists(_id), "Cannot downVote a post that does not exsist.");
        Post storage post = idToPost[_id];
        require (!containsAddress(msg.sender, post.downVoters));
        post.downVoters.push(msg.sender);
        emit PostDownVoted(msg.sender, _id);
        return post.id;
    }

    function getPostScore(string _id) external view returns(uint) {
        require(postExists(_id));
        uint total = 0;
        Post storage post = idToPost[_id];
        for (uint i = 0; i < post.upVoters.length; i++) {
            total += post.upVoters[i].balance;
        }
        for (uint j = 0; j < post.downVoters.length; j++) {
            total -= post.downVoters[j].balance;
        }
        return total;
    }
}