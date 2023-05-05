import query from "@rese/database/query/query";
import jsonwebtoken from 'jsonwebtoken';

export default async function getUserByToken(token:string){
    const decodedToken = jsonwebtoken.decode(token);
    console.log(decodedToken);
    
    const { _id } = decodedToken as { _id: string };
    if (!_id) {
      throw new Error();
    }
    return await query.getUserByToken(_id);
}
