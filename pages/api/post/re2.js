import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Handler(req, res) {
    if (req.method === 'POST') {
        const db = (await connectDB).db('forum');
        const { reid } = req.query;
        const reInfo = req.body.reInfo;

        let result = await db
            .collection('post4')
            .updateOne({ _id: new ObjectId(reid) }, { $push: { replies: reInfo } });

        return res.status(200).json('답글 작성완료');
    }
}
