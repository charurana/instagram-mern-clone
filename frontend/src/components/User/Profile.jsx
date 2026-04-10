import { useEffect, useState } from 'react'
import PostContainer from './Posts/PostContainer';
import PostDetails from '../Home/PostDetails';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_POST_IMAGE_URL, BASE_PROFILE_IMAGE_URL } from '../../utils/constants';
import { clearErrors, followUser, getUserDetails } from '../../actions/userAction';
import { clearErrors as clearChatErrors, addNewChat } from '../../actions/chatAction';
import { toast } from 'react-toastify';
import BackdropLoader from '../Layouts/BackdropLoader';
import { metaballsMenu, postsIconFill, savedIconFill, settingsIcon, taggedIcon, reelsIcon } from './SvgIcons';
import { FOLLOW_USER_RESET } from '../../constants/userConstants';
import UsersDialog from '../Layouts/UsersDialog';
import { NEW_CHAT_RESET } from '../../constants/chatConstants';
import MetaData from '../Layouts/MetaData';
import NotFound from '../Errors/NotFound';

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [follow, setFollow] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [followersModal, setFollowersModal] = useState(false);
  const [usersArr, setUsersArr] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedPost, setSelectedPost] = useState(null);

  const { user, error, loading } = useSelector((state) => state.userDetails);
  const { user: loggedInUser } = useSelector((state) => state.user);
  const { error: followError, success, message } = useSelector((state) => state.followUser);
  const { error: chatError, chat } = useSelector((state) => state.newChat);

  const handleFollow = () => {
    dispatch(followUser(user._id));
  };

  const handleFollowersModal = () => {
    setFollowersModal(true);
    setViewModal(true);
    setUsersArr(user?.followers);
  };

  const handleFollowingModal = () => {
    setViewModal(true);
    setFollowersModal(false);
    setUsersArr(user?.following);
  };

  const closeModal = () => {
    setViewModal(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getUserDetails(params.username));

    if (followError) {
      toast.error(followError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success(message);
      dispatch({ type: FOLLOW_USER_RESET });
    }
  }, [dispatch, error, params.username, followError, success, message]);

  useEffect(() => {
    setFollow(user?.followers?.some((u) => u._id === loggedInUser._id));
  }, [user, loggedInUser]);

  const addToChat = () => {
    dispatch(addNewChat(user._id));
  };

  useEffect(() => {
    if (chatError) {
      toast.error(chatError);
      dispatch(clearChatErrors());
    }

    if (chat) {
      const friendId = chat.users?.find((id) => id !== loggedInUser._id);
      navigate(`/direct/t/${chat._id}/${friendId}`);
      dispatch({ type: NEW_CHAT_RESET });
    }
  }, [dispatch, chatError, chat, navigate, loggedInUser]);

  const reels = user?.posts?.filter((p) => {
    const file = p?.image?.toLowerCase() || "";
    return file.endsWith(".mp4") || file.endsWith(".webm") || file.endsWith(".ogg") || p?.mediaType === "video";
  });

  const imagePosts = user?.posts?.filter((p) => {
    const file = p?.image?.toLowerCase() || "";
    const isVideo =
      file.endsWith(".mp4") ||
      file.endsWith(".webm") ||
      file.endsWith(".ogg") ||
      p?.mediaType === "video";
    return !isVideo;
  });

  const openReelsPage = () => {
    navigate("/watch/reels");
  };

  return (
    <>
      <MetaData title={`${user?.name} (@${user?.username}) • Instagram photos and videos`} />

      {loading && <BackdropLoader />}

      {user ? (
        <div className="mt-16 xl:w-2/3 mx-auto">
          <div className="sm:flex w-full sm:py-8">
            <div className="sm:w-1/3 flex justify-center mx-auto sm:mx-0">
              <img
                draggable="false"
                className="w-40 h-40 rounded-full object-cover"
                src={BASE_PROFILE_IMAGE_URL + user.avatar}
                alt=""
              />
            </div>

            <div className="flex flex-col gap-6 p-4 sm:w-2/3 sm:p-1">
              <div className="flex items-center gap-8 sm:justify-start justify-between">
                <h2 className="text-2xl sm:text-3xl font-thin">{user.username}</h2>

                {(loggedInUser.username === user.username) ? (
                  <div className="flex gap-3 items-center">
                    <Link to="/accounts/edit" className="border font-medium hover:bg-gray-50 text-sm rounded px-2 py-1">
                      Edit Profile
                    </Link>
                    <Link to="/accounts/edit">{settingsIcon}</Link>
                  </div>
                ) : (
                  <div className="flex gap-3 items-center">
                    {follow ? (
                      <>
                        <button onClick={addToChat} className="border rounded px-2.5 py-[0.3rem] text-sm font-medium hover:bg-gray-100">
                          Message
                        </button>
                        <button onClick={handleFollow} className="font-medium text-sm bg-red-50 rounded py-1.5 px-3 text-red-600 hover:bg-red-100 hover:text-red-700">
                          Unfollow
                        </button>
                      </>
                    ) : (
                      <button onClick={handleFollow} className="font-medium bg-primary-blue text-sm text-white hover:shadow rounded px-6 py-1.5">
                        Follow
                      </button>
                    )}
                    <span className="sm:block hidden">{metaballsMenu}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center max-w-[21.5rem]">
                <div className="cursor-pointer">
                  <span className="font-semibold">{user.posts?.length}</span> posts
                </div>
                <div onClick={handleFollowersModal} className="cursor-pointer">
                  <span className="font-semibold">{user.followers?.length}</span> followers
                </div>
                <div onClick={handleFollowingModal} className="cursor-pointer">
                  <span className="font-semibold">{user.following?.length}</span> following
                </div>
              </div>

              <div className="max-w-full">
                <p className="font-medium">{user.name}</p>
                <p className="whitespace-pre-line">{user.bio}</p>
                {user?.website && (
                  <a href={user.website} target="_blank" rel="noreferrer" className="text-blue-900 font-medium">
                    {new URL(user.website).hostname}
                  </a>
                )}
              </div>
            </div>
          </div>

          {followersModal ? (
            <UsersDialog title="Followers" open={viewModal} onClose={closeModal} usersList={user?.followers} />
          ) : (
            <UsersDialog title="Following" open={viewModal} onClose={closeModal} usersList={user?.following} />
          )}

          <div className="border-t sm:ml-8 sm:mr-14">
            <div className="flex gap-12 justify-center">
              <button
                type="button"
                onClick={() => setActiveTab("posts")}
                className={`${activeTab === "posts" ? 'border-t border-black text-black' : 'text-gray-400'} py-3 cursor-pointer flex items-center text-[13px] uppercase gap-3 tracking-[1px] font-medium bg-transparent border-x-0 border-b-0`}
              >
                {postsIconFill} posts
              </button>

              {user._id === loggedInUser._id && (
                <button
                  type="button"
                  onClick={() => setActiveTab("saved")}
                  className={`${activeTab === "saved" ? 'border-t border-black text-black' : 'text-gray-400'} py-3 cursor-pointer flex items-center text-[13px] uppercase gap-3 tracking-[1px] font-medium bg-transparent border-x-0 border-b-0`}
                >
                  {savedIconFill} saved
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab("reels")}
                className={`${activeTab === "reels" ? 'border-t border-black text-black' : 'text-gray-400'} py-3 cursor-pointer flex items-center text-[13px] uppercase gap-3 tracking-[1px] font-medium bg-transparent border-x-0 border-b-0`}
              >
                {reelsIcon} reels
              </button>

              <span className="py-3 hidden sm:flex items-center text-gray-400 text-[13px] uppercase gap-3 tracking-[1px] font-medium">
                {taggedIcon} tagged
              </span>
            </div>

            {activeTab === "saved" ? (
              <PostContainer posts={user?.saved} id="saved" />
            ) : activeTab === "reels" ? (
              reels?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-7 mt-2 mb-10">
                  {reels.map((reel) => (
                    <button
                      type="button"
                      key={reel._id}
                      onClick={openReelsPage}
                      className="relative aspect-square bg-black overflow-hidden cursor-pointer group border-0 p-0"
                    >
                      <video
                        src={BASE_POST_IMAGE_URL + reel.image}
                        className="w-full h-full object-cover group-hover:opacity-90"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        Reel
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-white mt-2 mb-10 drop-shadow-sm rounded flex items-center justify-center p-10">
                  <p className="text-gray-500 text-lg">No reels yet</p>
                </div>
              )
            ) : imagePosts?.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-1 sm:gap-4 mt-2 mb-10">
                  {imagePosts.map((post) => (
                    <div
                      key={post._id}
                      className="aspect-square cursor-pointer overflow-hidden"
                      onClick={() => setSelectedPost(post)}
                    >
                      <img
                        src={BASE_POST_IMAGE_URL + post.image}
                        className="w-full h-full object-cover hover:opacity-95"
                        alt=""
                        draggable="false"
                      />
                    </div>
                  ))}
                </div>

                {selectedPost && (
                  <PostDetails
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                  />
                )}
              </>
            ) : (
              <div className="bg-white mt-2 mb-10 drop-shadow-sm rounded flex sm:flex-row flex-col sm:gap-0 gap-5 sm:p-0 p-4 items-center justify-between">
                <img draggable="false" className="w-2/5 rounded-l" src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg" alt="" />
                <div className="mx-auto flex flex-col items-center">
                  <h4 className="font-medium text-lg sm:text-xl">Start capturing and sharing your moments.</h4>
                  <p>Get the app to share your first photo or video.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Profile;