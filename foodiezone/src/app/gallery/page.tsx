import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import GalleryPage from '@/components/gallery/GalleryPage'

export const metadata = {
  title: 'Gallery | Foodie Zone',
  description: 'The food speaks for itself. Browse our full menu gallery.',
}

export default function Gallery() {
  return (
    <main style={{ background: '#FFF8EC' }}>
      <Navbar />
      <GalleryPage />
      <Footer />
    </main>
  )
}
