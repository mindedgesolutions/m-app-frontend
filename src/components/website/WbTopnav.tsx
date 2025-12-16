import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6';

const WbTopnav = () => {
  return (
    <div className="bg-chart-1 p-2">
      <div className="flex justify-end items-center gap-4 md:max-w-7xl mx-auto">
        <FaFacebook className="text-card size-4 cursor-pointer hover:text-chart-2" />
        <FaInstagram className="text-card size-4 cursor-pointer hover:text-chart-2" />
        <FaYoutube className="text-card size-4 cursor-pointer hover:text-chart-2" />
      </div>
    </div>
  );
};
export default WbTopnav;
