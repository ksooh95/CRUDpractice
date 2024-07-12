import { connectDB } from '@/util/database';

export default async function Handler(req, res) {
    console.log(req.query.postid);
    const { postid } = req.query;
    if (req.method == 'GET') {
        const db = (await connectDB).db('forum');
        let result = await db
            .collection('post4')
            .find({ postid: String(postid) })
            .toArray();
        return res.status(200).json(result);
    }
}
