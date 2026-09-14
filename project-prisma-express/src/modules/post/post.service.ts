import { CommentStatus } from "../../../generated/prisma/enums";
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

const getPostsStats = async () => {};

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

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  const post = await prisma.post.findUnique({
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
        orderBy :{
            CreatedAt:"desc"
        }
      },
      _count:{
        select:{
            comments :true
        }
      }
    },
  });

  return post;
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
