import { PostStatus } from "../../../generated/prisma/enums";


export interface IAddPostPayload {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: PostStatus
  tags: string[]
}
