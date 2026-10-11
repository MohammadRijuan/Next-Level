import { title } from "node:process";
import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import {
  IAddPostPayload,
  IPostQuery,
  IUpdatePostPayload,
} from "./post.interface";

const addPostService = async (payload: IAddPostPayload, userId: string) => {

  // to remove premium post...we will do it when we implement premium rellated posts api
  const user = await prisma.user.findUniqueOrThrow({
    where :{
      id : userId
    },
    include :{
      subscription:true
    }
  })

  if (payload.isPremium && user.subscription?.status !== "ACTIVE"){
    throw new Error("You are not premium user ...so you can not get premium content")

  }



  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getAllPostsService = async (query: IPostQuery) => {


  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";



  const tags = query.tags ? JSON.parse(query.tags as string) : null;
  const tagsArray = Array.isArray(tags) ? tags : []
  console.log(tagsArray,"tagsArray");

  const andConditions: PostWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (query.title){
    andConditions.push({
      title: query.title
    })
  }


  if (query.content){
    andConditions.push({
      content: query.content
    })
  }


  if (query.isFeatured){
    andConditions.push({
      isFeatured: Boolean(query.isFeatured)
    })
  }


  if (query.tags){
    andConditions.push({
      tags: {
        hasSome: tagsArray
      }
    })
  }

  if (query.status){
    andConditions.push({
      status: query.status
    })
  }
  

  // to remove premium post from getting all post..we will do it when we implement premium rellated posts api
  andConditions.push({
    isPremium:false
  })


  const posts = await prisma.post.findMany({
    // for search related or filtering or sorting
    // where:{
    //   AND:[

    //     query.searchTerm ? {
    //       OR : [{

    //         title: {
    //           contains : query.searchTerm,
    //           mode : "insensitive"
    //         },
    //       },
    //       {
    //         content: {
    //           contains : query.searchTerm,
    //           mode : "insensitive"
    //         },
    //       }
    //     ]
    //     } : {},

    //     // title filtering
    //     query.title ? { title : query.title} : {},

    //     // content filtering
    //     query.content ? { content : query.content} : {},

    //   ]
    // },

    // optimizing search related or filtering or sorting for better output
    where: {
      AND: andConditions,
    },

    take: limit,
    skip: skip,

    orderBy: {
      // sortby : sortOrder
      [sortBy]: sortOrder,
    },

    // to get all post
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });


  const totalPostCount = await prisma.post.count({
    where :{
      AND: andConditions
    }
  })

  return {
    data:posts,
    meta:{
      page : page,
      limit: limit,
      total : totalPostCount,
      totalPages : Math.ceil(totalPostCount / limit)
    }
  };

  
};

const getPostsStats = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    // *** 2nd best approach  ***

    // const totalPosts = await tx.post.count();

    // const totalPublishedPosts = await tx.post.count({
    //   where: {
    //     status: PostStatus.PUBLISHED,
    //   },
    // });

    // const totalDraftPost = await tx.post.count({
    //   where: {
    //     status: PostStatus.DRAFT,
    //   },
    // });

    // const totalArchievedPost = await tx.post.count({
    //   where: {
    //     status: PostStatus.ARCHIVED,
    //   },
    // });

    // const totalComments = await tx.comment.count();

    // const totalApprovedComments = await tx.comment.count({
    //   where: {
    //     status: CommentStatus.APPROVED,
    //   },
    // });

    // const totalRejectedComments = await tx.comment.count({
    //   where: {
    //     status: CommentStatus.REJECTED,
    //   },
    // });

    // // not a good approach

    // // const allPosts = await tx.post.findMany()

    // // let totalPostViews = 0;

    // // allPosts.forEach((post)=>{
    // //   totalPostViews = totalPostViews + post.views
    // // })

    // // *** best approach using prisma aggregate to show total views ****

    // const totalPostViewAggregate = await tx.post.aggregate({
    //   _sum: {
    //     views: true,
    //   },
    // });

    // // *** second approach to show totalpost view ****

    // const totalPostViews = totalPostViewAggregate._sum.views;

    // return {
    //   totalPosts,
    //   totalPublishedPosts,
    //   totalArchievedPost,
    //   totalDraftPost,
    //   totalApprovedComments,
    //   totalComments,
    //   totalRejectedComments,
    //   totalPostViews,
    // };

    // *** overall best aaproach for overall getpost stats code would be this one ***

    const [
      totalPosts,
      totalPublishedPosts,
      totalArchievedPost,
      totalDraftPost,
      totalApprovedComments,
      totalComments,
      totalRejectedComments,
      totalPostViewAggregate,
    ] = await Promise.all([
      await tx.post.count(),

      await tx.post.count({
        where: {
          status: PostStatus.PUBLISHED,
        },
      }),

      await tx.post.count({
        where: {
          status: PostStatus.DRAFT,
        },
      }),

      await tx.post.count({
        where: {
          status: PostStatus.ARCHIVED,
        },
      }),

      await tx.comment.count({
        where: {
          status: CommentStatus.APPROVED,
        },
      }),

      await tx.comment.count(),

      await tx.comment.count({
        where: {
          status: CommentStatus.REJECTED,
        },
      }),

      await tx.post.aggregate({
        _sum: {
          views: true,
        },
      }),
    ]);

    return {
      totalPosts,
      totalPublishedPosts,
      totalArchievedPost,
      totalDraftPost,
      totalApprovedComments,
      totalComments,
      totalRejectedComments,
      totalPostViews: totalPostViewAggregate._sum.views,
    };
  });

  return transactionResult;
};

const getMyPostsService = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        omit: {
          password: true,
        },
      },
      // built in property of prisma what can count the number of element in an array...only for array
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return result;
};

const getPostByIdService = async (postId: string) => {
  // *** decent method ***

  // const updatedPost = await prisma.post.update({
  //   where: {
  //     id: postId,
  //   },
  //   data: {
  //     views: {
  //       increment: 1,
  //     },
  //   },
  // });

  // const post = await prisma.post.findUnique({
  //   where: {
  //     id: postId,
  //   },
  //   include: {
  //     author: {
  //       omit: {
  //         password: true,
  //       },
  //     },
  //     comments: {
  //       where: {
  //         status: CommentStatus.APPROVED,
  //       },
  //       orderBy :{
  //           CreatedAt:"desc"
  //       }
  //     },
  //     _count:{
  //       select:{
  //           comments :true
  //       }
  //     }
  //   },
  // });

  // return post;

  // *** rollback and transaction method for safe result ***

  const transactionResult = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: postId,
        
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    // to check view logic
    // throw new Error("Fake error")

    const post = await tx.post.findUniqueOrThrow({
      where: {
        id: postId,
        // to remove premium post...we will do it when we implement premium rellated posts api
        isPremium:false
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
        comments: {
          where: {
            status: CommentStatus.APPROVED,
          },
          orderBy: {
            CreatedAt: "desc",
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return post;
  });

  return transactionResult;
};

const updatePostService = async (
  postId: string,
  payload: IUpdatePostPayload,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of this post");
  }

  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: payload,
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return result;
};

const deletePostService = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of post");
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  // return result || null;
};

export const postService = {
  addPostService,
  getAllPostsService,
  getPostsStats,
  getMyPostsService,
  getPostByIdService,
  updatePostService,
  deletePostService,
};
