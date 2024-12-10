import { Video } from "@/fakeApi/schema/video";

export interface VideoRepository {
  uploadVideoChunk(videoId: string, chunk: ArrayBuffer, chunkIndex: number): Promise<{ success: boolean }>;
  getVideoById(videoId: string): Promise<Video | null>;
  completeUpload(videoId: string): Promise<null | Blob>;
  
}