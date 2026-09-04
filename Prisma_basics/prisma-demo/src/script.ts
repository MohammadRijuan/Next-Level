import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post


//   const user = await prisma.user.create({
//     data:{
//         name:"Alice",
//         email:"alice@prisma.io",
//         posts:{
//             create:{
//                 title: "hello world",
//                 content: "i am duplicating the code again",
//                 published:true,
//             },
//         },
//     },
//     include:{
//             posts:true,
//         },
//   });

  const newPost = await prisma.post.create({
    data:{
        authorId:1,
        title:"my second post",
        content:"ok",
        published:true
    },
  })

  console.log("Created user:", newPost);
//   console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });