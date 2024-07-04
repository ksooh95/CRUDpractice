import { connectDB } from '@/util/database';
import { ObjectId } from 'mongodb';

export default async function Handler(req, res) {
    if (req.method == 'PATCH') {
        const db = (await connectDB).db('forum');
        let result = await db.collection('post3').updateOne({ _id: new ObjectId(req.query) }, { $set: req.body });
        return res.status(200).json('수정완료');
    }
}
