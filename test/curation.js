const Curation = artifacts.require('Curation')

const postId = 'cjj25lgft5e3p0149sjtcmrlo'

contract('Test Curation contract', async accounts => {
    it('Can create a post', async () => {
        const instance = await Curation.deployed()
        const returnedPostid = await instance.createPost.call(postId)
        console.log(`create: ${JSON.stringify(returnedPostid)}`)
        assert.equal(postId, returnedPostid)
    })

    it('Can upvote a post', async () => {
        const instance = await Curation.deployed()
        const createdPostId = await instance.createPost.call(postId)
        const returnedPostid = await instance.upVotePost.call(postId)
        console.log(`upvote: ${JSON.stringify(returnedPostid)}`)
        assert.equal(createdPostId, returnedPostid)
    })

    it('Can downvote a post', async () => {
        const instance = await Curation.deployed()
        const returnedPostid = await instance.downVotePost.call(postId)
        console.log(`downvote: ${JSON.stringify(returnedPostid)}`)
        assert.equal(postId, returnedPostid)
    })
})
