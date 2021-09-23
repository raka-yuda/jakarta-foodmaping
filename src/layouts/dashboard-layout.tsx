import PropTypes from "prop-types";
import { Header, Sidebar } from "../components";

interface Props {
  titlePage: String;
  children: PropTypes.ReactNodeLike;
}

function DashboardLayout({ titlePage = "Dashboard", children }: Props) {
  return (
    <div>
      <Header titlePage={titlePage}></Header>
      <Sidebar children={children} />
    </div>
  );
}

export default DashboardLayout;
