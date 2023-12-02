// See https://github.com/typicode/json-server#module
import cors from 'cors';
import { create, router as _router, defaults } from 'json-server';
const server = create()
import auth from "json-server-auth";
import db from "./db.json";
const router = _router(db);
const middlewares = defaults();
server.use(cors())
server.use(middlewares)
server.db = router.db;
server.use(auth);
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
export default server

