import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IAddPostPayload, IUpdatePostPayload } from "./post.interface";

const addPostService = async (payload: IAddPostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getAllPostsService = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return posts;
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
