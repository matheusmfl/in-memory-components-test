

import { Video, VideoChunk } from '../schema/video';
import { VideoRepository } from './repository/videoRepository';
import { generateRandomId } from '@/app/utils/genereteId';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export class InMemoryApiVideo implements VideoRepository {
  private items: Video[] = [];
  private chunksMemory: VideoChunk[] = [];

  async uploadVideoChunk(videoId: string, chunk: ArrayBuffer, chunkIndex: number): Promise<{ success: boolean }> {

    await delay(1000)
    const videoChunk: VideoChunk = {
      videoId,
      chunkIndex,
      data: new Uint8Array(chunk),
    };


    this.chunksMemory.push(videoChunk);


    const videoChunks = this.chunksMemory.filter((chunk) => chunk.videoId === videoId);
    if (videoChunks.length === (await this.getVideoById(videoId))?.chunks) {
      this.completeUpload(videoId);
    }

    return { success: true };
  }

  async getVideoById(videoId: string): Promise<Video | null> {
    return this.items.find((v) => v.id === videoId) || null;
  }

  private assembleVideo(videoId: string): Uint8Array {

    const chunks = this.chunksMemory
      .filter((chunk) => chunk.videoId === videoId)
      .sort((a, b) => a.chunkIndex - b.chunkIndex)
      .map((chunk) => chunk.data);


    const totalSize = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    const assembledVideo = new Uint8Array(totalSize);

    let offset = 0;
    chunks.forEach((chunk) => {
      assembledVideo.set(chunk, offset);
      offset += chunk.length;
    });

    return assembledVideo;
  }

  async completeUpload(videoId: string): Promise<null | Blob> { 
    const video = await this.getVideoById(videoId);
    if (!video) {
      throw new Error('Video not found');
    }
  

    const assembledVideo = this.assembleVideo(videoId);
  

    video.status = 'completed';
  

    const videoBlob = new Blob([assembledVideo], { type: 'video/mp4' });
  

    this.chunksMemory = this.chunksMemory.filter((chunk) => chunk.videoId !== videoId);
  

    return videoBlob;  
  }

  addVideo(file: File): Video {
    const id = generateRandomId();
    const chunks = Math.ceil(file.size / 1024 / 1024); 
    const newVideo: Video = {
      id,
      name: file.name,
      size: file.size,
      type: file.type,
      chunks,
      uploadedChunks: 0,
      status: 'uploading',
    };

    this.items.push(newVideo);
    return newVideo;
  }
}

