import "../blocks/Profile.css";
import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

const Profile = ({ onSelectCard, onCreateModal, clothingItems }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
        clothingItems={clothingItems}
      />
    </div>
  );
};

export default Profile;
