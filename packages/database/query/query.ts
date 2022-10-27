import connectMongo from '../connectMongo'
import pitchTable from "../Tables/pitchTable"


export const query = {
    getPitches: async () => {
        await connectMongo()
        return pitchTable.find({})
    }
}
