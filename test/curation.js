const Curation = artifacts.require('Curation')

const postId = 'cjj25lgft5e3p0149sjtcmrlo'

contract('Test Curation contract', async accounts => {
    it('Can create a post', async () => {
        const instance = await Curation.deployed()
        const returnedPostid = await instance.createPost.call(postId)
        assert.equal(postId, returnedPostid)
    })

    it('Can upvote a post', async () => {
        const instance = await Curation.deployed()
        const returnedPostid = await instance.upVotePost.call(postId)
        assert.equal(postId, returnedPostid)
    })

    it('Can downvote a post', async () => {
        const instance = await Curation.deployed()
        const returnedPostid = await instance.downVotePost.call(postId)
        assert.equal(postId, returnedPostid)
    })
})
