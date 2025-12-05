import HomeIcon from "@mui/icons-material/Home";
import HotelIcon from "@mui/icons-material/Hotel";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LogoutIcon from "@mui/icons-material/Logout";

const icons = {
  Cycles: <SportsGymnasticsIcon />,
  Recovery: <BatteryChargingFullIcon />,
  Sleep: <HotelIcon />,
  Workouts: <FitnessCenterIcon />,
  Home: <HomeIcon />,
  SignOut: <LogoutIcon />,
};

export function buildLeftDrawerItems(dashboards) {
  let items = Object.values(dashboards).map((d) => ({
    id: d.id,
    text: d.name,
    icon: icons[d.name],
    divider: d.name === "Workouts" ? true : false
  }));

  items.push(
    {
      id: "home",
      text: "Home",
      icon: icons["Home"]
    },
    {
      id: "sign-out",
      text: "Sign out",
      icon: icons["SignOut"]
    }
  );

  return items
}
