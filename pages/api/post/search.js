import { connectDB } from '@/util/database';

export default async function Handler(req, res) {
    if (req.method == 'GET') {
        const db = (await connectDB).db('forum');
        let result = await db
            .collection('post3')
            .find({ title: { $regex: req.query.title, $options: 'i' } })
            .toArray();
        return res.status(200).json(result);
    }
}

//
