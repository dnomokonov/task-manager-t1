import { Layout, Typography } from "antd";
import './HeaderPage.css'

const {Header} = Layout;
const {Title} = Typography;

function HeaderPage() {
    return (
       <Header className="header">
           <Title level={2} className="p-6">Task Manager</Title>
       </Header>
    )
}

export default HeaderPage;