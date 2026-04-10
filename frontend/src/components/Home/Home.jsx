import PostsContainer from './PostsContainer'
import Sidebar from './Sidebar/Sidebar'
import MetaData from '../Layouts/MetaData';

const Home = () => {
  return (
    <>
      <MetaData title="Instagram" />

      <div className="min-h-screen bg-[#fafafa] pt-20">

        {/* 🔥 FULL WIDTH CONTROL */}
        <div className="flex justify-center gap-10 px-4">

          {/* FEED */}
          <div className="w-[600px]">   {/* 👈 FIXED WIDTH */}
            <PostsContainer />
          </div>

          {/* SIDEBAR */}
          <div className="hidden lg:block w-[320px]">
            <Sidebar />
          </div>

        </div>

      </div>
    </>
  )
}

export default Home