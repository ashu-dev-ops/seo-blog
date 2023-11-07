// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(process.env.MONGO_URI);
//       console.log("db connected");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default connectDB;


// import mongoose from "mongoose";

// const connect = async () => {
//   if (mongoose.connections[0].readyState) return;

//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Mongo Connection successfully established.");
//   } catch (error) {
//     throw new Error("Error connecting to Mongoose");
//   }
// };

// export default connect;


// import { Db, MongoClient } from "mongodb";

// const MONGODB_URI ='mongodb+srv://ashutosh:toto1234@cluster0.hxdw2z3.mongodb.net/sun_editor?retryWrites=true&w=majority' ;
// const MONGODB_DB = 'sun_editor';

// let cachedClient
// let cachedDb;

// export default async function connect() {
//   // check the cached.
//   if (cachedClient && cachedDb) {
//     // load from cache
//     return {
//       client: cachedClient,
//       db: cachedDb,
//     };
//   }

//   // set the connection options
//   const opts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   // check the MongoDB URI
//   if (!MONGODB_URI) {
//     throw new Error("Define the MONGODB_URI environmental variable");
//   }
//   // check the MongoDB DB
//   if (!MONGODB_DB) {
//     throw new Error("Define the MONGODB_DB environmental variable");
//   }

//   // Connect to cluster
//   let client = new MongoClient(MONGODB_URI);
//   await client.connect();
//   let db = client.db(MONGODB_DB);

//   // set cache
//   cachedClient = client;
//   cachedDb = db;

//   return {
//     client: cachedClient,
//     db: cachedDb,
//   };
// }

import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://ashutosh:toto1234@cluster0.hxdw2z3.mongodb.net/sun_editor?retryWrites=true&w=majority';

if(!MONGODB_URI){
    throw new Error(
        'Please define Mongo DB URI'
    )
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

async function connect() {
    if (cached.conn) {
      return cached.conn
    }
  
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      }
  
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose
      })
    }
  
    try {
      cached.conn = await cached.promise
    } catch (e) {
      cached.promise = null
      throw e
    }
  
    return cached.conn
  }

  export default connect