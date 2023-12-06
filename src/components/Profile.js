import "../blocks/Profile.css";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

const Profile = ({
  onSelectCard,
  onCreateModal,
  clothingItems,
  openChangeProfile,
  onCardLike,
  onLogOut,
  isLoggedIn,
}) => {
  return (
    <div className="profile">
      <SideBar openChangeProfile={openChangeProfile} onLogOut={onLogOut} />
      <ClothesSection
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default Profile;
