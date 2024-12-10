import VideoUploader from "@/app/_components/videoUploader"

interface pageProps {
  params: {
    folderSlug: string
  }
}

export default async function ProjectByFolderSlug({ params }: pageProps) {
  console.log(params)
  return (
    <div className="w-full">
      <h1>Simulador de Upload de Vídeos</h1>
      <VideoUploader />
    </div>
  )
}