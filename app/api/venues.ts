// import { NextRequest, NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb"; // your existing MongoDB client

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const page  = Math.max(0, parseInt(searchParams.get("page")  ?? "0"));
//   const limit = Math.min(50, parseInt(searchParams.get("limit") ?? "6")); // cap at 50

//   try {
//     const client = await clientPromise;
//     const db     = client.db(); // uses the DB name from your MONGODB_URI

//     const [venues, total] = await Promise.all([
//       db
//         .collection("venues")
//         .find({})
//         .skip(page * limit)
//         .limit(limit)
//         .toArray(),
//       db.collection("venues").countDocuments(),
//     ]);

//     // MongoDB's _id is an ObjectId — serialize it to a plain string
//     const serialized = venues.map((v) => ({
//       ...v,
//       _id: v._id.toString(),
//     }));

//     return NextResponse.json({
//       venues:  serialized,
//       hasMore: (page + 1) * limit < total,
//       total,
//     });
//   } catch (err) {
//     console.error("[/api/venues] MongoDB error:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch venues" },
//       { status: 500 }
//     );
//   }
// }