import { connectDB } from '@/util/database';

export default async function Handler(req, res) {
    if (req.method == 'POST') {
        const db = (await connectDB).db('forum');
        let result = await db.collection('post3').insertOne(req.body);
        return res.status(200).json('작성완료');
    }
}
