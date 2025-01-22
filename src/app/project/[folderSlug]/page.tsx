import VideoUploader from "@/app/_components/videoUploader"

interface pageProps {
  params: {
    folderSlug: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function ProjectByFolderSlug({ params }: pageProps) {



  return (
    <div className="w-full">
      <h1>Simulador de Upload de Vídeos</h1>
      <VideoUploader />
    </div>
  )
}